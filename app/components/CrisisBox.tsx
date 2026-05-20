import { AlertTriangle } from "lucide-react";
import { CRISIS } from "../data/site";

export default function CrisisBox() {
  return (
    <section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="max-w-3xl mx-auto bg-[var(--color-crisis-bg)] border-l-4 border-[var(--color-accent-warm)] rounded-lg p-6 md:p-8">
          <div className="flex items-start gap-4 mb-4">
            <AlertTriangle
              size={24}
              strokeWidth={2}
              className="text-[var(--color-accent-warm)] flex-shrink-0 mt-1"
              aria-hidden="true"
            />
            <h2 className="text-[20px] md:text-[22px] font-semibold text-[var(--color-fg)]">
              {CRISIS.title}
            </h2>
          </div>
          <p className="text-[16px] leading-[1.65] text-[var(--color-fg)]">
            {CRISIS.body}
          </p>
          <ul className="mt-4 space-y-2">
            {CRISIS.phones.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-[16px] text-[var(--color-fg)]">
                <span className="text-[var(--color-accent-warm)] mt-0.5">•</span>
                <span>
                  <strong className="font-semibold">{p.number}</strong> — {p.desc}
                </span>
              </li>
            ))}
            {CRISIS.chats?.map((c, i) => (
              <li key={`chat-${i}`} className="flex items-start gap-2 text-[16px] text-[var(--color-fg)]">
                <span className="text-[var(--color-accent-warm)] mt-0.5">•</span>
                <span>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[var(--color-primary-dark)] underline underline-offset-3 hover:text-[var(--color-primary)]"
                  >
                    {c.label}
                  </a>{" "}
                  — {c.desc}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[16px] leading-[1.65] text-[var(--color-fg-muted)]">
            {CRISIS.footer}
          </p>
        </div>
      </div>
    </section>
  );
}
