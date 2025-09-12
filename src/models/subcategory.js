import mongoose from "mongoose";

const keywordSchema = new mongoose.Schema({
  heading: String,
  description: String,
  keywords: [String],
  relatedHeading: [String], // Changed to array
  relatedDescription: [String], // Changed to array
});

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        return this.name
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w\-]+/g, "")
          .replace(/\-\-+/g, "-")
          .replace(/^-+/, "")
          .replace(/-+$/, "");
      },
    },
    category: {
      type: String,
      required: true,
      enum: ["digital-marketing", "web-development", "app-development"], // Restrict to valid categories
    },
    icon: { type: String, required: true },
    topSection: {
      backgroundImage: String,
      heading: String,
      description: String,
    },
    middleSection: {
      description1: String, // First description
      image1: String,      // First image
      image2: String,      // Second image
      description2: String, // Second description
    },
    keywordsSection: keywordSchema,
  },
  { timestamps: true }
);

// Pre-save hook to ensure slug is generated and lowercase
subCategorySchema.pre("save", function (next) {
  if (!this.slug || this.slug.trim() === "") {
    this.slug = this.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  }
  this.slug = this.slug.toLowerCase();
  next();
});

export default mongoose.models.SubCategory ||
  mongoose.model("SubCategory", subCategorySchema);
