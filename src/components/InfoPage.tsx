import { PageChrome } from "./PageChrome";
import { INFO_PAGES, type InfoSlug, type Block } from "../data/pages";

function BlockView({ block }: { block: Block }) {
  if (block.type === "text") {
    return (
      <section>
        {block.heading && <h2 className="text-2xl font-semibold text-white-soft">{block.heading}</h2>}
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-gray">
          {block.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      {block.heading && <h2 className="mb-6 text-2xl font-semibold text-white-soft">{block.heading}</h2>}
      <div className="grid gap-5 sm:grid-cols-2">
        {block.items.map((c) => (
          <div key={c.title} className="rounded-2xl border border-line bg-panel p-6">
            <h3 className="font-display text-lg text-white-soft">{c.title}</h3>
            {c.description && <p className="mt-2 text-sm leading-relaxed text-gray">{c.description}</p>}
            {c.action && (
              <a
                href={c.action.href}
                target={c.action.href.startsWith("http") ? "_blank" : undefined}
                rel={c.action.href.startsWith("http") ? "noreferrer" : undefined}
                className="mt-5 inline-flex rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-white-soft transition-colors hover:border-volt/60 hover:text-volt"
              >
                {c.action.label}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export function InfoPage({ slug }: { slug: InfoSlug }) {
  const page = INFO_PAGES[slug];
  return (
    <PageChrome>
      <h1 className="font-display text-4xl tracking-tight sm:text-5xl">{page.title}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray">{page.lead}</p>
      <div className="mt-12 space-y-12">
        {page.blocks.map((b, i) => (
          <BlockView key={i} block={b} />
        ))}
      </div>
    </PageChrome>
  );
}
