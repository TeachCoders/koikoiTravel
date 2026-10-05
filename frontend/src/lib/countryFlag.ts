// Country & Location helpers for the analytics dashboard.
// Handles ISO 3166-1 alpha-2 codes ("IN"), country names ("India"),
// and full city/state locations ("Faridabad, Haryana, India").

const ISO_COUNTRIES: Record<string, { name: string; flag: string }> = {
  AE: { name: "United Arab Emirates", flag: "🇦🇪" },
  AR: { name: "Argentina", flag: "🇦🇷" },
  AT: { name: "Austria", flag: "🇦🇹" },
  AU: { name: "Australia", flag: "🇦🇺" },
  BD: { name: "Bangladesh", flag: "🇧🇩" },
  BE: { name: "Belgium", flag: "🇧🇪" },
  BH: { name: "Bahrain", flag: "🇧🇭" },
  BR: { name: "Brazil", flag: "🇧🇷" },
  CA: { name: "Canada", flag: "🇨🇦" },
  CH: { name: "Switzerland", flag: "🇨🇭" },
  CL: { name: "Chile", flag: "🇨🇱" },
  CN: { name: "China", flag: "🇨🇳" },
  CO: { name: "Colombia", flag: "🇨🇴" },
  CZ: { name: "Czechia", flag: "🇨🇿" },
  DE: { name: "Germany", flag: "🇩🇪" },
  DK: { name: "Denmark", flag: "🇩🇰" },
  EG: { name: "Egypt", flag: "🇪🇬" },
  ES: { name: "Spain", flag: "🇪🇸" },
  FI: { name: "Finland", flag: "🇫🇮" },
  FJ: { name: "Fiji", flag: "🇫🇯" },
  FR: { name: "France", flag: "🇫🇷" },
  GB: { name: "United Kingdom", flag: "🇬🇧" },
  GR: { name: "Greece", flag: "🇬🇷" },
  HK: { name: "Hong Kong", flag: "🇭🇰" },
  HU: { name: "Hungary", flag: "🇭🇺" },
  ID: { name: "Indonesia", flag: "🇮🇩" },
  IE: { name: "Ireland", flag: "🇮🇪" },
  IL: { name: "Israel", flag: "🇮🇱" },
  IN: { name: "India", flag: "🇮🇳" },
  IT: { name: "Italy", flag: "🇮🇹" },
  JP: { name: "Japan", flag: "🇯🇵" },
  KE: { name: "Kenya", flag: "🇰🇪" },
  KR: { name: "South Korea", flag: "🇰🇷" },
  KW: { name: "Kuwait", flag: "🇰🇼" },
  LK: { name: "Sri Lanka", flag: "🇱🇰" },
  MV: { name: "Maldives", flag: "🇲🇻" },
  MX: { name: "Mexico", flag: "🇲🇽" },
  MY: { name: "Malaysia", flag: "🇲🇾" },
  MU: { name: "Mauritius", flag: "🇲🇺" },
  NG: { name: "Nigeria", flag: "🇳🇬" },
  NL: { name: "Netherlands", flag: "🇳🇱" },
  NO: { name: "Norway", flag: "🇳🇴" },
  NP: { name: "Nepal", flag: "🇳🇵" },
  NZ: { name: "New Zealand", flag: "🇳🇿" },
  OM: { name: "Oman", flag: "🇴🇲" },
  PE: { name: "Peru", flag: "🇵🇪" },
  PH: { name: "Philippines", flag: "🇵🇭" },
  PK: { name: "Pakistan", flag: "🇵🇰" },
  PL: { name: "Poland", flag: "🇵🇱" },
  PT: { name: "Portugal", flag: "🇵🇹" },
  QA: { name: "Qatar", flag: "🇶🇦" },
  RO: { name: "Romania", flag: "🇷🇴" },
  RU: { name: "Russia", flag: "🇷🇺" },
  SA: { name: "Saudi Arabia", flag: "🇸🇦" },
  SE: { name: "Sweden", flag: "🇸🇪" },
  SG: { name: "Singapore", flag: "🇸🇬" },
  TH: { name: "Thailand", flag: "🇹🇭" },
  TR: { name: "Turkey", flag: "🇹🇷" },
  UA: { name: "Ukraine", flag: "🇺🇦" },
  US: { name: "United States", flag: "🇺🇸" },
  VN: { name: "Vietnam", flag: "🇻🇳" },
  ZA: { name: "South Africa", flag: "🇿🇦" },
};

export function countryInfo(name?: string | null): { name: string; flag: string } {
  if (!name) return { name: "Unknown", flag: "🌍" };
  const raw = name.trim();
  
  // If string contains multiple parts like "Faridabad, Haryana, India"
  const parts = raw.split(",").map((s) => s.trim());
  const countrySegment = parts[parts.length - 1] || raw;
  const key = countrySegment.toLowerCase();

  // ISO alpha-2 code (e.g. "IN")
  if (/^[a-z]{2}$/i.test(countrySegment)) {
    const iso = ISO_COUNTRIES[countrySegment.toUpperCase()];
    if (iso) return { name: raw, flag: iso.flag };
  }

  // Full country match
  const found = Object.entries(ISO_COUNTRIES).find(
    ([, c]) => c.name.toLowerCase() === key || key.includes(c.name.toLowerCase())
  );
  if (found) return { name: raw, flag: found[1].flag };

  const ALIASES: Record<string, { name: string; flag: string }> = {
    "united states of america": { name: "United States", flag: "🇺🇸" },
    usa: { name: "United States", flag: "🇺🇸" },
    uae: { name: "United Arab Emirates", flag: "🇦🇪" },
  };
  const alias = ALIASES[key];
  if (alias) return { name: raw, flag: alias.flag };

  return { name: raw, flag: "🌍" };
}

export function countryFlag(name?: string | null): string {
  return countryInfo(name).flag;
}

export function countryLabel(name?: string | null): string {
  return countryInfo(name).name;
}

export function isKnownCountry(name?: string | null): boolean {
  if (!name) return false;
  const info = countryInfo(name);
  return info.flag !== "🌍" && info.name.toLowerCase() !== "unknown";
}