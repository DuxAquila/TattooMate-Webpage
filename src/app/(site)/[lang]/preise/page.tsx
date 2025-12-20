// File: /src/app/(site)/[lang]/preise/page.tsx

import { getDict, t } from "@/lib/i18n/dictionaries";

function PriceCard({
  title,
  price,
  period,
  lead,
  bullets,
  highlight,
  note,
}: {
  title: string;
  price: string;
  period?: string;
  lead?: string;
  bullets: string[];
  highlight?: boolean;
  note?: React.ReactNode;
}) {
  return (
    <div className="tm-card tm-card--hover">
      <h3 className="tm-h3">{title}</h3>
      <div className="tm-price">
        <strong>{price}</strong>
        {period && <span className="tm-price__period">{period}</span>}
      </div>
      {lead && <p className="tm-text">{lead}</p>}
      <ul className="tm-list">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
        {note ? <div className="tm-note">{note}</div> : null}
      </ul>
    </div>
  );
}

export default async function Preise({
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
          <h1 className="tm-h1">{t(dict, "preise.hero.title")}</h1>
          <p className="tm-lead">{t(dict, "preise.hero.lead")}</p>
          <p className="tm-note">{t(dict, "preise.hero.note")}</p>
        </div>
      </section>

      {/* PRICES */}
      <section className="tm-section">
        <div className="tm-container tm-stack-lg">
          <div className="tm-head tm-center">
            <h2 className="tm-h2">{t(dict, "preise.packages.title")}</h2>
            <p className="tm-text">{t(dict, "preise.packages.lead")}</p>
          </div>

          <div className="tm-grid tm-grid--3">
            <PriceCard
              title={t(dict, "preise.base.title")}
              price={t(dict, "preise.base.price")}
              period={t(dict, "preise.base.period")}
              lead={t(dict, "preise.base.lead")}
              bullets={[
                t(dict, "preise.base.b1"),
                t(dict, "preise.base.b2"),
                t(dict, "preise.base.b3"),
                t(dict, "preise.base.b4"),
                t(dict, "preise.base.b5"),
              ]}
            />

            <PriceCard
              title={t(dict, "preise.tooth.title")}
              price={t(dict, "preise.tooth.price")}
              period={t(dict, "preise.tooth.period")}
              lead={t(dict, "preise.tooth.lead")}
              bullets={[
                t(dict, "preise.tooth.b1"),
                t(dict, "preise.tooth.b2"),
                t(dict, "preise.tooth.b3"),
              ]}
            />

          </div>
        </div>
      </section>

      {/* PACKET */}
      <section className="tm-section tm-section--soft">
        <div className="tm-container tm-stack-lg">
          <div className="tm-head tm-center">
            <h2 className="tm-h2">{t(dict, "preise.addon.title")}</h2>
            <p className="tm-text">{t(dict, "preise.addon.lead")}</p>
          </div>

          <div className="tm-grid tm-grid--3">
            <PriceCard
              title={t(dict, "preise.hosting.title")}
              price={t(dict, "preise.hosting.price")}
              period={t(dict, "preise.hosting.period")}
              lead={t(dict, "preise.hosting.lead")}
              bullets={[
                t(dict, "preise.hosting.b1"),
                t(dict, "preise.hosting.b2"),
                t(dict, "preise.hosting.b3"),
              ]}
              note={
                <>
                  {t(dict, "preise.hosting.avvNote")}{" "}
                  <a href={`/${lang}/avv`} className="tm-link">
                    {t(dict, "common.nav.avv")}
                  </a>
                </>
              }
            />
			
            <PriceCard
              title={t(dict, "preise.setup.title")}
              price={t(dict, "preise.setup.price")}
              period={t(dict, "preise.setup.period")}
              lead={t(dict, "preise.setup.lead")}
              bullets={[
                t(dict, "preise.setup.b1"),
                t(dict, "preise.setup.b2"),
                t(dict, "preise.setup.b3"),
              ]}
            />
			
            <PriceCard
              title={t(dict, "preise.training.title")}
              price={t(dict, "preise.training.price")}
              period={t(dict, "preise.training.period")}
              lead={t(dict, "preise.training.lead")}
              bullets={[
                t(dict, "preise.training.b1"),
                t(dict, "preise.training.b2"),
                t(dict, "preise.training.b3"),
              ]}
            />
			
          </div>
        </div>
      </section>
	  
      {/* CTA */}
      <section className="tm-section tm-section--soft">
        <div className="tm-container tm-center tm-stack-md">
          <h2 className="tm-h2">{t(dict, "preise.cta.title")}</h2>
          <p className="tm-lead">{t(dict, "preise.cta.text")}</p>

          <div className="tm-actions">
            <a href={`/${lang}/demo`} className="tm-btn tm-btn--primary">
              {t(dict, "common.cta.demo")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
