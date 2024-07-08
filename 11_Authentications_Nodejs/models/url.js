const mongoose = require("mongoose");

//1st: Creating a Schema
const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

//2nd : Creating a Model out of schema
const URL = mongoose.model("url", urlSchema);

//3rd : Exporting the Schema
module.exports = URL;
