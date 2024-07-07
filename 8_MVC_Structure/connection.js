const mongoose = require("mongoose");

async function connectMongoDB(url) {
  return mongoose
    .connect(url) //This my database name /TutorialAPP1
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Mongo Error:", err));
}

module.exports = {
  connectMongoDB,
};
