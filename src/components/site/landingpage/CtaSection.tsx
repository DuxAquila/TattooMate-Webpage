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
    <section className="tm-section">
      <div className="tm-container">
        <div className="tm-card tm-cta-box">
          <h2 className="tm-h2">{headline}</h2>
          <p className="tm-lead">{subtitle}</p>

          <div className="tm-actions">
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

