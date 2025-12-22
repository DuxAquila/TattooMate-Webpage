import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, t } from "@/lib/i18n/dictionaries";
import Markdown from "@/components/site/Markdown";
import { getBaseUrl } from "@/lib/http/base-url";

export const dynamic = "force-dynamic";

type ApiPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  publishedAt: string | null;
  updatedAt: string;
};

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const dict = await getDict(lang as "de" | "en");

  const base = getBaseUrl();
  const res = await fetch(
    `${base}/api/public/news/${encodeURIComponent(slug)}?lang=${encodeURIComponent(
      lang
    )}`,
    { cache: "no-store" }
  );

  if (res.status === 404) notFound();

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Public news API failed (${res.status}): ${text}`);
  }

  const data = (await res.json()) as { post?: ApiPost };
  const post = data.post;
  if (!post) notFound();

  const dateLabel = post.publishedAt
    ? new Intl.DateTimeFormat(lang, {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }).format(new Date(post.publishedAt))
    : "";

  return (
    <section className="tm-section">
      <div className="tm-container">
        <div className="tm-card tm-card--hover tm-step">
          {dateLabel ? (
            <div className="tm-step__longbadge">{dateLabel}</div>
          ) : null}

          <div className="tm-card__body">

            {/* Head */}
            <h1 className="tm-h2" style={{ marginBottom: 6 }}>
              {post.title}
            </h1>

            {/* Meta */}
            <div className="tm-article__meta" style={{ marginBottom: 14 }}>
              <span>{t(dict, "common.news.published") ?? "Veröffentlicht"}</span>
              <span>•</span>
              <span>{dateLabel || "—"}</span>
              <span>•</span>
              <span>
                {t(dict, "common.news.by") ?? "von"} TattooMate
              </span>
            </div>

            {/* Content */}
            <div style={{ marginTop: 16 }}>
              <Markdown content={post.content} />
            </div>

            {/* Actions */}
            <div className="tm-actions" style={{ marginTop: 18 }}>
              <Link href={`/${lang}/news`} className="tm-btn tm-btn--primary">
                {t(dict, "common.news.backToList") ?? "Zurück zu allen News"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
