import type { MetadataRoute } from "next";

const BASE_URL = "https://tattoomate.de";
const LANGS = ["de", "en"] as const;

const routes = [
  "",
  "/funktionen",
  "/preise",
  "/sicherheit",
  "/faq",
  "/warum",
  "/formulare",
  "/news",
  "/demo",
  "/kontakt",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of LANGS) {
    for (const route of routes) {
      entries.push({
        url: `${BASE_URL}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}
