const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { route } = require("../routes/auth");

const db = mysql.createConnection({
  host: process.env.Host,
  user: process.env.User,
  password: process.env.Password,
  database: process.env.dataBase,
});

exports.register = (req, res) => {
  console.log(req.body);

  const { name, email, password, passwordConfirm } = req.body;

  db.query(
    "SELECT email FROM vedantdb WHERE email = ?",
    [email],
    async (error, result) => {
      if (error) {
        console.log(error);
      }
      if (name === "") {
        return res.render("register", {
          message: "Name is empty!",
        });
      }
      if (email === "") {
        return res.render("register", {
          message: "Email address is empty!",
        });
      }
      if (password === "") {
        return res.render("register", {
          message: "Password cannot be empty!",
        });
      }
      if (passwordConfirm === "") {
        return res.render("register", {
          message: "Please enter Confirm Password also",
        });
      }
      if (result.length > 0) {
        return res.render("register", {
          message: "This is already used",
        });
      } else if (password !== passwordConfirm) {
        return res.render("register", {
          message: "Passwords do not matched",
        });
      }

      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);

      db.query(
        "INSERT INTO vedantdb SET ?",
        { name: name, email: email, password: hashedPassword },
        (error, result) => {
          if (error) {
            console.log(error);
          } else {
            return res.render("register", {
              message: "User Registered in DB",
            });
          }
        }
      );
    }
  );
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render("login", {
        message: "please provide credentials",
      });
    }
    db.query(
      "SELECT * FROM vedantdb WHERE email = ?",
      [email],
      async (error, results) => {
        if (error) {
          console.log(error);
          return;
        }

        if (!results || !(await bcrypt.compare(password, results[0].password)))
          return res.status(401).render("login", {
            message: "email or password is incorrect",
          });
        else {
          const id = results[0].id;
          const token = jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
          console.log("The token is : " + token);

          const cookieOptions = {
            expires: new Date(
              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
            ),
            httpOnly: true,
          };

          res.cookie("jwt", token, cookieOptions);
          return res.status(200).redirect("content");
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.logout = (req, res) => {
  res.cookie("jwt", "");
  res.redirect("/");
};
