import { User, ActivityLog } from '../models/index.js';

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { role, permissions } = req.body;
    const { id } = req.params;

    if (!['Super Admin', 'Admin', 'User'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role value' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent changing own role or super admin role
    if (user._id.toString() === req.user?._id.toString()) {
      return res.status(400).json({ message: 'You cannot change your own role' });
    }

    const oldRole = user.role;
    user.role = role;
    if (permissions) {
      user.permissions = permissions;
    }
    await user.save();

    // Log Activity
    await ActivityLog.create({
      userId: req.user?._id,
      userName: req.user?.name || 'System',
      action: 'UPDATE_USER_ROLE',
      details: `Changed role of user ${user.email} from ${oldRole} to ${role}`
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      permissions: user.permissions
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'Super Admin') {
      return res.status(400).json({ message: 'Cannot delete the Super Admin user' });
    }

    await user.deleteOne();

    await ActivityLog.create({
      userId: req.user?._id,
      userName: req.user?.name || 'System',
      action: 'DELETE_USER',
      details: `Deleted user: ${user.email}`
    });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
