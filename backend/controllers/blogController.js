import { BlogPost, ActivityLog } from '../models/index.js';
import { z } from 'zod';

const blogValidationSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  content: z.string().min(10),
  featuredImage: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published']).optional(),
  publishDate: z.string().optional(), // ISO string or Date
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional()
});

export const getBlogs = async (req, res, next) => {
  try {
    const { status, search, category } = req.query;
    let query = {};

    // For clients, only show published blogs
    if (status) {
      query.status = status;
    }

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    const blogs = await BlogPost.find(query).sort({ publishDate: -1, createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await BlogPost.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blog);
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    const validated = blogValidationSchema.parse(req.body);
    
    const existing = await BlogPost.findOne({ slug: validated.slug });
    if (existing) {
      return res.status(400).json({ message: 'Blog slug already exists' });
    }

    const blog = await BlogPost.create({
      ...validated,
      author: req.user?.name || validated.author || 'Admin'
    });

    await ActivityLog.create({
      userId: req.user?._id,
      userName: req.user?.name || 'System',
      action: 'CREATE_BLOG',
      details: `Created blog article: ${blog.title}`
    });

    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const validated = blogValidationSchema.parse(req.body);
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    if (validated.slug !== blog.slug) {
      const existing = await BlogPost.findOne({ slug: validated.slug });
      if (existing) {
        return res.status(400).json({ message: 'Blog slug already exists' });
      }
    }

    Object.assign(blog, validated);
    await blog.save();

    await ActivityLog.create({
      userId: req.user?._id,
      userName: req.user?.name || 'System',
      action: 'UPDATE_BLOG',
      details: `Updated blog article: ${blog.title}`
    });

    res.json(blog);
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    await blog.deleteOne();

    await ActivityLog.create({
      userId: req.user?._id,
      userName: req.user?.name || 'System',
      action: 'DELETE_BLOG',
      details: `Deleted blog article: ${blog.title}`
    });

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    next(error);
  }
};
