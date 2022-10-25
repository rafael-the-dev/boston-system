const { apiHandler } = require("src/helpers/api-handler")
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
            const { state, username } = JSON.parse(body);
            const values = [ state, username ];

            return query(`INSERT INTO SalesSeries(Data, Estado, User) VALUES(now(),?,?)`, values)
                .then((result) => {
                    console.log(result)
                    res.send({ message: "Successfully added" })
                });
        }
        default: {
            return;
        }
    }
};

const handler = apiHandler(requestHandler )
export default handler;