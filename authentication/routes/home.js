const express = require("express")
const router = express.Router()

router.get("/" , (req, res)=>{
    res.send("User Signed Up successfully")
})

module.exports = router;