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
    const searchPattern = `%${keyword}%`
    const sql = `
      SELECT * FROM students 
      WHERE student_code LIKE ? 
         OR fullname LIKE ? 
         OR major LIKE ? 
      ORDER BY id DESC
    `
    db.all(sql, [searchPattern, searchPattern, searchPattern], (error, rows) => {
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
    const sql = `
      UPDATE students 
      SET student_code = ?, fullname = ?, email = ?, major = ?, gpa = ?
      WHERE id = ?
    `
    db.run(sql, [
      student.student_code,
      student.fullname,
      student.email,
      student.major,
      student.gpa,
      id
    ], function (error) {
      if (error) {
        reject(error)
      } else {
        resolve(this.changes)
      }
    })
  })
}

function deleteStudent(id) {
  return new Promise((resolve, reject) => {
    const sql = "DELETE FROM students WHERE id = ?"
    db.run(sql, [id], function (error) {
      if (error) {
        reject(error)
      } else {
        resolve(this.changes)
      }
    })
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
