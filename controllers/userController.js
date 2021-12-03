const User = require("../models/userModel");
const crypto = require("crypto");
const sendToken = require("../utils/sendToken");
const sendEmail = require("../utils/sendEmail");

exports.signup = async (req, res) => {
  try {
    let user = await User.create(req.body);
    sendToken(user, 200, res);
  } catch (err) {
    const message =
      err.code === 11000
        ? `${Object.values(err.keyValue)[0]} already exists.`
        : err.message;
    res.status(500).json({ success: false, message });
  }
};
exports.login = async (req, res) => {
  try {
    const { ID, password } = req.body;
    const filt = ID.includes("@") ? { email: ID } : { phone: ID };
    const user = await User.findOne(filt).select("+password");
    if (user) {
      const isPasMatched = await user.comparePassword(password);
      if (isPasMatched) sendToken(user, 200, res);
      else
        return res
          .status(422)
          .json({ success: false, message: "No such user found." });
    } else {
      return res
        .status(422)
        .json({ success: false, message: "No such user found." });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.logout = async (req, res) => {
  res.status(200).json({ success: true, role: req.user.role });
};
exports.me = async (req, res) => {
  res.status(200).json({ success: true, user: req.user });
};

// Forgot Password
exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ phone: req.body.phone });

  if (!user) {
    return res
      .status(422)
      .json({ success: false, message: "No such user found." });
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save();

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/           ${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(500).json({ success: false, message: err.message });
  }
};

// Reset Password
exports.resetPassword = async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid Link OR Link Expired." });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Password and Confirmed Password do not match.",
    });
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
};
