const { addEmployee, updateEmployeeRole } = require('./queries');
const { promisify } = require('util');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const {
  addEmployee,
  updateEmployeeRole,
  updateManager,
  removeDepartment,
  removeRole,
  removeEmployee,
  viewDepartmentSalary,
} = require('./query');
const { getConnection } = require('./database');


// Function to fetch the list of employees
const fetchEmployees = async (connection) => {
  try {
    const [rows] = await connection.query('SELECT * FROM employee');
    console.log('Fetched employees:', rows); // Add this line
    return rows;
  } catch (error) {
    throw error;
  }
};





// Start the application
const startApp = (connection) => {
  fetchEmployees(connection)
    .then((employees) => {
      inquirer
        .prompt({
          name: 'action',
          type: 'list',
          message: 'What would you like to do?',
          choices: [
            'Add an employee',
            'Update an employee role',
            {
              name: 'Update an employee manager',
              choices: employees.map((employee) => ({
                name: `${employee.first_name} ${employee.last_name}`,
                value: employee.employee_id,
              })),
            },
            'Remove a department',
            'Remove a role',
            'Remove an employee',
            'View department salary',
            'View all departments', // New choice
            'View all roles', // New choice
            'View all employees', // New choice
          ],
        })
        .then((answer) => {
          // Handle user's selection
          switch (answer.action) {
            case 'Add an employee':
              addEmployee(connection);
              break;
            case 'Update an employee role':
              updateEmployeeRole(connection);
              break;
            case 'Update an employee manager':
              updateManager(connection);
              break;
            case 'Remove a department':
              removeDepartment(connection);
              break;
            case 'Remove a role':
              removeRole(connection);
              break;
            case 'Remove an employee':
              removeEmployee(connection);
              break;
            case 'View department salary':
              viewDepartmentSalary(connection);
              break;
            case 'View all departments':
              viewAllDepartments(connection); // Call the function
              break;
            case 'View all roles':
              viewAllRoles(connection); // Call the function
              break;
            case 'View all employees':
              viewAllEmployees(connection); // Call the function
              break;
            default:
              console.log('Invalid action');
              break;
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

// Function to view all departments
async function viewAllDepartments(connection) {
  try {
    const [rows] = await connection.query('SELECT * FROM department');
    console.table('\n', rows, '\n');
    startApp(connection);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to view all roles
async function viewAllRoles(connection) {
  try {
    const [rows] = await connection.query('SELECT * FROM role');
    console.table('\n', rows, '\n');
    startApp(connection);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to view all employees
async function viewAllEmployees(connection) {
  try {
    const [rows] = await connection.query('SELECT * FROM employee');
    console.table('\n', rows, '\n');
    startApp(connection);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Connect to the database and start the application
getConnection()
  .then((connection) => {
    console.log('Connected to the MySQL database.');
    startApp(connection);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  module.exports = {
    startApp,
  };
  


