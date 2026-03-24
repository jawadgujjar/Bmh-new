import mongoose from "mongoose";

const HeroFormSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    websiteUrl: { type: String }, // optional
  },
  { timestamps: true }
);

export default mongoose.models.HeroForm ||
  mongoose.model("HeroForm", HeroFormSchema);