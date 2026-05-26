import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";

export default function UserAgreement() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#050A14] text-white font-montserrat">
      <Helmet>
        <title>Пользовательское соглашение — StarsBiz</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <header className="border-b border-[#D4AF37]/10 bg-[#050A14]/97 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://cdn.poehali.dev/projects/55d0d6cb-91ca-48c2-89ac-6273cce5edf0/bucket/a7bf8ba5-dc79-454d-b1fa-746033e2ce43.jpg" alt="StarsBiz" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="font-cormorant text-[#D4AF37] text-xl font-semibold tracking-widest leading-none">STARS</div>
              <div className="font-cormorant text-white/60 text-xs tracking-[0.3em] leading-none">BIZ</div>
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
            Пользовательское <span className="text-[#D4AF37] italic">соглашение</span>
          </h1>
          <p className="text-white/40 text-sm mb-2">Редакция от 26 мая 2025 г.</p>
          <p className="text-white/35 text-sm">Сайта <span className="text-[#D4AF37]">https://starsbiz.ru</span></p>
        </div>

        <div className="space-y-10 text-white/65 text-sm leading-relaxed">

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">1. Общие положения</h2>
            <div className="space-y-3">
              <p>1.1. Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между <span className="text-white/90">ИП Растегаевым Виктором Геннадьевичем</span> (ИНН: 165019486049), именуемым далее «Администрация», и любым лицом, использующим сайт <span className="text-[#D4AF37]">https://starsbiz.ru</span> (далее — «Пользователь»).</p>
              <p>1.2. Начало использования Сайта (просмотр страниц, заполнение форм, оформление заказа) означает полное и безоговорочное принятие Пользователем условий настоящего Соглашения.</p>
              <p>1.3. Администрация вправе в одностороннем порядке вносить изменения в Соглашение. Изменения вступают в силу с момента публикации обновлённой редакции на Сайте. Продолжение использования Сайта после публикации изменений означает согласие Пользователя с новой редакцией.</p>
            </div>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">2. Права и обязанности Пользователя</h2>
            <p className="mb-3">2.1. Пользователь обязуется:</p>
            <ul className="space-y-2 pl-4 mb-4">
              {[
                "Предоставлять достоверные, актуальные и полные данные при заполнении форм заказа.",
                "Использовать Сайт исключительно в законных целях, не нарушая права третьих лиц.",
                "Не предпринимать действий, направленных на несанкционированный доступ к программному обеспечению, серверам или административной части Сайта.",
                "Не воспроизводить, не копировать и не распространять материалы Сайта без письменного согласия Администрации.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span><span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mb-3">2.2. Пользователь вправе:</p>
            <ul className="space-y-2 pl-4">
              {[
                "Заказывать астрологические консультации в порядке, предусмотренном Публичной офертой.",
                "Получать информацию об актуальных услугах и их стоимости.",
                "Обращаться к Администрации по любым вопросам, связанным с оказанием услуг.",
                "Отозвать согласие на обработку персональных данных в порядке, установленном Политикой конфиденциальности.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span><span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">3. Права и обязанности Администрации</h2>
            <p className="mb-3">3.1. Администрация обязуется:</p>
            <ul className="space-y-2 pl-4 mb-4">
              {[
                "Оказывать услуги в соответствии с условиями Публичной оферты.",
                "Обеспечивать конфиденциальность персональных данных Пользователя в соответствии с Политикой конфиденциальности.",
                "Своевременно уведомлять Пользователей об изменениях условий Соглашения путём публикации новой редакции на Сайте.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span><span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mb-3">3.2. Администрация вправе:</p>
            <ul className="space-y-2 pl-4">
              {[
                "Отказать в оказании услуг Пользователю, если его действия нарушают условия настоящего Соглашения или наносят ущерб репутации Сайта.",
                "Изменять стоимость и состав услуг, размещая актуальную информацию на Сайте.",
                "Временно приостанавливать работу Сайта в целях проведения технических работ.",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span><span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">4. Интеллектуальная собственность</h2>
            <div className="space-y-3">
              <p>4.1. Все материалы Сайта (тексты, графика, логотип, дизайн, методология составления прогнозов) являются объектами авторского права и принадлежат Администрации или правообладателям, предоставившим лицензию.</p>
              <p>4.2. Запрещаются копирование, воспроизведение, распространение, публичный показ или иное использование материалов Сайта без предварительного письменного согласия Администрации.</p>
            </div>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">5. Конфиденциальность</h2>
            <div className="space-y-3">
              <p>5.1. Обработка персональных данных Пользователя осуществляется в соответствии с <Link to="/privacy" className="text-[#D4AF37] hover:text-[#FFD700] transition-colors">Политикой конфиденциальности</Link>, являющейся неотъемлемой частью настоящего Соглашения. Администрация применяет технические и организационные меры защиты, предусмотренные Политикой конфиденциальности.</p>
              <p>5.2. Пользователь принимает, что передача данных через сеть Интернет не может быть абсолютно защищена от перехвата третьими лицами. Администрация не несёт ответственности за утечку данных вследствие действий третьих лиц (хакерских атак), при условии что Администрация применяла стандартные меры защиты.</p>
            </div>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">6. Ограничение ответственности</h2>
            <div className="space-y-3">
              <p>6.1. Администрация не несёт ответственности за любые убытки (включая упущенную выгоду и ущерб деловой репутации), возникшие у Пользователя в связи с использованием или невозможностью использования Сайта.</p>
              <p>6.2. Вся информация на Сайте, включая астрологические прогнозы, носит <span className="text-white/90">исключительно рекомендательный и информационный характер</span>. Астрологические прогнозы не имеют научного обоснования в смысле точных наук и не могут служить единственным основанием для принятия юридически значимых, финансовых или иных ответственных решений. Пользователь осознаёт это и действует самостоятельно на собственный риск.</p>
            </div>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">7. Ссылки на сторонние ресурсы</h2>
            <p>7.1. Сайт может содержать ссылки на сторонние интернет-ресурсы. Администрация не несёт ответственности за содержание, политику конфиденциальности или действия таких ресурсов и не контролирует их.</p>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">8. Применимое право и разрешение споров</h2>
            <div className="space-y-3">
              <p>8.1. Настоящее Соглашение регулируется и толкуется в соответствии с законодательством Российской Федерации.</p>
              <p>8.2. До обращения в суд стороны обязаны предпринять попытку досудебного урегулирования спора. Срок ответа на претензию — 10 рабочих дней. При недостижении согласия спор передаётся на рассмотрение в суд по месту регистрации Администрации.</p>
            </div>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">9. Реквизиты Администрации</h2>
            <div className="space-y-2">
              <p><span className="text-white/40">Администрация:</span> <span className="text-white/90">ИП Растегаев Виктор Геннадьевич</span></p>
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
