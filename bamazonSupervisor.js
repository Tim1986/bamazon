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
]).then(function (response) {
    if (response.options === "View Product Sales by Department") {

        // Delete justProductSales table from previous run
        // QUERY1
        connection.query("DROP TABLE justProductSales", function (err, res) {
            if (err) throw err;

            // Delete product_sales column if it exists
            // QUERY2
            connection.query("ALTER TABLE departments DROP product_sales", function (err, res) {
                if (err) throw err;``

                // Combine product sales from departments to get the productSalesMerge set of objects
                // QUERY3
                connection.query("SELECT department_name, SUM(product_sales) AS product_sales FROM products INNER JOIN departments USING (department_name) GROUP BY department_name", function (err, res) {
                    if (err) throw err;
                    var productSalesMerge = res

                    // Recreate justProductSales table
                    // QUERY4
                    connection.query("CREATE TABLE justProductSales (department_name VARCHAR(255), product_sales INTEGER(10))", function (err, res) {
                        if (err) throw err;

                        // Turning my productSalesMerge objects into array structure for mass insert
                        var outerArray = []
                        for (var i = 0; i < productSalesMerge.length; i++) {
                            var innerArray = []
                            innerArray.push(productSalesMerge[i].department_name)
                            innerArray.push(productSalesMerge[i].product_sales)
                            outerArray.push(innerArray)
                        }

                        // Add array-ified productSalesMerge objects into justProductSales table
                        // QUERY5
                        connection.query("INSERT INTO justProductSales (department_name, product_sales) VALUES ?", [outerArray], function (err, res) {
                            if (err) throw err;

                            // Merge justProductSales table with departments table on department_name
                            // QUERY6
                            connection.query("SELECT * FROM departments d INNER JOIN justProductSales j ON d.department_name = j.department_name ORDER BY department_id ASC", function (err, res) {
                                if (err) throw err;
                                var tableWithSales = res

                                // Create product_sales column in departments table
                                // QUERY7
                                connection.query("ALTER TABLE departments ADD COLUMN product_sales INTEGER(10) DEFAULT 0", function (err, res) {
                                    if (err) throw err;






                                    var outerArray = []
                                    for (var i = 0; i < productSalesMerge.length; i++) {
                                        var innerArray = []
                                        innerArray.push(productSalesMerge[i].department_name)
                                        innerArray.push(productSalesMerge[i].product_sales)
                                        outerArray.push(innerArray)
                                    }
                                    console.log(outerArray)
            
                                    var testArray = [

                                    ]

                                    // Add product Sales info to departments table
                                    // QUERY7.5 (IN PROCESS)
                                    connection.query("UPDATE departments SET product_sales = 10, product_sales = 4 WHERE department_name = 'bakery'", function (err, res) {
                                            if (err) throw err;

                                            // Time for Total Profit
                                            // Delete totalProfit table from previous run
                                            // QUERY8
                                            connection.query("DROP TABLE justTotalProfit", function (err, res) {
                                                if (err) throw err;

                                                // Recreate totalProfit table
                                                // QUERY9
                                                connection.query("CREATE TABLE justTotalProfit (department_name VARCHAR(255), total_profit INTEGER(10))", function (err, res) {
                                                    if (err) throw err;

                                                    // find total_profit from (product_sales - over_head_costs) and make them arrays
                                                    var outerArray = []
                                                    for (var i = 0; i < tableWithSales.length; i++) {
                                                        var innerArray = []
                                                        innerArray.push(tableWithSales[i].department_name)
                                                        innerArray.push((parseFloat(tableWithSales[i].product_sales) - parseFloat(tableWithSales[i].over_head_costs)))
                                                        outerArray.push(innerArray)
                                                    }
                                                    // console.log(outerArray)

                                                    // Push these arrays into the totalProfit table
                                                    // QUERY10
                                                    connection.query("INSERT INTO justTotalProfit (department_name, total_profit) VALUES ?", [outerArray], function (err, res) {
                                                        if (err) throw err;

                                                        // Merge justTotalProfit table with departments table on department_name
                                                        // QUERY11
                                                        connection.query("SELECT * FROM departments d INNER JOIN justTotalProfit j ON d.department_name = j.department_name ORDER BY department_id ASC", function (err, res) {
                                                            if (err) throw err;

                                                            console.table(res)
                                                            connection.end()
                                                        })
                                                        })
                                                    })
                                                })
                                            })
                                        // })
                                })
                            })
                        })
                    })
                })
            })
        })
    } else {
        console.log("I'll get to it")
    }
})

// SELECT p.department_name, SUM(d.over_head_costs) AS total_overhead, SUM(p.product_sales) AS total_sales, SUM(p.product_sales) - SUM(d.over_head_costs) AS total_profit
// FROM products AS p INNER JOIN departments AS d 
// ON p.department_name = d.department_name
// GROUP BY d.department_name;
