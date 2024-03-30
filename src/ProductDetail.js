// ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from './cartContext'; // Import useCart

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // Use the addToCart function from the context

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${productId}`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(error => console.error("Failed to fetch product details:", error));
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} style={{ maxWidth: '100%', height: 'auto' }} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button> 
    </div>
  );
}

export default ProductDetail;