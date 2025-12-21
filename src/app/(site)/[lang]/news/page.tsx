import Link from "next/link";
import { getDict, t } from "@/lib/i18n/dictionaries";
import { getBaseUrl } from "@/lib/http/base-url";

export const dynamic = "force-dynamic";

type ApiItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  publishedAt: string | null;
};

export default async function NewsIndex({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDict(lang as "de" | "en");

  const base = getBaseUrl();
  const res = await fetch(`${base}/api/public/news?lang=${encodeURIComponent(lang)}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // zeigt dir im Terminal die echte API-Fehlermeldung
    const text = await res.text();
    throw new Error(`Public news API failed (${res.status}): ${text}`);
  }
  const data = (await res.json()) as { items: ApiItem[] };
  const items = data.items ?? [];

  return (
    <section className="tm-section">
      <div className="tm-container">
        <div className="tm-head">
          <h1 className="tm-h2">
            {t(dict, "common.news.title") ?? "News"}
          </h1>
          <p className="tm-lead">
            {t(dict, "common.news.lead") ?? "Updates und Änderungen rund um TattooMate."}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="tm-card">
            <p className="tm-text" style={{ margin: 0 }}>
              {t(dict, "common.news.empty") ?? "Noch keine News vorhanden."}
            </p>
          </div>
        ) : (
          <div className="tm-grid tm-grid--3">
            {items.map((p) => (
              <Link
                key={p.id}
                href={`/${lang}/news/${p.slug}`}
                className="tm-card tm-card--hover tm-step"
                style={{ textDecoration: "none" }}
              >
                <div className="tm-step__longbadge">
                  {p.publishedAt
                    ? new Intl.DateTimeFormat(lang, {
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit"
                      }).format(new Date(p.publishedAt))
                    : "—"}
                </div>

                <h3 className="tm-h3" style={{ marginTop: 10 }}>
                  {p.title}
                </h3>

                {p.excerpt ? (
                  <p className="tm-text">{p.excerpt}</p>
                ) : (
                  <p className="tm-text" style={{ opacity: 0.75 }}>
                    {t(dict, "common.news.noExcerpt") ?? "Ohne Vorschau-Text."}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

