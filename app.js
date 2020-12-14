const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
var mysql = require("mysql");
const util = require("util")

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

  connection.query = util.promisify(connection.query)

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
        "View all depts",
      ]
    })
    .then(async function(answer){
        console.log(answer);
        switch (answer.action) {
        case "View all employees":
            const employees = await viewAll(`employee`);
            console.table(employees);
            break;

        case "View all employees by department":

            break;

        case "View all employees by manager":

            break;

        case "Add an employee":
            const empInfo = await addEmployee();
            await createEntry(empInfo, "employee")
            console.log("success")
            break;
            
        case "Remove employee":

            break;

        case "Update employee role":

            break;

        case "Update employee manager":

            break;
        

        case "View all roles":
            const roles = await viewAll(`role`);
            console.table(roles);
            break;
        
        case "View all depts":
            const depts = await viewAll(`department`);
            console.table(depts);
            break;
            
        }
        setTimeout(() => {
            runTracker()
        }, 1000)
    });
  }

async function addEmployee() {
    try{

        const roles = await viewAll("role")
        const employees = await viewAll("employee")
        return inquirer.prompt(
            [{
                message: "What is the first name?",
                type: "input",
                name: "firstName",
            },
            
            {
                message: "What is the last name?",
                type: "input",
                name: "lastName",
            },
            
            {
                message: "What is the role?",
                type: "list",
                name: "roleId",
                choices: roles.map(role => {
                    return {value: role.id, name: role.title}
                })
            },
            {
                message: "Who is the manager?",
                type: "list",
                name: "managerId",
                choices: employees.map(manager => {
                    return {value: manager.id, name: manager.firstName +" "+ manager.lastName}
                })
            }
        ])
        
    }catch (err){
        throw err
    }
}

async function viewAll(tableName) {
    console.log("Selecting all employees...\n");
    const data = await connection.query(`SELECT * FROM ${tableName}`)
    return data;
}

function createEntry(data, table) {
    return connection.query(
      `INSERT INTO ${table} SET ?`, data)
}