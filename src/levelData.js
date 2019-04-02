import React from 'react';

const createPersonTable =
    `CREATE TABLE IF NOT EXISTS
              person(
                id INTEGER PRIMARY KEY,
                name VARCHAR(128) NOT NULL,
                age INT NOT NULL
              );`;

const insertIntoPerson = (name, age) => (
    `INSERT into person (name, age) values ('${name}', ${age});`
);

export const levelText = {
    1: <div>Hello and welcome to SQL fun time! Here you will go through a series of exercises all targeted at making you proficient in SQL! Query information from the database with the <code>SELECT</code> statement. Try writing the query <code>SELECT * FROM person</code> below to get all of the data from the <code>person</code> table</div>,
    2: <div>Congratulations! You just queried for the first time on SQL fun time! Let's break down what you just did. <code>SELECT *</code> selects every column of data or rather <code>*</code> specifies that we want all of the columns. This is a powerful way to quickly inspect all of the data. <code>FROM Person</code> tells us that we want this data from the <code>person</code> table. Instead of querying for every column, let's say that you are only interested in the columns <code>name</code> and <code>age</code>. That could be expressed as <code>SELECT name, age FROM person</code>. Below select the columns name and age from the person table</div>
};

export const queries = {
    1: {databaseSetup: createPersonTable + insertIntoPerson('Devin',26) + insertIntoPerson('Asem',12) , answer: "SELECT * FROM person;"},
    2: {databaseSetup: createPersonTable + insertIntoPerson('Devin',26) + insertIntoPerson('Asem',12) , answer: "SELECT * FROM person;"}
};


