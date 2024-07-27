import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let result = await fetch('http://localhost:5000/products');
      result = await result.json();
      setProducts(result);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div className='product-list'>
      <h1>Product List</h1>
      <ul>
      <li>S. No</li>
      <li>Name</li>
      <li>Price</li>
      <li>Category</li>
      </ul>
      {products.map((item, index)=>
        <ul>
        <li>{index}</li>
        <li>{item.name}</li>
        <li>{item.price}</li>
        <li>{item.category}</li>
        </ul>
      )}
    </div>
  );
};

export default ProductList;
