const dotenv = require("dotenv");
const Pool = require("pg").Pool;

dotenv.config();

const pool = new Pool({
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT,
  database: "recipedb",
});

module.exports = pool
