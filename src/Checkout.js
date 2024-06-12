import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";

function Checkout() {
  const { cart } = useContext(CartContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/cart");
      toast.error(
        "Your cart is empty. Please add products to your cart before checking out."
      );
    }
  }, [cart, navigate]);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = () => {
    if (name.trim() && address.trim()) {
      setOrderPlaced(true);
      toast.success("Order placed successfully!");
    } else {
      toast.error("Please fill in all fields.");
    }
  };

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
      <ul>
        {cart.map((item) => (
          <li key={item.id} className="mb-4">
            <h3 className="font-semibold">{item.title}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
          </li>
        ))}
      </ul>
      <h3 className="text-lg font-semibold mt-4">
        Total: ${totalPrice.toFixed(2)}
      </h3>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Personal Details</h3>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            aria-label="Name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            aria-label="Address"
            required
          />
        </div>
        <button
          onClick={handleOrder}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          aria-label="Place Order"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
