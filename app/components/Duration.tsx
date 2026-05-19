import { DURATION } from "../data/content";

export default function Duration() {
  return (
    <section className="bg-[var(--color-bg)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="max-w-3xl mx-auto">
          <h2
            className="text-[32px] md:text-[40px] font-medium text-[var(--color-fg)] text-center"
            style={{ fontFamily: "var(--font-newsreader)" }}
          >
            {DURATION.title}
          </h2>

          <div className="mt-10 md:mt-12 space-y-5 text-[17px] md:text-[18px] leading-[1.7] text-[var(--color-fg)]">
            {DURATION.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
