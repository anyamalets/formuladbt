"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function StickyMobileCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Hide when form is in view (so we don't double up on CTA)
    const form = document.getElementById("form");
    if (!form) return;
    const obs = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { rootMargin: "-100px 0px 0px 0px" }
    );
    obs.observe(form);

    // Only show after user scrolls past hero
    function onScroll() {
      if (window.scrollY > 400) {
        // formless trigger handled above; just ensure visible after scroll
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[var(--color-bg)]/95 backdrop-blur-sm border-t border-[var(--color-border)] px-4 py-3 transition-transform duration-200 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Link
        href="#form"
        className="flex items-center justify-center w-full py-3.5 rounded-lg bg-[var(--color-primary)] text-white text-[16px] font-medium hover:bg-[var(--color-primary-dark)] press-feedback"
      >
        Оставить заявку
      </Link>
    </div>
  );
}
