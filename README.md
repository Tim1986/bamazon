# bamazon

## Overview

The bamazon app tracks the products in a MySQL spreadsheet in response to node commands. It allows a user to act as a customer who can buy products from the list, which updates the spreadsheet accordingly. The user can also act as a manager who checks his inventory, restocks the inventory, and adds additional products.

## Installation

In order to use this app, follow these steps:
1. Clone this repository: https://tim1986.github.io/bamazon/. 
2. Install the necessary npms. Using your terminal, navigate to the folder with the cloned repository, and type npm install. 

## How to Use It

This app has two .js files. In order to use them, once you've navigated to the folder with the cloned repository, simply type "node bamazonCustomer.js" for the first one, and "node bamazonManager.js" for the second one.

When you run the customer file, it'll pull the information from MySQL and display the set of items to the console, with their id numbers, names, departments they belong to, price, and current number in stock. You will then be prompted to list the id number of the item you wish to purchase, and then asked how many of that item you wish to purchase. If the number you give is higher than the amount of that item's stock quantity, it'll tell you you can't purchase that many. Otherwise, it'll tell you what the cost of your purchase is, and update MySQL accordingly.

When you run the manager file, it'll ask you to choose between four options. The first option will display the current inventory to the console. The second option will only display low inventory items to the console, the items there are only four or fewer of. The third option will allow you to increase the stock quantity of the item you choose, by the amount you want. The fourth option will allow you to add a new produt to the inventory, starting off at a default of 0 stock quantity. You can then increase its stock_quantity with the third option, and purchase from it with the customer file.

## GIFs

![First GIF](/bamazon1.gif)

![Second GIF](/bamazon2.gif)

## Deployed Link

https://tim1986.github.io/bamazon/

## Development Process

This app uses the inquirer npm and mysql.

I'm a student seven weeks into a twelve week coding boot camp at UNC Charlotte. I was given this project as an assignment, and a series of activities to help me learn how to get the files to interact properly. I wrote this code, with those caveats.