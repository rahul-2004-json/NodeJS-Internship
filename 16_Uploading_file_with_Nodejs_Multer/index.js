const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 8001;

//One way
// //upload is a middleware , whatever user will upload from frontend that will go into uploads folder
// const upload = multer({ dest: "uploads/" });

//Another way to store the files in a controlled way without loosing data
const storage = multer.diskStorage({
  //This will be saving files at particular destination which we decide
  destination: function (req, file, cb) {
    //cb is callback function here that accepts the error and file path here for upload
    //here we are considering error to be null
    return cb(null, "./uploads");
  },
  //This is to give filename to uploaded file
  filename: function (req, file, cb) {
    //benefit of adding current date is that no two filenames will be same
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

//We will pass storage object inside the multer that we have created above
const upload = multer({ storage: storage });

//Setting up the views
app.set("view engine", "ejs");
//views set to views folder
app.set("views", path.resolve("./views"));

//This is to handle json request
app.use(express.json());
//To handle form request from client we use middleware as below
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  //renders the ejs file present in views folder
  return res.render("homepage");
});

//Handling the /upload route via uploading single profileImage
app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body); //this will be null as there is no text field
  console.log(req.file); //this will return the file information
  return res.redirect("/");
});

app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`));
