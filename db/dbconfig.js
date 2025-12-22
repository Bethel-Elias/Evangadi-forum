require("dotenv").config();
const mysql2 = require("mysql2");
const express = require("express");
const cors = require("cors");

const App = express();
App.use(cors());

App.use(express.urlencoded({ extended: true }));

const dbconnection = mysql2.createPool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  database: process.env.DB_DATABASE,
  connectionLimit: 10,
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
});

//to check mysql connection to the server

// dbconnection.getConnection((err, result) => {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log(result);
//   }
// });

// App.get("/", (req, res) => {
//   res.status(200).send("Evangadi Forum API is running");
// });

App.get("/tables", (req, res) => {
  const users = `CREATE TABLE if not exists users_Table(
    userid INT(20) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY(userid)
)`;
  const questions = `CREATE TABLE  if not exists questions_Table(
    id INT(20) NOT NULL AUTO_INCREMENT,
    questionid VARCHAR(100) NOT NULL UNIQUE,
    userid INT(20) NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    tag VARCHAR(20),
    PRIMARY KEY(id, questionid),
    FOREIGN KEY(userid) REFERENCES users_Table(userid)
)`;
  const answers = `CREATE TABLE if not exists answers_table(
    answerid INT(20) NOT NULL AUTO_INCREMENT,
    userid INT(20) NOT NULL,
    questionid VARCHAR(100) NOT NULL,
    answer VARCHAR(200) NOT NULL,
    PRIMARY KEY(answerid),
    FOREIGN KEY(questionid) REFERENCES questions_Table(questionid),
    FOREIGN KEY(userid) REFERENCES users_Table(userid)
)`;

  dbconnection.query(users, (err) => {
    if (err) return res.status(500).send(err.message);
  });
  dbconnection.query(questions, (err) => {
    if (err) return res.status(500).send(err.message);
  });
  dbconnection.query(answers, (err) => {
    if (err) return res.status(500).send(err.message);
  });
  res.send("Table created");
});

App.listen(5500, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running at http://localhost:5500");
  }
});
