import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-700">Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={item.id} className="border-b pb-4 mb-4">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-700">Quantity: {item.quantity}</p>
              <p className="text-gray-700">Price: ${item.price}</p>
              <p className="text-gray-700">
                Subtotal: ${item.price * item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(index)}
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                aria-label={`Remove ${item.title} from cart`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {cart.length > 0 && (
        <>
          <h3 className="text-xl font-semibold mt-4">
            Total: ${totalPrice.toFixed(2)}
          </h3>
          <Link to="/checkout" className="block mt-4">
            <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
              Checkout
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
