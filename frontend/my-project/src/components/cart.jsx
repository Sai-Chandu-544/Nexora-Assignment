export default function Cart({ cart, onRemove, onCheckout }) {
  return (
    <div className="p-4 border rounded-lg bg-gray-100">
      {cart.cartItems.length === 0
        ? <div>Your cart is empty.</div>
        : (
      <>
        <ul>
          {cart.cartItems.map(item => (
            <li key={item._id} className="flex justify-between items-center mb-1">
              <span>{item.product.name} x {item.qty} = ₹{item.total}</span>
              <button onClick={() => onRemove(item._id)}
                className="text-red-600 border px-2 rounded ml-2">Remove</button>
            </li>
          ))}
        </ul>
        <div className="font-bold mt-4">Total: ₹{cart.total}</div>
        <button className="bg-blue-600 text-white px-2 py-1 rounded mt-2" onClick={onCheckout}>Proceed to Checkout</button>
      </>
        )
      }
    </div>
  );
}
