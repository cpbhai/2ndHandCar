const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || token === "undefined") {
    return res.status(401).json({
      success: false,
      message: "Please, Login First.",
    });
  }
  let decodedData = null;
  try {
    decodedData = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Please, Refresh Page Again.",
    });
  }

  req.user = await User.findById(decodedData.id);
  next();
};

exports.allowedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ success: false, message: "You are not allowed." });
    }
    next();
  };
};
