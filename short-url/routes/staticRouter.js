const express = require("express")
const router = express.Router()
const {handleStaticRoutes} = require("../controllers/staticRouter")
const { restrictTo } = require("../middlewares/auth")

router.get("/" ,restrictTo(["NORMAL"]), handleStaticRoutes)

router.get("/signup" , (req,res)=>{
    return res.render("signup")
})

router.get("/login" , (req,res)=>{
    return res.render("login")
})



module.exports = router