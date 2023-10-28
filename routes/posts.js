const router = require("express").Router();
const pool = require("../db/index.js");

// post creation
router.post("/create", async (req, res) => {
  try {
    // user input
    const { title, content, image } = req.body;
    // SQL query + generated parametres
    const post = await pool.query(
      `INSERT INTO posts(title, content, image) VALUES($1, $2, $3) RETURNING *`,
      [title, content, image]
    );
    res.status(200).json(post.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error." });
  }
});

// view post

// modify post

// delete post

module.exports = router;
