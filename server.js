// dependency variables
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
const PasswordPrompt = require('inquirer/lib/prompts/password');

// create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // MySQL username
    user: 'root',
    // MySQL password
    password: 'siegirls2!',
    // database
    database: 'db/employee_db'
});

// initiate the connection to the database
connection.connect(err => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    afterConnection();
});

// after the connection is made to the database
afterConnection = () => {
    console.log(`
        ________________________

            EMPLOYEE MANAGER 
        ________________________   
    ;`)
    // Create first inquirer question on what they would like to do
        //View All Departments
        //View All Roles
        //View all Employees
        //Add A Department
        //Add a Role
        //Add an Employee
        //Update Employee Role
        //Update Employee Manager
        //View Employees By Manager
        //View Employees By Department
        //Delete departments, rolls, and employees
        //View Total of Department Budget (combined salaries)

    //.then to switch function for paths from above choices
}

//Show All Departments

//Show All Roles

//Show All Employees

//Add Department

//Add Role

//Add Employee

//Update Employee Role

//Update Employee Manager

//View Employees By Manager

//View Employees By Department

//Delete Department

//Delete Role

//Delete Employee

//View Budget by Department