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
    })
}

function displayLowInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var lowInventoryArray = []
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
                lowInventoryArray.push(res[i])
            }
        }
        if (lowInventoryArray.length !== 0) {
            console.log("-------------------------------------------------")
            console.log("Here are our low inventory products: ");
            console.log("-------------------------------------------------")
            for (var i = 0; i < lowInventoryArray.length; i++) {
                console.log("\nID: " + lowInventoryArray[i].id + " | " + "Product Name: " + lowInventoryArray[i].product_name + " | " + "Department: " + lowInventoryArray[i].department_name + " | " + "Price: $" + lowInventoryArray[i].price + " | Quantity: " + lowInventoryArray[i].stock_quantity + "\n"
                )
            }
            console.log("-------------------------------------------------")
        } else {
            console.log("We currently have no low inventory products")
        }
    })
}

function addInventory() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var choicesArray = []
        for (var i = 0; i < res.length; i++) {
            choicesArray.push(res[i].product_name)
        }
        // console.log(choicesArray)
        inquirer.prompt([
            {
                type: "list",
                name: "increase",
                message: "Which item would you like to increase?",
                choices: choicesArray
            },
            {
                name: "quantity",
                message: "How many units would you like to increase it by?"
            }
        ]).then(function (response) {
            // increase response.increase by response.quantity
            var itemToIncrease = response.increase
            // console.log("item to increase = " + itemToIncrease)
            var increaseBy = response.quantity
            // console.log("number of units to increase by = " + increaseBy)
            connection.query("SELECT * FROM products WHERE?",
                {
                    product_name: itemToIncrease
                },
                function (err, res) {
                    if (err) throw err;
                    var itemCurrentAmount = res[0].stock_quantity
                    // console.log("item's current amount = " + itemCurrentAmount)
                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: parseFloat(itemCurrentAmount) + parseFloat(increaseBy)
                            },
                            {
                                product_name: itemToIncrease
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            console.log(itemToIncrease + "'s stock_quantity just increased from " + itemCurrentAmount + " to " + (parseFloat(itemCurrentAmount) + parseFloat(increaseBy)))
                            connection.end()
                        })
                })
        })
    })
}

function createInventory() {
    inquirer.prompt([
        {
            name: "newProductName",
            message: "What is the name of the new product?"
        },
        {
            name: "newProductDepartment",
            message: "What department does the new product belong to?"
        },
        {
            name: "newProductPrice",
            message: "Just in integers, what is the price of the new product? Example: 1.50"
        }
    ]).then(function (response) {
        // allow manager to add a completely new product to the store
        connection.query("INSERT INTO products SET ?", 
        {
            product_name: response.newProductName,
            department_name: response.newProductDepartment,
            price: response.newProductPrice,
            stock_quantity: 0
        },
        function(err, res) {
            if (err) throw err
            console.log("product added")
            connection.end()
        })
    })
}

inquirer.prompt([
    {
        type: "list",
        name: "options",
        message: "Choose an option",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
]).then(function (response) {
    if (response.options === "View Products for Sale") {
        displayItems()
        connection.end()
    } else if (response.options === "View Low Inventory") {
        displayLowInventory()
        connection.end()
    } else if (response.options === "Add to Inventory") {
        addInventory()
    } else {
        createInventory()
    }
})