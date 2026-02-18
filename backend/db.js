const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "host.docker.internal",
  user: "root",
  password: "Ayush@01",
  database: "complaint_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

module.exports = db;
