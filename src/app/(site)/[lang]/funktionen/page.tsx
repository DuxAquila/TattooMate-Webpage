// File: /src/app/(site)/[lang]/funktionen/page.tsx

import { getDict, t } from "@/lib/i18n/dictionaries";

type PageProps = {
  params: Promise<{ lang: string }>;
};

function tt(dict: any, key: string, fallback: string) {
  const v = t(dict, key);
  return (typeof v === "string" && v.trim().length > 0) ? v : fallback;
}

export default async function FunktionenPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDict(lang);

  // Fallbacks sind nur Sicherheitsnetz, damit nix kaputt geht wenn ein Key fehlt.
  const heroTitle = tt(dict, "funktionen.hero.title", "Funktionen");
  const heroLead = tt(
    dict,
    "funktionen.hero.lead",
    "Alles, was du im Studio brauchst – ohne Papierkram."
  );
  const heroNote = tt(
    dict,
    "funktionen.hero.note",
    "Keine Tracker. Kein Bullshit. Fokus auf Studio-Alltag."
  );

  const headline = tt(dict, "funktionen.section.headline", "Was TattooMate abdeckt");
  const subline = tt(
    dict,
    "funktionen.section.subline",
    "Funktionen, die im Alltag wirklich zählen."
  );

  const ctaTitle = tt(dict, "funktionen.cta.title", "Demo?");
  const ctaText = tt(
    dict,
    "funktionen.cta.text",
    "Kurz zeigen lassen, wie es im Alltag aussieht."
  );

  const demoLabel =
    tt(dict, "common.cta.demo", "Demo anfragen");
  const contactLabel =
    tt(dict, "common.cta.contact", "Kontakt");

  // Cards
  const cards = [
    {
      title: tt(dict, "funktionen.cards.forms.title", "Digitale Formulare"),
      lead: tt(dict, "funktionen.cards.forms.lead", "Tattoo & Piercing – sauber digital."),
      bullets: [
        tt(dict, "funktionen.cards.forms.b1", "Pflichtfelder & Validierung"),
        tt(dict, "funktionen.cards.forms.b2", "U18-Logik mit Elterndaten & Unterschriften"),
        tt(dict, "funktionen.cards.forms.b3", "Signaturen direkt im Formular"),
        tt(dict, "funktionen.cards.forms.b4", "PDF reproduzierbar aus dem Datensatz"),
      ],
    },
    {
      title: tt(dict, "funktionen.cards.admin.title", "Admin-Ansicht & Suche"),
      lead: tt(dict, "funktionen.cards.admin.lead", "Finden statt suchen."),
      bullets: [
        tt(dict, "funktionen.cards.admin.b1", "Übersicht mit Filtern & Suche"),
        tt(dict, "funktionen.cards.admin.b2", "Detailansicht pro Formular"),
        tt(dict, "funktionen.cards.admin.b3", "PDF jederzeit neu generieren"),
        tt(dict, "funktionen.cards.admin.b4", "Event/Convention sauber trennbar"),
      ],
    },
    {
      title: tt(dict, "funktionen.cards.events.title", "Event-Modus & QR-Codes"),
      lead: tt(dict, "funktionen.cards.events.lead", "Für Conventions gebaut."),
      bullets: [
        tt(dict, "funktionen.cards.events.b1", "Event-Modus für schnellen Ablauf"),
        tt(dict, "funktionen.cards.events.b2", "QR-Codes für direkte Formular-Links"),
        tt(dict, "funktionen.cards.events.b3", "Studio ↔ Event sauber getrennt"),
        tt(dict, "funktionen.cards.events.b4", "Nachbearbeitung ohne Chaos"),
      ],
    },
    {
      title: tt(dict, "funktionen.cards.privacy.title", "Datenschutz & Kontrolle"),
      lead: tt(dict, "funktionen.cards.privacy.lead", "Daten bleiben beim Studio."),
      bullets: [
        tt(dict, "funktionen.cards.privacy.b1", "Keine Analytics-Tracker"),
        tt(dict, "funktionen.cards.privacy.b2", "Keine unnötigen Drittanbieter"),
        tt(dict, "funktionen.cards.privacy.b3", "Self-hosted möglich"),
        tt(dict, "funktionen.cards.privacy.b4", "Nachvollziehbare Dokumentation"),
      ],
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="tm-section tm-section--soft tm-section--accent-top">
        <div className="tm-container tm-center tm-stack-md">
          <h1 className="tm-h1">{heroTitle}</h1>
          <p className="tm-lead">{heroLead}</p>

          <div className="tm-actions">
            <a href={`/${lang}/demo`} className="tm-btn tm-btn--primary">
              {demoLabel}
            </a>
            <a href={`/${lang}/kontakt`} className="tm-btn tm-btn--ghost">
              {contactLabel}
            </a>
          </div>

          <div className="tm-badges">
            <span className="tm-pill">
              {tt(dict, "funktionen.hero.badge1", "DSGVO-bewusst")}
            </span>
            <span className="tm-pill">
              {tt(dict, "funktionen.hero.badge2", "Studio-fokussiert")}
            </span>
            <span className="tm-pill">
              {tt(dict, "funktionen.hero.badge3", "Kein Cloud-Zwang")}
            </span>
          </div>

          <p className="tm-note">{heroNote}</p>
        </div>
      </section>

      {/* GRID */}
      <section className="tm-section">
        <div className="tm-container tm-stack-lg">
          <div className="tm-head tm-center">
            <h2 className="tm-h2">{headline}</h2>
            <p className="tm-text">{subline}</p>
          </div>

          <div className="tm-grid tm-grid--2">
            {cards.map((c, idx) => (
              <div key={idx} className="tm-card tm-card--hover">
                <h3 className="tm-h3">{c.title}</h3>
                <p className="tm-text">{c.lead}</p>
                <ul className="tm-list">
                  {c.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="tm-section">
        <div className="tm-container tm-center tm-stack-md">
          <h2 className="tm-h2">{ctaTitle}</h2>
          <p className="tm-lead">{ctaText}</p>

          <div className="tm-actions">
            <a href={`/${lang}/demo`} className="tm-btn tm-btn--primary">
              {demoLabel}
            </a>
            <a href={`/${lang}/kontakt`} className="tm-btn tm-btn--ghost">
              {contactLabel}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
