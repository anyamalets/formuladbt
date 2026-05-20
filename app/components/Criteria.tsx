import { CircleCheckBig } from "lucide-react";
import { CRITERIA } from "../data/content";

export default function Criteria() {
  return (
    <section id="criteria" className="bg-white scroll-mt-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-20 md:py-28">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2
            className="text-[32px] md:text-[40px] font-medium text-[var(--color-fg)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {CRITERIA.title}
          </h2>
          <p className="mt-3 text-[17px] text-[var(--color-fg-muted)]">
            {CRITERIA.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl mx-auto">
          {CRITERIA.items.map((item, i) => (
            <div key={i} className="flex gap-4">
              <CircleCheckBig
                size={24}
                strokeWidth={2}
                className="text-[var(--color-accent)] flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-[17px] md:text-[18px] font-semibold text-[var(--color-fg)] mb-2">
                  {item.title}
                </h3>
                <p className="text-[15px] md:text-[16px] leading-[1.65] text-[var(--color-fg-muted)]">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
