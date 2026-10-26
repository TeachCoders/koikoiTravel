import type { Metadata, Viewport } from "next";
import { Poppins, Cinzel, Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppProviders } from "@/components/providers/app-provider";
import { SentryErrorBoundary } from "@/components/shared/sentry-error-boundary";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://koikoitravel.com";
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-MHMD6R9X";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-BJQ7L9MPX3";
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || "ypzjlfc358";
import JsonLd from "@/components/shared/JsonLd";
import { organizationSchema, websiteSchema, graphSchema } from "@/lib/jsonLd";
import MobileStickyActionBar from "@/components/shared/MobileStickyActionBar";
import ClientSideWidgets from "@/components/shared/ClientSideWidgets";
import DeferredAnalytics from "@/components/shared/DeferredAnalytics";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["700"],
  preload: false,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["600", "700"],
  preload: false,
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "India Tour Packages & Tailor-Made Private Tours | KoiKoi Travel",
    template: "%s | KoiKoi Travel",
  },
  description: "Discover authentic India tour packages with KoiKoi Travel. Tailor-made private holidays across Rajasthan, Kerala, Golden Triangle & South India.",
  keywords: [
    "India tour packages",
    "India tour operator",
    "Tailor-made India tours",
    "Customize tour operator India",
    "Tailor-made India holidays",
    "Customized India tours",
    "Private India tours",
    "Golden Triangle tour packages",
    "Rajasthan tour packages",
    "Kerala tour packages",
    "South India tour packages",
    "KoiKoi Travel",
  ],
  openGraph: {
    type: "website",
    siteName: "KoiKoi Travel",
    title: "India Tour Packages & Tailor-Made Private Tours | KoiKoi Travel",
    description: "Discover authentic India tour packages with KoiKoi Travel. Tailor-made private holidays across Rajasthan, Kerala, Golden Triangle & South India.",
    locale: "en_IN",
    url: SITE_URL,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "KoiKoi Travel - Tailor-Made India Tour Packages" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "India Tour Packages & Tailor-Made Private Tours | KoiKoi Travel",
    description: "Discover authentic India tour packages with KoiKoi Travel. Tailor-made private holidays across Rajasthan, Kerala, Golden Triangle & South India.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      "/favicon.ico",
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        poppins.variable,
        cinzel.variable,
        playfair.variable,
        outfit.variable,
        "font-sans"
      )}
    >
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}`,
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans text-[#1C1C1C] pb-16 md:pb-0">
        <DeferredAnalytics gaId={GA_ID} clarityId={CLARITY_ID} />
        <JsonLd data={graphSchema([organizationSchema, websiteSchema])} />
        <AppProviders>
          <SentryErrorBoundary>
            {children}
          </SentryErrorBoundary>
          <MobileStickyActionBar />
          <ClientSideWidgets />
        </AppProviders>
      </body>
    </html>
  );
}
