import { Link } from 'react-router-dom';
import { Package, Store, Utensils, Factory, Users, ArrowRight, Check } from 'lucide-react';
import { SEO, breadcrumbSchema } from '@/components/SEO';
import { PageHero } from '@/components/Section';
import { Reveal, CTABanner } from '@/components/Reveal';
import { brand } from '@/data/brand';

export default function Business() {
  return (
    <>
      <SEO
        title="Business Hub"
        description="Kawad Swad partners with retailers, wholesalers, distributors, hotels, restaurants and food businesses across India. Explore bulk orders, distribution and manufacturing."
        path="/business"
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Business', path: '/business' },
        ])}
      />

      <PageHero
        eyebrow="B2B Partnerships"
        title="Built for Consumers. Ready for Business."
        description="We work with retailers, wholesalers, distributors, hotels, restaurants and food businesses across India. Find the right partnership for your commercial needs."
      />

      {/* Business options */}
      <section className="container-max container-px py-16 lg:py-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Package, title: 'Bulk Orders', desc: 'Large-quantity supply for businesses, events and institutions.', link: '/bulk-orders', cta: 'Request Bulk Supply' },
            { icon: Store, title: 'Distributor', desc: 'Partner with Kawad Swad to bring our papads to your region.', link: '/distributor', cta: 'Become a Distributor' },
            { icon: Factory, title: 'Manufacturing', desc: 'Learn about our manufacturing capabilities and quality standards.', link: '/manufacturing', cta: 'View Manufacturing' },
            { icon: Utensils, title: 'Work With Us', desc: 'Hotels, restaurants, caterers and food businesses welcome.', link: '/work-with-us', cta: 'Get in Touch' },
            { icon: Users, title: 'Business Enquiry', desc: 'General business partnerships and collaboration opportunities.', link: '/contact', cta: 'Contact Us' },
            { icon: Store, title: 'Shop Wholesale', desc: 'Browse our full product range and place an order.', link: '/shop', cta: 'Visit Shop' },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="card p-8 bg-white border border-brand-brown/5 shadow-soft hover:shadow-lift transition-all h-full flex flex-col justify-between">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-cream-dark flex items-center justify-center mb-6 border border-brand-brown/5">
                    <item.icon className="w-6 h-6 text-brand-red" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-brand-brown mb-3">{item.title}</h3>
                  <p className="text-sm text-brand-brown/65 mb-6 leading-relaxed">{item.desc}</p>
                </div>
                <Link to={item.link} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-red hover:gap-3 transition-all pt-4 border-t border-brand-brown/5">
                  {item.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Who we serve */}
      <section className="bg-brand-cream-dark py-20 border-y border-brand-brown/5">
        <div className="container-max container-px">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="section-eyebrow mb-3 block">Who We Serve</span>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-brown">
                Partners across the food ecosystem
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              'Retailers',
              'Wholesalers',
              'Distributors',
              'Hotels',
              'Restaurants',
              'Food Businesses',
            ].map((target, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="card p-6 text-center bg-white border border-brand-brown/5 shadow-soft">
                  <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-5 h-5 text-brand-red" />
                  </div>
                  <p className="text-sm font-semibold text-brand-brown">{target}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why partner */}
      <section className="container-max container-px py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <span className="section-eyebrow mb-3 block">Why Partner With Us</span>
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-brand-brown mb-6 leading-tight">
                A brand built for lasting partnerships.
              </h2>
              <ul className="space-y-4 mb-8">
                {[
                  'Authentic papad with broad consumer appeal',
                  'Consistent quality from modern manufacturing standards',
                  'Growing product range across moong, chana and urad varieties',
                  'Flexible supply chain for businesses of different sizes',
                  'Responsive communication and reliable fulfilment',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-brand-brown/75 leading-relaxed">
                    <Check className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link to="/bulk-orders" className="btn-primary px-8">Request Bulk Supply</Link>
                <Link to="/distributor" className="btn-outline px-8">Become a Distributor</Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="card p-8 lg:p-10 bg-brand-brown text-brand-cream shadow-lift border-0">
              <h3 className="text-2xl font-serif font-bold text-white mb-4">Direct Commercial Support</h3>
              <p className="text-sm text-brand-cream/80 mb-8 leading-relaxed">
                Tell us about your business requirements. Our commercial team will connect with you to discuss pricing, logistics, and customized partnership terms.
              </p>
              <div className="space-y-4 text-sm font-medium">
                <a href={`tel:${brand.phoneRaw}`} className="flex items-center gap-3 text-brand-cream hover:text-brand-yellow transition-colors p-3 rounded-xl bg-white/5">
                  <span className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0">📞</span>
                  <span>{brand.phone}</span>
                </a>
                <a href={brand.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-brand-cream hover:text-brand-yellow transition-colors p-3 rounded-xl bg-white/5">
                  <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">💬</span>
                  <span>WhatsApp Commercial Desk</span>
                </a>
                <a href={`mailto:${brand.email}`} className="flex items-center gap-3 text-brand-cream hover:text-brand-yellow transition-colors p-3 rounded-xl bg-white/5">
                  <span className="w-8 h-8 rounded-full bg-brand-yellow text-brand-brown flex items-center justify-center shrink-0">✉️</span>
                  <span>{brand.email}</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner
        title="Let's build something together."
        description="Whether you need bulk supply, a distribution partnership or a custom collaboration, we would love to hear from you."
        primaryLabel="Request Bulk Supply"
        primaryLink="/bulk-orders"
        secondaryLabel="Become a Distributor"
        secondaryLink="/distributor"
      />
    </>
  );
}
