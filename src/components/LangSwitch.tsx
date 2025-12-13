"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function swapLang(pathname: string, targetLang: "de" | "en") {
  const parts = pathname.split("/").filter(Boolean);

  // Erwartung: /de/... oder /en/...
  if (parts.length === 0) return `/${targetLang}`;

  if (parts[0] === "de" || parts[0] === "en") {
    parts[0] = targetLang;
    return `/${parts.join("/")}`;
  }

  // Falls jemand aus irgendeinem Grund ohne Prefix landet
  return `/${targetLang}/${parts.join("/")}`;
}

export default function LangSwitch({ lang }: { lang: "de" | "en" }) {
  const pathname = usePathname() || "/";
  const toDe = swapLang(pathname, "de");
  const toEn = swapLang(pathname, "en");

  return (
    <div className="flex items-center gap-2 text-sm">
      <Link
        href={toDe}
        className={`px-2 py-1 rounded ${
          lang === "de" ? "bg-zinc-900 text-white" : "text-zinc-600 hover:text-zinc-900"
        }`}
      >
        DE
      </Link>
      <Link
        href={toEn}
        className={`px-2 py-1 rounded ${
          lang === "en" ? "bg-zinc-900 text-white" : "text-zinc-600 hover:text-zinc-900"
        }`}
      >
        EN
      </Link>
    </div>
  );
}

