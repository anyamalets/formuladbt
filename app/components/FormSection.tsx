import ContactForm from "./ContactForm";

export default function FormSection() {
  return (
    <section id="form" className="bg-[var(--color-bg-deep)] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h2
              className="text-[32px] md:text-[40px] font-medium text-[var(--color-fg)]"
              style={{ fontFamily: "var(--font-newsreader)" }}
            >
              Записаться
            </h2>
            <p className="mt-3 text-[17px] text-[var(--color-fg-muted)]">
              Координатор свяжется в течение рабочего дня. Ответит на ваши вопросы и поможет выбрать специалиста из команды.
            </p>
          </div>

          <div className="bg-white border border-[var(--color-border)] rounded-2xl p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
