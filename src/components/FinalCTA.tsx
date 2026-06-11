import { useRef } from "react";
import { gsap, useGSAP, revealUp, prefersReducedMotion } from "../lib/gsap";
import { DASHBOARD_URL, DEMO_URL } from "../data/content";

const TRUST = ["No setup fees", "Free to start", "Cancel anytime"];

export function FinalCTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealUp("[data-cta]", root.current!, { stagger: 0.12 });

      if (prefersReducedMotion()) return;
      gsap.to("[data-glow]", {
        scale: 1.3,
        opacity: 0.85,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden border-t border-line py-28 text-center sm:py-40"
    >
      <div className="blueprint blueprint-fade absolute inset-0" aria-hidden="true" />
      <div
        data-glow
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[660px] w-[660px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, hsl(137 78% 46% / 0.11), transparent 60%)" }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-8">
        <p data-cta data-reveal className="kicker-mono text-volt">
          $ dubu deploy --production
        </p>

        <h2 data-cta data-reveal className="display-hero mt-6">
          Ready to simplify your{" "}
          <span className="text-volt">payment stack?</span>
        </h2>

        <p data-cta data-reveal className="mx-auto mt-6 max-w-md text-lg text-gray">
          Sign up and start accepting payments with unified multi-currency
          infrastructure.
        </p>

        <div
          data-cta
          data-reveal
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href={DASHBOARD_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-volt inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold"
          >
            Get Started <span aria-hidden>→</span>
          </a>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost inline-flex items-center gap-2 rounded-full px-8 py-4 font-medium text-white-soft"
          >
            Book a Demo
          </a>
        </div>

        <div data-cta data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {TRUST.map((t) => (
            <span key={t} className="flex items-center gap-2 font-mono text-[11.5px] text-gray">
              <span className="text-volt">✓</span> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
