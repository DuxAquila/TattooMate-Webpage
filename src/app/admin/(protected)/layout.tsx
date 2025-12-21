// src/app/admin/layout.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import { getAdminCookieName, verifyAdminSession, getAdminSessionFromHeaders } from "@/lib/admin-auth";
import "../../style/index.css";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSessionFromHeaders();
  const username = session?.sub ?? "Admin";

  return (
    <main className="tm-container tm-section">
      <div className="tm-stack" style={{ gap: 16 }}>
        <div className="tm-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <strong>Admin</strong>
            <span className="tm-muted">eingeloggt als {username}</span>
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link className="tm-btn tm-btn--ghost" href="/">
              Zur Website
            </Link>
            <form action="/api/admin/logout" method="post">
              <button type="submit" className="tm-btn tm-btn--ghost">
                Logout
              </button>
            </form>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: 16,
            alignItems: "start",
          }}
        >
          <aside className="tm-card" style={{ padding: 14 }}>
            <nav className="tm-stack" style={{ gap: 8 }}>
              <Link className="tm-btn tm-btn--ghost" href="/admin">
                Dashboard
              </Link>

              <Link className="tm-btn tm-btn--ghost" href="/admin/news">
                News & Updates
              </Link>

              <Link className="tm-btn tm-btn--ghost" href="/admin/inbox">
                Anfragen (Kontakt/Demo)
              </Link>
            </nav>

            <div className="tm-muted" style={{ marginTop: 14, fontSize: 12 }}>
              Hinweis: News & Inbox Seiten bauen wir als Nächstes.
            </div>
          </aside>

          <section className="tm-card" style={{ padding: 16 }}>
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
