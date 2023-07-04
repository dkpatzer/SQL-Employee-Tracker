const inquirer = require('inquirer');
const mysql = require('mysql2/promise');

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
  }
};

// Function to add a department
const addDepartment = (connection) => {
  inquirer
    .prompt({
      name: 'department',
      type: 'input',
      message: 'Enter the department name:',
    })
    .then((answer) => {
      const { department } = answer;
      const sql = `INSERT INTO department (name) VALUES (?)`;
      const values = [department];

      connection.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error:', err);
        } else {
          console.log('Department added successfully!');
        }
        startApp(connection);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      startApp(connection);
    });
};


// Function to add a role
const addRole = (connection) => {
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
        name: 'department_id',
        type: 'input',
        message: 'Enter the department ID for the role:',
      },
    ])
    .then((answer) => {
      const { title, salary, department_id } = answer;
      const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
      const values = [title, salary, department_id];

      connection.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error:', err);
        } else {
          console.log('Role added successfully!');
        }
        startApp(connection);
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      startApp(connection);
    });
};



// Function to add an employee

// Add an employee
const addEmployee = (connection) => {
  return inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: "Enter the employee's first name:",
      },
      {
        name: 'last_name',
        type: 'input',
        message: "Enter the employee's last name:",
      },
      {
        name: 'role_id',
        type: 'input',
        message: "Enter the employee's role ID:",
      },
      {
        name: 'manager_id',
        type: 'input',
        message: "Enter the employee's manager ID:",
      },
    ])
    .then((answer) => {
      const { first_name, last_name, role_id, manager_id } = answer;
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
      const values = [first_name, last_name, role_id, manager_id];

      return connection.promise().query(sql, values);
    })
    .then(([rows]) => {
      console.log('Employee added successfully!');
      return rows;
    })
    .catch((error) => {
      console.error('Error:', error);
      throw error;
    });
};


// Function to update an employee role
const updateEmployeeRole = async (connection) => {
  connection.query(`SELECT * FROM role;`, (err, res) => {
    if (err) throw err;
    let roles = res.map((role) => ({ name: role.title, value: role.role_id }));
    connection.query(`SELECT * FROM employee;`, (err, res) => {
      if (err) throw err;
      let employees = res.map((employee) => ({
        name: employee.first_name + ' ' + employee.last_name,
        value: employee.employee_id,
      }));
      inquirer
        .prompt([
          {
            name: 'employee',
            type: 'rawlist',
            message: 'Which employee would you like to update the role for?',
            choices: employees,
          },
          {
            name: 'newRole',
            type: 'rawlist',
            message: "What should the employee's new role be?",
            choices: roles,
          },
        ])
        .then((response) => {
          connection.query(
            `UPDATE employee SET ? WHERE ?`,
            [
              {
                role_id: response.newRole,
              },
              {
                employee_id: response.employee,
              },
            ],
            (err, res) => {
              if (err) throw err;
              console.log(
                `\n Successfully updated employee's role in the database! \n`
              );
              startApp(connection);
            }
          );
        });
    });
  });
};

