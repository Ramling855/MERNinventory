const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  custName: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  qty: { type: Number, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  totalPrice: { type: Number, required: true, trim: true },
  company: { type: String, required: true, trim: true },
  Date: { type: Date, default: Date.now },
});

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
