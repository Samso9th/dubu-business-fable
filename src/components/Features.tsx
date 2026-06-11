import { useRef } from "react";
import { useGSAP, revealUp } from "../lib/gsap";
import { FEATURES } from "../data/content";

const SIZE_CLS: Record<string, string> = {
  lg: "sm:col-span-3 lg:col-span-3",
  sm: "sm:col-span-3 lg:col-span-2",
  med: "sm:col-span-3 lg:col-span-4",
  wide: "sm:col-span-6 lg:col-span-6",
};

export function Features() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealUp("[data-card]", root.current!, { stagger: 0.08 });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="kicker-mono text-volt">// features</p>
        <h2 className="display-xl mt-4 max-w-3xl">
          Why Dubu<span className="text-volt">?</span>
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-gray sm:text-lg">
          Accept, manage, convert, verify, and settle payments across USD,
          NGN, and crypto — serve customers anywhere with one integration.
        </p>

        <div className="mt-14 grid gap-4 sm:grid-cols-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              data-card
              data-reveal
              className={`card-machine corner-ticks group rounded-2xl p-6 sm:p-7 ${SIZE_CLS[f.size]}`}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="kicker-mono rounded border border-line-bright px-2 py-1 text-[10px] text-gray transition-colors group-hover:border-volt/40 group-hover:text-volt">
                  {f.tag}
                </span>
              </div>
              <h3 className="font-display mt-5 text-xl uppercase tracking-wide text-white-soft sm:text-[1.35rem]">
                {f.title}
              </h3>
              <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-gray">
                {f.body}
              </p>
              {f.code && (
                <pre className="mt-5 overflow-x-auto rounded-lg border border-line bg-void p-4 font-mono text-[11.5px] leading-relaxed text-gray">
                  <code>
                    <span className="text-volt">POST</span> /v1/payments{"\n"}
                    {"{"} <span className="text-gold">"amount"</span>: 100,{" "}
                    <span className="text-gold">"currency"</span>:{" "}
                    <span className="text-white-soft">"USD"</span> {"}"}
                  </code>
                </pre>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
