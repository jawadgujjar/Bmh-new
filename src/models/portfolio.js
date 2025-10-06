import mongoose from "mongoose";

const portfolioPageSchema = new mongoose.Schema(
  {
    header: {
      image: { type: String  },
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
        link: { type: String, required: true }, // actual website URL
        portfolioPage: portfolioPageSchema,     // linked portfolio data
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Keyword ||
  mongoose.model("Keyword", keywordSchema);
