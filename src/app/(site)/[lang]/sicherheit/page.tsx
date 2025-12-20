// File: /src/app/(site)/[lang]/sicherheit/page.tsx

import { getDict, t } from "@/lib/i18n/dictionaries";

function FeatureBlock({
  title,
  lead,
  bullets,
}: {
  title: string;
  lead?: string;
  bullets: string[];
}) {
  return (
    <div className="tm-card tm-card--hover">
      <h3 className="tm-h3">{title}</h3>
      {lead && <p className="tm-text">{lead}</p>}
      <ul className="tm-list">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

export default async function Sicherheit({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDict(lang as "de" | "en");

  return (
    <>
      {/* HERO */}
      <section className="tm-section tm-section--soft tm-section--accent-top">
        <div className="tm-container tm-center tm-stack-md">
          <h1 className="tm-h1">{t(dict, "sicherheit.hero.title")}</h1>
          <p className="tm-lead">{t(dict, "sicherheit.hero.lead")}</p>

          <div className="tm-actions">
            <a href={`/${lang}/demo`} className="tm-btn tm-btn--primary">
              {t(dict, "common.cta.demo")}
            </a>
            <a href={`/${lang}/funktionen`} className="tm-btn tm-btn--ghost">
              {t(dict, "common.cta.features")}
            </a>
          </div>

          <p className="tm-note">{t(dict, "sicherheit.hero.note")}</p>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="tm-section">
        <div className="tm-container tm-stack-lg">
          <div className="tm-head tm-center">
            <h2 className="tm-h2">{t(dict, "sicherheit.overview.title")}</h2>
            <p className="tm-text">{t(dict, "sicherheit.overview.lead")}</p>
          </div>

          <div className="tm-grid tm-grid--3">
            <div className="tm-card">
              <h3 className="tm-h3">{t(dict, "sicherheit.overview.o1.title")}</h3>
              <p className="tm-text">{t(dict, "sicherheit.overview.o1.text")}</p>
            </div>
            <div className="tm-card">
              <h3 className="tm-h3">{t(dict, "sicherheit.overview.o2.title")}</h3>
              <p className="tm-text">{t(dict, "sicherheit.overview.o2.text")}</p>
            </div>
            <div className="tm-card">
              <h3 className="tm-h3">{t(dict, "sicherheit.overview.o3.title")}</h3>
              <p className="tm-text">{t(dict, "sicherheit.overview.o3.text")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* DATA & HOSTING */}
      <section className="tm-section tm-section--soft">
        <div className="tm-container tm-stack-lg">
          <div className="tm-head">
            <h2 className="tm-h2">{t(dict, "sicherheit.data.title")}</h2>
            <p className="tm-text">{t(dict, "sicherheit.data.lead")}</p>
          </div>

          <div className="tm-grid tm-grid--2">
            <FeatureBlock
              title={t(dict, "sicherheit.data.card1.title")}
              lead={t(dict, "sicherheit.data.card1.lead")}
              bullets={[
                t(dict, "sicherheit.data.card1.b1"),
                t(dict, "sicherheit.data.card1.b2"),
                t(dict, "sicherheit.data.card1.b3"),
                t(dict, "sicherheit.data.card1.b4"),
              ]}
            />

            <FeatureBlock
              title={t(dict, "sicherheit.data.card2.title")}
              lead={t(dict, "sicherheit.data.card2.lead")}
              bullets={[
                t(dict, "sicherheit.data.card2.b1"),
                t(dict, "sicherheit.data.card2.b2"),
                t(dict, "sicherheit.data.card2.b3"),
                t(dict, "sicherheit.data.card2.b4"),
              ]}
            />

            <FeatureBlock
              title={t(dict, "sicherheit.data.card3.title")}
              lead={t(dict, "sicherheit.data.card3.lead")}
              bullets={[
                t(dict, "sicherheit.data.card3.b1"),
                t(dict, "sicherheit.data.card3.b2"),
                t(dict, "sicherheit.data.card3.b3"),
                t(dict, "sicherheit.data.card3.b4"),
              ]}
            />
          </div>
        </div>
      </section>

      {/* ACCESS & ROLES */}
      <section className="tm-section">
        <div className="tm-container tm-stack-lg">
          <div className="tm-head">
            <h2 className="tm-h2">{t(dict, "sicherheit.access.title")}</h2>
            <p className="tm-text">{t(dict, "sicherheit.access.lead")}</p>
          </div>

          <div className="tm-grid tm-grid--2">
            <FeatureBlock
              title={t(dict, "sicherheit.access.card1.title")}
              lead={t(dict, "sicherheit.access.card1.lead")}
              bullets={[
                t(dict, "sicherheit.access.card1.b1"),
                t(dict, "sicherheit.access.card1.b2"),
                t(dict, "sicherheit.access.card1.b3"),
                t(dict, "sicherheit.access.card1.b4"),
              ]}
            />

            <FeatureBlock
              title={t(dict, "sicherheit.access.card2.title")}
              lead={t(dict, "sicherheit.access.card2.lead")}
              bullets={[
                t(dict, "sicherheit.access.card2.b1"),
                t(dict, "sicherheit.access.card2.b2"),
                t(dict, "sicherheit.access.card2.b3"),
                t(dict, "sicherheit.access.card2.b4"),
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tm-section">
        <div className="tm-container tm-center tm-stack-md">
          <h2 className="tm-h2">{t(dict, "sicherheit.cta.title")}</h2>
          <p className="tm-lead">{t(dict, "sicherheit.cta.text")}</p>

          <div className="tm-actions">
            <a href={`/${lang}/demo`} className="tm-btn tm-btn--primary">
              {t(dict, "common.cta.demo")}
            </a>
            <a href={`/${lang}/kontakt`} className="tm-btn tm-btn--ghost">
              {t(dict, "common.cta.contact")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
