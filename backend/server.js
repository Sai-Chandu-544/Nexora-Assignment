// backend/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Cart = require('./models/cart');
const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/E-Commerce', { useNewUrlParser: true, useUnifiedTopology: true });


app.get('/api/products', async (req, res) => {
  let products = await Product.find();
  if (products.length === 0) {
    products = await Product.insertMany([
      { name: "TV", price: 10000 },
      { name: "Mobile", price: 15000 },
      { name: "Shirt", price: 999 },
      { name: "Camera", price: 25000 },
      { name: "Watch", price: 4000 },
      { name: "Neckband", price: 1500 },
      {name:"Bag",price:800},
      {name:"Tab",price:8000},
      {name:"Earpods",price:2000}
    ]);
  }
  res.json(products);
});


app.get('/api/cart', async (req, res) => {
  const cart = await Cart.find();
  const products = await Product.find();
  const cartItems = cart.map(item => {
    const product = products.find(p => p._id.toString() === item.productId);
    return { ...item._doc, product, total: product.price * item.qty };
  });
  const total = cartItems.reduce((sum, item) => sum + item.total, 0);
  res.json({ cartItems, total });
});


app.post('/api/cart', async (req, res) => {
  const { productId, qty } = req.body;
  let existing = await Cart.findOne({ productId });
  if (existing) {
    existing.qty += qty;
    await existing.save();
    return res.json(existing);
  }
  const newItem = await Cart.create({ productId, qty });
  res.json(newItem);
});


app.delete('/api/cart/:id', async (req, res) => {
  await Cart.deleteOne({ _id: req.params.id });
  res.json({ success: true });
});


app.post('/api/checkout', async (req, res) => {

  const cart = await Cart.find();
  const products = await Product.find();
  const cartItems = cart.map(item => {
    const product = products.find(p => p._id.toString() === item.productId);
    return { ...item._doc, product, total: product.price * item.qty };
  });
  const total = cartItems.reduce((sum, item) => sum + item.total, 0);
  await Cart.deleteMany({});
  res.json({ cartItems, total, receiptId: Math.random().toString(36).substr(2, 6), timestamp: new Date() });
});

app.listen(5000, () => console.log('Backend running on :5000'));
