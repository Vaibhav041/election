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
    let data = await User.findOne({name:req.body.name});
    if (data) {
        if (data.password === req.body.password) {
            res.status(200).json({ success: true });
        }
        else {
            res.status(500).json({success:false});
        }
    } else {
      res.status(500).json("no user");
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

app.get("/voter/get/:name/:building/:so/:booth", async (req, res) => {
  let arr = [];
  if (req.params.name != 'x') {
    arr.push({
      name:  { $regex: req.params.name, $options: "i" }
    });
  }
  if (req.params.building != 'x') {
    arr.push({
      building:  { $regex: req.params.building, $options: "i" }
    });
  }
  if (req.params.so != 'x') {
    arr.push({
      fatherName:  { $regex: req.params.so, $options: "i" }
    });
  }
  if (req.params.booth !== 'x') {
    arr.push({
      boothNumber:  { $regex: req.params.booth, $options: "i" }
    });
  }
  
  let result = await Voter.find({
    $and: arr,
  });
  if (result) {
    res.status(200).json(result);
  } else {
    res.status(500).json("no results match");
  }
});

app.get("/voter/get2/:name/:building/:so/:booth", async (req, res) => {
  const filter = {
    name: req.query.name !=='#' ? { $regex: req.query.name, $options: 'i'} : /.*/,
    fatherName: req.query.so !=='#' ? {$regex: req.query.so, $options: 'i'} : /.*/,
    hindiName: /.*/,
    hindiFatherName:/.*/,
    building: req.query.building !=='#' ? {$regex: req.query.building, $options: 'i'} : /.*/,
    age: /.*/,
    boothNumber: req.query.booth !=='#' ? {$regex: req.query.booth, $options: 'i'} : /.*/,
    userId: /.*/
  }
  // const voters = await Voter.find(filter);
  res.status(200).json("filter");
})

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log("connected");
});
