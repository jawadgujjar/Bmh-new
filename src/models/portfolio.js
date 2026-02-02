import mongoose from "mongoose";

// ✅ SEO Subschema
const seoSchema = new mongoose.Schema(
  {
    metaTitle: { type: String },
    metaDescription: { type: String },
    metaKeywords: [{ type: String }],
    schemaMarkup: { type: Object },
  },
  { _id: false }
);

const portfolioPageSchema = new mongoose.Schema(
  {
    header: {
      image: { type: String },
      title: { type: String, required: true },
      description: { type: String, required: true },
    },

    middleSection: {
      description1: { type: String },
      image1: { type: String },
      image2: { type: String },
      description2: { type: String },
    },

    cta1: {
      heading: { type: String },
      description: { type: String },
    },

    webHighlights: [
      {
        type: String, // image/video URLs
      }
    ],

    cta2: {
      heading: { type: String },
      description: { type: String },
    },

    // ✅ SEO Added Here
    seo: seoSchema,
  },
  { _id: false }
);

const keywordSchema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      required: true,
      unique: true,
    },

    websites: [
      {
        link: { type: String, required: true },
        portfolioPage: portfolioPageSchema,
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Keyword ||
  mongoose.model("Keyword", keywordSchema);
