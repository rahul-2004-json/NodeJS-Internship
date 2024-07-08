const express = require("express");
const PORT = 8002;
const { connectMongoDB } = require("./connection");
const path = require("path");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

const URL = require("./models/url");

const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");

const app = express();

//Connect to MongoDB
connectMongoDB("mongodb://127.0.0.1:27017/URLShortener");

//We will set our view engine in index.js to tell our express
app.set("view engine", "ejs");
//Now we will tell our express the location of ejs files
app.set("views", path.resolve("./views"));

//Important middleware to parse the incoming request bodies in form of json
//When using POSTMAN , the request bodies should be sent in form of json
app.use(express.json());
//To support requests in type of forms
app.use(express.urlencoded({ extended: false }));
//To parse the cookie
app.use(cookieParser());

// http://localhost:8001/url/analytics/87ob8c93l  every endpoint will be handled by above router just it should have /url init
// this url is restrictToLoggedinUserOnly
app.use("/url", restrictToLoggedinUserOnly, urlRouter);
//Static Router
app.use("/", checkAuth, staticRouter);
//User Router
app.use("/user", userRouter);

//Rendering with the help of ejs
app.get("/test", async (req, res) => {
  const allUrls = await URL.find({});
  return res.render("home", {
    urls: allUrls, //we can even pass multiple variables that can be used in ejs files
  }); //home is the ejs file present in views folder
});

app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
