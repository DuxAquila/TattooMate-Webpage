// /src/app/not-found.tsx

export default function NotFound() {
  return (
    <>
      {/* HERO */}
      <section className="tm-section tm-section--soft tm-section--accent-top">
        <div className="tm-container tm-center tm-stack-md">
          <h1 className="tm-h1">Seite nicht gefunden</h1>
          <p className="tm-lead">
            Die angeforderte Seite existiert nicht oder ist nicht mehr verfügbar.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="tm-section">
        <div className="tm-container tm-center tm-stack-lg tm-prose">
          <p>
            Möglicherweise wurde der Link falsch eingegeben oder die Seite wurde
            verschoben oder entfernt.
          </p>

          <div className="tm-actions">
            <a href="/" className="tm-btn tm-btn--primary">
              Zur Startseite
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
