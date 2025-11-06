import React from 'react';
import Cart from '../components/cart';
import { useNavigate } from "react-router-dom";

export default function CartPage({ cart, refreshCart }) {
  const navigate = useNavigate();

  const handleRemove = (itemId) => {
    fetch(`http://localhost:5000/api/cart/${itemId}`, { method: "DELETE" })
      .then(refreshCart);
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      <Cart cart={cart} onRemove={handleRemove} onCheckout={() => navigate("/checkout")} />
    </div>
  );
}
