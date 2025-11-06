import React, { useEffect, useState } from 'react';

export default function ProductsGrid({ onAdd }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(r => r.json()).then(setProducts);
  }, []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-4">
      {products.map(prod => (
        <div key={prod._id} className="border p-4 rounded shadow bg-white flex flex-col items-center">
          <span className="font-bold text-lg">{prod.name}</span>
          <span className="text-indigo-700 font-serif mb-2">₹{prod.price}</span>
          <button
            onClick={() => onAdd(prod._id, 1)}
            className="border px-3 py-1 rounded bg-green-500 text-white">Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
