const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  Name: {
    type: String,
    required: [true, " Name is required"],
  },
  Email: {
    type: String,
    unique: [true,"email is exist"],
    required: [true, "Email is required"],
    
  },
  Password: {
    type: String,
    required: [true, "Password is required"],
    minLenght:[6,"password must be at least 6 char"]
  },
});

var userModel = mongoose.model("user", UserSchema);
module.exports = userModel;
