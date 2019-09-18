var inquirer = require("inquirer")
var mysql = require("mysql")
var table = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

inquirer.prompt([
    {
        type: "list",
        name: "options",
        message: "Choose an option",
        choices: ["View Product Sales by Department", "Create New Department"]
    }
    // in products, sum total sales of each department by department name. display that in departments table
    // in departments, subtract total overhead from total sales. display that in departments table
]).then(function (response) {
    if (response.options === "View Product Sales by Department") {
        connection.query("SELECT p.department_name, SUM(d.over_head_costs) AS total_overhead, SUM(p.product_sales) AS total_sales, SUM(p.product_sales) - SUM(d.over_head_costs) AS total_profit FROM products AS p INNER JOIN departments AS d ON p.department_name = d.department_name GROUP BY d.department_name", function (err, res) {
            console.table(res)
            connection.end()
        })
    } else {
        console.log("I'll get to it")
    }
})
