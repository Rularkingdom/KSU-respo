import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, ChevronDown } from 'lucide-react';
import type { ProductFamily } from '../data/products';
import { PACK_LABELS } from '../data/products';
import { ProductImage } from '../components/ProductImage';
import { useCart, formatPrice } from '../context/CartContext';

interface ProductCardProps {
  product: ProductFamily;
  className?: string;
}

export function ProductCard({ product, className = '' }: ProductCardProps) {
  const { addItem } = useCart();
  const [selectedSkuIndex, setSelectedSkuIndex] = useState(0);
  const [added, setAdded] = useState(false);

  const selectedSku = product.skus[selectedSkuIndex] || product.skus[0];
  const discount = Math.round(
    ((selectedSku.mrp - selectedSku.websitePrice) / selectedSku.mrp) * 100,
  );

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(selectedSku.sku, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSkuIndex(Number(e.target.value));
  };

  const isCombo = product.category === 'combo' || product.skus.length === 1;

  return (
    <Link
      to={`/product/${product.slug}`}
      className={`group block ${className}`}
    >
      <div className="card overflow-hidden hover:shadow-lift hover:-translate-y-1 transition-all duration-300 bg-white border border-brand-brown/5 flex flex-col h-full">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-brand-cream-dark">
          <ProductImage
            productId={product.id}
            product={product}
            variant="card"
            className="w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          {discount > 0 && (
            <div className="absolute top-3 right-3 z-10">
              <span className="badge-red">{discount}% OFF</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col flex-1 justify-between">
          <div>
            <h3 className="font-serif font-semibold text-brand-brown text-base leading-tight mb-1 group-hover:text-brand-red transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-brand-brown/60 mb-3">
              {product.variant}
            </p>

            {/* Pack Size Selector / Badge */}
            <div className="mb-4" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
              {isCombo ? (
                <div className="inline-block px-3 py-1 bg-brand-cream text-brand-brown rounded-lg text-xs font-semibold border border-brand-brown/10">
                  {PACK_LABELS[selectedSku.packSize] || `${selectedSku.packSize}g`} Combo
                </div>
              ) : (
                <div className="relative inline-block w-full">
                  <select
                    value={selectedSkuIndex}
                    onChange={handleSelectChange}
                    aria-label="Select pack size"
                    className="w-full appearance-none bg-brand-cream/50 border border-brand-brown/15 rounded-xl px-3 py-1.5 pr-8 text-xs font-semibold text-brand-brown focus:outline-none focus:border-brand-red cursor-pointer transition-colors"
                  >
                    {product.skus.map((skuObj, idx) => (
                      <option key={skuObj.sku} value={idx}>
                        Pack Size: {PACK_LABELS[skuObj.packSize] || `${skuObj.packSize}g`}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-brand-brown/50 pointer-events-none" />
                </div>
              )}
            </div>

            <div className="flex items-baseline gap-2.5 mb-1">
              <span className="text-lg font-bold text-brand-red">
                {formatPrice(selectedSku.websitePrice)}
              </span>
              <span className="text-sm text-brand-brown/40 line-through">
                {formatPrice(selectedSku.mrp)}
              </span>
            </div>
            <p className="text-2xs text-brand-brown/60 mb-4">
              {selectedSku.freeShipping ? (
                <span className="text-green-600 font-medium">Free shipping</span>
              ) : (
                `+ ${formatPrice(selectedSku.shipping)} shipping`
              )}
            </p>
          </div>

          <button
            onClick={handleAdd}
            className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all mt-2 ${
              added 
                ? 'bg-emerald-600 text-white' 
                : 'border border-brand-brown/20 text-brand-brown hover:bg-brand-brown/5'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" /> Added
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
