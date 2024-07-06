// //package.json file is made by npm init 
// //This package.json file is used to store the configuration of the project.
// //Any dependencies that are required for the project are stored in this file.
// // This file is created by writing npm init in the terminal.

// console.log("Hello NodeJS");

// //This is the method to import the functions from other file
// // we have to use the require function to import the functions from other file
// // we can even destructure it like const {add,sub}=require("./math");
// const math = require("./math.js"); 

// console.log(math.add(2,3));
// console.log(math.sub(2,3));


//When we have exported the function using exports
const {add,sub} = require("./math.js");
console.log(add(4,3));
console.log(sub(4,3));


