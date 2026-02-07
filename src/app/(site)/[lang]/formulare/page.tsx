// File: /src/app/(site)/[lang]/formulare/page.tsx

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

export default async function Formulare({
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
          <h1 className="tm-h1">{t(dict, "formulare.hero.title")}</h1>
          <p className="tm-lead">{t(dict, "formulare.hero.lead")}</p>

          <div className="tm-actions">
            <a href={`/${lang}/demo`} className="tm-btn tm-btn--primary">
              {t(dict, "common.cta.demo")}
            </a>
            <a href={`/${lang}/funktionen`} className="tm-btn tm-btn--ghost">
              {t(dict, "common.cta.features")}
            </a>
          </div>

          <p className="tm-note">{t(dict, "formulare.hero.note")}</p>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="tm-section">
        <div className="tm-container tm-stack-lg">
          <div className="tm-head tm-center">
            <h2 className="tm-h2">{t(dict, "formulare.overview.title")}</h2>
            <p className="tm-text">{t(dict, "formulare.overview.lead")}</p>
          </div>

          <div className="tm-grid tm-grid--3">
            <div className="tm-card">
              <h3 className="tm-h3">{t(dict, "formulare.overview.o1.title")}</h3>
              <p className="tm-text">{t(dict, "formulare.overview.o1.text")}</p>
            </div>
            <div className="tm-card">
              <h3 className="tm-h3">{t(dict, "formulare.overview.o2.title")}</h3>
              <p className="tm-text">{t(dict, "formulare.overview.o2.text")}</p>
            </div>
            <div className="tm-card">
              <h3 className="tm-h3">{t(dict, "formulare.overview.o3.title")}</h3>
              <p className="tm-text">{t(dict, "formulare.overview.o3.text")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM TYPES */}
      <section className="tm-section tm-section--soft">
        <div className="tm-container tm-stack-lg">
          <div className="tm-head tm-center">
            <h2 className="tm-h2">{t(dict, "formulare.types.title")}</h2>
            <p className="tm-text">{t(dict, "formulare.types.lead")}</p>
          </div>

          <div className="tm-grid tm-grid--2">
            <FeatureBlock
              title={t(dict, "formulare.types.tattoo.title")}
              lead={t(dict, "formulare.types.tattoo.lead")}
              bullets={[
                t(dict, "formulare.types.tattoo.b1"),
                t(dict, "formulare.types.tattoo.b2"),
                t(dict, "formulare.types.tattoo.b3"),
                t(dict, "formulare.types.tattoo.b4"),
                t(dict, "formulare.types.tattoo.b5"),
                t(dict, "formulare.types.tattoo.b6"),
                t(dict, "formulare.types.tattoo.b7"),
              ]}
            />

            <FeatureBlock
              title={t(dict, "formulare.types.piercing.title")}
              lead={t(dict, "formulare.types.piercing.lead")}
              bullets={[
                t(dict, "formulare.types.piercing.b1"),
                t(dict, "formulare.types.piercing.b2"),
                t(dict, "formulare.types.piercing.b3"),
                t(dict, "formulare.types.piercing.b4"),
              ]}
            />

            <FeatureBlock
              title={t(dict, "formulare.types.tooth.title")}
              lead={t(dict, "formulare.types.tooth.lead")}
              bullets={[
                t(dict, "formulare.types.tooth.b1"),
                t(dict, "formulare.types.tooth.b2"),
                t(dict, "formulare.types.tooth.b3"),
                t(dict, "formulare.types.tooth.b4"),
              ]}
            />
          </div>
        </div>
      </section>

      {/* SAFETY */}
      <section className="tm-section">
        <div className="tm-container tm-stack-lg">
          <div className="tm-head tm-center">
            <h2 className="tm-h2">{t(dict, "formulare.safety.title")}</h2>
            <p className="tm-text">{t(dict, "formulare.safety.lead")}</p>
          </div>

          <div className="tm-grid tm-grid--2">
            <FeatureBlock
              title={t(dict, "formulare.safety.card1.title")}
              lead={t(dict, "formulare.safety.card1.lead")}
              bullets={[
                t(dict, "formulare.safety.card1.b1"),
                t(dict, "formulare.safety.card1.b2"),
                t(dict, "formulare.safety.card1.b3"),
                t(dict, "formulare.safety.card1.b4"),
              ]}
            />

            <FeatureBlock
              title={t(dict, "formulare.safety.card2.title")}
              lead={t(dict, "formulare.safety.card2.lead")}
              bullets={[
                t(dict, "formulare.safety.card2.b1"),
                t(dict, "formulare.safety.card2.b2"),
                t(dict, "formulare.safety.card2.b3"),
                t(dict, "formulare.safety.card2.b4"),
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tm-section">
        <div className="tm-container tm-center tm-stack-md">
          <h2 className="tm-h2">{t(dict, "formulare.cta.title")}</h2>
          <p className="tm-lead">{t(dict, "formulare.cta.text")}</p>

          <div className="tm-actions">
            <a href={`/${lang}/demo`} className="tm-btn tm-btn--primary">
              {t(dict, "common.cta.demo")}
            </a>
            <a href={`/${lang}/funktionen`} className="tm-btn tm-btn--ghost">
              {t(dict, "common.cta.features")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
