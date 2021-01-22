// dependency variables
const mysql = require('mysql2');
const connection = require('../db/connection');

//get list of managers from employees table
let managerSelection = function() {
    let managersArr = [];
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
let roleSelection = function() {
    let rolesArr = [];
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
let departmentSelection = function() {
    let departmentsArr = [];
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
let employeeSelection = function() {
    let employeesArr = [];
    connection.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS employee FROM employees;`, function(err, res) {
        if (err) throw err;
        // console.log(res);
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

module.exports = { managerSelection, roleSelection, departmentSelection, employeeSelection };