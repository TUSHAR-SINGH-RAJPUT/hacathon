
"use client";

import type { ServiceProvider, CartItem } from '@/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartContextType {
  cart: CartItem[];
  addToCart: (provider: ServiceProvider) => void;
  removeFromCart: (providerId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const localCart = localStorage.getItem('kariGaarCart');
      return localCart ? JSON.parse(localCart) : [];
    }
    return [];
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kariGaarCart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (provider: ServiceProvider) => {
    setCart(prevCart => {
      if (!prevCart.find(item => item.id === provider.id)) {
        // For now, CartItem is same as ServiceProvider. Can be extended.
        return [...prevCart, { ...provider }];
      }
      return prevCart; // Already in cart
    });
  };

  const removeFromCart = (providerId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== providerId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
