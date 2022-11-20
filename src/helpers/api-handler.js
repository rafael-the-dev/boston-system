const cookie = require("cookie");
const DefaultError = require("src/models/server/errors/DefaultError");

const Access = require("src/models/server/Acess");
const { createDBConnection } = require("src/connections/mysql");

let dbConfig = { 
    db: null,
    isConnected: false 
};

const apiHandler = (handler) => {
    return async (req, res) => {
        
        if(!dbConfig.isConnected) {
            await createDBConnection(dbConfig);
        }

        const { authorization } = req.headers;
        
        const { token } = cookie.parse(req.headers.cookie ?? "");

        try {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            );

            if (req.method === "OPTIONS") {
                res.setHeader("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
                return res.status(200).json({});
            }

            let user = null;
            
            if(![ "/api/categories", "/api/login", "/api/logout", "/api/products" ].includes(req.url)) {
                user = Access.getUser(authorization ?? token);
            } 

            await handler(req, res, user);
        } catch(err) {
            console.error("handler error", err);

            if(err instanceof DefaultError) {
                res.status(err.status).json(err.getResponse());
                return;
            }
            
            res.status(500).json({ message: "Internal server error", err });
        }
    }
};

module.exports = { apiHandler };