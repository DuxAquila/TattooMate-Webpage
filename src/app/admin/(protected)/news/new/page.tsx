import { requirePermissionRsc } from "@/lib/admin-permissions";
import NewsEditorClient from "../ui/NewsEditorClient";

export default async function NewsNewPage() {
  const ctx = await requirePermissionRsc("canCreateNews", "/admin/news/new");

  return (
    <div className="tm-container" style={{ paddingTop: 18 }}>
      <NewsEditorClient
        mode="new"
        canEdit={ctx.permissions.has("canEditNews")}
        canPublish={ctx.permissions.has("canPublishNews")}
        canDelete={ctx.permissions.has("canDeleteNews")}
      />
    </div>
  );
}

