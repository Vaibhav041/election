import mongoose from "mongoose";

const voterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    fatherName: {
      type: String,
    },
    hindiName: {
      type: String,
    },
    hindiFatherName: {
      type: String,
    },
    building: {
      type: String,
    },
    age: {
      type: Number,
    },
    boothNumber: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.model("voters", voterSchema);
