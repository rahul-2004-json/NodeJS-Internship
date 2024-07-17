const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookievalue = req.cookies[cookieName];

    //if no user then no cookie value so call the next function
    if (!tokenCookievalue) {
      return next();
    }

    //if user exists then
    try {
      //Then verify the token
      const userPayload = validateToken(tokenCookievalue);
      //update the req with userpayload
      req.user = userPayload;
    } catch (error) {
      console.error("Token validation error:", error);
      return res.status(401).send("Invalid token");
    }
    next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
};
