const connection = require('./db/database');
const EmployeeDatabase = require('./db/employee-database.js');
const inquirer = require('inquirer');
// const { table } = require('console');

const db = new EmployeeDatabase(connection);

// Prompt user
const startNewPrompt = () => {
  console.log("start");
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'initialPrompt',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Update an employee manager',
          'View employees by manager',
          'View employees by department',
          'Delete a department',
          'Delete a role',
          'Delete an employee',
        ],
      },
    ])
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
    });
};

function viewDepartments() {
  db.getDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => startNewPrompt());
}

function viewRoles() {
  db.getRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => startNewPrompt());
}

function viewEmployees() {
  db.getEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => startNewPrompt());
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: 'name',
        message: "What is the name of the department?",
      },
    ])
    .then(res => {
      db.addDepartment(res.name);
      console.log("The department has been added!");
      startNewPrompt();
    });
}

function addRole() {
  db.getDepartments()
    .then(([departments]) => {
      return inquirer.prompt([
        {
          name: 'title',
          message: "Whatis the name of the role?",
        },
        {
          name: 'salary',
          message: "What is the salary amount?",
        },
        {
          type: 'list',
          name: 'departmentPrompt',
          message: "What is the role's department?",
          choices: departments.map(department => ({ name: department.name, value: department.id })),
        },
      ]);
    })
    .then(({ title, salary, departmentPrompt }) => {
      db.addRole(title, salary, departmentPrompt);
      console.log("The role has been added!");
      startNewPrompt();
    });
}

function addEmployee() {
  Promise.all([db.getRoles(), db.getManager()])
    .then(([[roles], [managers]]) => {
      return inquirer.prompt([
        {
          name: 'first_name',
          message: "What is the employee's first name?",
        },
        {
          name: 'last_name',
          message: "What is the employee's last name?",
        },
        {
          type: 'list',
          name: 'rolePrompt',
          message: "What is the employee's role?",
          choices: roles.map(role => ({ name: role.title, value: role.id })),
        },
        {
          type: 'list',
          name: 'managerPrompt',
          message: "What is the employee's manager?",
          choices: managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id })),
        },
      ]);
    })
    .then(({ first_name, last_name, rolePrompt, managerPrompt }) => {
      db.addEmployee(first_name, last_name, rolePrompt, managerPrompt);
      console.log("The employee has been added!");
      startNewPrompt();
    });
}

function updateRole() {
  db.getEmployees()
    .then(([employees]) => {
      inquirer.prompt([
        {
          type: 'list',
          name: 'employeePrompt',
          message: "Which employee do you want to update?",
          choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
        },
      ])
        .then(res => {
          let employee_id = res.employeePrompt;
          db.getRoles()
            .then(([roles]) => {
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'rolePrompt',
                  message: "What role do you want to update the employee to?",
                  choices: roles.map(role => ({ name: role.title, value: role.id })),
                },
              ])
                .then(res => db.updateRole(employee_id, res.rolePrompt))
                .then(() => console.log("The employee's role has been updated!"))
                .then(() => startNewPrompt());
            });
        });
    });
}

function deleteRole() {
  db.getRoles()
    .then(([roles]) => {
      return inquirer.prompt([
        {
          type: 'list',
          name: 'rolePrompt',
          message: "Which role do you want to delete?",
          choices: roles.map(role => ({ name: role.title, value: role.id })),
        },
      ]);
    })
    .then(({ rolePrompt }) => {
      db.deleteRole(rolePrompt);
      console.log("The role has been deleted!");
      startNewPrompt();
    });
}


function updateManager() {
  db.getEmployees()
    .then(([employees]) => {
      inquirer.prompt([
        {
          type: 'list',
          name: 'employeePrompt',
          message: "Which employee do you want to update?",
          choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
        },
      ])
        .then(employee_res => {
          let employee_id = employee_res.employeePrompt;
          db.getEmployees()
            .then(([employees]) => {
              inquirer.prompt([
                {
                  type: 'list',
                  name: 'managerPrompt',
                  message: "Which manager do you want to update the employee to?",
                  choices: employees.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id })),
                },
              ])
                .then(manager_res => db.updateManager(employee_id, manager_res.managerPrompt))
                .then(() => console.log("The employee's manager has been updated!"))
                .then(() => startNewPrompt());
            });
        });
    });
}

function viewByDepartment() {
  db.getDepartments()
    .then(([departments]) => {
      return inquirer.prompt([
        {
          type: 'list',
          name: 'departmentPrompt',
          message: "Which department do you want to view employees for?",
          choices: departments.map(department => ({ name: department.name, value: department.id })),
        },
      ]);
    })
    .then(department_res => {
      db.viewByDepartment(department_res.departmentPrompt)
        .then(([rows]) => {
          let departments = rows;
          console.log("\n");
          console.table(departments);
        })
        .then(() => startNewPrompt());
    });
}

function viewByManager() {
  db.getEmployees()
    .then(([employees]) => {
      return inquirer.prompt([
        {
          type: 'list',
          name: 'managerPrompt',
          message: "Which manager do you want to view employees for?",
          choices: employees.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id })),
        },
      ]);
    })
    .then(manager_res => {
      db.viewByManager(manager_res.managerPrompt)
        .then(([rows]) => {
          let employees = rows;
          console.log("\n");
          console.table(employees);
        })
        .then(() => startNewPrompt());
    });
}

startNewPrompt();

