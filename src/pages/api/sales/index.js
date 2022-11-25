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

            const errorRecovery = {
                salesSeries: null,
                salesId: null,
            }
           
            return query(`INSERT INTO SalesSeries(Data, Estado, User) VALUES(now(),?,?)`, [ "CONCLUIDO", user.idUser  ])
                .then(async (result) => {
                    const { insertId } = result;
                    errorRecovery.salesSeries = insertId;

                    const totalVAT = currency(products.reduce((previousValue, currentProduct) => {
                        return currency(currentProduct.totalVAT).add(previousValue);
                    }, 0)).value;

                    const totalAmount = currency(products.reduce((previousValue, currentProduct) => {
                        return currency(currentProduct.subTotal).add(previousValue);
                    }, 0)).value;

                    try {
                        await Promise.all([
                            query("INSERT INTO Sales(SalesSerie, Montante, Iva, Subtotal, Total, Status, Data) VALUES(?,?,?,?,?,?,now())", [ insertId, totalAmount, totalVAT, total, total, "CONCLUIDO" ])
                                .then(async salesResult => {
                                    const salesId = salesResult.insertId;
                                    errorRecovery.salesId = salesId;
    
                                    return await Promise.all(
                                        products.map(product => {
                                            const { id, quantity, subTotal, stock, total, totalVAT } = product;
                                            return [
                                                query("INSERT INTO SalesDetail(FKSales, Product, Quantity, Satus, User, Data) VALUES(?,?,?,?,?,now())", [ salesId, id, quantity, "CONCLUIDO", user.idUser ]),
                                                query(`UPDATE stock SET total=? WHERE idStock=?`, [ stock.total, stock.stockId ])
                                            ]
                                        }).flatMap(item => item)
                                    );
    
                                }),
                            query('INSERT INTO PaymentSeries(status, fk_user, fk_salesserie, data) VALUES(?,?,?, now())', [ "CONCLUIDO", user.idUser, insertId ])
                                .then(async result => {
                                    const { insertId } = result;
                                    errorRecovery.paymentSeries = insertId;
            
                                    await Promise.all(
                                        paymentMethods.map(method => {
                                            const { amount, id } = method;
                                            return query("INSERT INTO PaymentMethodUsed(fk_payment_mode, fk_payment_serie, amount, status, Received, data) VALUES(?,?,?,?,?,now())", [ id, insertId, amount, "CONCLUIDO", amount ])
                                        })
                                    )
                                })
                        ]);

                        res.json({ message: "Venda feita com successo", salesserie: insertId });
                    } catch(e) {
                        await Promise.all([
                            query("DELETE FROM SalesSeries WHERE idSalesSeries=?", [ errorRecovery.salesSeries ]),
                            query("DELETE FROM Sales WHERE SalesSerie=?", [ errorRecovery.salesSeries ]),
                            query("DELETE FROM PaymentSeries WHERE fk_salesserie=?", [ errorRecovery.salesSeries ])
                        ]);

                        await Promise.all(
                            products.map(product => {
                                const { stock } = product;
                                return query(`UPDATE stock SET total=? WHERE idStock=?`, [ stock.currentStock, stock.stockId ])
                            })
                        );

                        if(errorRecovery.salesId) {
                            await query(`DELETE FROM SalesDetail WHERE FKSales=?`, [ errorRecovery.salesId ])
                        }

                        if(errorRecovery.paymentSeries) {
                            await query(`DELETE FROM PaymentMethodUsed WHERE fk_payment_serie=?`, [ errorRecovery.paymentSeries ])
                        }

                        throw e;
                    }

                });
        }
        default: {
            return;
        }
    }
};

const handler = apiHandler(requestHandler )
export default handler;