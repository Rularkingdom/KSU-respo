import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { SEO, breadcrumbSchema } from '@/components/SEO';
import { ProductCard } from '@/components/ProductCard';
import { PageHero } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { productService, CATEGORY_LABELS, type ProductCategory } from '@/data/products';

const categories: (ProductCategory | 'all')[] = ['all', 'moong', 'chana', 'urad', 'combo'];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [search, setSearch] = useState(initialQuery);
  const [category, setCategory] = useState<ProductCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-low' | 'price-high' | 'name'>('default');
  const [maxPrice, setMaxPrice] = useState(700);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = productService.getAll();

    if (category !== 'all') {
      list = list.filter((p) => p.category === category);
    }

    if (search.trim()) {
      list = productService.search(search);
    }

    list = list.filter((p) => p.skus[0].websitePrice <= maxPrice);

    switch (sortBy) {
      case 'price-low':
        list = [...list].sort((a, b) => a.skus[0].websitePrice - b.skus[0].websitePrice);
        break;
      case 'price-high':
        list = [...list].sort((a, b) => b.skus[0].websitePrice - a.skus[0].websitePrice);
        break;
      case 'name':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return list;
  }, [category, search, sortBy, maxPrice]);

  return (
    <>
      <SEO
        title="Shop"
        description="Shop premium Jain papads online. Browse moong, chana and urad papad varieties, choose your pack size and get them delivered."
        path="/shop"
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Shop', path: '/shop' },
        ])}
      />

      <PageHero
        eyebrow="Online Store"
        title="Shop Papads"
        description="Browse our full range, pick your favourite variants and pack sizes, and get them delivered to your door."
      />

      <section className="container-max container-px py-12">
        {/* Search bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-brown/40" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search papad, variant, category..."
              className="input-field pl-10"
              aria-label="Search products"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="input-field sm:w-48"
            aria-label="Sort products"
          >
            <option value="default">Sort: Default</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Name: A to Z</option>
          </select>
          <button
            onClick={() => setShowMobileFilters((s) => !s)}
            className="btn-outline lg:hidden"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Filters */}
          <aside className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="card p-5 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif font-semibold text-brand-brown">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="lg:hidden p-1 rounded-lg hover:bg-brand-brown/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Category */}
              <div className="mb-6">
                <p className="label-field">Category</p>
                <div className="space-y-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        category === cat
                          ? 'bg-brand-red/10 text-brand-red font-medium'
                          : 'text-brand-brown/70 hover:bg-brand-brown/5'
                      }`}
                    >
                      {cat === 'all' ? 'All Products' : CATEGORY_LABELS[cat]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price filter */}
              <div>
                <p className="label-field">Max Price: ₹{maxPrice}</p>
                <input
                  type="range"
                  min="79"
                  max="700"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-red"
                  aria-label="Maximum price filter"
                />
                <div className="flex justify-between text-2xs text-brand-brown/40 mt-1">
                  <span>₹79</span>
                  <span>₹700</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div>
            <p className="text-sm text-brand-brown/60 mb-4">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''}
            </p>

            {filtered.length === 0 ? (
              <div className="card p-12 text-center">
                <p className="text-brand-brown/60 mb-2">No products match your filters.</p>
                <button
                  onClick={() => {
                    setCategory('all');
                    setSearch('');
                    setMaxPrice(700);
                  }}
                  className="text-brand-red font-medium hover:underline"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {filtered.map((product, i) => (
                  <Reveal key={product.id} delay={Math.min(i * 50, 300)}>
                    <ProductCard product={product} />
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
