const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema({
  Name: {
    type: String,
    required: [true, " item name is required"],
  },
  Salary: {
    type: Number,
    required: [true, "salary is required"],
  },
  Category: {
    type: String,
    required: [true, "Category is required"],
  },
  Description: {
    type: String,
  },
  Image: {
    type: String,
    required: [true, "Image for this item is required"],
  },
  TotalRating: {
    type: Number,
    default: 0,
  },
  AverageRating: {
    type: Number,
    default: 0,
  },
});

var itemModel = mongoose.model("Item", ItemSchema);
module.exports = itemModel;
