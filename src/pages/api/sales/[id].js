const currency = require("currency.js")

const { apiHandler } = require("src/helpers/api-handler")
const { query } = require("src/helpers/db");
const SaleDetails = require("src/models/server/SaleDetails");

const requestHandler = async (req, res, user ) => {

    const { method, query: { id } } = req;

    switch(method) {
        case "GET": {
            const [ products, paymentMethods ] = await Promise.all([
                query(`
                    SELECT * FROM salesdetail INNER JOIN  sales ON sales.idSales=salesdetail.FKSales 
                    INNER JOIN salesseries ON salesseries.idSalesSeries=sales.SalesSerie 
                    INNER JOIN produto ON produto.idProduto=salesdetail.Product
                    WHERE SalesSeries.idsalesseries=?`, [ id ]),
                query(`
                    SELECT paymentmethod.idPaymentMethod as id, paymentmethod.description, paymentmethodused.amount, paymentmethodused.Received as received, paymentmethodused.Change as changes FROM salesseries
                    INNER JOIN PaymentSeries ON salesseries.idSalesSeries=PaymentSeries.fk_salesserie
                    INNER JOIN PaymentMethodUsed ON PaymentSeries.idPaymentSeries=PaymentMethodUsed.fk_payment_serie
                    INNER JOIN paymentmethod ON paymentmethod.idPaymentMethod=paymentmethodused.fk_payment_mode
                    WHERE SalesSeries.idsalesseries=?;`, [ id ])
            ]);

            res.json(new SaleDetails({ id, products, paymentMethods }).toLiteral());
        }
    }
};

const handler = apiHandler(requestHandler )
export default handler;