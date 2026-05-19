import { ReactNode } from "react";
import TopNav from "./TopNav";
import Footer from "./Footer";

type Props = {
  title: string;
  effectiveDate: string;
  children: ReactNode;
};

export default function LegalLayout({ title, effectiveDate, children }: Props) {
  return (
    <>
      <TopNav />
      <main id="main-content" className="bg-[var(--color-bg)] min-h-screen">
        <article className="max-w-3xl mx-auto px-6 md:px-10 py-16 md:py-24">
          <h1
            className="text-[32px] md:text-[44px] font-medium text-[var(--color-fg)] leading-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {title}
          </h1>
          <p className="mt-3 text-[14px] text-[var(--color-fg-muted)]">
            Дата вступления в силу: {effectiveDate}
          </p>

          <div className="mt-10 prose-legal text-[16px] md:text-[17px] leading-[1.7] text-[var(--color-fg)] space-y-6">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
