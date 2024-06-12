import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { CartProvider } from "./CartContext";

// Main App component that sets up routing and context providers
function App() {
  return (
    // Wraps the application with CartProvider to provide cart context to all components
    <CartProvider>
      {/* Sets up routing for the application */}
      <Router>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          {/* Application header */}
          <h1 className="text-3xl font-bold mb-4">Nermshop från WISH</h1>
          {/* Navigation links */}
          <nav className="mb-4">
            <Link
              to="/"
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Cart
            </Link>
          </nav>
          {/* Routes to different components based on the URL path */}
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
          {/* ToastContainer for displaying toast notifications */}
          <ToastContainer className="mt-auto" />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
