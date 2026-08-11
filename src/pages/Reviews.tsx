import { SEO, breadcrumbSchema } from '@/components/SEO';
import { PageHero } from '@/components/Section';
import { Reveal, CTABanner } from '@/components/Reveal';
import { FormField, FormStatusMessage, SubmitButton, useFormState, validators, simulateSubmit, FormContainer } from '@/components/Form';
import { Star, MessageSquare } from 'lucide-react';
import { brand } from '@/data/brand';

export default function Reviews() {
  const form = useFormState({
    name: '',
    email: '',
    rating: '',
    product: '',
    message: '',
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = form.validate({
      name: validators.required(),
      message: validators.required(),
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
        title="Reviews"
        description="Read and share reviews of Kawad Swad premium papads from Nimar. We are building a trusted review system with verified customer feedback."
        path="/reviews"
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Reviews', path: '/reviews' },
        ])}
      />

      <PageHero
        eyebrow="Community"
        title="Reviews"
        description="We are building a community of Kawad Swad lovers. Verified customer reviews will appear here as they come in. You can also share your own experience below."
      />

      {/* Reviews placeholder */}
      <section className="container-max container-px py-12">
        <Reveal>
          <div className="card max-w-2xl mx-auto p-8 lg:p-12 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-7 h-7 text-brand-brown/15" />
              ))}
            </div>
            <h2 className="text-xl font-serif font-semibold text-brand-brown mb-2">
              No reviews yet
            </h2>
            <p className="text-sm text-brand-brown/60 leading-relaxed max-w-md mx-auto">
              We believe in honest, verified feedback. Once customers receive and try our papads, their reviews will appear here. Be the first to share your experience.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Review form */}
      <section className="bg-brand-cream-dark py-16">
        <div className="container-max container-px">
          <div className="max-w-2xl mx-auto">
            <Reveal>
              <div className="text-center mb-8">
                <div className="w-12 h-12 rounded-2xl bg-brand-red/5 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-brand-red" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-brand-brown">Share Your Experience</h2>
                <p className="mt-2 text-brand-brown/60">Tell us what you think of Kawad Swad papads.</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="card p-6 sm:p-8">
                {form.status === 'success' && (
                  <div className="mb-5">
                    <FormStatusMessage status="success" successMsg="Thank you for your review. It will be published after verification." />
                  </div>
                )}
                <form onSubmit={submit} noValidate>
                  <FormContainer>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField label="Your Name" name="name" value={form.values.name} onChange={(v) => form.setValue('name', v)} error={form.errors.name} required />
                      <FormField label="Email (optional)" name="email" type="email" value={form.values.email} onChange={(v) => form.setValue('email', v)} />
                    </div>
                    <div>
                      <label htmlFor="rating" className="label-field">Rating <span className="text-brand-red">*</span></label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => form.setValue('rating', String(star))}
                            className="p-1 transition-transform hover:scale-110"
                            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                          >
                            <Star
                              className={`w-7 h-7 ${
                                Number(form.values.rating) >= star
                                  ? 'fill-brand-yellow text-brand-yellow'
                                  : 'text-brand-brown/20'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <FormField label="Product (optional)" name="product" value={form.values.product} onChange={(v) => form.setValue('product', v)} placeholder="Which papad did you try?" />
                    <FormField label="Your Review" name="message" type="textarea" value={form.values.message} onChange={(v) => form.setValue('message', v)} error={form.errors.message} required rows={5} placeholder="Share your experience..." />
                  </FormContainer>
                  <div className="mt-6">
                    <SubmitButton status={form.status} label="Submit Review" />
                  </div>
                  <p className="mt-3 text-2xs text-brand-brown/45 text-center">
                    Reviews are verified before publishing to ensure authenticity.
                  </p>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABanner
        title="Haven't tried our papads yet?"
        description="Browse our range and taste the tradition of Nimar for yourself."
        primaryLabel="Shop Papads"
        primaryLink="/shop"
        secondaryLabel="Contact Us"
        secondaryLink="/contact"
      />
    </>
  );
}
