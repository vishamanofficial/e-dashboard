import React, { useEffect, useState } from 'react'

const ProductList = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        getProducts();
    },[])

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products");
        result = await result.json();
        setProducts(result);
    }
    console.warn(products);


  return (
    <div>
      product
    </div>
  )
}

export default ProductList
