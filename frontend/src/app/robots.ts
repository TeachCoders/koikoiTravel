import type { MetadataRoute } from "next";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://koikoitravel.com";

export default function robots(): MetadataRoute.Robots {
  const disallowed = [
    "/dashboard",
    "/dashboard/*",
    "/profile",
    "/profile/*",
    "/auth",
    "/auth/*",
    "/api/*",
    "/_next/static/media/*",
    "/*?search=*",
    "/*?*search_term_string*",
    "/*.woff2$",
    "/*.woff$",
    "/*.ttf$",
    "/*.eot$",
    "/favicon.ico*",
  ];
  const allowed = ["/", "/llms.txt", "/llms-full.txt"];

  return {
    rules: [
      {
        userAgent: "OAI-SearchBot",
        allow: allowed,
        disallow: disallowed,
      },
      {
        userAgent: "GPTBot",
        allow: allowed,
        disallow: disallowed,
      },
      {
        userAgent: "PerplexityBot",
        allow: allowed,
        disallow: disallowed,
      },
      {
        userAgent: "ClaudeBot",
        allow: allowed,
        disallow: disallowed,
      },
      {
        userAgent: "Google-Extended",
        allow: allowed,
        disallow: disallowed,
      },
      {
        userAgent: "*",
        allow: allowed,
        disallow: disallowed,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
