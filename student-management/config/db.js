const sqlite3 = require("sqlite3").verbose()
const path = require("path")
const fs = require("fs")

const dataDir = path.join(__dirname, "..", "data")
const dbPath = path.join(dataDir, "database.sqlite")

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir)
}

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.log("Lỗi kết nối CSDL:", error.message)
  } else {
    console.log("Đã kết nối SQLite database")
  }
})

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_code TEXT NOT NULL,
      fullname TEXT NOT NULL,
      email TEXT,
      major TEXT,
      gpa REAL
    )
  `)

  db.get("SELECT COUNT(*) AS total FROM students", (error, row) => {
    if (!error && row.total === 0) {
      const statement = db.prepare(`
        INSERT INTO students(student_code, fullname, email, major, gpa)
        VALUES (?, ?, ?, ?, ?)
      `)

      statement.run("SV001", "Nguyen Van An", "an@example.com", "Cong nghe thong tin", 3.2)
      statement.run("SV002", "Tran Thi Binh", "binh@example.com", "He thong thong tin", 3.4)
      statement.run("SV003", "Le Minh Chau", "chau@example.com", "Khoa hoc may tinh", 2.9)
      statement.run("SV004", "Pham Quoc Dung", "dung@example.com", "Cong nghe phan mem", 3.6)
      statement.run("SV005", "Hoang Thu Ha", "ha@example.com", "An toan thong tin", 3.1)

      statement.finalize()
    }
  })
})

module.exports = db
