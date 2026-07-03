import { Quote, ActivityLog } from '../models/index.js';
import { z } from 'zod';

const quoteValidationSchema = z.object({
  productType: z.string(),
  quantity: z.number().min(1),
  fabric: z.string().optional(),
  gsm: z.string().optional(),
  colors: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  printing: z.string().optional(),
  embroidery: z.string().optional(),
  packaging: z.string().optional(),
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  clientPhone: z.string().optional(),
  message: z.string().optional()
});

export const getQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.json(quotes);
  } catch (error) {
    next(error);
  }
};

export const createQuote = async (req, res, next) => {
  try {
    const validated = quoteValidationSchema.parse(req.body);
    const quote = await Quote.create(validated);

    // Mock Dashboard notification log
    await ActivityLog.create({
      action: 'QUOTE_SUBMIT',
      details: `New Quote Inquiry from ${quote.clientName} for ${quote.quantity}x ${quote.productType}`
    });

    console.log(`[NOTIFY] Lead created for ${quote.clientName}. WhatsApp/Email trigger placeholder.`);

    res.status(201).json(quote);
  } catch (error) {
    next(error);
  }
};

export const updateQuoteStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['pending', 'reviewed', 'contacted', 'closed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    const oldStatus = quote.status;
    quote.status = status;
    await quote.save();

    // Log Activity
    await ActivityLog.create({
      userId: req.user?._id,
      userName: req.user?.name || 'System',
      action: 'UPDATE_QUOTE_STATUS',
      details: `Updated quote status of ${quote.clientName} from ${oldStatus} to ${status}`
    });

    res.json(quote);
  } catch (error) {
    next(error);
  }
};

export const deleteQuote = async (req, res, next) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: 'Quote not found' });
    }

    await quote.deleteOne();

    await ActivityLog.create({
      userId: req.user?._id,
      userName: req.user?.name || 'System',
      action: 'DELETE_QUOTE',
      details: `Deleted quote inquiry of ${quote.clientName}`
    });

    res.json({ message: 'Quote inquiry deleted' });
  } catch (error) {
    next(error);
  }
};
