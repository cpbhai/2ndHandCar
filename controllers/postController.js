const Post = require("../models/postModel");
const cloudinary = require("cloudinary");
const Pagination = require("../utils/Pagination");

exports.get = async (req, res) => {
  try {
    const category = await Post.findById(req.params.id);
    res.status(200).json({ success: true, category });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
exports.getAll = async (req, res) => {
  let { keyword, category, low, high, page, sortBy } = req.query;
  if (page) page = Number(page);
  else page = 1;
  if (!sortBy) sortBy = "";
  let posts = [],
    totalPages = 1;
  try {
    if (category) posts = await Post.find({ category }).sort(sortBy);
    else posts = await Post.find().sort(sortBy);
    if (keyword) {
      const pattern = new RegExp(keyword, "i");
      posts = posts.filter(({ title }) => title.match(pattern));
    }
    if (low) posts = posts.filter(({ discost }) => discost >= low);
    if (high) posts = posts.filter(({ discost }) => discost <= high);
    /*Pagination Begin*/
    totalPages = Math.ceil(parseFloat(posts.length) / 8);
    posts = Pagination(posts, 8, page);
    /*Pagination End*/
    res.status(200).json({ success: true, posts, totalPages, page });
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

exports.add = async (req, res) => {
  try {
    let images = [];

    if (typeof req.body.images === "string") {
      //single image
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
    req.body.postedBy = req.user._id;
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "cars",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
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
