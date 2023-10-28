const PORT = process.env.PORT ?? 8000;
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const pool = require("./db/index.js");

// Middleware to go here
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/", async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users')
    res.json(users.rows)
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
