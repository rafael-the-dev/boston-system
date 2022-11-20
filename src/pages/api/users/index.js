const bcrypt = require("bcrypt");

const { connection } = require("src/connections/mysql");
const { getFile } = require("src/helpers/image")
const { query } = require("src/helpers/db")

const handler = async (req, res) => {

    const { method } = req;

    switch(method) {
        case "GET": {
            return query("SELECT Apelido as lastName, Nome as firstName, Categoria as category, Username as username from user")
                .then(async result => {
                    const images = await Promise.all(result.map(item => getFile({ name: item.username })));

                    const users = result.map((user, index) => ({ ...user, image: images[index]}))

                    res.json(users);
                });
        }
        case "POST": {
            const { body } = req; 
            const { firstName, lastName, password, user, username } = JSON.parse(body);

            const hashedPassword = await bcrypt.hash(password, 10);
            const values = [ firstName, lastName, username, hashedPassword, user ];
            
            connection.query(`INSERT INTO user(Nome, Apelido, Username, Password, Categoria) Values ( ?, ?, ?, ?, ? )`,
            values, (error, result) => {
                if(error) res.status(500).send();

                res.send()
            })
            res.send();
            return;
        }
        default: {
            return;
        }
    }
};

export default handler;