const currency = require("currency.js")

const { apiHandler } = require("src/helpers/api-handler")
const { query } = require("src/helpers/db")

const requestHandler = async (req, res, user ) => {

    const { method, query: { id } } = req;

    switch(method) {
        case "GET": {
            const [ paymentMethods, products ] = Promise.all([
                query(`
                    SELECT description, amount, Received as received, paymentmethodused.Change as client_change FROM paymentmethodused INNER JOIN paymentmethod ON paymentmethodused.fk_payment_mode=paymentmethod.idPaymentMethod
                    INNER JOIN PaymentSeries ON PaymentSeries.idPaymentSeries=paymentmethodused.fk_payment_serie
                    WHERE PaymentSeries.idPaymentSeries=(SELECT MAX(idPaymentSeries) FROM paymentseries WHERE paymentseries.fk_user=?)
                `, [ user.idUser ]),
                query(`
                    SELECT Montante as amount, BarCod AS barCode, Nome AS name, Preco_venda as price, Quantity as quantity  FROM sales INNER JOIN salesseries ON sales.SalesSerie=salesseries.idSalesSeries
                    INNER JOIN salesdetail ON sales.idSales=salesdetail.FKSales
                    INNER JOIN produto ON salesdetail.Product=produto.idProduto
                    WHERE salesseries.idSalesSeries=?
                `, [ id ])
            ]);

            
            /*const totalVAT = currency(products.reduce((previousValue, currentProduct) => {
                return currency(currentProduct.totalVAT).add(previousValue);
            }, 0)).value;

            const totalAmount = currency(products.reduce((previousValue, currentProduct) => {
                return currency(currentProduct.subTotal).add(previousValue);
            }, 0)).value;*/

            res.json({ products, paymentMethods })
        }
        default: {
            return;
        }
    }
};

const handler = apiHandler(requestHandler )
export default handler;