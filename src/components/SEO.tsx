import { useEffect } from 'react';
import { brand } from '@/data/brand';

interface SEOProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'product';
  structuredData?: object;
  indexable?: boolean; // New prop for robots control
}

const SITE_URL = 'https://kawadswad.com';

export function SEO({
  title,
  description,
  path = '',
  image,
  type = 'website',
  structuredData,
  indexable = true, // Default to true
}: SEOProps) {
  const fullTitle = `${title} | ${brand.name}`;
  const url = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}/og-default.png`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, attr: 'name' | 'property' = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Robots meta
    setMeta('robots', indexable ? 'index, follow' : 'noindex, follow');
    setMeta('description', description);
    setLink('canonical', url);
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:url', url, 'property');
    setMeta('og:type', type, 'property');
    setMeta('og:image', ogImage, 'property');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    // Structured data
    let scriptEl = document.querySelector('#structured-data');
    if (structuredData) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.setAttribute('id', 'structured-data');
        scriptEl.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(structuredData);
    } else if (scriptEl) {
      scriptEl.remove();
    }
  }, [fullTitle, description, url, ogImage, type, structuredData, indexable]);

  return null;
}

// ... (schema functions remain unchanged)
