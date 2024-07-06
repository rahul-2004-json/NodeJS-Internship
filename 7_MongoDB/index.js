const express = require("express");
const mongoose = require("mongoose");
const PORT = 8000;
const fs = require("fs");

const app = express();

//Step:1
//Connecting MongoDB
//This returns a promise which needs to be resolved
mongoose
  .connect("mongodb://127.0.0.1:27017/TutorialAPP1") //This my database name /TutorialAPP1
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo Error:", err));

//Step:2
//Defining Schema for our Mongoose
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true } //This shows the creation and updation timings of data
);

//Step:3
//Making a Model out of Schema
// Note: Only using the User class now I can interact with MongoDB
const User = mongoose.model("user", userSchema); // we pass in the model name and schema

//Middlewares
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Hello from middleware 1");
  req.name = "Rahul";
  next();
});

app.use((req, res, next) => {
  console.log(`Hello from middleware 2 ${req.name}`);
  next();
});

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
//Note : anything related to database can take time so we make it asynchronous
app.get("/users", async (req, res) => {
  const allUsers = await User.find({}); //find({}) this means it finds all
  const html = `<ul>
    ${allUsers
      .map((user) => `<li>${user.first_name} - ${user.jobTitle}</li>`)
      .join("")}
    </ul>`;

  res.send(html); //Sending the html in response
});

app.get("/api/users", async (req, res) => {
  const allUsers = await User.find({});
  return res.json(allUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ status: "User not found" });
    } else {
      user = user.toObject(); // Will have to convert it to object then to JSON format otherwise it gives error
      return res.status(200).json(user);
    }
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { last_name: "changed" });
    return res.json({ status: "Done" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Deleted" });
  });

//As we are creating a new resource in MongoDB so it will be asynchronous task
app.post("/api/users", async (req, res) => {
  //Checking if all fields present
  if (
    !req.body ||
    !req.body.first_name ||
    !req.body.last_name ||
    !req.body.email ||
    !req.body.jobTitle ||
    !req.body.gender
  ) {
    return res.status(400).json({ status: "All fields are required" });
  } else {
    //When we create a new entry using Model it returns us the created data
    const result = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      jobTitle: req.body.jobTitle,
      gender: req.body.gender,
    });

    console.log(result);
    return res.status(201).json({ status: "data entered successfully" });
  }
});

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
