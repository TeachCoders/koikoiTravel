import type { DestinationTreeCountry } from "@/components/shared/DestinationMegaMenu";

/**
 * ============================================================================
 * STATIC HEADER NAVIGATION CONFIGURATION (100% Static & Easy to Edit)
 * ============================================================================
 * Is file se koi bhi vyakti bina kisi technical complexity ke Header menu
 * ko edit kar sakta hai. Koi API call nahi hogi, instant load hoga!
 * ============================================================================
 */

export interface NavItemConfig {
  label: string;
  href: string;
  enabled?: boolean;
}

// ============================================================================
// 1. INDIA TOURS (Single-Column Clean Dropdown: Golden Triangle, Rajasthan, Kerala)
// ============================================================================
export const STATIC_INDIA_TOURS: NavItemConfig[] = [
  { label: "Golden Triangle Tours", href: "/travel-experiences/golden-triangle-tour-india", enabled: true },
  { label: "Rajasthan Tours", href: "/tour-packages/india/rajasthan", enabled: true },
  { label: "Kerala Tours", href: "/tour-packages/india/kerala", enabled: true },
];

export const getActiveIndiaTours = (): { label: string; href: string }[] =>
  STATIC_INDIA_TOURS.filter((item) => item.enabled !== false).map(({ label, href }) => ({
    label,
    href,
  }));

// ============================================================================
// 2. TRAVEL STYLES (Single-Column Clean Dropdown)
// ============================================================================
// Sequence: Golden Triangle -> Taj Mahal -> Ayurveda -> Wildlife -> Spiritual -> Hill Station -> Weekend
export const STATIC_TRAVEL_STYLES: NavItemConfig[] = [
  { label: "Golden Triangle Tours", href: "/travel-experiences/golden-triangle-tour-india", enabled: true },
  { label: "Taj Mahal Day & Short Tours", href: "/travel-experiences/taj-mahal", enabled: true },
  { label: "Ayurveda & Wellness Retreats", href: "/travel-experiences/ayurveda-yoga", enabled: true },
  { label: "Wildlife & Tiger Safaris", href: "/travel-experiences/wildlife", enabled: true },
  { label: "Spiritual & Ganges Tours", href: "/travel-experiences/spiritual", enabled: true },
  { label: "Hill Stations & Mountain Escapes", href: "/travel-experiences/hill-station", enabled: true },
  { label: "Weekend Tours in India", href: "/travel-experiences/weekend-tours-in-india", enabled: true },
  // Heritage & Culture disabled as requested:
  { label: "Heritage, Forts & Palaces", href: "/travel-experiences/heritage-and-culture", enabled: false },
];

export const getActiveTravelStyles = (): { label: string; href: string }[] =>
  STATIC_TRAVEL_STYLES.filter((item) => item.enabled !== false).map(({ label, href }) => ({
    label,
    href,
  }));

// ============================================================================
// 2. ABOUT COMPANY (Clean Dropdown)
// ============================================================================
export const STATIC_ABOUT_COMPANY: NavItemConfig[] = [
  { label: "About Us", href: "/about-us", enabled: true },
  { label: "Guest Gallery", href: "/guest-gallery", enabled: true },
  { label: "Contact Us", href: "/contact-us", enabled: true },
];

export const getActiveAboutItems = (): { label: string; href: string }[] =>
  STATIC_ABOUT_COMPANY.filter((item) => item.enabled !== false).map(({ label, href }) => ({
    label,
    href,
  }));

