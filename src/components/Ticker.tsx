import { TICKER_ITEMS } from "../data/content";

export function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <section
      aria-label="Highlights"
      className="relative z-20 overflow-hidden border-y border-line bg-panel"
    >
      <div
        className="marquee-track items-center py-4"
        style={{ "--marquee-duration": "32s" } as React.CSSProperties}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="kicker-mono whitespace-nowrap px-7 text-[13px] text-white-soft">
              {item}
            </span>
            <span aria-hidden className="font-mono text-volt">
              ▸
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
