const bcrypt = require("bcrypt");

const { apiHandler } = require("src/helpers/api-handler")
const { query } = require("src/helpers/db")

const requestHandler = async (req, res) => {

    const { method } = req;

    switch(method) {
        case "PUT": {
            const { body } = req; 
            const { password, username } = JSON.parse(body);

            return query(`SELECT * FROM user WHERE username=?`, [ username ])
                .then(async users => {
                    const user = users[0];

                    if(await bcrypt.compare(password, user.Password)) {                        
                        return query(`INSERT INTO userlog (login, user, data) value (now(), ?, now());`, [ user.idUser ])
                            .then((response) => {
                                res.json({
                                    access: {
                                        loginId: response.insertId,
                                        token: "",

                                    },
                                    category: user.Categoria,
                                    firstName: user.Nome,
                                    lastName: user.Apelido,
                                    username: user.Username
                                });
                            })
                    }

                    throw new Error();
                })
        }
        default: {
            return;
        }
    }
};

const handler = apiHandler(requestHandler )
export default handler;