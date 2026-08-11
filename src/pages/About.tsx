import { Link } from 'react-router-dom';
import { Leaf, Shield, Factory, Heart, ArrowRight, MapPin } from 'lucide-react';
import { SEO, breadcrumbSchema } from '@/components/SEO';
import { PageHero, PlaceholderImage } from '@/components/Section';
import { Reveal, CTABanner } from '@/components/Reveal';
import { brand } from '@/data/brand';

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Kawad Swad is a premium papad brand from Nimar, Madhya Pradesh, crafting authentic papads with traditional taste and modern manufacturing standards."
        path="/about"
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      <PageHero
        eyebrow="Our Story"
        title="From Nimar, with tradition."
        description="Kawad Swad brings the authentic taste of Nimar's papad-making tradition to homes across India — with the quality standards of a modern food brand."
      />

      {/* Story */}
      <section className="container-max container-px py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <p className="section-eyebrow mb-3">The Region</p>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-brown mb-4">
                Nimar, Madhya Pradesh
              </h2>
              <div className="space-y-4 text-base text-brand-brown/70 leading-relaxed">
                <p>
                  Nimar is a region in Madhya Pradesh with a deep tradition of food craftsmanship. It is the home of Kawad Swad — a brand built on the belief that traditional taste deserves a modern platform.
                </p>
                <p>
                  Our papads carry the flavour of this region: authentic, warm and unmistakably Indian. We work with local ingredients and time-honoured recipes to create papads that taste the way papad should.
                </p>
                <p className="font-devanagari text-brand-brown/80">
                  {brand.tagline}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <PlaceholderImage label="Nimar region — landscape placeholder" aspect="aspect-[4/3]" />
          </Reveal>
        </div>
      </section>

      {/* Heritage & Craft */}
      <section className="bg-brand-cream-dark py-16">
        <div className="container-max container-px">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-14 h-14 rounded-2xl bg-brand-red/5 flex items-center justify-center mx-auto mb-5">
                <Leaf className="w-7 h-7 text-brand-red" />
              </div>
              <p className="section-eyebrow mb-3">Traditional Craftsmanship</p>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-brown mb-4 text-balance">
                Rooted in heritage, made with care.
              </h2>
              <p className="text-base text-brand-brown/70 leading-relaxed text-pretty">
                Our papads are 100% vegetarian, prepared following authentic regional recipes and quality ingredients. We offer both traditional spiced varieties and special dietary options across our product range to suit different households.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-3 gap-6">
            {[
              { icon: Leaf, title: '100% Vegetarian', desc: 'Strictly vegetarian selection with careful ingredient sourcing.' },
              { icon: Shield, title: 'Traditional Flavours', desc: 'Authentic Nimar recipes and spice blends.' },
              { icon: Heart, title: 'Made with Care', desc: 'Every batch prepared with attention to quality and crispness.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="card p-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-brand-red/5 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-brand-red" />
                  </div>
                  <h3 className="text-lg font-serif font-semibold text-brand-brown mb-2">{item.title}</h3>
                  <p className="text-sm text-brand-brown/60">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quality & Manufacturing */}
      <section className="container-max container-px py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <PlaceholderImage label="Quality & manufacturing placeholder" aspect="aspect-[4/3]" />
          </Reveal>
          <Reveal delay={150}>
            <div>
              <p className="section-eyebrow mb-3">Quality & Manufacturing</p>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-brown mb-4">
                Tradition meets modern standards.
              </h2>
              <div className="space-y-4 text-base text-brand-brown/70 leading-relaxed">
                <p>
                  We believe that traditional taste and modern quality are not opposites — they are partners. Our manufacturing follows hygienic practices and consistent quality standards, while our recipes stay true to their roots.
                </p>
                <p>
                  From ingredient selection to final packaging, every step is designed to preserve the flavour, freshness and character that define a great papad.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/manufacturing" className="btn-secondary">
                  See Our Manufacturing
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/products" className="btn-outline">
                  Explore Products
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Brand Vision */}
      <section className="bg-brand-brown text-brand-cream py-16">
        <div className="container-max container-px">
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-yellow mb-3">Our Vision</p>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4 text-balance">
                To bring the taste of Nimar to every Indian home.
              </h2>
              <p className="text-base lg:text-lg text-brand-cream/70 leading-relaxed text-pretty">
                We see a future where Kawad Swad is a trusted name in Indian kitchens — a brand that stands for authentic taste, clean ingredients and dependable quality. We are still early in this journey, and we are building it with honesty and care.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 text-sm text-brand-cream/60">
                <span className="flex items-center gap-2"><Factory className="w-4 h-4 text-brand-yellow" /> {brand.manufacturer}</span>
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-brand-yellow" /> {brand.region}</span>
                <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-brand-yellow" /> FSSAI {brand.fssai}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner
        title="Taste the tradition."
        description="Explore our full range of premium papads, crafted in Nimar with care."
        primaryLabel="Shop Papads"
        primaryLink="/shop"
        secondaryLabel="Contact Us"
        secondaryLink="/contact"
      />
    </>
  );
}
