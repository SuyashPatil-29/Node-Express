const express = require("express")
const app = express()
const port = 3000
const path = require('path')
const userRoutes = require("./routes/user") 
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const checkForAuthenticationCookie = require("./middlewares/authentication")

mongoose.connect("mongodb://127.0.0.1:27017/blogify").then((e)=>{
    console.log("MongoDb Connected");
})

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(checkForAuthenticationCookie("token"))

app.get("/", (req, res) => {
    res.render("home",{
        user : req.user
    })
})

app.use("/user", userRoutes)
 
app.listen(port, () => {
    console.log("Server is running on port ", port)
})