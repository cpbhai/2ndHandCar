const Post = require("../models/postModel");

exports.get = async (req, res) => {
  try {
    const category = await Post.findById(req.params.id);
    res.status(200).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.getAll = async (req, res) => {
  try {
    const categories = await Post.find();
    res.status(200).json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.add = async (req, res) => {
  try {
    req.body.postedBy = req.user._id;
    await Post.create(req.body);
    res.status(200).json({ success: true, message: "Your post is live now." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.update = async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, { name: req.body.name });
    res.status(200).json({ success: true, message: "Updated Successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.remove = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted Successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
