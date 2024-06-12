import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";

function Cart() {
  const { cart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Shopping Cart</h2>
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
      {cart.length > 0 && (
        <Link to="/checkout">
          <button>Proceed to Checkout</button>
        </Link>
      )}
    </div>
  );
}

export default Cart;
