
INSERT INTO departments (name)
VALUE ("Sales"),
      ("Engineering"),
      ("Finance"),
      ("Legal");


INSERT INTO roles (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2),
      ("Legal Team Lead", 250000, 4),
      ("Accountant", 125000, 3),
      ("Sales Lead", 100000, 1),
      ("Sales Associate", 80000, 1),
      ("Software Engineer", 120000, 2),
      ("Lawyer", 190000, 4),
      ("Manager", 200000, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUE ("Morgan", "Harrington", 8, null),
      ("Nate", "Schoemer", 8, null),
      ("Laura","Lerner", 3, null),
      ("Jenny", "Paulson", 8, 1),
      ("Chris", "White", 5, 4),
      ("Serena", "Sangiorgi", 6, 1),
      ("Justin", "Wooten", 7, 2),
      ("Lynnae", "Vanna", 1, 2);