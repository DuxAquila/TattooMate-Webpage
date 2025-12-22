"use client";

import { useMemo, useState } from "react";

type RequestType = "CONTACT" | "DEMO";

type Copy = {
  title: string;
  lead: string;

  nameLabel: string;
  emailLabel: string;
  companyLabel: string;
  phoneLabel: string;
  messageLabel: string;

  submit: string;
  hint: string;

  successTitle: string;
  successText: string;
  home: string;

  errorText: string;
};

type Props = {
  type: RequestType;
  lang: "de" | "en";
  copy: Copy;
};


  export default function InboundRequestForm({ type, lang, copy }: Props) {
  const FORCE_DONE =
  process.env.NODE_ENV === "development" &&
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("__done");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Honeypot (unsichtbar)
  const [website, setWebsite] = useState("");

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(FORCE_DONE);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    const n = name.trim();
    const e = email.trim();
    const m = message.trim();
    return n.length >= 2 && e.length >= 5 && m.length >= 10;
  }, [name, email, message]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setError(null);

    if (!canSubmit) {
      setError(copy.errorText);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/public/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          lang,
          name,
          email,
          company,
          phone,
          message,
          website, // Honeypot
        }),
      });

      if (!res.ok) {
        try {
          await res.text();
        } catch {}
        throw new Error("request_failed");
      }

      setDone(true);
    } catch {
      setError(copy.errorText);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="tm-card tm-step tm-success">
        <div className="tm-success__head">
          <span className="tm-success__icon" aria-hidden="true">
            ✓
          </span>

          <div>
            <h1 className="tm-success__title">{copy.successTitle}</h1>
            <p className="tm-success__text">{copy.successText}</p>
          </div>
        </div>

        <div className="tm-success__actions">
          <a href={`/${lang}`} className="tm-btn tm-btn--primary">
            {copy.home}
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="tm-card tm-step">
      <h1 className="tm-h1">{copy.title}</h1>
      <p className="tm-lead" style={{ marginTop: 10 }}>
        {copy.lead}
      </p>

      <form onSubmit={onSubmit} style={{ marginTop: 18 }}>
        {/* Honeypot: muss im UI unsichtbar sein */}
        <div style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
          <label>
            Website
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              autoComplete="off"
              tabIndex={-1}
            />
          </label>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          <label>
            <div className="tm-muted" style={{ marginBottom: 6 }}>{copy.nameLabel}</div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="tm-input"
              style={{ width: "100%" }}
            />
          </label>

          <label>
            <div className="tm-muted" style={{ marginBottom: 6 }}>{copy.emailLabel}</div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              autoComplete="email"
              className="tm-input"
              style={{ width: "100%" }}
            />
          </label>

          <label>
            <div className="tm-muted" style={{ marginBottom: 6 }}>{copy.companyLabel}</div>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              autoComplete="organization"
              className="tm-input"
              style={{ width: "100%" }}
            />
          </label>

          <label>
            <div className="tm-muted" style={{ marginBottom: 6 }}>{copy.phoneLabel}</div>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              className="tm-input"
              style={{ width: "100%" }}
            />
          </label>

          <label>
            <div className="tm-muted" style={{ marginBottom: 6 }}>{copy.messageLabel}</div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={7}
              className="tm-textarea"
              style={{ width: "100%", resize: "vertical" }}
            />
          </label>

          {error ? (
            <div className="tm-card" style={{ border: "1px solid rgba(255,59,48,.35)" }}>
              <p style={{ margin: 0 }}>{error}</p>
            </div>
          ) : null}

          <button
            type="submit"
            className="tm-btn tm-btn--primary"
            disabled={!canSubmit || loading}
            style={{ alignSelf: "flex-start" }}
          >
            {loading ? "…" : copy.submit}
          </button>

          <p className="tm-muted" style={{ margin: 0 }}>
            {copy.hint}
          </p>
        </div>
      </form>
    </div>
  );
}

