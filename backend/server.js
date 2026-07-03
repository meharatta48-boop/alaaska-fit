import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { protect } from './middleware/authMiddleware.js';
import { restrictTo } from './middleware/roleMiddleware.js';

// Controller imports
import { register, login, refreshToken, logout, getMe } from './controllers/authController.js';
import { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct } from './controllers/productController.js';
import { getQuotes, createQuote, updateQuoteStatus, deleteQuote } from './controllers/quoteController.js';
import { getBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } from './controllers/blogController.js';
import { getConfig, updateConfig, getAllConfigs } from './controllers/configController.js';
import { getMedia, uploadMedia, deleteMedia } from './controllers/mediaController.js';
import { getDashboardAnalytics } from './controllers/analyticsController.js';
import { getUsers, updateUserRole, deleteUser } from './controllers/userController.js';
import { getContacts, createContact, updateContactStatus, deleteContact, getNewsletters, createNewsletter, deleteNewsletter } from './controllers/leadController.js';
import { getApplications, submitApplication, updateApplicationStatus, deleteApplication } from './controllers/careerController.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Security Headers
app.use(helmet());

// CORS config
const ALLOWED_ORIGINS = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:5173',
  'http://localhost:5174',
];
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, mobile apps) or whitelisted origins
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: Origin ${origin} not allowed`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Parsing Middlewares (supporting base64 image uploads)
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(cookieParser());

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // limit each IP to 300 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', apiLimiter);

// --- API ROUTES ---

// 1. Authentication Routes
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.post('/api/auth/refresh', refreshToken);
app.post('/api/auth/logout', logout);
app.get('/api/auth/me', protect, getMe);

// 2. Product Routes
app.get('/api/products', getProducts);
app.get('/api/products/:slug', getProductBySlug);
app.post('/api/products', protect, restrictTo('admin', 'editor'), createProduct);
app.put('/api/products/:id', protect, restrictTo('admin', 'editor'), updateProduct);
app.delete('/api/products/:id', protect, restrictTo('admin', 'editor'), deleteProduct);

// 3. Quote / Lead Routes
app.post('/api/quotes', createQuote);
app.get('/api/quotes', protect, restrictTo('admin'), getQuotes);
app.put('/api/quotes/:id', protect, restrictTo('admin'), updateQuoteStatus);
app.delete('/api/quotes/:id', protect, restrictTo('admin'), deleteQuote);

// New Inquiries & Contact & Newsletter Routes
app.post('/api/contacts', createContact);
app.get('/api/contacts', protect, restrictTo('admin'), getContacts);
app.put('/api/contacts/:id', protect, restrictTo('admin'), updateContactStatus);
app.delete('/api/contacts/:id', protect, restrictTo('admin'), deleteContact);

app.post('/api/newsletters', createNewsletter);
app.get('/api/newsletters', protect, restrictTo('admin'), getNewsletters);
app.delete('/api/newsletters/:id', protect, restrictTo('admin'), deleteNewsletter);

// Careers / Job Applications Routes
app.post('/api/careers', submitApplication);
app.get('/api/careers', protect, restrictTo('admin'), getApplications);
app.put('/api/careers/:id', protect, restrictTo('admin'), updateApplicationStatus);
app.delete('/api/careers/:id', protect, restrictTo('admin'), deleteApplication);

// 4. CMS Blog Routes
app.get('/api/blogs', getBlogs);
app.get('/api/blogs/:slug', getBlogBySlug);
app.post('/api/blogs', protect, restrictTo('admin', 'editor', 'content-manager'), createBlog);
app.put('/api/blogs/:id', protect, restrictTo('admin', 'editor', 'content-manager'), updateBlog);
app.delete('/api/blogs/:id', protect, restrictTo('admin', 'editor', 'content-manager'), deleteBlog);

// 5. Config / Homepage Builder Routes
app.get('/api/config', getAllConfigs);
app.get('/api/config/:key', getConfig);
app.put('/api/config/:key', protect, restrictTo('admin'), updateConfig);

// 6. Media Library Routes
app.get('/api/media', protect, restrictTo('admin', 'editor'), getMedia);
app.post('/api/media', protect, restrictTo('admin', 'editor'), uploadMedia);
app.delete('/api/media/:id', protect, restrictTo('admin', 'editor'), deleteMedia);

// 7. Dashboard Analytics Route
app.get('/api/analytics', protect, restrictTo('admin'), getDashboardAnalytics);

// 8. User Management Routes
app.get('/api/users', protect, restrictTo('admin'), getUsers);
app.put('/api/users/:id/role', protect, restrictTo('super-admin', 'admin'), updateUserRole);
app.delete('/api/users/:id', protect, restrictTo('super-admin', 'admin'), deleteUser);

// Fallback Route & Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
