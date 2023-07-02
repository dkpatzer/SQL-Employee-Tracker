const mysql = require('mysql2/promise');

const getConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'Password1',
      database: 'sql_employee_tracker',
    });
    console.log('Connected to the MySQL database.');
    return connection;
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = getConnection;
