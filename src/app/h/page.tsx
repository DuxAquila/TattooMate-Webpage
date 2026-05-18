// src/app/h/page.tsx
'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'erste-schritte', label: 'Erste Schritte' },
  { id: 'smtp',           label: 'SMTP / E-Mail' },
  { id: 'sicherheit',     label: 'Sicherheit & 2FA' },
  { id: 'formulare',      label: 'Formulare einrichten' },
  { id: 'personal',       label: 'Personal / Accounts' },
  { id: 'newsletter',     label: 'Newsletter' },
  { id: 'mustertexte',    label: 'Mustertexte' },
];

export default function HilfePage() {
  const [active, setActive] = useState('erste-schritte');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="tm-container" style={{ paddingTop: 48, paddingBottom: 80 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48, alignItems: 'start' }}>

        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <aside style={{ position: 'sticky', top: 88 }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--tm-muted)', margin: '0 0 12px 4px' }}>
            Inhalt
          </p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {sections.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                style={{
                  padding: '8px 12px',
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: active === id ? 700 : 500,
                  color: active === id ? 'var(--tm-accent)' : 'var(--tm-text)',
                  background: active === id ? 'rgba(255,59,48,0.07)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'all 160ms var(--tm-ease)',
                  borderLeft: active === id ? '3px solid var(--tm-accent)' : '3px solid transparent',
                }}
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>

        {/* ── Hauptinhalt ─────────────────────────────────────────── */}
        <div style={{ display: 'grid', gap: 80 }}>

          {/* ── Erste Schritte ───────────────────────────────────── */}
          <section id="erste-schritte">
            <h2 className="tm-h3" style={{ fontSize: 28, marginBottom: 8 }}>🚀 Erste Schritte</h2>
            <p style={{ color: 'var(--tm-muted)', fontSize: 14, marginBottom: 24, marginTop: 0 }}>
              Diese Schritte empfehlen wir nach dem ersten Login — in genau dieser Reihenfolge.
            </p>
            <div className="tm-stack-md">
              <HilfeCard nr="1" title="SMTP einrichten"
                text="Damit TattooMate E-Mails versenden kann (Newsletter, Benachrichtigungen), muss SMTP eingerichtet werden. Gehe zu Einstellungen → E-Mail / SMTP."
                link={{ href: '#smtp', label: 'Zum SMTP-Abschnitt' }}
              />
              <HilfeCard nr="2" title="Zwei-Faktor-Authentifizierung aktivieren"
                text="Schütze deinen Admin-Bereich mit 2FA. Gehe zu Einstellungen → Sicherheit und aktiviere die Zwei-Faktor-Authentifizierung. Beim nächsten Login wirst du automatisch durch die Einrichtung geführt."
                link={{ href: '#sicherheit', label: 'Zur 2FA-Einrichtung' }}
              />
              <HilfeCard nr="3" title="Formulare anpassen"
                text="Passe Mindestalter und Texte (Risikoaufklärung, Nachsorge, Datenschutz, Bildrecht) für jedes Formularmodul an. Unter Mustertexte findest du fertige Vorlagen die du direkt übernehmen kannst."
                link={{ href: '#formulare', label: 'Zu den Formularen' }}
              />
              <HilfeCard nr="4" title="Personal anlegen"
                text="Lege weitere Mitarbeiter unter Personal → Neuer Benutzer an. Du kannst jedem Mitarbeiter gezielt Berechtigungen vergeben — z.B. nur Formulare einsehen, aber keine Einstellungen ändern."
                link={{ href: '#personal', label: 'Zu Personal / Accounts' }}
              />
              <HilfeCard nr="5" title="QR-Codes ausdrucken"
                text="Generiere unter Einstellungen → QR-Codes für jedes aktive Formular einen QR-Code. Drucke ihn aus und häng ihn am Empfang oder am Convention-Stand aus — Kunden scannen und füllen das Formular direkt am Handy aus."
              />
            </div>
          </section>

          {/* ── SMTP ─────────────────────────────────────────────── */}
          <section id="smtp">
            <h2 className="tm-h3" style={{ fontSize: 28, marginBottom: 24 }}>📧 SMTP / E-Mail</h2>
            <div className="tm-stack-md">
              <div className="tm-callout">
                <p>SMTP ist optional. Ohne SMTP kann TattooMate keine E-Mails versenden — das betrifft z.B. Newsletter und zukünftige Benachrichtigungen. Formulare funktionieren ohne SMTP vollständig.</p>
              </div>
              <HilfeCard title="SMTP einrichten"
                text="Gehe zu Einstellungen → E-Mail / SMTP. Du benötigst Host, Port, Benutzername und Passwort deines E-Mail-Anbieters. Häufige Anbieter: Gmail (smtp.gmail.com, Port 587), Strato, IONOS, Hetzner."
              />
              <HilfeCard title="Gmail einrichten"
                text='Bei Gmail musst du ein "App-Passwort" erstellen (nicht dein normales Google-Passwort). Gehe dazu in deinen Google-Account → Sicherheit → 2-Schritt-Verifizierung → App-Passwörter.'
              />
              <HilfeCard title="Verbindung testen"
                text='Nach dem Speichern kannst du über den Button "Verbindung testen" eine Test-E-Mail an deine Adresse schicken. Wenn diese ankommt, ist SMTP korrekt eingerichtet.'
              />
            </div>
          </section>

          {/* ── Sicherheit & 2FA ─────────────────────────────────── */}
          <section id="sicherheit">
            <h2 className="tm-h3" style={{ fontSize: 28, marginBottom: 24 }}>🔐 Sicherheit & 2FA</h2>
            <div className="tm-stack-md">

              <HilfeCard title="2FA aktivieren (Admin)"
                text="Unter Einstellungen → Sicherheit kannst du die Zwei-Faktor-Authentifizierung für alle Benutzer erzwingen. Optional kannst du eine Schonfrist festlegen (z.B. 3 Logins ohne 2FA-Einrichtung). Danach ist der Account gesperrt bis 2FA eingerichtet wurde."
              />

              <HilfeCard title="Welche Authenticator-App soll ich nutzen?">
                <p style={{ margin: '0 0 12px', color: 'var(--tm-muted)', fontSize: 14, lineHeight: 1.6 }}>
                  TattooMate funktioniert mit jeder TOTP-kompatiblen App. Unsere Empfehlungen:
                </p>
                <div style={{ display: 'grid', gap: 8 }}>
                  {[
                    {
                      name: 'Google Authenticator',
                      desc: 'Einfach, weit verbreitet',
                      ios: 'https://apps.apple.com/app/google-authenticator/id388497605',
                      android: 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2',
                    },
                    {
                      name: 'Authy',
                      desc: 'Cloud-Backup, mehrere Geräte',
                      ios: 'https://apps.apple.com/app/authy/id494168017',
                      android: 'https://play.google.com/store/apps/details?id=com.authy.authy',
                    },
                    {
                      name: '2FAS',
                      desc: 'Open Source, datenschutzfreundlich',
                      ios: 'https://apps.apple.com/app/2fas-auth/id1217793794',
                      android: 'https://play.google.com/store/apps/details?id=com.twofasapp',
                    },
                    {
                      name: 'Microsoft Authenticator',
                      desc: 'Gut für Microsoft-Nutzer',
                      ios: 'https://apps.apple.com/app/microsoft-authenticator/id983156458',
                      android: 'https://play.google.com/store/apps/details?id=com.azure.authenticator',
                    },
                    {
                      name: 'Apple Passwords',
                      desc: 'iOS 18+ eingebaut — kein Download nötig',
                      ios: null,
                      android: null,
                    },
                  ].map((app) => (
                    <div key={app.name} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 14px', borderRadius: 10,
                      background: 'var(--tm-bg-soft)', border: '1px solid var(--tm-border)',
                      gap: 12, flexWrap: 'wrap',
                    }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: 14 }}>{app.name}</span>
                        <span style={{ color: 'var(--tm-muted)', fontSize: 13, marginLeft: 8 }}>{app.desc}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {app.ios && (
                          <a href={app.ios} target="_blank" rel="noopener noreferrer"
                            className="tm-btn tm-btn--ghost" style={{ fontSize: 12, padding: '4px 10px' }}>
                            🍎 iOS
                          </a>
                        )}
                        {app.android && (
                          <a href={app.android} target="_blank" rel="noopener noreferrer"
                            className="tm-btn tm-btn--ghost" style={{ fontSize: 12, padding: '4px 10px' }}>
                            🤖 Android
                          </a>
                        )}
                        {!app.ios && !app.android && (
                          <span style={{ fontSize: 12, color: 'var(--tm-muted)', padding: '4px 0' }}>bereits installiert</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </HilfeCard>

              <HilfeCard title="2FA einrichten (mit QR-Code)"
                text="Beim ersten Login nach Aktivierung erscheint automatisch ein Setup-Dialog. Öffne deine Authenticator-App, wähle 'Konto hinzufügen' oder '+' und scanne den angezeigten QR-Code. Gib danach den 6-stelligen Code ein um die Einrichtung abzuschließen."
              />

              <HilfeCard title="2FA einrichten am Smartphone (ohne QR-Code)"
                text="Falls du den QR-Code nicht scannen kannst — z.B. weil du TattooMate direkt auf dem Smartphone nutzt — wird im Setup-Dialog zusätzlich ein manueller Code (32 Zeichen) angezeigt. Öffne deine Authenticator-App, wähle 'Manuell eingeben' oder 'Setup-Schlüssel eingeben' und tippe den Code ab. Der Kontoname ist frei wählbar, z.B. 'TattooMate'."
              />

              <HilfeCard title="2FA zurücksetzen (Admin)"
                text="Falls ein Benutzer keinen Zugang mehr zur Authenticator-App hat: Personal → Benutzer auswählen → Bearbeiten → 2FA zurücksetzen. Der Benutzer muss 2FA beim nächsten Login neu einrichten. Admins können ihre eigene 2FA nicht selbst zurücksetzen — dafür ist ein anderer Admin oder Root-Benutzer nötig."
              />

              <HilfeCard title="Root-Benutzer"
                text="Benutzer mit dem Root-Flag sind vom 2FA-Zwang ausgenommen und dienen als Notfall-Zugang falls alle anderen Accounts gesperrt sind. Root-Benutzer haben automatisch alle Rechte. Diesen Account gut absichern und nur im Notfall verwenden."
              />

            </div>
          </section>

          {/* ── Formulare ────────────────────────────────────────── */}
          <section id="formulare">
            <h2 className="tm-h3" style={{ fontSize: 28, marginBottom: 24 }}>📋 Formulare einrichten</h2>
            <div className="tm-stack-md">
              <div className="tm-callout">
                <p>Alle Formulartexte sind frei konfigurierbar. TattooMate liefert keine vorgeschriebenen Rechtstexte — du bist für die Inhalte verantwortlich. Im Abschnitt <a href="#mustertexte">Mustertexte</a> findest du Vorlagen zum Anpassen.</p>
              </div>
              <HilfeCard title="Mindestalter festlegen"
                text="Du kannst pro Formulartyp ein Mindestalter festlegen. Kunden unterhalb dieser Grenze werden automatisch gesperrt. Kunden zwischen Mindestalter und 18 Jahren lösen automatisch die Minderjährigen-Abfrage aus (Ausweis + Elternunterschrift)."
              />
              <HilfeCard title="Studio- und Event-Modus"
                text="Jedes Formular kann im Studio-Modus (vollständig) oder Event/Convention-Modus (reduziert) ausgefüllt werden. Im Event-Modus werden weniger Pflichtfelder abgefragt — ideal für Messen mit vielen Walk-ins."
              />
              <HilfeCard title="PDF-Export"
                text="Formulare können jederzeit als PDF exportiert werden — entweder einzeln über die Detailansicht oder gesammelt. PDFs werden dynamisch erzeugt und nicht dauerhaft als Datei gespeichert."
              />
              <HilfeCard title="Minderjährigen-Upload"
                text="Bei Kunden unter 18 Jahren fordert das Formular automatisch Fotos des Lichtbildausweises (Vorder- und Rückseite) von Kunde und Erziehungsberechtigtem sowie die Unterschrift des Erziehungsberechtigten an."
              />
            </div>
          </section>

          {/* ── Personal / Accounts ──────────────────────────────── */}
          <section id="personal">
            <h2 className="tm-h3" style={{ fontSize: 28, marginBottom: 24 }}>👥 Personal / Accounts</h2>
            <div className="tm-stack-md">
              <div className="tm-callout">
                <p>Jeder Mitarbeiter bekommt einen eigenen Account mit individuellen Berechtigungen. So hat jeder nur Zugriff auf das was er wirklich braucht.</p>
              </div>
              <HilfeCard title="Neuen Benutzer anlegen"
                text="Unter Personal → Neuer Benutzer kannst du einen neuen Account anlegen. Du vergibst Name, E-Mail und ein temporäres Passwort. Der Mitarbeiter sollte das Passwort beim ersten Login ändern."
              />
              <HilfeCard title="Berechtigungen vergeben"
                text="Jeder Benutzer bekommt individuelle Rechte die du unter Personal → Benutzer bearbeiten setzen kannst. Mehr zu den einzelnen Berechtigungen folgt in Kürze."
              />
              <HilfeCard title="Benutzer deaktivieren"
                text="Verlässt ein Mitarbeiter das Studio, deaktiviere den Account unter Personal → Benutzer bearbeiten. Der Account bleibt in der Datenbank erhalten (für die Zuordnung historischer Formulare), kann sich aber nicht mehr einloggen."
              />
            </div>
          </section>

          {/* ── Newsletter ───────────────────────────────────────── */}
          <section id="newsletter">
            <h2 className="tm-h3" style={{ fontSize: 28, marginBottom: 24 }}>📨 Newsletter</h2>
            <div className="tm-stack-md">
              <div className="tm-callout">
                <p>Das Newsletter-System setzt einen funktionierenden SMTP-Zugang voraus. Ohne SMTP können keine Kampagnen versendet werden.</p>
              </div>
              <HilfeCard title="Newsletter aktivieren"
                text="Unter Einstellungen → Newsletter Settings kannst du das System einschalten. Ohne Aktivierung beendet der Worker jede Runde sofort — es werden keine Mails versendet."
              />
              <HilfeCard title="Abonnenten"
                text="Kunden die im Formular dem Newsletter zustimmen werden automatisch als Abonnenten eingetragen. Du kannst Abonnenten auch manuell hinzufügen oder per CSV importieren."
              />
              <HilfeCard title="Vorlagen erstellen"
                text="Unter Newsletter → Vorlagen kannst du HTML-Vorlagen mit Platzhaltern erstellen. Verfügbare Platzhalter z.B.: {{studioName}}, {{name}}, {{unsubscribeLink}}."
              />
              <HilfeCard title="Automationen"
                text="Automationen versenden E-Mails automatisch zu bestimmten Ereignissen — z.B. Nachsorge-Mails einen Tag nach der Behandlung (TATTOO_AFTERCARE, PIERCING_AFTERCARE) oder Geburtstagsmails (BIRTHDAY)."
              />
              <HilfeCard title="Abmeldung"
                text="Jede versendete E-Mail enthält automatisch einen Abmelde-Link ({{unsubscribeLink}}). Dieser ist Pflicht und darf nicht entfernt werden."
              />
            </div>
          </section>

          {/* ── Mustertexte ──────────────────────────────────────── */}
          <section id="mustertexte">
            <h2 className="tm-h3" style={{ fontSize: 28, marginBottom: 24 }}>📝 Mustertexte</h2>
            <div className="tm-callout" style={{ marginBottom: 24 }}>
              <p>Diese Texte sind Vorlagen und kein Rechtsrat. Passe sie an dein Studio und deine lokalen Anforderungen an. Im Zweifel lass Texte juristisch prüfen.</p>
            </div>
            <div className="tm-stack-md">
              <MusterCard title="DSGVO-Einwilligungstext"
                text={`Mit dem Absenden dieses Formulars stimmen Sie der Verarbeitung Ihrer personenbezogenen Daten durch [Studioname] zu. Die Daten werden ausschließlich zur Durchführung der gebuchten Leistung sowie zur gesetzlich vorgeschriebenen Dokumentation verwendet und nicht an Dritte weitergegeben. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und lit. a DSGVO sowie Art. 9 Abs. 2 lit. a DSGVO für Gesundheitsdaten. Ihre Daten werden für bis zu 10 Jahre aufbewahrt. Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Widerspruch.`}
              />
              <MusterCard title="Tattoo-Risikoaufklärung (Kurzform)"
                text={`Ich wurde darüber informiert, dass das Tätowieren ein dauerhafter Eingriff in die Haut ist. Mögliche Risiken umfassen Allergien gegen Tattoopigmente, Entzündungen, Narbenbildung sowie Komplikationen bei bestimmten Vorerkrankungen. Ich bin gesund, nüchtern und volljährig. Die Nachsorgeanleitung habe ich erhalten und werde sie befolgen. Ich erkläre hiermit mein freiwilliges Einverständnis zur Durchführung des Tattoos.`}
              />
              <MusterCard title="Piercing-Risikoaufklärung (Kurzform)"
                text={`Ich wurde über die Risiken des Piercings aufgeklärt: Entzündungen, allergische Reaktionen (insbesondere auf Nickel), Abstoßungsreaktionen sowie verlängerte Heilung bei bestimmten Erkrankungen oder Medikamenteneinnahme. Ich bestätige, dass ich keine akuten Infektionskrankheiten habe und die angegebenen Angaben zur Gesundheit der Wahrheit entsprechen. Ich erteile mein Einverständnis zur Durchführung des Piercings.`}
              />
              <MusterCard title="Nachsorge Tattoo"
                text={`Nach dem Tätowieren: Frischhaltefolie oder Wundverband für 2–4 Stunden belassen. Anschließend mit lauwarmem Wasser und einer milden Seife abwaschen. 2× täglich dünn mit einer geruchlosen Pflegecreme (z.B. Bepanthen) eincremen. Direkte Sonneneinstrahlung und Solarium für 4 Wochen meiden. Nicht kratzen oder scheuern. Bei Rötungen, Schwellungen oder Eiterbildung sofort einen Arzt aufsuchen.`}
              />
              <MusterCard title="Nachsorge Piercing"
                text={`2× täglich mit steriler Kochsalzlösung (NaCl 0,9%) reinigen. Nicht drehen, ziehen oder berühren. Kein Desinfektionsmittel, kein Alkohol. Chlorwasser (Schwimmbad, Meer) für 6–8 Wochen meiden. Bei anhaltenden Reizungen, Eiterbildung oder starken Schwellungen einen Arzt aufsuchen. Die Heilungszeit variiert je nach Piercingstelle (4 Wochen bis zu 12 Monate).`}
              />
              <MusterCard title="Bildrechte / Foto-Einwilligung"
                text={`Ich stimme zu, dass [Studioname] Fotos meines Tattoos / Piercings für eigene Marketingzwecke verwenden darf (z.B. Instagram, Website, Druckmaterialien). Diese Einwilligung ist freiwillig und kann jederzeit widerrufen werden. Ein Widerruf gilt für zukünftige Nutzungen; bereits veröffentlichte Inhalte können nicht in jedem Fall vollständig entfernt werden.`}
              />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

/* ── Hilfe-Karte ────────────────────────────────────────────────── */
function HilfeCard({ nr, title, text, link, children }: {
  nr?: string;
  title: string;
  text?: string;
  link?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <div className="tm-card" style={{ display: 'grid', gridTemplateColumns: nr ? '32px 1fr' : '1fr', gap: 16, alignItems: 'start' }}>
      {nr && (
        <span style={{
          width: 32, height: 32, borderRadius: 999,
          background: 'linear-gradient(135deg, var(--tm-accent), var(--tm-accent2))',
          color: '#fff', fontWeight: 700, fontSize: 13,
          display: 'grid', placeItems: 'center', flexShrink: 0,
        }}>
          {nr}
        </span>
      )}
      <div>
        <p style={{ margin: '0 0 6px', fontWeight: 700, fontSize: 15 }}>{title}</p>
        {text && <p style={{ margin: 0, color: 'var(--tm-muted)', fontSize: 14, lineHeight: 1.6 }}>{text}</p>}
        {children}
        {link && (
          <a href={link.href} style={{ display: 'inline-block', marginTop: 8, fontSize: 13, fontWeight: 600, color: 'var(--tm-accent)', textDecoration: 'none' }}>
            {link.label} →
          </a>
        )}
      </div>
    </div>
  );
}

/* ── Mustertext-Karte mit Kopieren-Button ───────────────────────── */
function MusterCard({ title, text }: { title: string; text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="tm-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <p style={{ margin: 0, fontWeight: 700, fontSize: 15 }}>{title}</p>
        <button onClick={handleCopy} className="tm-btn tm-btn--ghost" style={{ fontSize: 12, padding: '6px 12px' }}>
          {copied ? '✓ Kopiert' : 'Kopieren'}
        </button>
      </div>
      <div style={{
        padding: '14px 16px', borderRadius: 12,
        background: 'var(--tm-bg-soft)', border: '1px solid var(--tm-border)',
        fontSize: 14, lineHeight: 1.7, color: 'var(--tm-text)', whiteSpace: 'pre-wrap',
      }}>
        {text}
      </div>
    </div>
  );
}
