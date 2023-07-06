//require db variable from database.js
const db = require('./db');
const inquirer = require('inquirer');
const cTable = require('console.table')


//prompt user
const startNewPrompt = () => {
  console.log("start")
  inquirer.prompt([{
    type: 'list',
    name: 'initialPrompt',
    message: 'What would you like to do?',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Update an employee manager', 'View employees by manager', 'View employees by department', 'Delete a department', 'Delete a role', 'Delete an employee'],
  }])
    .then(answer => {
      if (answer.initialPrompt == 'View all departments') {
        return viewDepartments();

      } else if (answer.initialPrompt == 'View all roles') {
        return viewRoles();

      } else if (answer.initialPrompt == 'View all employees') {
        return viewEmployees();

      } else if (answer.initialPrompt == 'Add a department') {
        return addDepartment();

      } else if (answer.initialPrompt == 'Add a role') {
        return addRole();

      } else if (answer.initialPrompt == 'Add an employee') {
        return addEmployee();

      } else if (answer.initialPrompt == 'Update an employee role') {
        return updateRole();

      } else if (answer.initialPrompt == 'Update an employee manager') {
        return updateManager();

      } else if (answer.initialPrompt == 'View employees by manager') {
        return viewByManager();

      } else if (answer.initialPrompt == 'View employees by department') {
        return viewByDepartment();

      } else if (answer.initialPrompt == 'Delete a department') {
        return deleteDepartment();

      } else if (answer.initialPrompt == 'Delete a role') {
        return deleteRole();

      } else if (answer.initialPrompt == 'Delete an employee') {
        return deleteEmployee();

      } else {
        console.log('Please select an action!');
        return false;
      }
    })
};

