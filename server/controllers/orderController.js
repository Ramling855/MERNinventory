const orderModel = require("../models/OrderModel");

class InventryController {
  static getData = async (req, res) => {
    try {
      const List = await orderModel.find();
      res.send(List);
    } catch (err) {
      console.log(err);
    }
  };

  static create = async (req, res) => {
    console.log(req.body);
    try {
      console.log(req.body);
      let newData = new orderModel({
        custName: req.body.custName,
        name: req.body.order.name,
        qty: req.body.orderQty,
        price: req.body.order.price,
        totalPrice: req.body.total,
        company: req.body.order.company,
        // Date: req.body.Date,
      });
      let result = await newData.save();
      console.log("data in result", result);
      res.send("data saved sucessfully");
    } catch (err) {
      res.send(err);
    }
  };
}

module.exports = InventryController;
