import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from './pages/Home';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  const [cart, setCart] = useState({ cartItems: [], total: 0 });

  // Refetch cart whenever needed
  const refreshCart = useCallback(() => {
    fetch('http://localhost:5000/api/cart')
      .then(r => r.json()).then(setCart);
  }, []);
  useEffect(() => { refreshCart(); }, [refreshCart]);

  return (
    <Router>
      <nav className="p-4 bg-blue-700 text-white flex justify-between">
        <Link to="/" className="font-bold">Vibe Commerce</Link>
        <Link to="/cart" className="ml-4">Cart ({cart.cartItems.length})</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage refreshCart={refreshCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} refreshCart={refreshCart} />} />
        <Route path="/checkout" element={<CheckoutPage cart={cart} refreshCart={refreshCart} />} />
      </Routes>
    </Router>
  );
}
export default App;
