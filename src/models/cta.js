// models/CTA.js
import mongoose from "mongoose";

const ctaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Internal use ke liye
    title: { type: String, required: true }, // Display heading
    description: String,
    buttonText: { type: String, required: true },
    buttonLink: { type: String, required: true },
    buttonVariant: {
      type: String,    
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.CTA || mongoose.model("CTA", ctaSchema);