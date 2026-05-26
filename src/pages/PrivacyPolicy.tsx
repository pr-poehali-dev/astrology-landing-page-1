import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";

export default function PrivacyPolicy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#050A14] text-white font-montserrat">
      <Helmet>
        <title>Политика конфиденциальности — StarsBiz</title>
        <meta name="description" content="Политика конфиденциальности и обработки персональных данных StarsBiz (ИП Растегаев В.Г.)." />
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* HEADER */}
      <header className="border-b border-[#D4AF37]/10 bg-[#050A14]/97 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://cdn.poehali.dev/projects/55d0d6cb-91ca-48c2-89ac-6273cce5edf0/bucket/a7bf8ba5-dc79-454d-b1fa-746033e2ce43.jpg"
              alt="StarsBiz"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <div className="font-cormorant text-[#D4AF37] text-2xl font-semibold tracking-widest leading-none">STARSBIZ</div>
              <div className="font-cormorant text-white/40 text-sm tracking-wider leading-none mt-1">starsbiz.ru</div>
            </div>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-white/40 hover:text-[#D4AF37] text-sm tracking-wider transition-colors"
          >
            <Icon name="ArrowLeft" size={14} />
            На главную
          </Link>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#D4AF37]/40" />
            <span className="text-[#D4AF37] text-xs tracking-[0.3em] uppercase">Юридический документ</span>
            <div className="h-px w-12 bg-[#D4AF37]/40" />
          </div>
          <h1 className="font-cormorant text-4xl md:text-5xl font-light text-white mb-4">
            Политика <span className="text-[#D4AF37] italic">конфиденциальности</span>
          </h1>
          <p className="text-white/40 text-sm">Редакция от 26 мая 2025 г.</p>
        </div>

        <div className="space-y-10 text-white/65 text-sm leading-relaxed">

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">1. Общие положения</h2>
            <p className="mb-3">
              Настоящая Политика конфиденциальности (далее — «Политика») регулирует порядок сбора, хранения, использования и защиты персональных данных пользователей сайта <span className="text-[#D4AF37]">starsbiz.ru</span> (далее — «Сайт»).
            </p>
            <p className="mb-3">
              Оператором персональных данных является: <span className="text-white/90">Индивидуальный предприниматель Растегаев В.Г.</span>, ИНН: 165019486049 (далее — «Оператор»).
            </p>
            <p>
              Используя Сайт и отправляя заявку, пользователь выражает согласие с настоящей Политикой и условиями обработки его персональных данных. Если вы не согласны с Политикой, пожалуйста, прекратите использование Сайта.
            </p>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">2. Какие данные мы собираем</h2>
            <p className="mb-3">При оформлении заявки на Сайте Оператор собирает следующие персональные данные:</p>
            <ul className="space-y-2 pl-4">
              {[
                "Имя (фамилия, имя, отчество — при указании)",
                "Адрес электронной почты (e-mail)",
                "Номер телефона",
                "Дата, время и место рождения (для расчёта натальной карты)",
                "Произвольный комментарий, оставленный пользователем",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Также автоматически фиксируются технические данные: IP-адрес, тип браузера, страницы посещений — в целях обеспечения работы Сайта и улучшения сервиса.
            </p>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">3. Цели обработки персональных данных</h2>
            <p className="mb-3">Персональные данные обрабатываются в следующих целях:</p>
            <ul className="space-y-2 pl-4">
              {[
                "Обработка заявок и обратная связь с пользователем",
                "Оказание консультационных услуг астрологического характера",
                "Оформление договорных отношений и документооборота",
                "Информирование об изменениях в условиях оказания услуг",
                "Улучшение качества работы Сайта",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">4. Правовое основание обработки</h2>
            <p className="mb-3">
              Обработка персональных данных осуществляется на основании:
            </p>
            <ul className="space-y-2 pl-4">
              {[
                "Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных»",
                "Согласия субъекта персональных данных (п. 1 ч. 1 ст. 6 ФЗ-152)",
                "Исполнения договора, стороной которого является субъект персональных данных",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">5. Конфиденциальность и защита данных</h2>
            <p className="mb-3">
              Оператор принимает все необходимые организационные и технические меры для защиты персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
            </p>
            <p className="mb-3">
              Все консультации проводятся строго конфиденциально. По запросу пользователя может быть заключён договор о неразглашении (NDA).
            </p>
            <p>
              Доступ к персональным данным имеет только Оператор. Данные не передаются третьим лицам без письменного согласия пользователя, за исключением случаев, предусмотренных законодательством РФ.
            </p>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">6. Срок хранения данных</h2>
            <p>
              Персональные данные хранятся в течение срока, необходимого для достижения целей обработки, либо до момента отзыва согласия пользователем, но не более 5 лет с момента последнего взаимодействия. По истечении указанного срока данные уничтожаются.
            </p>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">7. Права пользователя</h2>
            <p className="mb-3">В соответствии с ФЗ-152 пользователь вправе:</p>
            <ul className="space-y-2 pl-4">
              {[
                "Получить информацию об обработке своих персональных данных",
                "Требовать уточнения, блокирования или уничтожения данных",
                "Отозвать согласие на обработку персональных данных",
                "Обжаловать действия Оператора в Роскомнадзоре",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              Для реализации своих прав обратитесь по адресу: <a href="mailto:info@starsbiz.ru" className="text-[#D4AF37] hover:text-[#FFD700] transition-colors">info@starsbiz.ru</a>
            </p>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">8. Cookies и аналитика</h2>
            <p>
              Сайт использует файлы cookie для обеспечения корректной работы и улучшения пользовательского опыта. Cookie не содержат персональных данных в явном виде. Вы можете отключить cookie в настройках вашего браузера, однако это может повлиять на функциональность Сайта.
            </p>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">9. Изменения Политики</h2>
            <p>
              Оператор оставляет за собой право вносить изменения в настоящую Политику. Актуальная версия всегда доступна на Сайте по адресу <span className="text-[#D4AF37]">starsbiz.ru/privacy</span>. Продолжение использования Сайта после внесения изменений означает согласие с обновлённой Политикой.
            </p>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">10. Контактные данные оператора</h2>
            <div className="space-y-2">
              <p><span className="text-white/40">Оператор:</span> <span className="text-white/90">ИП Растегаев В.Г.</span></p>
              <p><span className="text-white/40">ИНН:</span> <span className="text-white/90">165019486049</span></p>
              <p><span className="text-white/40">Email:</span>{" "}
                <a href="mailto:info@starsbiz.ru" className="text-[#D4AF37] hover:text-[#FFD700] transition-colors">
                  info@starsbiz.ru
                </a>
              </p>
              <p><span className="text-white/40">Сайт:</span>{" "}
                <a href="https://starsbiz.ru" className="text-[#D4AF37] hover:text-[#FFD700] transition-colors">
                  starsbiz.ru
                </a>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-white/8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#D4AF37]/60 hover:text-[#D4AF37] text-sm tracking-wider transition-colors"
          >
            <Icon name="ArrowLeft" size={14} />
            Вернуться на главную
          </Link>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/8 bg-[#030712] py-8">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">© 2025 StarsBiz. Все права защищены.</p>
          <p className="text-white/15 text-xs">ИП Растегаев В.Г. · ИНН 165019486049</p>
        </div>
      </footer>
    </div>
  );
}