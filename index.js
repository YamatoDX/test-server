require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const cors = require("cors");
const app = express();

const Profile = require("./models/Profile");
const Phone = require("./models/Phone");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    data: "Welcome to this demo server",
  });
});

app.get("/get-all-profiles", async (req, res) => {
  try {
    const allProfiles = await Profile.find();
    const filteredData = allProfiles.map((eachProfileObject) => {
      return _.pick(eachProfileObject, ["fullName", "age", "profession"]);
    });
    return res.status(200).json({
      data: filteredData,
      message: "All profiles fetched with ok",
    });
  } catch (err) {
    return res.status(400).json({
      data: [],
      message: "There was an error in fetching all the profiles",
    });
  }
});

app.get("/get-all-phones", async (req, res) => {
  try {
    const allPhones = await Phone.find();
    const filteredData = allPhones.map((eachPhoneObject) => {
      return _.pick(eachPhoneObject, ["modelName", "battery", "origin"]);
    });
    return res.status(200).json({
      data: filteredData,
      message: "All phones fetched with ok",
    });
  } catch (err) {
    return res.status(400).json({
      data: [],
      message: "There was an error in fetching all the phones",
    });
  }
});

app.post("/create-profile", async (req, res) => {
  const { fullName, age, profession } = req.body;
  if (!fullName || !age || !profession) {
    return res.status(400).json({
      data: [],
      message: "FullName, age, profession all must be provided",
    });
  }
  try {
    const newProfile = new Profile({
      fullName,
      age,
      profession,
    });
    const response = await newProfile.save();
    return res.status(200).json({
      data: response,
      message: "Document created successfully in mongoDB",
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
      data: [],
      message: "There was an error creating document in mongoDB",
    });
  }
});

app.post("/create-phone", async (req, res) => {
  const { modelName, battery, origin } = req.body;
  if (!modelName || !battery || !origin) {
    return res.status(400).json({
      data: [],
      message: "modelName, battery, origin all must be provided",
    });
  }
  try {
    const newPhone = new Phone({
      modelName,
      battery,
      origin,
    });
    const response = await newPhone.save();
    return res.status(200).json({
      data: response,
      message: "Document created successfully in mongoDB",
    });
  } catch (err) {
    return res.status(400).json({
      error: err,
      data: [],
      message: "There was an error creating document in mongoDB",
    });
  }
});

app.listen(process.env.PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Listening to PORT ${process.env.PORT}`);
  } catch (err) {
    console.error("Error during connection", err);
  }
});
