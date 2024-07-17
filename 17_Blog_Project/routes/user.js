const { Router } = require("express");
const User = require("../models/user"); //Here User is the model
const router = Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

//Anything involving fetching validating data from database or API should be async
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordandGenerateToken(email, password);

    //Once the user is logged in we create a cookie and store the token inside it
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: `Incorrect email or password `,
    });
  }
});

//Anything involving fetching validating data from database or API should be async
router.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;
  await User.create({
    fullname,
    email,
    password,
  });

  //when signedup we redirect user back to home page
  return res.redirect("/");
});

router.get("/signout", (req, res) => {
  //Just clear the cookie to sign out the user
  res.clearCookie("token").redirect("/");
});

module.exports = router;
