import { requirePermissionRsc } from "@/lib/admin-permissions";
import NewsEditorClient from "../ui/NewsEditorClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NewsEditPage({ params }: Props) {
  const { id } = await params;

  const ctx = await requirePermissionRsc("canEditNews", `/admin/news/${id}`);

  const numericId = Number(id);

  return (
    <div className="tm-container" style={{ paddingTop: 18 }}>
      <NewsEditorClient
        mode="edit"
        id={Number.isFinite(numericId) ? numericId : undefined}
        canEdit={ctx.permissions.has("canEditNews")}
        canPublish={ctx.permissions.has("canPublishNews")}
        canDelete={ctx.permissions.has("canDeleteNews")}
      />
    </div>
  );
}

