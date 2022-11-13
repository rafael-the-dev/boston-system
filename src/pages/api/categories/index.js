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
        case "POST": {
            const { description, type } = JSON.parse(req.body);

            query("INSERT INTO grupo(descricao, Tipo) VALUES(?,?)", [ description, type ])
                .then(() => res.status(201).send());
        }
        default: {
            return;
        }
    }
};

const handler = apiHandler(requestHandler )
export default handler;