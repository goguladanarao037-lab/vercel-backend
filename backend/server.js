
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

/* CREATE */
app.post("/users", (req, res) => {
  const { first_name, last_name, phone, email } = req.body;
  const sql = "INSERT INTO users VALUES (NULL, ?, ?, ?, ?)";

  db.query(sql, [first_name, last_name, phone, email], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User created" });
  });
});

/* READ */
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

/* UPDATE */
app.put("/users/:id", (req, res) => {
  const { first_name, last_name, phone, email } = req.body;
  const sql =
    "UPDATE users SET first_name=?, last_name=?, phone=?, email=? WHERE id=?";

  db.query(sql, [first_name, last_name, phone, email, req.params.id], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User updated" });
  });
});

/* DELETE */
app.delete("/users/:id", (req, res) => {
  db.query("DELETE FROM users WHERE id=?", [req.params.id], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "User deleted" });
  });
});

app.listen(4500, () => console.log("Server running on 4500"));
