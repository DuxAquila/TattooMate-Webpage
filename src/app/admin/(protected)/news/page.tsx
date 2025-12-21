import { requirePermissionRsc } from "@/lib/admin-permissions";
import NewsListClient from "./ui/NewsListClient";

export default async function AdminNewsPage() {
  const ctx = await requirePermissionRsc("canReadNewsAdmin", "/admin/news");

  return (
    <div className="tm-container" style={{ paddingTop: 18 }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0 }}>News</h1>
          <div style={{ opacity: 0.75, marginTop: 6 }}>
            Eingeloggt als {ctx.username}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <NewsListClient
          canCreate={ctx.permissions.has("canCreateNews")}
          canEdit={ctx.permissions.has("canEditNews")}
        />
      </div>
    </div>
  );
}

