import { SEO, breadcrumbSchema } from '@/components/SEO';
import { PageHero, PlaceholderImage } from '@/components/Section';
import { Reveal, CTABanner } from '@/components/Reveal';
import { brand } from '@/data/brand';
import { Leaf, Shield, Factory, Check } from 'lucide-react';

const steps = [
  { num: '01', title: 'Ingredient Preparation', desc: 'Premium lentil flours and natural spices are measured and prepared with care, forming the base of every papad.' },
  { num: '02', title: 'Papad Preparation', desc: 'The dough is prepared and shaped into papads following traditional methods, preserving the authentic texture and taste.' },
  { num: '03', title: 'Drying', desc: 'Shaped papads are dried under controlled conditions to achieve the right crispness and shelf stability.' },
  { num: '04', title: 'Quality Checking', desc: 'Every batch is checked for consistency, texture and quality before it moves to packaging.' },
  { num: '05', title: 'Packaging', desc: 'Papads are sealed in hygienic packaging designed to preserve freshness from our facility to your kitchen.' },
];

export default function Manufacturing() {
  return (
    <>
      <SEO
        title="Manufacturing"
        description="Explore the Kawad Swad manufacturing process — from ingredient preparation to packaging — built on traditional recipes and modern quality standards."
        path="/manufacturing"
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Manufacturing', path: '/manufacturing' },
        ])}
      />

      <PageHero
        eyebrow="Our Process"
        title="Manufacturing"
        description="A process built on tradition and precision. Every stage — from ingredients to packaging — is designed to preserve authentic taste while meeting modern quality standards."
      />

      {/* Process steps */}
      <section className="container-max container-px py-16">
        <div className="space-y-12">
          {steps.map((step, i) => (
            <Reveal key={i}>
              <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${i % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
                <div className="lg:[direction:ltr]">
                  <PlaceholderImage label={`${step.title} — placeholder`} aspect="aspect-[4/3]" />
                </div>
                <div className="lg:[direction:ltr]">
                  <span className="text-5xl font-serif font-bold text-brand-red/15 block mb-2">{step.num}</span>
                  <h2 className="text-2xl lg:text-3xl font-serif font-bold text-brand-brown mb-3">{step.title}</h2>
                  <p className="text-base text-brand-brown/70 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-brand-brown text-brand-cream py-16">
        <div className="container-max container-px">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-yellow mb-3">Manufacturing Philosophy</p>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4 text-balance">
                Traditional taste, modern standards.
              </h2>
              <p className="text-base lg:text-lg text-brand-cream/70 leading-relaxed text-pretty">
                We believe that great papad is not mass-produced — it is crafted. Our manufacturing combines time-honoured recipes with hygienic, consistent processes. We do not chase shortcuts. We invest in quality at every step, because the taste of a papad is only as good as the care behind it.
              </p>
              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Leaf, title: 'Authentic Recipes', desc: 'True to Nimar tradition' },
                  { icon: Shield, title: 'Hygienic Process', desc: 'FSSAI ' + brand.fssai },
                  { icon: Factory, title: 'Consistent Quality', desc: 'Every batch, every pack' },
                ].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-brand-cream/5">
                    <item.icon className="w-6 h-6 text-brand-yellow mb-2" />
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <p className="text-2xs text-brand-cream/50">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Standards */}
      <section className="container-max container-px py-16">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="section-eyebrow mb-3">Our Standards</p>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-brown text-balance">
              Quality you can trust
            </h2>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            'FSSAI licensed facility',
            '100% vegetarian production',
            'Jain-friendly ingredients',
            'Sealed, hygienic packaging',
            'Consistent batch quality',
            'Natural spices, no shortcuts',
            'Careful ingredient sourcing',
            'Quality checks at every stage',
          ].map((point, i) => (
            <Reveal key={i} delay={i * 40}>
              <div className="flex items-start gap-3 p-4 card">
                <Check className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <span className="text-sm text-brand-brown/70">{point}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABanner
        title="Want to see it for yourself?"
        description="We welcome business partners who want to understand our process. Get in touch to learn more."
        primaryLabel="Contact Us"
        primaryLink="/contact"
        secondaryLabel="View Products"
        secondaryLink="/products"
      />
    </>
  );
}
