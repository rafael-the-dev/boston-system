const currency = require("currency.js")

const { apiHandler } = require("src/helpers/api-handler")
const { query } = require("src/helpers/db")

const requestHandler = async (req, res, user ) => {

    const { method } = req;

    switch(method) {
        case "GET": {
            return query(`SELECT * FROM Produto`)
                .then(result => {
                    res.json(result);
                })
        }
        case "POST": {
            const { body } = req; 
            const { products, paymentMethods, state, total } = JSON.parse(body);

            return query(`INSERT INTO SalesSeries(Data, Estado, User) VALUES(now(),?,?)`, [ "CONCLUIDO", user.idUser  ])
                .then(async (result) => {
                    const { insertId } = result;

                    const totalVAT = currency(products.reduce((previousValue, currentProduct) => {
                        return currency(currentProduct.totalVAT).add(previousValue);
                    }, 0)).value;

                    const totalAmount = currency(products.reduce((previousValue, currentProduct) => {
                        return currency(currentProduct.subTotal).add(previousValue);
                    }, 0)).value;

                    await Promise.all([
                        query("INSERT INTO Sales(SalesSerie, Montante, Iva, Subtotal, Total, Status, Data) VALUES(?,?,?,?,?,?,now())", [ insertId, totalAmount, totalVAT, total, total, "CONCLUIDO" ])
                            .then(async salesResult => {
                                const salesId = salesResult.insertId;

                                return await Promise.all(
                                    products.map(product => {
                                        const { id, quantity, subTotal, total, totalVAT } = product;
                                        return query("INSERT INTO SalesDetail(FKSales, Product, Quantity, Satus, User, Data) VALUES(?,?,?,?,?,now())", [ salesId, id, quantity, "CONCLUIDO", user.idUser ])
                                    })
                                );

                            }),
                        query('INSERT INTO PaymentSeries(status, fk_user, fk_salesserie, data) VALUES(?,?,?, now())', [ "CONCLUIDO", user.idUser, insertId ])
                            .then(async result => {
                                const { insertId } = result;
        
                                await Promise.all(
                                    paymentMethods.map(method => {
                                        const { amount, id } = method;
                                        return query("INSERT INTO PaymentMethodUsed(fk_payment_mode, fk_payment_serie, amount, status, Received, data) VALUES(?,?,?,?,?,now())", [ id, insertId, amount, "CONCLUIDO", amount ])
                                    })
                                )
                            })
                    ]);

                    res.json({ message: "Venda feita com successo" });
                });
        }
        default: {
            return;
        }
    }
};

const handler = apiHandler(requestHandler )
export default handler;