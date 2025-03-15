const jwt = require('jsonwebtoken');
const BlacklistedToken = require('../Models/BlackListToken.Models');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers['x-auth-token'];
    if (!token) {
      throw new Error('No token provided');
    }
    const blacklisted = await BlacklistedToken.find({ token });
    if (blacklisted) {
      throw new Error('Token is blacklisted');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.find({ _id: decoded.userId });
    if (!req.user) {
      throw new Error('Invalid token');
    }
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = authenticate;