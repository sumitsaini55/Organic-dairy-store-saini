const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET /api/products  -> list all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (err) {
    console.error("Product list error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
});

// POST /api/products/seed  -> one-time seed demo products
router.post("/seed", async (req, res) => {
  try {
    const count = await Product.countDocuments();
    if (count > 0) {
      return res.status(400).json({ message: "Products already seeded" });
    }

    const sampleProducts = [
      {
        name: "A2 Desi Cow Ghee (1L)",
        description:
          "Traditional bilona method ghee from grass-fed A2 desi cows.",
        price: 899,
        image:
          "https://i.pinimg.com/474x/15/9f/a5/159fa5bcb2f05aadfa3b8498163e389a.jpg",
        category: "Ghee"
      },
      {
        name: "Organic Cow Milk (1L)",
        description: "Fresh, hormone-free organic cow milk.",
        price: 80,
        image:
          "https://t4.ftcdn.net/jpg/13/15/19/43/360_F_1315194377_Ro8c5tjMXYc3oEXUJ6zgyeIENDkdQyJX.jpg",
        category: "Milk"
      },
      {
        name: "Organic Paneer (200g)",
        description: "Soft, rich paneer made from organic milk.",
        price: 160,
        image:
          "https://images.pexels.com/photos/8478058/pexels-photo-8478058.jpeg",
        category: "Paneer"
      },
      {
        name: "Farm Fresh White Butter (500g)",
        description: "Hand-churned white butter, no preservatives.",
        price: 350,
        image:
          "https://images.pexels.com/photos/4109942/pexels-photo-4109942.jpeg",
        category: "Butter"
      }
    ];

    const created = await Product.insertMany(sampleProducts);
    return res.json(created);
  } catch (err) {
    console.error("Seed error:", err.message);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
