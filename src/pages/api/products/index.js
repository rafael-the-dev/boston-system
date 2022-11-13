const currency = require("currency.js");

const { apiHandler } = require("src/helpers/api-handler");
const { getTotalPrice } = require("src/helpers/price")
const { query } = require("src/helpers/db")

const requestHandler = async (req, res) => {

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
            const { available, barCode, category, date, sellVat, name, purchasePrice, purchaseVat, sellPrice  } = JSON.parse(body);

            const totalPurchasePrice = getTotalPrice({ price: purchasePrice, taxRate: purchaseVat });
            const totalSellPrice = getTotalPrice({ price: sellPrice, taxRate: sellVat});
            const profit = currency(totalSellPrice).subtract(totalPurchasePrice).value;

            const values = [ available, barCode, category, date, sellVat, name, profit, purchasePrice, purchaseVat, totalPurchasePrice, totalSellPrice, sellPrice ];

            return query(`SELECT * FROM Produto WHERE BarCod=?`, [ barCode ])
                .then(result => {
                    if(result.length !== 0) throw new Error("Product already exists");

                    return query(`INSERT INTO Produto(Estado, BarCod, fk_grupo, Data, Iva_venda, Nome, Profit, Preco_compra, IVA_compra, Total_Preco_Compra, Total_Preco_Venda, Preco_venda) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`, values)
                        .then(() => res.json({ message: "Product was successfully registered" }));
                })
        }
        default: {
            return;
        }
    }
};

const handler = apiHandler(requestHandler )
export default handler;