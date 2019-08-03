DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
id INTEGER(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(255) NOT NULL,
department_name VARCHAR(255) NOT NULL,
price INTEGER(10) NOT NULL,
stock_quantity INTEGER(10),
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("eggs (dozen)", "dairy", 1.50, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("milk (gallon)", "dairy", 2.00, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("black beans (can)", "canned food", 0.50, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bacon (package)", "meat", 5.00, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bread (loaf)", "bakery", 1.00, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("orange juice (gallon)", "drinks aisle", 2.00, 18);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sugar (one pound bag)", "baking aisle", 1.00, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("gum (package)", "candy aisle", 2.00, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mustard (bottle)", "condiments aisle", 2.50, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("beer (six-pack)", "alcohol", 8.00, 20);

SELECT * FROM products WHERE id=2;
