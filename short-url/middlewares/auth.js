const { getUser } = require("../service/auth")

function checkForAuthentication(req, res, next) {

    req.user = null;

    const authorizationHeaderValue = req.headers["Authorization"] 

    if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith("Bearer")) return next()

    const token = authorizationHeaderValue.split("Bearer")[1]
    const user = getUser(token)

    if(!user) return res.redirect("/login")

    req.user = user;
    next();
}

function restrictTo(roles) {
    return (req, res, next) => {
        
        if(!req.user) return res.redirect("/login")

        if(!roles.includes(req.user.role)) return res.send("You are unauthorized")
        next();
    }
}

module.exports = {checkForAuthentication, restrictTo};