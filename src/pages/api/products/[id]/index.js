const currency = require("currency.js");

const Error404 = require("src/models/server/errors/404Error")

const { apiHandler } = require("src/helpers/api-handler")
const { query } = require("src/helpers/db")
const { getTotalPrice } = require("src/helpers/price")

const requestHandler = async (req, res) => {

    const { method, query: { id } } = req;

    switch(method) {
        case "GET": {
            return query(`SELECT * FROM Produto WHERE idProduto=?`, [ id ])
                .then(result => {
                    res.json(result);
                    return;

                    if(result.length !== 0) throw new Error("Product already exists");
                })
        }
        case "PUT": {
            const { body } = req; 
            const { available, barCode, category, date, sellVat, name, purchasePrice, purchaseVat, sellPrice  } = JSON.parse(body);

            return query(`SELECT * FROM Produto WHERE idProduto=?`, [ id ])
                .then(result => {
                    if(result.length === 0) throw new Error404("Product already exists");

                    const totalPurchasePrice = getTotalPrice({ price: purchasePrice, taxRate: purchaseVat });
                    const totalSellPrice = getTotalPrice({ price: sellPrice, taxRate: sellVat});
                    const profit = currency(totalSellPrice).subtract(totalPurchasePrice).value;

                    const values = [ available, barCode, category, date, sellVat, name, purchasePrice, purchaseVat, sellPrice, profit, id ];

                    return query(`UPDATE Produto SET Estado=?, BarCod=?, fk_grupo=?, Data=?, Iva_venda=?, Nome=?, Preco_compra=?, IVA_compra=?, Preco_venda=?, Profit=? WHERE idProduto=?`, values)
                        .then(() => res.json({ message: "Product was successfully updated" }));
                })
        }
        default: {
            return;
        }
    }
};

const handler = apiHandler(requestHandler )
export default handler;