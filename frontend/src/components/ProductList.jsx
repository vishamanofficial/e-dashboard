import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let result = await fetch("http://localhost:5000/products",{
        headers: {
            authorization: JSON.parse(localStorage.getItem('token'))
        }
      });
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

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`);
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  // Inline styles
  const containerStyle = {
    padding: '2rem 2rem 10rem 2rem',
    backgroundColor: '#f4f7f9',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const headingStyle = {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '1rem',
  };

  const searchInputStyle = {
    width: '100%',
    maxWidth: '500px',
    padding: '0.75rem',
    marginBottom: '2rem',
    borderRadius: '4px',
    border: '1px solid #ced4da',
    fontSize: '1rem',
    outline: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const listStyle = {
    width: '100%',
    maxWidth: '800px',
    listStyle: 'none',
    padding: '0',
    margin: '0',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const headerItemStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 2fr 2fr 1fr',
    padding: '1rem',
    backgroundColor: '#e9ecef',
    borderBottom: '1px solid #e0e0e0',
    fontWeight: 'bold',
  };

  const listItemStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 2fr 2fr 1fr',
    padding: '1rem',
    borderBottom: '1px solid #e0e0e0',
    backgroundColor: '#fff',
    alignItems: 'center',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  };

  const buttonStyle = {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.875rem',
    cursor: 'pointer',
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
    color: '#fff',
  };

  const updateButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28a745',
    color: '#fff',
  };

  const linkStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    backgroundColor: '#28a745',
    color: '#fff',
    textDecoration: 'none',
    fontSize: '0.875rem',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Product List</h1>
      <input
        type="text"
        placeholder="Search Products"
        onChange={searchHandle}
        style={searchInputStyle}
      />
      <ul style={listStyle}>
        <li style={headerItemStyle}>
          <span>S. No</span>
          <span>Name</span>
          <span>Price</span>
          <span>Category</span>
          <span>Operation</span>
        </li>
        {products.length > 0 ? (
          products.map((item, index) => (
            <li key={item._id} style={listItemStyle}>
              <span>{index + 1}</span>
              <span>{item.name}</span>
              <span>{item.price}</span>
              <span>{item.category}</span>
              <span style={buttonContainerStyle}>
                <button
                  onClick={() => deleteProduct(item._id)}
                  style={deleteButtonStyle}
                >
                  Delete
                </button>
                <Link to={`/update/${item._id}`} style={linkStyle}>
                  Update
                </Link>
              </span>
            </li>
          ))
        ) : (
          <li style={listItemStyle}>No products found.</li>
        )}
      </ul>
    </div>
  );
};

export default ProductList;
