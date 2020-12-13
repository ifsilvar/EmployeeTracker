const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "ivan",
  
    // Your password
    password: "123456",
    database: "employee_DB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    runTracker();
  });

  function runTracker() {
    inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all employees by department",
        "View all employees by manager",
        "Add an employee",
        "Remove employee",
        "Update employee role",
        "Update employee manager",
        "View all roles",
        ""
      ]
    })
    
  }