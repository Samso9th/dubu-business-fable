import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { NAV_LINKS, DASHBOARD_URL } from "../data/content";

export function Navbar({ started }: { started: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(
    () => {
      if (!started) return;
      gsap.fromTo(
        root.current,
        { y: -64, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, ease: "expo.out", delay: 0.15 }
      );
    },
    { dependencies: [started] }
  );

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        ref={root}
        className={`fixed inset-x-0 top-0 z-[90] opacity-0 transition-colors duration-300 ${
          scrolled ? "nav-solid" : ""
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <img src="/icon.png" alt="" className="h-8 w-8 rounded-lg" />
            <span className="font-display text-lg tracking-wide">
              DUBU <span className="text-volt">BUSINESS</span>
            </span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="font-mono text-sm text-gray transition-colors hover:text-white-soft"
              >
                {l.label}
                {l.external && <span className="ml-1 text-gray-dim">↗</span>}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={DASHBOARD_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-volt hidden rounded-full px-5 py-2.5 text-sm font-semibold sm:inline-flex"
            >
              Get Started
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            >
              <span
                className={`block h-px w-6 bg-white-soft transition-transform duration-300 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-6 bg-white-soft transition-transform duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-[85] flex flex-col justify-center bg-void px-8 transition-opacity duration-400 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}
              onClick={() => setOpen(false)}
              className={`display-lg py-2.5 text-white-soft transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${100 + i * 55}ms` : "0ms" }}
            >
              <span className="mr-3 font-mono text-sm text-volt">
                0{i + 1}
              </span>
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={DASHBOARD_URL}
          target="_blank"
          rel="noreferrer"
          className={`btn-volt mt-10 inline-flex w-fit rounded-full px-7 py-3.5 font-semibold transition-all duration-500 ${
            open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          style={{ transitionDelay: open ? "420ms" : "0ms" }}
        >
          Get Started
        </a>
      </div>
    </>
  );
}
