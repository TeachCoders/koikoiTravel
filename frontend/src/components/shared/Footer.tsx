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
  { label: "Kerala Tour Packages", href: "/tour-packages/india/kerala" },
  { label: "Rajasthan Royal Heritage", href: "/tour-packages/india/rajasthan" },
  { label: "Kashmir Holiday Packages", href: "/tour-packages/india/jammu-and-kashmir" },
  { label: "Himachal Pradesh Tours", href: "/tour-packages/india/himachal-pradesh" },
  { label: "Goa Beach Escapes", href: "/tour-packages/india/goa" },
  { label: "Uttarakhand Hills & Trekking", href: "/tour-packages/india/uttarakhand" },
  { label: "Ladakh Adventure Tours", href: "/tour-packages/india/ladakh" },
  { label: "Madhya Pradesh Wildlife", href: "/tour-packages/india/madhya-pradesh" },
  { label: "Maharashtra Tours", href: "/tour-packages/india/maharashtra" },
  { label: "Golden Triangle Tours", href: "/tour-packages/india/golden-triangle" },
];

const TRAVEL_THEMES = [
  { label: "Nature & Eco Tours", href: "/travel-experiences/nature" },
  { label: "Desert Safari & Camping", href: "/travel-experiences/desert-safari" },
  { label: "Golden Triangle Tours", href: "/travel-experiences/golden-triangle" },
  { label: "Wildlife & Tiger Safari", href: "/travel-experiences/wildlife" },
  { label: "Ayurveda & Yoga Retreats", href: "/travel-experiences/ayurveda-yoga" },
  { label: "Honeymoon & Romantic", href: "/travel-experiences/honeymoon" },
  { label: "Hill Stations & Valleys", href: "/travel-experiences/hill-station" },
  { label: "Beach & Lake Vacations", href: "/travel-experiences/beach-lake" },
  { label: "Heritage & Culture Tours", href: "/travel-experiences/heritage-and-culture" },
  { label: "Spiritual & Pilgrimage", href: "/travel-experiences/spiritual" },
];

