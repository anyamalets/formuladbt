import Link from "next/link";
import Image from "next/image";
import { FOOTER } from "../data/site";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-fg)] text-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-between text-[14px]">
        <div className="flex items-center gap-3 opacity-80">
          <Image
            src="/logo-mark.png"
            alt=""
            width={32}
            height={32}
            className="w-7 h-7 brightness-110"
          />
          <span>{FOOTER.copyright}</span>
        </div>
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
