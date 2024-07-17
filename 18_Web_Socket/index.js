const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express(); //app is a functional handler
const server = createServer(app); //app is supplied to http server
//This io will handle the socket operations io means input output operations
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

//Socket.io
//In language of socket.io a user is called socket
// listen on the connection event for incoming sockets and log it to the console
io.on("connection", (socket) => {
  //This will send the message to everyone including the sender
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log(`server running at http://localhost:3000 `);
});
