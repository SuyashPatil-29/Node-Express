const http = require("http")
const fs = require("fs")
const url = require("url")

const myServer = http.createServer((req, res)=>{

    const log = `${Date.now()} : ${req.method} New Request recieved on ${req.url}\n`
    const myUrl = url.parse(req.url, true)
    console.log(myUrl);
    fs.appendFile("log.txt", log, ()=>{
        switch(myUrl.pathname){
            case "/" :
                res.end("Home Page\n")
                break;
            case "/about" :
                res.end(`Hello ${myUrl.query.myname}`)
                break;
            default:
                res.end(`${req.url} Page\n`)
        }
    })
});

myServer.listen(3001,()=>{console.log("server started on port 3001");})
