const { apiHandler } = require("src/helpers/api-handler")
const { query } = require("src/helpers/db")

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
            const values = [ available, barCode, category, date, sellVat, name, purchasePrice, purchaseVat, sellPrice, id ];

            return query(`SELECT * FROM Produto WHERE idProduto=?`, [ id ])
                .then(result => {
                    if(result.length === 0) throw new Error("Product not found.");

                    return query(`UPDATE Produto SET Estado=?, BarCod=?, fk_grupo=?, Data=?, Iva_venda=?, Nome=?, Preco_compra=?, IVA_compra=?, Preco_venda=? WHERE idProduto=?`, values)
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