const router = require("express").Router();
const pool = require("../db/index.js");
const bcrypt = require("bcrypt");

// register
router.post("/register", async (req, res) => {
  try {
    // User data
    const { username, email } = req.body;
    // Generates a hashed password
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
    // User data
    const { email, password } = req.body;
    // SQL query for result
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    // Authenticate result
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    // Return row
    const user = result.rows[0];
    // Compare password + authenticate
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Incorrect password." });
    }
    // Delete password for security
    delete user.password;
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
