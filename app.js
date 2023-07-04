const { promisify } = require('util');
const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const { addEmployee, updateEmployeeRole, updateManager, removeDepartment, removeRole, removeEmployee, viewDepartmentSalary } = require('./query');

// Fetch the list of employees
const fetchEmployees = (connection) => {
  return connection.promise().query('SELECT * FROM employee')
    .then(([rows]) => rows)
    .catch((error) => {
      throw error;
    });
};

// Function to establish a database connection
const getConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'Password1',
      database: 'sql_employee_tracker',
    });
    return connection;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error to be caught in the calling code
  }
};

// Start the application
const startApp = async () => {
  try {
    const connection = await getConnection();
    console.log('Connected to the MySQL database.');

    fetchEmployees(connection)
      .then((employees) => {
        inquirer
          .prompt([
            {
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
              ],
            },
          ])
          .then((answer) => {
            // Handle user's selection
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = {
  startApp,
};


