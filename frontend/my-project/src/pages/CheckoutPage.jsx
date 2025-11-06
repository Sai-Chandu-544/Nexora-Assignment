import React from 'react';
import CheckoutForm from '../components/CheckoutForm';

export default function CheckoutPage({ cart, refreshCart }) {
  return (
    <div className="container mx-auto max-w-lg py-8 px-4 bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50 rounded-xl shadow-lg">
  <h2 className="text-2xl font-extrabold mb-6 text-indigo-700 text-center tracking-wide">
    <span className="inline-block align-middle mr-2">
      <svg width={28} height={28} fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline-block text-green-500"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v6H3z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9v12h6v-6h6v6h6V9" /></svg>
    </span>
    Checkout
  </h2>
  <div className="mb-6 bg-white rounded-lg shadow p-6">
    <ul className="mb-4">
      {cart.cartItems.length > 0 ? cart.cartItems.map((item) => (
        <li key={item._id} className="flex justify-between mb-2 p-2 border-b border-gray-100">
          <span className="font-medium text-gray-800">{item.product.name}</span>
          <span className="font-light text-sm text-gray-500">x {item.qty}</span>
          <span className="font-bold text-indigo-700">₹{item.total}</span>
        </li>
      )) : (
        <li className="text-gray-400">No items in cart.</li>
      )}
    </ul>
    <div className="font-bold text-lg text-right text-indigo-700">
      Total: ₹{cart.total}
    </div>
  </div>
  <div className="bg-indigo-50 rounded-lg shadow p-4">
    <CheckoutForm
      cartItems={cart.cartItems}
      onReceipt={() => { refreshCart(); }}
    />
  </div>
</div>

  );
}
