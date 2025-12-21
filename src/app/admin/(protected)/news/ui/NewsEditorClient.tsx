"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Status = "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";

type Post = {
  id?: number;
  lang: "de" | "en";
  title: string;
  slug: string;
  excerpt: string;
  content: string; // markdown
  status: Status;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 120);
}

export default function NewsEditorClient({
  mode,
  id,
  canEdit,
  canPublish,
  canDelete,
}: {
  mode: "new" | "edit";
  id?: number;
  canEdit: boolean;
  canPublish: boolean;
  canDelete: boolean;
}) {
  const [post, setPost] = useState<Post>({
    lang: "de",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    status: "DRAFT",
  });

  const [loading, setLoading] = useState(mode === "edit");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [okMsg, setOkMsg] = useState<string | null>(null);

  const canSave = useMemo(() => {
    if (mode === "new") return true; // permission wird serverseitig bereits gecheckt
    return canEdit;
  }, [mode, canEdit]);

  async function load() {
    if (mode !== "edit" || !id) return;
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const p = data.post;
      setPost({
        id: p.id,
        lang: (p.lang ?? "de") as "de" | "en",
        title: p.title ?? "",
        slug: p.slug ?? "",
        excerpt: p.excerpt ?? "",
        content: p.content ?? "",
        status: (p.status ?? "DRAFT") as Status,
      });
    } catch (e: any) {
      setErr(e?.message ?? "Fehler beim Laden");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, id]);

  async function save(nextStatus?: Status) {
    if (!canSave) return;

    setSaving(true);
    setErr(null);
    setOkMsg(null);

    try {
      const payload: any = {
        lang: post.lang,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        status: nextStatus ?? post.status,
      };

      if (!payload.slug && payload.title) payload.slug = slugify(payload.title);

      const res =
        mode === "new"
          ? await fetch(`/api/admin/news`, {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            })
          : await fetch(`/api/admin/news/${id}`, {
              method: "PUT",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error ?? `HTTP ${res.status}`);
      }

      setOkMsg("Gespeichert.");

      if (mode === "new") {
        const createdId = data?.created?.id;
        if (createdId) {
          window.location.href = `/admin/news/${createdId}`;
        }
      } else {
        // reload to reflect status/publishedAt changes
        load();
      }
    } catch (e: any) {
      setErr(e?.message ?? "Fehler beim Speichern");
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (!id || !canDelete) return;
    const yes = confirm("Wirklich löschen?");
    if (!yes) return;

    setSaving(true);
    setErr(null);
    setOkMsg(null);

    try {
      const res = await fetch(`/api/admin/news/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? `HTTP ${res.status}`);

      window.location.href = "/admin/news";
    } catch (e: any) {
      setErr(e?.message ?? "Fehler beim Löschen");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0 }}>
            {mode === "new" ? "Neue News" : `News #${id}`}
          </h1>
          <div style={{ opacity: 0.75, marginTop: 6 }}>
            Status: {post.status} • Sprache: {post.lang.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          <Link className="tm-btn tm-btn--ghost" href="/admin/news">
            Zur Liste
          </Link>

          <button className="tm-btn tm-btn--ghost" onClick={() => save()} disabled={saving || loading || !canSave}>
            Speichern
          </button>

          {canPublish ? (
            <button
              className="tm-btn tm-btn--primary"
              onClick={() => save("PUBLISHED")}
              disabled={saving || loading || !post.title.trim() || !post.content.trim()}
              title="Veröffentlichen setzt publishedAt = jetzt"
            >
              Publish
            </button>
          ) : null}

          {mode === "edit" && canDelete ? (
            <button className="tm-btn tm-btn--danger" onClick={remove} disabled={saving || loading}>
              Löschen
            </button>
          ) : null}
        </div>
      </div>

      {err && (
        <div style={{ marginTop: 12, padding: 12, borderRadius: 12, border: "1px solid rgba(255,0,0,0.25)" }}>
          Fehler: {err}
        </div>
      )}
      {okMsg && (
        <div style={{ marginTop: 12, padding: 12, borderRadius: 12, border: "1px solid rgba(0,255,0,0.18)" }}>
          {okMsg}
        </div>
      )}

      <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
        <div style={{ display: "grid", gap: 8 }}>
          <label style={{ fontWeight: 800 }}>Titel</label>
          <input
            className="tm-input"
            value={post.title}
            onChange={(e) => {
              const title = e.target.value;
              setPost((p) => ({
                ...p,
                title,
                slug: p.slug ? p.slug : slugify(title),
              }));
            }}
            placeholder="Titel der News"
            disabled={saving || loading}
          />
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          <label style={{ fontWeight: 800 }}>Slug</label>
          <input
            className="tm-input"
            value={post.slug}
            onChange={(e) => setPost((p) => ({ ...p, slug: e.target.value }))}
            placeholder="z.b. tattoo-weiterentwicklung-dezember"
            disabled={saving || loading}
          />
          <div style={{ opacity: 0.7, fontSize: 12 }}>
            Public URL: <code>/news/{post.slug || "..."}</code>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <div style={{ display: "grid", gap: 8, minWidth: 180 }}>
            <label style={{ fontWeight: 800 }}>Sprache</label>
            <select
              className="tm-input"
              value={post.lang}
              onChange={(e) => setPost((p) => ({ ...p, lang: e.target.value as any }))}
              disabled={saving || loading}
            >
              <option value="de">de</option>
              <option value="en">en</option>
            </select>
          </div>

          <div style={{ display: "grid", gap: 8, minWidth: 220 }}>
            <label style={{ fontWeight: 800 }}>Status</label>
            <select
              className="tm-input"
              value={post.status}
              onChange={(e) => setPost((p) => ({ ...p, status: e.target.value as Status }))}
              disabled={saving || loading || !canEdit}
              title={!canEdit ? "Keine Edit-Rechte" : ""}
            >
              <option value="DRAFT">DRAFT</option>
              <option value="SCHEDULED">SCHEDULED</option>
              <option value="ARCHIVED">ARCHIVED</option>
              <option value="PUBLISHED">PUBLISHED</option>
            </select>
            <div style={{ opacity: 0.7, fontSize: 12 }}>
              Publish setzt <code>publishedAt</code> auf „jetzt“ (serverseitig).
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          <label style={{ fontWeight: 800 }}>Excerpt (kurz)</label>
          <textarea
            className="tm-input"
            value={post.excerpt}
            onChange={(e) => setPost((p) => ({ ...p, excerpt: e.target.value }))}
            placeholder="Kurztext für Listenansicht"
            rows={3}
            disabled={saving || loading}
          />
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          <label style={{ fontWeight: 800 }}>
            Content (Markdown)
          </label>
          <textarea
            className="tm-input"
            value={post.content}
            onChange={(e) => setPost((p) => ({ ...p, content: e.target.value }))}
            placeholder={"# Überschrift\n\n- Bullet\n\n**Fett** etc."}
            rows={18}
            disabled={saving || loading}
          />
          <div style={{ opacity: 0.7, fontSize: 12 }}>
            Speicherung: Markdown-Text. Rendering machen wir später (Public Page).
          </div>
        </div>
      </div>
    </div>
  );
}

