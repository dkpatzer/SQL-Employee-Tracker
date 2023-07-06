const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  //MySQL username
  user: 'root',
  //MySQL password
  password: 'Password1',
  database: 'sql_employee_tracker'
});

connection.connect(function (err) {
  if (err) throw err;
})

module.exports = connection;
















