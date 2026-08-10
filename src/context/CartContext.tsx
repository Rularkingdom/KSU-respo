import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { productService } from '@/data/products';
import type { ProductFamily, Sku } from '@/data/products';

export interface CartItem {
  sku: string;
  productId: string;
  productSlug: string;
  productName: string;
  variant: string;
  category: string;
  packSize: number;
  quantity: number;
  unitPrice: number;
  mrp: number;
  shipping: number;
  freeShipping: boolean;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  totalMrp: number;
  totalShipping: number;
  total: number;
  savings: number;
  addItem: (skuCode: string, quantity?: number) => void;
  updateQuantity: (skuCode: string, quantity: number) => void;
  incrementItem: (skuCode: string) => void;
  decrementItem: (skuCode: string) => void;
  removeItem: (skuCode: string) => void;
  clearCart: () => void;
  getItem: (skuCode: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'kawad-swad-cart';

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item.sku === 'string' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage errors
    }
  }, [items]);

  const addItem = (skuCode: string, quantity = 1) => {
    const found = productService.getSkuByCode(skuCode);
    if (!found) return;
    const { product, sku } = found;

    setItems((prev) => {
      const existing = prev.find((i) => i.sku === skuCode);
      if (existing) {
        return prev.map((i) =>
          i.sku === skuCode ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      const newItem: CartItem = {
        sku: sku.sku,
        productId: product.id,
        productSlug: product.slug,
        productName: product.name,
        variant: product.variant,
        category: product.category,
        packSize: sku.packSize,
        quantity,
        unitPrice: sku.websitePrice,
        mrp: sku.mrp,
        shipping: sku.shipping,
        freeShipping: sku.freeShipping,
      };
      return [...prev, newItem];
    });
  };

  const updateQuantity = (skuCode: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(skuCode);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.sku === skuCode ? { ...i, quantity } : i)),
    );
  };

  const incrementItem = (skuCode: string) => {
    setItems((prev) =>
      prev.map((i) =>
        i.sku === skuCode ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );
  };

  const decrementItem = (skuCode: string) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.sku === skuCode ? { ...i, quantity: i.quantity - 1 } : i,
        )
        .filter((i) => i.quantity > 0),
    );
  };

  const removeItem = (skuCode: string) => {
    setItems((prev) => prev.filter((i) => i.sku !== skuCode));
  };

  const clearCart = () => setItems([]);

  const getItem = (skuCode: string) =>
    items.find((i) => i.sku === skuCode);

  const { itemCount, subtotal, totalMrp, totalShipping, total, savings } =
    useMemo(() => {
      let count = 0;
      let sub = 0;
      let mrpTotal = 0;
      let shipTotal = 0;
      for (const item of items) {
        count += item.quantity;
        sub += item.unitPrice * item.quantity;
        mrpTotal += item.mrp * item.quantity;
        shipTotal += item.shipping;
      }
      return {
        itemCount: count,
        subtotal: sub,
        totalMrp: mrpTotal,
        totalShipping: shipTotal,
        total: sub + shipTotal,
        savings: mrpTotal - sub,
      };
    }, [items]);

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    totalMrp,
    totalShipping,
    total,
    savings,
    addItem,
    updateQuantity,
    incrementItem,
    decrementItem,
    removeItem,
    clearCart,
    getItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export { type ProductFamily, type Sku };
