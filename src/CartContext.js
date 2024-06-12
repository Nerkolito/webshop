import React, { createContext, useState } from "react";

// Create a context for the cart
export const CartContext = createContext();

// CartProvider component that provides cart state and functions to its children
export const CartProvider = ({ children }) => {
  // State to hold the cart items
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      // Check if the product already exists in the cart
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        // If the product exists, update its quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // If the product doesn't exist, add it to the cart
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (index) => {
    setCart((prevCart) => {
      // Create a copy of the cart array
      const updatedCart = [...prevCart];

      // Check if the index is out of bounds
      if (index < 0 || index >= updatedCart.length) {
        console.error("Index out of bounds:", index);
        return prevCart; // Return the previous cart unchanged
      }

      // Check if there is more than one item of the product in the cart
      if (updatedCart[index].quantity > 1) {
        // If there is more than one item, decrease the quantity by one
        updatedCart[index] = {
          ...updatedCart[index],
          quantity: updatedCart[index].quantity - 1,
        };
      } else {
        // Otherwise, remove the product from the cart
        updatedCart.splice(index, 1);
      }

      return updatedCart;
    });
  };

  return (
    // Provide the cart state, addToCart, and removeFromCart functions to children components
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      <div className="bg-gray-100 min-h-screen">{children}</div>
    </CartContext.Provider>
  );
};
