'use strict';

const express = require('express');
const mysql = require('mysql');

// Constants
const PORT = 3000;

// database
var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'database',
    user            : process.env.MYSQL_USER,
    password        : process.env.MYSQL_PASSWORD
});

// App
const app = express();
app.get('/', function (req, res) {
    pool.getConnection(function(err, connection) {
        if(err){
            console.log(err);
            res.send('ERROR: Could not connect to database');
        }  else {
            console.log('Connected to database');
            const sql = 'SELECT 1 + 1 AS solution';
            // Use the connection
            connection.query( sql, function(err, rows) {
                // And done with the connection.
                connection.release();
                if(err){
                    console.log(err);
                    res.send('ERROR: could not query database');
                } else {
                    const result = rows[0].solution;
                    res.send("Hello world<br>Query: "+sql+"<br>Solution: "+result);
                }
            });
        }
    });
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
