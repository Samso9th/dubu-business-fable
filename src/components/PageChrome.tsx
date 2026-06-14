import { useEffect, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

const LEGAL_LINKS = [
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
];

const COMPANY_LINKS = [
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

/** Shared chrome (header + footer) for all standalone sub-pages. */
export function PageChrome({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return (
    <div className="min-h-screen bg-void text-white-soft">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/icon.png" alt="" className="h-8 w-8 rounded-lg" />
            <span className="font-display text-lg tracking-wide">
              DUBU <span className="text-volt">BUSINESS</span>
            </span>
          </Link>
          <Link to="/" className="text-sm text-gray transition-colors hover:text-white-soft">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-20">{children}</main>

      <footer className="border-t border-line bg-panel">
        <div className="mx-auto max-w-3xl space-y-5 px-6 py-8">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
            {COMPANY_LINKS.map((l) => (
              <Link key={l.to} to={l.to} className="text-gray transition-colors hover:text-white-soft">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[11px] text-gray-dim sm:flex-row">
            <span>© {new Date().getFullYear()} Dubu. All rights reserved.</span>
            <div className="flex flex-wrap items-center justify-center gap-5">
              {LEGAL_LINKS.map((l) => (
                <Link key={l.to} to={l.to} className="transition-colors hover:text-white-soft">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
