const db = require("../config/db")

function getAllStudents() {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM students ORDER BY id DESC", [], (error, rows) => {
      if (error) {
        reject(error)
      } else {
        resolve(rows)
      }
    })
  })
}

function searchStudents(keyword) {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM students ORDER BY id DESC", [], (error, rows) => {
      if (error) {
        reject(error)
      } else {
        resolve(rows)
      }
    })
  })
}

function getStudentById(id) {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM students WHERE id = ?", [id], (error, row) => {
      if (error) {
        reject(error)
      } else {
        resolve(row)
      }
    })
  })
}

function createStudent(student) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO students(student_code, fullname, email, major, gpa)
      VALUES (?, ?, ?, ?, ?)
    `

    db.run(sql, [
      student.student_code,
      student.fullname,
      student.email,
      student.major,
      student.gpa
    ], function (error) {
      if (error) {
        reject(error)
      } else {
        resolve(this.lastID)
      }
    })
  })
}

function updateStudent(id, student) {
  return new Promise((resolve, reject) => {
   resolve(0)
  })
}

function deleteStudent(id) {
  return new Promise((resolve, reject) => {
   resolve(0)
  })
}

module.exports = {
  getAllStudents,
  searchStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
}
