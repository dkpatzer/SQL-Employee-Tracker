# SQL-Employee-Tracker

## Description

For this project I built an app demonstrating a Content Management System (CMS) for managing a company's employees sing node, inquirer, and MySQL. The app is a command-line application that allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

  * Update employee managers

  * View employees by manager

  * Delete departments, roles, and employees

  * View the total utilized budget of a department -- ie the combined salaries of all employees in that department

This app allowed for a deeper look into mySQL and how to use it to manage data. I created my own data in a node.js envioronmenenvironemnt and transferred it to MYSQL2. I gained practive with using mysql commands and running CRUD operations with a MYSQL database. It also allowed me to practice using node and inquirer to create a command line interface and integrate it with the MYSQL database. 

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)


## Installation

I began by creating a basic file structure with a db folder including schema.sql and seeds.sql files, along with index.js and connection.js files. I utilized separate mysql and node.js terminals. I entered npm init -y in the node.js terminal to create a package.json file. I then installed the following dependencies: mysql2, inquirer, and console.table. I then created the schema.sql file and created the database and tables. I then created the seeds.sql file and added the data to the tables. I then created the connection.js file and added the code to connect to the database. Next I created the index.js file and added the code to connect to the database and run the application. 





## Usage

### User Story


AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

GIVEN a command-line application that accepts user input
WHEN you start the application
THEN you are presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN you choose to view all departments
THEN you are presented with a formatted table showing department names and department ids
WHEN you choose to view all roles
THEN you are presented with the job title, role id, the department that role belongs to, and the salary for that role


## Images




## Credits

I utilized the following resources to complete this project:

https://www.npmjs.com/package/console.table
https://www.npmjs.com/package/mysql2
https://www.npmjs.com/package/inquirer
https://stackoverflow.com/
https://www.w3schools.com/sql/default.asp
https://developer.mozilla.org/en-US/docs/Glossary/SQL
https://www.mysqltutorial.org/mysql-cheat-sheet.aspx
https://www.freecodecamp.org/news/learn-sql-free-relational-database-courses-for-beginners/
Learn SQL in 60 minutes Web Dev Simplified: https://www.youtube.com/watch?v=p3qvj9hO_Bo
https://github.com/WebDevSimplified/Learn-SQL
https://coding-boot-camp.github.io/full-stack/mysql/mysql-reference-guide

- https://chat.openai.com/: For text verification and assistance.

- Finally, I got help from reviewing the answers to the challenge given in the NU coding bootcamp.





## Tests
I used Postman to test the API routes. I also tested the application in the browser.
