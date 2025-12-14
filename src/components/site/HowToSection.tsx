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
    <section className="tm-howto">
      <div className="tm-container">
        <div className="tm-howto__head">
          <h2 className="tm-howto__headline">{headline}</h2>
          <p className="tm-howto__subtitle">{subtitle}</p>
        </div>

        <div className="tm-howto__grid">
          {safeItems.map((s, idx) => (
            <div key={`${idx}-${s.title}`} className="tm-howto__card">
              <div className="tm-howto__badge">{idx + 1}</div>
              <h3 className="tm-howto__title">{s.title}</h3>
              <p className="tm-howto__text">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="tm-howto__actions">
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
