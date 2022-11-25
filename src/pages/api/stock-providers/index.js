

const { apiHandler } = require("src/helpers/api-handler");
const { query } = require("src/helpers/db")


const requestHandler = (req, res) => {
    const { body, method } = req;

    switch(method) {
        case "GET": {
            return query("SELECT idFornecedor AS id, Nome AS name, Nuit AS nuit, Morada AS address, Estado AS state, Data AS date FROM Fornecedor;")
                .then(result => res.status(200).json(result))
        }
        case "POST": {
            const { address, name, nuit } = JSON.parse(body);
            return query(`INSERT INTO Fornecedor(Nome, Nuit, Morada, Estado, Data) VALUES(?,?,?, "ACTIVO", NOW())`, [ name, nuit, address ])
                .then(() => res.status(201).send());
        }
    }
};

const handler = apiHandler(requestHandler);

export default handler;