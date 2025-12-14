'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import LangSwitch from '@/components/LangSwitch';

const SUPPORTED_LANGS = ['de', 'en'] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

export default function Header() {
  const pathname = usePathname() || '/de';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const lang: Lang = useMemo(() => {
    const first = pathname.split('/')[1];
    return (SUPPORTED_LANGS as readonly string[]).includes(first) ? (first as Lang) : 'de';
  }, [pathname]);

  const href = (p: string) => `/${lang}${p.startsWith('/') ? p : `/${p}`}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 920) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className={`tm-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="tm-container tm-header__inner">
        <Link href={`/${lang}`} className="tm-brand" aria-label="TattooMate Startseite">
          <span className="tm-brand__logo">
            <Image
              src="/images/branding/logo-tattoomate.svg"
              alt="TattooMate"
              width={72}
              height={72}
              priority
            />
          </span>
          <span className="tm-brand__name">TattooMate</span>
        </Link>

        <nav className="tm-nav" aria-label="Hauptnavigation">
          <Link className="tm-nav__link" href={href('/funktionen')}>Funktionen</Link>
          <Link className="tm-nav__link" href={href('/formulare')}>Formulare</Link>
          <Link className="tm-nav__link" href={href('/sicherheit')}>Sicherheit</Link>
          <Link className="tm-nav__link" href={href('/preise')}>Preise</Link>
          <Link className="tm-nav__link" href={href('/faq')}>FAQ</Link>
        </nav>

        <div className="tm-header__actions">
          <Link className="tm-link" href={href('/login')}>Login</Link>

          {/* Entscheide: intern oder extern. Hier intern: */}
          <Link className="tm-btn tm-btn--primary" href={href('/demo')}>
            Live-Demo ansehen
          </Link>
          <LangSwitch lang={lang} />
          <button
            type="button"
            className="tm-burger"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            <span className="tm-burger__lines" />
          </button>
        </div>


      </div>

      <div className={`tm-drawer ${open ? 'is-open' : ''}`}>
        <div className="tm-drawer__panel">
          <nav className="tm-drawer__nav" aria-label="Mobile Navigation">
            <Link className="tm-drawer__link" href={href('/funktionen')} onClick={() => setOpen(false)}>Funktionen</Link>
            <Link className="tm-drawer__link" href={href('/formulare')} onClick={() => setOpen(false)}>Formulare</Link>
            <Link className="tm-drawer__link" href={href('/sicherheit')} onClick={() => setOpen(false)}>Sicherheit</Link>
            <Link className="tm-drawer__link" href={href('/preise')} onClick={() => setOpen(false)}>Preise</Link>
            <Link className="tm-drawer__link" href={href('/faq')} onClick={() => setOpen(false)}>FAQ</Link>

            <div className="tm-divider" />

            <Link className="tm-btn tm-btn--primary tm-btn--block" href={href('/demo')} onClick={() => setOpen(false)}>
              Live-Demo ansehen
            </Link>
            <LangSwitch lang={lang} />
            <Link className="tm-btn tm-btn--ghost tm-btn--block" href={href('/login')} onClick={() => setOpen(false)}>
              Login
            </Link>
          </nav>
        </div>

        <button
          type="button"
          className="tm-drawer__backdrop"
          aria-label="Overlay schließen"
          onClick={() => setOpen(false)}
        />
      </div>
    </header>
  );
}
