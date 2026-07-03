const ROLES = {
  'Super Admin': 3,
  'Admin': 2,
  'User': 1
};

export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const userRole = req.user.role;
    const hasRole = allowedRoles.includes(userRole) || allowedRoles.some(role => {
      // Allow higher hierarchy roles to access lower role pathways (e.g. admin can do editor things)
      return ROLES[userRole] >= ROLES[role];
    });

    if (!hasRole) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
};

export const checkPermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Super Admin has absolute permission
    if (req.user.role === 'Super Admin') {
      return next();
    }

    if (!req.user.permissions || !req.user.permissions.includes(permission)) {
      return res.status(403).json({ message: `Forbidden: Missing permission [${permission}]` });
    }

    next();
  };
};
