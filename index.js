import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./DB/User.js";
import Voter from "./DB/Voter.js";
const app = express();

const corsConfig = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(express.json());
app.use(cors(corsConfig));
dotenv.config();

mongoose.connect(process.env.MONGO, { useNewUrlParser: true }).then(() => {
  console.log("db");
});

app.post("/auth/login", async (req, res) => {
  try {
    let data = await User.findOne(req.body).select("-password");
    if (data) {
      res.status(200).json({ data, success: true });
    } else {
      res.status(500).json("no user found");
    }
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.post("/auth/register", async (req, res) => {
  let user = new User(req.body);
  await user.save();
  res.status(200).json(user);
});

app.post("/voter/add", async (req, res) => {
  let voter = new Voter(req.body);
  await voter.save();
  res.status(200).json(voter);
});

app.get("/voter/get/:name/:building/:id/:so/:booth", async (req, res) => {
  let result = await Voter.find({
    $or: [
      { name: { $regex: req.params.name, $options: "i" } },
      { building: { $regex: req.params.building, $options: "i" } },
      { userId: { $regex: req.params.id, $options: "i" } },
      { fatherName: { $regex: req.params.so, $options: "i" } },
      { boothNumber: { $regex: req.params.booth, $options: "i" } },
    ],
  });
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(500).json("no results match");
  }
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log("connected");
});
