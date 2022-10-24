const { createConnection } = require("mysql2");

const connection = createConnection({
    host     : 'localhost',
    user     : 'root',
    password : "40260101",
    database : 'mydb'
});


const createDBConnection = (dbConfig) => {
    return new Promise((resolve, reject) => {
        connection.connect(err => {
            if (err) {
                console.error('error connecting: ' + err.stack);

                dbConfig.db = null;
                dbConfig.isConnected = false;

                reject(err)
                return;
            }
            
            console.log('connected as id ' + connection.threadId);

            dbConfig.isConnected = true;

            resolve();
        });
    })
};

module.exports = {
    createDBConnection, 
    connection
};