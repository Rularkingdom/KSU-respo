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
import { SEO, productSchema, breadcrumbSchema } from '@/components/SEO';
import { ProductImage } from '@/components/ProductImage';
import { ProductCard } from '@/components/ProductCard';
import { Reveal } from '@/components/Reveal';
import { productService, PACK_LABELS } from '@/data/products';
import { useCart, formatPrice } from '@/context/CartContext';
import { brand } from '@/data/brand';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = slug ? productService.getBySlug(slug) : undefined;

  const [selectedSkuIndex, setSelectedSkuIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const relatedProducts = useMemo(
    () => (product ? productService.getRelated(product) : []),
    [product],
  );

  if (!product) {
    return (
      <div className="container-max container-px py-20 text-center">
        <SEO title="Product Not Found" description="The product you are looking for could not be found." />
        <h1 className="text-3xl font-serif font-bold text-brand-brown mb-4">Product not found</h1>
        <Link to="/products" className="btn-primary">
          Browse All Products
        </Link>
      </div>
    );
  }

  const selectedSku = product.skus[selectedSkuIndex];
  const discount = Math.round(
    ((selectedSku.mrp - selectedSku.websitePrice) / selectedSku.mrp) * 100,
  );

  const handleAddToCart = () => {
    addItem(selectedSku.sku, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addItem(selectedSku.sku, quantity);
    navigate('/checkout');
  };

  return (
    <>
      <SEO
        title={product.name}
        description={product.description}
        path={`/product/${product.slug}`}
        type="product"
        structuredData={{
          ...productSchema(product.name, product.description, selectedSku.websitePrice, product.category),
          ...breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Products', path: '/products' },
            { name: product.name, path: `/product/${product.slug}` },
          ]),
        }}
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
          {/* Visual */}
          <div className="relative">
            <div className="perspective-1000">
              <div className="preserve-3d" style={{ transform: 'rotateY(-5deg)' }}>
                <div className="relative aspect-square card overflow-hidden rounded-4xl shadow-card">
                  <ProductImage product={product} variant="detail" className="w-full h-full" />
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
              <span className="badge-brown">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
              <span className="badge-yellow">{product.variant}</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-brand-brown text-balance">
              {product.name}
            </h1>
            <p className="font-devanagari text-lg text-brand-brown/60 mt-1">{product.hindiName}</p>

            <p className="mt-4 text-base text-brand-brown/70 leading-relaxed">{product.description}</p>

            {/* Pack size selection */}
            <div className="mt-6">
              <p className="label-field">Select Pack Size</p>
              <div className="flex flex-wrap gap-2">
                {product.skus.map((sku, i) => (
                  <button
                    key={sku.sku}
                    onClick={() => setSelectedSkuIndex(i)}
                    className={`px-4 py-2.5 rounded-xl border-2 text-sm font-medium transition-all ${
                      selectedSkuIndex === i
                        ? 'border-brand-red bg-brand-red/5 text-brand-red'
                        : 'border-brand-brown/15 text-brand-brown hover:border-brand-brown/30'
                    }`}
                  >
                    {PACK_LABELS[sku.packSize]}
                    <span className="block text-2xs font-normal opacity-60">{sku.sku}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mt-6 p-5 rounded-2xl bg-brand-cream-dark">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-brand-red">
                  {formatPrice(selectedSku.websitePrice)}
                </span>
                <span className="text-lg text-brand-brown/40 line-through">
                  {formatPrice(selectedSku.mrp)}
                </span>
                {discount > 0 && (
                  <span className="badge-red">Save {discount}%</span>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2 text-sm">
                {selectedSku.freeShipping ? (
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <Truck className="w-4 h-4" /> Free shipping
                  </span>
                ) : (
                  <span className="text-brand-brown/60 flex items-center gap-1">
                    <Truck className="w-4 h-4" /> + {formatPrice(selectedSku.shipping)} shipping
                  </span>
                )}
              </div>
            </div>

            {/* Quantity + Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <div className="flex items-center border-2 border-brand-brown/15 rounded-xl overflow-hidden">
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
                className={`flex-1 ${added ? 'btn-secondary' : 'btn-outline'}`}
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
              <button onClick={handleBuyNow} className="flex-1 btn-primary">
                Buy Now
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white">
                <Leaf className="w-5 h-5 text-brand-red" />
                <span className="text-2xs text-brand-brown/60 text-center">100% Vegetarian</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white">
                <Shield className="w-5 h-5 text-brand-red" />
                <span className="text-2xs text-brand-brown/60 text-center">FSSAI {brand.fssai}</span>
              </div>
              <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white">
                <Truck className="w-5 h-5 text-brand-red" />
                <span className="text-2xs text-brand-brown/60 text-center">Pan-India Shipping</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details sections */}
      <section className="container-max container-px py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card p-6">
            <h2 className="text-xl font-serif font-semibold text-brand-brown mb-3">Ingredients</h2>
            <ul className="space-y-2">
              {product.ingredients.map((ing, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-brand-brown/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-serif font-semibold text-brand-brown mb-3">Taste Profile</h2>
            <p className="text-sm text-brand-brown/70 leading-relaxed">{product.tasteProfile}</p>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-serif font-semibold text-brand-brown mb-3">Storage</h2>
            <p className="text-sm text-brand-brown/70 leading-relaxed">{product.storage}</p>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-serif font-semibold text-brand-brown mb-3">Serving</h2>
            <p className="text-sm text-brand-brown/70 leading-relaxed">{product.serving}</p>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-serif font-semibold text-brand-brown mb-3">Nutrition</h2>
            <p className="text-sm text-brand-brown/70 leading-relaxed">{product.nutritionNote}</p>
          </div>

          <div className="card p-6">
            <h2 className="text-xl font-serif font-semibold text-brand-brown mb-3">Product Information</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-brand-brown/60">SKU</dt>
                <dd className="font-medium text-brand-brown">{selectedSku.sku}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-brand-brown/60">Pack Size</dt>
                <dd className="font-medium text-brand-brown">{PACK_LABELS[selectedSku.packSize]}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-brand-brown/60">Diet Type</dt>
                <dd className="font-medium text-brand-brown">{brand.dietType}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-brand-brown/60">FSSAI</dt>
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
      <section className="container-max container-px py-12">
        <Reveal>
          <h2 className="text-2xl lg:text-3xl font-serif font-bold text-brand-brown mb-8">You may also like</h2>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {relatedProducts.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <div className="container-max container-px pb-8">
        <Link to="/products" className="inline-flex items-center gap-2 text-sm font-medium text-brand-brown hover:text-brand-red transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>
    </>
  );
}
