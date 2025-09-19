// Packages
const jwt = require("jsonwebtoken");

// JWT scerate key
const jwt_key =
  "36c5f515e773048ddb6ae7df26b407b4f683ca3ac5e68ec640c262154c0573d269fb907b0e559571a0be6db01450bd3f84cc689fb9e1f250ddb9b43e3ed454d8";

// Functions
const checkAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }

  try {
    const decoded = jwt.verify(token, jwt_key);
    req.user = { username: decoded.username, role: decoded.role };
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

const checkAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authenticated",
    });
  }

  try {
    const decoded = jwt.verify(token, jwt_key);
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = { checkAuth, checkAdmin };
