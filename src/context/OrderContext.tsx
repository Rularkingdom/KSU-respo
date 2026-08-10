import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';
import type { CartItem } from './CartContext';

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  orderId: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  totalShipping: number;
  total: number;
  timestamp: string;
  status: 'pending' | 'confirmed';
}

interface OrderContextValue {
  lastOrder: Order | null;
  placeOrder: (customer: CustomerInfo, items: CartItem[], totals: {
    subtotal: number;
    totalShipping: number;
    total: number;
  }) => Order;
  clearLastOrder: () => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

const ORDER_STORAGE_KEY = 'kawad-swad-last-order-v1';

function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `KS-${ts}${rand}`;
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [lastOrder, setLastOrder] = useState<Order | null>(() => {
    try {
      const saved = localStorage.getItem(ORDER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (lastOrder) {
        localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(lastOrder));
      } else {
        localStorage.removeItem(ORDER_STORAGE_KEY);
      }
    } catch {
      // ignore storage errors
    }
  }, [lastOrder]);

  const placeOrder: OrderContextValue['placeOrder'] = (customer, items, totals) => {
    const order: Order = {
      orderId: generateOrderId(),
      customer,
      items: items.map((i) => ({ ...i })),
      subtotal: totals.subtotal,
      totalShipping: totals.totalShipping,
      total: totals.total,
      timestamp: new Date().toISOString(),
      status: 'confirmed',
    };
    setLastOrder(order);
    return order;
  };

  const clearLastOrder = () => {
    setLastOrder(null);
    try {
      localStorage.removeItem(ORDER_STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
  };

  return (
    <OrderContext.Provider value={{ lastOrder, placeOrder, clearLastOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder(): OrderContextValue {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used within OrderProvider');
  return ctx;
}
