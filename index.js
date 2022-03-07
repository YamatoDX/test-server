require("dotenv").config();
const express = require("express");
const cors = require("cors");
const res = require("express/lib/response");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", () => {
  return res.status(200).json({
    name: "Shadman",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Listening to PORT ${process.env.PORT}`);
});
