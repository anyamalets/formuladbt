import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "../data/faq";

export default function Faq() {
  return (
    <section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2
            className="text-[32px] md:text-[40px] font-medium text-[var(--color-fg)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Частые вопросы
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border border-[var(--color-border)] bg-white open:bg-[var(--color-surface-muted)]/40"
            >
              <summary className="flex items-center justify-between gap-4 list-none px-6 py-5 rounded-xl">
                <span className="text-[17px] font-medium text-[var(--color-fg)] leading-[1.4]">
                  {item.q}
                </span>
                <ChevronDown
                  size={20}
                  className="shrink-0 text-[var(--color-primary)] transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <div>
                <p className="px-6 pb-6 text-[16px] leading-[1.65] text-[var(--color-fg-muted)]">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
