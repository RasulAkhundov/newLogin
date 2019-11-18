const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  email: { type: String, trim: true, required: true, unique: true },
  username: { type: String, trim: true, required: true, unique: true },
  password: { type: String }
});

// parol haqqesabi

schema.methods.setPassword = function setPassword(password) {
  this.password = bcrypt.hashSync(password, 10);
};

schema.methods.checkPassword = function checkPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

//  jsonwebtoken haqqwesabi

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email,
      username: this.username
    },
    "qwerty"
  );
};

schema.plugin(uniqueValidator);

const User = mongoose.model("User", schema);
module.exports = User;
