const express = require("express")

const router = express.Router()

const studentController = require("../controllers/studentController")

router.get("/", studentController.index)

router.get("/add", studentController.createForm)

router.post("/create", studentController.store)

router.get("/edit/:id", studentController.editForm)

router.post("/edit/:id", studentController.update)

router.post("/delete/:id", studentController.destroy)

module.exports = router
