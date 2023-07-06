
const mysql = require('mysql2');


    const connection =  mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'Password1',
      database: 'sql_employee_tracker',
    });

    console.log('Connected to the MySQL database. Connection details:'), 
      
      connection.connect(function (err) {
        if (err) throw err;
      });
      
      const promiseConnection = connection.promise();
      
      module.exports = promiseConnection;











