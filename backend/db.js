//db.js//
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Dana@630",
  database: "testdb",
  port:3307 //change port//
});
db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL on port 3307 ✅");
  }
});
module.exports = db;