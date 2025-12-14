// src/components/site/CtaSection.tsx
import Link from 'next/link';

export default function CtaSection({
  headline,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  headline: string;
  subtitle: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}) {
  return (
    <section className="tm-cta">
      <div className="tm-container">
        <div className="tm-cta__box">
          <div className="tm-cta__content">
            <h2 className="tm-cta__headline">{headline}</h2>
            <p className="tm-cta__subtitle">{subtitle}</p>
          </div>

          <div className="tm-cta__actions">
            <Link href={primaryHref} className="tm-btn tm-btn--primary">
              {primaryLabel}
            </Link>
            <Link href={secondaryHref} className="tm-btn tm-btn--ghost">
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

