const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
  productId: String, qty: Number
});
module.exports = mongoose.model('Cart', CartSchema);