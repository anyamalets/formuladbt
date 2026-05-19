import Image from "next/image";
import { specialists } from "../data/specialists";

export default function Team() {
  return (
    <section id="team" className="bg-white scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2
            className="text-[32px] md:text-[40px] font-medium text-[var(--color-fg)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Кто работает в команде
          </h2>
          <p className="mt-3 text-[17px] text-[var(--color-fg-muted)] max-w-2xl mx-auto">
            С июня 2025 формируем ДБТ-команду: групповое самообучение по протоколу Линехан и интенсив Behavioral Tech (заканчиваем часть 2 в октябре 2026).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7">
          {specialists.map((s) => (
            <article
              key={s.slug}
              className="bg-white border border-[var(--color-border)] rounded-2xl overflow-hidden transition-shadow hover:shadow-[0_8px_24px_rgba(124,58,237,0.08)]"
            >
              <div className="aspect-square bg-[var(--color-bg-deep)] relative overflow-hidden">
                <Image
                  src={s.photo}
                  alt={s.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                  className="object-cover"
                />
              </div>

              <div className="p-5 md:p-6">
                <h3 className="text-[18px] md:text-[19px] font-semibold text-[var(--color-fg)] mb-1.5 leading-tight">
                  {s.name}
                </h3>
                <p className="text-[12px] font-medium uppercase tracking-wide text-[var(--color-primary)] mb-3 leading-snug">
                  {s.role}
                </p>

                <div className="text-[14px] text-[var(--color-fg-muted)] leading-relaxed space-y-2">
                  {s.focus.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex flex-col gap-1 text-[13px] text-[var(--color-fg-muted)]">
                  <span>{s.age}</span>
                  <span>{s.format}</span>
                  <span className="text-[var(--color-fg)] font-medium">{s.prices}</span>
                </div>

                {s.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {s.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-2.5 py-1 rounded-full bg-[var(--color-bg-deep)] text-[var(--color-primary-dark)] text-[12px] font-medium hover:bg-[var(--color-border)] transition-colors"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
