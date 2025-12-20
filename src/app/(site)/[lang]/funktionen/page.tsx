// File: /src/app/(site)/[lang]/funktionen/page.tsx

import { getDict, t } from "@/lib/i18n/dictionaries";

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDict(lang as "de" | "en");

  const features = dict.home?.features?.items ?? [];
  const usecases = dict.home?.usecases?.items ?? [];

  return (
    <>
      <section className="tm-section tm-section--soft tm-section--accent-top">
        <div className="tm-container tm-center tm-stack-md">
        </div>
      </section>
    </>
  );
}
