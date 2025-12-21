"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Item = {
  id: number;
  lang: string;
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED" | "SCHEDULED" | "ARCHIVED";
  publishedAt: string | null;
  scheduledAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function NewsListClient({
  canCreate,
  canEdit,
}: {
  canCreate: boolean;
  canEdit: boolean;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [lang, setLang] = useState("");

  const queryString = useMemo(() => {
    const p = new URLSearchParams();
    if (q.trim()) p.set("q", q.trim());
    if (status) p.set("status", status);
    if (lang) p.set("lang", lang);
    return p.toString();
  }, [q, status, lang]);

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch(`/api/admin/news${queryString ? `?${queryString}` : ""}`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setItems(data.items ?? []);
    } catch (e: any) {
      setErr(e?.message ?? "Fehler beim Laden");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  return (
    <div>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Suche: Titel, Slug, Excerpt"
          className="tm-input"
          style={{ minWidth: 260 }}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)} className="tm-input">
          <option value="">Status: alle</option>
          <option value="DRAFT">DRAFT</option>
          <option value="PUBLISHED">PUBLISHED</option>
          <option value="SCHEDULED">SCHEDULED</option>
          <option value="ARCHIVED">ARCHIVED</option>
        </select>

        <select value={lang} onChange={(e) => setLang(e.target.value)} className="tm-input">
          <option value="">Sprache: alle</option>
          <option value="de">de</option>
          <option value="en">en</option>
        </select>

        <button className="tm-btn tm-btn--ghost" onClick={load} disabled={loading}>
          Neu laden
        </button>

        <div style={{ flex: 1 }} />

        {canCreate && (
          <Link className="tm-btn tm-btn--primary" href="/admin/news/new">
            Neue News
          </Link>
        )}
      </div>

      {err && (
        <div style={{ marginTop: 12, padding: 12, borderRadius: 12, border: "1px solid rgba(255,0,0,0.25)" }}>
          Fehler: {err}
        </div>
      )}

      <div style={{ marginTop: 14 }}>
        {loading ? (
          <div style={{ opacity: 0.75 }}>Lade…</div>
        ) : items.length === 0 ? (
          <div style={{ opacity: 0.75 }}>Keine Einträge.</div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {items.map((it) => (
              <div
                key={it.id}
                style={{
                  padding: 12,
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(0,0,0,0.10)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <div>
                    <div style={{ fontWeight: 800 }}>{it.title}</div>
                    <div style={{ opacity: 0.75, marginTop: 4 }}>
                      {it.lang.toUpperCase()} • {it.status} • slug: {it.slug}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    {canEdit ? (
                      <Link className="tm-btn tm-btn--ghost" href={`/admin/news/${it.id}`}>
                        Öffnen
                      </Link>
                    ) : (
                      <span style={{ opacity: 0.6 }}>Keine Edit-Rechte</span>
                    )}
                  </div>
                </div>

                <div style={{ opacity: 0.7, marginTop: 8, fontSize: 12 }}>
                  updated: {new Date(it.updatedAt).toLocaleString()}
                  {it.publishedAt ? ` • published: ${new Date(it.publishedAt).toLocaleString()}` : ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

