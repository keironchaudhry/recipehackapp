const router = require("express").Router();
const pool = require("../db/index.js");

// Post creation
router.post("/create", async (req, res) => {
  try {
    // User input
    const { title, content, user_id, image } = req.body;
    // SQL query + generated parametres
    const post = await pool.query(
      `INSERT INTO posts(title, content, user_id, image) VALUES($1, $2, $3, $4) RETURNING *`,
      [title, content, user_id, image]
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
router.delete("/:id", async (req, res) => {
  try {
    // Post ID from URL
    const postId = req.params.id;
    // Check if the user attempting to delete the post is the owner
    const post = await pool.query("SELECT * FROM posts WHERE post_id = $1", [
      postId,
    ]);
    // Compare user_id to post.user_id
    if (post.rows.length === 0) {
      res.status(404).json({ error: "Post not found." });
    } else if (post.rows[0].user_id === req.body.user_id) {
      await pool.query("DELETE FROM posts WHERE post_id = $1", [postId]);
      res.status(200).json({ message: "Post deleted." });
    } else {
      res.status(403).json({ error: "You can only delete your own posts." });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
