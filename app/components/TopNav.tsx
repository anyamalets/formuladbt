import Link from "next/link";
import { NAV } from "../data/site";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)]/90 backdrop-blur-sm border-b border-[var(--color-border)]">
      <nav className="max-w-[1200px] mx-auto px-6 md:px-10 py-4 flex items-center gap-6 md:gap-8 text-[15px]">
        <span className="font-medium text-[var(--color-fg)] mr-auto md:mr-2" style={{ fontFamily: "var(--font-newsreader)" }}>
          Формула ДБТ
        </span>
        <div className="hidden md:flex items-center gap-7">
          {NAV.slice(0, -1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/#form"
          className="ml-auto inline-flex items-center px-4 md:px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-white text-[14px] md:text-[15px] font-medium hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          Записаться
        </Link>
      </nav>
    </header>
  );
}
