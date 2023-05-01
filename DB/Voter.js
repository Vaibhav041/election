import mongoose from "mongoose";

const voterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    hindiName: {
      type: String,
      required: true,
    },
    hindiFatherName: {
      type: String,
      required: true,
    },
    building:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
  },
  { timestamps: true }
);
export default mongoose.model("voters", voterSchema);
