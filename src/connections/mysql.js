const { createConnection } = require("mysql2");

const connection = createConnection({
    host     : 'localhost',
    user     : 'root',
    password : "40260101",
    database : 'mydb'
});


connection.connect(err => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    
    console.log('connected as id ' + connection.threadId);
});

module.exports = {
    connection
};