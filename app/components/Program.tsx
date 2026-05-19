import { PROGRAM } from "../data/content";

export default function Program() {
  return (
    <section id="program" className="bg-white scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2
            className="text-[32px] md:text-[40px] font-medium text-[var(--color-fg)]"
            style={{ fontFamily: "var(--font-newsreader)" }}
          >
            {PROGRAM.title}
          </h2>
          <p className="mt-3 text-[17px] text-[var(--color-fg-muted)]">
            {PROGRAM.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {PROGRAM.items.map((item, i) => (
            <article key={i} className="bg-[var(--color-surface-muted)] rounded-2xl p-7 md:p-8">
              <h3 className="text-[20px] md:text-[22px] font-semibold text-[var(--color-fg)] mb-3">
                {item.title}
              </h3>
              <p className="text-[16px] leading-[1.65] text-[var(--color-fg-muted)]">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
