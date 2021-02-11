const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
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
    requred: true,
  },
  city: {
    type:String,
    required:true
  },
  country: {
    type: String,
    required:true
  }
});

const User = model("User", userSchema);

module.exports = User;
