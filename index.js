// Import necessary packages
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Create MySQL pool
const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Password1',
  database: 'SQL-Employee-Tracker',
});

// Connect to the database
pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log('Connected to the MySQL database.');

  // Start the application
  startApplication(connection);
});

// Function to start the application
function startApplication(connection) {
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
    .then((answer) => {
      // Perform actions based on user selection
      switch (answer.action) {
        case 'View all departments':
          viewAllDepartments(connection);
          break;
        case 'View all roles':
          viewAllRoles(connection);
          break;
        case 'View all employees':
          viewAllEmployees(connection);
          break;
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
        case 'Exit':
          connection.end(); // Close the database connection
          console.log('Disconnected from the MySQL database.');
          break;
        default:
          console.log('Invalid choice');
          break;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Function to view all departments
function viewAllDepartments(connection) {
  // Implement the logic to fetch and display all departments from the database
  // Use SQL queries with the connection.query() method
  connection.query('SELECT * FROM departments', (error, results) => {
    if (error) throw error;
    console.log('All Departments:');
    console.table(results);
    startApplication(connection); // Prompt user for next action
  });
}

// Function to view all roles
function viewAllRoles(connection) {
  // Implement the logic to fetch and display all roles from the database
  // Use SQL queries with the connection.query() method
  connection.query('SELECT * FROM roles', (error, results) => {
    if (error) throw error;
    console.log('All Roles:');
    console.table(results);
    startApplication(connection); // Prompt user for next action
  });
}

// Function to view all employees
function viewAllEmployees(connection) {
  // Implement the logic to fetch and display all employees from the database
  // Use SQL queries with the connection.query() method
  connection.query('SELECT * FROM employees', (error, results) => {
    if (error) throw error;
    console.log('All Employees:');
    console.table(results);
    startApplication(connection); // Prompt user for next action
  });
}

// Function to add a department
function addDepartment(connection) {
  // Implement the logic to prompt the user for department details and add the department to the database
  // Use inquirer.prompt() to get user input and connection.query() to execute SQL insert statement
  inquirer
    .prompt({
      name: 'department',
      type: 'input',
      message: 'Enter the department name:',
    })
    .then((answer) => {
      connection.query(
        'INSERT INTO departments SET ?',
        {
          dept_name: answer.department,
        },
        (error) => {
          if (error) throw error;
          console.log('Department added successfully!');
          startApplication(connection); // Prompt user for next action
        }
      );
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Function to add a role
function addRole(connection) {
  // Implement the logic to prompt the user for role details and add the role to the database
  // Use inquirer.prompt() to get user input and connection.query() to execute SQL insert statement
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter the role title:',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Enter the role salary:',
      },
      {
        name: 'departmentId',
        type: 'input',
        message: 'Enter the department ID for the role:',
      },
    ])
    .then((answers) => {
      connection.query(
        'INSERT INTO roles SET ?',
        {
          title: answers.title,
          salary: answers.salary,
          department_id: answers.departmentId,
        },
        (error) => {
          if (error) throw error;
          console.log('Role added successfully!');
          startApplication(connection); // Prompt user for next action
        }
      );
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Function to add an employee
function addEmployee(connection) {
  // Implement the logic to prompt the user for employee details and add the employee to the database
  // Use inquirer.prompt() to get user input and connection.query() to execute SQL insert statement
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'Enter the employee first name:',
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'Enter the employee last name:',
      },
      {
        name: 'roleId',
        type: 'input',
        message: 'Enter the role ID for the employee:',
      },
      {
        name: 'managerId',
        type: 'input',
        message: 'Enter the manager ID for the employee (optional):',
      },
    ])
    .then((answers) => {
      connection.query(
        'INSERT INTO employees SET ?',
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: answers.roleId,
          manager_id: answers.managerId,
        },
        (error) => {
          if (error) throw error;
          console.log('Employee added successfully!');
          startApplication(connection); // Prompt user for next action
        }
      );
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Function to update an employee role
function updateEmployeeRole(connection) {
  // Implement the logic to prompt the user to select an employee and update their role
  // Use inquirer.prompt() to get user input and connection.query() to execute SQL update statement
  inquirer
    .prompt([
      {
        name: 'employeeId',
        type: 'input',
        message: 'Enter the employee ID:',
      },
      {
        name: 'roleId',
        type: 'input',
        message: 'Enter the new role ID for the employee:',
      },
    ])
    .then((answers) => {
      connection.query(
        'UPDATE employees SET role_id = ? WHERE id = ?',
        [answers.roleId, answers.employeeId],
        (error) => {
          if (error) throw error;
          console.log('Employee role updated successfully!');
          startApplication(connection); // Prompt user for next action
        }
      );
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
