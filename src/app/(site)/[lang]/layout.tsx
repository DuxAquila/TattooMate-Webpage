import { notFound } from "next/navigation";

const SUPPORTED_LANGS = ["de", "en"] as const;

export default function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!SUPPORTED_LANGS.includes(params.lang as any)) {
    notFound();
  }

  return (
    <html lang={params.lang}>
      <body className="bg-white text-zinc-900">
        <div className="min-h-screen flex flex-col">
          <header className="border-b">
            <div className="mx-auto max-w-7xl px-4 py-4 flex justify-between">
              <span className="font-semibold">TattooMate</span>
              {/* Language Switch kommt hier rein */}
            </div>
          </header>

          <main className="flex-1">
            <div className="mx-auto max-w-7xl px-4 py-8">
              {children}
            </div>
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

