var connection = require("./db/connection");
var mysql = require("mysql");
this.connection = connection
const consoleTable = require("console.table");
const inquirer = require("inquirer");
const printMessage = require('print-message');
function validateString(answer) {
    if (answer != "" && isNaN(parseInt(answer))) {
        return true;
    }
    return false;
}
function validateNumber(answer) {
    if (answer != "" && !isNaN(parseInt(answer))) {
        return true;
    }
    return false;
}
printMessage([
    "Employee Tracker",
    "Follow the prompts to view employees and make changes",

]);
function init() {
    inquirer.prompt([
        {
            type: "list",
            name: "init",
            message: "Select an option:",
            choices: [
                "View All Employees",
                "View All Employees By Role",
                "View All Employees By Manager",
                "View All Employees By Department",
                "Add An Employee",
                "Add A Department",
                "Add A Role",
                "Remove Employee",
                "Remove Department",
                "Remove Role",
                "Update Employee's Role",
            ]
        }
    ]).then(function (answer) {
        switch (answer.init) {
            case "View All Employees":
                viewAll();
                break;
            case "View All Employees By Role":
                viewAllByRole();
                break;
            case "View All Employees By Manager":
                viewAllByManager();
                break;
            case "View All Employees By Department":
                viewAllByDepartment();
                break;
            case "Add An Employee":
                addEmployee();
                break;
            case "Add A Department":
                addDepartment();
                break;
            case "Add A Role":
                addRole();
                break;
            case "Remove Employee":
                removeEmployee();
                break;
            case "Remove Department":
                removeDepartment();
                break;
            case "Remove Role":
                removeRole();
                break;
            case "Update Employee's Role":
                updateEmpRole()
                break;
        }
    });
}
function viewAll() {
    connection.query("SELECT name as 'Department', first_name as 'First Name', last_name as 'Last Name', title as 'Role' FROM employee JOIN role ON role_id = role.id JOIN department ON department_id = department.id ORDER BY name", function (err, data) {
        if (err) throw err;
        console.table(data);
        init();
    });
}
function viewAllByRole() {

    connection.query("SELECT role.title FROM role", function (err, data) {
        if (err) throw err;
        let choices = [];
        for (let i = 0; i < data.length; i++) {
            choices.push(data[i].title);
        }
        inquirer.prompt([
            {
                type: "list",
                name: "viewByRole",
                message: "What role would you like to look at?",
                choices: [...choices]
            }
        ]).then(function (res) {
            var results = Object.values(res);
            var query = `SELECT employee.first_name, employee.last_name, employee.role_id, role.title FROM employee
             LEFT JOIN role ON employee.role_id = role.id WHERE role.title = ?;`
            connection.query(query, [results[0]], function (err, res) {
                if (err) throw err;
                console.table(res);
                init();
            })
        })
    })
}
function viewAllByManager() {
    connection.query("SELECT * FROM employee WHERE manager_id IS NULL;", function (err, data) {
        if (err) throw err;
        let choices = [];
        for (let i = 0; i < data.length; i++) {
            choices.push(data[i].role_id);
        }
        inquirer.prompt([
            {
                type: "list",
                name: "viewByManager",
                message: "What managers I.D team would you like to look at?",
                choices: [...choices]
            }
        ]).then(function (res) {
            var results = Object.values(res);
            var query = `SELECT employee.first_name, employee.last_name, employee.manager_id FROM employee WHERE employee.manager_id = ?;`
            connection.query(query, [results], function (err, res) {
                if (err) throw err;
                console.table(res);
                init();
            })
        })
    })
}
function viewAllByDepartment() {
    connection.query("SELECT * FROM department;", function (err, data) {
        if (err) throw err;
        const choices = data.map(({ id, name }) => ({
            name: name,
            value: id
        }))
        inquirer.prompt([
            {
                type: "list",
                name: "departmentId",
                message: "What department would you like to look at?",
                choices: choices
            }
        ]).then(function (res) {
            var results = Object.values(res);
            var query = `SELECT employee.first_name, employee.last_name, employee.role_id, role.department_id, department.id, department.name
            FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id
            WHERE department.id = ?;`
            connection.query(query, [results], function (err, res) {
                if (err) throw err;
                console.table(res);
                init();
            })
        })
    })
}
function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Enter the employee's first name:",
            validate: validateString
        },
        {
            type: "input",
            name: "lastName",
            message: "Enter the employee's last name",
            validate: validateString
        },
        {
            type: "input",
            name: "roleId",
            message: "What role ID should they have?",
            validate: validateNumber
        },
        {
            type: "input",
            name: "managerID",
            message: "What is their manager ID?"
        }
    ]).then(function (res) {
        var results = Object.values(res);
        var query = `INSERT INTO employee (employee.first_name, employee.last_name, employee.role_id, employee.manager_id) VALUES (?);`
        connection.query(query, [results], function (err, res) {
            if (err) throw err;
            return res;
        });
        init();
    });
}
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Enter the department's name:",
            validate: validateString
        }
    ]).then(function (res) {
        var results = Object.values(res);
        var query = `INSERT INTO department (name) VALUES (?);`
        connection.query(query, [results], function (err, data) {
            if (err) throw err;
            return data;
        });
        init();
    });
}
function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "addRole",
            message: "Please enter the new role",
            validate: validateString
        },
        {
            type: "input",
            name: "addSalary",
            message: "Please enter the salary for this role",
            validate: validateNumber
        },
        {
            type: "input",
            name: "departmentId",
            message: "What department ID?",
            validate: validateNumber
        }
    ]).then(function (res) {
        var results = Object.values(res);
        var query = `INSERT INTO role (title, salary, department_id) VALUES (?);`
        connection.query(query, [results], function (err, res) {
            if (err) throw err;
            return (res);
        });
        init()
    });
}
function removeEmployee() {
    connection.query("SELECT * FROM employee;", function (err, data) {
        if (err) throw err;
        const choices = data.map(({ id, first_name }) => ({
            name: first_name,
            value: id
        }))
        inquirer.prompt([
            {
                type: "list",
                name: "removeEmployee",
                message: "what employee do you want to remove?",
                choices: choices
            }
        ]).then(function (res) {
            var results = Object.values(res);
            let query = connection.query(`DELETE FROM employee WHERE employee.id = ${results};`, function (err, res) {
                if (err) throw err;
                return res;
            })
            init();
        })
    })
}
function removeDepartment() {
    connection.query("SELECT * FROM department;", function (err, data) {
        if (err) throw err;
        const choices = data.map(({ id, name }) => ({
            name: name,
            value: id
        }));
        inquirer.prompt([
            {
                type: "list",
                name: "removeDepartment",
                message: "what department do you want to remove?",
                choices: choices
            }
        ]).then(function (res) {
            var results = Object.values(res);
            let query = connection.query(`DELETE FROM department WHERE department.id = ${results};`, function (err, res) {
                if (err) throw err;
                return res;
            })
            init();
        })
    })
}
function removeRole() {
    connection.query("SELECT * FROM role;", function (err, data) {
        if (err) throw err;
        const choices = data.map(({ id, title }) => ({
            name: title,
            value: id
        }))
        inquirer.prompt([
            {
                type: "list",
                name: "removeRole",
                message: "what role do you want to remove?",
                choices: choices
            }
        ]).then(function (res) {
            var results = Object.values(res);
            let query = connection.query(`DELETE FROM role WHERE role.id = ${results};`, function (err, res) {
                if (err) throw err;
                return res;
            })
            init();
        })
    })
}
function updateEmpRole() {
    connection.query("SELECT * FROM employee;", function (err, data) {
        if (err) throw err;
        let employees = [];
        data.forEach(employee => {
            employees.push(`${employee.id}) ${employee.first_name} ${employee.last_name}`)
        });
        inquirer.prompt([
            {
                type: "list",
                name: "name",
                message: "what employee would you like to update?",
                choices: employees
            },
        ]).then(function (res) {
            res.name = res.name.split(')')[0];
            let query = `SELECT * FROM employee WHERE ?`;
            connection.query(query, { id: res.name }, function (err, results) {
                if (err) throw err;
                inquirer.prompt([
                    {
                        type: "input",
                        name: "id",
                        message: "What is the new role ID?", default: results.role_id,
                        validate: validateNumber
                    }
                ]).then(function (res) {
                    const newRoleId = { role_id: res.id };
                    const updateId = { id: results[0].id };
                    let query = `UPDATE employee SET ? WHERE ?`
                    connection.query(query, [newRoleId, updateId], function (err, results) {
                        if (err) throw err;
                        init();
                    });
                });
            });
        });
    });
}
init();