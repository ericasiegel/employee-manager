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
            const managers = res[i];
            managersArr.push({
                name: managers.manager,
                value: managers.id
            });
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
            const roles = res[i];
            rolesArr.push({
                name: roles.title,
                value: roles.id
            });
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
            employeesArr.push({
                name: employees.employee,
                value: employees.id
            });
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
                        //   'View Department Budgets',
                          'Exit'
                         ]
            }
        ]
    }

    // Begin the app by starting with the startActions question
    startApp() {
        inquirer.prompt(this.startActions).then(data => {
            switch (data.actions) {
                // View All Departments
                case "View All Departments":
                    this.viewDepartments();
                    break;
                // View All Roles
                case "View All Roles":
                    this.viewRoles();
                    break;
                // View All Employees
                case "View All Employees":
                    this.viewEmployees();
                    break;
                // View Employees By Manager
                case "View Employees By Manager":
                    this.viewEmployeesByManager();
                    break;
                //View Employees By Department
                case "View Employees By Department":
                    this.viewEmployeesByDepartment();
                    break;
                // Add A Department
                case "Add A Department":
                    this.addDepartment();
                    break;
                // Add A Role
                case "Add A Role":
                    this.addRole();
                    break;
                // Add An Employee
                case "Add An Employee":
                    this.addEmployee();
                    break;
                // Update Employee Role
                case "Update Employee Role":
                    this.updateRole();
                    break;
                // Update Employee Manager
                case "Update Employee Manager":
                    this.updateManager();
                    break;
                // Delete A Department
                case "Delete A Department":
                    this.deleteDepartment();
                    break;
                // Delete A Role
                case "Delete A Role":
                    this.deleteRole();
                    break;
                // Delete An Employee
                case "Delete An Employee":
                    this.deleteEmployee();
                    break;
                // case "View Department Budgets":
                //     this.viewBudgets();
                //     break;
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
            // console.log(answers);
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
                    role_id: answers.role,
                    manager_id: answers.manager
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
        console.log(`

        * Update Employee Role *
        `)
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: "What employee would you like to update?",
                choices: employeeSelection()
            },
            {
                type: 'list',
                name: 'role',
                message: "What role would you like to update?",
                choices: roleSelection()
            }
        ]).then(answers => {
            const query = connection.query(`UPDATE employees SET ? WHERE ?`,
                {
                    role_id: answers.role
                },
                {
                    id: answers.employee
                },
            function(err, res) {
                if (err) throw err;
                console.table(res.affectedRows + ' employee role updated!\n');
                beginAgain();
            })
        })
    }

    // Update Manager Function
    updateManager() {
        console.log(`

        * Update Employee Manager *
        `)
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: "What employee would you like to update?",
                choices: employeeSelection()
            },
            {
                type: 'list',
                name: 'manager',
                message: "What role would you like to update?",
                choices: managerSelection()
            }
        ]).then(answers => {
            const query = connection.query(`UPDATE employees SET ? WHERE ?`,
                {
                    manager_id: answers.manager
                },
                {
                    id: answers.employee
                },
            function(err, res) {
                if (err) throw err;
                console.table(res.affectedRows + ' employee role updated!\n');
                beginAgain();
            })
        })
    }

    // Delete Department Function - BONUS
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
                    id: answers.name
                },
            function(err, res) {
                if (err) throw err;
                console.table(res.affectedRows + ' department deleted!\n');
                beginAgain();
            })
        })
    }

    // Delete Role Function - BONUS
    deleteRole() {
        console.log(`

        * Delete A Role *
        `)
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
                    id: answers.role
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

    // Delete Employee Function - BONUS
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
                    id: answers.name
                },
            function(err, res) {
                if (err) throw err;
                console.table(res.affectedRows + ' employee deleted!\n');
                beginAgain();
            })
        })
    }

    // View Budget Function - BONUS
    // viewBudgets() {
    //     console.log(`

    //     * Viewing Budgets By Departments *
    //     `)
    //     connection.query(`SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles LEFT JOIN departments ON roles.department_id = departments.id ORDER BY department DESC;`, function(err, depts) {
    //         if (err) throw err;
    //         connection.query(`SELECT SUM(roles.salary) AS budget FROM roles WHERE department;`, function(err, res) {
    //             if (err) throw err;
    //             console.table(res);
    //             beginAgain();
    //         })
    //     })
        
    // }

}

//restart the app after choice has been made
function beginAgain () {
    new BeginApp().startApp();
}

module.exports = BeginApp;
