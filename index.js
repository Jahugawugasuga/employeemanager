var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employees_db"
});
//Make connection - give feedback to user connection has been established, then run inquirer
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    teamEditor();
});

function teamEditor() {

    inquirer
        .prompt(

            {
                type: "list",
                message: "Which action would you like to perform?",
                name: "action",
                choices: [
                    "View All Employees", //generate a list of all employees in db
                    "View All Employees By Department", //same as above, filtered results by dept
                    "View All Employees By Role", // same but by role
                    "Add Employee", // 4 criteria
                    "Add Department", // 
                    "Add Role",
                    "Update Employee Role"
                    // "Update Employee Manager",


                    // "View All Managers",
                    // "Add Manager",
                ]
            })


        .then(function (res) {
            console.log(res)
            switch (res.action) {
                case "View All Employees":
                    viewDepartments();
                    break;
                case "View All Employees By Department":
                    viewEmployees();
                    break;
                case "View All Employees By Role":
                    viewRoles();
                    break;
                case "Add Employee":
                    addEmployees();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRoles();
                    break;
                case "Update Employee Roles":
                    updateRoles();
                    break;
            }
        })

    function viewEmployees() {
        connection.query("SELECT * FROM employees_db.employees;", function (err, res) {
            if (err) throw err;
            console.table(res);
        })
    };
    function viewDepartments() {
        connection.query("SELECT * FROM employees_db.departments;", function (err, res) {
            if (err) throw err;
            console.table(res);
        })
    };
    function viewRoles() {
        connection.query("SELECT * FROM employees_db.roles;", function (err, res) {
            if (err) throw err;
            console.table(res);
        })
    };

    function addDepartment() {
        inquirer.prompt(
            {
                type: "input",
                message: "Please type the name of the Department you would like to add.",
                name: "newDepartment"
            }
        )
            .then(function (res) {
                connection.query("INSERT INTO employees_db.departments (newDepartment) VALUES (?)", [res.newDepartment], function (err, res) {
                    if (err) throw err;
                    console.table(res)
                })
                addAnother();
            })

    function addEmployees() {
        inquirer.prompt(
                {
                    type: "input",
                    message: "What is the first name of the employee?",
                    name: "first_name",

                    type: "input",
                    message: "What is the last name of the employee?",
                    name: "last_name",

                    type: "list",
                    message: "What is the employee's role?",
                    name: "role",
                    choices:
                        [
                            "Chimney Sweep",
                            "Lunch Lady/Lad",
                            "HR",
                            "Operations",
                            "Administration",
                            "Field Worker",
                            "IT",
                            "Manager"
                        ],
                    type: "list",
                    message: "Please select the employee's Manager",
                    name: "employee_manager",
                    choices:
                        [
                            "John Smith",
                            "Greg Ostertag",
                            "John Stockton",
                            "Jerry Sloan"
                        ],
                })

                .then(function (res) {
                    connection.query("INSERT INTO employees_db.employees (first_name, last_name, role, employee_manager) VALUES (?,?,?,?)", [res.first_name, res.last_name, res.role, res.employee_manager], function (err, res) {
                        if (err) throw err;
                        console.table(res)
                    })
                    addAnother();
                })

            }

        

            function addRoles() {
                inquirer.prompt(
                    {
                        type: "input",
                        message: "Please type the name of the Role you would like to add.",
                        name: "newRole"
                    }
                )
                    .then(function (res) {
                        connection.query("INSERT INTO employees_db.roles (newRoles) VALUES (?)", [res.newRole], function (err, res) {
                            if (err) throw err;
                            console.table(res)
                        })
                        addAnother();
                    })

            }
        }
    }
                function addAnother() {
                    inquirer
                        .prompt(
                            {
                                type: "list",
                                message: "Would you like to make another change?",
                                name: "more",
                                choices: [
                                    "yes",
                                    "no"
                                ],
                            }

                        )
                        .then(function (res) {
                            if (res.more === "yes") {
                                teamEditor();
                            } else {
                                connection.end()
                            }

                        })
                }
            
        
