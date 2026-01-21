import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    fullContent: { type: String, required: true },  
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
    tableOfContents: [
      {
        id: { type: String },
        title: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
