import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, Sun } from 'lucide-react';
import { brand, navLinks } from '@/data/brand';
import { useCart } from '@/context/CartContext';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-brand-brown text-brand-cream text-center text-2xs sm:text-xs py-2 px-4">
        <span className="font-medium">
          Free shipping on 1kg packs · FSSAI {brand.fssai} · 100% Vegetarian
        </span>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-brand-cream/95 backdrop-blur-md shadow-soft'
            : 'bg-brand-cream'
        }`}
      >
        <div className="container-max container-px">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0" aria-label={`${brand.name} home`}>
              <div className="w-9 h-9 lg:w-11 lg:h-11 rounded-full bg-brand-red flex items-center justify-center shadow-soft">
                <span className="text-white font-serif font-bold text-lg lg:text-xl">क</span>
              </div>
              <div className="hidden sm:block leading-none">
                <div className="font-serif font-bold text-brand-brown text-base lg:text-lg tracking-wide">
                  KAWAD SWAD
                </div>
                <div className="font-devanagari text-2xs text-brand-brown/60 mt-0.5">
                  कवाड़ स्वाद
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-brand-red bg-brand-red/5'
                        : 'text-brand-brown hover:text-brand-red hover:bg-brand-red/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={() => setSearchOpen((s) => !s)}
                className="p-2 rounded-full text-brand-brown hover:bg-brand-brown/5 transition-colors"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                to="/cart"
                className="relative p-2 rounded-full text-brand-brown hover:bg-brand-brown/5 transition-colors"
                aria-label={`Cart with ${itemCount} items`}
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-brand-red text-white text-2xs font-bold flex items-center justify-center animate-scale-in">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              <Link to="/shop" className="hidden sm:inline-flex btn-primary text-sm px-4 py-2 ml-1">
                Shop
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="lg:hidden p-2 rounded-full text-brand-brown hover:bg-brand-brown/5"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-brand-brown/10 bg-brand-cream animate-slide-down">
            <div className="container-max container-px py-4">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search papad, variants, categories..."
                  className="input-field"
                  autoFocus
                  aria-label="Search products"
                />
                <button type="submit" className="btn-primary px-5">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-brand-brown/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <nav
            className="absolute right-0 top-0 bottom-0 w-72 max-w-[80vw] bg-brand-cream shadow-lift overflow-y-auto animate-slide-down"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between p-4 border-b border-brand-brown/10">
              <span className="font-serif font-bold text-brand-brown">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-full hover:bg-brand-brown/5"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-brand-brown" />
              </button>
            </div>
            <div className="p-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-brand-red bg-brand-red/5'
                        : 'text-brand-brown hover:bg-brand-brown/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link to="/shop" className="btn-primary w-full mt-3">
                <Sun className="w-4 h-4" />
                Shop Papads
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
