import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['Super Admin', 'Admin', 'User'],
    default: 'User'
  },
  permissions: { type: [String], default: [] }
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Product Schema
const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  category: { type: String, required: true },
  moq: { type: Number, default: 100 },
  fabric: { type: String, default: '100% Premium Cotton' },
  gsm: { type: String, default: '240 GSM' },
  printing: { type: String, default: 'Screen Print' },
  embroidery: { type: String, default: 'Flat Embroidery' },
  techPackUrl: { type: String, default: '' },
  images: { type: [String], default: [] },
  videoUrl: { type: String, default: '' },
  colors: { type: [String], default: [] }, // hex codes or names
  sizes: { type: [String], default: [] },
  isFeatured: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'draft', 'archived'], default: 'active' },
  priceVisibility: { type: String, enum: ['public', 'hidden', 'registered_only'], default: 'hidden' },
  variants: [{
    name: String,
    fabric: String,
    gsm: String,
    color: String,
    size: String,
    moq: Number
  }]
}, { timestamps: true });

ProductSchema.index({ slug: 1, status: 1 });
ProductSchema.index({ category: 1, isFeatured: 1, status: 1 });
ProductSchema.index({ createdAt: -1 });

// Quote/Inquiry Schema
const QuoteSchema = new mongoose.Schema({
  productType: { type: String, required: true },
  quantity: { type: Number, required: true },
  fabric: { type: String },
  gsm: { type: String },
  colors: { type: [String], default: [] },
  sizes: { type: [String], default: [] },
  printing: { type: String },
  embroidery: { type: String },
  packaging: { type: String },
  clientName: { type: String, required: true },
  clientEmail: { type: String, required: true },
  clientPhone: { type: String },
  message: { type: String },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'contacted', 'closed'],
    default: 'pending'
  }
}, { timestamps: true });

// Contact Message Schema
const ContactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: 'General Inquiry' },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'contacted', 'closed'],
    default: 'pending'
  }
}, { timestamps: true });

// Career Submission Schema
const CareerSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  position: { type: String, required: true },
  resumeUrl: { type: String }, // base64 or upload path
  coverLetter: { type: String },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'archived'],
    default: 'pending'
  }
}, { timestamps: true });

// Newsletter Subscription Schema
const NewsletterSubscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ['active', 'unsubscribed'],
    default: 'active'
  }
}, { timestamps: true });

// Blog Post Schema
const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true }, // Markdown or rich HTML
  featuredImage: { type: String },
  author: { type: String, default: 'Admin' },
  category: { type: String },
  tags: { type: [String], default: [] },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  publishDate: { type: Date, default: Date.now },
  seoTitle: { type: String },
  seoDescription: { type: String }
}, { timestamps: true });

BlogPostSchema.index({ slug: 1, status: 1 });
BlogPostSchema.index({ publishDate: -1, createdAt: -1 });

// Config Schema (For Homepage Builder & General Settings)
const ConfigSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g. 'homepage' or 'settings'
  value: { type: mongoose.Schema.Types.Mixed, required: true }
}, { timestamps: true });

// Activity Log Schema
const ActivityLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: { type: String },
  action: { type: String, required: true },
  details: { type: String },
  timestamp: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);
const Quote = mongoose.model('Quote', QuoteSchema);
const ContactMessage = mongoose.model('ContactMessage', ContactMessageSchema);
const CareerSubmission = mongoose.model('CareerSubmission', CareerSubmissionSchema);
const NewsletterSubscription = mongoose.model('NewsletterSubscription', NewsletterSubscriptionSchema);
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);
const Config = mongoose.model('Config', ConfigSchema);
const ActivityLog = mongoose.model('ActivityLog', ActivityLogSchema);

export { User, Product, Quote, ContactMessage, CareerSubmission, NewsletterSubscription, BlogPost, Config, ActivityLog };
