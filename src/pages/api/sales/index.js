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

            return query('SELECT * FROM user WHERE Username=?', [ username ])
                .then(users => {
                    const id = users[0].idUser
                    return query(`INSERT INTO SalesSeries(Data, Estado, User) VALUES(now(),?,?)`, [ state, id  ])
                        .then((result) => {
                            console.log(result)
                            res.send({ message: "Successfully added" })
                        });
                })
        }
        default: {
            return;
        }
    }
};

const handler = apiHandler(requestHandler )
export default handler;