const express = require("express");
const users = require("./MOCK_DATA.json");
const PORT = 8002;
const fs = require("fs");

const app = express();

//Middleware - Plugin
//Note : Middlewares are executed in sequence

//This middle allows us to send data like a x-www-form-urlencoded in postman
//Moreover it is accessing the body of request and making changes in it and updating the request body
app.use(express.urlencoded({ extended: false }));

//Custom Middlewares
//we can make our own middleware using the use method
//While making a middleware we should pass three things in parameters req,res,next
//where next is to call the next middleware
app.use((req, res, next) => {
  console.log("Hello from middleware 1");
  req.name = "Rahul"; //made changes in the request body
  //   return res.json({ status: "inside middle ware 1" }); //if we return response here only then it will stop executing the below routes
  next(); // writing this is important to call the next route functions or middlewares
});

app.use((req, res, next) => {
  console.log(`Hello from middleware 2 ${req.name}`); //the change in request body is accessible in every function or middleware
  next();
});

//Custom Middleware that logs all the requests in a file
app.use((req, res, next) => {
  fs.appendFile(
    "logs.txt",
    `\n${Date.now()}: ${req.method} : ${req.path}`,
    (err, data) => {
      if (err) {
        console.log(err.message);
      } else {
        next();
      }
    }
  );
});

//Routes

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
