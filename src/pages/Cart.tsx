import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { SEO } from '../components/SEO';
import { PageHero } from '../components/Section';
import { useCart, formatPrice } from '../context/CartContext';
import { ProductService } from '../services/product-service';
import { PACK_LABELS } from '../data/products';

export default function Cart() {
  const { items, subtotal, shippingTotal, total, updateQuantity, removeItem, addItem } = useCart();

  // Resolve item details on the fly from ProductService canonical data
  const resolvedItems = items.map((item) => {
    const res = ProductService.getProductBySku(item.sku);
    return {
      ...item,
      product: res?.family,
      skuObj: res?.skuObj,
    };
  });

  return (
    <>
      <SEO title="Cart" description="Review your Kawad Swad papad order before checkout." path="/cart" />
      <PageHero eyebrow="Your Order" title="Shopping Cart" description="Review your selected papads and continue when you are ready." />
      <section className="container-max container-px py-12">
        {items.length === 0 ? (
          <div className="card max-w-xl mx-auto p-12 text-center">
            <ShoppingBag className="w-12 h-12 text-brand-brown/20 mx-auto mb-4" />
            <h2 className="text-2xl font-serif font-bold text-brand-brown">Your cart is empty</h2>
            <p className="mt-2 text-sm text-brand-brown/60">Explore our papads and find your next favourite flavour.</p>
            <Link to="/shop" className="btn-primary mt-6">Browse Papads <ArrowRight className="w-4 h-4" /></Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
            <div className="space-y-3">
              {resolvedItems.map(({ sku, quantity, product, skuObj }) => {
                if (!product || !skuObj) return null;
                const packLabel = PACK_LABELS[skuObj.packSize] || `${skuObj.packSize}g`;

                return (
                  <div key={sku} className="card p-4 sm:p-5 flex gap-4 items-center">
                    <div className="w-20 h-20 rounded-xl bg-brand-cream-dark flex items-center justify-center shrink-0">
                      <span className="text-3xl text-brand-red/20">◯</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link to={`/product/${product.slug}`} className="font-serif font-semibold text-brand-brown hover:text-brand-red">
                        {product.name}
                      </Link>
                      <p className="text-xs text-brand-brown/60 mt-1">
                        {product.variant} · {packLabel} · {sku}
                      </p>
                      <p className="text-sm font-bold text-brand-red mt-2">{formatPrice(skuObj.websitePrice)}</p>
                    </div>
                    <div className="flex items-center border border-brand-brown/15 rounded-lg">
                      <button
                        onClick={() => updateQuantity(sku, quantity - 1)}
                        className="p-2 hover:bg-brand-brown/5"
                        aria-label={`Decrease quantity`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center text-sm font-semibold">{quantity}</span>
                      <button
                        onClick={() => addItem(sku, 1)}
                        className="p-2 hover:bg-brand-brown/5"
                        aria-label={`Increase quantity`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(sku)}
                      className="p-2 text-brand-brown/40 hover:text-brand-red"
                      aria-label={`Remove item`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
              <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-brand-brown hover:text-brand-red">
                <ArrowRight className="w-4 h-4 rotate-180" /> Continue shopping
              </Link>
            </div>
            <aside className="card p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-serif font-bold text-brand-brown mb-5">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-brand-brown/65">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-brand-brown/65">
                  <span>Shipping</span>
                  <span>{shippingTotal ? formatPrice(shippingTotal) : 'Free'}</span>
                </div>
                <div className="border-t border-brand-brown/10 pt-3 flex justify-between text-lg font-bold text-brand-brown">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
              <Link to="/checkout" className="btn-primary w-full mt-6">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-2xs text-brand-brown/45 text-center mt-3">Payment gateway will be added before launch.</p>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
