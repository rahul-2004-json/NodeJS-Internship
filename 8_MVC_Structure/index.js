const express = require("express");
const PORT = 8000;
const fs = require("fs");
const { connectMongoDB } = require("./connection");

const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");

const app = express();

//Connecting to MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/TutorialAPP1");

//Middlewares
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("logs.txt"));

//Routes
app.use("/api/users", userRouter); //Any request coming on user router will be handled by userRouter

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
