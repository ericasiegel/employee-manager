// dependency variables
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = require('./db/connection');

//get list of managers from employees table
let managersArr = [];
let managerSelection = function() {
    connection.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS manager, role_id FROM employees WHERE role_id = 8;`, function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            const managers = res[i].manager;
            managersArr.push(managers);
        }
        
    })
    return managersArr;
}

//get list of roles from roles table
let rolesArr = [];
let roleSelection = function() {
    connection.query(`SELECT roles.id, roles.title FROM roles;`, function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            const roles = res[i].title;
            rolesArr.push(roles);
        }
        
    })
    return rolesArr;
}

//get list of departments from departments table
let departmentsArr = [];
let departmentSelection = function() {
    connection.query(`SELECT * FROM departments;`, function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            const departments = res[i];
            departmentsArr.push({
                name: departments.name,
                value: departments.id
            });
        }
        
    })
    return departmentsArr;
}
//get list of employees from employees table
let employeesArr = [];
let employeeSelection = function() {
    connection.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS employee FROM employees;`, function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            const employees = res[i];
            employeesArr.push(employees);
        }
        
    })
    return employeesArr;
}


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
        connection.query(`SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id ORDER BY department DESC;`, function(err, res) {
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
        connection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title AS title, roles.salary AS salary, departments.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees m ON employees.manager_id = m.id;`, function(err, res) {
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
            connection.query(`SELECT e.id, e.first_name, e.last_name, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.id ORDER BY manager DESC;`, function(err, res) {
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
        connection.query(`SELECT employees.id, employees.first_name, employees.last_name, roles.title AS role, departments.name AS department FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id ORDER BY department DESC;`, function(err, res) {
            if (err) throw err;
            console.table(res);
            beginAgain();
        })
    }

    // Add Department Function
    addDepartment() {
        console.log(`

        * Add A Department *
        `)
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the department?'
            }
        ]).then(answers => {
            const query = connection.query(`INSERT INTO departments SET ?`,
                {
                    name: answers.name
                },
            function(err, res) {
                if (err) throw err;
                console.table(res.affectedRows + ' department added!\n');
                beginAgain();
            })
        })
        
    }

    // Add Role Function
    addRole() {
        console.log(`

        * Add A Role *
        `)
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: "What is the role title?"
            },
            {
                type: 'input',
                name: 'salary',
                message: "What is the annual salary?"
            },
            {
                type: 'list',
                name: 'department',
                message: "What is the department the role belongs to?",
                choices: departmentSelection()
            }
        ]).then(answers => {
            // let id = answers.department.id;
            console.log(answers);
            const query = connection.query(`INSERT INTO roles SET ?`,
                {
                    title: answers.title,
                    salary: answers.salary,
                    department_id: answers.department
                },
            function(err, res) {
                if (err) throw err;
                console.table(res.affectedRows + ' role added!\n');
                beginAgain();
            })
        })
    }

    // Add Employee Function
    addEmployee() {
        console.log(`

        * Add An Employee *
        `)
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "What is the employee's first name?"
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is the employee's last name?"
            },
            {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: roleSelection()
            },
            {
                type: 'list',
                name: 'manager',
                message: "Who is the employee's manager?",
                choices: managerSelection()
            }
        ]).then(answers => {
            const query = connection.query(`INSERT INTO employees SET ?`,
                {
                    first_name: answers.first_name,
                    last_name: answers.last_name,
                    role_id: answers.role.id,
                    manager_id: answers.manager.id
                },
            function(err, res) {
                if (err) throw err;
                console.table(res.affectedRows + ' employee added!\n');
                beginAgain();
            })
        })
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
        console.log(`

        * Delete A Department *
        `)
        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: "What department would you like to delete?",
                choices: departmentSelection()
            }
        ]).then(answers => {
            const query = connection.query(`Delete FROM departments WHERE ?`,
                {
                    name: answers.name
                },
            function(err, res) {
                if (err) throw err;
                console.table(res.affectedRows + ' department deleted!\n');
                beginAgain();
            })
        })
    }

    // Delete Role Function
    deleteRole() {
        // console.log(`

        // * Delete A Role *
        // `)
        inquirer.prompt([
            {
                type: 'list',
                name: 'role',
                message: "What role would you like to delete?",
                choices: roleSelection()
            }
        ]).then(answers => {
            const query = connection.query(`Delete FROM roles WHERE ?`,
                {
                    title: answers.role
                },
            function(err, res) {
                if (err) throw err;
                console.table(res.affectedRows + ' role deleted!\n');
                beginAgain();
            })
        }).catch(error => {
            throw error;
        })
    }

    // Delete Employee Function
    deleteEmployee() {
        console.log(`

        * Delete An Employee *
        `)
        inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: "What employee would you like to delete?",
                choices: employeeSelection()
            }
        ]).then(answers => {
            const query = connection.query(`Delete FROM employees WHERE ?`,
                {
                    first_name: answers.name
                },
            function(err, res) {
                if (err) throw err;
                console.table(res.affectedRows + ' employee deleted!\n');
                beginAgain();
            })
        })
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
