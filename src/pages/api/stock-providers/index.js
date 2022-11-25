

const { apiHandler } = require("src/helpers/api-handler");
const { query } = require("src/helpers/db")


const requestHandler = (req, res) => {
    const { method } = req;

    switch(method) {
        case "GET": {
            return query("SELECT idFornecedor AS id, Nome AS name, Nuit AS nuit, Morada AS address, Estado AS state, Data AS date FROM Fornecedor;")
                .then(result => res.status(200).json(result))
        }
    }
};

const handler = apiHandler(requestHandler);

export default handler;