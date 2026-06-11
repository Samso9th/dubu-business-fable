import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";
import { HERO_VERBS, TERMINAL_SCRIPT, DASHBOARD_URL, DEMO_URL } from "../data/content";

const STATS = [
  { value: "50+", label: "countries" },
  { value: "3", label: "currencies" },
  { value: "<5min", label: "settlements" },
];

function Terminal() {
  const root = useRef<HTMLDivElement>(null);
  const [latency, setLatency] = useState(42);
  const [tx, setTx] = useState(1284);

  // live status jitter
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => {
      setLatency(36 + Math.floor(Math.random() * 14));
      setTx(1200 + Math.floor(Math.random() * 180));
    }, 1500);
    return () => clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const lines = root.current!.querySelectorAll<HTMLElement>("[data-tline]");
      const prompt = root.current!.querySelector<HTMLElement>("[data-prompt]");

      if (prefersReducedMotion()) {
        lines.forEach((el) => {
          el.textContent = el.dataset.full ?? "";
          gsap.set(el, { autoAlpha: 1 });
        });
        return;
      }

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      gsap.set(prompt, { autoAlpha: 0 });

      lines.forEach((el) => {
        const full = el.dataset.full ?? "";
        const isCmd = el.dataset.kind === "cmd";

        tl.set(el, { autoAlpha: 0 }, 0);

        if (isCmd) {
          const state = { n: 0 };
          tl.set(el, { autoAlpha: 1 }, "+=0.15");
          tl.to(state, {
            n: full.length,
            duration: full.length * 0.024,
            ease: "none",
            onUpdate: () => {
              const n = Math.round(state.n);
              el.textContent =
                n < full.length ? full.slice(0, n) + "▍" : full;
            },
          });
        } else {
          tl.set(
            el,
            {
              autoAlpha: 1,
              onComplete: () => {
                el.textContent = full;
              },
            },
            "+=0.6"
          );
          tl.fromTo(
            el,
            { x: -10, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 0.32, ease: "power2.out" }
          );
          // brief accent flash on event / settled lines
          if (el.dataset.kind === "flash") {
            tl.fromTo(
              el,
              { boxShadow: "inset 2px 0 0 0 hsl(137 78% 46%)", backgroundColor: "hsl(137 78% 46% / 0.06)" },
              { boxShadow: "inset 2px 0 0 0 hsl(137 78% 46% / 0)", backgroundColor: "hsl(137 78% 46% / 0)", duration: 0.9, ease: "power2.out" },
              "<"
            );
          }
        }
      });

      // trailing blink prompt, then hold before the loop restarts
      tl.to(prompt, { autoAlpha: 1, duration: 0.2 }, "+=0.2").to({}, { duration: 1.6 });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="scanline relative w-full max-w-[680px] overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_44px_90px_-32px_rgba(0,0,0,0.9),0_0_100px_-44px_hsl(137_78%_46%/0.45)]"
    >
      {/* title bar */}
      <div className="flex items-center gap-2.5 border-b border-line px-5 py-3.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[12px] text-gray-dim">
          dubu — api.dubupay.com
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-volt">
          <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-volt pulse-dot" />
          LIVE
        </span>
      </div>

      {/* body */}
      <div className="min-h-[300px] px-5 py-5 font-mono text-[12.5px] leading-[1.95] sm:text-[13.5px]">
        {TERMINAL_SCRIPT.map((line, i) => (
          <p
            key={i}
            data-tline
            data-kind={
              line.type === "cmd"
                ? "cmd"
                : line.type === "event" || line.type === "ok"
                  ? "flash"
                  : "out"
            }
            data-full={line.text}
            className={`-ml-2 break-all rounded-sm pl-2 whitespace-pre-wrap opacity-0 ${
              line.type === "cmd"
                ? "text-white-soft"
                : line.type === "ok"
                  ? "text-volt"
                  : line.type === "event"
                    ? "text-gold"
                    : "text-gray"
            }`}
          />
        ))}
        <p data-prompt className="-ml-2 pl-2 text-volt opacity-0">
          ${" "}
          <span className="cursor-blink">▍</span>
        </p>
      </div>

      {/* live status bar */}
      <div className="flex items-center justify-between border-t border-line bg-void/40 px-5 py-2.5 font-mono text-[11px] text-gray-dim">
        <span className="flex items-center gap-2">
          <span className="text-volt">◉</span> 3 rails active
          <span className="text-line-bright">·</span>
          <span className="hidden sm:inline">
            latency <span className="text-volt tabular-nums">{latency}</span>ms
          </span>
        </span>
        <span className="flex items-center gap-2.5">
          <span className="tabular-nums">
            <span className="text-gray">{tx.toLocaleString()}</span> tx/min
          </span>
          <span className="flex h-3.5 items-end gap-[2.5px]" aria-hidden>
            {[0, 1, 2, 3, 4].map((b) => (
              <span
                key={b}
                className="eq-bar w-[2.5px] rounded-full bg-volt"
                style={{ height: "100%", animationDelay: `${b * 0.12}s` }}
              />
            ))}
          </span>
        </span>
      </div>
    </div>
  );
}

