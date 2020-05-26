USE employee_trackerDB;

INSERT INTO employee(first_name, last_name, role_id)
VALUES ('Landon', 'Crapo', 2);

INSERT INTO employee(first_name, last_name, role_id)
VALUES ('Steven', 'O', 3);

INSERT INTO employee(first_name, last_name, role_id)
VALUES ('Dylan', 'Taft', 3);

USE employee_trackerDB;

INSERT INTO department(name)
VALUES ('Web Development');

USE employee_trackerDB;

INSERT INTO role(title, salary, department_id)
VALUES ('Instructor', 100000, 1);

USE employee_trackerDB;

INSERT INTO role(title, salary, department_id)
VALUES ('Teachers Assistant', 90000, 1);