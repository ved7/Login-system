const express = require("express");
const jwt = require('jsonwebtoken')
const router = express.Router();

//home page or login page
router.get("/", (req, res) => {
  res.render("login");
});
//register page
router.get("/register", (req, res) => {
  res.render("register");
});
//login page
router.get("/login", (req, res) => {
  res.render("login");
});
//get content
router.get("/content", (req, res) => {
  res.send("content");
});
//get content
router.get("/logout", (req, res) => {
  res.cookie("jwt", "");
  res.redirect("/");
});

module.exports = router;
