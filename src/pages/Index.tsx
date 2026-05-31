import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";
import TestimonialsStrip from "@/components/TestimonialsStrip";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/55d0d6cb-91ca-48c2-89ac-6273cce5edf0/files/da42bec6-5d11-4174-8b09-ec83223d0a6f.jpg";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
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
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const services = [
  {
    title: "Разовый прогноз на месяц",
    sub: "Бизнес, финансы, партнёры",
    price: "15 000 ₽",
    desc: "Детальный астрологический разбор ключевых событий предстоящего месяца с конкретными датами и рекомендациями.",
    icon: "CalendarDays",
  },
  {
    title: "Подбор бизнес-направления",
    sub: "Под ваш потенциал",
    price: "10 000 ₽",
    desc: "Анализ вашей натальной карты для определения наиболее органичных сфер бизнеса и перспективных ниш. Вы получите отчёт с конкретными рекомендациями.",
    icon: "TrendingUp",
    featured: true,
  },
  {
    title: "Годовой абонемент",
    sub: "12 помесячных прогнозов",
    price: "150 000 ₽",
    desc: "Полное астрологическое сопровождение вашего бизнеса на год. Ежемесячные прогнозы, срочные консультации и стратегические сессии.",
    icon: "Star",
  },
  {
    title: "Совместимость и сделки",
    sub: "Партнёр / дата для сделки",
    price: "10 000 ₽",
    desc: "Синастрический анализ совместимости с деловым партнёром и подбор астрологически благоприятной даты для подписания договора.",
    icon: "Handshake",
  },
];

const steps = [
  { icon: "CalendarDays", title: "Вы присылаете данные", desc: "Дата, время и место рождения — чем точнее, тем глубже анализ." },
  { icon: "Clock", title: "Расчёт (до 24 часов)", desc: "Строим натальную карту и анализируем транзиты с эфемеридной точностью." },
  { icon: "FileText", title: "Получаете PDF-отчёт", desc: "Конкретные даты, события и рекомендации для принятия решений." },
  { icon: "ShieldCheck", title: "Гарантии", desc: "Мы уверены в качестве наших прогнозов. Если не получили полезной информации (ни одной конкретной даты, аспекта или практического совета), мы бесплатно доработаем прогноз с учётом ваших пожеланий." },
];

