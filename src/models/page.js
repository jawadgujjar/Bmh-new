import mongoose from "mongoose";

/* ================================
   CTA Reference Schema
================================ */
const ctaRefSchema = new mongoose.Schema(
  {
    ctaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CTA",
      required: [true, "CTA ID is required if CTA object exists"]
    },
    buttonVariant: {
      type: String,
      default: "primary"
    }
  },
  { _id: false }
);

/* ================================
   FAQ Schema
================================ */
const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true
    },
    answer: {
      type: String,
      required: true,
      trim: true
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

/* ================================
   Description Item Schema (for description-and-form layout)
================================ */
const descriptionItemSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true
    },
    icon: {
      type: String,
      default: ""
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { _id: false }
);

/* ================================
   Section Schema
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
        "description-and-form"   // ✅ NEW LAYOUT
      ],
      default: "description-only"
    },

    heading: { type: String, default: "" },
    
    // For backward compatibility - single description
    description: { type: String, default: "" },

    image: { 
      type: String, 
      default: "" 
    },

    // ✅ For description-and-form layout - multiple descriptions with icons
    descriptions: {
      type: [descriptionItemSchema],
      default: []
    },

    // ✅ For description-and-form layout - single icon (backward compatibility)
    icon: {
      type: String,
      default: ""
    },

    cta: {
      type: ctaRefSchema,
      required: false,
      default: null
    },

    order: { type: Number, default: 0 }
  },
  { _id: false }
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
      default: null
    }
  },
  { _id: false }
);

/* ================================
   SEO Schema
================================ */
const seoSchema = new mongoose.Schema(
  {
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    metaKeywords: [{ type: String }],
    schemaMarkup: { type: Object, default: {} },
  },
  { _id: false }
);

/* ================================
   Main Page Schema
================================ */
const pageSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: [true, "Title is required"],
      trim: true 
    },

    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true
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

    subcatpagedescr: { type: String, default: "" },

    /* 🔥 Hero Section */
    topSection: {
      type: topSectionSchema,
      default: () => ({})
    },

    /* 🔥 Dynamic Sections */
    sections: {
      type: [sectionSchema],
      default: [],
      validate: {
        validator: function(sectionsArr) {
          if (!sectionsArr || sectionsArr.length === 0) return true;

          return sectionsArr.every(section => {

            // image layouts validation
            if (
              section.layoutType === "image-left" ||
              section.layoutType === "image-right"
            ) {
              return typeof section.image === "string" && section.image.trim().length > 0;
            }

            // description-and-form validation
            if (section.layoutType === "description-and-form") {
              // Check if either single description or multiple descriptions exist
              const hasSingleDescription = section.description && section.description.trim().length > 0;
              const hasMultipleDescriptions = section.descriptions && section.descriptions.length > 0;
              
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
          "Invalid section configuration. Image layouts need image. Description-and-form needs heading & at least one description."
      }
    },

    /* ✅ FAQs */
    faqs: {
      type: [faqSchema],
      default: []
    },

    /* 🔥 SEO */
    seo: {
      type: seoSchema,
      default: () => ({})
    },

    isActive: {
      type: Boolean,
      default: true
    },

    createdBy: {
      type: String,
      default: "admin"
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

/* ================================
   Indexes
================================ */
pageSchema.index({ slug: 1 });
pageSchema.index({ category: 1, isActive: 1 });
pageSchema.index({ title: "text", "sections.heading": "text", "faqs.question": "text" });

/* ================================
   Auto Slug
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
pageSchema.virtual("url").get(function() {
  return `/${this.category}/${this.slug}`;
});

pageSchema.virtual("sectionsCount").get(function() {
  return this.sections?.length || 0;
});

pageSchema.virtual("faqCount").get(function() {
  return this.faqs?.length || 0;
});

export default mongoose.models.Page || 
  mongoose.model("Page", pageSchema);