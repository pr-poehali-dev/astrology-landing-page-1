import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";
import { blogPosts } from "@/data/blogPosts";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const categories = ["Все", "Элективная астрология", "Прогнозы", "Финансы", "Партнёрство", "Стратегия", "Карьера", "Кейсы"];

export default function Blog() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Все");

  useEffect(() => {
    window.scrollTo(0, 0);
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = activeCategory === "Все"
    ? blogPosts
    : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#050A14] text-white font-montserrat overflow-x-hidden">
      <Helmet>
        <title>Астрологический блог для бизнеса – StarsBiz</title>
        <meta name="description" content="Экспертные статьи об астрологии для предпринимателей: транзиты, выбор дат для сделок, финансовые прогнозы, совместимость партнёров. Практические советы от StarsBiz." />
        <link rel="canonical" href="https://starsbiz.ru/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Астрологический блог для бизнеса – StarsBiz" />
        <meta property="og:description" content="Экспертные статьи об астрологии для предпринимателей: транзиты, выбор дат для сделок, финансовые прогнозы, совместимость партнёров." />
        <meta property="og:url" content="https://starsbiz.ru/blog" />
        <meta property="og:site_name" content="StarsBiz" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Астрологический блог для бизнеса – StarsBiz" />
        <meta name="twitter:description" content="Экспертные статьи об астрологии для предпринимателей." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Астрологический блог для бизнеса — StarsBiz",
          "url": "https://starsbiz.ru/blog",
          "description": "Экспертные статьи об астрологии для предпринимателей: транзиты, выбор дат для сделок, финансовые прогнозы, совместимость партнёров.",
          "publisher": {
            "@type": "Organization",
            "name": "StarsBiz",
            "url": "https://starsbiz.ru",
            "logo": {
              "@type": "ImageObject",
              "url": "https://cdn.poehali.dev/projects/55d0d6cb-91ca-48c2-89ac-6273cce5edf0/bucket/a7bf8ba5-dc79-454d-b1fa-746033e2ce43.jpg"
            }
          }
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://starsbiz.ru/" },
            { "@type": "ListItem", "position": 2, "name": "Блог", "item": "https://starsbiz.ru/blog" }
          ]
        })}</script>
      </Helmet>

      {/* HEADER */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(5,10,20,0.97)" : "rgba(5,10,20,0.8)",
          borderBottom: "1px solid rgba(212,175,55,0.1)",
          backdropFilter: "blur(16px)",
        }}
      >
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
          <Link to="/" className="md:hidden text-[#D4AF37]/60 text-sm">← Главная</Link>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-36 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.06)_0%,_transparent_60%)]" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 border border-[#D4AF37]/30 text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-8"
            style={{ animation: "fadeInDown 0.8s ease both" }}
          >
            <span>✦</span> Астрологический блог <span>✦</span>
          </div>
          <h1
            className="font-cormorant text-5xl md:text-7xl font-light text-white leading-tight mb-6"
            style={{ animation: "fadeInUp 0.8s ease 0.2s both" }}
          >
            Знания о <span className="text-[#D4AF37] italic">звёздах</span>
            <br />и бизнесе
          </h1>
          <p
            className="text-white/50 text-lg max-w-2xl mx-auto"
            style={{ animation: "fadeInUp 0.8s ease 0.4s both" }}
          >
            Экспертные материалы об астрологии для предпринимателей — транзиты, натальные карты, тайминг сделок
          </p>
        </div>
      </section>

      {/* FILTER */}
      <section className="pb-12 sticky top-[73px] z-40 bg-[#050A14]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2 text-xs tracking-wider transition-all duration-300 border ${
                  activeCategory === cat
                    ? "border-[#D4AF37] bg-[#D4AF37] text-black font-bold"
                    : "border-white/15 text-white/50 hover:border-[#D4AF37]/40 hover:text-[#D4AF37]/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* POSTS GRID */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured first post */}
          {filtered.length > 0 && activeCategory === "Все" && (
            <FadeIn className="mb-10">
              <Link to={`/blog/${filtered[0].slug}`} className="group block">
                <div className="border border-[#D4AF37]/25 bg-[#0A1020] hover:border-[#D4AF37]/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(212,175,55,0.08)] p-10 md:p-14 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
                  <div className="absolute top-6 right-6 px-3 py-1 bg-[#D4AF37] text-black text-xs font-bold tracking-wider">
                    СВЕЖЕЕ
                  </div>
                  <div className="max-w-3xl">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-[#D4AF37]/60 text-xs tracking-widest uppercase">{filtered[0].category}</span>
                      <span className="text-white/20 text-xs">·</span>
                      <span className="text-white/30 text-xs">{filtered[0].date}</span>
                      <span className="text-white/20 text-xs">·</span>
                      <span className="text-white/30 text-xs flex items-center gap-1">
                        <Icon name="Clock" size={12} /> {filtered[0].readTime}
                      </span>
                    </div>
                    <h2 className="font-cormorant text-3xl md:text-4xl font-medium text-white mb-4 group-hover:text-[#D4AF37] transition-colors duration-300 leading-snug">
                      {filtered[0].title}
                    </h2>
                    <p className="text-white/45 text-base leading-relaxed mb-8 max-w-2xl">{filtered[0].excerpt}</p>
                    <div className="flex items-center gap-2 text-[#D4AF37] text-sm tracking-wider font-semibold group-hover:gap-4 transition-all duration-300">
                      Читать статью <Icon name="ArrowRight" size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          )}

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCategory === "Все" ? filtered.slice(1) : filtered).map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.08}>
                <Link to={`/blog/${post.slug}`} className="group block h-full">
                  <div className="border border-white/10 bg-[#0A1020] hover:border-[#D4AF37]/35 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.07)] p-8 flex flex-col h-full relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-0 h-px bg-[#D4AF37] group-hover:w-full transition-all duration-500" />

                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[#D4AF37]/60 text-xs tracking-widest uppercase border border-[#D4AF37]/20 px-3 py-1">
                        {post.category}
                      </span>
                      <span className="text-white/25 text-xs flex items-center gap-1">
                        <Icon name="Clock" size={11} /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-cormorant text-xl font-semibold text-white mb-3 group-hover:text-[#D4AF37] transition-colors duration-300 leading-snug flex-1">
                      {post.title}
                    </h3>

                    <p className="text-white/40 text-sm leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>

                    <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/8">
                      <span className="text-white/25 text-xs">{post.date}</span>
                      <span className="text-[#D4AF37]/60 text-xs flex items-center gap-1 group-hover:text-[#D4AF37] transition-colors">
                        Читать <Icon name="ArrowRight" size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-white/30 font-cormorant text-2xl">
              Статьи в этой категории появятся скоро
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-white/8">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="font-cormorant text-[#D4AF37] text-5xl mb-6">✦</div>
            <h2 className="font-cormorant text-3xl md:text-4xl font-light text-white mb-4">
              Хотите персональный прогноз?
            </h2>
            <p className="text-white/45 mb-8">Статьи дают общее понимание. Расчёт по вашей карте — конкретные даты и решения.</p>
            <Link
              to="/#order"
              className="inline-flex items-center gap-3 px-10 py-4 bg-[#D4AF37] text-black font-bold tracking-wider hover:bg-[#FFD700] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] text-sm"
            >
              Заказать консультацию <Icon name="ArrowRight" size={16} />
            </Link>
          </FadeIn>
        </div>
      </section>

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