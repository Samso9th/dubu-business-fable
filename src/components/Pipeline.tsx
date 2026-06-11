import { useRef } from "react";
import { gsap, useGSAP, revealUp, prefersReducedMotion } from "../lib/gsap";
import { useMediaQuery } from "../lib/hooks";
import { PIPELINE_STEPS, OLD_RAILS, NEW_RAILS } from "../data/content";

/*
 * The payment machine: three rails converge into the Dubu core,
 * one settled stream comes out. Scroll scrubs the whole flow.
 */
function Diagram() {
  return (
    <svg
      viewBox="0 0 720 420"
      fill="none"
      className="w-full"
      aria-label="Payment flow: USD, NGN and stablecoins converge into Dubu and settle to your account"
    >
      {/* rails in */}
      <path data-rail="in" d="M148 85 C 250 85, 265 185, 336 198" stroke="hsl(0 0% 28%)" strokeWidth="2" />
      <path data-rail="in" d="M148 210 C 230 210, 256 208, 336 210" stroke="hsl(0 0% 28%)" strokeWidth="2" />
      <path data-rail="in" d="M148 335 C 250 335, 265 235, 336 222" stroke="hsl(0 0% 28%)" strokeWidth="2" />
      {/* flowing overlay (convert stage) */}
      <path data-flow d="M148 85 C 250 85, 265 185, 336 198" stroke="hsl(137 78% 46%)" strokeWidth="2" className="flow-dash" opacity="0" />
      <path data-flow d="M148 210 C 230 210, 256 208, 336 210" stroke="hsl(137 78% 46%)" strokeWidth="2" className="flow-dash" opacity="0" />
      <path data-flow d="M148 335 C 250 335, 265 235, 336 222" stroke="hsl(137 78% 46%)" strokeWidth="2" className="flow-dash" opacity="0" />
      {/* rail out */}
      <path data-rail="out" d="M452 210 C 520 210, 535 212, 596 212" stroke="hsl(0 0% 28%)" strokeWidth="2" />
      <path data-flow-out d="M452 210 C 520 210, 535 212, 596 212" stroke="hsl(44 93% 51%)" strokeWidth="2" className="flow-dash" opacity="0" />

      {/* source nodes */}
      {[
        { y: 60, title: "USD", sub: "ACH · WIRE" },
        { y: 185, title: "NGN", sub: "NUBAN" },
        { y: 310, title: "USDT/C", sub: "ON-CHAIN" },
      ].map((n) => (
        <g key={n.title} data-node-in>
          <rect x="22" y={n.y - 6} width="132" height="62" rx="12" fill="hsl(0 0% 7%)" stroke="hsl(0 0% 18%)" />
          <text x="88" y={n.y + 21} textAnchor="middle" fill="hsl(0 0% 96%)" fontSize="17" fontFamily="JetBrains Mono, monospace" fontWeight="600">
            {n.title}
          </text>
          <text x="88" y={n.y + 39} textAnchor="middle" fill="hsl(0 0% 50%)" fontSize="10.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1.5">
            {n.sub}
          </text>
        </g>
      ))}

      {/* core */}
      <g data-core>
        <rect x="332" y="152" width="124" height="116" rx="16" fill="hsl(0 0% 8%)" stroke="hsl(0 0% 22%)" strokeWidth="2" />
        <rect data-core-glow x="332" y="152" width="124" height="116" rx="16" fill="none" stroke="hsl(137 78% 46%)" strokeWidth="2" opacity="0" />
        <text x="394" y="201" textAnchor="middle" fill="hsl(0 0% 96%)" fontSize="19" fontFamily="Gegola, sans-serif" letterSpacing="1">
          DUBU
        </text>
        <text x="394" y="221" textAnchor="middle" fill="hsl(137 78% 46%)" fontSize="11" fontFamily="JetBrains Mono, monospace" letterSpacing="2">
          FX ENGINE
        </text>
        <text data-core-rate x="394" y="244" textAnchor="middle" fill="hsl(0 0% 55%)" fontSize="10.5" fontFamily="JetBrains Mono, monospace" opacity="0">
          $1 → ₦1,580
        </text>
      </g>

      {/* webhook badge (verify stage) */}
      <g data-webhook opacity="0">
        <rect x="300" y="110" width="188" height="30" rx="15" fill="hsl(0 0% 5%)" stroke="hsl(44 93% 51% / 0.6)" strokeWidth="2" />
        <text x="394" y="130" textAnchor="middle" fill="hsl(44 93% 51%)" fontSize="11.5" fontFamily="JetBrains Mono, monospace">
          ⚡ payment.confirmed
        </text>
      </g>

      {/* settle node */}
      <g data-node-out>
        <rect x="590" y="179" width="108" height="66" rx="12" fill="hsl(0 0% 7%)" stroke="hsl(0 0% 18%)" />
        <rect data-out-glow x="590" y="179" width="108" height="66" rx="12" fill="none" stroke="hsl(44 93% 51%)" strokeWidth="2" opacity="0" />
        <text x="644" y="208" textAnchor="middle" fill="hsl(0 0% 96%)" fontSize="16" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          YOU
        </text>
        <text x="644" y="228" textAnchor="middle" fill="hsl(0 0% 50%)" fontSize="10.5" fontFamily="JetBrains Mono, monospace" letterSpacing="1">
          SETTLED
        </text>
      </g>

      {/* settle badge */}
      <g data-settle-badge opacity="0">
        <rect x="568" y="142" width="152" height="28" rx="14" fill="hsl(0 0% 5%)" stroke="hsl(137 78% 46% / 0.6)" strokeWidth="2" />
        <text x="644" y="161" textAnchor="middle" fill="hsl(137 78% 46%)" fontSize="11.5" fontFamily="JetBrains Mono, monospace">
          ✓ under 5 min
        </text>
      </g>
    </svg>
  );
}

