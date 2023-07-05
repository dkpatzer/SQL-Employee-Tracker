const util = require('util');
const mysql = require('mysql2');


const getConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'Password1',
      database: 'sql_employee_tracker',
    });

    console.log('Connected to the MySQL database. Connection details:', {
      host: connection.config.host,
      port: connection.config.port,
      user: connection.config.user,
      database: connection.config.database,
    });

    // Promisify the connection query method
    connection.query = util.promisify(connection.query).bind(connection);

    // Test the connection with a simple query
    await connection.query('SELECT 1');
    console.log('MySQL connection test successful.');

    return connection;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

module.exports = {
  getConnection: getConnection,
};










