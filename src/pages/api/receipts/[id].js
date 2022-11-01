const moment = require("moment")

const { apiHandler } = require("src/helpers/api-handler")
const { query } = require("src/helpers/db");
const { createInvoice } = require("src/helpers/server")

const requestHandler = async (req, res, user ) => {

    const { method, query: { id } } = req;

    switch(method) {
        case "GET": {
            const [ paymentMethods, products ] = await Promise.all([
                query(`
                    SELECT description, amount, Received as received, paymentmethodused.Change as client_change, PaymentSeries.data FROM paymentmethodused INNER JOIN paymentmethod ON paymentmethodused.fk_payment_mode=paymentmethod.idPaymentMethod
                    INNER JOIN PaymentSeries ON PaymentSeries.idPaymentSeries=paymentmethodused.fk_payment_serie
                    WHERE PaymentSeries.idPaymentSeries=(SELECT MAX(idPaymentSeries) FROM paymentseries WHERE paymentseries.fk_user=?)
                `, [ user.idUser ]),
                query(`
                    SELECT BarCod AS barCode, Iva as totalVAT, Nome AS description, Preco_venda as price, Quantity as quantity, Montante as totalAmount, Subtotal as subTotal  FROM sales INNER JOIN salesseries ON sales.SalesSerie=salesseries.idSalesSeries
                    INNER JOIN salesdetail ON sales.idSales=salesdetail.FKSales
                    INNER JOIN produto ON salesdetail.Product=produto.idProduto
                    WHERE salesseries.idSalesSeries=?;
                `, [ id ])
            ]);

            createInvoice({ 
                information: {
                    date: moment(new Date(paymentMethods[0].data)).format("DD-MM-YYYY")
                }, 
                products, paymentMethods,
                stats: {
                    subTotal: products[0].subTotal,
                    totalAmount: products[0].totalAmount,
                    totalVAT: products[0].totalVAT
                }
            });

            res.json({ 
                information: {
                    date: moment(new Date(paymentMethods[0].data)).format("DD-MM-YYYY")
                },
                products, 
                paymentMethods 
            });
        }
        default: {
            return;
        }
    }
};

const handler = apiHandler(requestHandler )
export default handler;