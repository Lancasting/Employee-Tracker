var connection = require("./db/connection");
var mysql = require("mysql");

// class to insert data in database

// constructor for connection

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
                // "Update Employee's Manager",
                // "Update Employee's Department",
                // "View Budget of Department"
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
            // case "Update Employee's Manager":
            //     updateEmpManager()
            //     break;
            // case "Update Employee's Department":
            //     updateEmpDepartment()
            //     break;
            // case "View Budget of Department":
            //     viewBudget();
            //     break;

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
        //  console.log(data);
        // let choices = data.map(x => `${x.id} - ${x.department}`);
        let choices = [];
        for (let i = 0; i < data.length; i++) {
            choices.push(data[i].title);
            //  console.table(data);
        }

        // var choices = Object.values(data);
        console.log(choices);
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
            })
        })
    })
    init();
}
function viewAllByManager() {


    connection.query("SELECT * FROM employee WHERE manager_id IS NULL;", function (err, data) {
        if (err) throw err;
        let choices = [];
        console.log(data);
        console.log(choices);
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
            })
        })
    })
    init();
}
function viewAllByDepartment() {
    connection.query("SELECT department.name FROM department;", function (err, data) {
        if (err) throw err;
        let choices = [];
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            choices.push(data[i]);
        }
        inquirer.prompt([
            {
                type: "list",
                name: "viewByDepartment",
                message: "What department would you like to look at?",
                choices: [...choices]
            }
        ]).then(function (res) {
            var results = Object.values(res);
            var query = `SELECT employee.first_name, employee.last_name, employee.role_id, role.department_id, department.id, department.name
            FROM employee, role, department
            JOIN department
            ON role.department_id = department.id;`
            connection.query(query, [results], function (err, res) {
                if (err) throw err;
                console.table(res);
            })
        })
    })
    init();
}

function addEmployee() {
    connection.query()
}
function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "Enter the department's name:",
            validate: validateString
        }
    ]).then(function (data) {
        var query = connection.query(`INSERT INTO department (name) VALUES ('${data.department}');`, function (err, data) {
            if (err) throw err;
            return data;
        });
    });
    init();
}
function addRole() {
    connection.query()
}
function removeEmployee() {
    connection.query()
}
function removeDepartment() {
    connection.query()
}
function removeRole() {
    connection.query()
}
function updateEmpRole() {
    connection.query()
}
// function updateEmpManager(){
//     connection.query()
// }
// function updateEmpDepartment(){
//     connection.query()
// }
// function viewbu(){
//     connection.query()
// }
init();
    // function addRole() {
    //     var query = connection.query("SELECT id, department FROM department", function(err, data) {
    //         if (err) throw err;
    //         // let choices = data.map(x => `${x.id} - ${x.department}`);
    //         let choices = [];
    //         for (let i = 0; i < data.length; i++) {
    //             choices.push(data[i].id + " - " + data[i].department);
    //         }
    //         inquirer.prompt([
    //             {
    //                 type: "input",
    //                 name: "title",
    //                 message: "Enter the role name:",
    //                 validate: validateString
    //             },
    //             {
    //                 type: "input",
    //                 name: "salary",
    //                 message: "Enter the salary:",
    //                 validate: validateNumber
    //             },
    //             {
    //                 type: "list",
    //                 name: "department",
    //                 message: "Select the department:",
    //                 choices: [...choices]
    //             }
    //         ]).then(function(data) {
    //             var arr = data.department.split(" ");
    //             var deptID = parseInt(arr[0]);
    //             var query = connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${data.title}', ${data.salary}, ${deptID})`, function(err, data) {
    //                 if (err) throw err;
    //                 init();
    //             });
    //         });
    //     });
    // }
    // function addDepartment() {
    //     inquirer.prompt([
    //         {
    //             type: "input",
    //             name: "department",
    //             message: "Enter the department's name:",
    //             validate: validateString
    //         }
    //     ]).then(function(data) {
    //         var query = connection.query(`INSERT INTO department (department) VALUES ('${data.department}');`, function(err, data) {
    //             if (err) throw err;
    //             return data;
    //             init();
    //     });
    // });
    // }
    // function updateEmployee() {
    //     const emp = {
    //         first_name: "",
    //         last_name: "",
    //         role_id: 0,
    //         manager_id: 0,
    //         empID: 0
    //     };
    //     var query = connection.query("SELECT id, first_name, last_name FROM employee", function(err, data) {
    //         if (err) throw err;
    //         let choices = data.map(x => `${x.id} - ${x.first_name} ${x.last_name}`);
    //         inquirer.prompt([
    //             {
    //                 type: "list",
    //                 name: "employee",
    //                 message: "Select an employee:",
    //                 choices: [...choices]
    //             }
    //         ]).then(function(data) {
    //             var arr = data.employee.split(" ");
    //             emp.empID = parseInt(arr[0]);
    //             inquirer.prompt([
    //                 {
    //                     type: "input",
    //                     name: "firstName",
    //                     message: "Enter the employee's first name:",
    //                     validate: validateString
    //                 },
    //                 {
    //                     type: "input",
    //                     name: "lastName",
    //                     message: "Enter the employee's last name:",
    //                     validate: validateString
    //                 }
    //             ]).then(function(data) {
    //                 emp.first_name = data.firstName;
    //                 emp.last_name = data.lastName;
    //                 var query = connection.query("SELECT id, title FROM role", function(err, data) {
    //                     if (err) throw err;
    //                     let choices = data.map(x => `${x.id} - ${x.title}`);
    //                     inquirer.prompt([
    //                         {
    //                             type: "list",
    //                             name: "title",
    //                             message: "Select a title:",
    //                             choices: [...choices]
    //                         }
    //                     ]).then(function(data) {
    //                         var arr = data.title.split(" ");
    //                         emp.role_id = parseInt(arr[0]);
    //                         var query = connection.query("SELECT id, first_name, last_name FROM employee", function(err, data) {
    //                             if (err) throw err;
    //                             let choices = data.map(x => `${x.id} - ${x.first_name} ${x.last_name}`);
    //                             choices.push("This employee does not have a manager");
    //                             inquirer.prompt([
    //                                 {
    //                                     type: "list",
    //                                     name: "manager",
    //                                     message: "Select this employee's manager:",
    //                                     choices: [...choices]
    //                                 }
    //                             ]).then(function(data) {
    //                                 if (data.manager === "This employee does not have a manager") {
    //                                     emp.manager_id = null;
    //                                 }
    //                                 else {
    //                                     var arr = data.manager.split(" ");
    //                                     emp.manager_id = parseInt(arr[0]);
    //                                 }
    //                                 var query = connection.query(`UPDATE employee SET first_name = '${emp.first_name}', last_name = '${emp.last_name}', role_id = ${emp.role_id}, manager_id = ${emp.manager_id} WHERE id = ${emp.empID}`, function(err, data) {
    //                                     if (err) throw err;
    //                                     init();
    //                                     return data;
    //                                 });
    //                             });
    //                         });
    //                     });
    //                 });
    //             });
    //         });
    //     });
    // }
