import { SEO, breadcrumbSchema } from '@/components/SEO';
import { PageHero, PlaceholderImage } from '@/components/Section';
import { Reveal } from '@/components/Reveal';

const galleryItems = [
  { 
    label: 'PRODUCT SHOWCASE — Real product photography and packaging will be placed here', 
    aspect: 'aspect-[16/9]', 
    span: 'col-span-2 lg:col-span-2 row-span-2',
    category: 'Brand & Products'
  },
  { 
    label: 'INGREDIENTS — Lentil and spice sourcing', 
    aspect: 'aspect-[4/3]', 
    span: 'col-span-1 lg:col-span-1',
    category: 'Making & Craft'
  },
  { 
    label: 'MANUFACTURING — Facility production floor', 
    aspect: 'aspect-[4/3]', 
    span: 'col-span-1 lg:col-span-1',
    category: 'Making & Craft'
  },
  { 
    label: 'DOUGH MIXING — Traditional preparation methods', 
    aspect: 'aspect-square', 
    span: 'col-span-1 lg:col-span-1',
    category: 'Making & Craft'
  },
  { 
    label: 'DRYING STAGE — Standard seasoning area', 
    aspect: 'aspect-[16/9]', 
    span: 'col-span-2 lg:col-span-2',
    category: 'Making & Craft'
  },
  { 
    label: 'QUALITY INSPECTION — Batch review process', 
    aspect: 'aspect-square', 
    span: 'col-span-1 lg:col-span-1',
    category: 'Quality'
  },
  { 
    label: 'SEALED PACKAGING — Food-grade pouches', 
    aspect: 'aspect-[4/3]', 
    span: 'col-span-2 lg:col-span-2',
    category: 'Packaging'
  },
  { 
    label: 'NIMAR REGION — Landscape and cultural roots', 
    aspect: 'aspect-[16/9]', 
    span: 'col-span-2 lg:col-span-2',
    category: 'Food Culture'
  },
];

export default function Gallery() {
  return (
    <>
      <SEO
        title="Gallery"
        description="A visual preview of the Kawad Swad editorial world — products, ingredients, manufacturing steps and brand heritage from Nimar."
        path="/gallery"
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Gallery', path: '/gallery' },
        ])}
      />

      <PageHero
        eyebrow="Visual Story"
        title="Editorial Gallery"
        description="A visual glimpse into the Kawad Swad world — from agricultural roots in Nimar to sealed packaging. Intentional placeholders ready for real photography."
      />

      <section className="container-max container-px py-16 lg:py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-[220px] lg:auto-rows-[260px]">
          {galleryItems.map((item, i) => (
            <Reveal key={i} delay={Math.min(i * 60, 300)} className={item.span}>
              <div className="group h-full">
                <div className="h-full rounded-3xl overflow-hidden border border-brand-brown/10 bg-brand-cream-dark shadow-soft hover:shadow-lift transition-all duration-300">
                  <PlaceholderImage
                    label={item.label}
                    aspect={item.aspect}
                    className="h-full transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 max-w-xl mx-auto card p-8 text-center bg-brand-cream-dark border border-brand-brown/10">
          <p className="text-sm font-medium text-brand-brown/70 leading-relaxed">
            These compositional blocks serve as intentional placeholders. Real Kawad Swad photography will replace them one-for-one as assets become available.
          </p>
        </div>
      </section>
    </>
  );
}
