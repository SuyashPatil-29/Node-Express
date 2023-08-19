const express = require("express")
const router = express.Router()
const {handleStaticRoutes} = require("../controllers/staticRouter")

router.get("/" , handleStaticRoutes)

router.get("/signup" , (req,res)=>{
    return res.render("signup")
})

router.get("/login" , (req,res)=>{
    return res.render("login")
})



module.exports = router