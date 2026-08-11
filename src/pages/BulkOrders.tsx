import { SEO, breadcrumbSchema } from '../components/SEO';
import { PageHero } from '../components/Section';
import { FormField, FormStatusMessage, SubmitButton, useFormState, validators, simulateSubmit, FormContainer } from '../components/Form';
import { ProductService } from '../services/product-service';
import { CATEGORY_LABELS } from '../data/products';
import { brand } from '../data/brand';
import { Package, Phone, Mail, MessageCircle } from 'lucide-react';

const productOptions = ProductService.getAllProducts().map((p) => `${p.name} (${p.variant})`);

export default function BulkOrders() {
  const form = useFormState({
    businessName: '',
    contactPerson: '',
    phone: '',
    email: '',
    location: '',
    products: '',
    quantity: '',
    message: '',
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = form.validate({
      businessName: validators.required(),
      contactPerson: validators.required(),
      phone: validators.phone(),
      email: validators.email(),
      location: validators.required(),
      products: validators.required(),
      quantity: validators.required(),
    });
    if (!valid) return;
    form.setStatus('submitting');
    await simulateSubmit(form.values);
    form.setStatus('success');
    form.reset();
  };

  return (
    <>
      <SEO
        title="Bulk Orders"
        description="Request bulk supply of Kawad Swad premium papads from Nimar for your business, event or institution. Tell us your requirements and we will get back to you."
        path="/bulk-orders"
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Business', path: '/business' },
          { name: 'Bulk Orders', path: '/bulk-orders' },
        ])}
      />

      <PageHero
        eyebrow="B2B"
        title="Bulk Orders"
        description="Large-quantity supply of premium papads from Nimar for businesses, events and institutions. Tell us what you need and we will prepare a supply plan for you."
      />

      <section className="container-max container-px py-12 lg:py-16">
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 items-start">
          {/* Form */}
          <div className="card p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-brand-brown">Bulk Supply Request</h2>
                <p className="text-sm text-brand-brown/55">Fill in your requirements and we will contact you.</p>
              </div>
            </div>

            {form.status === 'success' && (
              <div className="mb-5">
                <FormStatusMessage status="success" successMsg="Your bulk supply request has been received. We will contact you shortly." />
              </div>
            )}

            <form onSubmit={submit} noValidate>
              <FormContainer>
                <FormField label="Business Name" name="businessName" value={form.values.businessName} onChange={(v) => form.setValue('businessName', v)} error={form.errors.businessName} required placeholder="Your business name" />
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label="Contact Person" name="contactPerson" value={form.values.contactPerson} onChange={(v) => form.setValue('contactPerson', v)} error={form.errors.contactPerson} required placeholder="Contact person name" />
                  <FormField label="Phone" name="phone" type="tel" value={form.values.phone} onChange={(v) => form.setValue('phone', v)} error={form.errors.phone} required placeholder="10-digit phone" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label="Email" name="email" type="email" value={form.values.email} onChange={(v) => form.setValue('email', v)} error={form.errors.email} required placeholder="you@business.com" />
                  <FormField label="Location" name="location" value={form.values.location} onChange={(v) => form.setValue('location', v)} error={form.errors.location} required placeholder="City, State" />
                </div>
                <FormField label="Products Interested In" name="products" type="select" value={form.values.products} onChange={(v) => form.setValue('products', v)} error={form.errors.products} required options={productOptions} />
                <FormField label="Estimated Quantity" name="quantity" value={form.values.quantity} onChange={(v) => form.setValue('quantity', v)} error={form.errors.quantity} required placeholder="e.g. 50 packs, 100kg, etc." />
                <FormField label="Message" name="message" type="textarea" value={form.values.message} onChange={(v) => form.setValue('message', v)} rows={4} placeholder="Any additional details about your requirement" />
              </FormContainer>
              <div className="mt-6">
                <SubmitButton status={form.status} label="Request Bulk Supply" />
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="space-y-4 lg:sticky lg:top-24">
            <div className="card p-6">
              <h3 className="font-serif font-semibold text-brand-brown mb-3">Prefer to talk?</h3>
              <p className="text-sm text-brand-brown/60 mb-4">Reach out directly and we will help you with your bulk order.</p>
              <div className="space-y-3">
                <a href={brand.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-brand-brown">WhatsApp</p>
                    <p className="text-2xs text-brand-brown/50">{brand.phone}</p>
                  </div>
                </a>
                <a href={`tel:${brand.phoneRaw}`} className="flex items-center gap-3 p-3 rounded-xl bg-brand-cream-dark hover:bg-brand-brown/10 transition-colors">
                  <Phone className="w-5 h-5 text-brand-red" />
                  <div>
                    <p className="text-sm font-medium text-brand-brown">Phone</p>
                    <p className="text-2xs text-brand-brown/50">{brand.phone}</p>
                  </div>
                </a>
                <a href={`mailto:${brand.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-brand-cream-dark hover:bg-brand-brown/10 transition-colors">
                  <Mail className="w-5 h-5 text-brand-red" />
                  <div>
                    <p className="text-sm font-medium text-brand-brown">Email</p>
                    <p className="text-2xs text-brand-brown/50">{brand.email}</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="card p-6 bg-brand-brown text-brand-cream">
              <h3 className="font-serif font-semibold text-white mb-2">Product Range</h3>
              <p className="text-sm text-brand-cream/70 mb-4">Available in moong, chana, urad and combo packs.</p>
              <div className="space-y-1.5">
                {(['moong', 'chana', 'urad', 'combo'] as const).map((cat) => (
                  <div key={cat} className="flex items-center gap-2 text-sm text-brand-cream/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" />
                    {CATEGORY_LABELS[cat]} Papad
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