// Function to update an employee's manager
const updateManager = async (connection) => {
  connection.query(`SELECT * FROM employee;`, (err, res) => {
    if (err) throw err;
    let employees = res.map((employee) => ({
      name: employee.first_name + ' ' + employee.last_name,
      value: employee.employee_id,
    }));
    inquirer
      .prompt([
        {
          name: 'employee',
          type: 'rawlist',
          message: 'Which employee would you like to update the manager for?',
          choices: employees,
        },
        {
          name: 'newManager',
          type: 'rawlist',
          message: "Who should the employee's new manager be?",
          choices: employees,
        },
      ])
      .then((response) => {
        connection.query(
          `UPDATE employee SET ? WHERE ?`,
          [
            {
              manager_id: response.newManager,
            },
            {
              employee_id: response.employee,
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.log(
              `\n Successfully updated employee's manager in the database! \n`
            );
            startApp(connection);
          }
        );
      });
  });
};

// Function to remove a department
const removeDepartment = async (connection) => {
  connection.query(
    `SELECT * FROM department ORDER BY department_id ASC;`,
    (err, res) => {
      if (err) throw err;
      let departments = res.map((department) => ({
        name: department.department_name,
        value: department.department_id,
      }));
      inquirer
        .prompt([
          {
            name: 'deptName',
            type: 'rawlist',
            message: 'Which department would you like to remove?',
            choices: departments,
          },
        ])
        .then((response) => {
          connection.query(
            `DELETE FROM department WHERE ?`,
            [
              {
                department_id: response.deptName,
              },
            ],
            (err, res) => {
              if (err) throw err;
              console.log(
                `\n Successfully removed the department from the database! \n`
              );
              startApp(connection);
            }
          );
        });
    }
  );
};

// Function to remove a role
const removeRole = async (connection) => {
  connection.query(`SELECT * FROM role ORDER BY role_id ASC;`, (err, res) => {
    if (err) throw err;
    let roles = res.map((role) => ({
      name: role.title,
      value: role.role_id,
    }));
    inquirer
      .prompt([
        {
          name: 'title',
          type: 'rawlist',
          message: 'Which role would you like to remove?',
          choices: roles,
        },
      ])
      .then((response) => {
        connection.query(
          `DELETE FROM role WHERE ?`,
          [
            {
              role_id: response.title,
            },
          ],
          (err, res) => {
            if (err) throw err;
            console.log(
              `\n Successfully removed the role from the database! \n`
            );
            startApp(connection);
          }
        );
      });
  });
};

// Function to remove an employee
const removeEmployee = async (connection) => {
  connection.query(
    `SELECT * FROM employee ORDER BY employee_id ASC;`,
    (err, res) => {
      if (err) throw err;
      let employees = res.map((employee) => ({
        name: employee.first_name + ' ' + employee.last_name,
        value: employee.employee_id,
      }));
      inquirer
        .prompt([
          {
            name: 'employee',
            type: 'rawlist',
            message: 'Which employee would you like to remove?',
            choices: employees,
          },
        ])
        .then((response) => {
          connection.query(
            `DELETE FROM employee WHERE ?`,
            [
              {
                employee_id: response.employee,
              },
            ],
            (err, res) => {
              if (err) throw err;
              console.log(
                `\n Successfully removed the employee from the database! \n`
              );
              startApp(connection);
            }
          );
        });
    }
  );
};

// Function to view a department's salary
const viewDepartmentSalary = async (connection) => {
  connection.query(
    `SELECT * FROM department ORDER BY department_id ASC;`,
    (err, res) => {
      if (err) throw err;
      let departments = res.map((department) => ({
        name: department.department_name,
        value: department.department_id,
      }));
      inquirer
        .prompt([
          {
            name: 'deptName',
            type: 'rawlist',
            message: 'Which department would you like to view the total salaries of?',
            choices: departments,
          },
        ])
        .then((response) => {
          connection.query(
            `SELECT department_id, SUM(role.salary) AS total_salary FROM role WHERE ?`,
            [
              {
                department_id: response.deptName,
              },
            ],
            (err, res) => {
              if (err) throw err;
              console.log(
                `\n The total utilized salary budget of the ${response.deptName} department is $ \n`
              );
              console.table('\n', res, '\n');
              startApp(connection);
            }
          );
        });
    }
  );
};

module.exports = {
  addEmployee,
  updateEmployeeRole,
  updateManager,
  removeDepartment,
  removeRole,
  removeEmployee,
  viewDepartmentSalary,
};

// Connect to the database and start the application
getConnection()
  .then((connection) => {
    console.log('Connected to the MySQL database.');
    startApp(connection);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Function to start the application
function startApp(connection) {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'Add a department',
        'Add a role',
        'Add an employee',
        'View all departments',
        'View all roles',
        'View all employees',
        'Update an employee role',
        'Update an employee manager',
        'Remove a department',
        'Remove a role',
        'Remove an employee',
        'View the total utilized budget of a department',
        'Exit',
      ],
    })
    .then((answer) => {
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
        case 'View all departments':
          viewAllDepartments(connection);
          break;
        case 'View all roles':
          viewAllRoles(connection);
          break;
        case 'View all employees':
          viewAllEmployees(connection);
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
        case 'View the total utilized budget of a department':
          viewDepartmentSalary(connection);
          break;
        case 'Exit':
          console.log('Goodbye!');
          connection.end();
          break;
        default:
          console.log('Invalid action');
          startApp(connection);
          break;
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

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
