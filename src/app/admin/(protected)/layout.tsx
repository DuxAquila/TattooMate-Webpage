// src/app/admin/layout.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import { getAdminCookieName, verifyAdminSession, getAdminSessionFromHeaders } from "@/lib/admin-auth";
import "../../style/index.css";
import { requireAdminRsc } from "@/lib/admin-permissions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSessionFromHeaders();
  const username = session?.sub ?? "Admin";
  const ctx = await requireAdminRsc("/admin");

  return (
    <main className="tm-container tm-section">
      <div className="tm-stack" style={{ gap: 16 }}>
        <div className="tm-card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <strong>Admin</strong>
            <span className="tm-muted">eingeloggt als {ctx.username}</span>
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
            {/* Nav kann abhängig von ctx.permissions gerendert werden */}
            <nav>
              {ctx.permissions.has("canReadNewsAdmin") && (
                <a href="/admin/news">News</a>
              )}
              {ctx.permissions.has("canReadInbox") && (
                <a href="/admin/inbox">Inbox</a>
              )}
              {ctx.permissions.has("canManageAdmins") && (
                <a href="/admin/users">Admins</a>
              )}
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
