const mysql = require("mysql");
const dbConfig = require('./config/db.config.js')
const remoteDbConfig = require('./config/remotedb.config.js')

//const DatabaseConfiguration = require('./config/db.config.js')
//const michealDbConfig = DatabaseConfiguration.micheal
//const localDbConfig = dbConfig.local

connectLocalDatabase = false;

if(connectLocalDatabase){
    var connection = mysql.createConnection(
        {
            host: dbConfig.HOST,
            user: dbConfig.USER,
            password: dbConfig.PASSWORD,
            database: dbConfig.DB
        }
    )
    connection.connect((err) => {
        if (!err) {
            console.log("Connected");

        }
        else {
            console.log(err);
            console.log("Could not connect");
        }
    })


} else {

    var connection = mysql.createPool({
        connectionLimit : 10,
        host : remoteDbConfig.HOST,
        user : remoteDbConfig.USER,
        password : remoteDbConfig.PASSWORD,
        database : remoteDbConfig.DB,
        port : remoteDbConfig.PORT,
        multipleStatements : remoteDbConfig.MULTIPLE_STATEMENT
    });
}
//Create tables if they're not exists. This happens only once

module.exports = connection;
