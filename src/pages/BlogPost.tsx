import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";
import { getPostBySlug, blogPosts } from "@/data/blogPosts";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug ?? "");

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

  const others = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);
  const canonicalUrl = `https://starsbiz.ru/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-[#050A14] text-white font-montserrat overflow-x-hidden">
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="StarsBiz" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:section" content={post.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.metaTitle} />
        <meta name="twitter:description" content={post.metaDescription} />
      </Helmet>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#050A14]/97 border-b border-[#D4AF37]/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://cdn.poehali.dev/projects/55d0d6cb-91ca-48c2-89ac-6273cce5edf0/bucket/a7bf8ba5-dc79-454d-b1fa-746033e2ce43.jpg"
              alt="StarsBiz"
              className="w-11 h-11 rounded-full object-cover"
            />
            <div>
              <div className="font-cormorant text-[#D4AF37] text-xl font-semibold tracking-widest leading-none">STARS</div>
              <div className="font-cormorant text-white/60 text-xs tracking-[0.3em] leading-none">BIZ</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-white/60 hover:text-[#D4AF37] text-sm tracking-wider transition-colors">На главную</Link>
            <Link to="/blog" className="text-[#D4AF37] text-sm tracking-wider font-semibold border-b border-[#D4AF37]/40 pb-0.5">Блог</Link>
          </nav>

          <Link
            to="/#order"
            className="hidden md:flex items-center gap-2 px-6 py-2.5 border border-[#D4AF37] text-[#D4AF37] text-sm tracking-wider hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-semibold"
          >
            Заказать прогноз
          </Link>
          <Link to="/blog" className="md:hidden text-[#D4AF37]/60 text-sm">← Блог</Link>
        </div>
      </header>

      {/* ARTICLE */}
      <article className="pt-36 pb-24">
        <div className="max-w-3xl mx-auto px-6">

          {/* Breadcrumb */}
          <div
            className="flex items-center gap-2 text-white/30 text-xs mb-10 tracking-wide flex-wrap"
            style={{ animation: "fadeInDown 0.6s ease both" }}
          >
            <Link to="/" className="hover:text-[#D4AF37] transition-colors">Главная</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-[#D4AF37] transition-colors">Блог</Link>
            <span>/</span>
            <span className="text-white/50">{post.category}</span>
          </div>

          {/* Meta */}
          <div
            className="flex flex-wrap items-center gap-4 mb-8"
            style={{ animation: "fadeInUp 0.7s ease 0.1s both" }}
          >
            <span className="px-4 py-1 border border-[#D4AF37]/35 text-[#D4AF37] text-xs tracking-widest uppercase">
              {post.category}
            </span>
            <span className="text-white/30 text-xs">{post.date}</span>
            <span className="text-white/30 text-xs flex items-center gap-1">
              <Icon name="Clock" size={12} /> {post.readTime} чтения
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-cormorant text-4xl md:text-5xl font-light text-white leading-[1.1] mb-6"
            style={{ animation: "fadeInUp 0.7s ease 0.2s both" }}
          >
            {post.title}
          </h1>

          {/* Subtitle */}
          <p
            className="text-[#D4AF37]/70 text-lg font-cormorant italic mb-12 leading-relaxed"
            style={{ animation: "fadeInUp 0.7s ease 0.3s both" }}
          >
            {post.subtitle}
          </p>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-12" style={{ animation: "fadeInUp 0.7s ease 0.35s both" }}>
            <div className="h-px flex-1 bg-gradient-to-r from-[#D4AF37]/30 to-transparent" />
            <span className="text-[#D4AF37]/30 text-xl">✦</span>
            <div className="h-px flex-1 bg-gradient-to-l from-[#D4AF37]/30 to-transparent" />
          </div>

          {/* Lead */}
          <div className="border-l-2 border-[#D4AF37]/50 pl-7 mb-14" style={{ animation: "fadeInUp 0.7s ease 0.4s both" }}>
            <p className="font-cormorant text-xl text-white/80 italic leading-relaxed">{post.excerpt}</p>
          </div>

          {/* Sections */}
          <div className="space-y-14" style={{ animation: "fadeInUp 0.7s ease 0.5s both" }}>
            {post.sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="font-cormorant text-2xl md:text-3xl font-semibold text-white mb-5 leading-snug">
                    {section.heading}
                  </h2>
                )}

                {section.text && section.text.split("\n\n").map((para, j) => (
                  <p key={j} className="text-white/65 text-base leading-[1.9] mb-4">{para}</p>
                ))}

                {section.example && (
                  <div className="my-6 border border-[#D4AF37]/20 bg-[#D4AF37]/4 px-7 py-5 relative">
                    <div className="absolute -top-3 left-6 px-3 bg-[#050A14]">
                      <span className="text-[#D4AF37]/60 text-xs tracking-widest uppercase">Пример из практики</span>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed italic">{section.example}</p>
                  </div>
                )}

                {section.list && (
                  <ul className="space-y-3 my-5">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-white/65 text-base leading-relaxed">
                        {item.icon ? (
                          <span className="mt-0.5 text-base leading-none flex-shrink-0">{item.icon}</span>
                        ) : (
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37]/50 flex-shrink-0" />
                        )}
                        <span>{item.text}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.highlight && (
                  <div className="my-6 border-l-2 border-[#D4AF37] pl-6">
                    <p className="font-cormorant text-xl text-[#D4AF37] italic leading-snug">{section.highlight}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* End marker */}
          <div className="flex items-center gap-4 mt-16 mb-16">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
            <span className="text-[#D4AF37]/25 text-lg">✦ ✦ ✦</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />
          </div>

          {/* CTA block */}
          <div className="border border-[#D4AF37]/25 bg-[#D4AF37]/4 p-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
            <p className="font-cormorant text-[#D4AF37] text-2xl italic mb-3">Хотите применить это к вашему бизнесу?</p>
            <p className="text-white/45 text-sm mb-8 leading-relaxed max-w-md mx-auto">
              Персональный расчёт по вашей натальной карте — конкретные даты и рекомендации в PDF-отчёте в течение 24 часов.
            </p>
            <Link
              to="/#order"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#D4AF37] text-black font-bold tracking-wider hover:bg-[#FFD700] transition-all duration-300 text-sm"
            >
              {post.cta} <Icon name="ArrowRight" size={16} />
            </Link>
          </div>
        </div>
      </article>

      {/* OTHER POSTS */}
      {others.length > 0 && (
        <section className="py-16 border-t border-white/8 bg-[#030712]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-px flex-1 bg-white/8" />
              <span className="text-white/30 text-xs tracking-widest uppercase">Читайте также</span>
              <div className="h-px flex-1 bg-white/8" />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {others.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="group block">
                  <div className="border border-white/8 bg-[#0A1020] hover:border-[#D4AF37]/30 transition-all duration-300 p-7 h-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-500" />
                    <span className="text-[#D4AF37]/50 text-xs tracking-widest uppercase mb-4 block">{p.category}</span>
                    <h3 className="font-cormorant text-lg font-semibold text-white group-hover:text-[#D4AF37] transition-colors leading-snug mb-3">
                      {p.title}
                    </h3>
                    <p className="text-white/30 text-xs flex items-center gap-1 mt-4">
                      <Icon name="Clock" size={11} /> {p.readTime}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-[#D4AF37]/60 hover:text-[#D4AF37] text-sm tracking-wider transition-colors"
              >
                <Icon name="ArrowLeft" size={14} /> Все статьи
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/8 bg-[#030712] py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://cdn.poehali.dev/projects/55d0d6cb-91ca-48c2-89ac-6273cce5edf0/bucket/a7bf8ba5-dc79-454d-b1fa-746033e2ce43.jpg"
              alt="StarsBiz"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-cormorant text-[#D4AF37] text-lg tracking-widest font-semibold">STARSBIZ</span>
          </Link>
          <p className="text-white/20 text-xs">© 2025 StarsBiz. Все права защищены.</p>
          <Link to="/" className="text-white/35 text-xs hover:text-[#D4AF37] transition-colors">← Вернуться на главную</Link>
        </div>
      </footer>
    </div>
  );
}