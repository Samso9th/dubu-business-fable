import { useRef, useState } from "react";
import { useGSAP, revealUp } from "../lib/gsap";
import { PRICING, REVENUE_SPLIT, DASHBOARD_URL, DEMO_URL, type PricingTier } from "../data/content";

type Tier = PricingTier;

function fmt(currency: string, value: number, decimals = 0) {
  return (
    currency +
    value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );
}

// Fee for a given amount under either the simple (rate+cap) or tiered model.
// Returns the fee and whether the simple model hit its cap.
function feeFor(tier: Tier, amount: number): { fee: number; capped: boolean } {
  if (tier.tiers) {
    for (const t of tier.tiers) {
      if ("flat" in t) {
        if (amount < t.upTo) return { fee: t.flat, capped: false };
      } else {
        return { fee: Math.max(amount * t.rate, t.min), capped: false };
      }
    }
    return { fee: 0, capped: false };
  }
  const rawFee = amount * (tier.rate ?? 0);
  const cap = tier.cap ?? Infinity;
  return { fee: Math.min(rawFee, cap), capped: rawFee > cap };
}

function TierCard({ tier, featured }: { tier: Tier; featured?: boolean }) {
  const [amount, setAmount] = useState(tier.sliderDefault);
  const { fee, capped } = feeFor(tier, amount);
  const decimals = tier.currency === "$" ? 2 : 0;
  const fill = ((amount - tier.sliderMin) / (tier.sliderMax - tier.sliderMin)) * 100;

  return (
    <div
      data-tier
      data-reveal
      className={`card-machine corner-ticks flex flex-col rounded-3xl p-7 sm:p-8 ${
        featured ? "border-volt/40 shadow-[0_0_64px_-28px_hsl(137_78%_46%/0.5)]" : ""
      }`}
    >
      {/* badge slot — fixed height so both cards align row-for-row */}
      <div className="mb-5 flex h-7 items-center">
        {featured ? (
          <span className="kicker-mono w-fit rounded-full border border-volt/40 bg-volt/10 px-3 py-1 text-[10px] text-volt">
            most popular
          </span>
        ) : (
          <span className="kicker-mono w-fit rounded-full border border-line-bright px-3 py-1 text-[10px] text-gray-dim">
            standard
          </span>
        )}
      </div>
      <h3 className="font-display text-2xl uppercase tracking-wide text-white-soft">
        {tier.title}
      </h3>
      <p className="kicker-mono mt-1 text-gray-dim">{tier.subtitle}</p>

      <div className="mt-6 flex items-baseline gap-3">
        <span className="font-display text-5xl text-volt">{tier.rateLabel}</span>
        <span className="font-mono text-[11px] leading-tight text-gray">
          per transaction
          <br />
          {tier.capLabel}
        </span>
      </div>

      {/* fee calculator */}
      <div className="mt-7 rounded-xl border border-line bg-void p-5">
        <div className="flex items-baseline justify-between font-mono text-[11px] text-gray-dim">
          <span>you receive</span>
          <span>your fee</span>
        </div>
        <div className="mt-1.5 flex items-baseline justify-between gap-4">
          <span className="font-mono text-lg text-white-soft tabular-nums sm:text-xl">
            {fmt(tier.currency, amount)}
          </span>
          <span className="font-mono text-lg text-volt tabular-nums sm:text-xl">
            {fmt(tier.currency, fee, decimals)}
            {capped && (
              <span className="ml-1.5 align-middle font-mono text-[9.5px] uppercase tracking-wider text-gold">
                capped
              </span>
            )}
          </span>
        </div>
        <input
          type="range"
          aria-label={`Transaction amount in ${tier.subtitle}`}
          className="fee-slider mt-4 w-full"
          min={tier.sliderMin}
          max={tier.sliderMax}
          step={tier.sliderStep}
          value={amount}
          style={{ "--fill": `${fill}%` } as React.CSSProperties}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>

      <ul className="mt-7 flex-1 space-y-2.5">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-gray">
            <span className="mt-0.5 text-volt">✓</span>
            {f}
          </li>
        ))}
      </ul>

      <a
        href={DASHBOARD_URL}
        target="_blank"
        rel="noreferrer"
        className={`${
          featured ? "btn-volt" : "btn-ghost text-white-soft"
        } mt-8 inline-flex justify-center rounded-full border border-transparent px-7 py-3.5 text-sm font-semibold`}
      >
        Get Started
      </a>
    </div>
  );
}

export function Pricing() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealUp("[data-price-head]", root.current!);
      revealUp("[data-tier]", root.current!.querySelector("[data-tiers]")!, {
        stagger: 0.15,
      });
      revealUp("[data-split]", root.current!.querySelector("[data-split]")!);
    },
    { scope: root }
  );

  return (
    <section ref={root} id="pricing" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="text-center">
          <p data-price-head data-reveal className="kicker-mono text-volt">
            // pricing
          </p>
          <h2 data-price-head data-reveal className="display-xl mx-auto mt-4 max-w-3xl">
            You only pay when <span className="text-volt">you get paid</span>
          </h2>
          <p data-price-head data-reveal className="mx-auto mt-5 max-w-xl text-base text-gray sm:text-lg">
            No hidden fees. No monthly charges. Drag the slider — the math is
            the whole story.
          </p>
        </div>

        <div data-tiers className="mx-auto mt-14 grid max-w-4xl gap-6 lg:grid-cols-2">
          <TierCard tier={PRICING.local} />
          <TierCard tier={PRICING.intl} featured />
        </div>

        {/* revenue split */}
        <div
          data-split
          data-reveal
          className="mx-auto mt-6 max-w-4xl rounded-3xl border border-gold/30 bg-gold/[0.04] p-7 sm:p-8"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="kicker-mono text-gold">// ₦100M+ monthly</p>
              <h3 className="font-display mt-2 text-2xl uppercase tracking-wide text-white-soft">
                {REVENUE_SPLIT.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-gray">
                {REVENUE_SPLIT.body}
              </p>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                {REVENUE_SPLIT.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 font-mono text-[11.5px] text-gray">
                    <span className="text-gold">✓</span> {p}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-void transition-transform duration-300 hover:-translate-y-0.5"
            >
              Talk to Sales <span aria-hidden>→</span>
            </a>
          </div>
        </div>

        <p className="mt-8 text-center font-mono text-[11px] text-gray-dim">
          fees charged only on successful transactions · no setup fees · no
          minimum volume
        </p>
      </div>
    </section>
  );
}
