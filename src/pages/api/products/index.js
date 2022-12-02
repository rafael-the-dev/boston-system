const currency = require("currency.js");

const Error404 = require("src/models/server/errors/404Error")

const { apiHandler } = require("src/helpers/api-handler");
const { getTotalPrice } = require("src/helpers/price")
const { query } = require("src/helpers/db")

const requestHandler = async (req, res, user) => {

    const { method } = req;

    switch(method) {
        case "GET": {
            return query(`SELECT * FROM produto`)
                .then(result => {
                    res.json(result);
                })
        }
        case "POST": {
            const { body } = req; 
            const { available, barCode, category, date, sellVat, name, purchasePrice, purchaseVat, sellPrice  } = JSON.parse(body);

            const totalPurchasePrice = getTotalPrice({ price: purchasePrice, taxRate: purchaseVat });
            const totalSellPrice = getTotalPrice({ price: sellPrice, taxRate: sellVat});
            const profit = currency(totalSellPrice).subtract(totalPurchasePrice).value;

            const values = [ available, barCode, category, date, sellVat, name, profit, purchasePrice, purchaseVat, totalPurchasePrice, totalSellPrice, sellPrice ];

            return query(`SELECT * FROM produto WHERE BarCod=?`, [ barCode ])
                .then(result => {
                    if(result.length !== 0) throw new Error404("Product already exists");

                    return query(`INSERT INTO Produto(Estado, BarCod, fk_grupo, Data, Iva_venda, Nome, Profit, Preco_compra, IVA_compra, Total_Preco_Compra, Total_Preco_Venda, Preco_venda) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`, values)
                        .then(async productResult => {
                            const stockValues = [ productResult.insertId, 0, 0, 0, "ACTIVO", user.idUser ];

                            try {
                                await query(`INSERT INTO stock (idProduto, Inicial, Final, Total, Estado, user, Data) VALUES (?, ?, ?, ?, ?, ?, NOW());`, stockValues );
                           
                                res.json({ message: "Product was successfully registered" });
                            } catch(e) {
                                await Promise.all([
                                    query(`DELETE FROM Produto WHERE idProduto=?`, [ productResult.insertId ]),
                                    query(`DELETE FROM stock WHERE idProduto=?`, [ productResult.insertId ]),
                                ]);

                                res.status(500).send();
                            }
                        });
                });
        }
        default: {
            return;
        }
    }
};

const handler = apiHandler(requestHandler )
export default handler;