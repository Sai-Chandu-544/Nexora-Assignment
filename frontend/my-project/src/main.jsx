import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


 const handleAddToCart = (productId, qty) => {
    
    console.log(`Add product ${productId} with quantity ${qty} to cart!`);

  };

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App onAdd={handleAddToCart} />
  </StrictMode>
)
