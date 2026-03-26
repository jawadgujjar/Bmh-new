import mongoose from 'mongoose';

const NewsletterSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true, 
    trim: true, 
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  status: { 
    type: String, 
    enum: ['subscribed', 'unsubscribed'], 
    default: 'subscribed' 
  },
  subscribedAt: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

// Indexing for faster queries
NewsletterSchema.index({ email: 1 });

export default mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);