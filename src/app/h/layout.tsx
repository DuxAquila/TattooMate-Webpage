// src/app/h/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hilfe – TattooMate',
  description: 'Anleitungen, Einrichtungshilfe und Mustertexte für TattooMate.',
  robots: { index: false, follow: false },
};

export default function HilfeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="tm-header">
          <div className="tm-container">
            <div className="tm-header__inner">
              <a href="/de" className="tm-brand">
                <span className="tm-brand__logo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/branding/logo-tattoomate.svg"
                    alt="TattooMate"
                    width={28}
                    height={28}
                  />
                </span>
                <span className="tm-brand__name">TattooMate</span>
              </a>

              <nav className="tm-nav" aria-label="Hilfe-Navigation">
                <a href="#erste-schritte" className="tm-nav__link">Erste Schritte</a>
                <a href="#smtp"           className="tm-nav__link">SMTP</a>
                <a href="#sicherheit"     className="tm-nav__link">Sicherheit</a>
                <a href="#formulare"      className="tm-nav__link">Formulare</a>
                <a href="#personal"       className="tm-nav__link">Personal</a>
                <a href="#newsletter"     className="tm-nav__link">Newsletter</a>
                <a href="#mustertexte"    className="tm-nav__link">Mustertexte</a>
              </nav>

              <div className="tm-header__actions">
                <a href="/de" className="tm-btn tm-btn--ghost" style={{ fontSize: 13 }}>
                  ← Zurück zur Website
                </a>
              </div>
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer style={{ padding: '32px 0 48px' }}>
          <div className="tm-container">
            <div className="tm-footer">
              <div className="tm-footer__bottom">
                <span>© {new Date().getFullYear()} TattooMate</span>
                <nav className="tm-footer__nav">
                  <a href="/de/impressum">Impressum</a>
                  <a href="/de/datenschutz">Datenschutz</a>
                  <a href="/de/kontakt">Kontakt</a>
                </nav>
              </div>
            </div>
          </div>
        </footer>
    </>
  );
}
