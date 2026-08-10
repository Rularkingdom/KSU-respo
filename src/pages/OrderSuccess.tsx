import { Link, Navigate } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { useOrder, type Order } from '@/context/OrderContext';
import { formatPrice } from '@/context/CartContext';

export default function OrderSuccess() {
  const { lastOrder } = useOrder();
  if (!lastOrder) return <Navigate to="/shop" replace />;
  const order: Order = lastOrder;
  return <><SEO title="Order Received" description="Your Kawad Swad order request has been received." path="/order-success" /><section className="container-max container-px py-16 lg:py-24"><div className="max-w-2xl mx-auto text-center"><div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto"><CheckCircle className="w-10 h-10 text-green-600" /></div><p className="section-eyebrow mt-6">Thank you</p><h1 className="text-4xl sm:text-5xl font-serif font-bold text-brand-brown mt-2">Order received</h1><p className="mt-4 text-brand-brown/65">Your order request has been recorded. We will contact you on {order.customer.phone} to confirm the next steps.</p><div className="card text-left p-6 mt-8"><div className="flex justify-between gap-4 pb-4 border-b border-brand-brown/10"><span className="text-sm text-brand-brown/60">Order ID</span><span className="font-semibold text-brand-brown">{order.orderId}</span></div><div className="flex justify-between gap-4 py-4 border-b border-brand-brown/10"><span className="text-sm text-brand-brown/60">Items</span><span className="font-semibold text-brand-brown">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</span></div><div className="flex justify-between gap-4 pt-4"><span className="text-sm text-brand-brown/60">Order total</span><span className="font-bold text-brand-red">{formatPrice(order.total)}</span></div></div><div className="mt-8 flex flex-col sm:flex-row justify-center gap-3"><Link to="/shop" className="btn-primary">Continue Shopping <ArrowRight className="w-4 h-4" /></Link><Link to="/contact" className="btn-outline"><Package className="w-4 h-4" /> Contact Support</Link></div></div></section></>;
}
