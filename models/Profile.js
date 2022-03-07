const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
