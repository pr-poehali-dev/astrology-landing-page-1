import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";

export default function ConsentData() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#050A14] text-white font-montserrat">
      <Helmet>
        <title>Согласие на обработку персональных данных — StarsBiz</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <header className="border-b border-[#D4AF37]/10 bg-[#050A14]/97 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://cdn.poehali.dev/projects/55d0d6cb-91ca-48c2-89ac-6273cce5edf0/bucket/a7bf8ba5-dc79-454d-b1fa-746033e2ce43.jpg" alt="StarsBiz" className="w-20 h-20 rounded-full object-cover" />
            <div>
              <div className="font-cormorant text-[#D4AF37] text-2xl font-semibold tracking-widest leading-none">STARSBIZ</div>
              <div className="font-cormorant text-white/40 text-sm tracking-wider leading-none mt-1">starsbiz.ru</div>
            </div>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-white/40 hover:text-[#D4AF37] text-sm tracking-wider transition-colors">
            <Icon name="ArrowLeft" size={14} />На главную
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#D4AF37]/40" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase">Юридический документ</span>
            <div className="h-px w-12 bg-[#D4AF37]/40" />
          </div>
          <h1 className="font-cormorant text-4xl md:text-5xl font-light text-white mb-4">
            Согласие на <span className="text-[#D4AF37] italic">обработку данных</span>
          </h1>
          <p className="text-white/40 text-sm">Редакция от 26 мая 2025 г.</p>
        </div>

        <div className="space-y-10 text-white/65 text-sm leading-relaxed">

          <section>
            <p className="mb-4">
              Я, действуя своей волей и в своём интересе, даю согласие <span className="text-white/90">Индивидуальному предпринимателю Растегаеву В.Г.</span> (ИНН: 165019486049, сайт: <span className="text-[#D4AF37]">https://starsbiz.ru</span>) (далее — «Оператор») на обработку следующих моих персональных данных:
            </p>
            <ul className="space-y-2 pl-4 mb-4">
              {["Фамилия, имя, отчество", "Дата, время и место рождения", "Место проживания", "Адрес электронной почты", "Номер телефона / мессенджера", "Данные об оплате услуг"].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span><span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">Цель обработки</h2>
            <p>
              Оказание астрологических консультационных услуг в дистанционном формате: расчёт натальной карты и планетарных транзитов, подготовка персонального прогноза в формате PDF-отчёта, обратная связь по заказу, оформление договорных отношений и первичной документации.
            </p>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">Перечень действий с персональными данными</h2>
            <p className="mb-3">Оператор вправе осуществлять следующие действия:</p>
            <ul className="space-y-2 pl-4">
              {[
                "Сбор и запись персональных данных",
                "Систематизация, накопление и хранение",
                "Уточнение (обновление, изменение)",
                "Использование в целях оказания услуг",
                "Передача третьим лицам — исключительно платёжным системам в целях проведения расчётов",
                "Блокирование, удаление и уничтожение по истечении срока хранения или при отзыве согласия",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span><span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">Срок действия согласия</h2>
            <p>
              Настоящее согласие действует бессрочно — до момента его отзыва. Отзыв согласия осуществляется путём направления письменного уведомления на адрес: <a href="mailto:info@starsbiz.ru" className="text-[#D4AF37] hover:text-[#FFD700] transition-colors">info@starsbiz.ru</a>. После получения отзыва Оператор прекращает обработку персональных данных и уничтожает их в течение <span className="text-white/90">30 (тридцати) календарных дней</span>.
            </p>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">Подтверждение</h2>
            <p>
              Заполняя форму заказа на сайте и нажимая кнопку «Отправить заявку», я подтверждаю, что ознакомлен(-а) с{" "}
              <Link to="/privacy" className="text-[#D4AF37] hover:text-[#FFD700] transition-colors">Политикой конфиденциальности</Link>{" "}
              Оператора, размещённой по адресу <span className="text-[#D4AF37]">https://starsbiz.ru/privacy</span>, принимаю её условия и даю согласие на обработку своих персональных данных в объёме, указанном выше.
            </p>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">Реквизиты оператора</h2>
            <div className="space-y-2">
              <p><span className="text-white/40">Оператор:</span> <span className="text-white/90">ИП Растегаев В.Г.</span></p>
              <p><span className="text-white/40">ИНН:</span> <span className="text-white/90">165019486049</span></p>
              <p><span className="text-white/40">Email:</span> <a href="mailto:info@starsbiz.ru" className="text-[#D4AF37] hover:text-[#FFD700] transition-colors">info@starsbiz.ru</a></p>
              <p><span className="text-white/40">Сайт:</span> <a href="https://starsbiz.ru" className="text-[#D4AF37] hover:text-[#FFD700] transition-colors">starsbiz.ru</a></p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/8 text-center">
          <Link to="/" className="inline-flex items-center gap-2 text-[#D4AF37]/60 hover:text-[#D4AF37] text-sm tracking-wider transition-colors">
            <Icon name="ArrowLeft" size={14} />Вернуться на главную
          </Link>
        </div>
      </main>

      <footer className="border-t border-white/8 bg-[#030712] py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">© 2025 StarsBiz. Все права защищены.</p>
          <p className="text-white/15 text-xs">ИП Растегаев В.Г. · ИНН 165019486049</p>
        </div>
      </footer>
    </div>
  );
}