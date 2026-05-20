import { ABOUT_DBT } from "../data/content";

export default function AboutDbt() {
  // Split paragraphs: last one is about the team, render it AFTER acceptance/change cards
  // so it doesn't break the "two positions → cards" narrative flow
  const teamParagraph = ABOUT_DBT.paragraphs[ABOUT_DBT.paragraphs.length - 1];
  const introParagraphs = ABOUT_DBT.paragraphs.slice(0, -1);

  return (
    <section id="about-dbt" className="bg-[var(--color-bg-deep)] scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-[32px] md:text-[40px] font-medium text-[var(--color-fg)] text-center"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {ABOUT_DBT.title}
          </h2>

          <div className="mt-10 md:mt-12 space-y-6 text-[17px] md:text-[18px] leading-[1.7] text-[var(--color-fg)] max-w-prose mx-auto">
            {introParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="mt-14 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {[ABOUT_DBT.acceptance, ABOUT_DBT.change].map((c) => (
            <div key={c.title} className="bg-white border border-[var(--color-border)] rounded-2xl p-7 md:p-8">
              <h3
                className="text-[22px] md:text-[26px] font-medium text-[var(--color-fg)] mb-4"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {c.title}
              </h3>
              <p className="text-[16px] leading-[1.65] text-[var(--color-fg-muted)]">
                {c.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 md:mt-16 max-w-prose mx-auto text-[17px] md:text-[18px] leading-[1.7] text-[var(--color-fg)]">
          <p>{teamParagraph}</p>
        </div>
      </div>
    </section>
  );
}
