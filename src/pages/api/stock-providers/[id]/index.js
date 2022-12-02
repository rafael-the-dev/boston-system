
const Error404 = require("src/models/server/errors/404Error");

const { apiHandler } = require("src/helpers/api-handler");
const { query } = require("src/helpers/db")

const requestHandler = (req, res) => {
    const { body, method, query: { id } } = req;

    switch(method) {
        case "GET": {
            return query(`
                SELECT idFornecedor AS id, Nome AS name, Nuit AS nuit, Morada AS address, Estado AS state, 
                Data AS date FROM fornecedor WHERE idFornecedor=?;`, [ id ])
                .then(result => {
                    if(result.length === 0) throw new Error404("Supplier not found");

                    res.status(200).json(result[0]);
                })
        }
        case "PUT": {
            const { address, name, nuit } = JSON.parse(body);
            return query(`UPDATE fornecedor SET Nome=?, Nuit=?, Morada=? WHERE idFornecedor=?`, [ name, nuit, address, id ])
                .then(() => res.status(200).send());
        }
    }
};

const handler = apiHandler(requestHandler);

export default handler;