import { CRISIS } from "../data/site";

function AlertIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[var(--color-accent-warm)] flex-shrink-0"
      aria-hidden="true"
    >
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

export default function CrisisBox() {
  return (
    <section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="max-w-3xl mx-auto bg-[var(--color-crisis-bg)] border-l-4 border-[var(--color-accent-warm)] rounded-lg p-6 md:p-8">
          <div className="flex items-start gap-4 mb-4">
            <AlertIcon />
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
          </ul>
          <p className="mt-4 text-[16px] leading-[1.65] text-[var(--color-fg-muted)]">
            {CRISIS.footer}
          </p>
        </div>
      </div>
    </section>
  );
}
