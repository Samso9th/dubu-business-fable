import { PageChrome } from "./PageChrome";
import { LEGAL_PAGES, type LegalSlug } from "../data/legal";

export function LegalPage({ slug }: { slug: LegalSlug }) {
  const page = LEGAL_PAGES[slug];

  return (
    <PageChrome>
      <h1 className="font-display text-4xl tracking-tight sm:text-5xl">{page.title}</h1>
      <p className="mt-3 text-sm text-gray">Last updated: {page.updated}</p>

      <div className="mt-12 space-y-10">
        {page.sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-xl font-semibold text-white-soft">{s.heading}</h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray">
              {s.body.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageChrome>
  );
}
