import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <img src={product.thumbnail} alt={product.title} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