// ============================================================================
// 3. DESTINATIONS MEGA MENU STATIC TREE (Country -> Core Inbound Pillars)
// ============================================================================
// Core focus for Inbound Foreign Tourists:
// 1. Golden Triangle (Delhi - Agra - Jaipur)
// 2. Rajasthan (Royal Palaces, Desert & Forts)
// 3. Kerala (Backwaters, Ayurveda & Hills)
// ============================================================================
export const STATIC_DESTINATION_TREE: DestinationTreeCountry[] = [
  {
    id: 1,
    title: "India",
    slug: "india",
    href: "/tour-packages/india",
    states: [
      // 1. GOLDEN TRIANGLE (#1 Circuit for Foreign Tourists)
      {
        id: 99,
        title: "Golden Triangle",
        slug: "golden-triangle",
        href: "/tour-packages/india/golden-triangle",
        displayOrder: 1,
        cities: [
          { id: 9901, title: "Delhi", slug: "delhi", href: "/tour-packages/india/delhi" },
          { id: 9902, title: "Agra (Taj Mahal)", slug: "agra", href: "/tour-packages/india/uttar-pradesh/agra" },
          { id: 9903, title: "Jaipur (Pink City)", slug: "jaipur", href: "/tour-packages/india/rajasthan/jaipur" },
          { id: 9904, title: "Fatehpur Sikri", slug: "fatehpur-sikri", href: "/tour-packages/india/uttar-pradesh/fatehpur-sikri" },
          { id: 9905, title: "Ranthambore (Tiger Safari)", slug: "ranthambore", href: "/tour-packages/india/rajasthan" },
        ],
        experiences: [
          { id: 991, title: "Golden Triangle Tours (15 Packages)", slug: "golden-triangle-tour-india", href: "/travel-experiences/golden-triangle-tour-india", count: 15 },
          { id: 992, title: "Taj Mahal Day & Short Tours", slug: "taj-mahal", href: "/travel-experiences/taj-mahal", count: 12 },
          { id: 993, title: "Golden Triangle with Wildlife", slug: "wildlife", href: "/travel-experiences/wildlife", count: 6 },
        ],
      },

      // 2. RAJASTHAN (Top Foreign Tourist Destination)
      {
        id: 2,
        title: "Rajasthan",
        slug: "rajasthan",
        href: "/tour-packages/india/rajasthan",
        displayOrder: 2,
        cities: [
          { id: 201, title: "Jaipur", slug: "jaipur", href: "/tour-packages/india/rajasthan/jaipur" },
          { id: 202, title: "Udaipur", slug: "udaipur", href: "/tour-packages/india/rajasthan/udaipur" },
          { id: 203, title: "Jodhpur", slug: "jodhpur", href: "/tour-packages/india/rajasthan/jodhpur" },
          { id: 204, title: "Jaisalmer", slug: "jaisalmer", href: "/tour-packages/india/rajasthan/jaisalmer" },
          { id: 205, title: "Pushkar", slug: "pushkar", href: "/tour-packages/india/rajasthan/pushkar" },
          { id: 206, title: "Bikaner", slug: "bikaner", href: "/tour-packages/india/rajasthan/bikaner" },
          { id: 207, title: "Mount Abu", slug: "mount-abu", href: "/tour-packages/india/rajasthan/mount-abu" },
          { id: 208, title: "Ranakpur", slug: "ranakpur", href: "/tour-packages/india/rajasthan/ranakpur" },
          { id: 209, title: "Neemrana", slug: "neemrana", href: "/tour-packages/india/rajasthan/neemrana" },
          { id: 210, title: "Chittorgarh", slug: "chittorgarh", href: "/tour-packages/india/rajasthan/chittorgarh" },
          { id: 211, title: "Sariska", slug: "sariska", href: "/tour-packages/india/rajasthan/sariska" },
          { id: 212, title: "Bharatpur", slug: "bharatpur", href: "/tour-packages/india/rajasthan/bharatpur" },
          { id: 213, title: "Mandawa", slug: "mandawa", href: "/tour-packages/india/rajasthan/mandawa" },
          { id: 214, title: "Alwar", slug: "alwar", href: "/tour-packages/india/rajasthan/alwar" },
          { id: 215, title: "Bundi", slug: "bundi", href: "/tour-packages/india/rajasthan/bundi" },
          { id: 216, title: "Ajmer", slug: "ajmer", href: "/tour-packages/india/rajasthan/ajmer" },
        ],
        experiences: [
          { id: 2, title: "Wildlife & Safari Tours", slug: "wildlife", href: "/travel-experiences/wildlife/rajasthan", count: 3 },
          { id: 3, title: "Desert Safari & Camping", slug: "desert-safari", href: "/travel-experiences/desert-safari/rajasthan", count: 3 },
          { id: 4, title: "Nature & Fort Trails", slug: "nature", href: "/travel-experiences/nature/rajasthan", count: 3 },
        ],
      },

      // 3. KERALA
      {
        id: 1,
        title: "Kerala",
        slug: "kerala",
        href: "/tour-packages/india/kerala",
        displayOrder: 3,
        cities: [
          { id: 101, title: "Munnar", slug: "munnar", href: "/tour-packages/india/kerala/munnar" },
          { id: 102, title: "Alleppey", slug: "alleppey", href: "/tour-packages/india/kerala/alleppey" },
          { id: 103, title: "Kochi", slug: "kochi", href: "/tour-packages/india/kerala/kochi" },
          { id: 104, title: "Kovalam", slug: "kovalam", href: "/tour-packages/india/kerala/kovalam" },
          { id: 105, title: "Thekkady", slug: "thekkady", href: "/tour-packages/india/kerala/thekkady" },
          { id: 106, title: "Kumarakom", slug: "kumarakom", href: "/tour-packages/india/kerala/kumarakom" },
        ],
        experiences: [
          { id: 5, title: "Nature & Hills Holidays", slug: "nature", href: "/travel-experiences/nature/kerala", count: 4 },
          { id: 6, title: "Ayurveda & Wellness Retreats", slug: "ayurveda-yoga", href: "/travel-experiences/ayurveda-yoga/kerala", count: 3 },
          { id: 7, title: "Beach & Backwater Cruises", slug: "beach-lake", href: "/travel-experiences/beach-lake/kerala", count: 3 },
        ],
      },
    ],
  },
];
