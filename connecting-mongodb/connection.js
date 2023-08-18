const mongoose = require("mongoose");

async function connectMongoDb(url) {
  //Connect to mongoDB
  return mongoose.connect(url)
}

module.exports = {connectMongoDb}
