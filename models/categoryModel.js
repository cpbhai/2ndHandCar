const mongoose = require("mongoose");

const catSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name can not be empty."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Category || mongoose.model("Category", catSchema);
