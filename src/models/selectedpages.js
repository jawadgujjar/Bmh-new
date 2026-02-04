import mongoose from "mongoose";

const selectedPagesSchema = new mongoose.Schema(
  {
    categoryName: {
      type: String,
      required: true,
      enum: ["digital-marketing", "web-development", "app-development"],
      unique: true, // ek category ka aik hi selected-pages record
    },

    pages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Page",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.SelectedPages ||
  mongoose.model("SelectedPages", selectedPagesSchema);
