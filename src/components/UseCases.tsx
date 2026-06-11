import { useRef } from "react";
import { useGSAP, revealUp } from "../lib/gsap";
import { USE_CASES } from "../data/content";

function Card({ uc }: { uc: (typeof USE_CASES)[number] }) {
  return (
    <article className="card-machine mx-2.5 flex w-[300px] shrink-0 flex-col rounded-2xl p-6 sm:w-[340px]">
      <div className="flex items-baseline justify-between">
        <span className="font-display text-2xl text-outline-volt">{uc.num}</span>
        <span className="kicker-mono text-[10px] text-gray-dim">use_case</span>
      </div>
      <h3 className="font-display mt-4 text-lg uppercase tracking-wide text-white-soft">
        {uc.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-gray">{uc.body}</p>
    </article>
  );
}

export function UseCases() {
  const root = useRef<HTMLElement>(null);
  const rowA = [...USE_CASES.slice(0, 4), ...USE_CASES.slice(0, 4)];
  const rowB = [...USE_CASES.slice(4), ...USE_CASES.slice(4)];

  useGSAP(
    () => {
      revealUp("[data-uc-head]", root.current!);
    },
    { scope: root }
  );

  return (
    <section ref={root} id="use-cases" className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p data-uc-head data-reveal className="kicker-mono text-volt">
          // use cases
        </p>
        <h2 data-uc-head data-reveal className="display-xl mt-4 max-w-2xl">
          Explore what you can build
        </h2>
      </div>

      <div className="marquee-paused mt-14 flex flex-col gap-5">
        <div className="overflow-hidden">
          <div
            className="marquee-track"
            style={{ "--marquee-duration": "44s" } as React.CSSProperties}
          >
            {rowA.map((uc, i) => (
              <Card key={`a-${i}`} uc={uc} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <div
            className="marquee-track reverse"
            style={{ "--marquee-duration": "52s" } as React.CSSProperties}
          >
            {rowB.map((uc, i) => (
              <Card key={`b-${i}`} uc={uc} />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-center font-mono text-[11px] text-gray-dim">
        hover to pause · 8 patterns, one API
      </p>
    </section>
  );
}
