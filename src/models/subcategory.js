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
      enum: ["digital-marketing", "web-development", "app-development"], 
    },
    icon: { type: String, required: true },
    topSection: {
      backgroundImage: String,
      heading: String,
      description: String,
    },
    middleSection: {
      description1: String, 
      image1: String,      
      image2: String,      
      description2: String, 
    },
    keywordsSection: keywordSchema,
    cta1: {
      heading: String,
      description: String,
    },
    cta2: {
      heading: String,
      description: String,
    },
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
