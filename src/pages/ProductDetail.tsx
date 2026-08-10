import { useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Check,
  Truck,
  Shield,
  Leaf,
  ChevronRight,
} from 'lucide-react';
import { SEO, breadcrumbSchema } from '../components/SEO';
import { ProductCard } from '../components/ProductCard';
import { Reveal } from '../components/Reveal';
import { ProductService, ProductFamily } from '../services/product-service';
import { useCart } from '../context/CartContext';

const brand = {
  fssai: '21425890001224',
  dietType: '100% Vegetarian',
  manufacturer: 'Kawad Swad Udhyog',
};

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = slug ? ProductService.getProductBySlug(slug) : undefined;

  const [selectedSkuIndex, setSelectedSkuIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return ProductService.getProductsByCategory(product.category)
      .filter((p) => p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="container-max container-px py-20 text-center">
        <SEO title="Product Not Found" description="The product you are looking for could not be found." path="/product/not-found" />
        <h1 className="text-3xl font-serif font-bold text-brand-brown mb-4">Product not found</h1>
        <Link to="/products" className="btn-primary">
          Browse All Products
        </Link>
      </div>
    );
  }

  const selectedVariant = product.variants[selectedSkuIndex] || product.variants[0];
  const discount = Math.round(
    ((selectedVariant.mrp - selectedVariant.websitePrice) / selectedVariant.mrp) * 100
  );

  const handleAddToCart = () => {
    addToCart(selectedVariant.sku, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(selectedVariant.sku, quantity);
    navigate('/checkout');
  };

  return (
    <>
      <SEO
        title={product.name}
        description={product.description}
        path={`/product/${product.slug}`}
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
          { name: product.name, path: `/product/${product.slug}` },
        ])}
      />

      {/* Breadcrumb */}
      <div className="container-max container-px pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-brand-brown/50" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-brand-red">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/products" className="hover:text-brand-red">Products</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-brown">{product.name}</span>
        </nav>
      </div>

      {/* Above fold */}
      <section className="container-max container-px py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Visual Placeholder */}
          <div className="relative">
            <div className="relative aspect-square card overflow-hidden rounded-4xl shadow-card bg-amber-50/40 flex items-center justify-center p-8 border border-amber-100">
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-[#FBEC0A] text-[#4E342E] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {selectedVariant.packSize}
                </span>
                <span className="bg-white/80 text-gray-700 text-xs font-mono px-2.5 py-1 rounded-md border border-amber-200">
                  {selectedVariant.sku}
                </span>
              </div>
              <div className="w-64 h-64 rounded-full border-8 border-dashed border-[#FE330E]/30 flex items-center justify-center bg-white shadow-inner">
                <div className="text-center p-4">
                  <span className="text-xs font-bold text-[#FE330E] tracking-widest block">KAWAD SWAD</span>
                  <span className="font-serif font-bold text-[#4E342E] text-base block mt-1">{product.name}</span>
                  <span className="text-[10px] text-gray-400 block mt-1">NIMAR, MADHYA PRADESH</span>
                </div>
              </div>
            </div>
            {discount > 0 && (
              <div className="absolute top-4 right-4">
                <span className="badge-red text-sm px-3 py-1.5">{discount}% OFF</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="badge-brown">{product.category.toUpperCase()} FAMILY</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-brand-brown text-balance">
              {product.name}
            </h1>

            <p className="mt-4 text-base text-brand-brown/70 leading-relaxed">{product.description}</p>

            {/* Pack size selection */}
            <div className="mt-6">
              <p className="label-field">Select Pack Size / SKU</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.sku}
                    onClick={() => setSelectedSkuIndex(i)}
                    className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      selectedSkuIndex === i
                        ? 'border-brand-red bg-brand-red/5 text-brand-red shadow-sm'
                        : 'border-brand-brown/15 text-brand-brown hover:border-brand-brown/30 bg-white'
                    }`}
                  >
                    {v.packSize}
                    <span className="block text-2xs font-mono opacity-60 mt-0.5">{v.sku}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mt-6 p-5 rounded-2xl bg-amber-50/50 border border-amber-100">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-brand-red">
                  ₹{selectedVariant.websitePrice}
                </span>
                <span className="text-lg text-brand-brown/40 line-through">
                  ₹{selectedVariant.mrp}
                </span>
                {discount > 0 && (
                  <span className="badge-red">Save {discount}%</span>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                {selectedVariant.shipping === 0 ? (
                  <span className="text-emerald-600 font-medium flex items-center gap-1">
                    <Truck className="w-4 h-4" /> Free Shipping Included
                  </span>
                ) : (
                  <span className="text-brand-brown/60 flex items-center gap-1">
                    <Truck className="w-4 h-4" /> Standard Shipping: ₹{selectedVariant.shipping}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity + Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="flex items-center border-2 border-brand-brown/15 rounded-xl overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 hover:bg-brand-brown/5 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold text-brand-brown">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 hover:bg-brand-brown/5 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  added ? 'bg-emerald-600 text-white' : 'border-2 border-brand-brown/20 text-brand-brown hover:bg-brand-brown/5'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" /> Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" /> Add to Cart
                  </>
                )}
              </button>
              <button onClick={handleBuyNow} className="flex-1 bg-[#FE330E] text-white hover:bg-opacity-90 py-3 px-6 rounded-xl font-semibold text-sm transition-all shadow-sm">
                Buy Now
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white border border-amber-100">
                <Leaf className="w-5 h-5 text-brand-red" />
                <span className="text-2xs text-brand-brown/60 text-center font-medium">100% Vegetarian</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white border border-amber-100">
                <Shield className="w-5 h-5 text-brand-red" />
                <span className="text-2xs text-brand-brown/60 text-center font-medium">FSSAI {brand.fssai}</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white border border-amber-100">
                <Truck className="w-5 h-5 text-brand-red" />
                <span className="text-2xs text-brand-brown/60 text-center font-medium">Pan-India Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details sections */}
      <section className="container-max container-px py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card p-6 bg-white border border-amber-100 rounded-2xl shadow-sm">
            <h2 className="text-xl font-serif font-semibold text-brand-brown mb-3">Product Description</h2>
            <p className="text-sm text-brand-brown/70 leading-relaxed">{product.description}</p>
          </div>

          <div className="card p-6 bg-white border border-amber-100 rounded-2xl shadow-sm">
            <h2 className="text-xl font-serif font-semibold text-brand-brown mb-3">Storage & Shelf Life</h2>
            <p className="text-sm text-brand-brown/70 leading-relaxed">
              Store in a cool, dry place away from direct sunlight. Transfer to an airtight container once opened to maintain optimal crispness and flavor.
            </p>
          </div>

          <div className="card p-6 bg-white border border-amber-100 rounded-2xl shadow-sm">
            <h2 className="text-xl font-serif font-semibold text-brand-brown mb-3">Serving Suggestions</h2>
            <p className="text-sm text-brand-brown/70 leading-relaxed">
              Can be roasted over an open flame, deep-fried in cooking oil, or microwaved for a quick, oil-free crispy snack. Perfect accompaniment to Indian meals.
            </p>
          </div>

          <div className="card p-6 bg-white border border-amber-100 rounded-2xl shadow-sm">
            <h2 className="text-xl font-serif font-semibold text-brand-brown mb-3">Product Information</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between border-b border-gray-100 pb-1.5">
                <dt className="text-brand-brown/60">Active SKU</dt>
                <dd className="font-mono font-medium text-brand-brown">{selectedVariant.sku}</dd>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-1.5">
                <dt className="text-brand-brown/60">Selected Pack Size</dt>
                <dd className="font-medium text-brand-brown">{selectedVariant.packSize}</dd>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-1.5">
                <dt className="text-brand-brown/60">Diet Type</dt>
                <dd className="font-medium text-brand-brown">{brand.dietType}</dd>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-1.5">
                <dt className="text-brand-brown/60">FSSAI License</dt>
                <dd className="font-medium text-brand-brown">{brand.fssai}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-brand-brown/60">Manufacturer</dt>
                <dd className="font-medium text-brand-brown">{brand.manufacturer}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="container-max container-px py-12">
          <Reveal>
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-brand-brown mb-8">You may also like</h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {relatedProducts.map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <ProductCard product={p as any} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <div className="container-max container-px pb-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm font-medium text-brand-brown hover:text-brand-red transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>
    </>
  );
}
