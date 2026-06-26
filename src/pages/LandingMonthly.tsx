import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const SEND_EMAIL_URL = "https://functions.poehali.dev/886dfb06-9b67-4c75-a1a0-0c933a4efba0";

const benefits = [
  { icon: "CalendarDays", text: "Детальный разбор ключевых событий месяца с конкретными датами и временными окнами" },
  { icon: "TrendingUp", text: "Благоприятные периоды для переговоров, запуска, инвестиций и подписания договоров" },
  { icon: "AlertTriangle", text: "Периоды повышенного риска — когда лучше взять паузу и не принимать решений" },
  { icon: "ShieldCheck", text: "Конфиденциально: ваши данные удаляются после прогноза. PDF-отчёт за 24 часа" },
];

export default function LandingMonthly() {
  const [formData, setFormData] = useState({ name: "", phone: "+7 ", birth: "", comment: "", source: "landing-monthly" });
  const [pdConsent, setPdConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handlePhone = (v: string) => {
    let digits = v.replace(/\D/g, "");
    if (digits.startsWith("7")) digits = digits.slice(1);
    if (digits.startsWith("8")) digits = digits.slice(1);
    let result = "+7 ";
    if (digits.length > 0) result += "(" + digits.slice(0, 3);
    if (digits.length >= 3) result += ") " + digits.slice(3, 6);
    if (digits.length >= 6) result += "-" + digits.slice(6, 8);
    if (digits.length >= 8) result += "-" + digits.slice(8, 10);
    setFormData((p) => ({ ...p, phone: result }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return setFormError("Введите ваше имя");
    if (formData.phone.replace(/\D/g, "").length < 11) return setFormError("Введите полный номер телефона");
    if (!formData.birth.trim()) return setFormError("Введите дату, время и место рождения");
    if (!pdConsent) return setFormError("Необходимо дать согласие на обработку персональных данных");
    setFormError("");
    try {
      await fetch(SEND_EMAIL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, email: "" }),
      });
    } catch (_e) { /* отправка не критична */ }
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#050A14] text-white font-montserrat">
      <Helmet>
        <title>Астрологический прогноз для бизнеса на месяц — StarsBiz</title>
        <meta name="description" content="Детальный астрологический прогноз для предпринимателя на месяц: благоприятные даты для сделок, переговоров и запусков. Конкретные даты, PDF-отчёт за 24 часа." />
        <link rel="canonical" href="https://starsbiz.ru/monthly" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <header className="px-6 py-5 flex justify-center border-b border-[#D4AF37]/10">
        <a href="https://starsbiz.ru" className="font-cormorant text-2xl text-[#D4AF37] tracking-widest">
          STARSBIZ
        </a>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-12 space-y-12">

        {/* HERO */}
        <section className="space-y-5 text-center">
          <div className="inline-block border border-[#D4AF37]/30 px-4 py-1.5 text-[#D4AF37] text-xs tracking-widest uppercase">
            Бизнес-прогноз
          </div>
          <h1 className="font-cormorant text-4xl md:text-5xl font-light leading-tight">
            Детальный прогноз<br />
            <span className="text-[#D4AF37] italic">для вашего бизнеса</span><br />
            на месяц
          </h1>
          <p className="text-white/60 text-base leading-relaxed max-w-lg mx-auto">
            Конкретные даты для переговоров, запусков и инвестиций.
            Периоды риска, когда лучше взять паузу. Без общих фраз — только факты.
          </p>
          <div className="flex items-center justify-center gap-2 text-[#D4AF37]/70 text-sm">
            <Icon name="Star" size={14} />
            <span>PDF-отчёт · За 24 часа · Конфиденциально</span>
            <Icon name="Star" size={14} />
          </div>
        </section>

        {/* ВЫГОДЫ */}
        <section className="space-y-3">
          {benefits.map((b) => (
            <div key={b.text} className="flex items-start gap-4 bg-[#0A1628] border border-[#D4AF37]/10 px-5 py-4">
              <Icon name={b.icon as Parameters<typeof Icon>[0]["name"]} size={18} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
              <span className="text-white/75 text-sm leading-relaxed">{b.text}</span>
            </div>
          ))}
        </section>

        {/* КЕЙС */}
        <section className="bg-[#0A1020] border-l-2 border-[#D4AF37] pl-6 pr-5 py-6 space-y-3">
          <p className="text-[#D4AF37] text-xs tracking-widest uppercase">Реальный кейс</p>
          <p className="font-cormorant text-xl italic text-white/90 leading-snug">
            «Годовой абонемент окупился в первые два месяца. Один правильно выбранный
            период для запуска нового направления — и мы вышли в плюс раньше плана.»
          </p>
          <div className="flex items-center gap-3 pt-1">
            <div className="w-8 h-px bg-[#D4AF37]/40" />
            <span className="text-white/40 text-xs">Дмитрий К., основатель IT-компании, Новосибирск</span>
          </div>
        </section>

        {/* ФОРМА */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="font-cormorant text-3xl font-light">Получить разбор</h2>
            <p className="text-white/40 text-sm">Ответ в течение 2 часов</p>
          </div>

          {submitted ? (
            <div className="bg-[#0A1628] border border-[#D4AF37]/30 p-8 text-center space-y-3">
              <Icon name="CheckCircle" size={40} className="text-[#D4AF37] mx-auto" />
              <p className="font-cormorant text-2xl text-[#D4AF37]">Заявка принята</p>
              <p className="text-white/50 text-sm">Свяжусь с вами в течение 2 часов</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя *"
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                className="w-full bg-[#0A1020] border border-white/15 text-white placeholder-white/30 px-5 py-4 text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
              />
              <input
                type="tel"
                placeholder="Телефон / Telegram *"
                value={formData.phone}
                onChange={(e) => handlePhone(e.target.value)}
                className="w-full bg-[#0A1020] border border-white/15 text-white placeholder-white/30 px-5 py-4 text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
              />
              <input
                type="text"
                placeholder="Дата, время и место рождения *"
                value={formData.birth}
                onChange={(e) => setFormData((p) => ({ ...p, birth: e.target.value }))}
                className="w-full bg-[#0A1020] border border-white/15 text-white placeholder-white/30 px-5 py-4 text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
              />
              <textarea
                placeholder="На какой месяц нужен прогноз? Какие задачи стоят?"
                rows={3}
                value={formData.comment}
                onChange={(e) => setFormData((p) => ({ ...p, comment: e.target.value }))}
                className="w-full bg-[#0A1020] border border-white/15 text-white placeholder-white/30 px-5 py-4 text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors resize-none"
              />

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative flex-shrink-0 mt-0.5">
                  <input type="checkbox" checked={pdConsent} onChange={(e) => { setPdConsent(e.target.checked); if (e.target.checked) setFormError(""); }} className="sr-only" />
                  <div className={`w-5 h-5 border transition-all duration-200 flex items-center justify-center flex-shrink-0 ${pdConsent ? "border-[#D4AF37] bg-[#D4AF37]" : "border-white/25 bg-transparent group-hover:border-[#D4AF37]/50"}`}>
                    {pdConsent && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                  </div>
                </div>
                <span className="text-white/40 text-xs leading-relaxed group-hover:text-white/60 transition-colors">
                  Я даю согласие на обработку персональных данных в соответствии с{" "}
                  <Link to="/privacy" target="_blank" onClick={(e) => e.stopPropagation()} className="text-[#D4AF37]/60 hover:text-[#D4AF37] underline underline-offset-2 transition-colors">
                    Политикой конфиденциальности
                  </Link> *
                </span>
              </label>

              {formError && <p className="text-red-400/80 text-sm">{formError}</p>}

              <button type="submit" className="w-full py-5 bg-[#D4AF37] text-black font-bold tracking-widest hover:bg-[#FFD700] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] text-sm">
                ПОЛУЧИТЬ РАЗБОР
              </button>
              <p className="text-center text-white/30 text-xs">Ответ в течение 2 часов · Конфиденциально</p>
            </form>
          )}
        </section>

      </main>

      <footer className="border-t border-[#D4AF37]/10 px-6 py-6 text-center space-y-2">
        <p className="text-white/20 text-xs">© 2025 StarsBiz · ИП Растегаев В.Г.</p>
        <div className="flex justify-center gap-4">
          <Link to="/privacy" className="text-white/20 text-xs hover:text-white/40 transition-colors">Политика конфиденциальности</Link>
          <Link to="/offer" className="text-white/20 text-xs hover:text-white/40 transition-colors">Публичная оферта</Link>
        </div>
      </footer>
    </div>
  );
}
