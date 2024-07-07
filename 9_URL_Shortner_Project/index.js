const express = require("express");
const PORT = 8001;
const { connectMongoDB } = require("./connection");
const urlRouter = require("./routes/url");

const app = express();

//Connect to MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/URLShortener");

//Important middleware to parse the incoming request bodies in form of json
//When using POSTMAN , the request bodies should be sent in form of json
app.use(express.json());

app.use("/url", urlRouter);
// http://localhost:8001/url/analytics/87ob8c93l  every endpoint will be handled by above router just it should have /url init

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