const TBANK_PAYMENT_URL = "https://functions.poehali.dev/e2c3d169-d410-468e-b001-7dfc2df51b14";

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "+7 ", comment: "" });
  const [pdConsent, setPdConsent] = useState(false);
  const [payModal, setPayModal] = useState(false);
  const [payForm, setPayForm] = useState({ name: "", email: "", phone: "+7 ", service: "Разовый прогноз на месяц", amount: "15000" });
  const [payLoading, setPayLoading] = useState(false);
  const [payError, setPayError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return setFormError("Введите ваше имя");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return setFormError("Введите корректный email");
    if (formData.phone.replace(/\D/g, "").length < 11) return setFormError("Введите полный номер телефона");
    if (!pdConsent) return setFormError("Необходимо дать согласие на обработку персональных данных");
    setFormError("");
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "+7 ", comment: "" });
    setPdConsent(false);
  };

  const handlePaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPayError("");
    if (!payForm.name.trim()) return setPayError("Введите ваше имя");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payForm.email)) return setPayError("Введите корректный email");
    setPayLoading(true);
    try {
      const orderId = `order_${Date.now()}`;
      const res = await fetch(TBANK_PAYMENT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseInt(payForm.amount),
          orderId,
          description: payForm.service,
          email: payForm.email,
          phone: payForm.phone,
        }),
      });
      const data = await res.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        setPayError(data.error || "Ошибка создания платежа");
      }
    } catch {
      setPayError("Ошибка соединения. Попробуйте ещё раз.");
    } finally {
      setPayLoading(false);
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#050A14] text-white font-montserrat overflow-x-hidden">
      <Helmet>
        <title>StarsBiz — Астрологический бизнес-консультант | Звёзды для вашей прибыли</title>
        <meta name="description" content="Астрологический бизнес-консультант StarsBiz — точный расчёт транзитов для принятия бизнес-решений. Конфиденциально, под NDA. Разовые прогнозы, годовые абонементы, подбор бизнес-направления." />
        <link rel="canonical" href="https://starsbiz.ru/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="StarsBiz — Астрологический бизнес-консультант" />
        <meta property="og:description" content="Точный расчёт транзитов для принятия бизнес-решений. Конфиденциально, под NDA." />
        <meta property="og:url" content="https://starsbiz.ru/" />
        <meta property="og:site_name" content="StarsBiz" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="StarsBiz — Астрологический бизнес-консультант" />
        <meta name="twitter:description" content="Точный расчёт транзитов для принятия бизнес-решений. Конфиденциально, под NDA." />
      </Helmet>

      {/* HEADER */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(5,10,20,0.97)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(212,175,55,0.15)" : "none",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.5)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("hero")}>
            <img
              src="https://cdn.poehali.dev/projects/55d0d6cb-91ca-48c2-89ac-6273cce5edf0/bucket/a7bf8ba5-dc79-454d-b1fa-746033e2ce43.jpg"
              alt="StarsBiz"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <div className="font-cormorant text-[#D4AF37] text-2xl font-semibold tracking-widest leading-none">STARSBIZ</div>
              <div className="font-cormorant text-white/40 text-sm tracking-wider leading-none mt-1">starsbiz.ru</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[["about", "Методика"], ["services", "Услуги"], ["how", "Как работаем"], ["order", "Заказать"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-white/60 hover:text-[#D4AF37] text-sm tracking-wider transition-colors duration-300 font-medium"
              >
                {label}
              </button>
            ))}
            <Link
              to="/blog"
              className="text-white/60 hover:text-[#D4AF37] text-sm tracking-wider transition-colors duration-300 font-medium"
            >
              Блог
            </Link>
          </nav>

          <button
            onClick={() => scrollTo("order")}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 border border-[#D4AF37] text-[#D4AF37] text-sm tracking-wider hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-semibold"
          >
            Заказать прогноз
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Меню"
          >
            <span className={`block w-6 h-0.5 bg-[#D4AF37] transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#D4AF37] transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-[#D4AF37] transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* Mobile menu dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-96" : "max-h-0"}`}
          style={{ background: "rgba(5,10,20,0.97)", borderTop: mobileMenuOpen ? "1px solid rgba(212,175,55,0.15)" : "none" }}
        >
          <nav className="flex flex-col px-6 py-4 gap-4">
            {[["about", "Методика"], ["services", "Услуги"], ["how", "Как работаем"], ["order", "Заказать"]].map(([id, label]) => (
              <button
                key={id}
                onClick={() => { scrollTo(id); setMobileMenuOpen(false); }}
                className="text-white/70 hover:text-[#D4AF37] text-sm tracking-wider transition-colors duration-300 font-medium text-left py-1"
              >
                {label}
              </button>
            ))}
            <Link
              to="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/70 hover:text-[#D4AF37] text-sm tracking-wider transition-colors duration-300 font-medium py-1"
            >
              Блог
            </Link>
            <button
              onClick={() => { scrollTo("order"); setMobileMenuOpen(false); }}
              className="mt-2 px-6 py-2.5 border border-[#D4AF37] text-[#D4AF37] text-sm tracking-wider hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-semibold text-center"
            >
              Заказать прогноз
            </button>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050A14]/70 via-[#050A14]/40 to-[#050A14]" />

        {/* Decorative stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-[#D4AF37] rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.2,
                transform: `scale(${Math.random() * 2 + 1})`,
                animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-24">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 border border-[#D4AF37]/40 text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-8"
            style={{ animation: "fadeInDown 1s ease 0.2s both" }}
          >
            <span>✦</span> Астрологический бизнес-консультант <span>✦</span>
          </div>

          <h1
            className="font-cormorant text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-8 text-white"
            style={{ animation: "fadeInUp 1s ease 0.4s both" }}
          >
            Звёзды для{" "}
            <span className="text-[#D4AF37] italic">вашей прибыли</span>
          </h1>

          <p
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
            style={{ animation: "fadeInUp 1s ease 0.6s both" }}
          >
            Точный астрологический расчёт транзитов для принятия бизнес-решений.
            Конфиденциально. Для собственников.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: "fadeInUp 1s ease 0.8s both" }}
          >
            <button
              onClick={() => scrollTo("order")}
              className="px-10 py-4 bg-[#D4AF37] text-black font-bold tracking-wider hover:bg-[#FFD700] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] text-sm"
            >
              ЗАКАЗАТЬ ПРОГНОЗ
            </button>
            <button
              onClick={() => scrollTo("services")}
              className="px-10 py-4 border border-white/30 text-white/80 font-medium tracking-wider hover:border-[#D4AF37]/60 hover:text-white transition-all duration-300 text-sm"
            >
              УСЛУГИ И ЦЕНЫ
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-[#D4AF37]" style={{ animation: "pulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.04)_0%,_transparent_70%)]" />
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-16 bg-[#D4AF37]/40" />
              <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase">О методике</span>
              <div className="h-px w-16 bg-[#D4AF37]/40" />
            </div>
            <h2 className="font-cormorant text-4xl md:text-6xl font-light text-white leading-tight">
              Наука и <span className="text-[#D4AF37] italic">космос</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn delay={0.1}>
              <p className="text-white/65 text-lg leading-relaxed mb-8">
                Авторский метод на стыке западной и ведической традиций — с математической точностью эфемеридного расчёта.
                Закрытая практика исключительно для собственников бизнеса и топ-менеджеров.
              </p>
              <div className="p-6 border border-[#D4AF37]/30 bg-[#D4AF37]/5">
                <p className="font-cormorant text-[#D4AF37] text-2xl font-medium leading-snug italic">
                  «Звёзды не управляют судьбой — но показывают, когда действовать, а когда ждать»
                </p>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-6">
                {[["10+", "лет практики"], ["500+", "клиентов"], ["100%", "конфиденциально"]].map(([n, l]) => (
                  <div key={n} className="text-center">
                    <div className="font-cormorant text-[#D4AF37] text-3xl font-bold">{n}</div>
                    <div className="text-white/40 text-xs mt-1 tracking-wide">{l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="space-y-6">
                {/* Marketing block */}
                <div className="bg-[#0A1628] border border-[#D4AF37]/15 p-6 space-y-4">
                  <p className="font-cormorant text-[#D4AF37] text-xl italic leading-snug">
                    «То, о чём молчат другие астрологи. Я не предсказываю будущее — я вычисляю его с погрешностью до 15 минут.»
                  </p>
                  <div className="h-px bg-[#D4AF37]/15" />
                  <p className="text-white/70 text-sm leading-relaxed">
                    Только для тех, кто не может позволить себе ошибку. Без очереди, без огласки — ваше имя не появится нигде.
                  </p>
                  <p className="text-white/50 text-sm font-medium">В отличие от масс-маркета:</p>
                  <div className="space-y-2">
                    {[
                      "Никаких общих фраз («ждутся перемены»).",
                      "Только даты, аспекты, риски.",
                      "Ваши данные удаляются после прогноза.",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3 text-sm text-white/55">
                        <span className="text-[#D4AF37] mt-0.5 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="h-px bg-[#D4AF37]/15" />
                  <p className="text-white/70 text-sm leading-relaxed">
                    Три лучшие даты для сделок, два периода тишины — конкретно, без воды.
                  </p>
                  <div className="h-px bg-[#D4AF37]/15" />
                  <p className="text-white/55 text-sm leading-relaxed">
                    Один клиент сэкономил <span className="text-white/90 font-medium">700 000 ₽</span>, перенеся сделку на два дня по прогнозу. Другой — не послушал и потерял контракт.
                  </p>
                  <p className="text-white/40 text-sm italic">
                    Выбор за вами. Расчёт за мной (в пределах оферты).
                  </p>
                  <div className="h-px bg-[#D4AF37]/15" />
                  <p className="font-cormorant text-[#D4AF37]/80 text-lg italic">
                    «Это не гороскоп из газеты — это навигатор для вашего календаря.»
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 bg-[#030712]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-16 bg-[#D4AF37]/40" />
              <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase">Услуги и цены</span>
              <div className="h-px w-16 bg-[#D4AF37]/40" />
            </div>
            <h2 className="font-cormorant text-4xl md:text-6xl font-light text-white">
              Выберите <span className="text-[#D4AF37] italic">формат</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  className={`relative flex flex-col h-full p-8 border transition-all duration-500 group cursor-pointer hover:shadow-[0_0_40px_rgba(212,175,55,0.1)] ${
                    s.featured
                      ? "border-[#D4AF37]/60 bg-[#D4AF37]/5"
                      : "border-white/10 bg-[#0A1020] hover:border-[#D4AF37]/30"
                  }`}
                  onClick={() => scrollTo("order")}
                >
                  {s.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#D4AF37] text-black text-xs font-bold tracking-wider whitespace-nowrap">
                      ПОПУЛЯРНО
                    </div>
                  )}
                  <div className="mb-6">
                    <Icon name={s.icon} size={28} className="text-[#D4AF37]" />
                  </div>
                  <h3 className="font-cormorant text-xl font-semibold text-white mb-1 leading-snug">{s.title}</h3>
                  <p className="text-[#D4AF37]/70 text-xs tracking-wide mb-4">{s.sub}</p>
                  <p className="text-white/45 text-sm leading-relaxed flex-1 mb-6">{s.desc}</p>
                  <div className="mt-auto">
                    <div className="font-cormorant text-3xl font-bold text-[#D4AF37] mb-4">{s.price}</div>
                    <button
                      className={`w-full py-3 text-xs tracking-wider font-bold transition-all duration-300 ${
                        s.featured
                          ? "bg-[#D4AF37] text-black hover:bg-[#FFD700]"
                          : "border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                      }`}
                    >
                      ВЫБРАТЬ
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section id="how" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(212,175,55,0.04)_0%,_transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-16 bg-[#D4AF37]/40" />
              <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase">Как мы работаем</span>
              <div className="h-px w-16 bg-[#D4AF37]/40" />
            </div>
            <h2 className="font-cormorant text-4xl md:text-6xl font-light text-white">
              Четыре <span className="text-[#D4AF37] italic">шага</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <div className="text-center group">
                  <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6 mx-auto">
                    <div className="absolute inset-0 border border-[#D4AF37]/30 rotate-45 group-hover:rotate-[135deg] transition-transform duration-700" />
                    <Icon name={step.icon} size={28} className="text-[#D4AF37]" />
                  </div>
                  <div className="font-cormorant text-[#D4AF37]/30 text-5xl font-bold mb-3 leading-none">0{i + 1}</div>
                  <h4 className="text-white font-semibold text-sm tracking-wide mb-3">{step.title}</h4>
                  <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONFIDENTIALITY */}
      <section className="py-24 bg-[#030712]">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="border border-[#D4AF37]/20 bg-[#D4AF37]/3 p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

              <div className="inline-flex items-center justify-center w-16 h-16 border border-[#D4AF37]/30 mb-8 mx-auto">
                <Icon name="Lock" size={28} className="text-[#D4AF37]" />
              </div>

              <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#D4AF37]/40" />
                <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase">Конфиденциальность</span>
                <div className="h-px w-12 bg-[#D4AF37]/40" />
              </div>

              <h2 className="font-cormorant text-4xl md:text-5xl font-light text-white mb-6">
                Ваша тайна — <span className="text-[#D4AF37] italic">под защитой</span>
              </h2>

              <p className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                Никаких публикаций. Работаем под NDA. Ваши данные удаляются после консультации.
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                {["NDA", "Без публикаций", "Данные удаляются", "Только для вас"].map((tag) => (
                  <div key={tag} className="px-5 py-2 border border-[#D4AF37]/25 text-[#D4AF37]/70 text-xs tracking-wider">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <TestimonialsStrip />

      {/* ORDER FORM */}
      <section id="order" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.05)_0%,_transparent_60%)]" />
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-16 bg-[#D4AF37]/40" />
              <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase">Заявка</span>
              <div className="h-px w-16 bg-[#D4AF37]/40" />
            </div>
            <h2 className="font-cormorant text-4xl md:text-5xl font-light text-white">
              Закажите <span className="text-[#D4AF37] italic">консультацию</span>
            </h2>
            <p className="text-white/45 mt-4 text-base">Ответим в течение 2 часов в рабочее время</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            {submitted ? (
              <div className="text-center py-20 border border-[#D4AF37]/30 bg-[#D4AF37]/5">
                <div className="text-5xl mb-6">✦</div>
                <h3 className="font-cormorant text-3xl text-[#D4AF37] mb-4">Спасибо!</h3>
                <p className="text-white/60 text-lg">Мы свяжемся с вами в ближайшее время.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-[#D4AF37]/60 text-sm hover:text-[#D4AF37] transition-colors"
                >
                  Отправить ещё одну заявку →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder="Ваше имя *"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    className="w-full bg-[#0A1020] border border-white/15 text-white placeholder-white/30 px-5 py-4 text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="w-full bg-[#0A1020] border border-white/15 text-white placeholder-white/30 px-5 py-4 text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={formData.phone}
                    onChange={(e) => handlePhone(e.target.value)}
                    className="w-full bg-[#0A1020] border border-white/15 text-white placeholder-white/30 px-5 py-4 text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Комментарий (необязательно)"
                    rows={4}
                    value={formData.comment}
                    onChange={(e) => setFormData((p) => ({ ...p, comment: e.target.value }))}
                    className="w-full bg-[#0A1020] border border-white/15 text-white placeholder-white/30 px-5 py-4 text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors resize-none"
                  />
                </div>
                {/* Согласие на обработку ПД */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={pdConsent}
                      onChange={(e) => { setPdConsent(e.target.checked); if (e.target.checked) setFormError(""); }}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 border transition-all duration-200 flex items-center justify-center flex-shrink-0 ${
                        pdConsent
                          ? "border-[#D4AF37] bg-[#D4AF37]"
                          : "border-white/25 bg-transparent group-hover:border-[#D4AF37]/50"
                      }`}
                    >
                      {pdConsent && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#000" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-white/40 text-xs leading-relaxed group-hover:text-white/60 transition-colors">
                    Я даю согласие на обработку моих персональных данных в соответствии с{" "}
                    <Link
                      to="/privacy"
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#D4AF37]/60 hover:text-[#D4AF37] underline underline-offset-2 transition-colors"
                    >
                      Политикой конфиденциальности
                    </Link>{" "}
                    и подтверждаю своё согласие на обработку персональных данных согласно ФЗ-152 «О персональных данных» *
                  </span>
                </label>

                {formError && <p className="text-red-400/80 text-sm">{formError}</p>}
                <button
                  type="submit"
                  className="w-full py-5 bg-[#D4AF37] text-black font-bold tracking-widest hover:bg-[#FFD700] transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] text-sm"
                >
                  ОТПРАВИТЬ ЗАЯВКУ
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </section>

      {/* PAYMENT MODAL */}
      {payModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={() => setPayModal(false)}>
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md bg-[#080E1C] border border-[#D4AF37]/25 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setPayModal(false)}
              className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors text-xl"
            >
              ✕
            </button>
            <div className="text-center mb-8">
              <div className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase mb-3">Оплата услуг</div>
              <h3 className="font-cormorant text-3xl text-white">Оформить оплату</h3>
            </div>
            <form onSubmit={handlePaySubmit} className="space-y-4">
              <select
                value={payForm.service}
                onChange={(e) => {
                  const prices: Record<string, string> = {
                    "Разовый прогноз на месяц": "15000",
                    "Подбор бизнес-направления": "10000",
                    "Годовой прогноз": "25000",
                    "Другое": "0",
                  };
                  setPayForm((p) => ({ ...p, service: e.target.value, amount: prices[e.target.value] || "0" }));
                }}
                className="w-full bg-[#0A1020] border border-white/15 text-white px-5 py-4 text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
              >
                <option>Разовый прогноз на месяц</option>
                <option>Подбор бизнес-направления</option>
                <option>Годовой прогноз</option>
                <option>Другое</option>
              </select>
              <input
                type="text"
                placeholder="Ваше имя *"
                value={payForm.name}
                onChange={(e) => setPayForm((p) => ({ ...p, name: e.target.value }))}
                className="w-full bg-[#0A1020] border border-white/15 text-white placeholder-white/30 px-5 py-4 text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
              />
              <input
                type="email"
                placeholder="Email для чека *"
                value={payForm.email}
                onChange={(e) => setPayForm((p) => ({ ...p, email: e.target.value }))}
                className="w-full bg-[#0A1020] border border-white/15 text-white placeholder-white/30 px-5 py-4 text-sm focus:outline-none focus:border-[#D4AF37]/60 transition-colors"
              />
              <div className="flex gap-3 items-center bg-[#0A1020] border border-white/15 px-5 py-4">
                <span className="text-white/40 text-sm">Сумма:</span>
                <input
                  type="number"
                  value={payForm.amount}
                  onChange={(e) => setPayForm((p) => ({ ...p, amount: e.target.value }))}
                  className="flex-1 bg-transparent text-[#D4AF37] text-sm font-semibold focus:outline-none"
                />
                <span className="text-white/40 text-sm">₽</span>
              </div>
              {payError && <p className="text-red-400/80 text-sm">{payError}</p>}
              <button
                type="submit"
                disabled={payLoading}
                className="w-full py-4 bg-[#D4AF37] text-black font-bold tracking-widest hover:bg-[#FFD700] transition-all duration-300 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {payLoading ? "ПОДОЖДИТЕ..." : "ПЕРЕЙТИ К ОПЛАТЕ"}
              </button>
              <p className="text-white/20 text-xs text-center">Оплата через Т-Банк. Безопасно и быстро.</p>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/8 bg-[#030712] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-5">
                <img
                  src="https://cdn.poehali.dev/projects/55d0d6cb-91ca-48c2-89ac-6273cce5edf0/bucket/a7bf8ba5-dc79-454d-b1fa-746033e2ce43.jpg"
                  alt="StarsBiz"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-cormorant text-[#D4AF37] text-lg font-semibold tracking-widest leading-none">STARSBIZ</div>
                  <div className="text-white/30 text-xs tracking-wider">starsbiz.ru</div>
                </div>
              </div>
              <p className="text-white/35 text-sm leading-relaxed max-w-xs">
                Астрологический бизнес-консультант. Точный расчёт транзитов для принятия решений.
              </p>
              <div className="mt-6">
                <a href="mailto:info@starsbiz.ru" className="text-[#D4AF37]/60 hover:text-[#D4AF37] text-sm transition-colors">
                  info@starsbiz.ru
                </a>
              </div>
            </div>

            {/* Docs */}
            <div>
              <div className="text-white/40 text-xs tracking-widest uppercase mb-5">Документы</div>
              <ul className="space-y-3">
                {[
                  { label: "Политика конфиденциальности", href: "/privacy" },
                  { label: "Обработка персональных данных", href: "/consent" },
                  { label: "Публичная оферта", href: "/offer" },
                  { label: "Пользовательское соглашение", href: "/agreement" },
                ].map((doc) => (
                  <li key={doc.href}>
                    <a href={doc.href} className="text-white/35 text-xs hover:text-[#D4AF37]/70 transition-colors leading-relaxed">
                      {doc.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment & Requisites */}
            <div>
              <div className="text-white/40 text-xs tracking-widest uppercase mb-5">Оплата</div>
              <button
                onClick={() => setPayModal(true)}
                className="w-full py-3 border border-[#D4AF37]/30 text-[#D4AF37]/70 text-xs tracking-wider hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all duration-300 mb-6"
              >
                ОПЛАТИТЬ ОНЛАЙН
              </button>
              <div className="text-white/25 text-xs space-y-1 leading-relaxed">
                <div>ИП Растегаев В.Г.</div>
                <div>ИНН: 165019486049</div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs">© 2025 StarsBiz. Все права защищены.</p>
            <a href="/privacy" className="text-white/35 hover:text-[#D4AF37] text-xs transition-colors underline underline-offset-2">
              Политика конфиденциальности
            </a>
            <p className="text-white/15 text-xs">Результаты носят рекомендательный характер</p>
          </div>
        </div>
      </footer>
    </div>
  );
}