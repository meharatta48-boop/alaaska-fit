import { ContactMessage, NewsletterSubscription, ActivityLog } from '../models/index.js';
import { z } from 'zod';

const contactValidationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(5)
});

const newsletterValidationSchema = z.object({
  email: z.string().email()
});

// Contact Messages CRUD
export const getContacts = async (req, res, next) => {
  try {
    const contacts = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const validated = contactValidationSchema.parse(req.body);
    const contact = await ContactMessage.create(validated);

    await ActivityLog.create({
      action: 'CONTACT_SUBMIT',
      details: `New Contact Message from ${contact.name} - ${contact.subject}`
    });

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContactStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['pending', 'reviewed', 'contacted', 'closed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const contact = await ContactMessage.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    const oldStatus = contact.status;
    contact.status = status;
    await contact.save();

    await ActivityLog.create({
      userId: req.user?._id,
      userName: req.user?.name || 'System',
      action: 'UPDATE_CONTACT_STATUS',
      details: `Updated contact status of ${contact.name} from ${oldStatus} to ${status}`
    });

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await ContactMessage.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    await contact.deleteOne();

    await ActivityLog.create({
      userId: req.user?._id,
      userName: req.user?.name || 'System',
      action: 'DELETE_CONTACT',
      details: `Deleted contact message of ${contact.name}`
    });

    res.json({ message: 'Contact message deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Newsletter Subscriptions CRUD
export const getNewsletters = async (req, res, next) => {
  try {
    const subscribers = await NewsletterSubscription.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    next(error);
  }
};

export const createNewsletter = async (req, res, next) => {
  try {
    const validated = newsletterValidationSchema.parse(req.body);
    
    // Find or create
    let subscriber = await NewsletterSubscription.findOne({ email: validated.email });
    if (subscriber) {
      if (subscriber.status === 'unsubscribed') {
        subscriber.status = 'active';
        await subscriber.save();
      } else {
        return res.status(400).json({ message: 'Email already subscribed' });
      }
    } else {
      subscriber = await NewsletterSubscription.create(validated);
    }

    await ActivityLog.create({
      action: 'NEWSLETTER_SUBSCRIBE',
      details: `New Newsletter Subscription: ${subscriber.email}`
    });

    res.status(201).json(subscriber);
  } catch (error) {
    next(error);
  }
};

export const deleteNewsletter = async (req, res, next) => {
  try {
    const subscriber = await NewsletterSubscription.findById(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ message: 'Subscriber not found' });
    }

    await subscriber.deleteOne();

    await ActivityLog.create({
      userId: req.user?._id,
      userName: req.user?.name || 'System',
      action: 'DELETE_SUBSCRIBER',
      details: `Removed newsletter subscription of ${subscriber.email}`
    });

    res.json({ message: 'Subscriber removed successfully' });
  } catch (error) {
    next(error);
  }
};
