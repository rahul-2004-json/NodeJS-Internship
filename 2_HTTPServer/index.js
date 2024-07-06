//Building HTTP Server In NodeJS
//If we make any changes on the server then we will have to restart the server
const http = require("http");
const fs = require("fs");
const url = require("url");

//createServer basically makes a web server for us
//It accepts a callback function or request handler
//In callback parameter function we can pass both request and response
const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} : ${req.url} ${req.method} New Request Received\n`;

  //This line doesn't console log the /favicon.ico
  if (req.url === "/favicon.ico") {
    return res.end();
  }

  //Parse the URL
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);

  //We can send response as anything , here we are sending text but the response can be html also (that is called as server side rendering)
  fs.appendFile("log.txt", log, (err, data) => {
    if (err) {
      console.log(err.message);
      return res.end("Error logging request");
    }
    switch (myUrl.pathname) {
      case "/":
        res.end("Home Page");
        break; // Prevents fall-through
      case "/about":
        let username = myUrl.query.name;
        res.end(`Hello my name is ${username}`);
        break; // Prevents fall-through
      default:
        res.end("404 Not found but Hello from Server ");
        break; // Good practice, even if it's the last case
    }
  });
});

//We will have to make this server to be listened on a port
//This listen method also expects a callback function
//Whenever I run npm start , the server will start listening at 8000 port

//When I will try to access this port on browser then it will send the request to server and we will get response appended in file
myServer.listen(8000, () => console.log("Server Started !"));
