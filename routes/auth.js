const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/content", (req, res) => {
  res.render("content");
});

module.exports = router;
