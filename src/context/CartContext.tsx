import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductService } from '../services/product-service';

export interface CartItem {
  sku: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (sku: string, quantity?: number) => void;
  removeItem: (sku: string) => void;
  updateQuantity: (sku: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  shippingTotal: number;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kawad_swad_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('kawad_swad_cart', JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const addItem = (sku: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.sku === sku);
      if (existing) {
        return prev.map((item) =>
          item.sku === sku ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { sku, quantity }];
    });
  };

  const removeItem = (sku: string) => {
    setItems((prev) => prev.filter((item) => item.sku !== sku));
  };

  const updateQuantity = (sku: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(sku);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.sku === sku ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Calculate totals strictly from the canonical ProductService data
  const { subtotal, shippingTotal } = items.reduce(
    (acc, item) => {
      const productData = ProductService.getProductBySku(item.sku);
      if (productData) {
        const itemSubtotal = productData.skuObj.websitePrice * item.quantity;
        const itemShipping = productData.skuObj.freeShipping ? 0 : productData.skuObj.shipping * item.quantity;
        return {
          subtotal: acc.subtotal + itemSubtotal,
          // Use maximum shipping cost or accumulate based on your business rules
          // Currently takes the highest shipping bracket
          shippingTotal: Math.max(acc.shippingTotal, itemShipping),
        };
      }
      return acc;
    },
    { subtotal: 0, shippingTotal: 0 }
  );

  const total = subtotal + shippingTotal;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        subtotal,
        shippingTotal,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
