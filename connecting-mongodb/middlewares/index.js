const fs = require("fs")

function logReqRes(fileName) {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `${Date.now()}: ${req.method}: ${req.path} \n`,
      () => {
        next();
      }
    );
  };
}

module.exports = {logReqRes}