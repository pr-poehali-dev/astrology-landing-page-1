import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function PaymentFail() {
  return (
    <>
      <Helmet>
        <title>Ошибка оплаты — StarsBiz</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
    <div className="min-h-screen bg-[#050A14] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-8 text-red-400">✕</div>
        <h1 className="font-cormorant text-4xl text-white mb-4">Оплата не прошла</h1>
        <p className="text-white/50 text-base mb-8 leading-relaxed">
          Что-то пошло не так. Попробуйте ещё раз или свяжитесь с нами напрямую.
        </p>
        <Link
          to="/#order"
          className="inline-block px-8 py-3 border border-[#D4AF37] text-[#D4AF37] text-sm tracking-wider hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
        >
          Попробовать снова
        </Link>
      </div>
    </div>
    </>
  );
}