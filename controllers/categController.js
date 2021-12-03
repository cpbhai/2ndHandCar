const Category = require("../models/categoryModel");

exports.get = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.add = async (req, res) => {
  try {
    await Category.create(req.body);
    res.status(200).json({ success: true, message: "Added Successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.update = async (req, res) => {
  try {
    await Category.findByIdAndUpdate(req.params.id, { name: req.body.name });
    res.status(200).json({ success: true, message: "Updated Successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.remove = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted Successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
