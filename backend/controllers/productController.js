import { Product, ActivityLog } from '../models/index.js';
import { z } from 'zod';

const productValidationSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  category: z.string(),
  moq: z.number().min(1),
  fabric: z.string(),
  gsm: z.string(),
  printing: z.string(),
  embroidery: z.string(),
  techPackUrl: z.string().optional(),
  images: z.array(z.string()),
  videoUrl: z.string().optional(),
  colors: z.array(z.string()),
  sizes: z.array(z.string()),
  isFeatured: z.boolean().optional(),
  status: z.enum(['active', 'draft', 'archived']).optional(),
  priceVisibility: z.enum(['public', 'hidden', 'registered_only']).optional(),
  variants: z.array(z.object({
    name: z.string().optional(),
    fabric: z.string().optional(),
    gsm: z.string().optional(),
    color: z.string().optional(),
    size: z.string().optional(),
    moq: z.number().optional()
  })).optional()
});

export const getProducts = async (req, res, next) => {
  try {
    const { category, search, featured, status } = req.query;
    let query = {};

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const validated = productValidationSchema.parse(req.body);
    
    // Check if slug unique
    const existing = await Product.findOne({ slug: validated.slug });
    if (existing) {
      return res.status(400).json({ message: 'Product slug already exists' });
    }

    const product = await Product.create(validated);

    // Activity Log
    await ActivityLog.create({
      userId: req.user?._id,
      userName: req.user?.name || 'System',
      action: 'CREATE_PRODUCT',
      details: `Created product: ${product.title} (${product.category})`
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const validated = productValidationSchema.parse(req.body);
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check slug clash if changed
    if (validated.slug !== product.slug) {
      const existing = await Product.findOne({ slug: validated.slug });
      if (existing) {
        return res.status(400).json({ message: 'Product slug already exists' });
      }
    }

    Object.assign(product, validated);
    await product.save();

    // Activity Log
    await ActivityLog.create({
      userId: req.user?._id,
      userName: req.user?.name || 'System',
      action: 'UPDATE_PRODUCT',
      details: `Updated product: ${product.title}`
    });

    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();

    // Activity Log
    await ActivityLog.create({
      userId: req.user?._id,
      userName: req.user?.name || 'System',
      action: 'DELETE_PRODUCT',
      details: `Deleted product ID: ${req.params.id} (${product.title})`
    });

    res.json({ message: 'Product removed successfully' });
  } catch (error) {
    next(error);
  }
};
