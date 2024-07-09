const { getUser } = require("../service/auth");

//This is also a middleware that will verify on basis of response not cookies
//Authentication is just to login users
function checkForAuthentication(req, res, next) {
  //Taking the header value from request
  const tokenCookie = req.cookies?.token; //? is just a null check
  req.user = null;

  if (!tokenCookie) return next(); //if above values are not present so we simply call next function

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
}

//This function authorizes which pages a user can visit
// This is a closure that restricts after authentication or we can say it is authorization
function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");

    //If the role is not satisfied then we return response as UnAuthorized
    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");

    return next();
  };
}

module.exports = {
  checkForAuthentication,
  restrictTo,
};
