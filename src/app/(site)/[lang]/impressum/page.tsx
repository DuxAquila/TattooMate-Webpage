// File: /src/app/(site)/[lang]/impressum/page.tsx

import { getDict, t } from "@/lib/i18n/dictionaries";

export default async function Impressum({
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
          <h1 className="tm-h1">{t(dict, "impressum.hero.title")}</h1>
          <p className="tm-lead">{t(dict, "impressum.hero.lead")}</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="tm-section">
        <div className="tm-container tm-stack-lg tm-prose">
          <h2>{t(dict, "impressum.provider.title")}</h2>
          <p>{t(dict, "impressum.provider.name")}</p>
          <p>{t(dict, "impressum.provider.address")}</p>

          <h2>{t(dict, "impressum.contact.title")}</h2>
          <p>{t(dict, "impressum.contact.email")}</p>

          <h2>{t(dict, "impressum.legal.title")}</h2>
          <p>{t(dict, "impressum.legal.text")}</p>

          <h2>{t(dict, "impressum.liability.title")}</h2>
          <p>{t(dict, "impressum.liability.text")}</p>

          <h2>{t(dict, "impressum.copyright.title")}</h2>
          <p>{t(dict, "impressum.copyright.text")}</p>
        </div>
      </section>
    </>
  );
}
