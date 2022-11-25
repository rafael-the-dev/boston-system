

const { apiHandler } = require("src/helpers/api-handler");
const { query } = require("src/helpers/db");
const { getTotalPrice, getPriceVAT } = require("src/helpers/price")

const requestHandler = (req, res) => {
    const { method } = req;

    switch(method) {
        case "GET": {
            return query(`
                SELECT factura_fornecedor.idFactura_Fornecedor as id, factura_fornecedor.idFactura_Fornecedor as providerId, factura_fornecedor.CodFactura as invoiceCode, factura_fornecedor.IVA as totalVAT, factura_fornecedor.subTotal as subTotal, factura_fornecedor.total as total, factura_fornecedor.Data as date,
                fornecedor.Nome as providerName, fornecedor.idFornecedor as providerId, fornecedor.Morada as address
                FROM factura_fornecedor
                INNER JOIN fornecedor ON factura_fornecedor.fornecedor=fornecedor.idFornecedor;
            `).then(result => {
                res.status(200).json(result.map(({ address, providerName, providerId, ...rest }) => ({
                    ...rest,
                    provider: {
                        address,
                        id: providerId,
                        name: providerName
                    }
                })))
            })
        }
        case "POST": {
            const { invoiceReference, products: { list, stats }, stockProvider } = JSON.parse(req.body);

            const invoiceProviderValues = [ invoiceReference, stockProvider, stats.totalVAT, stats.subTotal, stats.total ]

            return query(`INSERT INTO 
                factura_fornecedor(CodFactura, Data_Entrada, Fornecedor, IVA, Subtotal, Total, Data) 
                VALUES(?, NOW(), ?, ?, ?, ?, NOW())`, invoiceProviderValues)
                .then(async result => {
                    const { insertId } = result;

                    try {
                        await Promise.all(
                            list.map((product) => {
                                const { id, purchasePrice, purchaseVAT, stock } = product;
                                console.log(product);
                                const totalPrice = getTotalPrice({ price: purchasePrice, taxRate: purchaseVAT });
                                
                                const factura_fornecedor_detail = [ id, purchasePrice, purchaseVAT, totalPrice, stock.quantity, insertId ]
    
                                return query(`
                                    INSERT INTO factura_fornecedor_detail(idproduto, Preco_compra, IVA_Compra, Total_Compra, Quantidade, IDFactura_Fornecedor, Data)
                                    VALUES(?,?,?,?,?,?, NOW())
                                    `, factura_fornecedor_detail
                                )
                            })
                        );

                        res.status(201).send();
                    } catch(e) {
                        await Promise.all([
                            query("DELETE FROM factura_fornecedor WHERE idFactura_Fornecedor=?", [ insertId ]),
                            query('DELETE FROM factura_fornecedor_detail WHERE IDFactura_Fornecedor=?', [ insertId ])
                        ]);

                        res.status(500).send();
                    }
                })
        }
    }
};

const handler = apiHandler(requestHandler);

export default handler;