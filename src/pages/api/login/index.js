const bcrypt = require("bcrypt");
const { query } = require("src/helpers/db")

const handler = async (req, res) => {

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
                            .then(() => {
                                res.send(JSON.stringify({
                                    category: user.Categoria,
                                    firstName: user.Nome,
                                    lastName: user.Apelido,
                                    username: user.Username
                                }))
                            })
                            .catch(err => {
                                console.error(err);
                                res.status(500).end();
                            })
                    }

                    res.status(500).end();
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).end();
                })
        }
        default: {
            return;
        }
    }
};

export default handler;