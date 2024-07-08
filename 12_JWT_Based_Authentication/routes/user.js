const express = require("express");
const router = express.Router();
const { handleSignUp, handleLogIn } = require("../controllers/user");

//SignUp Route
router.post("/", handleSignUp);
router.post("/login", handleLogIn);

module.exports = router;
