const express = require("express");
const {logReqRes} = require("./middlewares/index")
const {connectMongoDb} = require("./connection")
const userRouter = require("./routes/user")

const app = express();

//Connect to mongoDB
connectMongoDb("mongodb://127.0.0.1:27017/youtube-tutorial").then(()=>console.log("MongoDB Connected"))


//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Routes
app.use("/api/users" , userRouter)
app.get("/", (req, res)=>{
  res.send("From /")
})


app.listen(3002, () => {
  console.log("Listening on port 3002");
});
