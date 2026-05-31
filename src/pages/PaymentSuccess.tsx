import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-[#050A14] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-8 text-[#D4AF37]">✦</div>
        <h1 className="font-cormorant text-4xl text-white mb-4">Оплата прошла успешно</h1>
        <p className="text-white/50 text-base mb-8 leading-relaxed">
          Мы получили ваш платёж и приступаем к подготовке прогноза. Свяжемся с вами в ближайшее время.
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 border border-[#D4AF37] text-[#D4AF37] text-sm tracking-wider hover:bg-[#D4AF37] hover:text-black transition-all duration-300"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
