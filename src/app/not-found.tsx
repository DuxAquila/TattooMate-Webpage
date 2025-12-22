import Link from "next/link";

export default function NotFound() {
  return (
    <main className="tm-section">
      <div className="tm-container">
        <div className="tm-card tm-step">
          <div className="tm-badge tm-badge--long">404</div>
          <h1 className="tm-h1" style={{ marginTop: 10 }}>
            Seite nicht gefunden
          </h1>
          <p className="tm-lead" style={{ marginTop: 10 }}>
            Geh zurück zur Startseite.
          </p>

          <div style={{ marginTop: 18 }}>
            <Link href="/de" className="tm-btn tm-btn--primary">
              Zur Startseite
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

