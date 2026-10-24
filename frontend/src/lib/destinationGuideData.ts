export interface SeasonGuide {
  months: string;
  label: string;
  description: string;
  isPeak?: boolean;
}

export interface DestinationGuideInfo {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  seasons: SeasonGuide[];
  advisoryNote?: string;
  whatToWear: string;
  thingsToDo: { title: string; desc: string }[];
  famousFor?: string[];
  weatherSummary?: string;
  attractions?: string[];
}

export const CURATED_DESTINATION_GUIDES: Record<string, DestinationGuideInfo> = {
  // ===== 1. GOLDEN TRIANGLE =====
  "golden-triangle": {
    eyebrow: "TRAVEL GUIDE",
    title: "Before you go",
    subtitle: "Simple tips so your Golden Triangle trip runs smoothly.",
    seasons: [
      {
        months: "October to March",
        label: "Winter & Peak Touring",
        description: "Cool and comfortable for sightseeing. Crisp sunny days and pleasant evenings across Delhi, Agra, and Jaipur.",
        isPeak: true,
      },
      {
        months: "April",
        label: "Spring Shoulder",
        description: "Warmer, but quieter. Ideal for budget-conscious travelers seeking fewer crowds at the Taj Mahal and Amber Fort.",
      },
      {
        months: "May to June",
        label: "Summer",
        description: "Very hot, especially in the afternoon. Best for early sunrise tours and air-conditioned heritage museum visits.",
      },
      {
        months: "July to September",
        label: "Monsoon",
        description: "Monsoon, with refreshing rain showers and humidity. Lush countryside gardens and dramatic monsoon skies.",
      },
    ],
    advisoryNote:
      "In December and January, morning fog can delay trains and flights. Delhi's air quality can also be poor from November to January. Keep a little flexibility in your plans and schedule major monument visits for late morning.",
    whatToWear:
      "Light, comfortable clothes are fine for most sightseeing, with a light layer in winter. At temples and other religious places, cover your shoulders and knees. Slip-on shoes are ideal for easy removal at sacred sites.",
    thingsToDo: [
      {
        title: "Taj Mahal at sunrise",
        desc: "for soft early light, pink-tinted marble, and noticeably thinner crowds.",
      },
      {
        title: "Old Delhi rickshaw ride",
        desc: "through the vibrant spice lanes, silver markets, and heritage alleys of Chandni Chowk.",
      },
      {
        title: "Local food",
        desc: "authentic Mughlai specialties and Parathas in Old Delhi, or a traditional royal thali in Jaipur.",
      },
      {
        title: "Jaipur shopping",
        desc: "for hand-block printed textiles, blue pottery, and certified gemstone jewellery in Johari Bazaar.",
      },
      {
        title: "Folk dance and dinner",
        desc: "for an enchanting evening of live Rajasthani folk music, puppet shows, and royal hospitality.",
      },
      {
        title: "Amber Fort exploration",
        desc: "on foot through its grand sun gate or by Jeep up to the Sheesh Mahal mirror palace.",
      },
    ],
    famousFor: [
      "Taj Mahal sunrise",
      "Mughal heritage",
      "Amber Fort",
      "Royal palaces",
      "Pink City bazaars",
      "Old Delhi street food",
    ],
    weatherSummary:
      "October to March cool and pleasant (12°C–25°C), April warm (30°C–36°C), May to June very hot (38°C–45°C), July to September humid monsoon rains.",
    attractions: [
      "Taj Mahal",
      "Agra Fort",
      "Fatehpur Sikri",
      "Red Fort",
      "Qutub Minar",
      "India Gate",
      "Humayun's Tomb",
      "Amber Fort",
      "Hawa Mahal",
      "City Palace",
      "Jal Mahal",
    ],
  },

  // ===== 2. TAJ MAHAL / AGRA =====
  "taj-mahal": {
    eyebrow: "TRAVEL GUIDE",
    title: "Before you go",
    subtitle: "Essential insider advice so your Taj Mahal & Agra visit is truly memorable.",
    seasons: [
      {
        months: "October to March",
        label: "Best Viewing Weather",
        description: "Crisp mornings, gentle sunshine, and comfortable walking temperatures around the vast marble terraces.",
        isPeak: true,
      },
      {
        months: "April",
        label: "Spring Warmth",
        description: "Warmer afternoons, shorter ticket queues, and serene evening walks through Mehtab Bagh river gardens.",
      },
      {
        months: "May to June",
        label: "Summer Heat",
        description: "High daytime temperatures. Sightseeing is strictly best planned between 6:00 AM and 9:30 AM.",
      },
      {
        months: "July to September",
        label: "Monsoon Romance",
        description: "Overcast skies enhance the glowing white Makrana marble without midday glare. Rain-washed garden paths.",
      },
    ],
    advisoryNote:
      "The Taj Mahal is closed every Friday for prayers. During peak winter (late December to January), dense morning river fog can obscure the dome until 9:00 AM; mid-morning visits offer the clearest visibility and warmest light.",
    whatToWear:
      "Dress respectfully with shoulders and knees covered for entry into the mausoleum chamber. Protective shoe covers are provided, or you may remove footwear before stepping onto the marble plinth.",
    thingsToDo: [
      {
        title: "Sunrise marble viewing",
        desc: "witnessing the white Makrana marble shift through soft shades of amber, rose, and brilliant gold.",
      },
      {
        title: "Sunset across Yamuna at Mehtab Bagh",
        desc: "for serene, crowd-free reflection photography from Emperor Babur's riverside pleasure garden.",
      },
      {
        title: "Agra Fort royal chambers",
        desc: "standing on the Musamman Burj marble balcony where Shah Jahan spent his final years gazing at the Taj Mahal.",
      },
      {
        title: "Ghost city of Fatehpur Sikri",
        desc: "exploring Emperor Akbar's UNESCO-preserved red sandstone imperial capital and Buland Darwaza.",
      },
      {
        title: "Pietra Dura artisan workshops",
        desc: "watching direct descendants of Mughal court craftsmen inlay lapis lazuli, malachite, and mother-of-pearl into marble.",
      },
      {
        title: "Agra culinary tasting",
        desc: "sampling Agra's famous melt-in-mouth Petha sweets and spiced Bedmi Puri with spicy potato curry.",
      },
    ],
    famousFor: [
      "UNESCO World Wonder",
      "Shah Jahan & Mumtaz Mahal romance",
      "Mughal imperial architecture",
      "Pietra Dura marble inlay",
      "Yamuna riverside views",
    ],
    weatherSummary:
      "October to March cool & pleasant (10°C–25°C), April warm (28°C–35°C), May to June very hot (38°C–45°C), July to September monsoon.",
    attractions: [
      "Taj Mahal",
      "Agra Fort",
      "Mehtab Bagh",
      "Fatehpur Sikri",
      "Itmad-ud-Daulah (Baby Taj)",
      "Akbar's Tomb (Sikandra)",
    ],
  },

  // ===== 3. RAJASTHAN =====
  "rajasthan": {
    eyebrow: "TRAVEL GUIDE",
    title: "Before you go",
    subtitle: "Key tips so your royal tour across Rajasthan's palaces, forts & desert dunes is effortless.",
    seasons: [
      {
        months: "October to March",
        label: "Royal Touring Season",
        description: "Pleasant daytime sun and refreshing desert breezes. Prime season for fort rampart walks and camel safaris.",
        isPeak: true,
      },
      {
        months: "April",
        label: "Shoulder Season",
        description: "Warmer weather, uncrowded palaces, and excellent promotional rates at converted heritage hotels and havelis.",
      },
      {
        months: "May to June",
        label: "Desert Summer",
        description: "Intense dry heat; ideal for indoor palace museums, luxury spa resorts, and Mount Abu hill station.",
      },
      {
        months: "July to September",
        label: "Monsoon Greens",
        description: "Monsoon revives Udaipur's royal lakes and fills the Aravalli hills with vibrant greenery and peacocks.",
      },
    ],
    advisoryNote:
      "Desert nights in Jodhpur, Bikaner, and Jaisalmer can drop below 8°C between December and January. Always carry a warm woollen layer or fleece jacket, sunscreen, and lip balm for dry desert winds.",
    whatToWear:
      "Comfortable breathable cottons or linens during daytime, sturdy closed-toe walking shoes for cobblestone fort ramps, and modest shoulder-covering attire for religious shrines and villages.",
    thingsToDo: [
      {
        title: "Amber Fort Sheesh Mahal",
        desc: "admiring the thousand mirrors that illuminate the royal hall with just a single candlelight.",
      },
      {
        title: "Lake Pichola boat cruise in Udaipur",
        desc: "sailing past white marble island palaces with the City Palace glowing against the sunset.",
      },
      {
        title: "Sam Sand Dunes camel safari",
        desc: "experiencing the golden sands of Jaisalmer followed by live Kalbelia dance around a desert campfire.",
      },
      {
        title: "Mehrangarh Fort zip-lining & ramparts",
        desc: "gliding across desert moats with panoramic views over the Blue City of Jodhpur.",
      },
      {
        title: "Heritage Haveli stay",
        desc: "living like royalty inside carefully restored Maharaja palaces and ancestral Rajput mansions.",
      },
      {
        title: "Traditional Rajasthani feast",
        desc: "savoring authentic Dal Baati Churma, Gatte ki Sabzi, and crispy Pyaz Kachoris.",
      },
    ],
    famousFor: [
      "Hilltop Rajput forts",
      "Maharaja palaces & havelis",
      "Thar Desert camel safaris",
      "Lake Pichola in Udaipur",
      "Block-print textiles & jewellery",
    ],
    weatherSummary:
      "October to March pleasant sunny days (15°C–28°C) and cool nights, April warm (30°C–38°C), May to June very hot (40°C–46°C), July to September moderate rains.",
    attractions: [
      "Amber Fort",
      "Mehrangarh Fort",
      "City Palace Udaipur",
      "Jaisalmer Golden Fort",
      "Hawa Mahal",
      "Lake Pichola",
      "Pushkar Brahma Temple",
    ],
  },

  // ===== 4. KERALA =====
  "kerala": {
    eyebrow: "TRAVEL GUIDE",
    title: "Before you go",
    subtitle: "Practical tips for your backwaters, tea gardens & tropical holiday in God's Own Country.",
    seasons: [
      {
        months: "September to March",
        label: "Backwaters & Beach Season",
        description: "Dry, sunny, and temperate. The premier window for private houseboat cruises and Munnar hill treks.",
        isPeak: true,
      },
      {
        months: "April to May",
        label: "Summer Heat",
        description: "Warm and humid tropical temperatures. Munnar and Wayanad hill stations remain delightfully cool retreats.",
      },
      {
        months: "June to August",
        label: "Monsoon Rejuvenation",
        description: "Southwest monsoon downpours. The world-renowned season for authentic Ayurvedic Panchakarma therapy.",
      },
      {
        months: "September",
        label: "Post-Monsoon Greenery",
        description: "Cascading waterfalls, vibrant Onam festival celebrations, and traditional snake boat races.",
      },
    ],
    advisoryNote:
      "Monsoon brings heavy tropical rains from June to August, but this is the globally acclaimed time for Ayurvedic therapy as moist atmospheric conditions open body pores for deeper oil absorption.",
    whatToWear:
      "Lightweight cottons, linen shirts, sun hats, and sandals. For high-altitude Munnar and Wayanad, pack a lightweight cardigan or fleece as temperatures dip to 12°C at night.",
    thingsToDo: [
      {
        title: "Overnight private houseboat cruise",
        desc: "gliding through peaceful Alleppey canals with freshly caught Karimeen fish prepared on board.",
      },
      {
        title: "Munnar tea garden walks",
        desc: "hiking through emerald rolling plantations and sampling single-estate orthodox teas.",
      },
      {
        title: "Periyar wildlife boat safari",
        desc: "spotting wild elephants, Indian bison, and exotic water birds around Thekkady's lake sanctuary.",
      },
      {
        title: "Kathakali & Kalaripayattu performance",
        desc: "watching classical dance drama make-up rituals and ancient martial arts demonstrations in Kochi.",
      },
      {
        title: "Authentic Ayurvedic massage",
        desc: "rejuvenating with classical herbal oil treatments guided by certified wellness doctors.",
      },
      {
        title: "Chinese fishing nets sunset in Fort Kochi",
        desc: "watching cantilevered fishing nets dip into the Arabian Sea amidst colonial spice warehouses.",
      },
    ],
    famousFor: [
      "Serene backwaters & houseboats",
      "Emerald Munnar tea estates",
      "Authentic Ayurvedic healing",
      "Kathakali classical dance",
      "Spice plantations of Thekkady",
    ],
    weatherSummary:
      "September to March dry & pleasant (23°C–32°C), April to May warm tropical (26°C–35°C), June to August heavy monsoon rains.",
    attractions: [
      "Alleppey Backwaters",
      "Munnar Tea Gardens",
      "Fort Kochi",
      "Periyar National Park",
      "Kovalam Beach",
      "Athirappilly Waterfalls",
    ],
  },

  // ===== 5. SOUTH INDIA =====
  "south-india": {
    eyebrow: "TRAVEL GUIDE",
    title: "Before you go",
    subtitle: "Essential guidance for exploring ancient Dravidian temples, backwaters, and royal heritage.",
    seasons: [
      {
        months: "October to March",
        label: "Temple & Coastal Season",
        description: "Pleasant coastal breezes, cool hill stations, and comfortable weather for walking large temple complexes.",
        isPeak: true,
      },
      {
        months: "April to May",
        label: "Pre-Monsoon Warmth",
        description: "Hotter coastal plains; high-altitude hill resorts like Ooty, Coorg, and Kodaikanal offer refreshing escapes.",
      },
      {
        months: "June to September",
        label: "Southwest Monsoon",
        description: "Dramatic green revival along the Western Ghats, full-flowing waterfalls, and misty plantation trails.",
      },
      {
        months: "October to November",
        label: "Retreating Monsoon",
        description: "Lush green paddy fields, cooler evening temperatures, and colorful regional harvest festivals.",
      },
    ],
    advisoryNote:
      "Most major Dravidian temples (such as Madurai Meenakshi, Tanjore Big Temple, and Rameswaram) close their inner sanctums between 12:30 PM and 4:00 PM for the deities' rest. Plan temple visits for early morning (7:00 AM–11:30 AM) or sunset (5:00 PM–8:30 PM).",
    whatToWear:
      "Modest attire covering shoulders and knees is strictly enforced at South Indian temples (dhotis, kurtas, or trousers; avoid shorts and sleeveless tops). Slip-on footwear is recommended as shoes must be deposited outside.",
    thingsToDo: [
      {
        title: "Towering Dravidian temple Gopurams",
        desc: "gazing up at thousands of hand-sculpted colorful mythological deities at Madurai Meenakshi Amman Temple.",
      },
      {
        title: "UNESCO rock-cut monuments in Mahabalipuram",
        desc: "marveling at Arjuna's Penance and the 8th-century monolithic Shore Temple bathed by sea spray.",
      },
      {
        title: "French quarter stroll in Pondicherry",
        desc: "walking past mustard-yellow colonial villas, charming cafes, and the serene Bay of Bengal promenade.",
      },
      {
        title: "Mysore Palace evening illumination",
        desc: "witnessing the royal residence dazzle under 100,000 golden incandescent bulbs on Sunday evenings.",
      },
      {
        title: "South Indian culinary trail",
        desc: "sipping freshly frothed tumbler filter coffee alongside paper-thin Ghee Roast Dosas and fluffy Idlis.",
      },
      {
        title: "Plantation stays in Coorg or Wayanad",
        desc: "waking up to the aroma of ripening coffee beans, cardamom pods, and birdsong in misty estates.",
      },
    ],
    famousFor: [
      "Millennia-old Dravidian temples",
      "UNESCO stone architecture",
      "French heritage in Pondicherry",
      "Aromatic filter coffee & spice trails",
      "Kerala backwaters & houseboats",
    ],
    weatherSummary:
      "October to March comfortable & sunny (20°C–30°C), April to May warm tropical (26°C–36°C), June to September monsoon rains.",
    attractions: [
      "Meenakshi Amman Temple",
      "Mahabalipuram Shore Temple",
      "Brihadisvara Temple Tanjore",
      "Mysore Palace",
      "Fort Kochi",
      "Alleppey Backwaters",
    ],
  },
};

