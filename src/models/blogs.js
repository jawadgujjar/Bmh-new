import mongoose from "mongoose";

// --- SEO Schema (Sub-document) ---
const seoSchema = new mongoose.Schema(
  {
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: [{ type: String }],
    schemaMarkup: { type: Object }, // JSON-LD / Schema.org structured data
  },
  { _id: false } // prevent extra _id for sub-doc
);

// --- Main Blog Schema ---
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    
    image: {
      type: String,
      default: "",
    },

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

    // ✅ SEO Object
    seo: seoSchema,
  },
  { 
    timestamps: true // Creates 'createdAt' and 'updatedAt' automatically
  }
);

// Model export
export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);