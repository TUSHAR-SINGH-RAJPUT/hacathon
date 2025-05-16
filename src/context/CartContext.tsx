
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
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerAddress, setCustomerAddress] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false); // To track if data has been loaded from localStorage

  // Load cart and address from localStorage on initial client-side mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localCart = localStorage.getItem('kariGaarCart');
      if (localCart) {
        setCart(JSON.parse(localCart));
      }
      const localAddress = localStorage.getItem('kariGaarCustomerAddress');
      if (localAddress) {
        setCustomerAddress(localAddress);
      }
      setIsLoaded(true); // Mark as loaded
    }
  }, []);

  // Persist cart to localStorage whenever it changes, but only after initial load
  useEffect(() => {
    if (typeof window !== 'undefined' && isLoaded) {
      localStorage.setItem('kariGaarCart', JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Persist customerAddress to localStorage whenever it changes, but only after initial load
  useEffect(() => {
    if (typeof window !== 'undefined' && isLoaded) {
      if (customerAddress) {
        localStorage.setItem('kariGaarCustomerAddress', customerAddress);
      } else {
        localStorage.removeItem('kariGaarCustomerAddress');
      }
    }
  }, [customerAddress, isLoaded]);


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

