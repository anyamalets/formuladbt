"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV } from "../data/site";

export default function TopNav() {
  const [open, setOpen] = useState(false);

  // close mobile menu when escape pressed or window resized to desktop
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onResize() {
      if (window.innerWidth >= 768) setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[var(--color-bg)]/90 backdrop-blur-sm border-b border-[var(--color-border)]">
      <nav className="max-w-[1200px] mx-auto px-6 md:px-10 py-4 flex items-center gap-6 md:gap-8 text-[15px]">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-medium text-[var(--color-fg)] mr-auto md:mr-2"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          <Image
            src="/logo-mark.png"
            alt=""
            width={36}
            height={36}
            className="w-8 h-8 md:w-9 md:h-9"
            priority
          />
          <span>Формула ДБТ</span>
        </Link>
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
          className="hidden md:inline-flex items-center px-4 md:px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-white text-[14px] md:text-[15px] font-medium hover:bg-[var(--color-primary-dark)] transition-colors press-feedback"
        >
          Записаться
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-12 h-12 rounded-lg text-[var(--color-fg)] hover:bg-[var(--color-surface-muted)] transition-colors"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-bg)]">
          <div className="max-w-[1200px] mx-auto px-6 py-3 flex flex-col">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[16px] text-[var(--color-fg)] border-b border-[var(--color-border)] last:border-b-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
