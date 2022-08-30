var mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "neronero",
  database: "registrar",
  connectionLimit: 10,
});

db.connect((err) => {
  if (err) {
    throw error(err);
  }
  console.log("Connected");
});

module.exports = db;
