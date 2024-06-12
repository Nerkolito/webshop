import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import ProductList from "./ProductList";
import ProductDetail from "./ProductDetail";
import { CartProvider } from "./CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "./Cart";
import Checkout from "./Checkout";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <h1>Webshop</h1>
          <nav>
            <Link to="/">Home</Link> | <Link to="/cart">Cart</Link>
          </nav>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/cart" element={<Checkout />} />
          </Routes>
          <ToastContainer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
