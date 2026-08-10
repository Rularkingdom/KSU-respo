import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Lock, ShoppingBag } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { FormField, FormStatusMessage, SubmitButton, useFormState, validators, simulateSubmit, FormContainer } from '@/components/Form';
import { useCart, formatPrice } from '@/context/CartContext';
import { useOrder, type CustomerInfo } from '@/context/OrderContext';
import { PACK_LABELS } from '@/data/products';

const initial: CustomerInfo = { fullName: '', phone: '', email: '', address: '', city: '', state: '', pincode: '' };

export default function Checkout() {
  const { items, subtotal, totalShipping, total, clearCart } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();
  const form = useFormState(initial);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = form.validate({ fullName: validators.required(), phone: validators.phone(), email: validators.email(), address: validators.required(), city: validators.required(), state: validators.required(), pincode: validators.pincode() });
    if (!valid || items.length === 0) return;
    form.setStatus('submitting');
    setError('');
    try {
      await simulateSubmit(form.values);
      placeOrder(form.values, items, { subtotal, totalShipping, total });
      clearCart();
      navigate('/order-success');
    } catch {
      setError('We could not submit your order. Please try again.');
      form.setStatus('error');
    }
  };

  if (items.length === 0) return <><SEO title="Checkout" description="Complete your Kawad Swad order." path="/checkout" /><div className="container-max container-px py-20 text-center"><ShoppingBag className="w-12 h-12 mx-auto text-brand-brown/20" /><h1 className="text-3xl font-serif font-bold mt-4">Your cart is empty</h1><Link to="/shop" className="btn-primary mt-6">Shop Papads</Link></div></>;

  return <>
    <SEO title="Checkout" description="Complete your Kawad Swad papad order." path="/checkout" />
    <div className="container-max container-px py-10 lg:py-14">
      <div className="flex items-center gap-2 text-xs text-brand-brown/50 mb-8"><Link to="/cart" className="hover:text-brand-red">Cart</Link><ArrowRight className="w-3 h-3" /><span>Checkout</span></div>
      <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
        <form onSubmit={submit} className="card p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-7"><div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center"><Lock className="w-5 h-5 text-brand-red" /></div><div><h1 className="text-2xl font-serif font-bold">Delivery details</h1><p className="text-sm text-brand-brown/55">We will use these details to fulfil your order.</p></div></div>
          <FormContainer>
            <FormField label="Full Name" name="fullName" value={form.values.fullName} onChange={(v) => form.setValue('fullName', v)} error={form.errors.fullName} required autoComplete="name" placeholder="Your full name" />
            <div className="grid sm:grid-cols-2 gap-4"><FormField label="Phone" name="phone" type="tel" value={form.values.phone} onChange={(v) => form.setValue('phone', v)} error={form.errors.phone} required autoComplete="tel" placeholder="10-digit phone number" /><FormField label="Email" name="email" type="email" value={form.values.email} onChange={(v) => form.setValue('email', v)} error={form.errors.email} required autoComplete="email" placeholder="you@example.com" /></div>
            <FormField label="Address" name="address" type="textarea" value={form.values.address} onChange={(v) => form.setValue('address', v)} error={form.errors.address} required placeholder="House number, street, area" rows={3} />
            <div className="grid sm:grid-cols-3 gap-4"><FormField label="City" name="city" value={form.values.city} onChange={(v) => form.setValue('city', v)} error={form.errors.city} required /><FormField label="State" name="state" value={form.values.state} onChange={(v) => form.setValue('state', v)} error={form.errors.state} required /><FormField label="PIN Code" name="pincode" type="text" value={form.values.pincode} onChange={(v) => form.setValue('pincode', v)} error={form.errors.pincode} required placeholder="6 digits" /></div>
          </FormContainer>
          {error && <div className="mt-5"><FormStatusMessage status="error" successMsg="" /></div>}
          <div className="mt-7 flex flex-col sm:flex-row gap-3 items-center justify-between"><Link to="/cart" className="inline-flex items-center gap-2 text-sm text-brand-brown/65 hover:text-brand-red"><ArrowLeft className="w-4 h-4" /> Back to cart</Link><SubmitButton status={form.status} label="Place Order" /></div>
          <p className="mt-5 text-2xs text-brand-brown/45 text-center">This checkout creates an order request. Online payment is not connected yet.</p>
        </form>
        <aside className="card p-6 lg:sticky lg:top-24"><h2 className="text-xl font-serif font-bold mb-5">Order Summary</h2><div className="space-y-3 mb-5">{items.map((item) => <div key={item.sku} className="flex justify-between gap-3 text-sm"><span className="text-brand-brown/65">{item.productName} · {PACK_LABELS[item.packSize]} × {item.quantity}</span><span className="font-medium whitespace-nowrap">{formatPrice(item.unitPrice * item.quantity)}</span></div>)}</div><div className="border-t border-brand-brown/10 pt-4 space-y-2 text-sm"><div className="flex justify-between text-brand-brown/65"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div><div className="flex justify-between text-brand-brown/65"><span>Shipping</span><span>{totalShipping ? formatPrice(totalShipping) : 'Free'}</span></div><div className="flex justify-between text-lg font-bold pt-2"><span>Total</span><span className="text-brand-red">{formatPrice(total)}</span></div></div></aside>
      </div>
    </div>
  </>;
}
