//A separate file that handles the routes and http methods
const express = require("express");
const router = express.Router(); // This is provided by express to reach the endpoints

//Importing the controller aka callback function that will be passed in as parameter
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createNewUser,
} = require("../controllers/user");

//Routes
//This route is only specific to user
router.route("/").get(getAllUsers).post(createNewUser);

router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

//Now export the router
module.exports = router;
