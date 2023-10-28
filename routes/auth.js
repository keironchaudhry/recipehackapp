const router = require("express").Router();
const pool = require("../db/index.js");
const bcrypt = require("bcrypt");

// register
router.post("/register", async (req, res) => {
  try {
    // user data
    const { username, email } = req.body;
    // generates a hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // SQL query + generated parametres
    const user = await pool.query(
      `INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *`,
      [username, email, hashedPassword]
    );
    res.status(200).json(user.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    // here
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
