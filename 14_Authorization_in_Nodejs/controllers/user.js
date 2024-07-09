const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleSignUp(req, res) {
  //Taking the name, email  and password from the req body
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  //Once signed up , we will redirect user to home page that is made with ejs
  return res.redirect("/");
}

async function handleLogIn(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  }
  const token = setUser(user); //after setting the user , it returns to us the token
  //Now make a cookie
  //we give it a name and pass in the sessionId
  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = {
  handleSignUp,
  handleLogIn,
};
