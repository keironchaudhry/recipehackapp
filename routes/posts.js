const router = require("express").Router();
const pool = require("../db/index.js");

// Post creation
router.post("/create", async (req, res) => {
  try {
    // User input
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

// View post
router.get("/:id", async (req, res) => {
  try {
    // Post ID from URL
    const postId = req.params.id; 
    // Filters post via post_id
    const post = await pool.query("SELECT * FROM posts WHERE post_id = $1", [
      postId,
    ]);
    res.status(200).json(post.rows[0]); 
  } catch (err) {
    res.status(500).json({ error: "No posts here." });
  }
});

// Modify post

// Delete post

module.exports = router;
