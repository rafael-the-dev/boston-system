const bcrypt = require("bcrypt");

const { apiHandler } = require("src/helpers/api-handler")
const { query } = require("src/helpers/db")

const requestHandler = async (req, res) => {

    const { method } = req;

    switch(method) {
        case "PUT": {
            const { body } = req; 
            const { loginId, username } = JSON.parse(body);

            return query(`SELECT * FROM user WHERE username=?`, [ username ])
                .then(users => {
                    const user = users[0];

                    return query(`UPDATE userlog SET Logout=now() WHERE idUserLog=? AND user=?;`, [ loginId, user.idUser ])
                        .then(() => {
                            res.send()
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