const mongoose = require("mongoose")

//Schema

const userSchema = new mongoose.Schema({
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      default: null, // Making last_name optional by defaulting to null
    },
    email: {
      type: String, 
      required: true,
      unique: true
    },
    gender: {
      type: String,
      required: true,
    },
    job_title: {
      type: String,
      required: true,
    },
  },{timestamps:true}
  );

const User = mongoose.model("user", userSchema)

module.exports = {User}