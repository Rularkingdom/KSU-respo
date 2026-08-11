import { Link } from 'react-router-dom';
import { brand } from '@/data/brand';

interface LogoProps {
  className?: string;
  imgClassName?: string;
  showTagline?: boolean;
}

export function Logo({ className = '', imgClassName = 'h-10 w-auto object-contain' }: LogoProps) {
  // Check if logo PNG asset exists / is provided
  // When public/logo.png is added to the repository, this will automatically render the image asset cleanly.
  const hasRealLogoAsset = false; // Toggle or keep ready for true when asset is placed

  if (hasRealLogoAsset) {
    return (
      <Link to="/" className={`inline-flex items-center gap-3 shrink-0 ${className}`} aria-label={`${brand.name} home`}>
        <img
          src="/logo.png"
          alt="KAWAD SWAD"
          className={imgClassName}
        />
      </Link>
    );
  }

  // Approved clean typography fallback when official PNG is not present
  return (
    <Link to="/" className={`inline-flex items-center gap-3 shrink-0 group ${className}`} aria-label={`${brand.name} home`}>
      <div className="w-10 h-10 rounded-xl bg-brand-red flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
        <span className="text-white font-serif font-bold text-lg">KS</span>
      </div>
      <div className="leading-tight">
        <div className="font-serif font-bold text-brand-brown text-lg tracking-tight">
          {brand.name}
        </div>
        <div className="font-devanagari text-[10px] text-brand-brown/60 tracking-wider">
          कवाड़ स्वाद
        </div>
      </div>
    </Link>
  );
}
