const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { query } = require("src/helpers/db")

class Access {
    static login = async ({ password, res, username }) => {
        return query(`SELECT * FROM user WHERE username=?`, [ username ])
            .then(async users => {
                const user = users[0];

                if(await bcrypt.compare(password, user.Password)) {                        
                    return query(`INSERT INTO userlog (login, user, data) value (now(), ?, now());`, [ user.idUser ])
                        .then((response) => {

                            const acessToken = jwt.sign({ category: user.Categoria, loginId: response.insertId, username }, process.env.JWT_SECRET_KEY, { expiresIn: "25m" });
                            const verifiedToken = jwt.verify(acessToken, process.env.JWT_SECRET_KEY);

                            res.json({
                                access: {
                                    expiresIn: verifiedToken.exp, 
                                    token: acessToken

                                },
                                category: user.Categoria,
                                firstName: user.Nome,
                                lastName: user.Apelido,
                                username: user.Username
                            });
                        }
                    );
                }

                throw new Error("Login Error");
            })


    }

    static revalidateToken({ token }) {
        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(user);
        return;
    }
}

module.exports = Access;