export async function getDict(lang: "de" | "en") {
  if (lang === "de") return (await import("./de.json")).default as Record<string, string>;
  return (await import("./en.json")).default as Record<string, string>;
}

export function t(dict: Record<string, string>, key: string) {
  return dict[key] ?? key;
}

