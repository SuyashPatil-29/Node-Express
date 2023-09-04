const path = require("path")
const express = require("express")
const app = express()
const multer = require("multer")

const port = 3000

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname
      cb(null, uniqueSuffix)
    }
  })

  const upload = multer({ storage: storage })
   

app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    return res.render("homepage")
})

app.post("/upload", upload.single("profileImage") ,(req,res)=>{
    console.log("Body",req.body);
    console.log("File",req.file);

    return res.redirect("/");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})