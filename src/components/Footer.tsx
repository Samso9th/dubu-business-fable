import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { FOOTER_COLS, DASHBOARD_URL } from "../data/content";

export function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-wordmark]",
        { yPercent: 38 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: root }
  );

  return (
    <footer ref={root} className="overflow-hidden border-t border-line bg-panel">
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <div className="grid gap-12 pb-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/icon.png" alt="" className="h-9 w-9 rounded-lg" />
              <span className="font-display text-xl tracking-wide">
                DUBU <span className="text-volt">BUSINESS</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray">
              Unified payment infrastructure for businesses. Accept payments
              in USD, NGN, and Crypto through a single API.
            </p>
            <a
              href={DASHBOARD_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-volt mt-6 inline-flex rounded-full px-6 py-3 text-sm font-semibold"
            >
              Get Started
            </a>
          </div>

          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <p className="kicker-mono mb-5 text-gray-dim">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                      className="text-sm text-gray transition-colors hover:text-white-soft"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-line py-6 font-mono text-[11px] text-gray-dim sm:flex-row">
          <span>© {new Date().getFullYear()} Dubu. All rights reserved.</span>
          <span>status: <span className="text-volt">● all rails operational</span></span>
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="relative flex justify-center overflow-hidden" aria-hidden="true">
        <span
          data-wordmark
          className="font-display block translate-y-[8%] whitespace-nowrap text-[24vw] leading-[0.8] text-outline select-none sm:text-[22vw]"
        >
          DUBU
        </span>
      </div>
    </footer>
  );
}
