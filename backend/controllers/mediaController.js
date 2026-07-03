import mongoose from 'mongoose';
import { ActivityLog } from '../models/index.js';

// Define Media Schema locally or use dynamic compiling to avoid model collision
const MediaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, required: true }, // e.g. 'image/png', 'video/mp4'
  size: { type: Number, default: 0 },
  folder: { type: String, default: 'General' },
}, { timestamps: true });

// Check if model already compiled, otherwise compile
const Media = mongoose.models.Media || mongoose.model('Media', MediaSchema);

export const getMedia = async (req, res, next) => {
  try {
    const { folder } = req.query;
    let query = {};
    if (folder) {
      query.folder = folder;
    }
    const mediaItems = await Media.find(query).sort({ createdAt: -1 });
    res.json(mediaItems);
  } catch (error) {
    next(error);
  }
};

export const uploadMedia = async (req, res, next) => {
  try {
    const { name, type, size, folder, base64Data } = req.body;

    if (!name || !base64Data) {
      return res.status(400).json({ message: 'Missing name or file data' });
    }

    // Cloudinary upload placeholder / base64 fallback
    let url = base64Data;
    
    // In production, if Cloudinary credentials are set up, we would upload to Cloudinary:
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
      console.log('Cloudinary credentials found. Triggering mock Cloudinary upload URL.');
      // Simulating external URL to represent clean performance
    }

    const mediaItem = await Media.create({
      name,
      url,
      type: type || 'image/png',
      size: size || 0,
      folder: folder || 'General'
    });

    await ActivityLog.create({
      userId: req.user?._id,
      userName: req.user?.name || 'System',
      action: 'UPLOAD_MEDIA',
      details: `Uploaded media: ${name} to folder ${folder || 'General'}`
    });

    res.status(201).json(mediaItem);
  } catch (error) {
    next(error);
  }
};

export const deleteMedia = async (req, res, next) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    await media.deleteOne();

    await ActivityLog.create({
      userId: req.user?._id,
      userName: req.user?.name || 'System',
      action: 'DELETE_MEDIA',
      details: `Deleted media file: ${media.name}`
    });

    res.json({ message: 'Media deleted successfully' });
  } catch (error) {
    next(error);
  }
};
