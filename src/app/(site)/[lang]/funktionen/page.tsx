// File: /src/app/(site)/[lang]/funktionen/page.tsx

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
      {lead ? <p className="tm-text">{lead}</p> : null}
      <ul className="tm-list">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

function FaqItem({
  q,
  a,
}: {
  q: string;
  a: string;
}) {
  return (
    <div className="tm-card">
      <h3 className="tm-h3">{q}</h3>
      <p className="tm-text">{a}</p>
    </div>
  );
}

export default async function FunktionenPage({
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
          <h1 className="tm-h1">{t(dict, "funktionen.hero.title")}</h1>
          <p className="tm-lead">{t(dict, "funktionen.hero.lead")}</p>

          <div className="tm-actions">
            <a href={`/${lang}/demo`} className="tm-btn tm-btn--primary">
              {t(dict, "common.cta.demo")}
            </a>
            <a href={`/${lang}/kontakt`} className="tm-btn tm-btn--ghost">
              {t(dict, "common.cta.contact")}
            </a>
          </div>

          <div className="tm-badges">
            <span className="tm-pill">{t(dict, "funktionen.hero.badge1")}</span>
            <span className="tm-pill">{t(dict, "funktionen.hero.badge2")}</span>
            <span className="tm-pill">{t(dict, "funktionen.hero.badge3")}</span>
          </div>

          <p className="tm-note">{t(dict, "funktionen.hero.note")}</p>
        </div>
      </section>

      {/* QUICK OVERVIEW */}
      <section className="tm-section">
        <div className="tm-container tm-stack-lg">
          <div className="tm-head tm-center">
            <h2 className="tm-h2">{t(dict, "funktionen.section.headline")}</h2>
            <p className="tm-text">{t(dict, "funktionen.section.subline")}</p>
          </div>

          <div className="tm-grid tm-grid--3">
            <div className="tm-card">
              <h3 className="tm-h3">{t(dict, "funktionen.overview.o1.title")}</h3>
              <p className="tm-text">{t(dict, "funktionen.overview.o1.text")}</p>
            </div>
            <div className="tm-card">
              <h3 className="tm-h3">{t(dict, "funktionen.overview.o2.title")}</h3>
              <p className="tm-text">{t(dict, "funktionen.overview.o2.text")}</p>
            </div>
            <div className="tm-card">
              <h3 className="tm-h3">{t(dict, "funktionen.overview.o3.title")}</h3>
              <p className="tm-text">{t(dict, "funktionen.overview.o3.text")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORMS & SAFETY */}
      <section className="tm-section tm-section--soft">
        <div className="tm-container tm-stack-lg">
          <div className="tm-head">
            <h2 className="tm-h2">{t(dict, "funktionen.blocks.forms.title")}</h2>
            <p className="tm-text">{t(dict, "funktionen.blocks.forms.lead")}</p>
          </div>

          <div className="tm-grid tm-grid--2">
            <FeatureBlock
              title={t(dict, "funktionen.blocks.forms.card1.title")}
              lead={t(dict, "funktionen.blocks.forms.card1.lead")}
              bullets={[
                t(dict, "funktionen.blocks.forms.card1.b1"),
                t(dict, "funktionen.blocks.forms.card1.b2"),
                t(dict, "funktionen.blocks.forms.card1.b3"),
                t(dict, "funktionen.blocks.forms.card1.b4"),
              ]}
            />
            <FeatureBlock
              title={t(dict, "funktionen.blocks.forms.card2.title")}
              lead={t(dict, "funktionen.blocks.forms.card2.lead")}
              bullets={[
                t(dict, "funktionen.blocks.forms.card2.b1"),
                t(dict, "funktionen.blocks.forms.card2.b2"),
                t(dict, "funktionen.blocks.forms.card2.b3"),
                t(dict, "funktionen.blocks.forms.card2.b4"),
              ]}
            />
          </div>
        </div>
      </section>

      {/* DOCUMENTATION & PDF */}
      <section className="tm-section">
        <div className="tm-container tm-stack-lg">
          <div className="tm-head">
            <h2 className="tm-h2">{t(dict, "funktionen.blocks.pdf.title")}</h2>
            <p className="tm-text">{t(dict, "funktionen.blocks.pdf.lead")}</p>
          </div>

          <div className="tm-grid tm-grid--2">
            <FeatureBlock
              title={t(dict, "funktionen.blocks.pdf.card1.title")}
              lead={t(dict, "funktionen.blocks.pdf.card1.lead")}
              bullets={[
                t(dict, "funktionen.blocks.pdf.card1.b1"),
                t(dict, "funktionen.blocks.pdf.card1.b2"),
                t(dict, "funktionen.blocks.pdf.card1.b3"),
                t(dict, "funktionen.blocks.pdf.card1.b4"),
              ]}
            />
            <FeatureBlock
              title={t(dict, "funktionen.blocks.pdf.card2.title")}
              lead={t(dict, "funktionen.blocks.pdf.card2.lead")}
              bullets={[
                t(dict, "funktionen.blocks.pdf.card2.b1"),
                t(dict, "funktionen.blocks.pdf.card2.b2"),
                t(dict, "funktionen.blocks.pdf.card2.b3"),
                t(dict, "funktionen.blocks.pdf.card2.b4"),
              ]}
            />
          </div>
        </div>
      </section>

      {/* ADMIN & SEARCH */}
      <section className="tm-section tm-section--soft">
        <div className="tm-container tm-stack-lg">
          <div className="tm-head">
            <h2 className="tm-h2">{t(dict, "funktionen.blocks.admin.title")}</h2>
            <p className="tm-text">{t(dict, "funktionen.blocks.admin.lead")}</p>
          </div>

          <div className="tm-grid tm-grid--2">
            <FeatureBlock
              title={t(dict, "funktionen.blocks.admin.card1.title")}
              lead={t(dict, "funktionen.blocks.admin.card1.lead")}
              bullets={[
                t(dict, "funktionen.blocks.admin.card1.b1"),
                t(dict, "funktionen.blocks.admin.card1.b2"),
                t(dict, "funktionen.blocks.admin.card1.b3"),
                t(dict, "funktionen.blocks.admin.card1.b4"),
              ]}
            />
            <FeatureBlock
              title={t(dict, "funktionen.blocks.admin.card2.title")}
              lead={t(dict, "funktionen.blocks.admin.card2.lead")}
              bullets={[
                t(dict, "funktionen.blocks.admin.card2.b1"),
                t(dict, "funktionen.blocks.admin.card2.b2"),
                t(dict, "funktionen.blocks.admin.card2.b3"),
                t(dict, "funktionen.blocks.admin.card2.b4"),
              ]}
            />
          </div>
        </div>
      </section>

      {/* EVENTS */}
      <section className="tm-section">
        <div className="tm-container tm-stack-lg">
          <div className="tm-head">
            <h2 className="tm-h2">{t(dict, "funktionen.blocks.events.title")}</h2>
            <p className="tm-text">{t(dict, "funktionen.blocks.events.lead")}</p>
          </div>

          <div className="tm-grid tm-grid--2">
            <FeatureBlock
              title={t(dict, "funktionen.blocks.events.card1.title")}
              lead={t(dict, "funktionen.blocks.events.card1.lead")}
              bullets={[
                t(dict, "funktionen.blocks.events.card1.b1"),
                t(dict, "funktionen.blocks.events.card1.b2"),
                t(dict, "funktionen.blocks.events.card1.b3"),
                t(dict, "funktionen.blocks.events.card1.b4"),
              ]}
            />
            <FeatureBlock
              title={t(dict, "funktionen.blocks.events.card2.title")}
              lead={t(dict, "funktionen.blocks.events.card2.lead")}
              bullets={[
                t(dict, "funktionen.blocks.events.card2.b1"),
                t(dict, "funktionen.blocks.events.card2.b2"),
                t(dict, "funktionen.blocks.events.card2.b3"),
                t(dict, "funktionen.blocks.events.card2.b4"),
              ]}
            />
          </div>
        </div>
      </section>

      {/* PRIVACY & ROLES */}
      <section className="tm-section tm-section--soft">
        <div className="tm-container tm-stack-lg">
          <div className="tm-head">
            <h2 className="tm-h2">{t(dict, "funktionen.blocks.security.title")}</h2>
            <p className="tm-text">{t(dict, "funktionen.blocks.security.lead")}</p>
          </div>

          <div className="tm-grid tm-grid--2">
            <FeatureBlock
              title={t(dict, "funktionen.blocks.security.card1.title")}
              lead={t(dict, "funktionen.blocks.security.card1.lead")}
              bullets={[
                t(dict, "funktionen.blocks.security.card1.b1"),
                t(dict, "funktionen.blocks.security.card1.b2"),
                t(dict, "funktionen.blocks.security.card1.b3"),
                t(dict, "funktionen.blocks.security.card1.b4"),
              ]}
            />
            <FeatureBlock
              title={t(dict, "funktionen.blocks.security.card2.title")}
              lead={t(dict, "funktionen.blocks.security.card2.lead")}
              bullets={[
                t(dict, "funktionen.blocks.security.card2.b1"),
                t(dict, "funktionen.blocks.security.card2.b2"),
                t(dict, "funktionen.blocks.security.card2.b3"),
                t(dict, "funktionen.blocks.security.card2.b4"),
              ]}
            />
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="tm-section">
        <div className="tm-container tm-stack-lg">
          <div className="tm-head tm-center">
            <h2 className="tm-h2">{t(dict, "funktionen.fit.title")}</h2>
            <p className="tm-text">{t(dict, "funktionen.fit.lead")}</p>
          </div>

          <div className="tm-grid tm-grid--2">
            <div className="tm-card">
              <h3 className="tm-h3">{t(dict, "funktionen.fit.good.title")}</h3>
              <ul className="tm-list">
                <li>{t(dict, "funktionen.fit.good.b1")}</li>
                <li>{t(dict, "funktionen.fit.good.b2")}</li>
                <li>{t(dict, "funktionen.fit.good.b3")}</li>
                <li>{t(dict, "funktionen.fit.good.b4")}</li>
              </ul>
            </div>

            <div className="tm-card">
              <h3 className="tm-h3">{t(dict, "funktionen.fit.bad.title")}</h3>
              <ul className="tm-list">
                <li>{t(dict, "funktionen.fit.bad.b1")}</li>
                <li>{t(dict, "funktionen.fit.bad.b2")}</li>
                <li>{t(dict, "funktionen.fit.bad.b3")}</li>
                <li>{t(dict, "funktionen.fit.bad.b4")}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ MINI */}
      <section className="tm-section tm-section--soft">
        <div className="tm-container tm-stack-lg">
          <div className="tm-head tm-center">
            <h2 className="tm-h2">{t(dict, "funktionen.faq.title")}</h2>
            <p className="tm-text">{t(dict, "funktionen.faq.lead")}</p>
          </div>

          <div className="tm-grid tm-grid--2">
            <FaqItem q={t(dict, "funktionen.faq.q1")} a={t(dict, "funktionen.faq.a1")} />
            <FaqItem q={t(dict, "funktionen.faq.q2")} a={t(dict, "funktionen.faq.a2")} />
            <FaqItem q={t(dict, "funktionen.faq.q3")} a={t(dict, "funktionen.faq.a3")} />
            <FaqItem q={t(dict, "funktionen.faq.q4")} a={t(dict, "funktionen.faq.a4")} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tm-section">
        <div className="tm-container tm-center tm-stack-md">
          <h2 className="tm-h2">{t(dict, "funktionen.cta.title")}</h2>
          <p className="tm-lead">{t(dict, "funktionen.cta.text")}</p>

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
