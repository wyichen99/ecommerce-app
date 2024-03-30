import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Initialize cart items from localStorage or set to an empty array
  const [cartItems, setCartItems] = useState(() => {
    try {
      const items = localStorage.getItem('cartItems');
      return items ? JSON.parse(items) : [];
    } catch {
      return [];
    }
  });

  // Save cart items to localStorage when cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find(item => item.id === product.id);
      if (itemExists) {
        return prevItems.map(item => item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item);
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};