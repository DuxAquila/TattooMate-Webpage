import Link from "next/link";
import { notFound } from "next/navigation";
import LangSwitch from "@/components/LangSwitch";

const SUPPORTED_LANGS = ["de", "en"] as const;

export default function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!SUPPORTED_LANGS.includes(params.lang as any)) notFound();
  const lang = params.lang as (typeof SUPPORTED_LANGS)[number];

  return (
    <html lang={lang}>
      <body className="bg-white text-zinc-900">
        <div className="min-h-screen flex flex-col">
          <header className="border-b">
            <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <Link href={`/${lang}`} className="font-semibold tracking-tight">
                  TattooMate
                </Link>

                <nav className="hidden md:flex items-center gap-4 text-sm text-zinc-600">
                  <Link className="hover:text-zinc-900" href={`/${lang}`}>Home</Link>
                  <Link className="hover:text-zinc-900" href={`/${lang}/preise`}>Preise</Link>
                  <Link className="hover:text-zinc-900" href={`/${lang}/warum`}>Warum</Link>
                  <Link className="hover:text-zinc-900" href={`/${lang}/news`}>News</Link>
                </nav>
              </div>

              <LangSwitch lang={lang} />
            </div>
          </header>

          <main className="flex-1">
            <div className="mx-auto max-w-7xl px-4 py-8">{children}</div>
          </main>

          <footer className="border-t">
            <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-zinc-500">
              © {new Date().getFullYear()} TattooMate
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
