// import React, { useState } from 'react';

// const AddProduct = () => {
//   const [name, setName] = useState('');
//   const [price, setPrice] = useState('');
//   const [category, setCategory] = useState('');
//   const [company, setCompany] = useState('');
//   const [error, setError] = useState(false);

//   const containerStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     // justifyContent: 'center',
//     height: '100vh',
//     backgroundColor: '#f8f9fa',
//     padding: '2rem',
//   };

//   const formStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     padding: '2rem',
//     borderRadius: '8px',
//     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '0.5rem',
//     margin: '0.5rem 0',
//     borderRadius: '4px',
//     border: '1px solid #ced4da',
//     fontSize: '1rem',
//   };

//   const buttonStyle = {
//     width: '100%',
//     padding: '0.75rem',
//     margin: '1rem 0',
//     borderRadius: '4px',
//     border: 'none',
//     backgroundColor: '#007bff',
//     color: '#ffffff',
//     fontSize: '1rem',
//     cursor: 'pointer',
//   };

//   const handleAddProduct = async () => {
//     if (!name ||!price ||!category ||!company) {
//       setError(true);
//       return false;
//     }
//     const userId = JSON.parse(localStorage.getItem('user'))._id;
//     let result = await fetch('http://localhost:5000/add', {    
//         method: 'POST',
//         body: JSON.stringify({ name, price, category, company, userId }),
//         headers: { 'Content-Type': 'application/json' },
//       });
//       result = await result.json();
//       console.warn(result);
//     };

//   return (
//     <div style={containerStyle}>
//       <h1>Add Product</h1>
//       <div style={formStyle}>
//         <input
//           type="text"
//           placeholder="Enter Product Name"
//           style={inputStyle}
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         {error && !name &&  <span>Enter valid name</span>}
//         <input
//           type="text"
//           placeholder="Enter Product Price"
//           style={inputStyle}
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//         />
//         {error && !price &&  <span>Enter valid price</span>}
//         <input
//           type="text"
//           placeholder="Enter Product Category"
//           style={inputStyle}
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         />
//         {error && !category &&  <span>Enter valid category</span>}
//         <input
//           type="text"
//           placeholder="Enter Company Name"
//           style={inputStyle}
//           value={company}
//           onChange={(e) => setCompany(e.target.value)}
//         />
//         {error && !company &&  <span>Enter valid company</span>}
//         <button type="button" style={buttonStyle} onClick={handleAddProduct}>
//           Add Product
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddProduct;


import React, { useState } from 'react';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(false);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
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

  const handleAddProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    let result = await fetch('http://localhost:5000/add', {    
      method: 'POST',
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: { 'Content-Type': 'application/json' },
    });
    result = await result.json();
    console.warn(result);
  };

  return (
    <div style={containerStyle}>
      <h1>Add Product</h1>
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
        <button type="button" style={buttonStyle} onClick={handleAddProduct}>
          Add Product
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
