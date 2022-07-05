const express = require("express");
const mysql = require("mysql");
//create connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "studentsdatabase",
});

//connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected ....");
});

const app = express();
//create DB
app.get("/createDb", (req, res) => {
  let sql = "CREATE DATABASE studentsdatabase";
  db.query(sql, (err, result) => {
    res.send("Database created...");
  });
});

//create table
app.get("/createstudentListtbl", (req, res) => {
  let sql =
    "CREATE TABLE studentList(id int AUTO_INCREMENT, fullname VARCHAR(255), address VARCHAR(255), PRIMARY KEY(id))";

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("studentList table created..");
  });
});

//create Post
app.get("/postdata", (req, res) => {
  let post = { fullname: "Meryem Deniz", address: "Türkiye" };
  let sql = "INSERT INTO studentList SET?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("studentList 1 added");
  });
});

app.listen("3000", () => {
  console.log("Server stated on port 3000");
});
