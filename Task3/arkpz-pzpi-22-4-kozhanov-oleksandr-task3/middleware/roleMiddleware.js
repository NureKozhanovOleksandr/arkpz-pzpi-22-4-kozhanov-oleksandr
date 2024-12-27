/**
 * Middleware to check the user role
 * @param {Array|string} roles - Allowed roles
 * @returns {Function} Middleware function
 */
module.exports = function(roles) {
  return function(req, res, next) {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};