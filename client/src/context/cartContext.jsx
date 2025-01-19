import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (burger) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.cartId === burger.cartId);

      if (existingItem) {
        return prevCart.map((item) =>
          item.cartId === burger.cartId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prevCart, { ...burger, cartId: uuidv4(), quantity: 1 }];
    });
  };

  const removeFromCart = (cartId) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartId === cartId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};