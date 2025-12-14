'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getDict, t } from '@/lib/i18n/dictionaries';

const SUPPORTED_LANGS = ['de', 'en'] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

export default function Footer() {
  const pathname = usePathname() || '/de';
  const [dict, setDict] = useState<any | null>(null);

  const lang: Lang =
    (SUPPORTED_LANGS as readonly string[]).includes(pathname.split('/')[1])
      ? (pathname.split('/')[1] as Lang)
      : 'de';

  useEffect(() => {
    let alive = true;
    (async () => {
      const d = await getDict(lang);
      if (alive) setDict(d);
    })();
    return () => {
      alive = false;
    };
  }, [lang]);

  const year = new Date().getFullYear();
  const tt = (key: string, fallback: string) =>
    dict ? t(dict, key).replace('{{year}}', String(year)) : fallback;

  const href = (p: string) => `/${lang}${p.startsWith('/') ? p : `/${p}`}`;

  return (
    <footer className="tm-section tm-section--accent-bottom">
      <div className="tm-container tm-footer">
        <div className="tm-footer__top">
          <div className="tm-footer__brand">
            <strong className="tm-footer__title">TattooMate</strong>
            <p className="tm-muted">
              {tt('footer.claim', 'Digitale Einwilligungen')}
            </p>
          </div>

          <nav className="tm-footer__nav">
            <Link href={href('/impressum')}>
              {tt('common.nav.imprint', 'Impressum')}
            </Link>
            <Link href={href('/datenschutz')}>
              {tt('common.nav.privacy', 'Datenschutz')}
            </Link>
            <Link href={href('/agb')}>
              {tt('common.nav.agb', 'AGB')}
            </Link>
          </nav>
        </div>

        <div className="tm-footer__bottom">
          <span>{tt('footer.meta.copyright', `© ${year} TattooMate`)}</span>
          <span>{tt('footer.meta.made', 'Made in Germany')}</span>
        </div>
      </div>
    </footer>
  );
}

