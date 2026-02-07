// File: /src/app/(site)/[lang]/warum/page.tsx

import Link from "next/link";
import { getDict, t } from "@/lib/i18n/dictionaries";

export default async function WarumPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDict(lang as "de" | "en");

  return (
    <>
      <section className="tm-section tm-section--soft tm-section--accent-top-short">
        <div className="tm-container tm-stack-lg">
          {/* Header */}
          <header
            className="tm-stack-sm tm-center"
            style={{ maxWidth: 860, marginInline: "auto" }}
          >
            <h1 className="tm-h1">{t(dict, "warum.title")}</h1>
            <p className="tm-text-lead">{t(dict, "warum.lead")}</p>
          </header>

          {/* Content */}
          <article
            className="tm-stack-md"
            style={{ marginInline: "auto" }}
          >
              <div className="tm-prose">
              <p>{t(dict, "warum.p1")}</p>
              <p>{t(dict, "warum.p2")}</p>
              <p>{t(dict, "warum.p3")}</p>
            </div>

            {/* Callout */}
            <div className="tm-callout">
              <p>{t(dict, "warum.callout")}</p>
            </div>

            {/* Abschnitt 1 */}
            <div className="tm-stack-sm">
              <h2 className="tm-h2 tm-center">{t(dict, "warum.h2_1")}</h2>
              <div className="tm-prose">
                <p>{t(dict, "warum.p4")}</p>
                <p>{t(dict, "warum.p5")}</p>
                <p>{t(dict, "warum.p6")}</p>
              </div>
            </div>

            {/* Abschnitt 2 */}
            <div className="tm-stack-sm">
              <h2 className="tm-h2  tm-center">{t(dict, "warum.h2_2")}</h2>
              <div className="tm-prose">
                <p>{t(dict, "warum.p7")}</p>
                <p>{t(dict, "warum.p8")}</p>
                <p>{t(dict, "warum.p9")}</p>
                <p>{t(dict, "warum.p10")}</p>
              </div>
            </div>

            {/* Abschnitt 3 */}
            <div className="tm-stack-sm">
              <h2 className="tm-h2 tm-center">{t(dict, "warum.h2_3")}</h2>
              <div className="tm-prose">
                <p>{t(dict, "warum.p11")}</p>
                <p>{t(dict, "warum.p12")}</p>
                <p>{t(dict, "warum.p13")}</p>
              </div>
            </div>

            {/* Abschnitt 4 */}
            <div className="tm-stack-sm">
              <h2 className="tm-h2 tm-center">{t(dict, "warum.h2_4")}</h2>
              <div className="tm-prose">
                <p>{t(dict, "warum.p14")}</p>
                <p>{t(dict, "warum.p15")}</p>
                <p className="tm-text-muted is-tight">{t(dict, "warum.p16")}</p>
                <p></p>
              </div>
            </div>

            {/* Outro + CTA */}
            <div style={{ marginTop: "var(--tm-space-md)" }}>
              <div className="tm-stack-sm tm-space-md"  style={{ paddingTop: 0 }}>
                <div className="tm-prose">
                  <p>{t(dict, "warum.outro")}</p>
                  <p className="is-tight">{t(dict, "warum.outro2")}</p>
                </div>

                <div className="tm-actions">
                  <Link
                    className="tm-btn tm-btn--primary"
                    href={`/${lang}/demo`}
                  >
                    {t(dict, "warum.ctaDemo")}
                  </Link>

                  <Link className="tm-btn tm-btn--ghost" href={`/${lang}/kontakt`}>
                    {t(dict, "warum.ctaContact")}
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
