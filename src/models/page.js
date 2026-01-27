import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      default: function () {
        return this.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w\-]+/g, "")
          .replace(/\-\-+/g, "-")
          .replace(/^-+/, "")
          .replace(/-+$/, "");
      },
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    subcatpagedescr: { type: String }, // <-- New field

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
    cta1: {
      heading: String,
      description: String,
    },
    cta2: {
      heading: String,
      description: String,
    },
  },
  { timestamps: true },
);

// Pre-save hook to ensure slug is lowercase
pageSchema.pre("save", function (next) {
  if (!this.slug || this.slug.trim() === "") {
    this.slug = this.title
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

export default mongoose.models.Page || mongoose.model("Page", pageSchema);
