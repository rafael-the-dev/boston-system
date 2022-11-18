const formidable =  require('formidable');
const path = require("path");

const { apiHandler } = require("src/helpers/api-handler")
const { query } = require("src/helpers/db");
const { saveImage } = require("src/helpers/image")

//set bodyparser
export const config = {
    api: {
        bodyParser: false
    }
}

const requestHandler = async (req, res) => {

    const { method, query: { id , user} } = req;
    
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
                        const form = formidable({ 
                            filename: (name, ext) => `${ user ?? name }${ext}`,
                            multiples: true ,
                            keepExtensions: true,
                            uploadDir: path.join(path.resolve("."), `/public/images/users`)
                    });
                    
                        form.parse(req, (err, fields, files) => {
                            if (err) reject({ err });

                            resolve({ err, fields, files })
                        }) 
                    }).then(({ fields }) => {
                        const { firstName, lastName, user, username } = fields;
                        
                        const values = [ lastName, user, firstName, username, id ];
    
                        return query(`UPDATE user SET Apelido=?, Categoria=?, Nome=?, Username=? WHERE Username=?`, values)
                            .then(() => res.json({ message: "Dados atualizados" }))
                    });
                })
        }
        default: {
            return;
        }
    }
};

const handler = apiHandler(requestHandler);

export default handler;