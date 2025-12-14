'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function swapLang(pathname: string, targetLang: 'de' | 'en') {
  const parts = pathname.split('/').filter(Boolean);

  if (parts.length === 0) return `/${targetLang}`;

  if (parts[0] === 'de' || parts[0] === 'en') {
    parts[0] = targetLang;
    return `/${parts.join('/')}`;
  }

  return `/${targetLang}/${parts.join('/')}`;
}

export default function LangSwitch({ lang }: { lang: 'de' | 'en' }) {
  const pathname = usePathname() || '/';
  const toDe = swapLang(pathname, 'de');
  const toEn = swapLang(pathname, 'en');

  return (
    <div className="tm-lang">
      <Link
        href={toDe}
        className={`tm-lang__item ${lang === 'de' ? 'is-active' : ''}`}
      >
        DE
      </Link>
      <Link
        href={toEn}
        className={`tm-lang__item ${lang === 'en' ? 'is-active' : ''}`}
      >
        EN
      </Link>
    </div>
  );
}
