import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the product!", error);
        toast.error("Failed to fetch product details.");
        navigate("/"); // Navigate to home page if product not found
      });
  }, [id, navigate]);

  if (!product) {
    return <div className="text-center">Loading...</div>;
  }

  const handleAddToCart = () => {
    if (quantity < 1) {
      toast.error("Quantity must be at least 1.");
      return;
    }
    addToCart(product, quantity);
    toast.success("Product added to cart!");
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">{product.title}</h2>
      <p className="mb-4">{product.description}</p>
      <p className="mb-4">Price: ${product.price}</p>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="mb-4 rounded-lg"
      />
      <div className="flex items-center">
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          className="mr-4 w-20 px-3 py-2 border rounded"
          aria-label="Quantity"
        />
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
          aria-label="Add to Cart"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
