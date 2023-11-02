const PORT = process.env.PORT || config.httpPort;
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

// Middleware to go here
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
  res.send("API Endpoints for Recipe Auth + Posts.");
});

app.listen(process.env.PORT || 8000);
