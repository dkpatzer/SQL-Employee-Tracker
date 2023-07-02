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

// Function to start the application
function startApplication() {
    // Prompt the user for input
    inquirer
      .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Exit',
        ],
    });
}

// Function to view all departments
function viewAllDepartments() {
  // Implement the logic to fetch and display all departments from the database
  // Use SQL queries with the connection.query() method
}

// Function to view all roles
function viewAllRoles() {
  // Implement the logic to fetch and display all roles from the database
  // Use SQL queries with the connection.query() method
}

// Function to view all employees
function viewAllEmployees() {
  // Implement the logic to fetch and display all employees from the database
  // Use SQL queries with the connection.query() method
}

// Function to add a department
function addDepartment() {
  // Implement the logic to prompt the user for department details and add the department to the database
  // Use inquirer.prompt() to get user input and connection.query() to execute SQL insert statement
}

// Function to add a role
function addRole() {
  // Implement the logic to prompt the user for role details and add the role to the database
  // Use inquirer.prompt() to get user input and connection.query() to execute SQL insert statement
}

// Function to add an employee
function addEmployee() {
  // Implement the logic to prompt the user for employee details and add the employee to the database
  // Use inquirer.prompt() to get user input and connection.query() to execute SQL insert statement
}

// Function to update an employee role
function updateEmployeeRole() {
  // Implement the logic to prompt the user to select an employee and update their role
  // Use inquirer.prompt() to get user input and connection.query() to execute SQL update statement
}
