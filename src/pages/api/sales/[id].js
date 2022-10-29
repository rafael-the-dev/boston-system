const currency = require("currency.js")

const { apiHandler } = require("src/helpers/api-handler")
const { query } = require("src/helpers/db");
const SaleDetails = require("src/models/server/SaleDetails");

const requestHandler = async (req, res, user ) => {

    const { method, query: { id } } = req;

    switch(method) {
        case "GET": {
            return query(`SELECT * FROM salesdetail inner join  sales on sales.idSales=salesdetail.FKSales inner join salesseries on salesseries.idSalesSeries
            =sales.SalesSerie where SalesSeries.idsalesseries=?`, [ id ])
                .then(result => {
                    res.json(result.map(item => new SaleDetails(item).toLiteral()));
                })
        }
    }
};

const handler = apiHandler(requestHandler )
export default handler;