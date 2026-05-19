import Link from "next/link";
import { FOOTER } from "../data/site";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-fg)] text-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-between text-[14px]">
        <span className="opacity-80">{FOOTER.copyright}</span>
        <nav className="flex flex-col md:flex-row gap-3 md:gap-6 items-center">
          {FOOTER.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
