const URL = require("../models/url")
const {getUser} = require("../service/auth")

async function handleStaticRoutes(req,res){
    if(!req.user) return res.redirect("/login")

    const allUrls = await URL.find({createdBy : req.user._id})
    return res.render("home", {
        urls : allUrls
    })
}

module.exports = {handleStaticRoutes}