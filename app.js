const { promisify } = require('util');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { getConnection } = require('./database');
const {
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  updateManager,
  removeDepartment,
  removeRole,
  removeEmployee,
  viewDepartmentSalary,
} = require('./queries');

const startApp = (connection) => {
  const fetchEmployees = async (connection) => {
    try {
      const [rows] = await connection.query('SELECT * FROM employee');
      console.table('\n', rows, '\n');
      startApp(connection);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const fetchRoles = async (connection) => {
    try {
      const [rows] = await connection.query('SELECT * FROM role');
      console.table('\n', rows, '\n');
      startApp(connection);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const fetchDepartments = async (connection) => {
    try {
      const [rows] = await connection.query('SELECT * FROM department');
      console.table('\n', rows, '\n');
      startApp(connection);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  fetchEmployees(connection);
  fetchRoles(connection);
  fetchDepartments(connection);

  const viewAllDepartments = async () => {
    try {
      const [rows] = await connection.query('SELECT * FROM department');
      console.table('\n', rows, '\n');
      startApp(connection);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const viewAllRoles = async () => {
    try {
      const [rows] = await connection.query('SELECT * FROM role');
      console.table('\n', rows, '\n');
      startApp(connection);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const viewAllEmployees = async () => {
    try {
      const [rows] = await connection.query('SELECT * FROM employee');
      console.table('\n', rows, '\n');
      startApp(connection);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Update an employee manager',
        'Remove a department',
        'Remove a role',
        'Remove an employee',
        'View department salary',
        'View all departments',
        'View all roles',
        'View all employees',
        'Exit',
      ],
    })
    .then((answer) => {
      // Handle user's selection
      switch (answer.action) {
        case 'Add a department':
          addDepartment(connection);
          break;
        case 'Add a role':
          addRole(connection);
          break;
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
          viewAllDepartments();
          break;
        case 'View all roles':
          viewAllRoles();
          break;
        case 'View all employees':
          viewAllEmployees();
          break;
        case 'Exit':
          console.log('Goodbye!');
          connection.end();
          break;
        default:
          console.log('Invalid action');
          break;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

getConnection()
  .then((connection) => {
    console.log('Connected to the MySQL database.');
    startApp(connection);
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });



