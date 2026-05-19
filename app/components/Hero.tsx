import Link from "next/link";
import { HERO } from "../data/site";

export default function Hero() {
  return (
    <section className="relative bg-[var(--color-bg)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-24 md:py-32 lg:py-40">
        <h1
          className="text-[40px] md:text-[56px] lg:text-[64px] font-medium leading-[1.1] tracking-tight max-w-3xl text-[var(--color-fg)]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {HERO.title}
        </h1>
        <p className="mt-6 md:mt-8 max-w-2xl text-[18px] md:text-[21px] leading-[1.6] text-[var(--color-fg-muted)]">
          {HERO.subtitle}
        </p>
        <Link
          href={HERO.cta.href}
          className="mt-8 md:mt-10 inline-flex items-center px-8 py-4 rounded-lg bg-[var(--color-primary)] text-white text-[16px] font-medium hover:bg-[var(--color-primary-dark)] transition-colors min-h-12"
        >
          {HERO.cta.label}
        </Link>
      </div>
    </section>
  );
}
