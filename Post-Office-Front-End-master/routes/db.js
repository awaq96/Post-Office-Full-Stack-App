var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testdb',
  port: '3306'
})

connection.connect(
  function(err) {
    if (err) throw err;
    console.log("Connected!");
  }
)