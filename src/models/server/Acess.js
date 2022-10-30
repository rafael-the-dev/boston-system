const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const AuthorizationError = require("./errors/AuthorizationError");
const Error404 = require("./errors/404Error")
const LoginError = require("./errors/LoginError");
const { query } = require("src/helpers/db")

class Access {
    static getUser(token) {
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
            return user;
        } catch(e) {
            throw new AuthorizationError();
        }
    }

    static login = async ({ password, res, username }) => {
        return query(`SELECT * FROM user WHERE username=?`, [ username ])
            .then(async users => {

                if(users.length === 0) throw new LoginError();

                const user = users[0];

                if(await bcrypt.compare(password, user.Password)) {                        
                    return query(`INSERT INTO userlog (login, user, data) value (now(), ?, now());`, [ user.idUser ])
                        .then((response) => {

                            const acessToken = jwt.sign({ 
                                category: user.Categoria, 
                                loginId: response.insertId, 
                                username,
                                idUser: user.idUser
                            }, process.env.JWT_SECRET_KEY, { expiresIn: "25m" });

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

                throw new LoginError();
            })


    }

    static logout({ res, token}) {
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

            const { loginId, idUser } = user;

            return query(`UPDATE userlog SET Logout=now() WHERE idUserLog=? AND user=?;`, [ loginId, idUser ])
                .then(() => {
                    res.send()
                })
                .catch(e => res.status(500).json({ message: e.message }));
        } catch(e) {
            throw new AuthorizationError();
        }
    }

    static revalidateToken({ res, token }) {
        let loggedUser;
        try {
            loggedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch(e) {
            throw new AuthorizationError();
        }
        
        return query(`SELECT * FROM user WHERE username=?`, [ loggedUser.username ])
            .then(async users => {
                const user = users[0];

                res.json({
                    access: {
                        expiresIn: loggedUser.exp, 
                        token: token

                    },
                    category: user.Categoria,
                    firstName: user.Nome,
                    lastName: user.Apelido,
                    username: user.Username
                });
            })
    }
}

module.exports = Access;