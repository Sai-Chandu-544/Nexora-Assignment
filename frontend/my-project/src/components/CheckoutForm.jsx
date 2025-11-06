import React, { useState } from 'react';

export default function CheckoutForm({ cartItems, onReceipt }) {
  const [form, setForm] = useState({ name: '', email: '' });
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, cartItems })
    })
      .then(r => r.json())
      .then(data => {
        setReceipt(data);
        if (onReceipt) onReceipt(data);
      });
  };

  return (
   <div className="p-4 border rounded bg-white max-w-md mx-auto shadow-md">
  {receipt ? (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-green-100">
      <h2 className="text-2xl font-extrabold text-green-700 mb-2 flex items-center gap-2">
        <svg width={28} height={28} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v6H3z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9v12h6v-6h6v6h6V9" /></svg>
        Order Receipt
      </h2>
      <div className="mb-4 text-gray-700">
        <div className="flex justify-between">
          <span className="font-bold">Order #</span>
          <span>{receipt.receiptId}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Date</span>
          <span>{new Date(receipt.timestamp).toLocaleString()}</span>
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2 text-indigo-700">Items Purchased:</h3>
        <ul>
          {receipt.cartItems.map((item, i) => (
            <li key={i} className="flex justify-between border-b border-gray-100 py-1">
              <span className="font-medium">{item.product.name}</span>
              <span className="text-sm text-gray-600">x {item.qty}</span>
              <span className="font-bold text-green-700">₹{item.product.price * item.qty}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="font-bold text-xl text-indigo-700">Total</span>
        <span className="font-bold text-xl text-green-700">₹{receipt.total}</span>
      </div>
      <div className="mt-6 text-center text-gray-500 text-sm">
        Thank you for shopping with Vibe Commerce!
      </div>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="bg-indigo-50 rounded-lg shadow p-4">
      <h3 className="font-semibold text-indigo-700 mb-2">Enter Customer Details</h3>
      <input
        className="border block mb-2 px-2 py-1 w-full rounded focus:ring focus:border-indigo-300"
        placeholder="Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        className="border block mb-2 px-2 py-1 w-full rounded focus:ring focus:border-indigo-300"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        required
      />
      <button
        type="submit"
        className="bg-green-700 text-white px-3 py-1 rounded w-full hover:bg-green-800 transition">
        Submit Order
      </button>
    </form>
  )}
</div>

  );
}
