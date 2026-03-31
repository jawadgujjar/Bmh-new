import mongoose from "mongoose";

/* ================================
   CTA Reference Schema
================================ */
const ctaRefSchema = new mongoose.Schema(
  {
    ctaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CTA",
      required: [true, "CTA ID is required if CTA object exists"],
    },
    buttonVariant: {
      type: String,
      default: "primary",
    },
  },
  { _id: false },
);

/* ================================
   FAQ Schema
================================ */
const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false },
);

/* ================================
   Description Item Schema
================================ */
const descriptionItemSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
    },
    icon: {
      type: String,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
);

/* ================================
   Section Schema - FIXED & ROBUST
================================ */
const sectionSchema = new mongoose.Schema(
  {
    layoutType: {
      type: String,
      required: true,
      enum: [
        "image-left",
        "image-right",
        "description-only",
        "description-and-form",
      ],
      default: "description-only",
    },

    heading: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },

    // 🔥 Inline Button Fields (Fixed for persistence)
    showButton: {
      type: Boolean,
      default: false,
    },
    buttonText: {
      type: String,
      default: "Get a Quote",
      trim: true,
    },
    buttonLink: {
      type: String,
      default: "/getaquote",
      trim: true,
    },
    buttonVariant: {
      type: String,
      enum: ["primary", "secondary", "outline", "link", "ghost"],
      default: "primary",
    },

    descriptions: {
      type: [descriptionItemSchema],
      default: [],
    },

    icon: { type: String, default: "" },

    // Global CTA Ref
    cta: {
      type: ctaRefSchema,
      required: false,
      default: null,
    },

    order: { type: Number, default: 0 },
  },
  {
    _id: false,
    minimize: false, // Ensures empty fields and defaults are saved
  },
);

/* ================================
   Top Section (Hero)
================================ */
const topSectionSchema = new mongoose.Schema(
  {
    backgroundImage: { type: String, default: "" },
    heading: { type: String, default: "" },
    description: { type: String, default: "" },
    cta: {
      type: ctaRefSchema,
      required: false,
      default: null,
    },
  },
  {
    _id: false,
    minimize: false,
  },
);

/* ================================
   SEO Schema
=============================== */
const seoSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords: [{ type: String }],
    schemaMarkup: { type: Object, default: {} },
  },
  { _id: false },
);

/* ================================
   Main Page Schema
================================ */
const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["digital-marketing", "web-development", "app-development"],
    },

    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },

    keywordstitle: {
      type: String,
      default: "",
      trim: true,
    },
    subcatpagedescr: { type: String, default: "" },

    topSection: {
      type: topSectionSchema,
      default: () => ({}),
    },

    sections: {
      type: [sectionSchema],
      default: [],
      validate: {
        validator: function (sectionsArr) {
          if (!sectionsArr || sectionsArr.length === 0) return true;

          return sectionsArr.every((section) => {
            // Validation for image layouts
            if (
              section.layoutType === "image-left" ||
              section.layoutType === "image-right"
            ) {
              return (
                typeof section.image === "string" &&
                section.image.trim().length > 0
              );
            }

            // Validation for description-and-form
            if (section.layoutType === "description-and-form") {
              const hasSingleDescription =
                section.description && section.description.trim().length > 0;
              const hasMultipleDescriptions =
                section.descriptions && section.descriptions.length > 0;

              return (
                typeof section.heading === "string" &&
                section.heading.trim().length > 0 &&
                (hasSingleDescription || hasMultipleDescriptions)
              );
            }

            return true;
          });
        },
        message:
          "Invalid section configuration. Image layouts need image. Description-and-form needs heading & at least one description.",
      },
    },

    faqs: {
      type: [faqSchema],
      default: [],
    },

    seo: {
      type: seoSchema,
      default: () => ({}),
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    minimize: false, // Key for root level too
  },
);

/* ================================
   Indexes
================================ */
pageSchema.index({ slug: 1 });
pageSchema.index({ category: 1, isActive: 1 });
pageSchema.index({
  title: "text",
  "sections.heading": "text",
  "faqs.question": "text",
});

/* ================================
   Auto Slug Logic
================================ */
pageSchema.pre("save", function (next) {
  if (!this.slug || this.slug.trim() === "") {
    this.slug = this.title;
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

/* ================================
   Virtuals
================================ */
pageSchema.virtual("url").get(function () {
  return `/${this.category}/${this.slug}`;
});

pageSchema.virtual("sectionsCount").get(function () {
  return this.sections?.length || 0;
});

pageSchema.virtual("faqCount").get(function () {
  return this.faqs?.length || 0;
});

// Avoid OverwriteModelError
export default mongoose.models.Page || mongoose.model("Page", pageSchema);
