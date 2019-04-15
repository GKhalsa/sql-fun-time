import React from 'react';


const createBillingTable =
    `CREATE TABLE IF NOT EXISTS
              billing(
                id INTEGER PRIMARY KEY,
                employee_id INT NOT NULL,
                role VARCHAR(128) NOT NULL,
                product VARCHAR(128) NOT NULL,
                hours INT NOT NULL
              );`;

const createNormalizedBillingTable =
    `CREATE TABLE IF NOT EXISTS
              billing(
                id INTEGER PRIMARY KEY,
                employee_id INT NOT NULL,
                product_id INT NOT NULL,
                hours INT NOT NULL
              );`;


const createEmployeeTable =
    `CREATE TABLE IF NOT EXISTS
              employee(
                id INTEGER PRIMARY KEY,
                name VARCHAR(128) NOT NULL,
                role VARCHAR(128) NOT NULL,
                age INT NOT NULL
              );`;

const createProductTable =
    `CREATE TABLE IF NOT EXISTS
              product(
                id INTEGER PRIMARY KEY,
                name VARCHAR(128) NOT NULL,
                revenue INT NOT NULL
              );`;

const createPersonTable =
    `CREATE TABLE IF NOT EXISTS
              person(
                id INTEGER PRIMARY KEY,
                name VARCHAR(128) NOT NULL,
                age INT NOT NULL
              );`;

const createMonthTable =
    `CREATE TABLE IF NOT EXISTS
              month(
                id INTEGER PRIMARY KEY,
                name VARCHAR(128) NOT NULL,
                revenue_id INT
              );`;

const createRevenueTable =
    `CREATE TABLE IF NOT EXISTS
              revenue(
                id INTEGER PRIMARY KEY,
                amount INT NOT NULL
              );`;

const createMovieTable =
    `CREATE TABLE IF NOT EXISTS
              movie(
                id INTEGER PRIMARY KEY,
                title_id INT NOT NULL,
                box_office_id INT NOT NULL,
                cast_id INT NOT NULL
                
              );`;

const insertIntoMovie = (title_id, box_office_id, cast_id) => (
    `INSERT into movie (title_id, box_office_id, cast_id) values (${title_id}, ${box_office_id}, ${cast_id});`
);


const createTitleTable =
    `CREATE TABLE IF NOT EXISTS
              title(
                id INTEGER PRIMARY KEY,
                name VARCHAR(128) NOT NULL
              );`;

const insertIntoTitle = (name) => (
    `INSERT into title (name) values ('${name}');`
);

const createBoxOfficeTable =
    `CREATE TABLE IF NOT EXISTS
              box_office(
                id INTEGER PRIMARY KEY,
                imdb REAL NOT NULL,
                budget INT NOT NULL,
                domestic_gross INT NOT NULL,
                foreign_gross INT NOT NULL
              );`;

const insertIntoBoxOffice = (imdb, budget, domestic_gross, foreign_gross) => (
    `INSERT into box_office (imdb, budget, domestic_gross, foreign_gross) values (${imdb}, ${budget}, ${domestic_gross}, ${foreign_gross});`
);

const createCastTable =
    `CREATE TABLE IF NOT EXISTS
              cast(
                id INTEGER PRIMARY KEY,
                name VARCHAR(128) NOT NULL
              );`;

const insertIntoCast = (name) => (
    `INSERT into cast (name) values ('${name}');`
);

const insertIntoPerson = (name, age) => (
    `INSERT into person (name, age) values ('${name}', ${age});`
);

const insertIntoBilling = (employee_id,role, product, hours) => (
    `INSERT into billing (employee_id,role,product,hours) values (${employee_id}, '${role}','${product}', ${hours});`
);

const insertIntoNormalizedBilling = (employee_id, product_id, hours) => (
    `INSERT into billing (employee_id,product_id,hours) values (${employee_id},${product_id}, ${hours});`
);

const insertIntoEmployee = (name, role, age) => (
    `INSERT into employee (name, role, age) values ('${name}','${role}',${age});`
);

