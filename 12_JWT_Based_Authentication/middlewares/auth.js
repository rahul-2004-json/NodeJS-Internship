const { getUser } = require("../service/auth");

//This middleware handles whole authentication
async function restrictToLoggedinUserOnly(req, res, next) {
  //   console.log(req);
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect("/login");
  //If there is a cookie present , then we will find any user associated with it
  const user = getUser(userUid);

  //if no user is existing then again redirect
  if (!user) return res.redirect("/login");

  //if everything is valid , then we add this user to request body
  req.user = user;
  next();
}

//This middleware will help us show only those urls which were created by us
async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};
