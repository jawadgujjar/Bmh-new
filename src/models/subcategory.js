import mongoose from "mongoose";

const keywordSchema = new mongoose.Schema(
  {
    heading: String,
    description: String,
    keywords: [String],
    relatedHeading: [String],
    relatedDescription: [String],
  },
  { _id: false }
);

// ✅ SEO Schema
const seoSchema = new mongoose.Schema(
  {
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],
    schemaMarkup: Object,
  },
  { _id: false }
);

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    slug: {
      type: String,
      required: true,
      unique: true,
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

    // ✅ SEO
    seo: seoSchema,
  },
  { timestamps: true }
);

// ✅ Auto slug normalize
subCategorySchema.pre("save", function (next) {
  if (!this.slug || this.slug.trim() === "") {
    this.slug = this.name;
  }

  this.slug = this.slug
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

  next();
});

export default mongoose.models.SubCategory ||
  mongoose.model("SubCategory", subCategorySchema);
