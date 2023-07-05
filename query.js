const { addEmployee, updateEmployeeRole } = require('./queries');
const { startApp } = require('./app');

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


