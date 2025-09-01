import mongoose from "mongoose";

const GetaQuoteSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    websiteUrl: { type: String }, // optional
    monthlyBudget: { type: Number, required: true },
    projectDetails: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.GetaQuote ||
  mongoose.model("GetaQuote", GetaQuoteSchema);