const insertIntoProduct = (name, revenue) => (
    `INSERT into product (name, revenue) values ('${name}',${revenue});`
);

const insertIntoMonth = (name, revenue_id) => (
    `INSERT into month (name, revenue_id) values ('${name}',${revenue_id});`
);

const insertIntoRevenue = (amount) => (
    `INSERT into revenue (amount) values (${amount});`
);

const insertIntoCastGen = () => {
    const cast = [
        "viggo martensen",
        "mahershala ali",
        "linda cardellini",
        "sally hawkins",
        "doug jones",
        "michael shannon",
        "octavia spencer",
        "trevante rhodes",
        "janelle monae",
        "naomie harris",
        "mark ruffalo",
        "rachel mcadams",
        "michael keaton",
        "liv schreiber",
        "emma stone",
        "edward norton",
        "naomi watts",
        "chiwetel ejiofor",
        "michael fassbender",
        "lupita nyongo",
        "brad pitt",
        "ben affleck",
        "bryan cranston",
        "john goodman",
        "alan arkin",
        "clea duvall",
        "jean dujardin",
        "berenice bejo",
        "penelope ann miller",
        ]
    return cast.map(name => insertIntoCast(name)).join("");
}

const insertIntoTitleGen = () => {
    const titles = [
        "green book",
        "the shape of water",
        "moonlight",
        "spotlight",
        "birdman",
        "12 years a slave",
        "argo",
        "the artist",
    ]

    return titles.map(title => insertIntoTitle(title)).join("")
}

