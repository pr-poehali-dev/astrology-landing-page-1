import { useEffect, useRef } from "react";

const testimonials = [
  {
    text: "Перенёс подписание договора аренды на три дня — по совету StarsBiz. Арендодатель сам вышел с лучшими условиями. Совпадение? Уже нет.",
    name: "Андрей В.",
    role: "Собственник сети кофеен",
    city: "Москва",
  },
  {
    text: "Скептически относился к астрологии, но коллега убедил попробовать перед крупной сделкой. Расчёт дал конкретные даты — сделка закрылась без единой проблемы.",
    name: "Игорь М.",
    role: "Генеральный директор, логистика",
    city: "Екатеринбург",
  },
  {
    text: "Проверяла совместимость с потенциальным партнёром по бизнесу. Прогноз предупредил о рисках — через месяц они проявились. Хорошо, что не вошла в долю.",
    name: "Елена Р.",
    role: "Владелец розничной сети",
    city: "Санкт-Петербург",
  },
  {
    text: "Годовой абонемент окупился в первые два месяца. Один правильно выбранный период для запуска нового направления — и мы вышли в плюс раньше плана.",
    name: "Дмитрий К.",
    role: "Основатель IT-компании",
    city: "Новосибирск",
  },
  {
    text: "Заказывала подбор бизнес-направления. Отчёт чёткий, без воды — три конкретные ниши с обоснованием. Одну уже запустила, результаты превзошли ожидания.",
    name: "Наталья Ш.",
    role: "Предприниматель",
    city: "Краснодар",
  },
  {
    text: "Пришёл с конкретным вопросом: когда выходить на новый рынок. Получил три окна с пояснением рисков каждого. Выбрал второе — всё прошло гладко.",
    name: "Роман Т.",
    role: "Коммерческий директор",
    city: "Казань",
  },
  {
    text: "Работаю в недвижимости — там время решает всё. StarsBiz стал частью моего инструментария. Уже три сделки закрыл в рекомендованные периоды без единого сбоя.",
    name: "Сергей Б.",
    role: "Руководитель агентства недвижимости",
    city: "Москва",
  },
  {
    text: "Думал, это несерьёзно. После первого же прогноза мнение изменилось: предупреждение о конфликте с подрядчиком сбылось день в день. Теперь советуюсь перед каждым крупным решением.",
    name: "Максим Л.",
    role: "Топ-менеджер производственного предприятия",
    city: "Самара",
  },
  {
    text: "Регулярно заказываю квартальные прогнозы для планирования инвестиций. Доходность портфеля выросла не только из-за этого — но правильные точки входа явно помогли.",
    name: "Оксана Ф.",
    role: "Частный инвестор",
    city: "Тюмень",
  },
  {
    text: "Использую прогнозы StarsBiz как дополнительный фильтр при найме ключевых сотрудников. Звучит необычно, но за два года ни одной ошибки в топ-подборе.",
    name: "Виктор Н.",
    role: "HR-директор, строительный холдинг",
    city: "Ростов-на-Дону",
  },
  {
    text: "Заказала разовый прогноз перед переговорами с иностранным партнёром. Дата была выбрана точно — партнёр сам предложил более выгодные условия, чем я рассчитывала.",
    name: "Марина Е.",
    role: "Владелец экспортной компании",
    city: "Владивосток",
  },
  {
    text: "Долго откладывал открытие второго офиса. StarsBiz назвал конкретное окно — открылись точно в срок. Первый квартал закрыли в плюс, хотя план был выйти в ноль.",
    name: "Алексей Г.",
    role: "Собственник юридической фирмы",
    city: "Нижний Новгород",
  },
];

const doubled = [...testimonials, ...testimonials];

export default function TestimonialsStrip() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const speed = 0.4;
    let x1 = 0;
    let x2 = 0;
    let raf: number;
    let paused1 = false;
    let paused2 = false;

    const el1 = row1Ref.current;
    const el2 = row2Ref.current;
    if (!el1 || !el2) return;

    const halfWidth1 = el1.scrollWidth / 2;
    const halfWidth2 = el2.scrollWidth / 2;

    const animate = () => {
      if (!paused1) {
        x1 -= speed;
        if (Math.abs(x1) >= halfWidth1) x1 = 0;
        el1.style.transform = `translateX(${x1}px)`;
      }
      if (!paused2) {
        x2 += speed;
        if (x2 >= 0) x2 = -halfWidth2;
        el2.style.transform = `translateX(${x2}px)`;
      }
      raf = requestAnimationFrame(animate);
    };

    x2 = -halfWidth2 / 2;

    el1.addEventListener("mouseenter", () => { paused1 = true; });
    el1.addEventListener("mouseleave", () => { paused1 = false; });
    el2.addEventListener("mouseenter", () => { paused2 = true; });
    el2.addEventListener("mouseleave", () => { paused2 = false; });

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="py-24 bg-[#050A14] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-14 text-center">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="h-px w-16 bg-[#D4AF37]/40" />
          <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase">Отзывы клиентов</span>
          <div className="h-px w-16 bg-[#D4AF37]/40" />
        </div>
        <h2 className="font-cormorant text-4xl md:text-5xl font-light text-white">
          Говорят <span className="text-[#D4AF37] italic">клиенты</span>
        </h2>
      </div>

      <div className="space-y-5 select-none">
        {/* Ряд 1 — движется влево */}
        <div className="overflow-hidden">
          <div ref={row1Ref} className="flex gap-5 w-max">
            {doubled.map((t, i) => (
              <Card key={`r1-${i}`} t={t} />
            ))}
          </div>
        </div>

        {/* Ряд 2 — движется вправо */}
        <div className="overflow-hidden">
          <div ref={row2Ref} className="flex gap-5 w-max">
            {[...doubled].reverse().map((t, i) => (
              <Card key={`r2-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ t }: { t: typeof testimonials[0] }) {
  return (
    <div
      className="w-[340px] flex-shrink-0 border border-[#D4AF37]/15 bg-[#0A1020] p-6 hover:border-[#D4AF37]/40 transition-colors duration-300 cursor-default"
      style={{ minHeight: 180 }}
    >
      <p className="font-cormorant text-white/80 text-lg italic leading-snug mb-5">
        «{t.text}»
      </p>
      <div className="flex items-center gap-3 mt-auto">
        <div className="w-9 h-9 flex-shrink-0 border border-[#D4AF37]/30 flex items-center justify-center bg-[#D4AF37]/8">
          <span className="text-[#D4AF37] text-xs font-bold">
            {t.name.split(" ").map((w) => w[0]).join("")}
          </span>
        </div>
        <div>
          <p className="text-white/90 text-sm font-medium leading-tight">{t.name}</p>
          <p className="text-white/40 text-xs leading-tight mt-0.5">{t.role} · {t.city}</p>
        </div>
      </div>
    </div>
  );
}
