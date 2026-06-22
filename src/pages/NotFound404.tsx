import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound404 = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error:", location.pathname);

    type YM = (id: number, method: string, url: string, params?: object) => void;
    const w = window as Window & { ym?: YM };
    if (typeof window !== "undefined" && w.ym) {
      w.ym(101026698, "hit", window.location.href, {
        title: "404 — Страница не найдена",
        params: { error404: location.pathname },
      });
    }
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 — Страница не найдена | StarsBiz</title>
        <meta name="prerender-status-code" content="404" />
        <meta name="robots" content="noindex, nofollow" />
        <meta http-equiv="Status" content="404 Not Found" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Главная", "item": "https://starsbiz.ru/" },
            { "@type": "ListItem", "position": 2, "name": "Страница не найдена" }
          ]
        })}</script>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-[#050A14] font-montserrat">
        <div className="text-center px-6">
          <p className="font-cormorant text-[#D4AF37] text-9xl font-light mb-2 leading-none">404</p>
          <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Страница не найдена</p>
          <p className="text-white/50 text-sm mb-10 max-w-xs mx-auto leading-relaxed">
            Возможно, страница была удалена или вы перешли по устаревшей ссылке.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-[#D4AF37] text-black text-sm font-semibold tracking-wider hover:bg-[#FFD700] transition-all duration-300"
            >
              На главную
            </Link>
            <Link
              to="/blog"
              className="px-6 py-3 border border-[#D4AF37]/40 text-[#D4AF37]/70 text-sm tracking-wider hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
            >
              В блог
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound404;