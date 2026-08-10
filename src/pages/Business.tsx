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
        eyebrow="B2B"
        title="Built for Consumers. Ready for Business."
        description="We work with retailers, wholesalers, distributors, hotels, restaurants and food businesses across India. Find the right partnership for your needs."
      />

      {/* Business options */}
      <section className="container-max container-px py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Package, title: 'Bulk Orders', desc: 'Large-quantity supply for businesses, events and institutions.', link: '/bulk-orders', cta: 'Request Bulk Supply' },
            { icon: Store, title: 'Distributor', desc: 'Partner with Kawad Swad to bring our papads to your region.', link: '/distributor', cta: 'Become a Distributor' },
            { icon: Factory, title: 'Manufacturing', desc: 'Learn about our manufacturing capabilities and quality standards.', link: '/manufacturing', cta: 'View Manufacturing' },
            { icon: Utensils, title: 'Work With Us', desc: 'Hotels, restaurants, caterers and food businesses welcome.', link: '/work-with-us', cta: 'Get in Touch' },
            { icon: Users, title: 'Business Enquiry', desc: 'General business partnerships and collaboration opportunities.', link: '/contact', cta: 'Contact Us' },
            { icon: Store, title: 'Shop Wholesale', desc: 'Browse our full product range and place an order.', link: '/shop', cta: 'Visit Shop' },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="card p-6 hover:shadow-lift transition-shadow h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-brand-yellow/15 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-brand-brown" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-brand-brown mb-2">{item.title}</h3>
                <p className="text-sm text-brand-brown/60 mb-4 leading-relaxed flex-1">{item.desc}</p>
                <Link to={item.link} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-red hover:gap-2 transition-all">
                  {item.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Who we serve */}
      <section className="bg-brand-cream-dark py-16">
        <div className="container-max container-px">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <p className="section-eyebrow mb-3">Who We Serve</p>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-brown text-balance">
                Partners across the food ecosystem
              </h2>
            </div>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              'Retailers',
              'Wholesalers',
              'Distributors',
              'Hotels',
              'Restaurants',
              'Food Businesses',
            ].map((target, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="card p-5 text-center">
                  <div className="w-10 h-10 rounded-full bg-brand-red/5 flex items-center justify-center mx-auto mb-3">
                    <Check className="w-5 h-5 text-brand-red" />
                  </div>
                  <p className="text-sm font-medium text-brand-brown">{target}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why partner */}
      <section className="container-max container-px py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <p className="section-eyebrow mb-3">Why Partner</p>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-brown mb-4">
                A brand built for lasting partnerships.
              </h2>
              <ul className="space-y-3">
                {[
                  'Authentic Jain papad with broad consumer appeal',
                  'Consistent quality from modern manufacturing',
                  'Growing product range across moong, chana and urad',
                  'Flexible supply for businesses of different sizes',
                  'Responsive communication and reliable fulfilment',
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-brand-brown/70">
                    <Check className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/bulk-orders" className="btn-primary">
                  Request Bulk Supply
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/distributor" className="btn-outline">
                  Become a Distributor
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="card p-8 bg-brand-brown text-brand-cream">
              <h3 className="text-xl font-serif font-bold text-white mb-4">Get in touch</h3>
              <p className="text-sm text-brand-cream/70 mb-6">
                Tell us about your business and what you need. We will get back to you to discuss how we can work together.
              </p>
              <div className="space-y-3 text-sm">
                <a href={`tel:${brand.phoneRaw}`} className="flex items-center gap-2 text-brand-cream/80 hover:text-brand-yellow transition-colors">
                  <span className="w-8 h-8 rounded-full bg-brand-cream/10 flex items-center justify-center"><Package className="w-4 h-4" /></span>
                  {brand.phone}
                </a>
                <a href={brand.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-brand-cream/80 hover:text-brand-yellow transition-colors">
                  <span className="w-8 h-8 rounded-full bg-brand-cream/10 flex items-center justify-center"><Users className="w-4 h-4" /></span>
                  WhatsApp: {brand.phone}
                </a>
                <a href={`mailto:${brand.email}`} className="flex items-center gap-2 text-brand-cream/80 hover:text-brand-yellow transition-colors">
                  <span className="w-8 h-8 rounded-full bg-brand-cream/10 flex items-center justify-center"><Utensils className="w-4 h-4" /></span>
                  {brand.email}
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
