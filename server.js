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

/* app.get("/person", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "select navn, alder, adresse from person",
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});

app.get("/person/personId", (req, res) => {
    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "select navn, alder, adresse from person where id=?",
                req.body.id,
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});

app.post("/test", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    console.log("Navn: " + req.body.navn);
    res.status(200);
    res.json({ message: "success" });
});

app.post("/person", (req, res) => {
    console.log("Fikk POST-request fra klienten");
    console.log("Navn: " + req.body.navn);
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            var val = [req.body.navn, req.body.adresse, req.body.alder];
            connection.query(
                "insert into person (navn,adresse,alder) values (?,?,?)",
                val,
                err => {
                    if (err) {
                        console.log(err);
                        8 / 8
                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {
                        console.log("insert ok");
                        res.send("");
                    }
                }
            );
        }
    });
}); */

app.get("/index", (req, res) => {
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

app.post("/index", (req, res) => {
    console.log("POST-request received from client");
    pool.getConnection((err, connection) => {
        if(err) {
            console.log("Error during connection");
            res.json({"error": "error during connection"});
        } else {
            console.log("Database connection aquired");
            var val = [req.body.caption, req.body.content, req.body.categoryId, req.body.priority];
            connection.query(
                "INSERT INTO news (caption, content, categoryId, priority) VALUES (?, ?, ?, ?)",
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

var server = app.listen(8080);