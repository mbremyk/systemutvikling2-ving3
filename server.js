var express = require("express");
var mysql = require("mysql");
var app = express();
var bodyParser = require("body-parser");
var cors = require('cors');

app.use(bodyParser.json()); // for å tolke JSON
app.use(cors()); 

var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "magbre",
    password: "xUcddGdB",
    database: "magbre",
    debug: false
});

app.get("/news/all", (req, res) => {
    console.log("GET-request received from client");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error during connection");
            res.json({ "error": "error during connection" });
        } else {
            console.log("Database connection aquired");
            connection.query(
                "SELECT * FROM news",
                (err, rows) => {
                    connection.release();
                    if(err) {
                        console.log(err);
                        res.json({"error":"error during query"})
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});

app.post("/news/new", (req, res) => {
    console.log("POST-request received from client");
    pool.getConnection((err, connection) => {
        if(err) {
            console.log("Error during connection");
            res.json({"error": "error during connection"});
        } else {
            console.log("Database connection aquired");
            var val = [req.body.caption, req.body.content, req.body.categoryId, req.body.priority, req.body.imageUrl];
            connection.query(
                "INSERT INTO news (caption, content, categoryId, priority, imageUrl) VALUES (?, ?, ?, ?, ?)",
                val,
                err => {
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.json({ error: "Error during insertion" });
                    } else {
                        console.log("insert ok");
                        res.send("");
                    }
                }
            )
        }
    });
});

app.get("/news/", (req, res) => {
    console.log("GET-request received from client");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error during connection");
            res.json({ "error": "error during connection" });
        } else {
            console.log("Database connection aquired");
            connection.query(
                "SELECT * FROM news WHERE priority = 1",
                (err, rows) => {
                    connection.release();
                    if(err) {
                        console.log(err);
                        res.json({"error":"error during query"})
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});

app.get("/news/sort", (req, res) => {
    console.log("GET-request received from client");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Error during connection");
            res.json({ "error": "error during connection" });
        } else {
            console.log("Database connection aquired");
            var query = "SELECT * FROM news";
            if(req.query.category != undefined || req.query.priority != undefined)
            {
                query += " WHERE";
                query += req.query.category != undefined ? (" categoryId = ?" + (req.query.priority != undefined ? (" AND priority = ?") : (""))) : (req.query.priority != undefined ? (" priority = ?") : (""));
                console.log(query);
            }
            connection.query(
                query,
                req.query.category != undefined ? ((req.query.priority != undefined ? [req.query.category, req.query.priority] : [req.query.category])) : (req.query.priority != undefined ? [req.query.priority] : []),
                (err, rows) => {
                    connection.release();
                    if(err) {
                        console.log(err);
                        res.json({"error":"error during query"})
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});

var server = app.listen(8080);