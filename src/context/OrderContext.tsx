import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { CartItem } from '@/context/CartContext';

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
  status: 'pending';
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

function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase().slice(-6);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 5);
  return `KS-${ts}${rand}`;
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const placeOrder: OrderContextValue['placeOrder'] = (customer, items, totals) => {
    const order: Order = {
      orderId: generateOrderId(),
      customer,
      items: items.map((i) => ({ ...i })),
      subtotal: totals.subtotal,
      totalShipping: totals.totalShipping,
      total: totals.total,
      timestamp: new Date().toISOString(),
      status: 'pending',
    };
    setLastOrder(order);
    return order;
  };

  const clearLastOrder = () => setLastOrder(null);

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
