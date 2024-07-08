//Instead of maintaing a map or log of id mapped with user , we will create tokens
const jwt = require("jsonwebtoken");
const secret = "urlshortener$123@$"; //those who have this secret will be the only ones who make tokens and change it no one else can change it

//This function creates tokens
function setUser(user) {
  //We pass in here whole user object as payload
  return jwt.sign(
    //Passing the payload
    {
      _id: user._id,
      email: user.email,
    },
    secret
  );
}

//When we are fetching the user back we will verify it using the token and secret key
function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
