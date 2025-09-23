import mongoose from "mongoose";

const CallToActionQuoteSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },   // Full Name
    emailAddress: { type: String, required: true }, // Email
    phoneNumber: { type: String, required: true }, // Phone
    goalsAndRequirements: { type: String, required: true }, // Textarea
  },
  { timestamps: true }
);

export default mongoose.models.CallToActionQuote ||
  mongoose.model("CallToActionQuote", CallToActionQuoteSchema);
