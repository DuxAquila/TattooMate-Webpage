import { getDict, t } from "@/lib/i18n/dictionaries";

export default async function HomePage({
  params,
}: {
  params: { lang: "de" | "en" };
}) {
  const dict = await getDict(params.lang);

  return (
    <section className="py-10">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
        {t(dict, "home.title")}
      </h1>
      <p className="mt-4 text-lg text-zinc-600">
        {t(dict, "home.subtitle")}
      </p>

      <div className="mt-8 rounded-xl border bg-zinc-50 p-4 text-sm text-zinc-700">
        {t(dict, "home.note")}
      </div>
    </section>
  );
}

