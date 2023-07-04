DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;


-- CREATE DATABASE sql_employee_tracker;

USE sql_employee_tracker;

CREATE TABLE department(
    id INT AUTO_INCREMENT  NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
    id INT  AUTO_INCREMENT NOT NULL,
    title VARCHAR(255) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee(
    id INT AUTO_INCREMENT NOT NULL ,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id), ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employee(id)  ON DELETE SET NULL
);

