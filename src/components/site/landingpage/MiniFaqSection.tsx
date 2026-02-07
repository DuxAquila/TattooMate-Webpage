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
    <section className="tm-section">
      <div className="tm-container">
        <div className="tm-head tm-center">
          <h2 className="tm-h2">{headline}</h2>
          <p className="tm-lead">{subtitle}</p>
        </div>

        <div className="tm-grid tm-grid--2">
          {safe.map((it, idx) => (
            <div key={`${idx}-${it.q}`} className="tm-card tm-card--hover">
              <h3 className="tm-h3">{it.q}</h3>
              <p className="tm-text">{it.a}</p>
            </div>
          ))}
        </div>

        <div className="tm-actions">
          <Link href={moreHref} className="tm-btn tm-btn--ghost">
            {moreLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

