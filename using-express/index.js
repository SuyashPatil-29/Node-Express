const express = require("express")
const app = express()
const port = 3000

app.get("/", (req,res)=>{
    return res.send(`Hello ${req.query.name} from home`)
})

app.get("/about", (req,res)=>{
    return res.send(`Hello ${req.query.name} from abouts page, you are ${req.query.age} years old`)
})

app.listen(port, ()=>console.log("Port running on ", port))