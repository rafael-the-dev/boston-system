const bcrypt = require("bcrypt");

const { apiHandler } = require("src/helpers/api-handler")
const { query } = require("src/helpers/db");
const Acess = require("src/models/server/Acess")

const requestHandler = async (req, res) => {

    const { method } = req;

    switch(method) {
        case "PUT": {
            const { authorization } = req.headers;

            if(Boolean(authorization)) return Acess.logout({ res, token: authorization });

            res.status(401).json({ message: "Not Unauthorized " });
        }
        default: {
            return;
        }
    }
};

const handler = apiHandler(requestHandler )
export default handler;