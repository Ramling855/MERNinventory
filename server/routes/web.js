const express = require("express");
const inventryController = require("../controllers/inventryController");
const orderController = require("../controllers/orderController");
const router = express.Router();

//routes for inventry

router.get("/", inventryController.getData);
//http://localhost:7001 ==> get

router.post("/", inventryController.create);
//http://localhost:7001  ==> post

router.get("/edit/:id", inventryController.edit);
//http://localhost:7001/edit/62bee4f925aa03ecac761e07 ==> get

router.put("/edit/:id", inventryController.update);
//http://localhost:7001/edit/62bee4f925aa03ecac761e07 ==> put

router.delete("/delete/:id", inventryController.delete);
//http://localhost:7001/delete/62bee4f925aa03ecac761e07 ==> delete

router.get("/search/:key", inventryController.search);
//http://localhost:7001/search/T ==> get

router.get("/sort", inventryController.sortByName);
//http://localhost:7001/sort/ ==> get

//routes for order

router.get("/order", orderController.getData);
//http://localhost:7001/order/ ==> get

router.post("/order", orderController.create);
//http://localhost:7001/order/ ==> post

module.exports = router;
