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
   Section Schema
================================ */
const sectionSchema = new mongoose.Schema(
  {
    layoutType: {
      type: String,
      required: true,
      enum: ["image-left", "image-right", "description-only"],
      default: "description-only"
    },
    heading: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { 
      type: String, 
      default: "" 
      // Individual field validation ko array level par handle karenge for better reliability
    },
    // cta ko required: false rakha hai taake empty hone par error na de
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
   Top Section (Hero) Schema
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
   Main SubCategory Schema
================================ */
const subCategorySchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Name is required"],
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
      enum: {
        values: ["digital-marketing", "web-development", "app-development"],
        message: "{VALUE} is not a valid category"
      },
    },
    icon: { 
      type: String, 
      required: [true, "Icon is required"],
      default: "default-icon.png" 
    },
    topSection: {
      type: topSectionSchema,
      default: () => ({})
    },
    // 🔥 Dynamic Sections Array with Robust Validation
    sections: {
      type: [sectionSchema],
      default: [],
      validate: {
        validator: function(sectionsArr) {
          // Agar array khali hai toh valid hai
          if (!sectionsArr || sectionsArr.length === 0) return true;
          
          return sectionsArr.every(section => {
            // Sirf image layouts check karo
            if (section.layoutType === "image-left" || section.layoutType === "image-right") {
              // Check if image exists and is not just whitespace
              return typeof section.image === 'string' && section.image.trim().length > 0;
            }
            return true;
          });
        },
        message: "All image-left and image-right sections must have a valid image URL"
      }
    },
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

// Indexes
subCategorySchema.index({ slug: 1 });
subCategorySchema.index({ category: 1, isActive: 1 });
subCategorySchema.index({ name: "text", "sections.heading": "text" });

// Auto-generate slug
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

// Virtuals
subCategorySchema.virtual("url").get(function() {
  return `/${this.category}/${this.slug}`;
});

subCategorySchema.virtual("sectionsCount").get(function() {
  return this.sections?.length || 0;
});

export default mongoose.models.SubCategory || 
  mongoose.model("SubCategory", subCategorySchema);