// Import necessary packages
const inquirer = require('inquirer');
const mysql = require('mysql');

// Establish connection to MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Password1',
  database: 'SQL-Employee-Tracker',
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database.');
  startApplication(); // Start the application
});


