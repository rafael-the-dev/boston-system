const formidable =  require('formidable');

const { apiHandler } = require("src/helpers/api-handler")
const { query } = require("src/helpers/db");

//set bodyparser
export const config = {
    api: {
        bodyParser: false
    }
}

const requestHandler = async (req, res) => {

    const { method, query: { id } } = req;

    switch(method) {
        case "GET": {
            return query(`SELECT * FROM user WHERE username=?`, [ id ])
                .then(result => {
                    res.json(result)
                })
        }
        case "PUT": {
            return query(`SELECT * FROM user WHERE username=?`, [ id ])
                .then(result => {
                    if(result.length === 0 ) throw new Error("User not found");
                    
                    new Promise((resolve, reject) => {
                        const form = formidable({ multiples: true });
                    
                        form.parse(req, (err, fields, files) => {
                            if (err) reject({ err })
                            resolve({ err, fields, files })
                        }) 
                    }).then(formData => console.log(formData));

                    const { firstName, image, lastName, user, username } = JSON.parse(req.body);
                    
                    const values = [ lastName, user, firstName, username, id ];

                    return query(`UPDATE user SET Apelido=?, Categoria=?, Nome=?, Username=? WHERE Username=?`, values)
                        .then(() => res.json({ message: "Dados atualizados" }))
                })
        }
        default: {
            return;
        }
    }
};

const handler = apiHandler(requestHandler )
export default handler;