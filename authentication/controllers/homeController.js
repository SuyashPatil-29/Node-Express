const User = require("../models/user")

const signUpRenderer = (req,res)=>{
    res.render("signup.ejs")
}

async function signUpController(req,res){
    const {name, email, password} = req.body
    await User.create({
        name : name,
        email : email,
        password : password
    })

    return res.redirect("/")
}

module.exports = {signUpRenderer, signUpController}