export const Footer: React.FC = () => {
  const pathname = usePathname();
  const isOfferPage = pathname?.startsWith("/offers/");

  const footerDestinations = TOP_DESTINATIONS;
  const footerThemes = TRAVEL_THEMES;

  const salesPhone = process.env.NEXT_PUBLIC_SALES_PHONE || "+918447273005";
  const salesPhoneDigits = salesPhone.replace(/[^0-9]/g, "");
  const salesPhoneDisplay = `+${salesPhoneDigits.slice(0, 2)} ${salesPhoneDigits.slice(2, 7)} ${salesPhoneDigits.slice(7)}`;

  if (isOfferPage) {
    return (
      <footer className="relative bg-[#1C1C1C] text-[#999] pt-12 pb-8 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2E8B8B]/40 to-transparent" />
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10 flex flex-col items-center justify-center text-center">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mb-8">
            <div className="flex items-center gap-3 text-white/90">
              <ShieldCheck className="w-8 h-8 text-[#2E8B8B]" />
              <span className="font-semibold text-sm tracking-wide uppercase">100% Verified Packages</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
              <CreditCard className="w-8 h-8 text-[#2E8B8B]" />
              <span className="font-semibold text-sm tracking-wide uppercase">Secure Payments</span>
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
    <footer className="relative bg-[#1C1C1C] text-[#999] pt-16 pb-24 md:pb-8 overflow-hidden">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2E8B8B]/40 to-transparent" />

      {/* Main Links */}
      <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h4 className="text-[15px] font-bold text-white tracking-[0.06em] uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-[15px]">
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-[#b0b0b0] hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[15px] font-bold text-white tracking-[0.06em] uppercase mb-5">
              Top Destinations
            </h4>
            <ul className="space-y-3 text-[15px]">
              {footerDestinations.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <Link
                    href={item.href}
                    className="text-[#b0b0b0] hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[15px] font-bold text-white tracking-[0.06em] uppercase mb-5">
              Travel Themes
            </h4>
            <ul className="space-y-3 text-[15px]">
              {footerThemes.map((item) => (
                <li key={`${item.label}-${item.href}`}>
                  <Link
                    href={item.href}
                    className="text-[#b0b0b0] hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[15px] font-bold text-white tracking-[0.06em] uppercase mb-5">
              Contact Info
            </h4>
            <div className="space-y-3.5 text-[15px]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#2E8B8B]" />
                </div>
                <span className="text-[#b0b0b0] leading-relaxed pt-0.5">
                  H12, Patparganj, India, 110091
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#2E8B8B]" />
                </div>
                <a
                  href={`tel:${salesPhone}`}
                  className="text-[#b0b0b0] hover:text-white transition-colors font-medium"
                >
                  {salesPhoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#2E8B8B]" />
                </div>
                <a
                  href="mailto:info@koikoitravel.com"
                  className="text-[#b0b0b0] hover:text-white transition-colors"
                >
                  info@koikoitravel.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-4 h-4 text-[#2E8B8B]" />
                </div>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919136739178"}?text=${encodeURIComponent("Hi KoiKoi Travel, I want to inquire about a holiday tour package.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b0b0b0] hover:text-white transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 fill-[#2E8B8B] shrink-0" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <a
                  href="https://www.facebook.com/koikoiTravel/"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-[#b0b0b0] hover:text-white transition-colors"
                >
                  Follow us on Facebook
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 fill-[#2E8B8B] shrink-0" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <a
                  href="https://www.youtube.com/@KoiKoiTravel"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="text-[#b0b0b0] hover:text-white transition-colors"
                >
                  Subscribe on YouTube
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Tour Circuits & Destinations SEO Interlinking */}
        <div className="mt-14 pt-8 border-t border-white/10 space-y-6 text-[13px]">
          <div>
            <h5 className="text-[13.5px] font-bold text-white tracking-[0.05em] uppercase mb-4">
              Popular City & Circuit Tour Packages
            </h5>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5 text-[#b0b0b0] leading-relaxed">
              <div>
                <span className="font-semibold text-white/80 block mb-1.5">Kerala Circuits:</span>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <Link href="/tour-packages/india/kerala/munnar" className="hover:text-white transition-colors">Munnar</Link> ·
                  <Link href="/tour-packages/india/kerala/alleppey" className="hover:text-white transition-colors">Alleppey Houseboat</Link> ·
                  <Link href="/tour-packages/india/kerala/kochi" className="hover:text-white transition-colors">Kochi</Link> ·
                  <Link href="/tour-packages/india/kerala/thekkady" className="hover:text-white transition-colors">Thekkady</Link> ·
                  <Link href="/tour-packages/india/kerala/kovalam" className="hover:text-white transition-colors">Kovalam Beach</Link> ·
                  <Link href="/tour-packages/india/kerala/kumarakom" className="hover:text-white transition-colors">Kumarakom</Link>
                </div>
              </div>

              <div>
                <span className="font-semibold text-white/80 block mb-1.5">Rajasthan Circuits:</span>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <Link href="/tour-packages/india/rajasthan/jaipur" className="hover:text-white transition-colors">Jaipur</Link> ·
                  <Link href="/tour-packages/india/rajasthan/udaipur" className="hover:text-white transition-colors">Udaipur</Link> ·
                  <Link href="/tour-packages/india/rajasthan/jodhpur" className="hover:text-white transition-colors">Jodhpur</Link> ·
                  <Link href="/tour-packages/india/rajasthan/jaisalmer" className="hover:text-white transition-colors">Jaisalmer Desert</Link> ·
                  <Link href="/tour-packages/india/rajasthan/pushkar" className="hover:text-white transition-colors">Pushkar</Link> ·
                  <Link href="/tour-packages/india/rajasthan/bikaner" className="hover:text-white transition-colors">Bikaner</Link> ·
                  <Link href="/tour-packages/india/rajasthan/mount-abu" className="hover:text-white transition-colors">Mount Abu</Link> ·
                  <Link href="/tour-packages/india/rajasthan/ranakpur" className="hover:text-white transition-colors">Ranakpur</Link> ·
                  <Link href="/tour-packages/india/rajasthan/neemrana" className="hover:text-white transition-colors">Neemrana</Link> ·
                  <Link href="/tour-packages/india/rajasthan/chittorgarh" className="hover:text-white transition-colors">Chittorgarh</Link> ·
                  <Link href="/tour-packages/india/rajasthan/sariska" className="hover:text-white transition-colors">Sariska</Link> ·
                  <Link href="/tour-packages/india/rajasthan/bharatpur" className="hover:text-white transition-colors">Bharatpur</Link> ·
                  <Link href="/tour-packages/india/rajasthan/mandawa" className="hover:text-white transition-colors">Mandawa</Link> ·
                  <Link href="/tour-packages/india/rajasthan/alwar" className="hover:text-white transition-colors">Alwar</Link> ·
                  <Link href="/tour-packages/india/rajasthan/bundi" className="hover:text-white transition-colors">Bundi</Link> ·
                  <Link href="/tour-packages/india/rajasthan/ajmer" className="hover:text-white transition-colors">Ajmer</Link>
                </div>
              </div>

              <div>
                <span className="font-semibold text-white/80 block mb-1.5">Himachal & Kashmir:</span>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <Link href="/tour-packages/india/himachal-pradesh/shimla" className="hover:text-white transition-colors">Shimla</Link> ·
                  <Link href="/tour-packages/india/himachal-pradesh/manali" className="hover:text-white transition-colors">Manali</Link> ·
                  <Link href="/tour-packages/india/himachal-pradesh/dharamshala" className="hover:text-white transition-colors">Dharamshala</Link> ·
                  <Link href="/tour-packages/india/himachal-pradesh/kufri" className="hover:text-white transition-colors">Kufri</Link> ·
                  <Link href="/tour-packages/india/himachal-pradesh/kasauli" className="hover:text-white transition-colors">Kasauli</Link> ·
                  <Link href="/tour-packages/india/himachal-pradesh/rohtang-pass" className="hover:text-white transition-colors">Rohtang Pass</Link> ·
                  <Link href="/tour-packages/india/himachal-pradesh/sarchu" className="hover:text-white transition-colors">Sarchu</Link> ·
                  <Link href="/tour-packages/india/jammu-and-kashmir/srinagar" className="hover:text-white transition-colors">Srinagar</Link> ·
                  <Link href="/tour-packages/india/jammu-and-kashmir/gulmarg" className="hover:text-white transition-colors">Gulmarg</Link> ·
                  <Link href="/tour-packages/india/jammu-and-kashmir/pahalgam" className="hover:text-white transition-colors">Pahalgam</Link> ·
                  <Link href="/tour-packages/india/jammu-and-kashmir/sonamarg" className="hover:text-white transition-colors">Sonamarg</Link> ·
                  <Link href="/tour-packages/india/jammu-and-kashmir/patnitop" className="hover:text-white transition-colors">Patnitop</Link>
                </div>
              </div>

              <div>
                <span className="font-semibold text-white/80 block mb-1.5">Ladakh & Adventure:</span>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <Link href="/tour-packages/india/ladakh/leh" className="hover:text-white transition-colors">Leh</Link> ·
                  <Link href="/tour-packages/india/ladakh/nubra-valley" className="hover:text-white transition-colors">Nubra Valley</Link> ·
                  <Link href="/tour-packages/india/ladakh/pangong-tso" className="hover:text-white transition-colors">Pangong Tso</Link> ·
                  <Link href="/tour-packages/india/ladakh/kargil" className="hover:text-white transition-colors">Kargil</Link> ·
                  <Link href="/tour-packages/india/ladakh/hanle" className="hover:text-white transition-colors">Hanle</Link> ·
                  <Link href="/tour-packages/india/ladakh/alchi-monastery" className="hover:text-white transition-colors">Alchi Monastery</Link> ·
                  <Link href="/tour-packages/india/ladakh/hemis-monastery" className="hover:text-white transition-colors">Hemis Monastery</Link> ·
                  <Link href="/tour-packages/india/ladakh/magnetic-hill" className="hover:text-white transition-colors">Magnetic Hill</Link>
                </div>
              </div>

              <div>
                <span className="font-semibold text-white/80 block mb-1.5">Uttarakhand & Spiritual:</span>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <Link href="/tour-packages/india/uttarakhand/rishikesh" className="hover:text-white transition-colors">Rishikesh</Link> ·
                  <Link href="/tour-packages/india/uttarakhand/nainital" className="hover:text-white transition-colors">Nainital</Link> ·
                  <Link href="/tour-packages/india/uttarakhand/mussoorie" className="hover:text-white transition-colors">Mussoorie</Link> ·
                  <Link href="/tour-packages/india/uttarakhand/auli" className="hover:text-white transition-colors">Auli Skiing</Link> ·
                  <Link href="/tour-packages/india/uttarakhand/jim-corbett-national-park" className="hover:text-white transition-colors">Jim Corbett</Link> ·
                  <Link href="/tour-packages/india/uttar-pradesh/varanasi" className="hover:text-white transition-colors">Varanasi</Link> ·
                  <Link href="/tour-packages/india/uttar-pradesh/mathura" className="hover:text-white transition-colors">Mathura</Link> ·
                  <Link href="/tour-packages/india/uttar-pradesh/lucknow" className="hover:text-white transition-colors">Lucknow</Link> ·
                  <Link href="/tour-packages/india/uttar-pradesh/agra" className="hover:text-white transition-colors">Agra</Link>
                </div>
              </div>

              <div>
                <span className="font-semibold text-white/80 block mb-1.5">Central & Western Circuits:</span>
                <div className="flex flex-wrap gap-x-2 gap-y-1">
                  <Link href="/tour-packages/india/golden-triangle" className="hover:text-white transition-colors">Golden Triangle Tour</Link> ·
                  <Link href="/tour-packages/india/maharashtra/mumbai" className="hover:text-white transition-colors">Mumbai</Link> ·
                  <Link href="/tour-packages/india/maharashtra/tadoba" className="hover:text-white transition-colors">Tadoba Safari</Link> ·
                  <Link href="/tour-packages/india/maharashtra/pench" className="hover:text-white transition-colors">Pench</Link> ·
                  <Link href="/tour-packages/india/maharashtra/nashik" className="hover:text-white transition-colors">Nashik</Link> ·
                  <Link href="/tour-packages/india/maharashtra/nagpur" className="hover:text-white transition-colors">Nagpur</Link> ·
                  <Link href="/tour-packages/india/madhya-pradesh/khajuraho" className="hover:text-white transition-colors">Khajuraho</Link> ·
                  <Link href="/tour-packages/india/madhya-pradesh/bandhavgarh" className="hover:text-white transition-colors">Bandhavgarh</Link> ·
                  <Link href="/tour-packages/india/madhya-pradesh/kanha-national-park" className="hover:text-white transition-colors">Kanha National Park</Link> ·
                  <Link href="/tour-packages/india/punjab/amritsar" className="hover:text-white transition-colors">Amritsar</Link> ·
                  <Link href="/tour-packages/india/delhi/gurugram" className="hover:text-white transition-colors">Gurugram</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6 text-[12.5px] text-[#b0b0b0]">
            <div>
              <span className="font-semibold text-white/80 block mb-1.5">Featured Tour Packages:</span>
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                <Link href="/tour-packages/3-days-delhi-agra-weekend-tour" className="hover:text-white transition-colors">3 Days Delhi Agra Weekend Tour</Link> ·
                <Link href="/tour-packages/8-days-rajasthan-wildlife-tour" className="hover:text-white transition-colors">8 Days Rajasthan Wildlife Tour</Link> ·
                <Link href="/tour-packages/8-days-kerala-hills-backwaters-beaches-tour" className="hover:text-white transition-colors">8 Days Kerala Hills Backwaters Beaches</Link> ·
                <Link href="/tour-packages/16-days-rajasthan-itinerary-with-agra-and-delhi" className="hover:text-white transition-colors">16 Days Rajasthan with Agra & Delhi</Link>
              </div>
            </div>

            <div>
              <span className="font-semibold text-white/80 block mb-1.5">Popular Travel Guides & Blogs:</span>
              <div className="flex flex-wrap gap-x-2 gap-y-1">
                <Link href="/blog/complete-honeymoon-guide-to-kashmir" className="hover:text-white transition-colors">Complete Kashmir Honeymoon Guide</Link> ·
                <Link href="/blog/top-10-places-to-visit-in-rajasthan" className="hover:text-white transition-colors">Top 10 Places in Rajasthan</Link> ·
                <Link href="/blog/golden-triangle-tour-itinerary-cost-best-time" className="hover:text-white transition-colors">Golden Triangle Guide & Cost</Link> ·
                <Link href="/blog/10-essential-travel-tips-for-first-time-visitors-to-india" className="hover:text-white transition-colors">10 Tips for First-Time India Visitors</Link> ·
                <Link href="/blog/emirates-ai-check-in-robots-2027-foreign-tourists" className="hover:text-white transition-colors">Emirates AI Check-in Robots</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-[#999]">
          <p className="relative text-[#999] hover:text-white transition-colors duration-200">
            &copy; {new Date().getFullYear()} KoiKoi Travel. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 justify-center md:justify-end">
            <Link href="/about-us" className="hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cancellation-and-refund" className="hover:text-white transition-colors">
              Cancellation & Refund
            </Link>
            <Link href="/guest-gallery" className="hover:text-white transition-colors">
              Guest Gallery
            </Link>
            <Link href="/destinations" className="hover:text-white transition-colors">
              All Destinations
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;