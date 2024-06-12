import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

// Cart component that displays items in the shopping cart and the total price
function Cart() {
  // Access the cart context to get the current cart state and remove items from the cart
  const { cart, removeFromCart } = useContext(CartContext);

  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-lg mx-auto">
      {/* Heading for the cart page */}
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      {/* List of items in the cart */}
      <ul>
        {cart.map((item, index) => (
          // Key is set to item ID for efficient re-rendering
          <li key={item.id} className="border-b pb-4 mb-4">
            {/* Display item title */}
            <h3 className="text-lg font-semibold">{item.title}</h3>
            {/* Display item quantity */}
            <p className="text-gray-700">Quantity: {item.quantity}</p>
            {/* Display item price */}
            <p className="text-gray-700">Price: ${item.price}</p>
            {/* Display subtotal for the item */}
            <p className="text-gray-700">
              Subtotal: ${item.price * item.quantity}
            </p>
            {/* Button to remove the item from the cart */}
            <button
              onClick={() => removeFromCart(index)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      {/* Display the total price of all items in the cart */}
      <h3 className="text-xl font-semibold mt-4">
        Total: ${totalPrice.toFixed(2)}
      </h3>
      {/* Checkout button */}
      <Link to="/checkout" className="block mt-4">
        <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
          Checkout
        </button>
      </Link>
    </div>
  );
}

export default Cart;
