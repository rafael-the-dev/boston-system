const currency = require("currency.js")

const { apiHandler } = require("src/helpers/api-handler")
const { query } = require("src/helpers/db");

const Sale = require("src/models/server/Sale");
const SalesList = require("src/models/server/SalesList");

const requestHandler = async (req, res, user ) => {

    const { method } = req;

    switch(method) {
        case "GET": {
            return query(`SELECT * FROM salesseries INNER JOIN sales ON sales.SalesSerie=SalesSeries.idSalesSeries WHERE 
                DATE(sales.data)=curdate();`)
                .then(result => {
                    const list = result.map(item => new Sale(item).toLiteral());
                    const salesList = new SalesList(list);

                    return query("SELECT SUM(Montante) as Montante, SUM(Iva) as Iva, SUM(Total) as Total FROM sales WHERE DATE(Sales.data)=curdate();")
                        .then(statsResult => {
                            salesList.stats = statsResult[0];
                            res.json(salesList.toLiteral());
                        })
                })
        }
        default: {
            return;
        }
    }
};

const handler = apiHandler(requestHandler )
export default handler;