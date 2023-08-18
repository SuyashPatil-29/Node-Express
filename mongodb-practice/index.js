const express = require("express")
const mongoose = require("mongoose")
const app = express()

app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://127.0.0.1:27017/newTestDb")

const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required : true
    },
    email: {
        type: String,
        unique : true
    }
})

const UserModel = mongoose.model("users", userSchema)

app.get("/" , async (req, res)=>{
    const users = await UserModel.find({})
    res.json(users)
})

app.post("/", async (req,res)=>{
    const body = req.body
    const result = await UserModel.create({
        firstName : body.firstName,
        email : body.email
    })

    return res.status(201).json({msg : "Success"})
})

app.listen(3001, ()=>{console.log("Listening on port 3001")})