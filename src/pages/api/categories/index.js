const { apiHandler } = require("src/helpers/api-handler")
const { query } = require("src/helpers/db")

const requestHandler = async (req, res) => {

    const { method } = req;

    switch(method) {
        case "GET": {
            return query(`SELECT * FROM Grupo`)
                .then(result => {
                    res.json(result)
                })
        }
        default: {
            return;
        }
    }
};

const handler = apiHandler(requestHandler )
export default handler;