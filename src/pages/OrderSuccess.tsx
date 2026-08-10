import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, ShoppingBag } from 'lucide-react';
import { SEO } from '../components/SEO';
import { useOrder } from '../context/OrderContext';
import { formatPrice } from '../context/CartContext';
import { ProductService } from '../services/product-service';
import { PACK_LABELS } from '../data/products';

export default function OrderSuccess() {
  const { lastOrder } = useOrder();

  if (!lastOrder) {
    return (
      <>
        <SEO title="Order Unavailable" description="Order information is currently unavailable." path="/order-success" />
        <section className="container-max container-px py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-10 h-10 text-brand-brown/30" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-brand-brown mt-4">Order information unavailable</h1>
          <p className="mt-2 text-sm text-brand-brown/60 max-w-md mx-auto">
            We could not find your recent order details, or the session has expired.
          </p>
          <div className="mt-8">
            <Link to="/shop" className="btn-primary">
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </>
    );
  }

  const resolvedItems = lastOrder.items.map((item) => {
    const res = ProductService.getProductBySku(item.sku);
    return {
      ...item,
      product: res?.family,
      skuObj: res?.skuObj,
    };
  });

  const totalUnits = lastOrder.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <SEO title="Order Received" description="Your Kawad Swad order request has been received." path="/order-success" />
      <section className="container-max container-px py-16 lg:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <p className="section-eyebrow mt-6">Thank you</p>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-brand-brown mt-2">Order received</h1>
          <p className="mt-4 text-brand-brown/65">
            Your order request has been recorded. We will contact you on {lastOrder.customer.phone} to confirm the next steps.
          </p>

          <div className="card text-left p-6 mt-8 space-y-4">
            <div className="flex justify-between gap-4 pb-4 border-b border-brand-brown/10">
              <span className="text-sm text-brand-brown/60">Order ID</span>
              <span className="font-semibold font-mono text-brand-brown">{lastOrder.orderId}</span>
            </div>
            <div className="flex justify-between gap-4 pb-4 border-b border-brand-brown/10">
              <span className="text-sm text-brand-brown/60">Total Units</span>
              <span className="font-semibold text-brand-brown">{totalUnits} item{totalUnits !== 1 ? 's' : ''}</span>
            </div>

            {/* Itemized Breakdown */}
            <div className="py-2 space-y-2 border-b border-brand-brown/10">
              <p className="text-xs font-semibold text-brand-brown/50 uppercase tracking-wider mb-2">Ordered Items</p>
              {resolvedItems.map(({ sku, quantity, product, skuObj }) => {
                if (!product || !skuObj) return null;
                const packLabel = PACK_LABELS[skuObj.packSize] || `${skuObj.packSize}g`;
                return (
                  <div key={sku} className="flex justify-between text-sm">
                    <span className="text-brand-brown/70">{product.name} ({packLabel}) × {quantity}</span>
                    <span className="font-medium">{formatPrice(skuObj.websitePrice * quantity)}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between gap-4 pt-2">
              <span className="text-sm text-brand-brown/60">Order total (incl. shipping)</span>
              <span className="font-bold text-brand-red text-lg">{formatPrice(lastOrder.total)}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/shop" className="btn-primary">
              Continue Shopping <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-outline">
              <Package className="w-4 h-4" /> Contact Support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
