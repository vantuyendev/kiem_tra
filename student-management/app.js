const express = require("express")
const path = require("path")

const studentRoutes = require("./routes/studentRoutes")

const app = express()
const port = 3000

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
  res.redirect("/students")
})

app.use("/students", studentRoutes)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
