
import ProductsGrid from '../components/productsGrid';

export default function HomePage({ refreshCart }) {
  const handleAddToCart = (productId, qty) => {
    fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, qty })
    }).then(refreshCart);
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      <ProductsGrid onAdd={handleAddToCart} />
    </div>
  );
}
