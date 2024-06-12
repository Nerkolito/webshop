import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";

// Checkout component for handling the checkout process
function Checkout() {
  // Access the cart context to get the current cart state
  const { cart } = useContext(CartContext);
  // State to hold the user's name and address
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  // State to track if the order has been placed
  const [orderPlaced, setOrderPlaced] = useState(false);
  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Effect to check if the cart is empty and navigate back to the cart page
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
      toast.error(
        "Your cart is empty. Please add products to your cart before checking out."
      );
    }
  }, [cart, navigate]);

  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Handle the order placement process
  const handleOrder = () => {
    if (name && address) {
      // Set order placed state to true and show success toast notification
      setOrderPlaced(true);
      toast.success("Order placed successfully!");
    } else {
      // Show error toast notification if fields are empty
      toast.error("Please fill in all fields");
    }
  };

  // Render order confirmation message if order is placed
  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Confirmation</h2>
        <p>Thank you for your order, {name}!</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Checkout</h2>
      {/* List of items in the cart */}
      <ul>
        {cart.map((item) => (
          // Key is set to item ID for efficient re-rendering
          <li key={item.id} className="mb-4">
            <h3 className="font-semibold">{item.title}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
            <p>Subtotal: ${item.price * item.quantity}</p>
          </li>
        ))}
      </ul>
      {/* Display the total price of all items in the cart */}
      <h3 className="text-lg font-semibold mt-4">
        Total: ${totalPrice.toFixed(2)}
      </h3>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Personal Details</h3>
        {/* Input field for user's name */}
        <div className="mb-4">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {/* Input field for user's address */}
        <div className="mb-4">
          <label className="block mb-1">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {/* Button to place the order */}
        <button
          onClick={handleOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
