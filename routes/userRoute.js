const express = require("express");
const {
  signup,
  logout,
  login,
  forgotPassword,
  resetPassword,
  me
} = require("../controllers/userController.js");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();

router.route("/signup").post(signup);
router.route("/logout").get(isAuthenticated, logout);
router.route("/me").get(isAuthenticated, me);
router.route("/login").post(login);
router.route("/forgot").post(forgotPassword);
router.route("/reset/:token").put(resetPassword);

module.exports = router;
