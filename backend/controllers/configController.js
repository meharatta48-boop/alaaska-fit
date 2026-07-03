import { Config, ActivityLog } from '../models/index.js';

export const getConfig = async (req, res, next) => {
  try {
    const { key } = req.params;
    const config = await Config.findOne({ key });
    if (!config) {
      return res.status(404).json({ message: `Config key '${key}' not found` });
    }
    res.json(config.value);
  } catch (error) {
    next(error);
  }
};

export const updateConfig = async (req, res, next) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    let config = await Config.findOne({ key });
    if (config) {
      config.value = value;
      await config.save();
    } else {
      config = await Config.create({ key, value });
    }

    // Write log
    await ActivityLog.create({
      userId: req.user?._id,
      userName: req.user?.name || 'System',
      action: 'UPDATE_CONFIG',
      details: `Updated system configuration key: ${key}`
    });

    res.json(config.value);
  } catch (error) {
    next(error);
  }
};

// Quick helper to fetch all configurations for client startup
export const getAllConfigs = async (req, res, next) => {
  try {
    const configs = await Config.find();
    const configMap = {};
    configs.forEach(c => {
      configMap[c.key] = c.value;
    });
    res.json(configMap);
  } catch (error) {
    next(error);
  }
};
