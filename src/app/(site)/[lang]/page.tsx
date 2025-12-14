import { getDict, t } from "@/lib/i18n/dictionaries";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDict(lang as "de" | "en");

  return (
    <section className="tm-hero">
      <div className="tm-container tm-hero__inner">
        <h1 className="tm-hero__title">{t(dict, "home.hero.title")}</h1>

        <p className="tm-hero__subtitle">{t(dict, "home.hero.subtitle")}</p>

        <div className="tm-hero__actions">
          <a href={`/${lang}/demo`} className="tm-btn tm-btn--primary">
            {t(dict, "common.cta.demo")}
          </a>
          <a href={`/${lang}/funktionen`} className="tm-btn tm-btn--ghost">
            {t(dict, "common.cta.features")}
          </a>
        </div>

        <div className="tm-hero__trust">
          <span className="tm-pill">{t(dict, "common.trust.dsgvo")}</span>
          <span className="tm-pill">{t(dict, "common.trust.studio")}</span>
          <span className="tm-pill">{t(dict, "common.trust.nocloud")}</span>
        </div>

        <p className="tm-hero__note">{t(dict, "home.hero.note")}</p>
      </div>
    </section>
  );
}
