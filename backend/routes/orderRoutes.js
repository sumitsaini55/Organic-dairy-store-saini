const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/auth");
const Order = require("../models/Order");

const router = express.Router();

// POST /api/orders  -> create new order
router.post("/", async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      address,
      city,
      pincode,
      items,
      totalAmount
    } = req.body;

    if (!customerName || !email || !address || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const order = await Order.create({
      customerName,
      email,
      phone,
      address,
      city,
      pincode,
      items,
      totalAmount
    });

    return res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    console.error("Order create error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
});

// GET /api/orders  -> simple admin view
router.get("/", verifyToken, isAdmin, async (req, res) => {

  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.json(orders);
  } catch (err) {
    console.error("Order list error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
