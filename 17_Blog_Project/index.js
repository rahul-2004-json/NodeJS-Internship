const express = require("express");
const path = require("path");
const userRoute = require("./routes/user");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://localhost:27017/blogroll")
  .then((e) => console.log("MongoDB is connected"))
  .catch((error) => console.log(error));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("home");
});

app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server Connected on Port No:${PORT}`));
