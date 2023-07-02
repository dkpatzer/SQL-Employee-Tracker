const inquirer = require('inquirer');
const { addAnEmployee, updateEmployeeRole, updateManager, removeDepartment, removeRole, removeEmployee, viewDepartmentSalary } = require('./query');

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
          'Update an employee manager',
          'Remove a department',
          'Remove a role',
          'Remove an employee',
          'View department salary',
        ],
      },
    ])
    .then((answer) => {
      const { action } = answer;
      switch (action) {
        case 'Add an employee':
          addAnEmployee(connection);
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
        default:
          console.log('Invalid option');
          startApp(connection);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

module.exports = {
  startApp,
};
