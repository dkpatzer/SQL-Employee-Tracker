const inquirer = require('inquirer');
const { addAnEmployee, updateEmployeeRole, updateManager, removeDepartment, removeRole, removeEmployee, viewDepartmentSalary } = require('./query');

// Fetch the list of employees (replace this with your actual implementation)
const fetchEmployees = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM employee', (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};


// Start the application
const startApp = (connection) => {
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
            choices: employees.map((employee) => ({ name: employee.name, value: employee.employee_id })),
          },
          'Remove a department',
          'Remove a role',
          'Remove an employee',
          'View department salary',
        ],
      },
    ])
    .then((answer) => {
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

module.exports = {
  startApp,
};
;

