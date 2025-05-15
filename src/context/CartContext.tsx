
"use client";

import type { ServiceProvider, CartItem } from '@/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CartContextType {
  cart: CartItem[];
  addToCart: (provider: ServiceProvider) => void;
  removeFromCart: (providerId: string) => void;
  clearCart: () => void;
  customerAddress: string | null;
  setCustomerAddress: (address: string | null) => void;
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

  const [customerAddress, setCustomerAddress] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('kariGaarCustomerAddress') || null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('kariGaarCart', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (customerAddress) {
        localStorage.setItem('kariGaarCustomerAddress', customerAddress);
      } else {
        localStorage.removeItem('kariGaarCustomerAddress');
      }
    }
  }, [customerAddress]);


  const addToCart = (provider: ServiceProvider) => {
    setCart(prevCart => {
      if (!prevCart.find(item => item.id === provider.id)) {
        return [...prevCart, { ...provider }];
      }
      return prevCart;
    });
  };

  const removeFromCart = (providerId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== providerId));
  };

  const clearCart = () => {
    setCart([]);
    setCustomerAddress(null); // Also clear address when cart is cleared
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, customerAddress, setCustomerAddress }}>
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
