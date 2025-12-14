type Dict = Record<string, any>;

export async function getDict(lang: "de" | "en") {
  if (lang === "de") return (await import("./de.json")).default as Dict;
  return (await import("./en.json")).default as Dict;
}

function getByPath(obj: any, path: string) {
  return path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

export function t(dict: Dict, key: string): string {
  const raw = getByPath(dict, key);

  // Key nicht gefunden → Key zurückgeben (Debug-freundlich)
  if (raw == null) return key;

  // Alias: "@common.xyz"
  if (typeof raw === "string" && raw.startsWith("@")) {
    const aliasKey = raw.slice(1);
    const aliased = getByPath(dict, aliasKey);
    return typeof aliased === "string" ? aliased : aliasKey;
  }

  return typeof raw === "string" ? raw : key;
}
