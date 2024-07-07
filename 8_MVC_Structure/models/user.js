//In this file we define our User Schema and Models
const mongoose = require("mongoose");

//1st Define the schema
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

//2nd :Making a Model out of Schema
// Note: Only using the User class now I can interact with MongoDB
const User = mongoose.model("user", userSchema); // we pass in the model name and schema

//Now export this User
module.exports = User;
