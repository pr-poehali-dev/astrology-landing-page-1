import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound404 = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <meta name="prerender-status-code" content="404" />
        <meta name="robots" content="noindex" />
        <title>404 — Страница не найдена | StarsBiz</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-[#050A14]">
        <div className="text-center">
          <p className="font-cormorant text-[#D4AF37] text-8xl font-light mb-4">404</p>
          <p className="text-white/60 text-lg mb-8">Страница не найдена</p>
          <Link
            to="/"
            className="px-6 py-3 border border-[#D4AF37] text-[#D4AF37] text-sm tracking-wider hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
          >
            Вернуться на главную
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound404;
