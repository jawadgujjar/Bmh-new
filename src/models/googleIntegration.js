import mongoose from "mongoose";

// Singleton document: one connected Google account used to create every
// meeting on the site, so visitors never have to sign in with Google.
const GoogleIntegrationSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: "calendar" },
    refreshTokenEnc: { type: String, required: true },
    connectedEmail: { type: String, required: true },
    connectedBy: { type: String }, // admin email who connected it
  },
  { timestamps: true }
);

export default mongoose.models.GoogleIntegration ||
  mongoose.model("GoogleIntegration", GoogleIntegrationSchema);
