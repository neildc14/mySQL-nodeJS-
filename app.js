const express = require("express");
const db = require("./connection");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/students", function (req, res, next) {
  db.query(`SELECT * FROM students`, function (err, results) {
    res.json(results);
  });
});

app.post("/students", function (req, res, next) {
  const student = req.body;
  query = `INSERT INTO students(
    last_name,
    first_name,
    middle_name,
    school_id,
    section,
    year,
    curriculum
    ) 
    VALUES(?,?,?,?,?,?,?)
    `;

  console.log(student);
  db.query(
    query,
    [
      student.last_name,
      student.first_name,
      student.middle_name,
      student.school_id,
      student.section,
      student.year,
      student.curriculum,
    ],
    function (err, results) {
      if (err) {
        res.status(500).json({ message: err });
      }
      console.log(results);
      res.status(200).json({ message: "Student added successfully" });
    }
  );
});

app.get("/students/:id", function (req, res, next) {
  db.query(
    `SELECT * FROM students WHERE student_id = ${req.params.id}`,
    function (err, results) {
      if (err) {
        return next(err);
      }
      res.json(results);
    }
  );
});

app.put("/students/:id", function (req, res, next) {
  const id = req.params.id;
  const student = req.body;

  let query = `
    UPDATE students
    SET
      last_name   = ?,   
      first_name  = ?,  
      middle_name = ?,  
      school_id   = ?, 
      section     = ?,  
      year        = ?, 
      curriculum  = ?

    WHERE student_id = ${id}
  `;

  db.query(
    query,
    [
      student.last_name,
      student.first_name,
      student.middle_name,
      student.school_id,
      student.section,
      student.year,
      student.curriculum,
    ],
    function (err, results) {
      if (err) {
        console.log(err);
      }
      if (results.affectedRows === 0) {
        return res.status(500).json({ message: "Failed to update table" });
      }
      console.log(results);
      res.status(200).json({ message: "Student added successfully" });
    }
  );
});

app.delete("/students/:id", function (req, res, next) {
  const id = req.params.id;
  let query = `
    DELETE FROM students
    WHERE student_id = ${id}
  `;
  db.query(query, function (err, results) {
    if (err) {
      console.log(err);
    }
    console.log(results);
    res.status(200).json({ message: "Student deleted succesfully" });
  });
});

app.listen(3000, () => {
  console.log("Start Listening at port 3000");
});
