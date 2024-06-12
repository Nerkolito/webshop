import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Functional component to display a list of products
function ProductList() {
  // State to hold the list of products
  const [products, setProducts] = useState([]);
  // State to hold the search term entered by the user
  const [searchTerm, setSearchTerm] = useState("");
  // State to hold the selected category for filtering products
  const [selectedCategory, setSelectedCategory] = useState("");
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State to hold any error messages
  const [error, setError] = useState(null);

  // useEffect hook to fetch products when the component mounts
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        // Update the products state with the fetched data
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        // Set error state if the request fails
        setError("There was an error fetching the products!");
        setLoading(false);
      });
  }, []);

  // Event handler for category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filter the products based on the search term and selected category
  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "" || product.category === selectedCategory)
    );
  });

  // Extract unique categories from the products list for the category filter
  const categories = [...new Set(products.map((product) => product.category))];

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      {/* Input field for searching products */}
      <input
        type="text"
        placeholder="Search for products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded"
        aria-label="Search for products"
      />
      {/* Dropdown for selecting product category */}
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="w-full px-4 py-2 mb-4 border rounded"
        aria-label="Select product category"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {/* Display the filtered list of products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded-lg hover:shadow-lg transition-shadow duration-200"
          >
            <Link to={`/product/${product.id}`}>
              <img
                src={product.thumbnail}
                alt={product.title}
                className="mb-2 rounded-lg w-full h-48 object-cover"
              />
              <h3 className="text-lg font-semibold mb-1">{product.title}</h3>
              <p className="text-gray-700">Price: ${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
