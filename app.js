// dependency variables
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = require('./db/connection');

// initialize App
class BeginApp {
    constructor () {

        // Set of actions for the user to pick
        this.startActions = [
            {
                type: "list",
                name: "actions",
                message: "What would you like to do?",
                choices: ['View All Departments', 
                          'View All Roles', 
                          'View All Employees',
                          'View Employees By Manager',
                          'View Employees By Department',
                          'Add A Department',
                          'Add A Role',
                          'Add An Employee',
                          'Update Employee Role',
                          'Update Employee Manager',
                          'Delete A Department',
                          'Delete A Role',
                          'Delete An Employee',
                          'View Department Budgets',
                          'Exit'
                         ]
            }
        ]
    }

    // Begin the app by starting with the startActions question
    startApp() {
        inquirer.prompt(this.startActions).then(data => {
            switch (data.actions) {
                case "View All Departments":
                    this.viewDepartments();
                    break;
                case "View All Roles":
                    this.viewRoles();
                    break;
                case "View All Employees":
                    this.viewEmployees();
                    break;
                case "View Employees By Manager":
                    this.viewEmployeesByManager();
                    break;
                case "View Employees By Department":
                    this.viewEmployeesByDepartment();
                    break;
                case "Add A Department":
                    this.addDepartment();
                    break;
                case "Add A Role":
                    this.addRole();
                    break;
                case "Add An Employee":
                    this.addEmployee();
                    break;
                case "Update Employee Role":
                    this.updateRole();
                    break;
                case "Update Employee Manager":
                    this.updateManager();
                    break;
                case "Delete A Department":
                    this.deleteDepartment();
                    break;
                case "Delete A Role":
                    this.deleteRole();
                    break;
                case "Delete An Employee":
                    this.deleteEmployee();
                    break;
                case "View Department Budgets":
                    this.viewBudgets();
                    break;
                case "Exit":
                    connection.end();
                    break;
            }
        })
    }

    // View All Departments Function
    viewDepartments() {
        console.log(`

        * Viewing Departments *
        `)
        connection.query(`SELECT * FROM departments`, function(err, res) {
            if (err) throw err;
            console.table(res);
            beginAgain();
        })
    }

    // View All Roles Function
    viewRoles() {
        console.log(`

        * Viewing All Roles *
        `)
        connection.query(`SELECT * FROM roles`, function(err, res) {
            if (err) throw err;
            console.table(res);
            beginAgain();
        })
    }

    // View All Departments Function
    viewEmployees() {
        console.log(`

        * Viewing All Employees *
        `)
        connection.query(`SELECT * FROM employees`, function(err, res) {
            if (err) throw err;
            console.table(res);
            beginAgain();
        })
    }

    // View Employees by Manager Function - Bonus
    viewEmployeesByManager() {
        console.log(`

        * Viewing All Employees by Manager *
        `)
        connection.query(`SELECT e.first_name, e.last_name, e.manager_id, m.first_name, m.last_name FROM employees e, employees m WHERE e.manager_id = m.first_name;`, function(err, res) {
            if (err) throw err;
            console.table(res);
            beginAgain();
        })
    }

    // View Employees by Department Function - Bonus
    viewEmployeesByDepartment() {
        console.log(`

        * Viewing All Employees by Department *
        `)
        connection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title AS role, departments.name AS department FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id ORDER BY department;`, function(err, res) {
            if (err) throw err;
            console.table(res);
            beginAgain();
        })
    }

    // Add Department Function
    addDepartment() {
        console.log('Adding a Department');
        this.startApp();
    }

    // Add Role Function
    addRole() {
        console.log('Adding a Role');
        this.startApp();
    }

    // Add Employee Function
    addEmployee() {
        console.log('Adding an Employee');
        this.startApp();
    }

    // Update Role Function
    updateRole() {
        console.log('Updating Employee Role');
        this.startApp();
    }

    // Update Manager Function
    updateManager() {
        console.log('Updating Employee Manager');
        this.startApp();
    }

    // Delete Department Function
    deleteDepartment() {
        console.log('Deleting Department');
        this.startApp();
    }

    // Delete Role Function
    deleteRole() {
        console.log('Deleting Role');
        this.startApp();
    }

    // Delete Employee Function
    deleteEmployee() {
        console.log('Deleting Employee');
        this.startApp();
    }

    // View Budget Function
    viewBudgets() {
        console.log('Viewing Department Budgets');
        this.startApp();
    }

}

//restart the app after choice has been made
function beginAgain () {
    new BeginApp().startApp();
}

module.exports = BeginApp;
