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
    if (name && address) {
      setOrderPlaced(true);
      toast.success("Order placed successfully!");
    } else {
      toast.error("Please fill in all fields");
    }
  };

  if (orderPlaced) {
    return (
      <div>
        <h2>Order Confirmation</h2>
        <p>Thank you for your order, {name}!</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
            <p>Subtotal: ${item.price * item.quantity}</p>
          </li>
        ))}
      </ul>
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
      <div>
        <h3>Personal Details</h3>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button onClick={handleOrder}>Place Order</button>
      </div>
    </div>
  );
}

export default Checkout;
