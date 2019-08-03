var inquirer = require("inquirer")
var mysql = require("mysql")

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

connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId + "\n");
    displayItems()
});

function displayItems() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("-------------------------------------------------")
        console.log("Here are all of our available products: ");
        console.log("-------------------------------------------------")
        for (var i = 0; i < res.length; i++) {
            console.log("\nID: " + res[i].id + " | " + "Product Name: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: $" + res[i].price + " | Quantity: " + res[i].stock_quantity + "\n"

            )
        }
        console.log("-------------------------------------------------")
        promptPurchase()
    })
}

// 1. Display all current items for sale

function promptPurchase() {
    inquirer.prompt([
        {
            name: "productID",
            message: "What is the ID of the product you wish to buy?"
        },
        {
            name: "number",
            message: "How many units would you like to buy?"
        }
    ]).then(function (response) {
        var yourProductID = response.productID
        // console.log("yourProductID = " + yourProductID)
        var unitsYouWant = response.number
        // console.log("UnitsYouWant = " + unitsYouWant)
        connection.query("SELECT * FROM products WHERE ?",
            {
                id: yourProductID
            },
            function (err, res) {
                if (err) throw err;
                var unitsWeHave = res[0].stock_quantity
                var previousSalesNumber = res[0].product_sales
                console.log("previousSalesNumber = " + previousSalesNumber)
                // console.log("unitsWeHave = " + unitsWeHave)
                var yourProductCost = res[0].price
                // console.log("YourProductCost = " + yourProductCost)
                if (unitsWeHave > unitsYouWant) {
                    console.log("SOLD!")
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: unitsWeHave - unitsYouWant
                            },
                            {
                                id: yourProductID
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            var cost = yourProductCost * unitsYouWant
                            console.log("That'll cost $" + cost)
                            connection.query("UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        product_sales: previousSalesNumber + cost
                                    },
                                    {
                                        id: yourProductID
                                    }
                                ],
                                function (err, res) {
                                    if (err) throw err;
                                    console.log("product_sales column updated")
                                    connection.end()
                                }
                            )
                        })
                } else {
                    console.log("Insufficient Quantity!")
                    connection.end()
                }
            })
        // if (there are sufficient units) {
        //     subtract number of units from MySQL database
        //     calculate cost
        //     console.log(the cost of the purchase)
        // } else {
        //     console.log("Insufficient quantity! We only have X of those!")
        // }
    })
}
