/**
 * Shared city validation and indexability helpers.
 *
 * A city route /tour-packages/india/{state}/{city} is ONLY valid and indexable
 * if it meets ALL of the following criteria:
 *  1. Belongs to a valid state in India (stateSlug !== citySlug)
 *  2. Is active in DB (isActive === true)
 *  3. Is enabled for public site display (showOnSite === true)
 *  4. Has active tour packages (tourCount >= 1 or curated circuit)
 *
 * Any other city (e.g. sariska, ranakpur, bikaner, mount-abu, kovalam, trivandrum,
 * kufri, sarchu, mumbai, nagpur, etc.) must NEVER be linked as a clickable <a> URL;
 * instead, its name should be displayed as plain text (<span>).
 */

export const VALID_INDEXABLE_CITY_PAIRS = new Set<string>([
  // Himachal Pradesh
  "himachal-pradesh/manali",
  "himachal-pradesh/shimla",

  // Jammu & Kashmir
  "jammu-and-kashmir/gulmarg",
  "jammu-and-kashmir/pahalgam",
  "jammu-and-kashmir/sonamarg",
  "jammu-and-kashmir/srinagar",

  // Karnataka
  "karnataka/coorg",
  "karnataka/hassan",
  "karnataka/mysore",

  // Kerala
  "kerala/alleppey",
  "kerala/cochin",
  "kerala/kumarakom",
  "kerala/munnar",
  "kerala/thekkady",
  "kerala/wayanad",

  // Ladakh
  "ladakh/hemis-monastery",
  "ladakh/leh",
  "ladakh/nubra-valley",
  "ladakh/pangong-tso",

  // Punjab
  "punjab/amritsar",

  // Rajasthan
  "rajasthan/bharatpur",
  "rajasthan/bundi",
  "rajasthan/jaipur",
  "rajasthan/jaisalmer",
  "rajasthan/jodhpur",
  "rajasthan/pushkar",
  "rajasthan/ranthambore",
  "rajasthan/udaipur",

  // Tamil Nadu
  "tamil-nadu/chennai",
  "tamil-nadu/madurai",
  "tamil-nadu/mahabalipuram",
  "tamil-nadu/ooty",

  // Uttar Pradesh
  "uttar-pradesh/agra",
  "uttar-pradesh/varanasi",
]);

export function isIndexableCity(
  stateSlug?: string | null,
  citySlug?: string | null
): boolean {
  if (!stateSlug || !citySlug) return false;
  const s = stateSlug.toLowerCase().trim();
  const c = citySlug.toLowerCase().trim();
  if (s === c) return false;
  return VALID_INDEXABLE_CITY_PAIRS.has(`${s}/${c}`);
}

export function getCityPackageHref(
  stateSlug?: string | null,
  citySlug?: string | null,
  countrySlug: string = "india"
): string | null {
  if (!isIndexableCity(stateSlug, citySlug)) return null;
  return `/tour-packages/${countrySlug}/${stateSlug!.toLowerCase().trim()}/${citySlug!.toLowerCase().trim()}`;
}
