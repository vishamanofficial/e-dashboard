import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const UpdateProduct = ({ productId }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false); // New state for success message
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details to populate the form fields
    const fetchProduct = async () => {
      try {
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        console.warn(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [params.id]);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    overflowY: 'auto',
    backgroundColor: '#f8f9fa',
    padding: '2rem',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '500px', // Adjust the width for better form layout
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    margin: '0.5rem 0',
    borderRadius: '4px',
    border: '1px solid #ced4da',
    fontSize: '1rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    margin: '1rem 0',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#ffffff',
    fontSize: '1rem',
    cursor: 'pointer',
  };

  const errorStyle = {
    color: 'red',
    fontSize: '0.875rem',
    marginTop: '-0.5rem',
    marginBottom: '0.5rem',
  };

  const successStyle = {
    color: 'green',
    fontSize: '1rem',
    margin: '1rem 0',
  };

  const handleUpdateProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    try {
      let result = await fetch(`http://localhost:5000/product/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, price, category, company }),
        headers: { 'Content-Type': 'application/json' },
      });
      result = await result.json();
      console.warn(result);
      navigate("/"); // Redirect to the updated product page

      // Clear the form fields and display success message
      setName('');
      setPrice('');
      setCategory('');
      setCompany('');
      setError(false);
      setSuccess(true);

      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error updating product:', error);
      setError(true);
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Update Product</h1>
      <div style={formStyle}>
        <input
          type="text"
          placeholder="Enter Product Name"
          style={inputStyle}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && !name && <span style={errorStyle}>Enter valid name</span>}
        <input
          type="text"
          placeholder="Enter Product Price"
          style={inputStyle}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        {error && !price && <span style={errorStyle}>Enter valid price</span>}
        <input
          type="text"
          placeholder="Enter Product Category"
          style={inputStyle}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        {error && !category && <span style={errorStyle}>Enter valid category</span>}
        <input
          type="text"
          placeholder="Enter Company Name"
          style={inputStyle}
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        {error && !company && <span style={errorStyle}>Enter valid company</span>}
        <button type="button" style={buttonStyle} onClick={handleUpdateProduct}>
          Update Product
        </button>
        {success && <span style={successStyle}>Product Updated Successfully!</span>}
      </div>
    </div>
  );
};

export default UpdateProduct;
