//All the controllers of HTTP Methods will be written here
//Controllers are nothing but functions that we used to write as below after writing endpoints "/"
/* router.get("/", async (req, res) => {
     const allUsers = await User.find({});
     return res.json(allUsers);
   });
*/

const User = require("../models/user");

//Always keep functions as async whenever there is some task related to fetching information from databse or anything else
async function getAllUsers(req, res) {
  const allUsers = await User.find({});
  return res.json(allUsers);
}

async function getUserById(req, res) {
  let user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ status: "User not found" });
  } else {
    user = user.toObject(); // Will have to convert it to object then to JSON format otherwise it gives error
    return res.status(200).json(user);
  }
}

// async function updateUserById(req, res) {
//   await User.findByIdAndUpdate(req.params.id, { last_name: req.last_name });
//   return res.json({ status: "Done" });
// }

async function updateUserById(req, res) {
  try {
    // Find the user by ID and update it with the fields provided in req.body
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the update obeys the schema
    });

    if (!updatedUser) {
      return res.status(404).json({ status: "User not found" });
    }

    // Return the updated user
    return res.json({ status: "Done", user: updatedUser });
  } catch (error) {
    // Handle possible errors, such as validation errors or MongoDB operation errors
    return res.status(400).json({ status: "Error", message: error.message });
  }
}

async function deleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Deleted" });
}

//As we are creating a new resource in MongoDB so it will be asynchronous task
async function createNewUser(req, res) {
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
    return res
      .status(201)
      .json({ status: "data entered successfully", id: result._id });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createNewUser,
};
