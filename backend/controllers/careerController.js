import { CareerSubmission, ActivityLog } from '../models/index.js';
import { z } from 'zod';

const careerValidationSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  phone: z.string().trim().optional(),
  position: z.string().trim().min(2),
  resumeUrl: z.string().trim().optional(),
  coverLetter: z.string().trim().optional()
});

export const getApplications = async (req, res, next) => {
  try {
    const applications = await CareerSubmission.find().sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

export const submitApplication = async (req, res, next) => {
  try {
    const validated = careerValidationSchema.parse(req.body);
    const application = await CareerSubmission.create(validated);

    await ActivityLog.create({
      action: 'CAREER_SUBMIT',
      details: `New Job Application from ${application.name} for position: ${application.position}`
    });

    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'reviewed', 'shortlisted', 'rejected', 'archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await CareerSubmission.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    const oldStatus = application.status;
    application.status = status;
    await application.save();

    await ActivityLog.create({
      userId: req.user?._id,
      userName: req.user?.name || 'System',
      action: 'UPDATE_CAREER_STATUS',
      details: `Updated career application status of ${application.name} from ${oldStatus} to ${status}`
    });

    res.json(application);
  } catch (error) {
    next(error);
  }
};

export const deleteApplication = async (req, res, next) => {
  try {
    const application = await CareerSubmission.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    await application.deleteOne();

    await ActivityLog.create({
      userId: req.user?._id,
      userName: req.user?.name || 'System',
      action: 'DELETE_APPLICATION',
      details: `Deleted job application of ${application.name}`
    });

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    next(error);
  }
};
