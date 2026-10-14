export interface AutoLinkRule {
  term: string;
  href: string;
}

const KEYWORD_LINKS: { terms: string[]; href: string }[] = [
  // Core Travel Experiences
  {
    terms: ["Golden Triangle Tour", "Golden Triangle Tours", "Golden Triangle Itinerary", "Golden Triangle"],
    href: "/travel-experiences/golden-triangle",
  },
  {
    terms: ["Taj Mahal Tour", "Taj Mahal Tours", "Taj Mahal"],
    href: "/travel-experiences/taj-mahal",
  },
  {
    terms: ["Honeymoon Packages", "Honeymoon Tour", "Honeymoon Tours", "Honeymoon"],
    href: "/travel-experiences/honeymoon",
  },
  {
    terms: ["Heritage & Culture", "Heritage Tours", "Heritage Tour", "Cultural Heritage", "Heritage"],
    href: "/travel-experiences/heritage-and-culture",
  },
  {
    terms: ["Ayurveda & Yoga", "Ayurveda Retreat", "Yoga Retreat", "Ayurveda", "Yoga Tour"],
    href: "/travel-experiences/ayurveda-yoga",
  },
  {
    terms: ["Wildlife Safari", "Wildlife Tours", "Wildlife Tour", "Jungle Safari", "Tiger Safari", "Wildlife"],
    href: "/travel-experiences/wildlife",
  },
  {
    terms: ["Desert Safari", "Camel Safari", "Sam Sand Dunes", "Thar Desert"],
    href: "/travel-experiences/desert-safari",
  },
  {
    terms: ["Spiritual Tours", "Spiritual Tour", "Pilgrimage Tour", "Pilgrimage Tours", "Spiritual"],
    href: "/travel-experiences/spiritual",
  },
  {
    terms: ["Hill Station Tours", "Hill Station Tour", "Hill Stations", "Hill Station"],
    href: "/travel-experiences/hill-station",
  },
  {
    terms: ["Weekend Tours in India", "Weekend Tours", "Weekend Getaway", "Weekend Getaways"],
    href: "/travel-experiences/weekend-tours-in-india",
  },
  {
    terms: ["Family Tour Packages", "Family Holiday Packages", "Family Tour", "Family Vacations"],
    href: "/travel-experiences/family",
  },
  {
    terms: ["Beach Holidays", "Beach Holiday", "Beach & Lake", "Beach Tour"],
    href: "/travel-experiences/beach-lake",
  },
  {
    terms: ["Nature & Eco Tours", "Nature Tour", "Nature Tours", "Nature"],
    href: "/travel-experiences/nature",
  },

  // States from Database
  {
    terms: ["Kerala Tour Packages", "Kerala Holiday Packages", "Kerala Tours", "Kerala"],
    href: "/tour-packages/india/kerala",
  },
  {
    terms: ["Rajasthan Tour Packages", "Rajasthan Tours", "Rajasthan Heritage", "Rajasthan"],
    href: "/tour-packages/india/rajasthan",
  },
  {
    terms: ["Himachal Pradesh Tour Packages", "Himachal Pradesh Tours", "Himachal Pradesh", "Himachal"],
    href: "/tour-packages/india/himachal-pradesh",
  },
  {
    terms: ["Kashmir Tour Packages", "Kashmir Holiday Packages", "Jammu and Kashmir", "Jammu & Kashmir", "Kashmir"],
    href: "/tour-packages/india/jammu-and-kashmir",
  },
  {
    terms: ["Ladakh Tour Packages", "Ladakh Bike Trip", "Ladakh"],
    href: "/tour-packages/india/ladakh",
  },
  {
    terms: ["Uttarakhand Tour Packages", "Uttarakhand Tours", "Uttarakhand"],
    href: "/tour-packages/india/uttarakhand",
  },
  {
    terms: ["Uttar Pradesh Tour Packages", "Uttar Pradesh Tours", "Uttar Pradesh"],
    href: "/tour-packages/india/uttar-pradesh",
  },
  {
    terms: ["Goa Tour Packages", "Goa Beach Packages", "Goa Tours", "Goa Holiday", "Goa"],
    href: "/tour-packages/india/goa",
  },
  {
    terms: ["Madhya Pradesh Tour Packages", "Madhya Pradesh Tours", "Madhya Pradesh"],
    href: "/tour-packages/india/madhya-pradesh",
  },
  {
    terms: ["Maharashtra Tour Packages", "Maharashtra Tours", "Maharashtra"],
    href: "/tour-packages/india/maharashtra",
  },
  {
    terms: ["Karnataka Tour Packages", "Karnataka Tours", "Karnataka"],
    href: "/tour-packages/india/karnataka",
  },
  {
    terms: ["Tamil Nadu Tour Packages", "Tamil Nadu Tours", "Tamil Nadu"],
    href: "/tour-packages/india/tamil-nadu",
  },
  {
    terms: ["Punjab Tour Packages", "Punjab Tours", "Punjab"],
    href: "/tour-packages/india/punjab",
  },
  {
    terms: ["Delhi NCR", "Delhi Tour Packages", "New Delhi"],
    href: "/tour-packages/india/delhi",
  },
  {
    terms: ["Chandigarh"],
    href: "/tour-packages/india/chandigarh",
  },

  // Prominent Tourist Destinations & Cities (All DB places)
  // Kerala
  { terms: ["Munnar"], href: "/tour-packages/india/kerala/munnar" },
  { terms: ["Alleppey Houseboat", "Alleppey", "Alappuzha"], href: "/tour-packages/india/kerala/alleppey" },
  { terms: ["Fort Kochi", "Kochi", "Cochin"], href: "/tour-packages/india/kerala/cochin" },
  { terms: ["Thekkady"], href: "/tour-packages/india/kerala/thekkady" },
  { terms: ["Periyar National Park", "Periyar"], href: "/tour-packages/india/kerala/periyar" },
  { terms: ["Kovalam Beach", "Kovalam"], href: "/tour-packages/india/kerala/kovalam" },
  { terms: ["Kumarakom"], href: "/tour-packages/india/kerala/kumarakom" },
  { terms: ["Wayanad"], href: "/tour-packages/india/kerala/wayanad" },
  { terms: ["Bekal"], href: "/tour-packages/india/kerala/bekal" },
  { terms: ["Calicut", "Kozhikode"], href: "/tour-packages/india/kerala/calicut" },
  { terms: ["Kannur"], href: "/tour-packages/india/kerala/kannur" },
  { terms: ["Trivandrum", "Thiruvananthapuram"], href: "/tour-packages/india/kerala/trivandrum" },

  // Tamil Nadu
  { terms: ["Chennai"], href: "/tour-packages/india/tamil-nadu/chennai" },
  { terms: ["Coonoor"], href: "/tour-packages/india/tamil-nadu/coonoor" },
  { terms: ["Kanchipuram"], href: "/tour-packages/india/tamil-nadu/kanchipuram" },
  { terms: ["Kodaikanal"], href: "/tour-packages/india/tamil-nadu/kodaikanal" },
  { terms: ["Madurai Meenakshi Temple", "Madurai"], href: "/tour-packages/india/tamil-nadu/madurai" },
  { terms: ["Mahabalipuram"], href: "/tour-packages/india/tamil-nadu/mahabalipuram" },
  { terms: ["Ooty"], href: "/tour-packages/india/tamil-nadu/ooty" },
  { terms: ["Pondicherry", "Puducherry"], href: "/tour-packages/india/tamil-nadu/pondicherry" },
  { terms: ["Rameshwaram"], href: "/tour-packages/india/tamil-nadu/rameshwaram" },
  { terms: ["Thanjavur", "Tanjore"], href: "/tour-packages/india/tamil-nadu/tanjore" },
  { terms: ["Trichy"], href: "/tour-packages/india/tamil-nadu/trichy" },

  // Karnataka
  { terms: ["Badami"], href: "/tour-packages/india/karnataka/badami" },
  { terms: ["Bandipur National Park", "Bandipur"], href: "/tour-packages/india/karnataka/bandipur" },
  { terms: ["Bangalore", "Bengaluru"], href: "/tour-packages/india/karnataka/bangalore" },
  { terms: ["Coorg"], href: "/tour-packages/india/karnataka/coorg" },
  { terms: ["Hampi"], href: "/tour-packages/india/karnataka/hampi" },
  { terms: ["Hassan"], href: "/tour-packages/india/karnataka/hassan" },
  { terms: ["Hospet"], href: "/tour-packages/india/karnataka/hospet" },
  { terms: ["Hubli"], href: "/tour-packages/india/karnataka/hubli" },
  { terms: ["Mysore Palace", "Mysuru", "Mysore"], href: "/tour-packages/india/karnataka/mysore" },
  { terms: ["Nagarhole National Park", "Nagarhole"], href: "/tour-packages/india/karnataka/nagarhole" },

  // Punjab
  { terms: ["Golden Temple", "Amritsar"], href: "/tour-packages/india/punjab/amritsar" },
  { terms: ["Anandpur Sahib"], href: "/tour-packages/india/punjab/anandpur-sahib" },
  { terms: ["Bathinda"], href: "/tour-packages/india/punjab/bathinda" },
  { terms: ["Firozpur"], href: "/tour-packages/india/punjab/firozpur" },
  { terms: ["Jalandhar"], href: "/tour-packages/india/punjab/jalandhar" },
  { terms: ["Kapurthala"], href: "/tour-packages/india/punjab/kapurthala" },
  { terms: ["Ludhiana"], href: "/tour-packages/india/punjab/ludhiana" },
  { terms: ["Pathankot"], href: "/tour-packages/india/punjab/pathankot" },
  { terms: ["Patiala"], href: "/tour-packages/india/punjab/patiala" },

  // Rajasthan
  { terms: ["Jaipur Pink City", "Jaipur"], href: "/tour-packages/india/rajasthan/jaipur" },
  { terms: ["Udaipur City of Lakes", "Udaipur"], href: "/tour-packages/india/rajasthan/udaipur" },
  { terms: ["Jodhpur Blue City", "Jodhpur"], href: "/tour-packages/india/rajasthan/jodhpur" },
  { terms: ["Jaisalmer Golden City", "Jaisalmer"], href: "/tour-packages/india/rajasthan/jaisalmer" },
  { terms: ["Pushkar"], href: "/tour-packages/india/rajasthan/pushkar" },
  { terms: ["Bikaner"], href: "/tour-packages/india/rajasthan/bikaner" },
  { terms: ["Mount Abu"], href: "/tour-packages/india/rajasthan/mount-abu" },
  { terms: ["Ranthambore National Park", "Ranthambore"], href: "/tour-packages/india/rajasthan/ranthambore" },
  { terms: ["Chittorgarh Fort", "Chittorgarh"], href: "/tour-packages/india/rajasthan/chittorgarh" },
  { terms: ["Ranakpur Jain Temple", "Ranakpur"], href: "/tour-packages/india/rajasthan/ranakpur" },
  { terms: ["Neemrana Fort", "Neemrana"], href: "/tour-packages/india/rajasthan/neemrana" },
  { terms: ["Bharatpur Bird Sanctuary", "Bharatpur"], href: "/tour-packages/india/rajasthan/bharatpur" },
  { terms: ["Mandawa", "Shekhawati"], href: "/tour-packages/india/rajasthan/mandawa" },
  { terms: ["Sariska Tiger Reserve", "Sariska"], href: "/tour-packages/india/rajasthan/sariska" },
  { terms: ["Ajmer Sharif", "Ajmer"], href: "/tour-packages/india/rajasthan/ajmer" },
  { terms: ["Bundi"], href: "/tour-packages/india/rajasthan/bundi" },
  { terms: ["Kota"], href: "/tour-packages/india/rajasthan/kota" },
  { terms: ["Alwar"], href: "/tour-packages/india/rajasthan/alwar" },

  // Uttar Pradesh & Golden Triangle
  { terms: ["Agra"], href: "/tour-packages/india/uttar-pradesh/agra" },
  { terms: ["Fatehpur Sikri"], href: "/tour-packages/india/uttar-pradesh/fatehpur-sikri" },
  { terms: ["Varanasi Ghats", "Kashi", "Varanasi"], href: "/tour-packages/india/uttar-pradesh/varanasi" },
  { terms: ["Mathura"], href: "/tour-packages/india/uttar-pradesh/mathura" },
  { terms: ["Vrindavan"], href: "/tour-packages/india/uttar-pradesh/vrindavan" },
  { terms: ["Ayodhya Ram Mandir", "Ayodhya"], href: "/tour-packages/india/uttar-pradesh/ayodhya" },
  { terms: ["Lucknow"], href: "/tour-packages/india/uttar-pradesh/lucknow" },
  { terms: ["Prayagraj", "Allahabad"], href: "/tour-packages/india/uttar-pradesh/prayagraj" },
  { terms: ["Sarnath"], href: "/tour-packages/india/uttar-pradesh/sarnath" },
  { terms: ["Jhansi"], href: "/tour-packages/india/uttar-pradesh/jhansi" },
  { terms: ["Chitrakoot"], href: "/tour-packages/india/uttar-pradesh/chitrakoot" },
  { terms: ["Kushinagar"], href: "/tour-packages/india/uttar-pradesh/kushinagar" },
  { terms: ["Dudhwa National Park", "Dudhwa"], href: "/tour-packages/india/uttar-pradesh/dudhwa-national-park" },

  // Uttarakhand
  { terms: ["Rishikesh"], href: "/tour-packages/india/uttarakhand/rishikesh" },
  { terms: ["Haridwar"], href: "/tour-packages/india/uttarakhand/haridwar" },
  { terms: ["Jim Corbett National Park", "Jim Corbett"], href: "/tour-packages/india/uttarakhand/jim-corbett-national-park" },
  { terms: ["Nainital"], href: "/tour-packages/india/uttarakhand/nainital" },
  { terms: ["Mussoorie"], href: "/tour-packages/india/uttarakhand/mussoorie" },
  { terms: ["Auli Skiing", "Auli"], href: "/tour-packages/india/uttarakhand/auli" },
  { terms: ["Kedarnath Temple", "Kedarnath"], href: "/tour-packages/india/uttarakhand/kedarnath" },
  { terms: ["Badrinath Temple", "Badrinath"], href: "/tour-packages/india/uttarakhand/badrinath" },
  { terms: ["Almora"], href: "/tour-packages/india/uttarakhand/almora" },
  { terms: ["Kausani"], href: "/tour-packages/india/uttarakhand/kausani" },
  { terms: ["Ranikhet"], href: "/tour-packages/india/uttarakhand/ranikhet" },
  { terms: ["Chopta"], href: "/tour-packages/india/uttarakhand/chopta" },
  { terms: ["Valley Of Flowers National Park", "Valley Of Flowers"], href: "/tour-packages/india/uttarakhand/valley-of-flowers-national-park" },
  { terms: ["Hemkund Sahib"], href: "/tour-packages/india/uttarakhand/hemkund-sahib" },
  { terms: ["Munsiyari"], href: "/tour-packages/india/uttarakhand/munsiyari" },

  // Himachal Pradesh
  { terms: ["Shimla"], href: "/tour-packages/india/himachal-pradesh/shimla" },
  { terms: ["Manali"], href: "/tour-packages/india/himachal-pradesh/manali" },
  { terms: ["Dharamshala", "Dharamsala"], href: "/tour-packages/india/himachal-pradesh/dharamshala" },
  { terms: ["Dalhousie"], href: "/tour-packages/india/himachal-pradesh/dalhousie" },
  { terms: ["Spiti Valley", "Spiti"], href: "/tour-packages/india/himachal-pradesh/spiti-valley" },
  { terms: ["Kasol"], href: "/tour-packages/india/himachal-pradesh/kasol" },
  { terms: ["Kufri"], href: "/tour-packages/india/himachal-pradesh/kufri" },
  { terms: ["Kasauli"], href: "/tour-packages/india/himachal-pradesh/kasauli" },
  { terms: ["Kullu Valley", "Kullu"], href: "/tour-packages/india/himachal-pradesh/kullu" },
  { terms: ["Rohtang Pass"], href: "/tour-packages/india/himachal-pradesh/rohtang-pass" },
  { terms: ["Mcleod Ganj", "McLeodganj"], href: "/tour-packages/india/himachal-pradesh/mcleod-ganj" },
  { terms: ["Bir Billing"], href: "/tour-packages/india/himachal-pradesh/bir-billing" },
  { terms: ["Kinnaur"], href: "/tour-packages/india/himachal-pradesh/kinnaur" },
  { terms: ["Tirthan Valley"], href: "/tour-packages/india/himachal-pradesh/tirthan-valley" },
  { terms: ["Chamba"], href: "/tour-packages/india/himachal-pradesh/chamba" },
  { terms: ["Palampur"], href: "/tour-packages/india/himachal-pradesh/palampur" },
  { terms: ["Jispa"], href: "/tour-packages/india/himachal-pradesh/jispa" },
  { terms: ["Sarchu"], href: "/tour-packages/india/himachal-pradesh/sarchu" },

  // Jammu And Kashmir
  { terms: ["Srinagar"], href: "/tour-packages/india/jammu-and-kashmir/srinagar" },
  { terms: ["Gulmarg"], href: "/tour-packages/india/jammu-and-kashmir/gulmarg" },
  { terms: ["Pahalgam"], href: "/tour-packages/india/jammu-and-kashmir/pahalgam" },
  { terms: ["Sonamarg", "Sonmarg"], href: "/tour-packages/india/jammu-and-kashmir/sonamarg" },
  { terms: ["Patnitop"], href: "/tour-packages/india/jammu-and-kashmir/patnitop" },
  { terms: ["Katra", "Vaishno Devi"], href: "/tour-packages/india/jammu-and-kashmir/katra" },
  { terms: ["Jammu"], href: "/tour-packages/india/jammu-and-kashmir/jammu" },
  { terms: ["Doodhpathri"], href: "/tour-packages/india/jammu-and-kashmir/doodhpathri" },
  { terms: ["Yusmarg"], href: "/tour-packages/india/jammu-and-kashmir/yusmarg" },
  { terms: ["Aru Valley"], href: "/tour-packages/india/jammu-and-kashmir/aru-valley" },
  { terms: ["Aharbal Waterfall"], href: "/tour-packages/india/jammu-and-kashmir/aharbal-waterfall" },
  { terms: ["Doda"], href: "/tour-packages/india/jammu-and-kashmir/doda" },

  // Ladakh
  { terms: ["Leh Ladakh", "Leh"], href: "/tour-packages/india/ladakh/leh" },
  { terms: ["Nubra Valley"], href: "/tour-packages/india/ladakh/nubra-valley" },
  { terms: ["Pangong Tso", "Pangong Lake"], href: "/tour-packages/india/ladakh/pangong-tso" },
  { terms: ["Kargil"], href: "/tour-packages/india/ladakh/kargil" },
  { terms: ["Khardung La"], href: "/tour-packages/india/ladakh/khardung-la" },
  { terms: ["Tso Moriri Lake", "Tso Moriri"], href: "/tour-packages/india/ladakh/tso-moriri-lake" },
  { terms: ["Turtuk"], href: "/tour-packages/india/ladakh/turtuk" },
  { terms: ["Zanskar Valley", "Zanskar"], href: "/tour-packages/india/ladakh/zanskar-valley" },
  { terms: ["Magnetic Hill"], href: "/tour-packages/india/ladakh/magnetic-hill" },
  { terms: ["Hanle"], href: "/tour-packages/india/ladakh/hanle" },
  { terms: ["Hemis Monastery", "Hemis"], href: "/tour-packages/india/ladakh/hemis-monastery" },
  { terms: ["Alchi Monastery", "Alchi"], href: "/tour-packages/india/ladakh/alchi-monastery" },
  { terms: ["Lamayuru Monastery", "Lamayuru"], href: "/tour-packages/india/ladakh/lamayuru-monastery" },

  // Maharashtra & Central India
  { terms: ["Mumbai"], href: "/tour-packages/india/maharashtra/mumbai" },
  { terms: ["Ajanta Caves", "Ellora Caves", "Ajanta Ellora Caves", "Aurangabad", "Chhatrapati Sambhajinagar"], href: "/tour-packages/india/maharashtra/aurangabad" },
  { terms: ["Nashik"], href: "/tour-packages/india/maharashtra/nashik" },
  { terms: ["Tadoba National Park", "Tadoba-Andhari", "Tadoba"], href: "/tour-packages/india/maharashtra/tadoba" },
  { terms: ["Nagpur"], href: "/tour-packages/india/maharashtra/nagpur" },
  { terms: ["Pench"], href: "/tour-packages/india/maharashtra/pench" },

  // Madhya Pradesh
  { terms: ["Khajuraho Temples", "Khajuraho"], href: "/tour-packages/india/madhya-pradesh/khajuraho" },
  { terms: ["Orchha Fort", "Orchha"], href: "/tour-packages/india/madhya-pradesh/orchha" },
  { terms: ["Bandhavgarh National Park", "Bandhavgarh"], href: "/tour-packages/india/madhya-pradesh/bandhavgarh" },
  { terms: ["Kanha National Park", "Kanha"], href: "/tour-packages/india/madhya-pradesh/kanha-national-park" },
  { terms: ["Pench National Park"], href: "/tour-packages/india/madhya-pradesh/pench-national-park" },

  // Goa
  { terms: ["North Goa Beaches", "North Goa"], href: "/tour-packages/india/goa/north-goa" },
  { terms: ["South Goa Beaches", "South Goa"], href: "/tour-packages/india/goa/south-goa" },

  // General Tours Explorer
  { terms: ["India Tour Packages", "Tour Packages", "Tour Package", "Holiday Packages"], href: "/tour-packages" },
];

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function buildExperienceLinkRules(): AutoLinkRule[] {
  return KEYWORD_LINKS.flatMap((entry) =>
    entry.terms.map((term) => ({ term, href: entry.href }))
  );
}

