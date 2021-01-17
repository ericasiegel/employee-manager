-- if the database exists then drop it and create a new one
DROP DATABASE IF EXISTS employees_db;
    CREATE DATABASE employees_db;
    USE employees_db;

-- create department table
CREATE TABLE department (
    id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- create role table
CREATE TABLE role (
    id INTEGER(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT NOT NULL
);

-- create employee table
CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);