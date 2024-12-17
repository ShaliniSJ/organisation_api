const express = require("express");
const app = express();
const port = 8000;
const mysql = require("mysql2");
const cors = require("cors");
// import dotenv
require("dotenv").config();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/api/administrators/auth", (req, res) => {
    const { email, password } = req.body;
    db.query(
        "SELECT * FROM administrators WHERE email = ? AND password = ?",
        [email, password],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err.sqlMessage);
            } else {
                if (result.length > 0) {
                    res.send("Login Success");
                } else {
                    res.send("Invalid Credentials");
                }
            }
        }
    );
});

app.post("/api/employee/create", (req, res) => {
    const { name, empId, email, phone, dep, doj, role } = req.body;
    db.query(
        "INSERT INTO employees (name, employee_id, email, phone_number, department, date_of_joining, role) VALUES (?,?,?,?,?,?,?)",
        [name, empId, email, phone, dep, doj, role],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send(err.sqlMessage);
            } else {
                res.send("Values Inserted");
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