export function Hero({ started }: { started: boolean }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!started) return;
      if (prefersReducedMotion()) {
        gsap.set("[data-fade], [data-hline]", { autoAlpha: 1, y: 0, yPercent: 0 });
        gsap.set("[data-verb]", { autoAlpha: (i) => (i === 0 ? 1 : 0) });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .fromTo(
          "[data-hline]",
          { yPercent: 112 },
          { yPercent: 0, duration: 1.15, stagger: 0.1 },
          0.1
        )
        .fromTo(
          "[data-fade]",
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.09 },
          0.45
        );

      // cycling verb
      const verbs = gsap.utils.toArray<HTMLElement>("[data-verb]");
      gsap.set(verbs, { autoAlpha: 0, yPercent: 60 });
      gsap.set(verbs[0], { autoAlpha: 1, yPercent: 0 });

      const cycle = gsap.timeline({ repeat: -1, delay: 2.2 });
      verbs.forEach((verb, i) => {
        const next = verbs[(i + 1) % verbs.length];
        cycle
          .to(verb, {
            yPercent: -60,
            autoAlpha: 0,
            duration: 0.55,
            ease: "expo.in",
          }, `+=2.1`)
          .fromTo(
            next,
            { yPercent: 60, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.55, ease: "expo.out" },
            "<0.3"
          );
      });

      // counters
      gsap.utils.toArray<HTMLElement>("[data-stat]").forEach((el) => {
        const target = el.dataset.stat ?? "";
        const numMatch = target.match(/\d+/);
        if (!numMatch) return;
        const num = parseInt(numMatch[0], 10);
        const state = { v: 0 };
        gsap.to(state, {
          v: num,
          duration: 1.6,
          delay: 0.9,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = target.replace(/\d+/, String(Math.round(state.v)));
          },
        });
      });
    },
    { scope: root, dependencies: [started] }
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative flex min-h-svh items-center overflow-hidden pb-24 pt-28 lg:pb-10 lg:pt-16"
    >
      {/* blueprint grid + glow */}
      <div className="blueprint blueprint-fade absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute right-[-18%] top-[-26%] h-[780px] w-[780px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(137 78% 46% / 0.11), transparent 62%)" }}
        />
        <div
          className="absolute bottom-[-30%] left-[-14%] h-[640px] w-[640px] rounded-full"
          style={{ background: "radial-gradient(circle, hsl(44 93% 51% / 0.09), transparent 62%)" }}
        />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_minmax(440px,1fr)] lg:gap-10">
        {/* Copy */}
        <div>
          <div data-fade className="opacity-0">
            <span className="kicker-mono inline-flex items-center gap-2 rounded-full border border-volt/25 bg-volt/[0.06] px-4 py-2 text-volt">
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-volt pulse-dot" />
              now live
            </span>
          </div>

          <h1 className="display-hero mt-7">
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-hline className="grid will-change-transform">
                {HERO_VERBS.map((v, i) => (
                  <span
                    key={v.word}
                    data-verb
                    className={`whitespace-nowrap [grid-area:1/1] ${v.cls} ${
                      i === 0 ? "" : "opacity-0"
                    }`}
                  >
                    {v.word}
                  </span>
                ))}
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span data-hline className="block whitespace-nowrap will-change-transform">
                payments in
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span
                data-hline
                className="text-outline-volt block whitespace-nowrap will-change-transform"
              >
                USD·NGN·crypto
              </span>
            </span>
          </h1>

          <p
            data-fade
            className="mt-6 max-w-md text-base leading-relaxed text-gray opacity-0 sm:text-lg"
          >
            Unified payment infrastructure for businesses. Accept
            multi-currency payments, settle in under five minutes, and scale
            globally — all through a single API.
          </p>

          <div data-fade className="mt-9 flex flex-wrap items-center gap-4 opacity-0">
            <a
              href={DASHBOARD_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-volt inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold"
            >
              Get Started <span aria-hidden>→</span>
            </a>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white-soft"
            >
              Book a Demo
            </a>
          </div>

          <div data-fade className="mt-12 flex gap-10 opacity-0">
            {STATS.map((s) => (
              <div key={s.label}>
                <p
                  data-stat={s.value}
                  className="font-display text-2xl text-white-soft sm:text-3xl"
                >
                  {s.value}
                </p>
                <p className="kicker-mono mt-1 text-gray-dim">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Terminal */}
        <div data-fade className="flex justify-center opacity-0 lg:justify-end">
          <Terminal />
        </div>
      </div>
    </section>
  );
}
