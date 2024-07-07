//Separate file for middlewares
const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `\n${Date.now()}: ${req.method} : ${req.path}`,
      (err, data) => {
        if (err) {
          console.log(err.message);
        } else {
          next();
        }
      }
    );
  };
}

module.exports = {
  logReqRes,
};
