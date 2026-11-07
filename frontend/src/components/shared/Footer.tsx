"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone, MapPin, ShieldCheck, CreditCard } from "lucide-react";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "All Destinations", href: "/destinations" },
  { label: "Tour Packages", href: "/tour-packages" },
  { label: "Travel Experiences", href: "/travel-experiences" },
  { label: "Guest Gallery", href: "/guest-gallery" },
  { label: "Travel Blog", href: "/blog" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

const TOP_DESTINATIONS = [
  { label: "Golden Triangle Tours", href: "/tour-packages/india/golden-triangle" },
  { label: "Rajasthan Royal Heritage", href: "/tour-packages/india/rajasthan" },
  { label: "Kerala Tour Packages", href: "/tour-packages/india/kerala" },
  { label: "Agra & Uttar Pradesh Tours", href: "/tour-packages/india/uttar-pradesh" },
  { label: "Delhi Capital City Tours", href: "/tour-packages/india/delhi" },
  { label: "Kashmir Holiday Packages", href: "/tour-packages/india/jammu-and-kashmir" },
  { label: "Himachal Pradesh Tours", href: "/tour-packages/india/himachal-pradesh" },
  { label: "Goa Beach Escapes", href: "/tour-packages/india/goa" },
  { label: "Uttarakhand Hills & Trekking", href: "/tour-packages/india/uttarakhand" },
  { label: "Ladakh Adventure Tours", href: "/tour-packages/india/ladakh" },
  { label: "Madhya Pradesh Wildlife", href: "/tour-packages/india/madhya-pradesh" },
  { label: "Maharashtra Tours", href: "/tour-packages/india/maharashtra" },
  { label: "Punjab Heritage Tours", href: "/tour-packages/india/punjab" },
];

const TRAVEL_THEMES = [
  { label: "Nature & Eco Tours", href: "/travel-experiences/nature" },
  { label: "Desert Safari & Camping", href: "/travel-experiences/desert-safari" },
  { label: "Wildlife & Tiger Safari", href: "/travel-experiences/wildlife" },
  { label: "Ayurveda & Yoga Retreats", href: "/travel-experiences/ayurveda-yoga" },
  { label: "Honeymoon & Romantic", href: "/travel-experiences/honeymoon" },
  { label: "Hill Stations & Valleys", href: "/travel-experiences/hill-station" },
  { label: "Beach & Lake Vacations", href: "/travel-experiences/beach-lake" },
  { label: "Heritage & Culture Tours", href: "/travel-experiences/heritage-and-culture" },
  { label: "Spiritual & Pilgrimage", href: "/travel-experiences/spiritual" },
];

const HEADING =
  "mb-3 text-[13px] font-bold uppercase tracking-[0.06em] text-white md:text-sm lg:mb-5 xl:text-[15px]";
const LINK = "text-[#b0b0b0] transition-colors duration-200 hover:text-white";
const ICON_BOX =
  "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] lg:h-8 lg:w-8";

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const isOfferPage = pathname?.startsWith("/offers/");

  const salesPhone = process.env.NEXT_PUBLIC_SALES_PHONE || "+918447273005";
  const salesPhoneDigits = salesPhone.replace(/[^0-9]/g, "");
  const salesPhoneDisplay = `+${salesPhoneDigits.slice(0, 2)} ${salesPhoneDigits.slice(2, 7)} ${salesPhoneDigits.slice(7)}`;

  const whatsappUrl = `https://wa.me/${
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919136739178"
  }?text=${encodeURIComponent(
    "Hi KoiKoi Travel, I want to inquire about a holiday tour package."
  )}`;

  if (isOfferPage) {
    return (
      <footer className="relative overflow-hidden bg-[#1C1C1C] pb-8 pt-12 text-[#999]">
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2E8B8B]/40 to-transparent" />
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-center px-6 text-center sm:px-8 lg:px-10">
          <div className="mb-8 flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
            <div className="flex items-center gap-3 text-white/90">
              <ShieldCheck className="h-8 w-8 text-[#2E8B8B]" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                100% Verified Packages
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <CreditCard className="h-8 w-8 text-[#2E8B8B]" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                Secure Payments
              </span>
            </div>
          </div>
          <p className="text-xs text-[#777]">
            &copy; {new Date().getFullYear()} KoiKoi Travel. All rights reserved.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative overflow-hidden bg-[#1C1C1C] pb-24 pt-10 text-[#999] md:pb-8 md:pt-12 lg:pt-16">
      {/* Subtle top accent line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2E8B8B]/40 to-transparent" />

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10">
        {/* Mobile: 2 columns | Tablet (md): 3 columns | Laptop (lg): 4 columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-7 md:grid-cols-3 md:gap-x-8 md:gap-y-8 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-10 xl:gap-10">
          {/* Quick Links */}
          <div className="order-1">
            <h4 className={HEADING}>Quick Links</h4>
            <ul className="space-y-2 text-[13px] leading-snug sm:text-sm lg:space-y-3 xl:text-[15px]">
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className={LINK}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Themes */}
          <div className="order-2 lg:order-3">
            <h4 className={HEADING}>Travel Themes</h4>
            <ul className="space-y-2 text-[13px] leading-snug sm:text-sm lg:space-y-3 xl:text-[15px]">
              {TRAVEL_THEMES.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={LINK}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Destinations
              mobile: poori chaudai (2 columns andar) | tablet: neeche poori chaudai (3 columns andar) | laptop: 1 column */}
          <div className="order-3 col-span-2 md:order-4 md:col-span-3 md:border-t md:border-white/10 md:pt-6 lg:order-2 lg:col-span-1 lg:border-t-0 lg:pt-0">
            <h4 className={HEADING}>Top Destinations</h4>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-[13px] leading-snug sm:text-sm md:grid-cols-3 md:gap-y-2.5 lg:grid-cols-1 lg:gap-y-3 xl:text-[15px]">
              {TOP_DESTINATIONS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={LINK}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="order-4 col-span-2 md:order-3 md:col-span-1 lg:order-4">
            <h4 className={HEADING}>Contact Info</h4>
            <div className="grid grid-cols-1 gap-x-6 gap-y-3 text-[13px] sm:grid-cols-2 sm:text-sm md:grid-cols-1 lg:gap-y-3.5 xl:text-[15px]">
              <div className="flex items-start gap-2.5 sm:col-span-2 md:col-span-1 lg:gap-3">
                <div className={ICON_BOX}>
                  <MapPin className="h-4 w-4 text-[#2E8B8B]" />
                </div>
                <span className="pt-0.5 leading-snug text-[#b0b0b0]">
                  H12, Patparganj, Delhi 110091
                </span>
              </div>

              <div className="flex items-center gap-2.5 lg:gap-3">
                <div className={ICON_BOX}>
                  <Phone className="h-4 w-4 text-[#2E8B8B]" />
                </div>
                <a
                  href={`tel:${salesPhone}`}
                  className={`${LINK} whitespace-nowrap font-medium`}
                >
                  {salesPhoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-2.5 lg:gap-3">
                <div className={ICON_BOX}>
                  <WhatsAppIcon className="h-4 w-4 text-[#2E8B8B]" />
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={LINK}
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div className="flex items-center gap-2.5 sm:col-span-2 md:col-span-1 lg:gap-3">
                <div className={ICON_BOX}>
                  <Mail className="h-4 w-4 text-[#2E8B8B]" />
                </div>
                <a href="mailto:info@koikoitravel.com" className={LINK}>
                  info@koikoitravel.com
                </a>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-2.5 sm:col-span-2 md:col-span-1">
                <a
                  href="https://www.facebook.com/koikoiTravel/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="Follow KoiKoi Travel on Facebook"
                  title="Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] transition-colors hover:bg-white/10"
                >
                  <svg className="h-4 w-4 shrink-0 fill-[#2E8B8B]" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@KoiKoiTravel"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="Subscribe to KoiKoi Travel on YouTube"
                  title="YouTube"
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] transition-colors hover:bg-white/10"
                >
                  <svg className="h-4 w-4 shrink-0 fill-[#2E8B8B]" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar: copyright + legal links */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-5 text-xs text-[#999] md:flex-row md:gap-4 lg:mt-10 lg:pt-6 lg:text-[13px]">
          <p>
            &copy; {new Date().getFullYear()} KoiKoi Travel. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 md:justify-end lg:gap-x-5">
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="transition-colors hover:text-white">
              Terms of Service
            </Link>
            <Link href="/cancellation-and-refund" className="transition-colors hover:text-white">
              Cancellation &amp; Refund
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;