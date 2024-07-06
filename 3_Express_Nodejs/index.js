/*
Why Express is Needed?
-> Making servers via http makes the code complex and ugly
-> Using express we get the functionality to make our code look a lot cleaner 
*/

const express = require("express");
const app = express(); //this app is handler function that we will use to handle all requests

//To app we will pass the endpoint and a handler function
//Syntax of Express is app.METHOD(PATH,HANDLER)
app.get("/", (req, res) => {
  return res.end("From Home Page");
});

//How to access the query parameter here
app.get("/about", (req, res) => {
  return res.end(`Your name is ${req.query.name}`);
});

app.listen(8000, () => console.log("Server Started"));
