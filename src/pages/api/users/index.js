const bcrypt = require("bcrypt");
const formidable =  require('formidable');
const path = require("path");

const { apiHandler } = require("src/helpers/api-handler")
const { connection } = require("src/connections/mysql");
const { deleteImage, getFile } = require("src/helpers/image")
const { query } = require("src/helpers/db");

//set bodyparser
export const config = {
    api: {
        bodyParser: false
    }
}

const requestHandler = async (req, res) => {

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
            return new Promise((resolve, reject) => {
                const form = formidable({ 
                    filename: (name, ext) => `${ req.query?.user ?? name }${ext}`,
                    multiples: true ,
                    keepExtensions: true,
                    uploadDir: path.join(path.resolve("."), `/public/images/users`)
                });
                
                form.parse(req, async (err, fields, files) => {
                    if (err) reject({ err });

                    if(files) {
                        try {
                            await deleteImage({ name: await getFile({ name: req.query?.user }) });
                        } catch(e){}
                    }
                    
                    resolve({ err, fields, files })
                }) 
            }).then(async ({ fields }) => {
                
                const { firstName, lastName, password, user, username } = fields;
                
                const hashedPassword = await bcrypt.hash(password, 10);

                const values = [ firstName, lastName, username, hashedPassword, user ];
                
                return query(`INSERT INTO user(Nome, Apelido, Username, Password, Categoria) Values ( ?, ?, ?, ?, ? )`, values)
                    .then(() => res.send())
            })
        }
        default: {
            return;
        }
    }
};

const handler = apiHandler(requestHandler);

export default handler;