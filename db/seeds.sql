-- designate employees_db as the database to use
USE employees_db;

-- insert into department table
INSERT INTO department (name)
    VALUES
        ('Sales'),
        ('IT'),
        ('Finance'),
        ('Human Resources'),
        ('Legal');

-- insert into role table
INSERT INTO role (title, salary, department_id)
    VALUES
        ('Sales Associate', 24000, 1),
        ('Sales Lead', 30000, 1),
        ('Technician', 25000, 2),
        ('Software Engineer', 35000, 2),
        ('Accountant', 33000, 3),
        ('Payroll', 29000, 3),
        ('Recruiter', 26000, 4),
        ('HR Coordinator', 28000, 4),
        ('Paralegal', 36000, 5),
        ('Lawyer', 40000, 5);



-- insert into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
        ('Jane', 'Doe', 1, 1),
        ('Chris', 'Pine', 2, 1),
        ('Lidya', 'Horton', 3, null),
        ('Janice', 'Prince', 4, null),
        ('Sarah', 'Siegel', 5, 3),
        ('Laura', 'Lerner', 6, 3),
        ('Nate', 'Schoemenr', 7, 4),
        ('Amelia', 'Meyers', 8, 4),
        ('Talia', 'Payne', 9, 5),
        ('Leighton', 'Meester', 10, 5),
        ('Chris', 'White', 1, 1),
        ('Linda', 'Lee', 4, null),
        ('Mark', 'Reagan', 10, 5),
        ('Tom', 'Allen', 3, null);
