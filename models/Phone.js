const mongoose = require("mongoose");

const phoneSchema = new mongoose.Schema({
  modelName: {
    type: String,
    required: true,
  },
  battery: {
    type: Number,
    require: true,
  },
  origin: {
    type: String,
    require: true,
  },
});

const Phone = mongoose.model("Phone", phoneSchema);
module.exports = Phone;
