//node:servernode.js//
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

/* CREATE */
app.post("/users", (req, res) => {
  console.log(req.body);  // 👈 ADD THIS

  const { first_name, last_name, phone, email, dob, address } = req.body;

  const sql = "INSERT INTO users (first_name, last_name, phone, email, dob, address) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [first_name, last_name, phone, email, dob, address];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).send("Database error");
    }
    res.status(201).send("User added successfully");
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});