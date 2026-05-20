import Link from "next/link";
import { HERO } from "../data/site";

export default function Hero() {
  return (
    <section className="relative bg-[var(--color-bg)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-14 md:py-32 lg:py-40">
        <p className="text-[12px] md:text-[13px] font-medium uppercase tracking-[0.15em] text-[var(--color-primary)] mb-5 md:mb-6">
          {HERO.kicker}
        </p>
        <h1
          className="text-[36px] md:text-[52px] lg:text-[60px] font-medium leading-[1.1] tracking-tight max-w-4xl text-[var(--color-fg)]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {HERO.title}
        </h1>
        <p className="mt-6 md:mt-8 max-w-2xl text-[18px] md:text-[21px] leading-[1.6] text-[var(--color-fg-muted)]">
          {HERO.subtitle}
        </p>
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link
            href={HERO.cta.href}
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-[var(--color-primary)] text-white text-[16px] font-medium hover:bg-[var(--color-primary-dark)] press-feedback min-h-12"
          >
            {HERO.cta.label}
          </Link>
          <Link
            href={HERO.ctaSecondary.href}
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-[var(--color-primary)] text-[var(--color-primary)] text-[16px] font-medium hover:bg-[var(--color-bg-deep)] press-feedback min-h-12"
            style={{ borderWidth: "1.5px" }}
          >
            {HERO.ctaSecondary.label} →
          </Link>
        </div>
      </div>
    </section>
  );
}
