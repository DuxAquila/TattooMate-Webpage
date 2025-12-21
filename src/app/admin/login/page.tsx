// src/app/admin/login/page.tsx
import Link from "next/link";

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ err?: string; next?: string }>;
}) {
  const sp = await searchParams;
  const err = sp.err === "1";
  const next = sp.next ?? "/admin";

  return (
    <main className="tm-container tm-section">
      <div className="tm-card" style={{ maxWidth: 520, margin: "0 auto", padding: 18 }}>
        <h1 className="tm-h2">Admin Login</h1>
        <p className="tm-muted" style={{ marginTop: 6 }}>
          Nur für die Verwaltung der Website-Inhalte (News, Anfragen).
        </p>

        {err && (
          <div className="tm-card" style={{ padding: 12, marginTop: 12 }}>
            <strong>Login fehlgeschlagen</strong>
            <div className="tm-muted" style={{ marginTop: 6 }}>
              Benutzername oder Passwort stimmt nicht.
            </div>
          </div>
        )}

        <form action="/api/admin/login" method="post" className="tm-stack" style={{ gap: 10, marginTop: 14 }}>
          <input type="hidden" name="next" value={next} />

          <label className="tm-stack" style={{ gap: 6 }}>
            <span><strong>Benutzer</strong></span>
            <input name="user" required className="tm-input" />
          </label>

          <label className="tm-stack" style={{ gap: 6 }}>
            <span><strong>Passwort</strong></span>
            <input name="pass" type="password" required className="tm-input" />
          </label>

          <button className="tm-btn tm-btn--primary" type="submit">
            Einloggen
          </button>
        </form>

        <div style={{ marginTop: 12 }}>
          <Link href="/" className="tm-btn tm-btn--ghost">
            Zurück
          </Link>
        </div>
      </div>
    </main>
  );
}
