const express = require("express");
const router = express.Router();
const controller = require("../controller/controller.js")
router.get("/getProducts",controller.getProducts)
router.post("/postProducts",controller.postProducts)
router.get("/putProducts",controller.putProducts)
router.get("/deleteProducts",controller.delProducts)
router.get("/getOrders",controller.getOrders)
router.get("/postOrders",controller.postOrders)
router.get("/putOrders",controller.putOrders)
router.get("/cancelOrders",controller.cancelOrders)
router.get("/deleteOrder",controller.delOrders)
module.exports = router;