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
// 1. TRAVEL STYLES (Single-Column Clean Dropdown)
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
// 3. DESTINATIONS MEGA MENU STATIC TREE (Country -> Popular States -> Iconic Cities + Themes)
// ============================================================================
export const STATIC_DESTINATION_TREE: DestinationTreeCountry[] = [
  {
    id: 1,
    title: "India",
    slug: "india",
    href: "/tour-packages/india",
    states: [
      // 1. RAJASTHAN (Top Foreign Tourist Destination)
      {
        id: 2,
        title: "Rajasthan",
        slug: "rajasthan",
        href: "/tour-packages/india/rajasthan",
        displayOrder: 1,
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

      // 2. KERALA
      {
        id: 1,
        title: "Kerala",
        slug: "kerala",
        href: "/tour-packages/india/kerala",
        displayOrder: 2,
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

      // 3. UTTAR PRADESH
      {
        id: 7,
        title: "Uttar Pradesh",
        slug: "uttar-pradesh",
        href: "/tour-packages/india/uttar-pradesh",
        displayOrder: 3,
        cities: [
          { id: 701, title: "Agra", slug: "agra", href: "/tour-packages/india/uttar-pradesh/agra" },
          { id: 702, title: "Varanasi", slug: "varanasi", href: "/tour-packages/india/uttar-pradesh/varanasi" },
          { id: 703, title: "Lucknow", slug: "lucknow", href: "/tour-packages/india/uttar-pradesh/lucknow" },
          { id: 704, title: "Mathura", slug: "mathura", href: "/tour-packages/india/uttar-pradesh/mathura" },
        ],
        experiences: [
          { id: 8, title: "Taj Mahal & Monument Tours", slug: "taj-mahal", href: "/travel-experiences/taj-mahal", count: 12 },
          { id: 9, title: "Spiritual & Ganges Itineraries", slug: "spiritual", href: "/travel-experiences/spiritual", count: 3 },
        ],
      },

      // 4. DELHI
      {
        id: 12,
        title: "Delhi",
        slug: "delhi",
        href: "/tour-packages/india/delhi",
        displayOrder: 4,
        cities: [
          { id: 1202, title: "New Delhi", slug: "new-delhi", href: "/tour-packages/india/delhi/new-delhi" },
          { id: 1201, title: "Gurugram", slug: "gurugram", href: "/tour-packages/india/delhi/gurugram" },
        ],
      },

      // 5. JAMMU & KASHMIR
      {
        id: 3,
        title: "Jammu And Kashmir",
        slug: "jammu-and-kashmir",
        href: "/tour-packages/india/jammu-and-kashmir",
        displayOrder: 5,
        cities: [
          { id: 301, title: "Srinagar", slug: "srinagar", href: "/tour-packages/india/jammu-and-kashmir/srinagar" },
          { id: 302, title: "Gulmarg", slug: "gulmarg", href: "/tour-packages/india/jammu-and-kashmir/gulmarg" },
          { id: 303, title: "Pahalgam", slug: "pahalgam", href: "/tour-packages/india/jammu-and-kashmir/pahalgam" },
          { id: 304, title: "Sonamarg", slug: "sonamarg", href: "/tour-packages/india/jammu-and-kashmir/sonamarg" },
          { id: 305, title: "Patnitop", slug: "patnitop", href: "/tour-packages/india/jammu-and-kashmir/patnitop" },
        ],
      },

      // 6. LADAKH
      {
        id: 5,
        title: "Ladakh",
        slug: "ladakh",
        href: "/tour-packages/india/ladakh",
        displayOrder: 6,
        cities: [
          { id: 501, title: "Leh", slug: "leh", href: "/tour-packages/india/ladakh/leh" },
          { id: 502, title: "Nubra Valley", slug: "nubra-valley", href: "/tour-packages/india/ladakh/nubra-valley" },
          { id: 503, title: "Pangong Tso", slug: "pangong-tso", href: "/tour-packages/india/ladakh/pangong-tso" },
          { id: 504, title: "Kargil", slug: "kargil", href: "/tour-packages/india/ladakh/kargil" },
          { id: 505, title: "Hanle", slug: "hanle", href: "/tour-packages/india/ladakh/hanle" },
          { id: 506, title: "Alchi Monastery", slug: "alchi-monastery", href: "/tour-packages/india/ladakh/alchi-monastery" },
          { id: 507, title: "Hemis Monastery", slug: "hemis-monastery", href: "/tour-packages/india/ladakh/hemis-monastery" },
          { id: 508, title: "Magnetic Hill", slug: "magnetic-hill", href: "/tour-packages/india/ladakh/magnetic-hill" },
        ],
      },

      // 7. HIMACHAL PRADESH
      {
        id: 4,
        title: "Himachal Pradesh",
        slug: "himachal-pradesh",
        href: "/tour-packages/india/himachal-pradesh",
        displayOrder: 7,
        cities: [
          { id: 401, title: "Shimla", slug: "shimla", href: "/tour-packages/india/himachal-pradesh/shimla" },
          { id: 402, title: "Manali", slug: "manali", href: "/tour-packages/india/himachal-pradesh/manali" },
          { id: 403, title: "Dharamshala", slug: "dharamshala", href: "/tour-packages/india/himachal-pradesh/dharamshala" },
          { id: 404, title: "Kufri", slug: "kufri", href: "/tour-packages/india/himachal-pradesh/kufri" },
          { id: 405, title: "Kasauli", slug: "kasauli", href: "/tour-packages/india/himachal-pradesh/kasauli" },
          { id: 406, title: "Rohtang Pass", slug: "rohtang-pass", href: "/tour-packages/india/himachal-pradesh/rohtang-pass" },
          { id: 407, title: "Sarchu", slug: "sarchu", href: "/tour-packages/india/himachal-pradesh/sarchu" },
        ],
      },

      // 8. UTTARAKHAND
      {
        id: 6,
        title: "Uttarakhand",
        slug: "uttarakhand",
        href: "/tour-packages/india/uttarakhand",
        displayOrder: 8,
        cities: [
          { id: 601, title: "Rishikesh", slug: "rishikesh", href: "/tour-packages/india/uttarakhand/rishikesh" },
          { id: 602, title: "Nainital", slug: "nainital", href: "/tour-packages/india/uttarakhand/nainital" },
          { id: 603, title: "Mussoorie", slug: "mussoorie", href: "/tour-packages/india/uttarakhand/mussoorie" },
          { id: 604, title: "Auli", slug: "auli", href: "/tour-packages/india/uttarakhand/auli" },
          { id: 605, title: "Jim Corbett National Park", slug: "jim-corbett-national-park", href: "/tour-packages/india/uttarakhand/jim-corbett-national-park" },
        ],
      },

      // 9. GOA
      {
        id: 8,
        title: "Goa",
        slug: "goa",
        href: "/tour-packages/india/goa",
        displayOrder: 9,
        cities: [
          { id: 801, title: "North Goa", slug: "north-goa", href: "/tour-packages/india/goa/north-goa" },
          { id: 802, title: "South Goa", slug: "south-goa", href: "/tour-packages/india/goa/south-goa" },
        ],
      },

      // 10. MADHYA PRADESH
      {
        id: 9,
        title: "Madhya Pradesh",
        slug: "madhya-pradesh",
        href: "/tour-packages/india/madhya-pradesh",
        displayOrder: 10,
        cities: [
          { id: 901, title: "Khajuraho", slug: "khajuraho", href: "/tour-packages/india/madhya-pradesh/khajuraho" },
          { id: 902, title: "Bandhavgarh", slug: "bandhavgarh", href: "/tour-packages/india/madhya-pradesh/bandhavgarh" },
          { id: 903, title: "Kanha National Park", slug: "kanha-national-park", href: "/tour-packages/india/madhya-pradesh/kanha-national-park" },
        ],
      },

      // 11. MAHARASHTRA
      {
        id: 10,
        title: "Maharashtra",
        slug: "maharashtra",
        href: "/tour-packages/india/maharashtra",
        displayOrder: 11,
        cities: [
          { id: 1001, title: "Mumbai", slug: "mumbai", href: "/tour-packages/india/maharashtra/mumbai" },
          { id: 1002, title: "Tadoba", slug: "tadoba", href: "/tour-packages/india/maharashtra/tadoba" },
          { id: 1003, title: "Pench", slug: "pench", href: "/tour-packages/india/maharashtra/pench" },
          { id: 1004, title: "Nashik", slug: "nashik", href: "/tour-packages/india/maharashtra/nashik" },
          { id: 1005, title: "Nagpur", slug: "nagpur", href: "/tour-packages/india/maharashtra/nagpur" },
        ],
      },

      // 12. PUNJAB
      {
        id: 11,
        title: "Punjab",
        slug: "punjab",
        href: "/tour-packages/india/punjab",
        displayOrder: 12,
        cities: [
          { id: 1101, title: "Amritsar", slug: "amritsar", href: "/tour-packages/india/punjab/amritsar" },
        ],
      },
    ],
  },
];
