const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./.env" });

const app = express();

const db = mysql.createConnection({
  host: process.env.Host,
  user: process.env.User,
  password: process.env.Password,
  database: process.env.dataBase,
});

const publicDirectory = path.join(__dirname, "./public");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(publicDirectory));
app.set("view engine", "hbs");

db.connect((error) => {
  if (error) console.log("error");
  else console.log("connected to sql db...");
});

// routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(3050, () => {
  console.log("Connected to port 3050...");
});
