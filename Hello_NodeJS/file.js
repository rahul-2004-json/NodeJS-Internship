//These things can only be done using Node.js not in browser javascript because of security reasons.
// The node:fs module enables interacting with the file system.
const fs = require("fs");

// // This is writing in synchoronous mode.
// fs.writeFileSync("hello.txt","Hello from Node.js!");

// //How to write in asynchronous mode.
// //This asynchronous mode also takes err in callback function if anything goes wrong
// fs.writeFile("hello2.txt","Rahul Yadav",(err)=>{
//     if(err){
//         console.log(err);
//     }
//     console.log("File has been written successfully!");
// })

//How to read a file synchronously
//This returns the result which can be stored in a variable and then printed.
// const content = fs.readFileSync("hello2.txt","utf-8");
// console.log(content.toString());

//How to read a file asynchronously
//This returns a  result and error in a callback function
// fs.readFile("hello.txt","utf-8",(err,result)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(result);
//     }
// })

//How to append content at the end of the file
fs.appendFileSync("hello.txt", "\nThis is my Kingdom");

// fs.cpSync("hello.txt","copied.txt");

// How to delete file
// fs.unlinkSync("copied.txt");

//How to make directory
fs.mkdirSync("my-docs/a/b", { recursive: true }); //recursive:true is used to create nested directories
