// src/components/site/MiniFaqSection.tsx
import Link from 'next/link';

type FaqItem = {
  q: string;
  a: string;
};

export default function MiniFaqSection({
  headline,
  subtitle,
  items = [],
  moreLabel,
  moreHref,
}: {
  headline: string;
  subtitle: string;
  items?: FaqItem[];
  moreLabel: string;
  moreHref: string;
}) {
  const safe = Array.isArray(items) ? items.slice(0, 4) : [];

  return (
    <section className="tm-faq">
      <div className="tm-container">
        <div className="tm-faq__head">
          <h2 className="tm-faq__headline">{headline}</h2>
          <p className="tm-faq__subtitle">{subtitle}</p>
        </div>

        <div className="tm-faq__grid">
          {safe.map((it, idx) => (
            <div key={`${idx}-${it.q}`} className="tm-faq__card">
              <h3 className="tm-faq__q">{it.q}</h3>
              <p className="tm-faq__a">{it.a}</p>
            </div>
          ))}
        </div>

        <div className="tm-faq__actions">
          <Link href={moreHref} className="tm-btn tm-btn--ghost">
            {moreLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

