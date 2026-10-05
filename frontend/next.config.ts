import type { NextConfig } from "next";

/**
 * Tour package slugs that were renamed. Old URLs must 301 to the current slug so
 * search rankings / inbound links are not lost. Add a new entry whenever a
 * journey slug is changed in the admin panel.
 */
const SLUG_REDIRECTS: Record<string, string> = {
  "/tour-packages/9-days-rajasthan-tour-from-delhi":
    "/tour-packages/9-days-rajasthan-tour-from-delhi-to-mumbai",
  "/tour-packages/3-days-jaipur-agra-tirp-from-delhi-golden-triangle":
    "/tour-packages/3-days-jaipur-agra-trip-from-delhi-golden-triangle",
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  serverExternalPackages: ["isomorphic-dompurify"],
  images: {
    deviceSizes: [640, 750, 1080, 1200, 1920],
    imageSizes: [32, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "koikoitravel.com" },
      { protocol: "https", hostname: "api.koikoitravel.com" },
      { protocol: "https", hostname: "www.koikoitravel.com" },
      ...(process.env.NODE_ENV !== "production"
        ? [{ protocol: "http" as const, hostname: "localhost" }]
        : []),
    ],
  },
  async redirects() {
    return [
      ...Object.entries(SLUG_REDIRECTS).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      {
        source: "/india-tours/tour-packages/golden-triangle",
        destination: "/travel-experiences/golden-triangle",
        permanent: true,
      },
      {
        source: "/india-tours/:path*",
        destination: "/tour-packages/india",
        permanent: true,
      },
      {
        source: "/india-tour/:path*",
        destination: "/tour-packages/india",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.koikoitravel.com" }],
        destination: "https://koikoitravel.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    const apiOrigin = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/^https?:\/\//, "") || "api.koikoitravel.com";
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          ...(process.env.NODE_ENV === "production"
            ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]
            : []),
        ],
      },
      {
        source: "/:path*\\.(webp|avif|jpg|jpeg|png|gif|svg|ico)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/",
        headers: [
          { key: "Link", value: `<https://${apiOrigin}>; rel=preconnect` },
        ],
      },
    ];
  },
  async rewrites() {
    const backendUrl = process.env.API_BASE_URL || "http://localhost:5000";
    // Public image folders are served locally by the backend (Backend/public).
    // In production nginx serves these via the site's own domain; locally the
    // backend serves them from disk, so we proxy the same folders there.
    const cdn = backendUrl;
    const cdnFolders = [
      "content",
      "india-tour",
      "indai",
      "india",
      "spiritual",
      "wildlife",
      "taj-mahal",
      "desert-safari",
      "golden-triangle",
      "heritage-and-culture",
      "hill-station",
      "honeymoon",
      "ayurveda-yoga",
      "quotations",
      "3-days-delhit-agra-jaipur-tirp-golden-triangle",
    ];
    return [
      ...cdnFolders.map((folder) => ({
        source: `/${folder}/:path*`,
        destination: `${cdn}/${folder}/:path*`,
      })),
      {
        source: "/api/:path*",
        destination: `${backendUrl}/:path*`,
      },
      {
        source: "/quotations/:path*",
        destination: `${backendUrl}/quotations/:path*`,
      },
      {
        source: "/:path*\\.:ext(webp|jpg|jpeg|png|gif|svg|pdf|docx|doc)",
        destination: `${backendUrl}/:path*.:ext`,
      },
    ];
  },
};

export default nextConfig;