/**
 * Intelligent helper that returns curated guide info for known destinations,
 * or generates dynamic, professional fallback data from state fields.
 */
export function getDestinationGuide(state: {
  title: string;
  slug: string;
  h1Title?: string;
  capital?: string;
  language?: string;
  area?: string;
  famousFor?: string;
  cities?: { id?: number; title?: string; slug?: string }[];
}): DestinationGuideInfo {
  const slugKey = state.slug?.toLowerCase().trim();
  if (CURATED_DESTINATION_GUIDES[slugKey]) {
    return CURATED_DESTINATION_GUIDES[slugKey];
  }

  const cleanName = (state.h1Title || state.title || "India")
    .replace(/\s*Tours?(\s*Packages?)?$/i, "")
    .trim();

  const famousList = state.famousFor
    ? state.famousFor
        .replace(/<[^>]*>/g, "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const cityTitles = (state.cities || [])
    .map((c) => c.title)
    .filter(Boolean) as string[];

  return {
    eyebrow: "TRAVEL GUIDE",
    title: "Before you go",
    subtitle: `Simple tips so your ${cleanName} trip runs smoothly.`,
    seasons: [
      {
        months: "October to March",
        label: "Peak Touring Season",
        description: `Cool, dry, and comfortable for exploring ${cleanName}'s historical monuments, cultural bazaars, and scenic landscapes.`,
        isPeak: true,
      },
      {
        months: "April",
        label: "Shoulder Season",
        description: `Warmer daytime weather, quieter attractions, and great value for boutique stays and heritage properties.`,
      },
      {
        months: "May to June",
        label: "Summer",
        description: `Warm to hot season; best suited for early morning sightseeing, museum tours, and hill station excursions.`,
      },
      {
        months: "July to September",
        label: "Monsoon",
        description: `Refreshing monsoon rains bringing lush landscapes, scenic waterfalls, and tranquil, crowd-free touring.`,
      },
    ],
    advisoryNote: `Plan sightseeing in ${cleanName} during morning and late afternoon hours for maximum comfort. Allow plenty of leisure time between monument visits to truly soak in local culture and culinary delights.`,
    whatToWear: `Light, comfortable cotton clothing is recommended for most daytime sightseeing, with a warmer layer for winter evenings. When visiting temples, shrines, and sacred monuments in ${cleanName}, please dress respectfully covering shoulders and knees.`,
    thingsToDo: [
      {
        title: `Explore iconic heritage landmarks`,
        desc: `with accredited local guides to uncover the architecture and royal folklore of ${cleanName}.`,
      },
      {
        title: `Authentic regional dining`,
        desc: `tasting traditional home-style dishes, street snacks, and heritage recipes unique to the region.`,
      },
      {
        title: `Artisanal craft shopping`,
        desc: `browsing local markets for authentic handmade textiles, handicrafts, and cultural keepsakes.`,
      },
      {
        title: `Cultural performances & storytelling`,
        desc: `enjoying traditional music, folk dances, and sacred evening rituals.`,
      },
    ],
    famousFor: famousList.length > 0 ? famousList : [
      `${cleanName} heritage & culture`,
      "Traditional cuisine & arts",
      "Historical landmarks",
      "Scenic touring routes",
    ],
    weatherSummary: "October to March pleasant (15°C–26°C), April warm (28°C–35°C), May to June hot, July to September monsoon.",
    attractions: cityTitles.length > 0 ? cityTitles : [cleanName],
  };
}