export const levelText = {
    1: <div>Hello and welcome to SQL fun time! Here you will go through a series of exercises all targeted at making you proficient in SQL! Query information from the database with the <code>SELECT</code> statement. Try writing the query <code>SELECT * FROM person</code> below to get all of the data from the <code>person</code> table</div>,
    2: <div>Congratulations! You just queried for the first time on SQL fun time! Let's break down what you just did. <code>SELECT *</code> selects every column of data or rather <code>*</code> specifies that we want all of the columns. This is a powerful way to quickly inspect all of the data. <code>FROM person</code> tells us that we want this data from the <code>person</code> table. Instead of querying for every column, let's say that you are only interested in the columns <code>name</code> and <code>age</code>. That could be expressed as <code>SELECT name, age FROM person</code>. Below select the column age from the person table</div>,
    3: <div>Great job! Now try selecting just the id's and names.</div>,
    4: <div>You are selecting like a pro! Instead of returning every row, often you need to add a condition to target specific data. The <code>WHERE</code> clause is our good friend for that. Let's say that you want any row that matches the condition: age is equal to 5. You could write that like so: <code>SELECT * FROM person WHERE age = 5</code>. Below select only the columns name and age and the rows where the age is GREATER than 13.</div>,
    5: <div>You are a where wolf! rawr! As you just found out you can use many operators with the <code>WHERE</code> clause including <code>&lt;</code>  <code>&lt;=</code>  <code>&gt;</code>  <code>&gt;=</code>. You can also chain them together by using <code>AND</code> or <code>OR</code>. The syntax would be <code>SELECT * from 'table' WHERE 'column' = 'condition' AND/OR 'column' = 'condition'</code> Please select all of the data (every column) for rows where the age is greater than or equal to 13 OR where the age is equal to 44 </div>,
    6: <div>Select all of the columns and all of the rows from person where the age is greater than 10 but less than 20</div>,
    7: <div>Imagine that you want to select the names of all the restaurants that have Tavern in the title. Pattern matching with <code>LIKE</code> is the best tool for the job. If you want to match against "The Village Tavern" you could write <code>SELECT * FROM restaurant WHERE title LIKE "%tavern"</code>. Prepending tavern with % indicates that we want to match tavern at the end and if anything comes before it it is ok. <code>tavern%</code> is the opposite as in it would match against Tavern Black. If we don't care about the placement of tavern we can write <code>%tavern%</code>. This will match tavern in any position like The Tavern of Wilshire as well as the previous two. Below select the name and age for every row where the name has 'in' in it and the age is above 20.</div>,
    8: <div>How many rows just came back? It is easy to count when it is just a few, but imagine if your query resulted in millions of rows being returned. Aggregate functions help with this. In this case <code>SELECT COUNT(*) FROM person WHERE name LIKE '%in%' AND age > 20</code> would give you the answer you seek. Other aggregates include <code>SUM</code> <code>MIN</code> <code>MAX</code> <code>AVG</code>. Find the average age of the people over the age of 20.</div>,
    9: <div>Select the age and name of the oldest person</div>,
    10: <div>If you want the column to show up as Age and not MAX(age) we can use <code>AS</code> to alias our columns. <code>SELECT MAX(age) AS age, name FROM person</code> is the syntax. Below return two columns: Name_of_youngest and Age_of_youngest.</div>,
    11: <div>Let's say that for ease of readability/lookup we want to display our results alphabetically or numerically. In order to achieve this you can use the <code>ORDER BY</code> clause on one ore more columns. If you want to alphabetically sort your results by name you could do that by writing <code>SELECT * FROM person ORDER BY name</code>. By default <code>ORDER BY</code> is ascending meaning a-z in this case, if we wanted to order our results z-a we could add <code>DESC</code> to the end like so: <code>SELECT * FROM person ORDER BY name DESC</code>. Below return the names and ages of any person whose name contains the letter 'n' sorted oldest to youngest.</div>,
    12: <div>Often when you query for data using aggregates: <code>SUM</code><code>AVG</code><code>MIN</code> etc. you might also want to do it in groups. Instead of finding the age sum for all people named Sam, you might want to do it for every name at once. You can use... you guessed it <code>GROUP BY</code>! Let's take a look at the billing table because I asked myself what is the most riveting thing I could imagine and I came up with billing. To come up with the total amount of hours worked per product you could write <code>SELECT product, SUM(hours) AS total_hours FROM billing GROUP BY product</code>. Below find the total amount of hours worked per role.</div>,
    13: <div>Below find the amount of employees per role</div>,
    14: <div>Below find the amount of employees per product</div>,
    15: <div>Until now you've only selected data from one table, however in the "real world" you will often find yourself looking for information spanning multiple tables. This is a good thing! This helps us minimize the duplication of data(see how in the product table we only have two products, but we can reference them many times via their id's in the billing table), grow and scale tables independently, enjoy performance benefits, and many more! Suffice to say you are going to need to know how to gather data from more than one table, but lucky for you you came to the right place! <br/><br/> Look at the billing table to the right. If we want to show the name of the employee and the amount of hours worked we can no longer simply select two columns from just the billing table. Where does the employee information live? The employee table. The employee information is being referenced by the employee_id in the billing table which matches to the id in the employee table. Follow it for yourself, in the first row we have employee_id which is 1. The row with the id of 1 in the employee table is the employee with the name of Manuel. So we can see that Manuel worked 35 hours in the first entry of the billing table. To express this with sql we need to introduce one of the most common types of joins, the <code>INNER JOIN</code>. We can write the query like so: <code>SELECT employee.name, billing.hours FROM employee INNER JOIN billing ON billing.employee_id = employee.id</code>. Write a query that will display the product name and billing hours. </div>,
    16: <div>Find the employee name & age, and billing hour data for any employee that is over the age of 21 and worked more than 40 hours</div>,
    17: <div>Find the total amount of hours worked per employee.</div>,
    18: <div>When gathering data you may seek information from more than two tables. The syntax is largely similar when joining one table to another. You need to join one table to another to another. Get the employee name, product name, and billing hours for every row in billing. Try it a couple times before looking at the answer. I believe in you! </div>,
    19: <div>The <code>INNER JOIN</code> is great at combining information that is present, however what happens when some values are missing? Take a guess at what this query returns: <code>SELECT month.name, revenue.amount FROM month INNER JOIN revenue ON month.revenue_id = revenue.id;</code>. If you guessed that it will only return the months that have revenue_id's then you are correct! However what if we wanted to return back all of the months and if they had associated revenue great, but if not we still want to see the month. The solution to that is the <code>LEFT JOIN</code>. The syntax is nearly identical to that of the <code>INNER JOIN</code>. Try it out before looking at the answer! </div>,
    20: <div>test </div>,

};

