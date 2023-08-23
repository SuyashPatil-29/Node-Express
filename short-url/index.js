const express = require("express")
const app = express()
const connectToMongoDB = require("./connect")
const path = require("path")
const cookieParser = require("cookie-parser") 

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

const routes = require("./routes/url")
const individualRoutes = require("./routes/individualID")
const staticRoutes = require("./routes/staticRouter")
const userSignUpRoute = require("./routes/user")
const {checkForAuthentication, restrictTo} = require("./middlewares/auth")

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(cookieParser())
app.use(checkForAuthentication)

// connect mongo db
connectToMongoDB('mongodb://127.0.0.1:27017/shortUrl').then(()=>console.log("MongoDB connected"));

//middlewares

//routes
app.use("/url" , restrictTo(["NORMAL"]) ,routes) // to get analytics

app.use("/view" , individualRoutes) //redirects user to the url page

app.use("/" , staticRoutes) //to show static pages like login and signup

app.use("/user" , userSignUpRoute) //to handle signups and logins 

app.listen(3000, ()=>{
    console.log("Server started on port 3000");
})