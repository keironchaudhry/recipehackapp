const PORT = process.env.PORT ?? 8000;
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const authRoute = require("./routes/auth");

// Middleware to go here
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/auth", authRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
