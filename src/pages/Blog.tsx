import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEO, breadcrumbSchema } from '@/components/SEO';
import { PageHero, PlaceholderImage } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { blogService, blogCategories } from '@/data/blog';

export default function Blog() {
  const [category, setCategory] = useState<string>('All');

  const posts = useMemo(() => blogService.getByCategory(category), [category]);

  return (
    <>
      <SEO
        title="Journal"
        description="The Kawad Swad Journal — recipes, papad knowledge, Indian food traditions, brand updates and business insights from Nimar."
        path="/blog"
        structuredData={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />

      <PageHero
        eyebrow="Kawad Swad Journal"
        title="Stories, Recipes & More"
        description="Recipes, papad knowledge, Indian food traditions and brand updates from the Kawad Swad team."
      />

      <section className="container-max container-px py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? 'bg-brand-red text-white'
                  : 'bg-brand-brown/5 text-brand-brown/70 hover:bg-brand-brown/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="card p-12 text-center">
            <p className="text-brand-brown/60">No articles in this category yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={Math.min(i * 60, 300)}>
                <Link to={`/blog/${post.slug}`} className="group block card overflow-hidden hover:shadow-lift transition-shadow h-full">
                  <PlaceholderImage label={post.category} aspect="aspect-video" className="rounded-none" />
                  <div className="p-5">
                    <span className="badge-brown mb-2">{post.category}</span>
                    <h2 className="text-lg font-serif font-semibold text-brand-brown mt-2 group-hover:text-brand-red transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-brand-brown/60 line-clamp-2">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-2xs text-brand-brown/40">{post.date} · {post.readTime}</p>
                      <ArrowRight className="w-4 h-4 text-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
