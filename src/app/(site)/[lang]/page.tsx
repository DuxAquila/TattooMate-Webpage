import { getDict, t } from "@/lib/i18n/dictionaries";
import UseCasesSection from '@/components/site/UseCasesSection';
import HowToSection from '@/components/site/HowToSection';
import MiniFaqSection from '@/components/site/MiniFaqSection';
import CtaSection from '@/components/site/CtaSection';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDict(lang as "de" | "en");

  const features = dict.home?.features?.items ?? [];
  const usecases = dict.home?.usecases?.items ?? [];

  return (
    <>
    <section className="tm-hero">
      <div className="tm-container tm-hero__inner">
        <h1 className="tm-hero__title">{t(dict, "home.hero.title")}</h1>

        <p className="tm-hero__subtitle">{t(dict, "home.hero.subtitle")}</p>

        <div className="tm-hero__actions">
          <a href={`/${lang}/demo`} className="tm-btn tm-btn--primary">
            {t(dict, "common.cta.demo")}
          </a>
          <a href={`/${lang}/funktionen`} className="tm-btn tm-btn--ghost">
            {t(dict, "common.cta.features")}
          </a>
        </div>

        <div className="tm-hero__trust">
          <span className="tm-pill">{t(dict, "common.trust.dsgvo")}</span>
          <span className="tm-pill">{t(dict, "common.trust.studio")}</span>
          <span className="tm-pill">{t(dict, "common.trust.nocloud")}</span>
        </div>

        <p className="tm-hero__note">{t(dict, "home.hero.note")}</p>
      </div>
    </section>
    <UseCasesSection
      headline={t(dict, 'home.usecases.headline')}
      subtitle={t(dict, 'home.usecases.subtitle')}
      items={dict.home.usecases.items}
      ctaEvent={t(dict, 'home.usecases.cta.event')}
      ctaQr={t(dict, 'home.usecases.cta.tools')}
      previewStudioTitle={t(dict, 'home.usecases.preview.studio.title')}
      previewStudioText={t(dict, 'home.usecases.preview.studio.text')}
      previewEventTitle={t(dict, 'home.usecases.preview.event.title')}
      previewEventText={t(dict, 'home.usecases.preview.event.text')}
      previewQrTitle={t(dict, 'home.usecases.preview.qrcode.title')}
      previewQrText={t(dict, 'home.usecases.preview.qrcode.text')}
    />
    <HowToSection
      headline={t(dict, 'home.howto.headline')}
      subtitle={t(dict, 'home.howto.subtitle')}
      items={dict.home?.howto?.items ?? []}
      ctaPrimaryLabel={t(dict, 'home.howto.cta.primary')}
      ctaPrimaryHref={`/${lang}/demo`}
      ctaSecondaryLabel={t(dict, 'home.howto.cta.secondary')}
      ctaSecondaryHref={`/${lang}/funktionen`}
    />
    <section className="tm-features">
      <div className="tm-container">
        <h2 className="tm-features__headline">
          {t(dict, 'home.features.headline')}
        </h2>

        <div className="tm-features__grid">
          {features.map((item: any, idx: number) => (
            <div key={idx} className="tm-feature">
              <h3 className="tm-feature__title">{item.title}</h3>
              <p className="tm-feature__text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    <MiniFaqSection
      headline={t(dict, 'home.minifaq.headline')}
      subtitle={t(dict, 'home.minifaq.subtitle')}
      items={dict.home?.minifaq?.items ?? []}
      moreLabel={t(dict, 'home.minifaq.more')}
      moreHref={`/${lang}/faq`}
    />
    <CtaSection
      headline={t(dict, 'home.cta.headline')}
      subtitle={t(dict, 'home.cta.subtitle')}
      primaryLabel={t(dict, 'home.cta.primary')}
      primaryHref={`/${lang}/demo`}
      secondaryLabel={t(dict, 'home.cta.secondary')}
      secondaryHref={`/${lang}/kontakt`}
    />
    </>
  );
}
