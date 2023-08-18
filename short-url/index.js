const express = require("express")
const app = express()
const routes = require("./routes/url")
const connectToMongoDB = require("./connect")

app.use(express.urlencoded({extended : false}))
app.use(express.json())

// connect mongo db
connectToMongoDB('mongodb://127.0.0.1:27017/shortUrl').then(()=>console.log("MongoDB connected"));

//routes
app.use("/url" , routes)

app.listen(3000, ()=>{
    console.log("Server started on port 3000");
})