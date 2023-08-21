const express = require("express")
const app = express()
const path = require("path")

const signupRoute = require("./routes/signUpRoute")
const homeRoute = require("./routes/home")

const connectMongoDb = require("./utils")
const { default: mongoose } = require("mongoose")

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.urlencoded({extended: false}))
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/checkAuth").then(()=>{
    console.log("Connected to MongoDB");
})

app.use("/" , signupRoute)
app.use("/home", homeRoute)

app.listen(3000, ()=>{
    console.log("Listening on port 3000");
})