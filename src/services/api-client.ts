import { CustomerInfo, Order } from '../context/OrderContext';
import { CartItem } from '../context/CartContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export interface CreateOrderPayload {
  customer: CustomerInfo;
  items: CartItem[];
  idempotencyKey?: string;
}

export const apiClient = {
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) return false;
      const data = await res.json();
      return data.status === 'ok';
    } catch {
      return false;
    }
  },

  async createOrder(payload: CreateOrderPayload): Promise<Order> {
    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let errorMsg = 'Failed to submit order request.';
      try {
        const errorData = await response.json();
        if (errorData.detail) {
          errorMsg = typeof errorData.detail === 'string' 
            ? errorData.detail 
            : JSON.stringify(errorData.detail);
        }
      } catch {
        // fallback to default message
      }
      throw new Error(errorMsg);
    }

    const data = await response.json();
    
    // Map backend response to frontend Order structure
    return {
      orderId: data.orderId,
      customer: data.customer,
      items: data.items.map((i: any) => ({
        sku: i.sku,
        quantity: i.quantity,
      })),
      subtotal: data.subtotal,
      totalShipping: data.shipping,
      total: data.total,
      timestamp: data.createdAt,
      status: data.status,
    };
  },
};
