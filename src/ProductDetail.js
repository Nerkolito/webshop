import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "./CartContext";
import { toast } from "react-toastify";

// Functional component to display the details of a single product
function ProductDetail() {
  // Get the product ID from the URL parameters
  const { id } = useParams();
  // State to hold the product details
  const [product, setProduct] = useState(null);
  // State to hold the quantity of the product to be added to the cart
  const [quantity, setQuantity] = useState(1);
  // Get the addToCart function from the CartContext
  const { addToCart } = useContext(CartContext);

  // useEffect hook to fetch product details when the component mounts or the ID changes
  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        // Update the product state with the fetched data
        setProduct(response.data);
      })
      .catch((error) => {
        // Log an error if the request fails
        console.error("There was an error fetching the product!", error);
      });
  }, [id]);

  // Show a loading message while the product data is being fetched
  if (!product) {
    return <div className="text-center">Loading...</div>;
  }

  // Event handler to add the product to the cart
  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Show a success toast notification
    toast.success("Product added to cart!");
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">{product.title}</h2>
      <p className="mb-4">{product.description}</p>
      <p className="mb-4">Price: ${product.price}</p>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="mb-4 rounded-lg"
      />
      <div className="flex items-center">
        {/* Input field to specify the quantity of the product */}
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          className="mr-4 w-20 px-3 py-2 border rounded"
        />
        {/* Button to add the product to the cart */}
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;
