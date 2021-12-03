const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Name can not be empty."],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
      required: [true, "Category is missing."],
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
    },
    discost: {
      type: Number,
      required: [true, "Discounted Cost can not be empty."],
    },
    maxcost: {
      type: Number,
      required: [true, "Maximum Cost can not be empty."],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    phone: {
      type: String,
      required: [true, "Phone can not be empty."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Post || mongoose.model("Post", postSchema);
