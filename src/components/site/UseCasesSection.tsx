// src/components/site/UseCasesSection.tsx
'use client';

import { useState, useEffect } from 'react';

type UseCase = {
  title: string;
  text: string;
};

export default function UseCasesSection({
  headline,
  subtitle,
  items,
  ctaEvent,
  ctaQr,
  previewStudioTitle,
  previewStudioText,
  previewEventTitle,
  previewEventText,
  previewQrTitle,
  previewQrText,
}: {
  headline: string;
  subtitle: string;
  items: UseCase[];
  ctaEvent: string; // bleibt drin (kompatibel), wird nicht mehr als Button genutzt
  ctaQr: string;    // bleibt drin (kompatibel), wird nicht mehr als Button genutzt
  previewStudioTitle: string;
  previewStudioText: string;
  previewEventTitle: string;
  previewEventText: string;
  previewQrTitle: string;
  previewQrText: string;
}) {
  const [preview, setPreview] = useState<null | 'studio' | 'event' | 'qrcode'>(null);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    setZoom(false);
  }, [preview]);

  return (
    <section className="tm-usecases">
      <div className="tm-container">
        <div className="tm-usecases__head">
          <h2 className="tm-usecases__headline">{headline}</h2>
          <p className="tm-usecases__subtitle">{subtitle}</p>
        </div>

        <div className="tm-usecases__grid">
          {items.map((item, idx) => (
            <div key={idx} className="tm-usecase">
              <h3 className="tm-usecase__title">{item.title}</h3>
              <p className="tm-usecase__text">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Pyramiden-Previews (statt Buttons) */}
        <div className="tm-usecases__thumbs" aria-label="Vorschauen">
          <button
            type="button"
            className="tm-thumb"
            onClick={() => setPreview('studio')}
            aria-label="Studio-Modus Vorschau öffnen"
          >
            <div className="tm-thumb__media">
              <img
                src="/images/previews/studio-mode.png"
                alt="Studio-Modus Vorschau"
                className="tm-thumb__img"
                loading="lazy"
              />
            </div>
            <div className="tm-thumb__meta">
              <span className="tm-thumb__badge2">Vorschau</span>
            </div>
          </button>

          <button
            type="button"
            className="tm-thumb"
            onClick={() => setPreview('event')}
            aria-label="Event-Modus Vorschau öffnen"
          >
            <div className="tm-thumb__media">
              <img
                src="/images/previews/event-mode.png"
                alt="Event-Modus Vorschau"
                className="tm-thumb__img"
                loading="lazy"
              />
            </div>
            <div className="tm-thumb__meta">
              <span className="tm-thumb__badge2">Vorschau</span>
            </div>
          </button>

          <button
            type="button"
            className="tm-thumb"
            onClick={() => setPreview('qrcode')}
            aria-label="QR-Code Tool Vorschau öffnen"
          >
            <div className="tm-thumb__media">
              <img
                src="/images/previews/qrcode-tool.png"
                alt="QR-Code Tool Vorschau"
                className="tm-thumb__img"
                loading="lazy"
              />
            </div>
            <div className="tm-thumb__meta">
              <span className="tm-thumb__badge2">Vorschau</span>
            </div>
          </button>
        </div>
      </div>

      {preview && (
        <div className="tm-preview">
          <div className="tm-preview__backdrop" onClick={() => setPreview(null)} />

          <div className="tm-preview__modal">
            <button
              className="tm-preview__close"
              onClick={() => setPreview(null)}
              aria-label="Schließen"
            >
              ×
            </button>

            {preview === 'studio' && (
              <>
                <h3>{previewStudioTitle}</h3>
                <p>{previewStudioText}</p>
                <img
                  src="/images/previews/studio-mode.png"
                  alt="Studio-Modus Vorschau"
                  className={`tm-preview__img ${zoom ? 'is-zoom' : ''}`}
                  onClick={() => setZoom((z) => !z)}
                />
                <p className="tm-preview__hint">
                  {zoom ? 'Zum Verkleinern klicken' : 'Zum Zoomen klicken'}
                </p>
              </>
            )}

            {preview === 'event' && (
              <>
                <h3>{previewEventTitle}</h3>
                <p>{previewEventText}</p>
                <img
                  src="/images/previews/event-mode.png"
                  alt="Event-Modus Vorschau"
                  className={`tm-preview__img ${zoom ? 'is-zoom' : ''}`}
                  onClick={() => setZoom((z) => !z)}
                />
                <p className="tm-preview__hint">
                  {zoom ? 'Zum Verkleinern klicken' : 'Zum Zoomen klicken'}
                </p>
              </>
            )}

            {preview === 'qrcode' && (
              <>
                <h3>{previewQrTitle}</h3>
                <p>{previewQrText}</p>
                <img
                  src="/images/previews/qrcode-tool.png"
                  alt="QR-Code Tool Vorschau"
                  className={`tm-preview__img ${zoom ? 'is-zoom' : ''}`}
                  onClick={() => setZoom((z) => !z)}
                />
                <p className="tm-preview__hint">
                  {zoom ? 'Zum Verkleinern klicken' : 'Zum Zoomen klicken'}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
