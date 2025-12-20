// File: /src/app/(site)/[lang]/agb/page.tsx

import { getDict, t } from "@/lib/i18n/dictionaries";

function Section({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="tm-card">
      <h2 className="tm-h3">{title}</h2>
      <p className="tm-text" style={{ whiteSpace: "pre-line" }}>
        {text}
      </p>
    </div>
  );
}

export default async function AGB({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDict(lang as "de" | "en");

  const items: Array<{ title: string; text: string }> =
    (dict as any)?.agb?.items ?? [];

  return (
    <>
      {/* HERO */}
      <section className="tm-section tm-section--soft tm-section--accent-top">
        <div className="tm-container tm-center tm-stack-md">
          <h1 className="tm-h1">{t(dict, "agb.hero.title")}</h1>
          <p className="tm-lead">{t(dict, "agb.hero.lead")}</p>
          <p className="tm-note">{t(dict, "agb.hero.note")}</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="tm-section">
        <div className="tm-container tm-stack-lg">
          {items.map((it, i) => (
            <Section key={i} title={it.title} text={it.text} />
          ))}
        </div>
      </section>
    </>
  );
}
