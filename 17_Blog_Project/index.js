const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const Blog = require("./models/blog");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");

const app = express();
const PORT = 8002;

mongoose
  .connect("mongodb://localhost:27017/blogroll")
  .then((e) => console.log("MongoDB is connected"))
  .catch((error) => console.log(error));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middleware that accepts request body in type of form
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public"))); //Since express can't use static folders directly so here we tell it to use it statically

//This is to render home page and we will pass all the blogs to be rendered inside the home page
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  return res.render("home", {
    user: req.user, //passing the updated request body here
    blogs: allBlogs,
  });
});

//Whenever /user route is accessed userRoute will handle all such paths
app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => console.log(`Server Connected on Port No:${PORT}`));
