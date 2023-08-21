const express = require("express")
const router = express.Router()

const {signUpRenderer, signUpController} = require("../controllers/homeController");


router.get("/signup" , signUpRenderer)
router.post("/signup" , signUpController)

module.exports = router;