const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  qty: { type: Number, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  catagory: { type: String, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  Date: { type: Date, default: Date.now },
});

const stockModel = mongoose.model("stock", stockSchema);

module.exports = stockModel;