export function Pipeline() {
  const root = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);

      // comparison cards reveal (both layouts)
      revealUp("[data-compare]", root.current!.querySelector("[data-compare-wrap]")!, {
        stagger: 0.12,
      });

      const railsIn = q<SVGPathElement>("[data-rail='in']");
      const railOut = q<SVGPathElement>("[data-rail='out']");

      if (prefersReducedMotion() || !isDesktop) {
        // static, fully-lit diagram + simple step reveals
        gsap.set(q("[data-flow], [data-flow-out], [data-webhook], [data-settle-badge], [data-core-glow], [data-out-glow], [data-core-rate]"), {
          opacity: 1,
        });
        if (!prefersReducedMotion()) {
          revealUp("[data-step-block]", root.current!, { stagger: 0.12 });
        } else {
          gsap.set("[data-step-block]", { autoAlpha: 1 });
        }
        return;
      }

      // prepare line-drawing
      [...railsIn, ...railOut].forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });

      const steps = q<HTMLElement>("[data-step-block]");
      gsap.set(steps, { autoAlpha: 0.22, y: 0 });
      gsap.set(steps[0], { autoAlpha: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: q("[data-pin]")[0],
          start: "top top",
          end: "+=2600",
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      const focus = (i: number) =>
        tl.to(steps, {
          autoAlpha: (j: number) => (j === i ? 1 : 0.22),
          duration: 0.25,
        }, "<");

      // 01 — accept: draw the three inbound rails
      tl.to(railsIn, { strokeDashoffset: 0, duration: 1, stagger: 0.15 });

      // 02 — verify: core + webhook badge
      tl.addLabel("verify", "+=0.2");
      focus(1);
      tl.to(q("[data-core-glow]"), { opacity: 1, duration: 0.4 }, "verify")
        .fromTo(
          q("[data-webhook]"),
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.45 },
          "verify+=0.2"
        );

      // 03 — convert: flowing dashes + fx rate
      tl.addLabel("convert", "+=0.3");
      focus(2);
      tl.to(q("[data-flow]"), { opacity: 1, duration: 0.4, stagger: 0.1 }, "convert")
        .to(q("[data-core-rate]"), { opacity: 1, duration: 0.4 }, "convert+=0.3");

      // 04 — settle: outbound rail + badges
      tl.addLabel("settle", "+=0.3");
      focus(3);
      tl.to(railOut, { strokeDashoffset: 0, duration: 0.8 }, "settle")
        .to(q("[data-flow-out]"), { opacity: 1, duration: 0.3 }, "settle+=0.6")
        .to(q("[data-out-glow]"), { opacity: 1, duration: 0.4 }, "settle+=0.7")
        .fromTo(
          q("[data-settle-badge]"),
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.45 },
          "settle+=0.8"
        )
        .to({}, { duration: 0.4 });
    },
    { scope: root, dependencies: [isDesktop], revertOnUpdate: true }
  );

  return (
    <section ref={root} id="pipeline" className="relative">
      <div data-pin className="flex min-h-svh flex-col justify-center py-20 lg:py-0">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mb-12 lg:mb-16">
            <p className="kicker-mono text-volt">$ trace --payment</p>
            <h2 className="display-xl mt-4 max-w-3xl">
              Follow the money <span className="text-outline">through the machine</span>
            </h2>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[0.82fr_1.6fr] lg:gap-14">
            {/* Steps */}
            <div className="order-2 grid gap-7 sm:grid-cols-2 lg:order-1 lg:grid-cols-1 lg:gap-9">
              {PIPELINE_STEPS.map((s) => (
                <div key={s.id} data-step-block data-reveal>
                  <p className="kicker-mono text-volt">{s.label}</p>
                  <h3 className="font-display mt-2 text-xl uppercase tracking-wide text-white-soft sm:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-gray">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Diagram */}
            <div className="order-1 lg:order-2">
              <Diagram />
            </div>
          </div>
        </div>
      </div>

      {/* old chain vs dubu */}
      <div data-compare-wrap className="mx-auto max-w-7xl px-5 pb-24 pt-8 sm:px-8 sm:pb-32">
        <div className="grid gap-5 lg:grid-cols-2">
          <div data-compare data-reveal className="rounded-2xl border border-line bg-panel p-7">
            <p className="kicker-mono mb-5 text-gray-dim">// the old chain</p>
            <ul className="divide-y divide-line">
              {OLD_RAILS.map((r) => (
                <li key={r.name} className="flex items-center justify-between py-3.5 font-mono text-[13px]">
                  <span className="text-gray">{r.name}</span>
                  <span className="text-gray-dim">{r.time}</span>
                  <span className="text-[#ff6b5f]">{r.cost}</span>
                </li>
              ))}
            </ul>
          </div>
          <div data-compare data-reveal className="rounded-2xl border border-volt/30 bg-volt/[0.04] p-7">
            <p className="kicker-mono mb-5 text-volt">// with dubu</p>
            <ul className="divide-y divide-volt/15">
              {NEW_RAILS.map((r) => (
                <li key={r.name} className="flex items-center justify-between py-3.5 font-mono text-[13px]">
                  <span className="text-white-soft">{r.name}</span>
                  <span className="text-volt">{r.value}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[11px] text-gray-dim">
              0.5% effective vs 3–4% fragmented rails · −85% cost
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
