const path = require("path")
const express = require("express")
const app = express()
const port = 3000

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())

app.get("/", (req, res) => {
    return res.render("homepage")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})