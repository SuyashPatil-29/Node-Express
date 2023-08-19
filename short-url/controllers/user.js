const User = require("../models/user")
const { v4: uuidv4 } = require('uuid');
const {setUser, getUser} = require("../service/auth")

async function handleUserSignUp(req,res){
    const {name, email, password} = req.body
    await User.create({
        name : name,
        email : email,
        password : password
    })

    return res.redirect("/")
}

async function handleUserLogin(req,res){
    const {name, email, password} = req.body
    try {
        // Search for a user with the given email and password
        const user = await User.findOne({ email, password });
        
        if (user) {
            // User found, handle successful login
            const sessionId = uuidv4()
            setUser(sessionId, user)
            res.cookie("uid", sessionId)
            res.redirect("/")
        } else {
            // User not found, handle login failure
            res.json({ message: 'User not found or incorrect credentials' });
        }
    } catch (error) {
        // Handle any errors that occur during the search
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {handleUserSignUp, handleUserLogin}