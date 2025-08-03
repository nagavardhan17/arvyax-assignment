const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("🔐 Received token:", authHeader); // ADD THIS LINE

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // adds user ID to req.user
    console.log("✅ Decoded user:", decoded); // ADD THIS LINE
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err); // ADD THIS LINE
    res.status(403).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