/**
 * Links keywords safely across HTML text nodes.
 * STRICTLY PREVENTS linking inside:
 * - <h1>, <h2>, <h3>, <h4>, <h5>, <h6> headings
 * - Existing <a> anchor links
 * - HTML tags & attributes
 * Uses non-word Unicode delimiters (\uE000 / \uE001) so word boundaries (\b) match correctly
 * even when keywords are wrapped in <strong>, <b>, <em>, or other HTML tags.
 */
export function linkKeywords(html: string, rules: AutoLinkRule[]): string {
  if (!html || !rules.length) return html;

  const sortedRules = [...rules].sort((a, b) => b.term.length - a.term.length);
  const protectedTokens: string[] = [];

  // Step 1: Protect all headings (h1, h2, h3, h4, h5, h6) so they are NEVER linked
  let working = html.replace(/<h[1-6]\b[^>]*>[\s\S]*?<\/h[1-6]>/gi, (m) => {
    protectedTokens.push(m);
    return `\uE000H_${protectedTokens.length - 1}\uE001`;
  });

  // Step 2: Protect existing <a>...</a> tags so they don't get nested links
  working = working.replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, (m) => {
    protectedTokens.push(m);
    return `\uE000A_${protectedTokens.length - 1}\uE001`;
  });

  // Step 3: Protect HTML tags so search only runs in plain text
  const tagTokens: string[] = [];
  working = working.replace(/<[^>]+>/g, (m) => {
    tagTokens.push(m);
    return `\uE000TAG_${tagTokens.length - 1}\uE001`;
  });

  // Step 4: Link first occurrence of each unique keyword in body text
  for (const rule of sortedRules) {
    const regex = new RegExp(`\\b(${escapeRegex(rule.term)})\\b`, "i");
    const match = regex.exec(working);
    if (match) {
      const matchedText = match[1];
      const href = rule.href.startsWith("/") ? rule.href : `/${rule.href}`;
      const anchor = `<a href="${href}" class="text-[#2E8B8B] hover:underline font-medium">${matchedText}</a>`;
      protectedTokens.push(anchor);
      const tokenRef = `\uE000L_${protectedTokens.length - 1}\uE001`;

      working =
        working.slice(0, match.index) +
        tokenRef +
        working.slice(match.index + matchedText.length);
    }
  }

  // Step 5: Restore HTML tags
  working = working.replace(/\uE000TAG_(\d+)\uE001/g, (_, i) => tagTokens[Number(i)] ?? "");

  // Step 6: Restore headings, existing links, and newly injected links
  working = working.replace(/\uE000[HAL]_(\d+)\uE001/g, (_, i) => protectedTokens[Number(i)] ?? "");

  return working;
}

export function autoLinkKeywords(html: string): string {
  return linkKeywords(html, buildExperienceLinkRules());
}