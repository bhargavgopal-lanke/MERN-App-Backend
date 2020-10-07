/*const mysql = require('mysql');

const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'testdb'
});

module.exports = pool.promise();*/


const mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'testdb'
});

connection.connect(function(err) {
	if(err) throw err;
	  console.log("DB Connected!");
});

module.exports = connection;