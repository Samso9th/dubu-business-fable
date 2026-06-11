import { useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "../lib/gsap";

const BOOT_LINES = [
  "$ dubu init",
  "▸ rails/usd ........ online",
  "▸ rails/ngn ........ online",
  "▸ rails/crypto ..... online",
  "▸ fx-engine ........ ok",
  "✓ ready",
];

export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        setGone(true);
        doneRef.current();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          setGone(true);
          doneRef.current();
        },
      });

      tl.fromTo(
        "[data-boot-line]",
        { autoAlpha: 0, x: -8 },
        { autoAlpha: 1, x: 0, duration: 0.18, stagger: 0.16, ease: "power1.out" }
      )
        .to({}, { duration: 0.35 })
        .to("[data-boot]", { autoAlpha: 0, y: -12, duration: 0.3, ease: "power2.in" })
        .to(root.current, { yPercent: -100, duration: 0.65, ease: "expo.inOut" });
    },
    { scope: root }
  );

  if (gone) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
      aria-hidden="true"
    >
      <div data-boot className="font-mono text-[13px] leading-7 sm:text-sm">
        {BOOT_LINES.map((line, i) => (
          <p
            key={line}
            data-boot-line
            className={`opacity-0 ${
              i === 0
                ? "text-white-soft"
                : line.startsWith("✓")
                  ? "text-volt"
                  : "text-gray"
            }`}
          >
            {line}
            {i === 0 && <span className="cursor-blink text-volt">▍</span>}
          </p>
        ))}
      </div>
    </div>
  );
}
