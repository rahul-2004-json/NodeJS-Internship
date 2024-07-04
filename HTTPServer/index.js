//Building HTTP Server In NodeJS
//If we make any changes on the server then we will have to restart the server

const http = require("http");
const fs = require("fs");

//createServer basically makes a web server for us
//It accepts a callback function
const myServer = http.createServer((req, res) => {
  const log = `${Date.now()} : ${req.url} New Request Received\n`;
  //We can send response as anything , here we are sending text but the response can be html also (that is called as server side rendering)
  fs.appendFile("log.txt", log, (err, data) => {
    res.end("Hello from Server");
  });
});

//We will have to make this server to be listened on a port
//This listen method also expects a callback function
myServer.listen(8000, () => console.log("Server Started !"));
