import { useRef, useState } from "react";
import { gsap, useGSAP, revealUp, prefersReducedMotion } from "../lib/gsap";
import { CODE_TABS, DOCS_URL } from "../data/content";

function colorize(line: string) {
  if (line.startsWith("$") || line.startsWith("#"))
    return line.startsWith("#") ? "text-gray-dim" : "text-white-soft";
  if (line.startsWith("HTTP")) return "text-volt";
  if (line.startsWith("POST")) return "text-gold";
  return "text-gray";
}

export function DevSection() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      revealUp("[data-dev]", root.current!, { stagger: 0.1 });
    },
    { scope: root }
  );

  // animate lines whenever the tab changes
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-code-line]",
        { autoAlpha: 0, x: -10 },
        { autoAlpha: 1, x: 0, duration: 0.3, stagger: 0.035, ease: "power2.out" }
      );
    },
    { scope: root, dependencies: [active] }
  );

  const tab = CODE_TABS[active];

  return (
    <section ref={root} className="relative border-y border-line bg-panel py-24 sm:py-32">
      <div className="blueprint absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div className="min-w-0">
          <p data-dev data-reveal className="kicker-mono text-volt">
            // for developers
          </p>
          <h2 data-dev data-reveal className="display-xl mt-4">
            Integrate once.<br />
            <span className="text-outline">Automate everything.</span>
          </h2>
          <p data-dev data-reveal className="mt-5 max-w-md text-base leading-relaxed text-gray sm:text-lg">
            RESTful endpoints, signed webhooks, idempotent operations, and
            SDKs for Node.js and Python. Sessions in, settled funds out — your
            app orchestrates the rest.
          </p>
          <div data-dev data-reveal className="mt-8">
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white-soft"
            >
              Read the docs <span aria-hidden>↗</span>
            </a>
          </div>
        </div>

        <div data-dev data-reveal className="min-w-0">
          <div className="scanline relative overflow-hidden rounded-2xl border border-line bg-void shadow-[0_40px_80px_-32px_rgba(0,0,0,0.9)]">
            {/* tabs */}
            <div className="flex overflow-x-auto border-b border-line" role="tablist">
              {CODE_TABS.map((t, i) => (
                <button
                  key={t.id}
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  className={`px-4 py-3 font-mono text-[11.5px] transition-colors sm:px-5 ${
                    active === i
                      ? "border-b-2 border-volt bg-panel text-volt"
                      : "text-gray-dim hover:text-gray"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <div className="min-h-[330px] overflow-x-auto p-5 font-mono text-[12px] leading-[1.85] sm:text-[12.5px]">
              {tab.lines.map((line, i) => (
                <p
                  key={`${tab.id}-${i}`}
                  data-code-line
                  className={`whitespace-pre ${colorize(line)}`}
                >
                  {line || " "}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
