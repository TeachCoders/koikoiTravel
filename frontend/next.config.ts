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
  "/tour-packages/7-days-south-india-hill-stations-tour":
    "/tour-packages/7-days-south-india-hill-station-tour",
};

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: {
    root: __dirname,
  },
  serverExternalPackages: ["isomorphic-dompurify"],
  images: {
    qualities: [50, 70, 75, 80, 85, 90, 100],
    deviceSizes: [640, 750, 1080, 1200, 1920],
    imageSizes: [32, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
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
        source: "/travel-experiences/golden-triangle",
        destination: "/tour-packages/india/golden-triangle",
        permanent: true,
      },
      {
        source: "/travel-experiences/golden-triangle-tour-india",
        destination: "/tour-packages/india/golden-triangle",
        permanent: true,
      },
      {
        source: "/travel-experiences/taj-mahal",
        destination: "/tour-packages/india/taj-mahal",
        permanent: true,
      },
      {
        source: "/travel-experiences/adventure",
        destination: "/travel-experiences",
        permanent: true,
      },
      {
        source: "/travel-experiences/:expSlug/:stateSlug",
        destination: "/tour-packages/india/:stateSlug",
        permanent: true,
      },
      {
        source: "/tour-packages/india/tamil-nadu",
        destination: "/tour-packages/india/south-india",
        permanent: true,
      },
      {
        source: "/tour-packages/india/karnataka",
        destination: "/tour-packages/india/south-india",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/rajasthan-tours/:city",
        destination: "/tour-packages/india/rajasthan/:city",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/rajasthan-tours",
        destination: "/tour-packages/india/rajasthan",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/ladakh-tours/:city",
        destination: "/tour-packages/india/ladakh/:city",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/ladakh-tours",
        destination: "/tour-packages/india/ladakh",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/himachal-pradesh-tours/:city",
        destination: "/tour-packages/india/himachal-pradesh/:city",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/himachal-pradesh-tours",
        destination: "/tour-packages/india/himachal-pradesh",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/uttarakhand-tours/:city",
        destination: "/tour-packages/india/uttarakhand/:city",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/uttarakhand-tours",
        destination: "/tour-packages/india/uttarakhand",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/kerala-tours/:city",
        destination: "/tour-packages/india/kerala/:city",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/kerala-tours",
        destination: "/tour-packages/india/kerala",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/golden-triangle-tours/:path*",
        destination: "/tour-packages/india/golden-triangle",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/south-india-tours/:path*",
        destination: "/tour-packages/india/south-india",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/tamil-nadu-tours/:path*",
        destination: "/tour-packages/india/south-india",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/karnataka-tours/:path*",
        destination: "/tour-packages/india/south-india",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/punjab-tours/:city",
        destination: "/tour-packages/india/punjab/:city",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/punjab-tours",
        destination: "/tour-packages/india/punjab",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/jammu-and-kashmir-tours/:city",
        destination: "/tour-packages/india/jammu-and-kashmir/:city",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/jammu-and-kashmir-tours",
        destination: "/tour-packages/india/jammu-and-kashmir",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/uttar-pradesh-tours/:city",
        destination: "/tour-packages/india/uttar-pradesh/:city",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/uttar-pradesh-tours",
        destination: "/tour-packages/india/uttar-pradesh",
        permanent: true,
      },
      {
        source: "/destinations/india-tours/:path*",
        destination: "/tour-packages/india",
        permanent: true,
      },
      {
        source: "/destinations/india-tour/:path*",
        destination: "/tour-packages/india",
        permanent: true,
      },
      {
        source: "/destinations/india/:path*",
        destination: "/tour-packages/india",
        permanent: true,
      },
      {
        source: "/blog/emirates-ai-robots-easy-travel-foreign-tourists",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/&",
        destination: "/",
        permanent: true,
      },
      {
        source: "/india-tours/tour-packages/golden-triangle",
        destination: "/tour-packages/india/golden-triangle",
        permanent: true,
      },
      {
        source: "/india-tours/:path((?!.*\\.(?:webp|avif|jpg|jpeg|png|gif|svg|ico)$).*)",
        destination: "/tour-packages/india",
        permanent: true,
      },
      {
        source: "/india-tour/:path((?!.*\\.(?:webp|avif|jpg|jpeg|png|gif|svg|ico)$).*)",
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
      "hero-banners",
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
