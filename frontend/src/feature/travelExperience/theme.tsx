import React from "react";
import {
  Heart,
  Landmark,
  Flower2,
  Mountain,
  Waves,
  Compass,
  Sparkles,
  Users,
  Sun,
  Trees,
  Car,
  UtensilsCrossed,
} from "lucide-react";

export const FALLBACK_IMAGE = "";

export interface ExperienceThemeConfig {
  icon: React.ReactNode;
  illustration: React.ReactNode;
  tag: string;
  tagColor: string;
  bgGradient: string;
  ctaText: string;
}

// 1. Realistic Taj Mahal Monument (Iconic White Marble Architecture)
function TajMahalArt() {
  return (
    <svg viewBox="0 0 240 170" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tajSky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF1EB" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ACE0F9" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="tajMarbleMain" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        <linearGradient id="tajDomeGrad" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="45%" stopColor="#F1F5F9" />
          <stop offset="85%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <linearGradient id="tajMinaret" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F8FAFC" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id="tajWater" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#E0F2FE" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="tajGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
      </defs>

      <circle cx="120" cy="72" r="50" fill="url(#tajSky)" />
      <circle cx="120" cy="72" r="32" fill="#FEF3C7" opacity="0.4" />

      <path d="M42 38 Q47 32 52 38 Q57 32 62 38" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M182 42 Q186 37 190 42 Q194 37 198 42" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" fill="none" />

      <rect x="18" y="132" width="204" height="6" rx="1.5" fill="#D97706" opacity="0.8" />
      <rect x="26" y="126" width="188" height="6" rx="1" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.8" />

      <ellipse cx="120" cy="152" rx="88" ry="10" fill="url(#tajWater)" />
      <path d="M75 151 Q120 148 165 151" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />

      <rect x="30" y="52" width="8.5" height="74" fill="url(#tajMinaret)" stroke="#94A3B8" strokeWidth="0.8" />
      <rect x="28" y="74" width="12.5" height="3" rx="0.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.6" />
      <rect x="28" y="98" width="12.5" height="3" rx="0.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.6" />
      <rect x="27.5" y="47" width="13.5" height="5" rx="1" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.6" />
      <path d="M34.25 35 Q30 43 30 47 L38.5 47 Q38.5 43 34.25 35 Z" fill="url(#tajDomeGrad)" stroke="#64748B" strokeWidth="0.8" />
      <line x1="34.25" y1="28" x2="34.25" y2="35" stroke="url(#tajGold)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="34.25" cy="27" r="1.2" fill="#EAB308" />

      <rect x="201.5" y="52" width="8.5" height="74" fill="url(#tajMinaret)" stroke="#94A3B8" strokeWidth="0.8" />
      <rect x="199.5" y="74" width="12.5" height="3" rx="0.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.6" />
      <rect x="199.5" y="98" width="12.5" height="3" rx="0.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.6" />
      <rect x="199" y="47" width="13.5" height="5" rx="1" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.6" />
      <path d="M205.75 35 Q201.5 43 201.5 47 L210 47 Q210 43 205.75 35 Z" fill="url(#tajDomeGrad)" stroke="#64748B" strokeWidth="0.8" />
      <line x1="205.75" y1="28" x2="205.75" y2="35" stroke="url(#tajGold)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="205.75" cy="27" r="1.2" fill="#EAB308" />

      <path d="M58 126 L58 74 L68 70 L172 70 L182 74 L182 126 Z" fill="url(#tajMarbleMain)" stroke="#94A3B8" strokeWidth="1" />
      <rect x="58" y="74" width="24" height="52" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.6" />
      <path d="M63 80 L63 94 Q70 88 77 94 L77 80 Z" fill="#334155" />
      <path d="M63 102 L63 120 Q70 114 77 120 L77 102 Z" fill="#334155" />

      <rect x="158" y="74" width="24" height="52" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.6" />
      <path d="M163 80 L163 94 Q170 88 177 94 L177 80 Z" fill="#334155" />
      <path d="M163 102 L163 120 Q170 114 177 120 L177 102 Z" fill="#334155" />

      <rect x="76" y="60" width="16" height="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
      <path d="M84 46 Q76 54 76 60 L92 60 Q92 54 84 46 Z" fill="url(#tajDomeGrad)" stroke="#64748B" strokeWidth="0.8" />
      <line x1="84" y1="40" x2="84" y2="46" stroke="url(#tajGold)" strokeWidth="1.2" />

      <rect x="148" y="60" width="16" height="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
      <path d="M156 46 Q148 54 148 60 L164 60 Q164 54 156 46 Z" fill="url(#tajDomeGrad)" stroke="#64748B" strokeWidth="0.8" />
      <line x1="156" y1="40" x2="156" y2="46" stroke="url(#tajGold)" strokeWidth="1.2" />

      <rect x="98" y="60" width="44" height="12" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
      <path d="M120 16 C96 36 90 48 90 60 L150 60 C150 48 144 36 120 16 Z" fill="url(#tajDomeGrad)" stroke="#64748B" strokeWidth="1.2" />
      <path d="M112 26 C104 36 102 46 102 54" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M116 16 Q120 10 124 16 Z" fill="url(#tajGold)" />
      <line x1="120" y1="4" x2="120" y2="16" stroke="url(#tajGold)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="120" cy="3" r="2" fill="#EAB308" />
      <path d="M117 7 L123 7" stroke="#CA8A04" strokeWidth="1.5" />

      <rect x="88" y="70" width="64" height="56" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
      <path d="M96 126 L96 90 Q120 68 144 90 L144 126 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="1.2" />
      <path d="M102 126 L102 98 Q120 82 138 98 L138 126 Z" fill="#0F172A" />
      <path d="M108 126 L108 106 Q120 96 132 106 L132 126 Z" fill="#78350F" stroke="#D97706" strokeWidth="0.8" />
    </svg>
  );
}

// 2. Classical Kathak Dancer (Heritage & Culture - Expressive Eyes, Nose, Mouth, Ghungroos, Zari Lehenga)
function KathakDanceArt() {
  return (
    <svg viewBox="0 0 240 170" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="kathakGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FDE047" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="lehengaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="50%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#BE123C" />
        </linearGradient>
        <linearGradient id="dupattaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FDE047" />
        </linearGradient>
      </defs>

      <circle cx="120" cy="74" r="54" fill="url(#kathakGlow)" />
      <path d="M70 145 L70 65 Q120 30 170 65 L170 145" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="5 3" fill="none" opacity="0.6" />

      {/* Brass Diyas */}
      <ellipse cx="48" cy="138" rx="14" ry="4" fill="#D97706" />
      <path d="M38 138 Q48 148 58 138 Z" fill="#B45309" />
      <path d="M48 126 Q43 134 48 138 Q53 134 48 126 Z" fill="#EF4444" />
      <circle cx="48" cy="133" r="2" fill="#FDE047" />

      <ellipse cx="192" cy="138" rx="14" ry="4" fill="#D97706" />
      <path d="M182 138 Q192 148 202 138 Z" fill="#B45309" />
      <path d="M192 126 Q187 134 192 138 Q197 134 192 126 Z" fill="#EF4444" />
      <circle cx="192" cy="133" r="2" fill="#FDE047" />

      {/* Swirling Kathak Lehenga */}
      <path d="M120 90 Q70 115 52 142 Q120 154 188 142 Q170 115 120 90 Z" fill="url(#lehengaGrad)" />
      <path d="M52 142 Q120 154 188 142" stroke="#FDE047" strokeWidth="4" fill="none" />
      <path d="M56 138 Q120 150 184 138" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />

      {/* Gold Dupatta */}
      <path d="M80 75 Q60 90 68 115 Q95 88 120 82 Q145 88 172 115 Q180 90 160 75" fill="url(#dupattaGrad)" opacity="0.85" />

      {/* Choli */}
      <path d="M108 68 Q120 64 132 68 L134 92 L106 92 Z" fill="#BE123C" />
      <path d="M112 68 L120 80 L128 68" stroke="#FDE047" strokeWidth="2" fill="none" />

      {/* Mudra Arms */}
      <path d="M108 72 L82 58 L72 45" stroke="#FED7AA" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="70" cy="43" r="4.5" fill="#FED7AA" />
      <circle cx="70" cy="43" r="2" fill="#DC2626" />
      <circle cx="68" cy="38" r="1.5" fill="#DC2626" />

      <path d="M132 72 L158 58 L168 45" stroke="#FED7AA" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="170" cy="43" r="4.5" fill="#FED7AA" />
      <circle cx="170" cy="43" r="2" fill="#DC2626" />
      <circle cx="172" cy="38" r="1.5" fill="#DC2626" />

      {/* Ghungroo Bells on Feet */}
      <ellipse cx="112" cy="144" rx="7" ry="3" fill="#FED7AA" />
      <circle cx="110" cy="143" r="1.2" fill="#D97706" />
      <circle cx="113" cy="143" r="1.2" fill="#D97706" />
      <ellipse cx="128" cy="144" rx="7" ry="3" fill="#FED7AA" />
      <circle cx="126" cy="143" r="1.2" fill="#D97706" />
      <circle cx="129" cy="143" r="1.2" fill="#D97706" />

      {/* Head & Hair Bun with Gajra */}
      <circle cx="120" cy="48" r="12" fill="#FED7AA" />
      <circle cx="120" cy="34" r="8" fill="#1C1917" />
      <circle cx="120" cy="34" r="9.5" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="3 3" fill="none" />
      <path d="M110 46 Q120 38 130 46 Q132 40 120 38 Q108 40 110 46 Z" fill="#1C1917" />
      <line x1="120" y1="38" x2="120" y2="44" stroke="#FDE047" strokeWidth="1.2" />
      <circle cx="120" cy="44" r="1.5" fill="#DC2626" />

      {/* Detailed Expressive Face (Eyes, Eyelashes, Bindi, Nose, Smiling Lips) */}
      <circle cx="120" cy="46" r="1.2" fill="#DC2626" />
      <path d="M114 48 Q116 46 118 48" stroke="#1C1917" strokeWidth="1.2" fill="none" />
      <circle cx="116" cy="48.5" r="1" fill="#1C1917" />
      <path d="M113 47 L112 46" stroke="#1C1917" strokeWidth="0.8" />
      <path d="M122 48 Q124 46 126 48" stroke="#1C1917" strokeWidth="1.2" fill="none" />
      <circle cx="124" cy="48.5" r="1" fill="#1C1917" />
      <path d="M127 47 L128 46" stroke="#1C1917" strokeWidth="0.8" />
      <path d="M120 48 L120 52 L121.5 52.5" stroke="#B45309" strokeWidth="0.9" strokeLinecap="round" fill="none" />
      <circle cx="118.5" cy="52" r="1.5" stroke="#F59E0B" strokeWidth="0.7" fill="none" />
      <path d="M117 55 Q120 58 123 55" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      <path d="M107 48 L105 53 L109 53 Z" fill="#F59E0B" />
      <path d="M133 48 L131 53 L135 53 Z" fill="#F59E0B" />
    </svg>
  );
}

// 3. Modern Family Vacation (Mom in stylish Top & Denim Jeans, Dad in Resort Shirt, Kids, Beach Sunset)
function FamilyBeachArt() {
  return (
    <svg viewBox="0 0 240 170" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      {/* Tropical Beach Sunset & Sea */}
      <circle cx="180" cy="55" r="32" fill="#FDE047" opacity="0.6" />
      <circle cx="180" cy="55" r="20" fill="#F59E0B" opacity="0.4" />

      {/* Palm Tree */}
      <path d="M30 145 Q36 80 18 45" stroke="#78350F" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M18 45 Q0 35 -10 50" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M18 45 Q20 20 5 15" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M18 45 Q42 30 50 42" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="16" cy="47" r="2.5" fill="#A16207" />
      <circle cx="21" cy="48" r="2.5" fill="#A16207" />

      <path d="M10 128 Q70 120 130 128 T230 128" stroke="#38BDF8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="120" cy="152" rx="95" ry="10" fill="#FEF08A" />

      {/* 1. DAD (Left - Straw Hat, Shades, Eyes, Nose, Smile, Resort Shirt) */}
      <circle cx="76" cy="70" r="11" fill="#FED7AA" />
      <ellipse cx="76" cy="62" rx="16" ry="4" fill="#CA8A04" />
      <path d="M66 62 Q76 52 86 62 Z" fill="#EAB308" />
      {/* Dad Shades */}
      <rect x="69" y="67" width="6.5" height="4.5" rx="1.5" fill="#0F172A" />
      <rect x="77" y="67" width="6.5" height="4.5" rx="1.5" fill="#0F172A" />
      <line x1="75.5" y1="69" x2="77" y2="69" stroke="#0F172A" strokeWidth="1" />
      {/* Dad Nose & Smile */}
      <path d="M76 72 L76 75 L77.5 75.5" stroke="#9A3412" strokeWidth="0.8" fill="none" />
      <path d="M72 77 Q76 81 80 77" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      {/* Dad Casual Shirt & Shorts */}
      <path d="M66 82 Q76 78 86 82 L90 125 L62 125 Z" fill="#0D9488" />
      <circle cx="72" cy="94" r="2" fill="#FDE047" />
      <circle cx="80" cy="104" r="2" fill="#FDE047" />

      {/* 2. KID (Middle - Joyful boy with beach ball) */}
      <circle cx="116" cy="85" r="9" fill="#FED7AA" />
      <path d="M108 82 Q116 75 124 82 Q126 78 116 76 Q106 78 108 82 Z" fill="#78350F" />
      <circle cx="113" cy="84.5" r="1.3" fill="#1C1917" />
      <circle cx="119" cy="84.5" r="1.3" fill="#1C1917" />
      <circle cx="116" cy="87" r="0.7" fill="#B45309" />
      <path d="M113 89 Q116 93 119 89 Z" fill="#DC2626" />
      <path d="M109 94 Q116 91 123 94 L125 122 L107 122 Z" fill="#F97316" />
      <path d="M109 96 L96 84" stroke="#FED7AA" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M123 96 L136 84" stroke="#FED7AA" strokeWidth="3.5" strokeLinecap="round" />
      {/* Beach Ball */}
      <circle cx="98" cy="74" r="8" fill="#EF4444" />
      <path d="M94 68 Q98 74 94 80" stroke="#FDE047" strokeWidth="2.5" fill="none" />
      <path d="M102 68 Q98 74 102 80" stroke="#3B82F6" strokeWidth="2.5" fill="none" />

      {/* 3. MOM (Right - Stylish Modern Crop Top & Blue Denim Jeans) */}
      <circle cx="158" cy="68" r="11" fill="#FED7AA" />
      {/* Mom Chic Hairstyle & Sunglasses headband */}
      <path d="M148 64 Q158 55 168 64 Q172 78 168 86 Q162 70 158 68 Q154 70 148 86 Q144 78 148 64 Z" fill="#451A03" />
      <rect x="153" y="58" width="11" height="3.5" rx="1.5" fill="#BE185D" />
      {/* Mom Eyes with Eyelashes */}
      <path d="M154 68 Q156 66 158 68" stroke="#1C1917" strokeWidth="1.2" fill="none" />
      <circle cx="156" cy="68.5" r="1" fill="#1C1917" />
      <path d="M160 68 Q162 66 164 68" stroke="#1C1917" strokeWidth="1.2" fill="none" />
      <circle cx="162" cy="68.5" r="1" fill="#1C1917" />
      {/* Mom Nose & Smiling Red Lips */}
      <path d="M159 70 L159 73 L160 73.5" stroke="#9A3412" strokeWidth="0.8" fill="none" />
      <path d="M155 75 Q159 79 163 75" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Mom Trendy White/Coral Top */}
      <path d="M150 80 Q158 76 166 80 L168 98 L148 98 Z" fill="#F43F5E" />
      <circle cx="158" cy="88" r="1.5" fill="#FFFFFF" />

      {/* Mom Stylish Blue Denim Jeans */}
      <path d="M149 98 L167 98 L170 142 L160 142 L158 112 L156 142 L146 142 Z" fill="#2563EB" />
      {/* Jeans Pocket & Belt details */}
      <rect x="149" y="98" width="18" height="3" fill="#1D4ED8" />
      <line x1="158" y1="98" x2="158" y2="101" stroke="#FDE047" strokeWidth="1.5" />
      <path d="M151 104 Q154 108 156 104" stroke="#60A5FA" strokeWidth="1" fill="none" />
      <path d="M160 104 Q162 108 165 104" stroke="#60A5FA" strokeWidth="1" fill="none" />

      {/* Tote Bag */}
      <rect x="170" y="98" width="14" height="16" rx="2.5" fill="#10B981" />
      <path d="M174 98 Q177 90 180 98" stroke="#047857" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

// 4. Realistic Wildlife & Royal Bengal Tiger Safari (Eyes, Whiskers & Jungle Jeep)
function WildlifeSafariArt() {
  return (
    <svg viewBox="0 0 240 170" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tigerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="jungleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#65A30D" />
          <stop offset="100%" stopColor="#3F6212" />
        </linearGradient>
      </defs>

      <path d="M15 145 Q35 70 75 115 Q60 55 105 105 Q90 145 90 145 Z" fill="url(#jungleGrad)" opacity="0.35" />
      <path d="M225 145 Q205 65 165 115 Q185 55 140 105 Q150 145 150 145 Z" fill="url(#jungleGrad)" opacity="0.35" />
      <ellipse cx="120" cy="148" rx="85" ry="12" fill="#ECFCCB" />

      {/* Safari 4x4 Jeep */}
      <rect x="42" y="94" width="86" height="38" rx="6" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
      <rect x="48" y="74" width="74" height="24" rx="3" fill="#E0F2FE" stroke="#334155" strokeWidth="2.5" />
      <line x1="85" y1="74" x2="85" y2="98" stroke="#334155" strokeWidth="2.5" />
      <circle cx="62" cy="134" r="14" fill="#1E293B" />
      <circle cx="62" cy="134" r="6" fill="#94A3B8" />
      <circle cx="110" cy="134" r="14" fill="#1E293B" />
      <circle cx="110" cy="134" r="6" fill="#94A3B8" />

      {/* Explorer in Jeep with Eyes, Nose, Smile */}
      <circle cx="70" cy="62" r="10" fill="#FED7AA" />
      <path d="M60 55 L80 55 L77 47 L63 47 Z" fill="#CA8A04" />
      <ellipse cx="70" cy="55" rx="14" ry="3" fill="#CA8A04" />
      <circle cx="67" cy="61" r="1" fill="#1C1917" />
      <circle cx="73" cy="61" r="1" fill="#1C1917" />
      <path d="M70 63 L70 65 L71 65.5" stroke="#9A3412" strokeWidth="0.7" fill="none" />
      <path d="M67 67 Q70 69 73 67" stroke="#9A3412" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <rect x="66" y="64" width="12" height="6" rx="2" fill="#0F172A" />
      <circle cx="69" cy="67" r="2.2" fill="#38BDF8" />
      <circle cx="75" cy="67" r="2.2" fill="#38BDF8" />

      {/* Majestic Royal Bengal Tiger Face */}
      <circle cx="172" cy="98" r="25" fill="url(#tigerGrad)" stroke="#C2410C" strokeWidth="1.2" />
      <circle cx="155" cy="78" r="7.5" fill="#C2410C" />
      <circle cx="155" cy="78" r="4.5" fill="#FED7AA" />
      <circle cx="189" cy="78" r="7.5" fill="#C2410C" />
      <circle cx="189" cy="78" r="4.5" fill="#FED7AA" />
      <ellipse cx="161" cy="106" rx="8.5" ry="6.5" fill="#FFF7ED" />
      <ellipse cx="183" cy="106" rx="8.5" ry="6.5" fill="#FFF7ED" />
      <path d="M172 77 L172 86 M167 81 L177 81 M169 85 L175 85" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M151 94 L159 96 M151 102 L159 102 M193 94 L185 96 M193 102 L185 102" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="163" cy="95" rx="4" ry="4.5" fill="#FACC15" />
      <circle cx="163" cy="95" r="2" fill="#000" />
      <circle cx="162" cy="94" r="0.8" fill="#FFF" />
      <ellipse cx="181" cy="95" rx="4" ry="4.5" fill="#FACC15" />
      <circle cx="181" cy="95" r="2" fill="#000" />
      <circle cx="180" cy="94" r="0.8" fill="#FFF" />
      <path d="M168 104 L176 104 L172 108 Z" fill="#E11D48" />
      <path d="M172 108 L172 112 M168 112 Q172 114 176 112" stroke="#1E293B" strokeWidth="1.2" fill="none" />
      <path d="M154 108 L140 106 M154 112 L138 114 M190 108 L204 106 M190 112 L206 114" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// 5. Honeymoon & Romance (Lady in Chic Short Dress, Male in Linen, Eyes, Nose, Lips & Hearts)
function HoneymoonArt() {
  return (
    <svg viewBox="0 0 240 170" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sunsetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="50%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>

      <circle cx="120" cy="74" r="46" fill="url(#sunsetGrad)" opacity="0.3" />
      <circle cx="120" cy="74" r="30" fill="url(#sunsetGrad)" />

      <path d="M120 40 C120 28, 104 22, 104 36 C104 48, 120 62, 120 62 C120 62, 136 48, 136 36 C136 22, 120 28, 120 40 Z" fill="#E11D48" />
      <path d="M152 46 C152 38, 142 34, 142 42 C142 50, 152 58, 152 58 C152 58, 162 50, 162 42 C162 34, 152 38, 152 46 Z" fill="#F43F5E" opacity="0.8" />

      <ellipse cx="120" cy="148" rx="80" ry="12" fill="#FFE4E6" />

      {/* Male Partner (Face with Eyes, Nose, Smile, Smart Linen Shirt) */}
      <circle cx="100" cy="80" r="13" fill="#FED7AA" />
      <path d="M88 76 Q100 66 112 76 Q114 70 100 68 Q86 70 88 76 Z" fill="#292524" />
      <circle cx="96" cy="79" r="1.2" fill="#1C1917" />
      <circle cx="104" cy="79" r="1.2" fill="#1C1917" />
      <path d="M100 81 L100 84 L101.5 84.5" stroke="#9A3412" strokeWidth="0.8" fill="none" />
      <path d="M96 86 Q100 89 104 86" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      {/* Male Smart Linen Shirt & Shorts */}
      <path d="M88 94 Q100 88 112 94 L115 138 L85 138 Z" fill="#1E3A8A" />

      {/* Female Partner (Lady in Romantic Chic Short Summer Dress, Flower in Hair, Eyes, Nose, Lips) */}
      <circle cx="140" cy="82" r="12" fill="#FED7AA" />
      <path d="M128 78 Q140 68 152 78 Q156 92 152 100 Q146 82 140 80 Q134 82 128 100 Q124 92 128 78 Z" fill="#78350F" />
      <circle cx="152" cy="74" r="3" fill="#F43F5E" />
      <circle cx="152" cy="74" r="1" fill="#FDE047" />
      {/* Female Pretty Eyes, Nose, Lipstick Smile */}
      <path d="M136 81 Q138 79 140 81" stroke="#1C1917" strokeWidth="1.2" fill="none" />
      <circle cx="138" cy="81.5" r="1" fill="#1C1917" />
      <path d="M142 81 Q144 79 146 81" stroke="#1C1917" strokeWidth="1.2" fill="none" />
      <circle cx="144" cy="81.5" r="1" fill="#1C1917" />
      <path d="M141 83 L141 86 L142 86.5" stroke="#9A3412" strokeWidth="0.8" fill="none" />
      <path d="M137 88 Q141 91 145 88" stroke="#E11D48" strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Romantic Sleeveless Short Dress (with flared skirt) */}
      <path d="M132 94 Q140 90 148 94 L154 122 Q140 125 126 122 Z" fill="#EC4899" />
      <path d="M126 122 Q140 125 154 122" stroke="#BE185D" strokeWidth="1.5" />
      {/* Slender legs */}
      <line x1="134" y1="122" x2="133" y2="145" stroke="#FED7AA" strokeWidth="3" strokeLinecap="round" />
      <line x1="146" y1="122" x2="147" y2="145" stroke="#FED7AA" strokeWidth="3" strokeLinecap="round" />
      {/* Cute Strappy Sandals */}
      <circle cx="133" cy="146" r="2.5" fill="#E11D48" />
      <circle cx="147" cy="146" r="2.5" fill="#E11D48" />

      {/* Toasting Glasses */}
      <path d="M112 108 L120 100 L128 108" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="120" cy="94" r="3" fill="#FDE047" />
    </svg>
  );
}

// 6. Ayurveda & Yoga (Lotus Yogi with Eyes, Nose, Serene Smile)
function YogaArt() {
  return (
    <svg viewBox="0 0 240 170" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="yogaAura" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#34D399" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="lotusGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="100%" stopColor="#F43F5E" />
        </linearGradient>
      </defs>

      <circle cx="120" cy="80" r="54" fill="url(#yogaAura)" />
      <circle cx="120" cy="80" r="42" stroke="#10B981" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
      <circle cx="120" cy="80" r="28" fill="#ECFDF5" />

      <path d="M52 65 Q70 58 60 85 Q50 82 52 65 Z" fill="#10B981" opacity="0.8" />
      <path d="M188 55 Q205 62 195 85 Q185 80 188 55 Z" fill="#059669" opacity="0.8" />

      {/* Yogi Head, Hair Bun, Serene Facial Features */}
      <circle cx="120" cy="52" r="14" fill="#FED7AA" />
      <circle cx="120" cy="36" r="7" fill="#3D2918" />
      <path d="M108 50 Q120 40 132 50 Q134 42 120 41 Q106 42 108 50 Z" fill="#3D2918" />
      <path d="M113 52 Q116 55 119 52" stroke="#9A3412" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M121 52 Q124 55 127 52" stroke="#9A3412" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M120 52 L120 56 L121.5 56.5" stroke="#9A3412" strokeWidth="0.8" fill="none" />
      <path d="M117 59 Q120 62 123 59" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round" fill="none" />

      <path d="M106 68 Q120 62 134 68 L138 98 L102 98 Z" fill="#0D9488" />
      <path d="M106 72 L86 88 L104 94" stroke="#0D9488" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M134 72 L154 88 L136 94" stroke="#0D9488" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="86" cy="88" r="4.5" fill="#FED7AA" />
      <circle cx="154" cy="88" r="4.5" fill="#FED7AA" />
      <path d="M82 106 Q120 90 158 106 Q120 120 82 106 Z" fill="#115E59" />

      <path d="M120 125 Q95 110 70 125 Q95 145 120 125 Z" fill="url(#lotusGrad)" />
      <path d="M120 125 Q145 110 170 125 Q145 145 120 125 Z" fill="url(#lotusGrad)" />
      <path d="M120 118 Q105 100 120 90 Q135 100 120 118 Z" fill="#FB7185" />
    </svg>
  );
}

// 7. Multi-Faith Spiritual Journeys (Hindu Temple, Church Cross, Mosque Crescent & Diya)
function SpiritualArt() {
  return (
    <svg viewBox="0 0 240 170" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="multiFaithSun" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FDE047" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="templeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="churchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <linearGradient id="mosqueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#99F6E4" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <linearGradient id="goldDiya" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
      </defs>

      <circle cx="120" cy="70" r="54" fill="url(#multiFaithSun)" />
      <circle cx="120" cy="70" r="38" fill="#FFFBEB" opacity="0.6" />

      {/* Dove of Peace */}
      <path d="M120 22 Q126 14 134 20 Q128 26 120 22 Z" fill="#FFFFFF" />
      <path d="M120 22 Q114 14 106 20 Q112 26 120 22 Z" fill="#FFFFFF" />
      <circle cx="120" cy="22" r="2.5" fill="#FFFFFF" />

      {/* 1. Hindu Temple & Dhwaja */}
      <path d="M42 135 L48 95 L56 70 L64 95 L70 135 Z" fill="url(#templeGrad)" stroke="#C2410C" strokeWidth="0.8" />
      <circle cx="56" cy="67" r="3" fill="#F59E0B" />
      <line x1="56" y1="52" x2="56" y2="67" stroke="#9A3412" strokeWidth="1.2" />
      <path d="M56 52 L68 57 L56 62 Z" fill="#EA580C" />
      <path d="M50 135 L50 115 Q56 108 62 115 L62 135 Z" fill="#7C2D12" />

      {/* 2. Christian Church & Cross */}
      <rect x="106" y="80" width="28" height="55" fill="url(#churchGrad)" stroke="#64748B" strokeWidth="0.8" />
      <path d="M106 80 L120 38 L134 80 Z" fill="#64748B" stroke="#475569" strokeWidth="0.8" />
      <line x1="120" y1="24" x2="120" y2="38" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="114" y1="29" x2="126" y2="29" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M114 96 L114 120 Q120 110 126 120 L126 96 Q120 86 114 96 Z" fill="#0284C7" stroke="#38BDF8" strokeWidth="0.8" />

      {/* 3. Islamic Mosque & Crescent */}
      <rect x="170" y="90" width="30" height="45" fill="#CCFBF1" stroke="#0D9488" strokeWidth="0.8" />
      <path d="M185 58 C173 70 170 78 170 90 L200 90 C200 78 197 70 185 58 Z" fill="url(#mosqueGrad)" stroke="#0F766E" strokeWidth="0.8" />
      <line x1="185" y1="48" x2="185" y2="58" stroke="#FDE047" strokeWidth="1.5" />
      <path d="M187 47 C185 45 181 47 181 50 C181 53 185 55 187 53 C184 53 183 50 187 47 Z" fill="#FDE047" />
      <rect x="206" y="65" width="7" height="70" fill="#F0FDFA" stroke="#0D9488" strokeWidth="0.8" />
      <path d="M209.5 54 Q206 62 206 65 L213 65 Q213 62 209.5 54 Z" fill="url(#mosqueGrad)" />

      {/* Base Marble Terrace & Sacred Diya */}
      <rect x="22" y="135" width="196" height="8" rx="2" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="0.8" />
      <ellipse cx="120" cy="144" rx="28" ry="7" fill="url(#goldDiya)" />
      <path d="M96 144 Q120 160 144 144 Q120 152 96 144 Z" fill="#B45309" />
      <path d="M120 118 Q110 134 120 144 Q130 134 120 118 Z" fill="#DC2626" />
      <path d="M120 124 Q114 135 120 142 Q126 135 120 124 Z" fill="#FDE047" />
      <circle cx="120" cy="136" r="2.5" fill="#FFFFFF" />
    </svg>
  );
}

// 8. Desert Safari (Thar Desert Camel Caravan & Sand Dunes)
function DesertSafariArt() {
  return (
    <svg viewBox="0 0 240 170" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="desertSun" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id="duneGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="duneGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>

      <circle cx="120" cy="55" r="30" fill="url(#desertSun)" />

      <path d="M0 130 Q60 85 130 115 Q190 145 240 100 L240 170 L0 170 Z" fill="url(#duneGrad1)" opacity="0.7" />
      <path d="M0 145 Q80 110 160 135 Q200 150 240 130 L240 170 L0 170 Z" fill="url(#duneGrad2)" />

      {/* Camel with Saddle & Rajasthani Guide */}
      <ellipse cx="140" cy="115" rx="22" ry="14" fill="#B45309" />
      <path d="M130 104 Q140 88 150 104 Z" fill="#92400E" />
      <path d="M156 114 Q168 95 166 82 L176 80 Q176 86 168 114 Z" fill="#B45309" />
      <circle cx="172" cy="80" r="4.5" fill="#B45309" />
      <circle cx="173" cy="79" r="1" fill="#000" />
      <line x1="124" y1="125" x2="122" y2="152" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
      <line x1="134" y1="125" x2="132" y2="152" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
      <line x1="148" y1="125" x2="148" y2="152" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
      <line x1="156" y1="125" x2="158" y2="152" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
      <rect x="132" y="106" width="18" height="12" rx="2" fill="#DC2626" />
      <path d="M132 118 L150 118" stroke="#FDE047" strokeWidth="1.5" />

      {/* Rajasthani Guide with Eyes, Moustache, Smile */}
      <circle cx="102" cy="108" r="7" fill="#FED7AA" />
      <ellipse cx="102" cy="103" rx="9" ry="5" fill="#EF4444" />
      <path d="M93 103 Q102 96 111 103 Z" fill="#F59E0B" />
      <circle cx="100" cy="107" r="0.9" fill="#1C1917" />
      <circle cx="104" cy="107" r="0.9" fill="#1C1917" />
      <path d="M98 110 Q102 112 106 110" stroke="#1C1917" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M96 114 Q102 111 108 114 L110 152 L94 152 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="0.8" />
      <path d="M108 120 Q130 110 166 84" stroke="#78350F" strokeWidth="1.2" strokeDasharray="3 2" fill="none" />
    </svg>
  );
}

// 9. Hill Station & Mountain Expeditions (Himalayas & Explorer with Eyes, Nose, Smile)
function HillStationArt() {
  return (
    <svg viewBox="0 0 240 170" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <circle cx="65" cy="45" r="18" fill="#FEF08A" />

      <path d="M20 145 L75 55 L130 145 Z" fill="#0284C7" />
      <path d="M75 55 L62 76 L75 84 L88 76 Z" fill="#FFFFFF" />

      <path d="M85 145 L150 35 L215 145 Z" fill="#0369A1" />
      <path d="M150 35 L134 65 L150 74 L166 65 Z" fill="#FFFFFF" />

      <path d="M40 148 L48 125 L56 148 Z" fill="#065F46" />
      <path d="M190 148 L198 122 L206 148 Z" fill="#065F46" />

      {/* Explorer with Face */}
      <circle cx="120" cy="98" r="10" fill="#FED7AA" />
      <path d="M110 94 Q120 84 130 94 Z" fill="#DC2626" />
      <circle cx="120" cy="84" r="2.5" fill="#FEF08A" />
      <circle cx="117" cy="97" r="1.1" fill="#1C1917" />
      <circle cx="123" cy="97" r="1.1" fill="#1C1917" />
      <path d="M120 99 L120 101.5 L121 102" stroke="#9A3412" strokeWidth="0.8" fill="none" />
      <path d="M117 103 Q120 106 123 103" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M110 106 Q120 102 130 106 L134 145 L106 145 Z" fill="#EA580C" />
      <rect x="98" y="108" width="10" height="24" rx="3" fill="#1E3A8A" />
      <line x1="138" y1="90" x2="138" y2="150" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
      <path d="M138 90 L152 96 L138 102 Z" fill="#22C55E" />
    </svg>
  );
}

// 10. Beach & Lake Vacations
function BeachLakeArt() {
  return (
    <svg viewBox="0 0 240 170" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <circle cx="180" cy="50" r="24" fill="#FDE047" />
      <path d="M20 148 Q28 85 12 50" stroke="#78350F" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M12 50 Q-5 40 -12 55" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M12 50 Q35 35 45 48" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M0 135 Q60 125 120 135 T240 135" stroke="#38BDF8" strokeWidth="3" fill="none" />
      <ellipse cx="120" cy="154" rx="95" ry="10" fill="#FEF08A" />

      {/* Relaxing Beach Traveler with Sunglasses */}
      <circle cx="120" cy="95" r="11" fill="#FED7AA" />
      <ellipse cx="120" cy="87" rx="16" ry="4" fill="#FBBF24" />
      <rect x="114" y="93" width="5.5" height="4" rx="1" fill="#0F172A" />
      <rect x="121" y="93" width="5.5" height="4" rx="1" fill="#0F172A" />
      <path d="M117 101 Q120 104 123 101" stroke="#9A3412" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M110 106 Q120 102 130 106 L134 142 L106 142 Z" fill="#F43F5E" />
      <path d="M152 70 Q164 105 158 145 L146 145 Q152 105 144 70 Q148 60 152 70 Z" fill="#0D9488" stroke="#115E59" strokeWidth="1.5" />
    </svg>
  );
}

// 11. Weekend Tours Getaway
function WeekendArt() {
  return (
    <svg viewBox="0 0 240 170" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="120" cy="148" rx="85" ry="12" fill="#E2E8F0" />
      <rect x="55" y="98" width="80" height="32" rx="6" fill="#3B82F6" />
      <rect x="62" y="80" width="66" height="20" rx="3" fill="#E0F2FE" stroke="#1E293B" strokeWidth="2" />
      <circle cx="75" cy="132" r="12" fill="#1E293B" />
      <circle cx="75" cy="132" r="5" fill="#CBD5E1" />
      <circle cx="118" cy="132" r="12" fill="#1E293B" />
      <circle cx="118" cy="132" r="5" fill="#CBD5E1" />
      <rect x="72" y="70" width="22" height="12" rx="3" fill="#F59E0B" />
      <rect x="96" y="73" width="18" height="9" rx="2" fill="#10B981" />
      <circle cx="80" cy="74" r="8" fill="#FED7AA" />
      <circle cx="78" cy="73" r="1" fill="#1C1917" />
      <circle cx="83" cy="73" r="1" fill="#1C1917" />
      <path d="M78 77 Q81 79 84 77" stroke="#9A3412" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <rect x="160" y="80" width="36" height="24" rx="4" fill="#16A34A" />
      <text x="165" y="96" fill="#FFF" fontSize="8" fontWeight="bold">WEEKEND</text>
      <line x1="178" y1="104" x2="178" y2="148" stroke="#64748B" strokeWidth="3" />
    </svg>
  );
}

// 12. Culinary & Food Flavors Tour
function CulinaryArt() {
  return (
    <svg viewBox="0 0 240 170" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="120" cy="148" rx="85" ry="12" fill="#FEF3C7" />
      <circle cx="120" cy="68" r="13" fill="#FED7AA" />
      <circle cx="120" cy="38" r="16" fill="#FFF" stroke="#CBD5E1" strokeWidth="1.5" />
      <circle cx="106" cy="42" r="12" fill="#FFF" stroke="#CBD5E1" strokeWidth="1.5" />
      <circle cx="134" cy="42" r="12" fill="#FFF" stroke="#CBD5E1" strokeWidth="1.5" />
      <rect x="106" y="48" width="28" height="10" fill="#FFF" stroke="#CBD5E1" strokeWidth="1.5" />
      <circle cx="116" cy="66" r="1.2" fill="#1C1917" />
      <circle cx="124" cy="66" r="1.2" fill="#1C1917" />
      <path d="M120 68 L120 71 L121.5 71.5" stroke="#9A3412" strokeWidth="0.8" fill="none" />
      <path d="M114 73 Q120 76 126 73" stroke="#1C1917" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M117 76 Q120 78 123 76" stroke="#DC2626" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M106 82 Q120 78 134 82 L138 125 L102 125 Z" fill="#DC2626" />
      <ellipse cx="120" cy="136" rx="42" ry="10" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
      <circle cx="105" cy="134" r="5" fill="#EA580C" />
      <circle cx="120" cy="133" r="5" fill="#F59E0B" />
      <circle cx="135" cy="134" r="5" fill="#16A34A" />
      <path d="M112 115 Q108 102 114 92" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M120 112 Q125 100 118 90" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M128 115 Q124 102 130 92" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function resolveExperienceTheme(title: string): ExperienceThemeConfig {
  const t = title.toLowerCase();

  // 1. Taj Mahal & Golden Triangle
  if (/taj\s*mahal|taj|golden\s*triangle/.test(t)) {
    return {
      icon: <Landmark size={18} className="text-[#F8904D]" />,
      illustration: <TajMahalArt />,
      tag: "Iconic Monument",
      tagColor: "bg-orange-50 text-orange-600 border-orange-200",
      bgGradient: "from-orange-50/80 via-amber-50/40 to-white",
      ctaText: "Explore Heritage",
    };
  }

  // 2. Heritage & Culture (Kathak Classical Dance)
  if (/heritage|culture|cultural|monument|historical/.test(t)) {
    return {
      icon: <Sparkles size={18} className="text-[#E11D48]" />,
      illustration: <KathakDanceArt />,
      tag: "Classical & Heritage",
      tagColor: "bg-rose-50 text-rose-700 border-rose-200",
      bgGradient: "from-rose-50/80 via-amber-50/30 to-white",
      ctaText: "Explore Culture",
    };
  }

  // 3. Family Vacations
  if (/family|group|kids|friends/.test(t)) {
    return {
      icon: <Users size={18} className="text-[#0284C7]" />,
      illustration: <FamilyBeachArt />,
      tag: "Fun for Everyone",
      tagColor: "bg-sky-50 text-sky-700 border-sky-200",
      bgGradient: "from-sky-50/80 via-blue-50/30 to-white",
      ctaText: "Explore Family",
    };
  }

  // 4. Wildlife Safari
  if (/wildlife|safari|tiger|jungle|national\s*park/.test(t)) {
    return {
      icon: <Trees size={18} className="text-[#65A30D]" />,
      illustration: <WildlifeSafariArt />,
      tag: "Jungle & Wildlife",
      tagColor: "bg-lime-50 text-lime-700 border-lime-200",
      bgGradient: "from-lime-50/80 via-green-50/30 to-white",
      ctaText: "Explore Wildlife",
    };
  }

  // 5. Honeymoon & Romance
  if (/honeymoon|couple|romance|romantic/.test(t)) {
    return {
      icon: <Heart size={18} className="text-[#E11D48]" />,
      illustration: <HoneymoonArt />,
      tag: "Romantic Getaway",
      tagColor: "bg-rose-50 text-rose-600 border-rose-200",
      bgGradient: "from-rose-50/80 via-pink-50/40 to-white",
      ctaText: "Explore Honeymoon",
    };
  }

  // 6. Ayurveda & Yoga
  if (/ayurveda|yoga|wellness|meditation|spa/.test(t)) {
    return {
      icon: <Flower2 size={18} className="text-[#0D9488]" />,
      illustration: <YogaArt />,
      tag: "Mind & Body Retreat",
      tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      bgGradient: "from-emerald-50/80 via-teal-50/40 to-white",
      ctaText: "Explore Wellness",
    };
  }

  // 7. Spiritual & Pilgrimage (Multi-Faith)
  if (/spiritual|temple|pilgrim|sacred|ghat|darshan/.test(t)) {
    return {
      icon: <Sparkles size={18} className="text-[#D97706]" />,
      illustration: <SpiritualArt />,
      tag: "Sacred Journeys",
      tagColor: "bg-amber-50 text-amber-700 border-amber-200",
      bgGradient: "from-amber-50/80 via-yellow-50/40 to-white",
      ctaText: "Explore Spiritual",
    };
  }

  // 8. Desert Safari
  if (/desert|thar|sam\s*dunes|camel/.test(t)) {
    return {
      icon: <Sun size={18} className="text-[#D97706]" />,
      illustration: <DesertSafariArt />,
      tag: "Golden Dunes",
      tagColor: "bg-amber-50 text-amber-800 border-amber-200",
      bgGradient: "from-amber-50/80 via-orange-50/40 to-white",
      ctaText: "Explore Desert",
    };
  }

  // 9. Hill Station & Mountain Nature
  if (/hill\s*station|mountain|himalaya|trek|snow/.test(t)) {
    return {
      icon: <Mountain size={18} className="text-[#0284C7]" />,
      illustration: <HillStationArt />,
      tag: "Mountain Escapes",
      tagColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
      bgGradient: "from-cyan-50/80 via-sky-50/40 to-white",
      ctaText: "Explore Mountains",
    };
  }

  // 10. Beach & Lake
  if (/beach|lake|sea|coastal|island|backwater/.test(t)) {
    return {
      icon: <Waves size={18} className="text-[#0284C7]" />,
      illustration: <BeachLakeArt />,
      tag: "Sun & Beach",
      tagColor: "bg-sky-50 text-sky-700 border-sky-200",
      bgGradient: "from-sky-50/80 via-cyan-50/40 to-white",
      ctaText: "Explore Beach",
    };
  }

  // 11. Weekend Tours
  if (/weekend|getaway|short\s*trip/.test(t)) {
    return {
      icon: <Car size={18} className="text-[#3B82F6]" />,
      illustration: <WeekendArt />,
      tag: "Quick Getaway",
      tagColor: "bg-blue-50 text-blue-700 border-blue-200",
      bgGradient: "from-blue-50/80 via-indigo-50/40 to-white",
      ctaText: "Explore Weekend",
    };
  }

  // 12. Culinary & Food
  if (/culinary|food|cooking|dining|flavor/.test(t)) {
    return {
      icon: <UtensilsCrossed size={18} className="text-[#EA580C]" />,
      illustration: <CulinaryArt />,
      tag: "Food & Flavors",
      tagColor: "bg-orange-50 text-orange-700 border-orange-200",
      bgGradient: "from-orange-50/80 via-amber-50/40 to-white",
      ctaText: "Explore Flavors",
    };
  }

  // 13. General Nature & Outdoors / Fallback
  return {
    icon: <Compass size={18} className="text-[#F8904D]" />,
    illustration: <HillStationArt />,
    tag: "Trending Style",
    tagColor: "bg-orange-50 text-orange-600 border-orange-200",
    bgGradient: "from-orange-50/70 via-slate-50/30 to-white",
    ctaText: "Explore Style",
  };
}
