import { Link, useParams } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Calendar, Clock } from 'lucide-react';
import { SEO, articleSchema, breadcrumbSchema } from '@/components/SEO';
import { PlaceholderImage } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { blogService } from '@/data/blog';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogService.getBySlug(slug) : undefined;

  if (!post) {
    return (
      <div className="container-max container-px py-20 text-center">
        <SEO title="Article Not Found" description="The article you are looking for could not be found." />
        <h1 className="text-3xl font-serif font-bold text-brand-brown mb-4">Article not found</h1>
        <Link to="/blog" className="btn-primary">Back to Journal</Link>
      </div>
    );
  }

  const related = blogService.getAll().filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        type="article"
        structuredData={{
          ...articleSchema(post.title, post.excerpt, post.date, post.author),
          ...breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        }}
      />

      {/* Breadcrumb */}
      <div className="container-max container-px pt-6">
        <nav className="flex items-center gap-1.5 text-xs text-brand-brown/50" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-brand-red">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/blog" className="hover:text-brand-red">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-brown truncate">{post.title}</span>
        </nav>
      </div>

      {/* Article header */}
      <article className="container-max container-px py-8">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <span className="badge-brown mb-4">{post.category}</span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-brown text-balance">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-brand-brown/50">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.readTime}</span>
              <span>by {post.author}</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-8">
              <PlaceholderImage label={post.category} aspect="aspect-video" />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-8 prose prose-lg max-w-none">
              <p className="text-lg text-brand-brown/70 leading-relaxed font-serif italic mb-8">
                {post.excerpt}
              </p>
              {post.content.map((para, i) => (
                <p key={i} className="text-base text-brand-brown/75 leading-relaxed mb-4">
                  {para}
                </p>
              ))}
            </div>
          </Reveal>

          <div className="mt-10 pt-6 border-t border-brand-brown/10">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-brand-brown hover:text-brand-red transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Journal
            </Link>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-brand-cream-dark py-16">
          <div className="container-max container-px">
            <h2 className="text-2xl font-serif font-bold text-brand-brown mb-8">Related Articles</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 60}>
                  <Link to={`/blog/${p.slug}`} className="group block card overflow-hidden hover:shadow-lift transition-shadow">
                    <PlaceholderImage label={p.category} aspect="aspect-video" className="rounded-none" />
                    <div className="p-4">
                      <span className="badge-brown mb-1">{p.category}</span>
                      <h3 className="text-base font-serif font-semibold text-brand-brown mt-2 group-hover:text-brand-red transition-colors">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-2xs text-brand-brown/40">{p.readTime}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
