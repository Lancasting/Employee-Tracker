USE employee_trackerDB;

INSERT INTO employee(first_name, last_name, role_id)
VALUES ('Landon', 'Crapo', 1);

USE employee_trackerDB;

INSERT INTO department(name)
VALUES ('Web Development');

USE employee_trackerDB;

INSERT INTO role(title, salary, department_id)
VALUES ('Instructor', 100000, 1);