import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/*/opengraph-image*"],
      },
    ],
    sitemap: "https://tattoomate.de/sitemap.xml",
  };
}