export const queries = {
    1: {databaseSetup: createPersonTable + insertIntoPerson('Devin',26) + insertIntoPerson('Asem',12) , answer: "SELECT * FROM person;"},
    2: {databaseSetup: createPersonTable + insertIntoPerson('Devin',26) + insertIntoPerson('Asem',12) , answer: "SELECT age FROM person;"},
    3: {databaseSetup: createPersonTable + insertIntoPerson('Devin',26) + insertIntoPerson('Asem',12) , answer: "SELECT id,name FROM person;"},
    4: {databaseSetup: createPersonTable + insertIntoPerson('Devin',26) + insertIntoPerson('Asem',12) , answer: "SELECT name,age FROM person WHERE age > 13;"},
    5: {databaseSetup: createPersonTable + insertIntoPerson('Magnus',44) + insertIntoPerson('Chloe',13) + insertIntoPerson('Devin',26) + insertIntoPerson('Asem',12), answer: "SELECT * FROM person WHERE age >= 13 OR age = 44;"},
    6: {databaseSetup: createPersonTable + insertIntoPerson('Atticus',44) + insertIntoPerson('Chloe',13) + insertIntoPerson('Devin',26) + insertIntoPerson('Asem',12), answer: "SELECT * FROM person WHERE age > 10 AND age < 20;"},
    7: {databaseSetup: createPersonTable + insertIntoPerson('Linus',44) + insertIntoPerson('Tina',13) + insertIntoPerson('Devin',26) + insertIntoPerson('Jerome',50), answer: "SELECT name, age FROM person WHERE name LIKE '%in%' AND age > 20;"},
    8: {databaseSetup: createPersonTable + insertIntoPerson('Linus',44) + insertIntoPerson('Tina',13) + insertIntoPerson('Devin',26) + insertIntoPerson('Jerome',50), answer: "SELECT AVG(age) FROM person WHERE age > 20;"},
    9: {databaseSetup: createPersonTable + insertIntoPerson('Linus',44) + insertIntoPerson('Tina',13) + insertIntoPerson('Devin',26) + insertIntoPerson('Jerome',50), answer: "SELECT MAX(age), name FROM person;"},
    10: {databaseSetup: createPersonTable + insertIntoPerson('Linus',44) + insertIntoPerson('Tina',13) + insertIntoPerson('Devin',26) + insertIntoPerson('Jerome',50), answer: "SELECT name AS name_of_youngest, MIN(age) AS age_of_youngest FROM person;"},
    11: {databaseSetup: createPersonTable + insertIntoPerson('Linus',44) + insertIntoPerson('Tina',13) + insertIntoPerson('Devin',26) + insertIntoPerson('Jerome',50), answer: "SELECT name, age FROM person WHERE name LIKE '%n%' ORDER BY age DESC;"},
    12: {databaseSetup: createBillingTable + insertIntoBilling(10,"Engineer","Video Stream", 35) + insertIntoBilling(11,"Engineer","Video Stream", 33) + insertIntoBilling(12,"Engineer","Video Stream", 40) + insertIntoBilling(13,"Product Manager","Video Stream", 45) + insertIntoBilling(14,"Designer","Video Stream", 40) + insertIntoBilling(15,"Engineer","Call Recorder", 29) + insertIntoBilling(16,"Engineer","Call Recorder", 40) + insertIntoBilling(17,"Product Manager","Call Recorder", 40), answer: "SELECT role, SUM(hours) AS total_hours FROM billing GROUP BY role;"},
    13: {databaseSetup: createBillingTable + insertIntoBilling(10,"Engineer","Video Stream", 35) + insertIntoBilling(11,"Engineer","Video Stream", 33) + insertIntoBilling(12,"Engineer","Video Stream", 40) + insertIntoBilling(13,"Product Manager","Video Stream", 45) + insertIntoBilling(14,"Designer","Video Stream", 40) + insertIntoBilling(15,"Engineer","Call Recorder", 29) + insertIntoBilling(16,"Engineer","Call Recorder", 40) + insertIntoBilling(17,"Product Manager","Call Recorder", 40), answer: "SELECT role, COUNT(role) AS employee_count FROM billing GROUP BY role;"},
    14: {databaseSetup: createBillingTable + insertIntoBilling(10,"Engineer","Video Stream", 35) + insertIntoBilling(11,"Engineer","Video Stream", 33) + insertIntoBilling(12,"Engineer","Video Stream", 40) + insertIntoBilling(13,"Product Manager","Video Stream", 45) + insertIntoBilling(14,"Designer","Video Stream", 40) + insertIntoBilling(15,"Engineer","Call Recorder", 29) + insertIntoBilling(16,"Engineer","Call Recorder", 40) + insertIntoBilling(17,"Product Manager","Call Recorder", 40), answer: "SELECT product, COUNT(product) as employee_count FROM billing GROUP BY product;"},
    15: {databaseSetup: createNormalizedBillingTable + createProductTable + createEmployeeTable + insertIntoEmployee("Manuel", "Engineer", 32) + insertIntoProduct("Video Stream", 12430000)+ insertIntoNormalizedBilling(1,1 , 35) + insertIntoEmployee("Lin","Engineer", 21) + insertIntoNormalizedBilling(2, 1, 33) + insertIntoEmployee("Serge","Engineer", 45) + insertIntoProduct("Doom", 1666000) + insertIntoNormalizedBilling(3,2, 40) + insertIntoEmployee("Devin","Product Manager", 32) + insertIntoNormalizedBilling(4, 1, 45) + insertIntoEmployee("Sam","Designer", 30) + insertIntoNormalizedBilling(5, 1, 40) + insertIntoNormalizedBilling(1,1, 29) + insertIntoNormalizedBilling(2,2, 40) + insertIntoNormalizedBilling(4,2, 40), answer: "SELECT product.name, billing.hours FROM product INNER JOIN billing ON billing.product_id = product.id;"},
    16: {databaseSetup: createNormalizedBillingTable + createProductTable + createEmployeeTable + insertIntoEmployee("Manuel", "Engineer", 32) + insertIntoProduct("Video Stream", 12430000)+ insertIntoNormalizedBilling(1,1 , 35) + insertIntoEmployee("Lin","Engineer", 21) + insertIntoNormalizedBilling(2, 1, 33) + insertIntoEmployee("Serge","Engineer", 45) + insertIntoProduct("Doom", 1666000) + insertIntoNormalizedBilling(3,2, 40) + insertIntoEmployee("Devin","Product Manager", 32) + insertIntoNormalizedBilling(4, 1, 45) + insertIntoEmployee("Sam","Designer", 30) + insertIntoNormalizedBilling(5, 1, 40) + insertIntoNormalizedBilling(1,1, 29) + insertIntoNormalizedBilling(2,2, 40) + insertIntoNormalizedBilling(4,2, 40), answer: "SELECT employee.name, employee.age, billing.hours FROM employee INNER JOIN billing ON billing.employee_id = employee.id WHERE employee.age > 21 AND billing.hours > 40"},
    17: {databaseSetup: createNormalizedBillingTable + createProductTable + createEmployeeTable + insertIntoEmployee("Manuel", "Engineer", 32) + insertIntoProduct("Video Stream", 12430000)+ insertIntoNormalizedBilling(1,1 , 35) + insertIntoEmployee("Lin","Engineer", 21) + insertIntoNormalizedBilling(2, 1, 33) + insertIntoEmployee("Serge","Engineer", 45) + insertIntoProduct("Doom", 1666000) + insertIntoNormalizedBilling(3,2, 40) + insertIntoEmployee("Devin","Product Manager", 32) + insertIntoNormalizedBilling(4, 1, 45) + insertIntoEmployee("Sam","Designer", 30) + insertIntoNormalizedBilling(5, 1, 40) + insertIntoNormalizedBilling(1,1, 29) + insertIntoNormalizedBilling(2,2, 40) + insertIntoNormalizedBilling(4,2, 40), answer: "select employee.name AS employee_name, SUM(billing.hours) AS billable_hours FROM employee INNER JOIN billing ON billing.employee_id = employee.id GROUP BY employee.name;"},
    18: {databaseSetup: createNormalizedBillingTable + createProductTable + createEmployeeTable + insertIntoEmployee("Manuel", "Engineer", 32) + insertIntoProduct("Video Stream", 12430000)+ insertIntoNormalizedBilling(1,1 , 35) + insertIntoEmployee("Lin","Engineer", 21) + insertIntoNormalizedBilling(2, 1, 33) + insertIntoEmployee("Serge","Engineer", 45) + insertIntoProduct("Doom", 1666000) + insertIntoNormalizedBilling(3,2, 40) + insertIntoEmployee("Devin","Product Manager", 32) + insertIntoNormalizedBilling(4, 1, 45) + insertIntoEmployee("Sam","Designer", 30) + insertIntoNormalizedBilling(5, 1, 40) + insertIntoNormalizedBilling(1,1, 29) + insertIntoNormalizedBilling(2,2, 40) + insertIntoNormalizedBilling(4,2, 40), answer: "SELECT employee.name AS employee_name, product.name AS product_name, billing.hours FROM product INNER JOIN billing ON product.id = billing.product_id INNER JOIN employee ON employee.id = billing.employee_id;"},
    19: {databaseSetup: createMonthTable + createRevenueTable + insertIntoRevenue(100) + insertIntoRevenue(200) + insertIntoRevenue(300) + insertIntoMonth("January", 1) + insertIntoMonth("February", null) + insertIntoMonth("March", 2) +insertIntoMonth("April", 2) +insertIntoMonth("May", 3) + insertIntoMonth("June", null), answer: "SELECT month.name, revenue.amount FROM month LEFT JOIN revenue ON month.revenue_id = revenue.id;"},
    20: {databaseSetup: createMovieTable + createTitleTable + createBoxOfficeTable + createCastTable +
                        insertIntoTitleGen() + insertIntoCastGen() +
                        insertIntoBoxOffice(8.3,23000000, 84780771,224116275) + insertIntoBoxOffice(7.3, 20000000, 63859435, 131384029) +
                        insertIntoBoxOffice(7.4, 4000000, 27854932, 37191755) + insertIntoBoxOffice(8.1, 20000000, 45055776, 53219462) +
                        insertIntoBoxOffice(7.7, 18000000, 42340598, 60874496) + insertIntoBoxOffice(8.1, 20000000, 56671993, 131061209) +
                        insertIntoBoxOffice(7.7, 44500000, 136025503, 96300000) +  insertIntoBoxOffice(7.9, 15000000, 44671682, 88761174) +
                        insertIntoMovie(1,1,1) +insertIntoMovie(1,1,2) + insertIntoMovie(1,1,3) +
                        insertIntoMovie(2,2,4) + insertIntoMovie(2,2,5) + insertIntoMovie(2,2,6) + insertIntoMovie(2,2,7) +
                        insertIntoMovie(3,3,2) + insertIntoMovie(3,3,8) + insertIntoMovie(3,3,9) + insertIntoMovie(3,3,10) +
                        insertIntoMovie(4,4,11) + insertIntoMovie(4,4,12) + insertIntoMovie(4,4,13) + insertIntoMovie(4,4,14) +
                        insertIntoMovie(5,5,13) + insertIntoMovie(5,5,15) + insertIntoMovie(5,5,16) + insertIntoMovie(5,5,17) +
                        insertIntoMovie(6,6,18) + insertIntoMovie(6,6,19) + insertIntoMovie(6,6,20) + insertIntoMovie(6,6,21) +
                        insertIntoMovie(7,7,22) + insertIntoMovie(7,7,23) + insertIntoMovie(7,7,24) + insertIntoMovie(7,7,25) + insertIntoMovie(7,7,26) +
                        insertIntoMovie(8,8,27) + insertIntoMovie(8,8,28) + insertIntoMovie(8,8,29) + insertIntoMovie(8,8,24), answer: "SELECT * from movie", size: 29}

};
