const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type:String,
    required:true
  },
  lastname: {
    type:String,
    required:true
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type:String,
    required:false,
  },
  country: {
    type: String,
    required:true
  },
  dateRegister:{
    type: Date,
    default: Date.now,
    required: true
  },
  usertype:{
    type: String,
    default: 'user',
    required: true
  },
  hobbies: String,
  picture: {
    type: String,
    default: "/images/baseProfile.png"
  },
});

const User = model("user", userSchema);

module.exports = User;
