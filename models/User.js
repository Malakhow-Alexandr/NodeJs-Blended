const { boolean } = require("joi");
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    minLength: 6,
  },
  refresh_token: {
    type: String,
    default: "",
  },
});

const User = model("user", userSchema);

module.exports = { User };
