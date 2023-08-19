const express = require("express")
const router = express.Router()
const {handleClickOnRoute} = require("../controllers/url") 

router.get("/:shortId", handleClickOnRoute)

module.exports = router