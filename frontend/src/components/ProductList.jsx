import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let result = await fetch("http://localhost:5000/products");
      result = await result.json();
      setProducts(result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      let response = await fetch(`http://localhost:5000/product/${id}`, {
        method: 'DELETE',
      });
      let result = await response.json();
      if (result) {
        getProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
      

  return (
    <div className="product-list">
      <h1>Product List</h1>
      <ul>
        <li>S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operation</li>
      </ul>
      {products.map((item, index) => (
        <ul key={index}>
          <li>{index}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>
            <button onClick={() => deleteProduct(item._id)}>Delete</button>
            <Link to={`/update/${item._id}`}>Update</Link>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default ProductList;
