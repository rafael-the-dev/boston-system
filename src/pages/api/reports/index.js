const currency = require("currency.js")
const moment = require("moment");

const { apiHandler } = require("src/helpers/api-handler")
const { query } = require("src/helpers/db");

const Sale = require("src/models/server/Sale");
const SalesList = require("src/models/server/SalesList");

const requestHandler = async (req, res, user ) => {

    const { method, query: { endDate, startDate} } = req;

    switch(method) {
        case "GET": {
            const getDate = () => {
                let stringifiedDate = '';

                if(Boolean(startDate) && Boolean(endDate)) {
                    stringifiedDate = ` BETWEEN '${moment(startDate).format('YYYY-MM-DD')}' AND '${moment(endDate).format('YYYY-MM-DD')}'`;
                }
                else if(Boolean(startDate)) {
                    stringifiedDate = `='${moment(startDate).format('YYYY-MM-DD')}'`;
                }
                /*else if(Boolean(endDate)) {
                    stringifiedDate = moment(new Date(endDate)).format('YYYY-MM-DD');
                }*/

                return stringifiedDate ? stringifiedDate : "";
            };

            const filterDate = getDate();
            const dateResult =  Boolean(filterDate) ? filterDate : "=curdate()";

            return query(`SELECT * FROM salesseries INNER JOIN sales ON sales.SalesSerie=SalesSeries.idSalesSeries 
                INNER JOIN user ON user.idUser=salesseries.user WHERE DATE(sales.data)${dateResult};`)
                .then(result => {
                    const list = result.map(item => new Sale(item).toLiteral());
                    const salesList = new SalesList(list);

                    return query(`SELECT SUM(Montante) as Montante, SUM(Iva) as Iva, SUM(Total) as Total FROM sales WHERE DATE(Sales.data)${dateResult};`)
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