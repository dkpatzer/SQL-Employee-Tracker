// Import necessary packages
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Password1',
  database: 'SQL-Employee-Tracker',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Get a connection from the pool
const getConnection = () => {
  return pool.promise().getConnection();
};

// Function to start the application
async function startApplication() {
  const connection = await getConnection();

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
    })
    .then(async (answer) => {
      switch (answer.action) {
        case 'View all departments':
          await viewAllDepartments(connection);
          break;
        case 'View all roles':
          await viewAllRoles(connection);
          break;
        case 'View all employees':
          await viewAllEmployees(connection);
          break;
        case 'Add a department':
          await addDepartment(connection);
          break;
        case 'Add a role':
          await addRole(connection);
          break;
        case 'Add an employee':
          await addEmployee(connection);
          break;
        case 'Update an employee role':
          await updateEmployeeRole(connection);
          break;
        case 'Exit':
          connection.release();
          console.log('Disconnected from the MySQL database.');
          return;
        default:
          console.log('Invalid action. Please try again.');
      }

      // Prompt user for next action
      startApplication(connection);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Function to view all departments
async function viewAllDepartments(connection) {
  try {
    const [rows] = await connection.query('SELECT * FROM departments');
    console.table(rows);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to view all roles
async function viewAllRoles(connection) {
  try {
    const [rows] = await connection.query('SELECT * FROM roles');
    console.table(rows);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to view all employees
async function viewAllEmployees(connection) {
  try {
    const [rows] = await connection.query('SELECT * FROM employees');
    console.table(rows);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to add a department
async function addDepartment(connection) {
  inquirer
    .prompt({
      name: 'department',
      type: 'input',
      message: 'Enter the department name:',
    })
    .then(async (answer) => {
      try {
        await connection.query('INSERT INTO departments SET ?', {
          dept_name: answer.department,
        });
        console.log('Department added successfully!');
      } catch (error) {
        console.error('Error:', error);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Function to add a role
async function addRole(connection) {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter the role title:',
      },
      {
        name: 'salary',
        type: 'number',
        message: 'Enter the role salary:',
      },
      {
        name: 'departmentId',
        type: 'number',
        message: 'Enter the department ID for the role:',
      },
    ])
    .then(async (answers) => {
      try {
        await connection.query('INSERT INTO roles SET ?', {
          title: answers.title,
          salary: answers.salary,
          department_id: answers.departmentId,
        });
        console.log('Role added successfully!');
      } catch (error) {
        console.error('Error:', error);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Function to add an employee
async function addEmployee(connection) {
  // Logic to prompt the user for employee details and add the employee to the database
  // Use inquirer.prompt() to get user input and connection.query() to execute SQL insert statement
}

// Function to update an employee role
async function updateEmployeeRole(connection) {
  // Logic to prompt the user to select an employee and update their role
  // Use inquirer.prompt() to get user input and connection.query() to execute SQL update statement
}

// Connect to the database and start the application
getConnection()
  .then((connection) => {
    console.log('Connected to the MySQL database.');
    startApplication(connection);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

