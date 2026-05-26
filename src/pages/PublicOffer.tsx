import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";

export default function PublicOffer() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#050A14] text-white font-montserrat">
      <Helmet>
        <title>Публичная оферта — StarsBiz</title>
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
            Публичная <span className="text-[#D4AF37] italic">оферта</span>
          </h1>
          <p className="text-white/40 text-sm mb-2">Редакция от 26 мая 2025 г.</p>
          <p className="text-white/35 text-sm">На оказание астрологических консультационных услуг</p>
        </div>

        <div className="space-y-10 text-white/65 text-sm leading-relaxed">

          <section>
            <p>
              <span className="text-white/90">Индивидуальный предприниматель Растегаев В.Г.</span> (ИНН: 165019486049), именуемый в дальнейшем «Исполнитель», публикует настоящую Оферту, адресованную неограниченному кругу физических лиц (далее — «Заказчик»), о заключении договора возмездного оказания услуг астрологического консультирования на условиях, изложенных ниже.
            </p>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">1. Термины и определения</h2>
            <div className="space-y-3">
              <p><span className="text-white/90">1.1. Оферта</span> — настоящий документ, размещённый на сайте по адресу: <span className="text-[#D4AF37]">https://starsbiz.ru</span>.</p>
              <p><span className="text-white/90">1.2. Акцепт</span> — полное и безоговорочное принятие условий Оферты путём оплаты Заказчиком выбранной услуги. С момента поступления денежных средств на расчётный счёт Исполнителя договор считается заключённым.</p>
              <p><span className="text-white/90">1.3. Услуга</span> — астрологическая консультация в дистанционном формате (персональный PDF-отчёт), составленная на основании персональных данных, предоставленных Заказчиком. Виды услуг и их стоимость указаны на Сайте в разделе «Услуги и цены».</p>
              <p><span className="text-white/90">1.4. Персональные данные</span> — фамилия, имя, дата, время и место рождения, контактные данные (адрес электронной почты, номер телефона / мессенджера).</p>
            </div>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">2. Предмет договора</h2>
            <div className="space-y-3">
              <p>2.1. Исполнитель обязуется оказать Заказчику астрологическую консультацию в дистанционном формате, а Заказчик обязуется принять и оплатить услугу в порядке, предусмотренном настоящей Офертой.</p>
              <p>2.2. Услуга оказывается дистанционно — без личного присутствия сторон.</p>
              <p>2.3. Консультация носит информационно-аналитический и рекомендательный характер. Она не является медицинской, психологической, юридической или финансовой консультацией и не может служить единственным основанием для принятия юридически значимых решений.</p>
            </div>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">3. Порядок оказания услуг</h2>
            <div className="space-y-3">
              <p>3.1. Заказчик заполняет форму заказа на Сайте или направляет запрос в мессенджере, предоставляя: ФИО (по желанию); дату, точное время и место рождения; актуальные контактные данные (email, номер мессенджера); цель и вопрос консультации.</p>
              <p>3.2. При необходимости Исполнитель уточняет детали запроса и подтверждает итоговую стоимость услуги.</p>
              <p>3.3. Заказчик производит 100% предоплату выбранной услуги через платёжные инструменты, указанные на Сайте.</p>
              <p>3.4. После зачисления оплаты Исполнитель приступает к подготовке прогноза. Срок подготовки — <span className="text-white/90">до 24 часов</span> с момента получения всех необходимых данных от Заказчика.</p>
              <p>3.5. Готовый прогноз направляется Заказчику в формате PDF на указанный адрес электронной почты или в мессенджер.</p>
            </div>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">4. Стоимость и порядок оплаты</h2>
            <div className="space-y-3">
              <p>4.1. Стоимость услуг указана на Сайте в разделе «Услуги и цены» и может быть изменена Исполнителем в одностороннем порядке. Для конкретного заказа цена фиксируется на момент его оформления.</p>
              <p>4.2. Оплата производится через платёжные системы, указанные на Сайте. Комиссия платёжных систем включена в стоимость услуги, если иное не указано явно при оформлении заказа.</p>
              <p>4.3. Датой оплаты считается дата фактического поступления денежных средств на расчётный счёт Исполнителя.</p>
            </div>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">5. Гарантия доработки</h2>
            <div className="space-y-3">
              <p>5.1. Исполнитель предоставляет <span className="text-white/90">Гарантию доработки</span> вместо возврата денежных средств: если Заказчик не нашёл в полученном прогнозе ни одной полезной рекомендации (конкретной даты, астрологического аспекта или практического совета), Исполнитель обязуется бесплатно доработать прогноз.</p>
              <p>5.2. Условия применения Гарантии доработки:</p>
              <ul className="space-y-2 pl-4">
                {[
                  "Заказчик направляет письменное обращение на info@starsbiz.ru в течение 7 (семи) календарных дней с момента отправки готового прогноза.",
                  "В обращении необходимо конкретно указать, каких рекомендаций не хватает (например: «нет конкретных дат для переговоров», «не указаны периоды осторожности»).",
                  "Исполнитель в течение 10 (десяти) рабочих дней подготавливает и направляет Заказчику дополненный прогноз.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span><span>{item}</span>
                  </li>
                ))}
              </ul>
              <p>5.3. Гарантия доработки предоставляется <span className="text-white/90">один раз</span> по каждому заказу. Повторная доработка по тому же заказу не производится.</p>
              <p>5.4. Доработанный прогноз считается принятым Заказчиком, если в течение 14 (четырнадцати) календарных дней после его отправки письменных возражений не поступило.</p>
              <p>5.5. Возврат денежных средств <span className="text-white/90">не производится</span> в следующих случаях:</p>
              <ul className="space-y-2 pl-4">
                {[
                  "Заказчик предоставил неточные данные для расчёта (погрешность времени рождения более 15 минут).",
                  "Заказчик уже воспользовался информацией из прогноза (перенёс дату сделки, сообщил Исполнителю о применении рекомендаций и т.п.).",
                  "Заказчик запросил доработку по истечении 7 (семи) календарных дней после отправки прогноза.",
                  "Заказчик уже получил доработку по данному заказу — стороны считают обязательства исполненными в полном объёме.",
                  "Иные случаи, предусмотренные законодательством Российской Федерации.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1 flex-shrink-0">✦</span><span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">6. Ограничение ответственности</h2>
            <div className="space-y-3">
              <p>6.1. Исполнитель не гарантирует, что рекомендации, содержащиеся в прогнозе, приведут к какому-либо конкретному коммерческому результату (прибыли, успешным сделкам и т.п.).</p>
              <p>6.2. Исполнитель не несёт ответственности за прямые или косвенные убытки Заказчика, возникшие в результате использования или неиспользования полученных рекомендаций. Заказчик самостоятельно принимает деловые решения и несёт за них полную ответственность.</p>
              <p>6.3. Ответственность Исполнителя в любом случае ограничена суммой, уплаченной Заказчиком за конкретную услугу.</p>
            </div>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">7. Конфиденциальность (NDA)</h2>
            <div className="space-y-3">
              <p>7.1. Исполнитель обязуется не разглашать персональные данные Заказчика и содержание консультации третьим лицам, за исключением случаев, прямо предусмотренных законодательством Российской Федерации.</p>
              <p>7.2. По письменному требованию Заказчика Исполнитель подписывает отдельное Соглашение о неразглашении (NDA) в течение <span className="text-white/90">5 (пяти) рабочих дней</span> с момента получения соответствующего запроса на адрес: <a href="mailto:info@starsbiz.ru" className="text-[#D4AF37] hover:text-[#FFD700] transition-colors">info@starsbiz.ru</a>.</p>
            </div>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">8. Форс-мажор</h2>
            <p>8.1. Стороны освобождаются от ответственности за неисполнение обязательств при наступлении обстоятельств непреодолимой силы (форс-мажор): стихийные бедствия, военные действия, сбои в работе сети Интернет или систем электроснабжения, ограничительные меры государственных органов. Сторона, ссылающаяся на форс-мажор, обязана уведомить другую сторону в течение 5 рабочих дней с момента его наступления.</p>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">9. Заключительные положения</h2>
            <div className="space-y-3">
              <p>9.1. Оферта вступает в силу с момента её размещения на Сайте и действует до её отзыва Исполнителем.</p>
              <p>9.2. Исполнитель вправе вносить изменения в Оферту в одностороннем порядке. Новая редакция публикуется на Сайте и вступает в силу с момента публикации.</p>
              <p>9.3. К отношениям сторон применяется законодательство Российской Федерации.</p>
              <p>9.4. Все споры подлежат обязательному досудебному (претензионному) урегулированию. Срок ответа на претензию — 10 рабочих дней. При недостижении согласия спор передаётся на рассмотрение в суд по месту регистрации Исполнителя.</p>
            </div>
          </section>

          <div className="h-px bg-white/8" />

          <section>
            <h2 className="font-cormorant text-2xl text-white mb-4">10. Реквизиты исполнителя</h2>
            <div className="space-y-2">
              <p><span className="text-white/40">Исполнитель:</span> <span className="text-white/90">ИП Растегаев В.Г.</span></p>
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