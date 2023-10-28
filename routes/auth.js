const router = require("express").Router();
const pool = require("../db/index.js");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    res.json(users.rows);
  } catch (err) {
    console.log(err);
  }
});

// register users

// login

module.exports = router;
