

const { apiHandler } = require("src/helpers/api-handler");
const { query } = require("src/helpers/db")


const requestHandler = (req, res) => {
    const { method } = req;

    switch(method) {
        case "GET": {
            return query(`
                SELECT produto.idProduto AS id, BarCod AS barCode, produto.Nome AS name, fk_grupo AS groupId, 
                Preco_compra AS purchasePrice, Iva_compra AS purchaseVAT, Total_Preco_compra AS totalPurchasePrice,
                stock.idStock as stockId, stock.inicial as initial, stock.final, stock.total,  
                user.idUser as userId, user.Nome as firstName, user.apelido as lastName, user.categoria as category
                FROM produto
                INNER JOIN stock ON produto.idProduto=stock.idProduto
                INNER JOIN user ON stock.user=user.idUser;`
            ).then(result => {
                const productsStockList = result.map(item => {
                    const { category, final, firstName, initial, lastName, stockId, total, userId, ...res } = item;

                    return {
                        ...res,
                        stock: {
                            final, initial, stockId, currentStock: total,
                            user: {
                                category, firstName, lastName, userId
                            }
                        }
                    }
                });

                res.json(productsStockList);
            });
        }
        case "POST": {
            return query("SELECT idFornecedor AS id, Nome AS name, Nuit AS nuit, Morada AS address, Estado AS state, Data AS date FROM Fornecedor;")
                .then(result => res.json(result))
        }
        default: {
            throw new Error();
        }
    }
};

const handler = apiHandler(requestHandler);

export default handler;