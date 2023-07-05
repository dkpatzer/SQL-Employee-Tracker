const { startApp } = require('./app');
const { getConnection } = require('./database');

// Connect to the database and start the application
getConnection()
  .then((connection) => {
    console.log('Connected to the MySQL database.');
    startApp(connection);
  })
  .catch((error) => {
    console.error('Error:', error);
  });


