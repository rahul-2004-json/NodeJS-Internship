const JWT = require("jsonwebtoken");

const secret = "@lphabetagammayummayumma";

//This function creates token based on user object that we pass in it
function createTokenForUser(user) {
  //1. Create a payload
  const payload = {
    _id: user.id,
    fullname: user.fullname,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  //2.Sign the token containing payload with secret
  const token = JWT.sign(payload, secret, { expiresIn: "24h" });
  return token;
}

//This function will verify the provided token based on the secret and return the payload
function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = {
  createTokenForUser,
  validateToken,
};
