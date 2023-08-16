const fs = require('fs');
const os = require("os")

// //synchronous file creation with content
// fs.writeFileSync('./test.txt', "Hello World");

// //Asynchronous file creation with content
// fs.writeFile("./text1.txt", "Nice", (err)=>console.log(err));

// //reading content from file sync
// const result = fs.readFileSync("./contacts.txt", "utf-8")
// console.log(result);

// //reading content from file Async
// fs.readFile("./contacts.txt", "utf-8", (err, res)=>{
//     err ? console.log("error ", err) : console.log(res);
// })

// // appending content to a file sync
// fs.appendFileSync("./contacts.txt", "Suyash 2: +9127336768")

console.log(os.cpus().length);