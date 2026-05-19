import { SITE } from "../data/site";

export default function Contacts() {
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20 text-center">
        <h2
          className="text-[32px] md:text-[40px] font-medium text-[var(--color-fg)]"
          style={{ fontFamily: "var(--font-newsreader)" }}
        >
          Как связаться
        </h2>
        <p className="mt-3 text-[17px] text-[var(--color-fg-muted)] max-w-xl mx-auto">
          Оставьте контактные данные в форме записи выше или напишите в Telegram.
        </p>

        <a
          href={SITE.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] transition-colors"
          aria-label={`Telegram ${SITE.telegramHandle}`}
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="white" aria-hidden="true">
            <path d="M21.06 3.43c-.32-.27-.78-.34-1.18-.18L2.95 9.74c-.42.16-.71.53-.74.97-.04.45.18.86.55 1.07l4.06 2.27 1.93 6.36c.1.34.39.59.74.65.06.01.13.02.19.02.29 0 .57-.13.76-.35l2.4-2.85 4.55 3.35c.18.13.39.2.61.2.1 0 .19-.01.29-.04.31-.08.56-.31.66-.62l3.6-15.81c.09-.43-.06-.87-.39-1.13Zm-3.83 4.04-7.06 6.61c-.13.12-.21.28-.23.46l-.36 2.93-1.27-4.19 8.92-5.81Zm-4.92 12.7-.69-.51 1.39-1.65-.7 2.16Zm5.41-.85-7.4-5.44 9.59-8.99-2.19 14.43Z" />
          </svg>
        </a>
      </div>
    </section>
  );
}
