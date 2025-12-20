// File: /src/app/(site)/[lang]/datenschutz/page.tsx

import { getDict, t } from "@/lib/i18n/dictionaries";

export default async function Datenschutz({
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
          <h1 className="tm-h1">{t(dict, "datenschutz.hero.title")}</h1>
          <p className="tm-lead">{t(dict, "datenschutz.hero.lead")}</p>
          <p className="tm-note">{t(dict, "datenschutz.hero.note")}</p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="tm-section">
        <div className="tm-container tm-stack-lg tm-prose">
          <h2>{t(dict, "datenschutz.controller.title")}</h2>
          <p>{t(dict, "datenschutz.controller.text")}</p>

          <h2>{t(dict, "datenschutz.general.title")}</h2>
          <p>{t(dict, "datenschutz.general.text")}</p>

          <h2>{t(dict, "datenschutz.hosting.title")}</h2>
          <p>{t(dict, "datenschutz.hosting.text")}</p>

          <h2>{t(dict, "datenschutz.cloudflare.title")}</h2>
          <p>{t(dict, "datenschutz.cloudflare.text")}</p>

          <h2>{t(dict, "datenschutz.logs.title")}</h2>
          <p>{t(dict, "datenschutz.logs.text")}</p>

          <h2>{t(dict, "datenschutz.cookies.title")}</h2>
          <p>{t(dict, "datenschutz.cookies.text")}</p>

          <h2>{t(dict, "datenschutz.contact.title")}</h2>
          <p>{t(dict, "datenschutz.contact.text")}</p>

          <h2>{t(dict, "datenschutz.rights.title")}</h2>
          <p>{t(dict, "datenschutz.rights.text")}</p>

          <h2>{t(dict, "datenschutz.changes.title")}</h2>
          <p>{t(dict, "datenschutz.changes.text")}</p>
        </div>
      </section>
    </>
  );
}
