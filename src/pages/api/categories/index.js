const { apiHandler } = require("src/helpers/api-handler")
const { query } = require("src/helpers/db")

import SerialPort from "src/models/client/SerialPort";
const requestHandler = async (req, res) => {

    const { method } = req;

    switch(method) {
        case "GET": {
            const x = new SerialPort();
            return query(`SELECT * FROM grupo`)
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