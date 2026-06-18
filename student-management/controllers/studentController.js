const studentModel = require("../models/studentModel")

async function index(req, res) {
  try {
    const keyword = req.query.keyword || ""

    let students = []

    if (keyword.trim() !== "") {
      students = await studentModel.searchStudents(keyword)
    } else {
      students = await studentModel.getAllStudents()
    }

    res.render("students/index", {
      students: students,
      keyword: keyword,
      message: students.length === 0 ? "Không tìm thấy sinh viên phù hợp" : ""
    })
  } catch (error) {
    console.log(error)
    res.send("Lỗi khi lấy danh sách sinh viên")
  }
}

function createForm(req, res) {
  res.render("students/create")
}

async function store(req, res) {
  try {
    const student = {
      student_code: req.body.student_code,
      fullname: req.body.fullname,
      email: req.body.email,
      major: req.body.major,
      gpa: req.body.gpa
    }

    await studentModel.createStudent(student)

    res.redirect("/students")
  } catch (error) {
    console.log(error)
    res.send("Lỗi khi thêm sinh viên")
  }
}

async function editForm(req, res) {
  try {
    const id = req.params.id

    const student = await studentModel.getStudentById(id)

    if (!student) {
      return res.status(404).send("Không tìm thấy sinh viên")
    }

    res.render("students/edit", { student: student })
  } catch (error) {
    console.log(error)
    res.send("Lỗi khi mở form sửa sinh viên")
  }
}

async function update(req, res) {
  try {
    const id = req.params.id

    const student = {
      student_code: req.body.student_code,
      fullname: req.body.fullname,
      email: req.body.email,
      major: req.body.major,
      gpa: req.body.gpa
    }

    await studentModel.updateStudent(id, student)

    res.redirect("/students")
  } catch (error) {
    console.log(error)
    res.send("Lỗi khi cập nhật sinh viên")
  }
}

async function destroy(req, res) {
  try {
    const id = req.params.id

    await studentModel.deleteStudent(id)

    res.redirect("/students")
  } catch (error) {
    console.log(error)
    res.send("Lỗi khi xóa sinh viên")
  }
}

module.exports = {
  index,
  createForm,
  store,
  editForm,
  update,
  destroy
}
