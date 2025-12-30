// File: /src/app/(site)/[lang]/faq/page.tsx

import { getDict, t } from "@/lib/i18n/dictionaries";
import FaqAccordion from './FaqAccordion';

function FaqItem({ q, a, defaultOpen = false }: { q: string; a: string; defaultOpen?: boolean }) {
  return (
    <details className="tm-card tm-faq__item" open={defaultOpen}>
      <summary>
        <h3 className="tm-h3 tm-faq__q">{q}</h3>
        <span className="tm-faq__chev" aria-hidden="true">▾</span>
      </summary>

      <div data-faq-panel>
        <div className="tm-faq__a">
          <p className="tm-text">{a}</p>
        </div>
      </div>
    </details>
  );
}

export default async function FAQ({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDict(lang as "de" | "en");

  // items direkt aus dict lesen
  const items = (dict as any)?.faq?.items ?? [];

  return (
    <>
      <section className="tm-section tm-section--soft tm-section--accent-top">
        <div className="tm-container tm-center tm-stack-md">
          <h1 className="tm-h1">{t(dict, "faq.hero.title")}</h1>
          <p className="tm-lead">{t(dict, "faq.hero.lead")}</p>
        </div>
      </section>

      <section className="tm-section">
        <div className="tm-container">
          <FaqAccordion>
            {items.map((it: any, i: number) => (
              <FaqItem key={i} q={it.q} a={it.a} defaultOpen={i === 0} />
            ))}
          </FaqAccordion>
        </div>
      </section>

      <section className="tm-section tm-section--soft">
        <div className="tm-container tm-center tm-stack-md">
          <h2 className="tm-h2">{t(dict, "faq.cta.title")}</h2>
          <p className="tm-lead">{t(dict, "faq.cta.text")}</p>
          <div className="tm-actions">
            <a href={`/${lang}/kontakt`} className="tm-btn tm-btn--ghost">
              {t(dict, "common.cta.contact")}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
