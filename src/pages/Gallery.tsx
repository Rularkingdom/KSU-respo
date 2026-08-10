import { SEO, breadcrumbSchema } from '@/components/SEO';
import { PageHero, PlaceholderImage } from '@/components/Section';
import { Reveal } from '@/components/Reveal';

const galleryItems = [
  { label: 'Product showcase', aspect: 'aspect-square', span: 'lg:col-span-2 lg:row-span-2' },
  { label: 'Ingredients', aspect: 'aspect-square', span: '' },
  { label: 'Manufacturing', aspect: 'aspect-square', span: '' },
  { label: 'Papad preparation', aspect: 'aspect-square', span: '' },
  { label: 'Packaging', aspect: 'aspect-square', span: '' },
  { label: 'Brand event', aspect: 'aspect-square', span: 'lg:col-span-2' },
  { label: 'Quality check', aspect: 'aspect-square', span: '' },
  { label: 'Drying', aspect: 'aspect-square', span: '' },
  { label: 'Final product', aspect: 'aspect-square', span: '' },
  { label: 'Team', aspect: 'aspect-square', span: '' },
];

export default function Gallery() {
  return (
    <>
      <SEO
        title="Gallery"
        description="A visual preview of the Kawad Swad world — products, ingredients, manufacturing and brand moments. Real photography will replace these placeholders soon."
        path="/gallery"
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Gallery', path: '/gallery' },
        ])}
      />

      <PageHero
        eyebrow="Visual Story"
        title="Gallery"
        description="A glimpse into the Kawad Swad world — from ingredients to packaging. Real photography will replace these placeholders as it becomes available."
      />

      <section className="container-max container-px py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 auto-rows-auto">
          {galleryItems.map((item, i) => (
            <Reveal key={i} delay={Math.min(i * 50, 300)} className={item.span}>
              <div className={`group perspective-1000 ${item.span}`}>
                <PlaceholderImage
                  label={item.label}
                  aspect={item.aspect}
                  className="h-full transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 card p-6 text-center bg-brand-cream-dark">
          <p className="text-sm text-brand-brown/60">
            These are placeholder images. Real Kawad Swad photography will replace them one-for-one as it becomes available.
          </p>
        </div>
      </section>
    </>
  );
}
