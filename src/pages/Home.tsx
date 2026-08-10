import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  ArrowRight,
  Leaf,
  Shield,
  Factory,
  Award,
  Truck,
  Users,
  Package,
  Store,
  Utensils,
  Star,
  ArrowUpRight,
} from 'lucide-react';
import { SEO, organizationSchema } from '../components/SEO';
import { ProductCard } from '../components/ProductCard';
import { ProductImage } from '../components/ProductImage';
import { SectionHeading, PlaceholderImage } from '../components/Section';
import { Reveal, CTABanner } from '../components/Reveal';
import { ProductService } from '../services/product-service';
import { brand } from '../data/brand';
import { blogService } from '../data/blog';

export default function Home() {
  const featured = ProductService.getFeaturedProducts();
  const latestPosts = blogService.getAll().slice(0, 3);

  return (
    <>
      <SEO
        title="Premium Jain Papad from Nimar"
        description="Kawad Swad crafts premium Jain papads with authentic ingredients, traditional taste and modern manufacturing standards. Shop moong, chana and urad papad online."
        path="/"
        structuredData={organizationSchema()}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-cream-dark to-brand-cream pt-8 lg:pt-12 pb-16 lg:pb-24">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-red/5 rounded-full blur-3xl" />

        <div className="container-max container-px relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left */}
            <div className="animate-fade-up">
              <div className="flex items-center gap-2 mb-5">
                <span className="badge-red">Premium Jain Papad</span>
                <span className="badge-brown">{brand.region}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-brand-brown leading-[1.05] text-balance">
                The Taste of Nimar,
                <br />
                <span className="text-brand-red">Made with Tradition.</span>
              </h1>
              <p className="mt-6 text-base lg:text-lg text-brand-brown/70 max-w-xl text-pretty leading-relaxed">
                Premium Jain Papads crafted with authentic ingredients, traditional taste and modern manufacturing standards.
              </p>
              <p className="mt-2 font-devanagari text-lg text-brand-brown/60">
                {brand.tagline}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/shop" className="btn-primary">
                  <ShoppingBag className="w-5 h-5" />
                  Shop Papads
                </Link>
                <Link to="/products" className="btn-outline">
                  Explore Products
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <Link to="/business" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-brown hover:text-brand-red transition-colors">
                <Users className="w-4 h-4" />
                Wholesale & Distribution
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Right - Product hero */}
            <div className="relative animate-scale-in">
              <div className="relative perspective-1000">
                <div className="preserve-3d transition-transform duration-300" style={{ transform: 'rotateY(-8deg) rotateX(4deg)' }}>
                  <div className="relative aspect-square max-w-md mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/20 to-brand-red/10 rounded-4xl blur-2xl" />
                    <div className="relative card overflow-hidden shadow-lift rounded-4xl">
                      <ProductImage
                        product={featured[0] as any}
                        variant="hero"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-2 sm:right-4 bg-brand-yellow text-brand-brown px-4 py-2 rounded-full text-sm font-bold shadow-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  100% Veg
                </div>
                <div className="absolute -bottom-4 -left-2 sm:left-4 bg-white px-4 py-2 rounded-full text-sm font-semibold text-brand-brown shadow-card animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  FSSAI Licensed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-brand-brown/10 bg-white">
        <div className="container-max container-px py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Leaf, label: '100% Vegetarian', sub: 'Jain-friendly' },
              { icon: Shield, label: 'FSSAI Licensed', sub: brand.fssai },
              { icon: Award, label: 'Traditional Recipe', sub: 'Authentic Nimar taste' },
              { icon: Factory, label: 'Quality Manufacturing', sub: 'Modern standards' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-brand-red/5 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-brand-red" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-brown">{item.label}</p>
                  <p className="text-2xs text-brand-brown/50">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container-max container-px py-16 lg:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Our Papads"
            title="Featured Products"
            description="A selection of our most-loved papad varieties, crafted with premium lentils and natural spices."
          />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {featured.map((product, i) => (
            <Reveal key={product.id} delay={i * 80}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/products" className="btn-outline">
            View All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-brand-cream-dark py-16 lg:py-24">
        <div className="container-max container-px">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <p className="section-eyebrow mb-3">Our Story</p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-brown text-balance">
                  From Nimar, with the taste of tradition.
                </h2>
                <div className="mt-6 space-y-4 text-base text-brand-brown/70 leading-relaxed">
                  <p>
                    Kawad Swad is a premium Jain papad brand from Nimar, Madhya Pradesh. We bring the traditional taste of the region to homes across India.
                  </p>
                  <p>
                    Our papads are made with authentic lentils and natural spices, following Jain food philosophy — 100% vegetarian, without onion or garlic. Every batch reflects our commitment to quality and tradition.
                  </p>
                  <p className="font-devanagari text-brand-brown/80">
                    {brand.tagline}
                  </p>
                </div>
                <div className="mt-8">
                  <Link to="/about" className="btn-secondary">
                    Read Our Story
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="relative">
                <PlaceholderImage label="Brand story image" aspect="aspect-[4/3]" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHY KAWAD SWAD */}
      <section className="container-max container-px py-16 lg:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Why Kawad Swad"
            title="What makes our papad different"
            description="Every step — from ingredient selection to packaging — is built around quality, tradition and trust."
          />
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Leaf, title: 'Authentic Ingredients', desc: 'Premium lentil flours and natural spices, sourced with care.' },
            { icon: Shield, title: 'Jain Food Philosophy', desc: '100% vegetarian, no onion or garlic, following Jain dietary principles.' },
            { icon: Factory, title: 'Modern Manufacturing', desc: 'Hygienic preparation with consistent quality standards.' },
            { icon: Award, title: 'Traditional Recipes', desc: 'Time-honoured Nimar recipes, faithfully preserved.' },
            { icon: Package, title: 'Careful Packaging', desc: 'Sealed for freshness, so every papad arrives crisp and aromatic.' },
            { icon: Truck, title: 'Pan-India Shipping', desc: 'Free shipping on 1kg packs, delivered to your door.' },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="card p-6 hover:shadow-lift transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-brand-red/5 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-brand-red" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-brand-brown mb-2">{item.title}</h3>
                <p className="text-sm text-brand-brown/60 leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MANUFACTURING SHOWCASE */}
      <section className="bg-brand-brown text-brand-cream py-16 lg:py-24">
        <div className="container-max container-px">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-yellow mb-3">Manufacturing</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white text-balance">
                A process built on tradition and precision.
              </h2>
              <p className="mt-4 text-base lg:text-lg text-brand-cream/70 text-pretty leading-relaxed">
                From ingredient preparation to final packaging, every stage of our manufacturing is designed to preserve traditional taste while meeting modern quality standards.
              </p>
              <Link to="/manufacturing" className="mt-8 inline-flex items-center gap-2 text-brand-yellow font-semibold hover:gap-3 transition-all">
                Explore Our Manufacturing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Ingredient Preparation',
              'Papad Preparation',
              'Drying',
              'Quality Checking',
              'Packaging',
              'Manufacturing Philosophy',
            ].map((step, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="relative aspect-video overflow-hidden rounded-2xl bg-brand-cream/5">
                  <div className="absolute inset-0 bg-dots opacity-10" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-3xl font-serif font-bold text-brand-yellow/30 mb-2">
                      0{i + 1}
                    </span>
                    <span className="text-sm font-medium text-brand-cream/70">{step}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* BUSINESS SECTION */}
      <section className="container-max container-px py-16 lg:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="For Business"
            title="Built for Consumers. Ready for Business."
            description="We partner with retailers, wholesalers, distributors, hotels and food businesses across India."
          />
        </Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Package, title: 'Bulk Orders', desc: 'Large-quantity supply for businesses and events.', link: '/bulk-orders', cta: 'Request Bulk Supply' },
            { icon: Store, title: 'Distributor', desc: 'Partner with us to bring Kawad Swad to your region.', link: '/distributor', cta: 'Become a Distributor' },
            { icon: Utensils, title: 'Work With Us', desc: 'Hotels, restaurants and food businesses welcome.', link: '/work-with-us', cta: 'Get in Touch' },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="card p-6 hover:shadow-lift transition-shadow">
                <div className="w-12 h-12 rounded-2xl bg-brand-yellow/15 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-brand-brown" />
                </div>
                <h3 className="text-xl font-serif font-semibold text-brand-brown mb-2">{item.title}</h3>
                <p className="text-sm text-brand-brown/60 mb-4 leading-relaxed">{item.desc}</p>
                <Link to={item.link} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-red hover:gap-2 transition-all">
                  {item.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="bg-brand-cream-dark py-16 lg:py-20">
        <div className="container-max container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Gallery"
              title="A glimpse of our world"
              description="From ingredients to packaging, a visual preview of the Kawad Swad journey."
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
            <Reveal className="col-span-2 row-span-2">
              <PlaceholderImage label="Feature image" aspect="aspect-square" className="h-full" />
            </Reveal>
            <Reveal delay={80}><PlaceholderImage label="Product" aspect="aspect-square" /></Reveal>
            <Reveal delay={160}><PlaceholderImage label="Manufacturing" aspect="aspect-square" /></Reveal>
            <Reveal delay={240}><PlaceholderImage label="Ingredients" aspect="aspect-square" /></Reveal>
            <Reveal delay={320}><PlaceholderImage label="Brand" aspect="aspect-square" /></Reveal>
          </div>
          <div className="mt-8 text-center">
            <Link to="/gallery" className="btn-outline">
              View Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS PREVIEW */}
      <section className="container-max container-px py-16 lg:py-20">
        <Reveal>
          <SectionHeading
            eyebrow="Reviews"
            title="What people say"
            description="We are building a community of Kawad Swad lovers. Verified reviews will appear here soon."
          />
        </Reveal>
        <Reveal delay={100}>
          <div className="mt-10 max-w-2xl mx-auto text-center">
            <div className="card p-8 lg:p-12">
              <div className="flex justify-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-brand-brown/15" />
                ))}
              </div>
              <p className="text-brand-brown/60 text-pretty leading-relaxed">
                Customer reviews will be displayed here once verified. We believe in honest feedback and are building a review system you can trust.
              </p>
              <Link to="/reviews" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-brand-red hover:gap-2 transition-all">
                Read Reviews
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* BLOG PREVIEW */}
      <section className="bg-brand-cream-dark py-16 lg:py-20">
        <div className="container-max container-px">
          <Reveal>
            <SectionHeading
              eyebrow="Journal"
              title="From the Kawad Swad Journal"
              description="Recipes, papad knowledge, Indian food traditions and brand updates."
            />
          </Reveal>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {latestPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 80}>
                <Link to={`/blog/${post.slug}`} className="group block card overflow-hidden hover:shadow-lift transition-shadow">
                  <PlaceholderImage label={post.category} aspect="aspect-video" className="rounded-none" />
                  <div className="p-5">
                    <span className="badge-brown mb-2">{post.category}</span>
                    <h3 className="text-lg font-serif font-semibold text-brand-brown mt-2 group-hover:text-brand-red transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-brand-brown/60 line-clamp-2">{post.excerpt}</p>
                    <p className="mt-3 text-2xs text-brand-brown/40">{post.date} · {post.readTime}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/blog" className="btn-outline">
              Read the Journal
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <CTABanner
        title="Ready to taste the tradition?"
        description="Browse our full range of premium Jain papads and have them delivered to your door."
        primaryLabel="Shop Now"
        primaryLink="/shop"
        secondaryLabel="Contact Us"
        secondaryLink="/contact"
      />
    </>
  );
}
