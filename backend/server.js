const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

// Home Page
app.get("/", (req, res) => {
  res.send("Complaint Management System Backend is Running 🚀");
});


app.use(cors());
app.use(express.json());


// ================= USER REGISTER =================
app.post("/register", (req, res) => {

  const { name, email, password, role } = req.body;

  const sql =
    "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)";

  db.query(sql, [name, email, password, role], () => {
    res.send("User Registered");
  });
});


// ================= LOGIN =================
app.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {

    if (result.length > 0)
      res.send(result[0]);
    else
      res.send("Invalid Login");
  });
});


// ================= ADD COMPLAINT =================
app.post("/complaint", (req, res) => {

  const { user_id, title, category, description } = req.body;

  const created = new Date();

  // SLA = 24 hours
  const sla = new Date(created.getTime() + 24 * 60 * 60 * 1000);

  const sql = `
    INSERT INTO complaints
    (user_id,title,category,description,status,created_at,sla_deadline)
    VALUES(?,?,?,?,?,?,?)
  `;

  db.query(sql,
    [user_id, title, category, description,
      "Pending", created, sla],
    () => {

      res.send("Complaint Added");
    });
});


// ================= GET COMPLAINTS =================
app.get("/complaints", (req, res) => {

  const sql = "SELECT * FROM complaints";

  db.query(sql, (err, result) => {

    // SLA CHECK
    result.forEach(c => {

      if (new Date() > c.sla_deadline &&
        c.status !== "Resolved") {

        c.status = "Overdue";
      }
    });

    res.send(result);
  });
});


// ================= UPDATE STATUS =================
app.put("/status/:id", (req, res) => {

  const id = req.params.id;
  const { status } = req.body;

  let resolved = null;

  if (status === "Resolved")
    resolved = new Date();

  const sql = `
    UPDATE complaints
    SET status=?, resolved_at=?
    WHERE id=?
  `;

  db.query(sql,
    [status, resolved, id],
    () => {

      res.send("Status Updated");
    });
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
