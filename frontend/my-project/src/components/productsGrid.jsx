import React, { useEffect, useState } from 'react';

const imageUrls = [
  "https://rukminim2.flixcart.com/image/416/416/xif0q/monitor/w/i/f/-original-imahagy2cefszqgy.jpeg?q=70&crop=false",         
  "https://rukminim2.flixcart.com/image/832/832/xif0q/mobile/k/l/l/-original-imagtc5fz9spysyk.jpeg?q=70&crop=false",          
  "https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/f/g/n/s-polo-rib-praizy-original-imahgygyhu88ny6h.jpeg?q=70&crop=false", 
  "https://rukminim2.flixcart.com/image/416/416/xif0q/dslr-camera/i/o/c/eos-r100-24-1-eos-r100-kit-canon-original-imagqeydhsxgacxp.jpeg?q=70&crop=false", 
  "https://rukminim2.flixcart.com/image/416/416/xif0q/smartwatch/z/r/d/-original-imagywnzhh3dnqvk.jpeg?q=70&crop=false",      
  "https://rukminim2.flixcart.com/image/832/832/xif0q/headphone/f/f/t/fire-500v2-neckband-hi-bass-wireless-bluetooth-headphone-original-imah7nj2vza7fuzt.jpeg?q=70&crop=false", 
  "https://rukminim2.flixcart.com/image/832/832/xif0q/backpack/p/0/n/8-backpack-school-bag-college-bag-office-casual-bag-waterproof-original-imah5vwngnsnsmjk.jpeg?q=70&crop=false",
  "https://rukminim2.flixcart.com/image/832/832/xif0q/tablet/u/u/n/-original-imahayydffmgtmyr.jpeg?q=70&crop=false 2x, https://rukminim2.flixcart.com/image/416/416/xif0q/tablet/u/u/n/-original-imahayydffmgtmyr.jpeg?q=70&crop=false 1x",
  "https://rukminim2.flixcart.com/image/416/416/xif0q/headphone/u/n/8/-original-imahgnf4rwhaefft.jpeg?q=70&crop=false"
];

export default function ProductsGrid({ onAdd }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(r => r.json())
      .then(setProducts);
  }, []);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((prod, idx) => (
        <div key={prod._id} className="border p-4 rounded shadow bg-white flex flex-col items-center">
          <img src={imageUrls[idx % imageUrls.length]} alt={prod.name}
               className="w-28 h-28 rounded mb-2 object-cover" />
          <span className="font-bold text-lg">{prod.name}</span>
          <span className="text-indigo-700 font-serif mb-2">₹{prod.price}</span>
          <button
            onClick={() => onAdd(prod._id, 1)}
            className="border px-3 py-1 rounded bg-green-500 text-white mt-2">Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
