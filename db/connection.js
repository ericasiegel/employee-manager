// dependency variables
const mysql = require('mysql2');

// create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // MySQL username
    user: 'root',
    // MySQL password
    password: 'siegirls2!',
    // database
    database: 'employees_db'
});

// initiate the connection to the database
connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);

});

module.exports = connection;