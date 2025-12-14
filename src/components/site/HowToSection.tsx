import Link from 'next/link';

type Item = {
  title: string;
  text: string;
};

export default function HowToSection({
  headline,
  subtitle,
  items = [],
  ctaPrimaryLabel,
  ctaPrimaryHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
}: {
  headline: string;
  subtitle: string;
  items?: Item[];
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
}) {
  const safeItems = Array.isArray(items) ? items.slice(0, 3) : [];

  return (
    <section className="tm-section">
      <div className="tm-container">
        <div className="tm-head">
          <h2 className="tm-h2">{headline}</h2>
          <p className="tm-lead">{subtitle}</p>
        </div>

        <div className="tm-grid tm-grid--3">
          {safeItems.map((s, idx) => (
            <div key={`${idx}-${s.title}`} className="tm-card tm-card--hover tm-step">
              <div className="tm-step__badge">{idx + 1}</div>
              <h3 className="tm-h3">{s.title}</h3>
              <p className="tm-text">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="tm-actions">
          <Link href={ctaPrimaryHref} className="tm-btn tm-btn--primary">
            {ctaPrimaryLabel}
          </Link>
          <Link href={ctaSecondaryHref} className="tm-btn tm-btn--ghost">
            {ctaSecondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
