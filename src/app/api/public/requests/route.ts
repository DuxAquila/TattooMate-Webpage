import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs"; // wichtig für SMTP

const ALLOWED_LANGS = new Set(["de", "en"]);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function cleanStr(v: unknown, max = 4000) {
  const s = (typeof v === "string" ? v : "").trim();
  if (!s) return "";
  return s.length > max ? s.slice(0, max) : s;
}

function hashIp(ip: string) {
  return crypto.createHash("sha256").update(ip).digest("hex");
}

function getClientIp(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();
  return "";
}

function parseBool(v: string | undefined) {
  if (!v) return false;
  return v === "1" || v.toLowerCase() === "true";
}

async function sendSmtpNotification(args: {
  type: "CONTACT" | "DEMO";
  lang: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  message: string;
}) {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || "0");
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = process.env.SMTP_FROM?.trim();
  const toRaw = process.env.SMTP_TO?.trim();
  const secure = parseBool(process.env.SMTP_SECURE);
  const replyTo = process.env.SMTP_REPLY_TO?.trim();

  // Wenn SMTP nicht konfiguriert ist: still skip
  if (!host || !port || !user || !pass || !from || !toRaw) return;

  // Lazy import (reduziert Startkosten)
  const nodemailer = await import("nodemailer");

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const to = toRaw.split(",").map((s) => s.trim()).filter(Boolean);

  const subject =
    args.type === "DEMO"
      ? `Demo-Anfrage (${args.lang}) – ${args.name}`
      : `Kontaktanfrage (${args.lang}) – ${args.name}`;

  const text =
    [
      `Typ: ${args.type}`,
      `Sprache: ${args.lang}`,
      `Name: ${args.name}`,
      `E-Mail: ${args.email}`,
      args.company ? `Firma: ${args.company}` : null,
      args.phone ? `Telefon: ${args.phone}` : null,
      "",
      "Nachricht:",
      args.message,
    ]
      .filter(Boolean)
      .join("\n");

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    replyTo: args.email, // praktisch: direkt antworten können
  });
}

// POST /api/public/requests
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({} as any));

    const type = cleanStr(body.type, 20).toUpperCase(); // CONTACT | DEMO
    const lang = cleanStr(body.lang, 10).toLowerCase(); // de | en

    // Honeypot (unsichtbares Feld im Frontend)
    const hp = cleanStr(body.website, 200);

    const name = cleanStr(body.name, 120);
    const email = cleanStr(body.email, 160).toLowerCase();
    const company = cleanStr(body.company, 160) || null;
    const phone = cleanStr(body.phone, 80) || null;
    const message = cleanStr(body.message, 8000);

    if (!ALLOWED_LANGS.has(lang)) {
      return NextResponse.json({ ok: false, error: "invalid_lang" }, { status: 400 });
    }

    if (type !== "CONTACT" && type !== "DEMO") {
      return NextResponse.json({ ok: false, error: "invalid_type" }, { status: 400 });
    }

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
    }

    const ip = getClientIp(req);
    const ipHash = ip ? hashIp(ip) : null;
    const userAgent = cleanStr(req.headers.get("user-agent"), 300) || null;

    // Cooldown 60s: zu schnelle Folge-Requests -> als SPAM speichern, aber ok zurückgeben
    if (ipHash) {
      const last = await prisma.inboundRequest.findFirst({
        where: { ipHash },
        orderBy: { createdAt: "desc" },
        select: { createdAt: true },
      });

      if (last) {
        const diffMs = Date.now() - new Date(last.createdAt).getTime();
        if (diffMs < 60_000) {
          await prisma.inboundRequest.create({
            data: {
              type: type === "CONTACT" ? "CONTACT" : "DEMO",
              status: "SPAM",
              lang,
              name,
              email,
              company,
              phone,
              message,
              ipHash,
              userAgent,
              adminNotes: "auto: cooldown",
            },
          });

          return NextResponse.json({ ok: true }, { status: 200 });
        }
      }
    }

    const status = hp ? "SPAM" : "NEW";
    const adminNotes = hp ? "auto: honeypot" : null;

    await prisma.inboundRequest.create({
      data: {
        type: type === "CONTACT" ? "CONTACT" : "DEMO",
        status,
        lang,
        name,
        email,
        company,
        phone,
        message,
        ipHash,
        userAgent,
        adminNotes,
      },
    });

    // SMTP nur bei echten NEW Requests
    if (status === "NEW") {
      try {
        await sendSmtpNotification({
          type: type === "CONTACT" ? "CONTACT" : "DEMO",
          lang,
          name,
          email,
          company,
          phone,
          message,
        });
      } catch {
        // absichtlich ignorieren: Lead speichern ist wichtiger als Mail
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
