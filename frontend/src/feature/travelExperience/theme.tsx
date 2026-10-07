import React from "react";
import {
  Heart,
  Landmark,
  Flower2,
  Mountain,
  Waves,
  Compass,
  Sparkles,
  Camera,
  Users,
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
function TajMahalCartoon() {
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
        <linearGradient id="tajPlinth" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#E2E8F0" />
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

      {/* Sky Aura & Sun Glow */}
      <circle cx="120" cy="72" r="50" fill="url(#tajSky)" />
      <circle cx="120" cy="72" r="32" fill="#FEF3C7" opacity="0.4" />

      {/* Birds */}
      <path d="M42 38 Q47 32 52 38 Q57 32 62 38" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" fill="none" />
      <path d="M182 42 Q186 37 190 42 Q194 37 198 42" stroke="#F59E0B" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <path d="M56 49 Q59 45 62 49 Q65 45 68 49" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Red Sandstone Base Terrace */}
      <rect x="18" y="132" width="204" height="6" rx="1.5" fill="#D97706" opacity="0.8" />
      <rect x="26" y="126" width="188" height="6" rx="1" fill="url(#tajPlinth)" stroke="#CBD5E1" strokeWidth="0.8" />

      {/* Reflecting Pool & Water Ripples */}
      <ellipse cx="120" cy="152" rx="88" ry="10" fill="url(#tajWater)" />
      <path d="M75 151 Q120 148 165 151" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M92 156 Q120 154 148 156" stroke="#7DD3FC" strokeWidth="1.2" strokeLinecap="round" />

      {/* Far Left Outer Minaret */}
      <rect x="30" y="52" width="8.5" height="74" fill="url(#tajMinaret)" stroke="#94A3B8" strokeWidth="0.8" />
      <rect x="28" y="74" width="12.5" height="3" rx="0.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.6" />
      <rect x="28" y="98" width="12.5" height="3" rx="0.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.6" />
      {/* Chattri Dome & Spire */}
      <rect x="27.5" y="47" width="13.5" height="5" rx="1" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.6" />
      <path d="M34.25 35 Q30 43 30 47 L38.5 47 Q38.5 43 34.25 35 Z" fill="url(#tajDomeGrad)" stroke="#64748B" strokeWidth="0.8" />
      <line x1="34.25" y1="28" x2="34.25" y2="35" stroke="url(#tajGold)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="34.25" cy="27" r="1.2" fill="#EAB308" />

      {/* Far Right Outer Minaret */}
      <rect x="201.5" y="52" width="8.5" height="74" fill="url(#tajMinaret)" stroke="#94A3B8" strokeWidth="0.8" />
      <rect x="199.5" y="74" width="12.5" height="3" rx="0.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.6" />
      <rect x="199.5" y="98" width="12.5" height="3" rx="0.5" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.6" />
      {/* Chattri Dome & Spire */}
      <rect x="199" y="47" width="13.5" height="5" rx="1" fill="#E2E8F0" stroke="#64748B" strokeWidth="0.6" />
      <path d="M205.75 35 Q201.5 43 201.5 47 L210 47 Q210 43 205.75 35 Z" fill="url(#tajDomeGrad)" stroke="#64748B" strokeWidth="0.8" />
      <line x1="205.75" y1="28" x2="205.75" y2="35" stroke="url(#tajGold)" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="205.75" cy="27" r="1.2" fill="#EAB308" />

      {/* Main Monument Structure (Central Marble Body) */}
      <path d="M58 126 L58 74 L68 70 L172 70 L182 74 L182 126 Z" fill="url(#tajMarbleMain)" stroke="#94A3B8" strokeWidth="1" />

      {/* Left Outer Wing / Chamfer Corner */}
      <rect x="58" y="74" width="24" height="52" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.6" />
      {/* Left Upper Alcove */}
      <path d="M63 80 L63 94 Q70 88 77 94 L77 80 Z" fill="#334155" />
      {/* Left Lower Alcove */}
      <path d="M63 102 L63 120 Q70 114 77 120 L77 102 Z" fill="#334155" />

      {/* Right Outer Wing / Chamfer Corner */}
      <rect x="158" y="74" width="24" height="52" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="0.6" />
      {/* Right Upper Alcove */}
      <path d="M163 80 L163 94 Q170 88 177 94 L177 80 Z" fill="#334155" />
      {/* Right Lower Alcove */}
      <path d="M163 102 L163 120 Q170 114 177 120 L177 102 Z" fill="#334155" />

      {/* Left Intermediate Chattri Dome */}
      <rect x="76" y="60" width="16" height="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
      <path d="M84 46 Q76 54 76 60 L92 60 Q92 54 84 46 Z" fill="url(#tajDomeGrad)" stroke="#64748B" strokeWidth="0.8" />
      <line x1="84" y1="40" x2="84" y2="46" stroke="url(#tajGold)" strokeWidth="1.2" />

      {/* Right Intermediate Chattri Dome */}
      <rect x="148" y="60" width="16" height="10" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
      <path d="M156 46 Q148 54 148 60 L164 60 Q164 54 156 46 Z" fill="url(#tajDomeGrad)" stroke="#64748B" strokeWidth="0.8" />
      <line x1="156" y1="40" x2="156" y2="46" stroke="url(#tajGold)" strokeWidth="1.2" />

      {/* Central Majestic Onion Dome (Realistic Bulbous Shape & Lotus Finial) */}
      {/* Dome Drum Base */}
      <rect x="98" y="60" width="44" height="12" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.8" />
      {/* Onion Dome Curves */}
      <path
        d="M120 16 C96 36 90 48 90 60 L150 60 C150 48 144 36 120 16 Z"
        fill="url(#tajDomeGrad)"
        stroke="#64748B"
        strokeWidth="1.2"
      />
      {/* Dome Highlight Flare */}
      <path d="M112 26 C104 36 102 46 102 54" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      {/* Crown Lotus & Gold Finial / Spire with Crescent */}
      <path d="M116 16 Q120 10 124 16 Z" fill="url(#tajGold)" />
      <line x1="120" y1="4" x2="120" y2="16" stroke="url(#tajGold)" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="120" cy="3" r="2" fill="#EAB308" />
      <path d="M117 7 L123 7" stroke="#CA8A04" strokeWidth="1.5" />

      {/* Central Grand Pishtaq (Massive Arch Gateway with Calligraphy frame) */}
      <rect x="88" y="70" width="64" height="56" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
      <path d="M96 126 L96 90 Q120 68 144 90 L144 126 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="1.2" />
      {/* Deep Vault Inner Arch & Golden Entrance Door */}
      <path d="M102 126 L102 98 Q120 82 138 98 L138 126 Z" fill="#0F172A" />
      <path d="M108 126 L108 106 Q120 96 132 106 L132 126 Z" fill="#78350F" stroke="#D97706" strokeWidth="0.8" />

      {/* Realistic Shadow Reflection on Water */}
      <ellipse cx="120" cy="144" rx="42" ry="4" fill="#64748B" opacity="0.15" />
    </svg>
  );
}

// 2. Realistic Ayurveda & Yoga (Lotus Yogi with Sacred Aura)
function YogaCartoon() {
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

      {/* Glowing Zen Aura */}
      <circle cx="120" cy="80" r="54" fill="url(#yogaAura)" />
      <circle cx="120" cy="80" r="42" stroke="#10B981" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5" />
      <circle cx="120" cy="80" r="28" fill="#ECFDF5" />

      {/* Floating Zen Bamboo & Leaves */}
      <path d="M52 65 Q70 58 60 85 Q50 82 52 65 Z" fill="#10B981" opacity="0.8" />
      <path d="M188 55 Q205 62 195 85 Q185 80 188 55 Z" fill="#059669" opacity="0.8" />
      <circle cx="68" cy="50" r="2" fill="#34D399" />
      <circle cx="175" cy="48" r="2.5" fill="#34D399" />

      {/* Yogi Character Head & Bun */}
      <circle cx="120" cy="52" r="14" fill="#FED7AA" />
      <circle cx="120" cy="36" r="7" fill="#3D2918" />
      <path d="M108 50 Q120 40 132 50 Q134 42 120 41 Q106 42 108 50 Z" fill="#3D2918" />
      {/* Peaceful Face */}
      <path d="M114 53 Q117 56 120 53" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M122 53 Q125 56 128 53" stroke="#9A3412" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M118 59 Q120 61 122 59" stroke="#9A3412" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Body & Clothes */}
      <path d="M106 68 Q120 62 134 68 L138 98 L102 98 Z" fill="#0D9488" />
      {/* Mudra Arms */}
      <path d="M106 72 L86 88 L104 94" stroke="#0D9488" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M134 72 L154 88 L136 94" stroke="#0D9488" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="86" cy="88" r="4.5" fill="#FED7AA" />
      <circle cx="154" cy="88" r="4.5" fill="#FED7AA" />
      {/* Crossed Legs in Padmasana */}
      <path d="M82 106 Q120 90 158 106 Q120 120 82 106 Z" fill="#115E59" />

      {/* Sacred Glowing Lotus Flower at Base */}
      <path d="M120 125 Q95 110 70 125 Q95 145 120 125 Z" fill="url(#lotusGrad)" />
      <path d="M120 125 Q145 110 170 125 Q145 145 120 125 Z" fill="url(#lotusGrad)" />
      <path d="M120 118 Q105 100 120 90 Q135 100 120 118 Z" fill="#FB7185" />
      <path d="M120 134 Q90 122 60 138 Q90 154 120 134 Z" fill="#E11D48" opacity="0.6" />
      <path d="M120 134 Q150 122 180 138 Q150 154 120 134 Z" fill="#E11D48" opacity="0.6" />
    </svg>
  );
}

// 3. Realistic Wildlife & Bengal Tiger Safari
function WildlifeCartoon() {
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

      {/* Jungle Grass & Tree Canopy */}
      <path d="M15 145 Q35 70 75 115 Q60 55 105 105 Q90 145 90 145 Z" fill="url(#jungleGrad)" opacity="0.35" />
      <path d="M225 145 Q205 65 165 115 Q185 55 140 105 Q150 145 150 145 Z" fill="url(#jungleGrad)" opacity="0.35" />
      <ellipse cx="120" cy="148" rx="85" ry="12" fill="#ECFCCB" />

      {/* Safari 4x4 Jeep */}
      <rect x="42" y="94" width="86" height="38" rx="6" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
      <rect x="48" y="74" width="74" height="24" rx="3" fill="#E0F2FE" stroke="#334155" strokeWidth="2.5" />
      <line x1="85" y1="74" x2="85" y2="98" stroke="#334155" strokeWidth="2.5" />
      {/* Rugged Offroad Tires */}
      <circle cx="62" cy="134" r="14" fill="#1E293B" />
      <circle cx="62" cy="134" r="6" fill="#94A3B8" />
      <circle cx="110" cy="134" r="14" fill="#1E293B" />
      <circle cx="110" cy="134" r="6" fill="#94A3B8" />
      {/* Explorer with Safari Hat & Binoculars */}
      <circle cx="70" cy="62" r="10" fill="#FED7AA" />
      <path d="M60 55 L80 55 L77 47 L63 47 Z" fill="#CA8A04" />
      <ellipse cx="70" cy="55" rx="14" ry="3" fill="#CA8A04" />
      <rect x="66" y="61" width="12" height="6" rx="2" fill="#0F172A" />
      <circle cx="69" cy="64" r="2.5" fill="#38BDF8" />
      <circle cx="75" cy="64" r="2.5" fill="#38BDF8" />

      {/* Royal Bengal Tiger Face / Silhouette */}
      <circle cx="172" cy="98" r="24" fill="url(#tigerGrad)" stroke="#C2410C" strokeWidth="1" />
      {/* Tiger Ears */}
      <circle cx="156" cy="80" r="7" fill="#C2410C" />
      <circle cx="156" cy="80" r="4" fill="#FED7AA" />
      <circle cx="188" cy="80" r="7" fill="#C2410C" />
      <circle cx="188" cy="80" r="4" fill="#FED7AA" />
      {/* White Cheeks */}
      <ellipse cx="162" cy="106" rx="8" ry="6" fill="#FFF7ED" />
      <ellipse cx="182" cy="106" rx="8" ry="6" fill="#FFF7ED" />
      {/* Tiger Stripes */}
      <path d="M172 78 L172 86 M168 82 L176 82" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M152 94 L160 96 M152 102 L160 102 M192 94 L184 96 M192 102 L184 102" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      {/* Tiger Glowing Eyes */}
      <ellipse cx="164" cy="95" rx="3.5" ry="4" fill="#FACC15" />
      <circle cx="164" cy="95" r="2" fill="#000" />
      <ellipse cx="180" cy="95" rx="3.5" ry="4" fill="#FACC15" />
      <circle cx="180" cy="95" r="2" fill="#000" />
      {/* Nose & Whiskers */}
      <path d="M169 104 L175 104 L172 108 Z" fill="#E11D48" />
      <path d="M155 108 L142 106 M155 112 L140 114 M189 108 L202 106 M189 112 L204 114" stroke="#475569" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

// 4. Realistic Honeymoon & Romance (Couples Sunset Toast)
function HoneymoonCartoon() {
  return (
    <svg viewBox="0 0 240 170" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sunsetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="50%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>

      {/* Glowing Sunset Sun */}
      <circle cx="120" cy="74" r="46" fill="url(#sunsetGrad)" opacity="0.3" />
      <circle cx="120" cy="74" r="30" fill="url(#sunsetGrad)" />

      {/* Floating Glowing Hearts */}
      <path d="M120 40 C120 28, 104 22, 104 36 C104 48, 120 62, 120 62 C120 62, 136 48, 136 36 C136 22, 120 28, 120 40 Z" fill="#E11D48" />
      <path d="M152 46 C152 38, 142 34, 142 42 C142 50, 152 58, 152 58 C152 58, 162 50, 162 42 C162 34, 152 38, 152 46 Z" fill="#F43F5E" opacity="0.8" />

      {/* Ground Beach Shadow */}
      <ellipse cx="120" cy="148" rx="80" ry="12" fill="#FFE4E6" />

      {/* Male Partner */}
      <circle cx="100" cy="80" r="13" fill="#FED7AA" />
      <path d="M88 76 Q100 66 112 76 Q114 70 100 68 Q86 70 88 76 Z" fill="#292524" />
      <path d="M88 94 Q100 88 112 94 L115 138 L85 138 Z" fill="#1E3A8A" />

      {/* Female Partner */}
      <circle cx="140" cy="82" r="12" fill="#FED7AA" />
      <path d="M128 78 Q140 68 152 78 Q156 92 152 100 Q146 82 140 80 Q134 82 128 100 Q124 92 128 78 Z" fill="#78350F" />
      <path d="M128 95 Q140 90 152 95 L156 138 L124 138 Z" fill="#BE185D" />

      {/* Toasting Cocktail Glasses & Sparkles */}
      <path d="M112 108 L120 100 L128 108" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="120" cy="94" r="3" fill="#FDE047" />
      <circle cx="82" cy="55" r="2.5" fill="#FB7185" />
      <circle cx="162" cy="60" r="2.5" fill="#FB7185" />
    </svg>
  );
}

// 5. Realistic Spiritual & Ghat Aarti (Varanasi Diya & Temple Dome)
function SpiritualCartoon() {
  return (
    <svg viewBox="0 0 240 170" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="divineSun" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="diyaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>

      {/* Sacred Divine Aura */}
      <circle cx="120" cy="74" r="50" fill="#FEF3C7" opacity="0.6" />
      <circle cx="120" cy="74" r="34" fill="url(#divineSun)" opacity="0.3" />

      {/* Temple Shikhara Silhouettes */}
      <path d="M85 135 L85 90 Q120 45 155 90 L155 135 Z" fill="#FDE68A" opacity="0.6" />
      <path d="M120 38 L120 54" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
      <path d="M120 38 L134 45 L120 52 Z" fill="#EA580C" />

      {/* Hanging Temple Brass Bells */}
      <line x1="56" y1="45" x2="56" y2="78" stroke="#78716C" strokeWidth="1.8" />
      <path d="M48 78 Q56 70 64 78 L66 90 L46 90 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
      <line x1="184" y1="45" x2="184" y2="78" stroke="#78716C" strokeWidth="1.8" />
      <path d="M176 78 Q184 70 192 78 L194 90 L174 90 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />

      {/* Golden Illuminated Brass Diya (Ganga Aarti Lamp) */}
      <ellipse cx="120" cy="120" rx="46" ry="12" fill="#B45309" />
      <path d="M74 120 Q120 152 166 120 Q120 135 74 120 Z" fill="url(#diyaGrad)" />
      {/* Sacred Flame */}
      <path d="M120 72 Q106 98 120 118 Q134 98 120 72 Z" fill="#DC2626" />
      <path d="M120 82 Q112 100 120 114 Q128 100 120 82 Z" fill="#FDE047" />
      <circle cx="120" cy="100" r="4" fill="#FFFFFF" />
    </svg>
  );
}

// 6. Realistic Family & Group Vacations
function FamilyCartoon() {
  return (
    <svg viewBox="0 0 240 170" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="120" cy="148" rx="85" ry="12" fill="#E0F2FE" />
      {/* Hot Air Balloon in Sky */}
      <circle cx="180" cy="40" r="16" fill="#F59E0B" />
      <path d="M180 56 L177 60 L183 60 Z" fill="#B45309" />
      <path d="M180 60 Q172 75 162 90" stroke="#94A3B8" strokeWidth="1.2" fill="none" />

      {/* Parent 1 (Left) */}
      <circle cx="75" cy="74" r="12" fill="#FED7AA" />
      <path d="M63 70 Q75 60 87 70 Q89 65 75 63 Q61 65 63 70 Z" fill="#292524" />
      <path d="M65 88 Q75 82 85 88 L90 132 L60 132 Z" fill="#0D9488" />
      <rect x="50" y="86" width="14" height="26" rx="4" fill="#EA580C" />

      {/* Happy Child in Middle */}
      <circle cx="120" cy="84" r="10" fill="#FED7AA" />
      <path d="M110 80 Q120 73 130 80 Q132 75 120 73 Q108 75 110 80 Z" fill="#78350F" />
      <path d="M112 95 Q120 91 128 95 L132 126 L108 126 Z" fill="#F97316" />
      <path d="M112 98 L98 86 M128 98 L142 86" stroke="#FED7AA" strokeWidth="4" strokeLinecap="round" />

      {/* Parent 2 (Right) */}
      <circle cx="160" cy="72" r="12" fill="#FED7AA" />
      <path d="M148 68 Q160 58 172 68 Q176 82 172 90 Q166 74 160 72 Q154 74 148 90 Z" fill="#581C87" />
      <path d="M150 86 Q160 80 170 86 L175 132 L145 132 Z" fill="#7C3AED" />
      <rect x="172" y="104" width="16" height="20" rx="3" fill="#16A34A" />
      <rect x="42" y="110" width="15" height="18" rx="3" fill="#0284C7" />
    </svg>
  );
}


// 7. Beach & Coastal Vacations (Surfer / Relaxing by Coconut Palm)
function BeachCartoon() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full max-h-[135px]" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="142" rx="72" ry="12" fill="#FFF3D6" />
      {/* Sun */}
      <circle cx="150" cy="45" r="18" fill="#FFC53D" />
      {/* Ocean Waves */}
      <path d="M25 130 Q50 120 75 130 T125 130 T175 130" stroke="#40A9FF" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M40 140 Q65 132 90 140 T140 140 T190 140" stroke="#69C0FF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Palm Tree */}
      <path d="M50 138 Q56 85 40 60" stroke="#874D00" strokeWidth="4.5" strokeLinecap="round" fill="none" />
      <path d="M40 60 Q20 50 10 65" stroke="#52C41A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M40 60 Q45 40 30 35" stroke="#52C41A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M40 60 Q65 45 75 58" stroke="#73D13D" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <circle cx="38" cy="62" r="3" fill="#D48806" />
      <circle cx="43" cy="64" r="3" fill="#D48806" />
      {/* Surfer / Beach Traveler */}
      <circle cx="112" cy="74" r="11" fill="#FFDCB8" />
      <path d="M102 70 Q112 60 122 70 Q124 64 112 63 Q100 64 102 70 Z" fill="#3D2918" />
      {/* Sun Hat */}
      <ellipse cx="112" cy="65" rx="17" ry="4" fill="#FFD666" />
      <path d="M103 65 Q112 55 121 65 Z" fill="#FFD666" />
      {/* Body */}
      <path d="M104 86 Q112 82 120 86 L124 125 L100 125 Z" fill="#FF7A45" />
      {/* Surfboard */}
      <path d="M136 60 Q146 95 140 136 L130 136 Q134 95 128 60 Q132 50 136 60 Z" fill="#13C2C2" stroke="#08979C" strokeWidth="1.5" />
      <path d="M134 65 L132 130" stroke="#FFF" strokeWidth="1.5" strokeDasharray="4 3" />
    </svg>
  );
}

// 8. General Adventure & Mountain Explorers
function AdventureCartoon() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full max-h-[135px]" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="142" rx="72" ry="12" fill="#E6F7FF" />
      {/* Mountains */}
      <path d="M30 135 L80 60 L130 135 Z" fill="#91D5FF" />
      <path d="M80 60 L68 78 L80 84 L92 78 Z" fill="#FFF" />
      <path d="M90 135 L140 45 L190 135 Z" fill="#40A9FF" />
      <path d="M140 45 L126 68 L140 75 L154 68 Z" fill="#FFF" />
      {/* Compass / Sun */}
      <circle cx="50" cy="45" r="16" fill="#FFF566" />
      {/* Hiker with Flag on Summit */}
      <circle cx="138" cy="32" r="6" fill="#FFDCB8" />
      <path d="M134 38 L142 38 L144 58 L132 58 Z" fill="#FF4D4F" />
      <line x1="144" y1="28" x2="144" y2="58" stroke="#1F1F1F" strokeWidth="1.5" />
      <path d="M144 28 L154 33 L144 38 Z" fill="#52C41A" />
    </svg>
  );
}

// 9. Culinary & Food Tours
function CulinaryCartoon() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full max-h-[135px]" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="142" rx="72" ry="12" fill="#FFF2E8" />
      {/* Chef Hat */}
      <circle cx="100" cy="48" r="16" fill="#FFF" stroke="#D9D9D9" strokeWidth="1.5" />
      <circle cx="86" cy="52" r="12" fill="#FFF" stroke="#D9D9D9" strokeWidth="1.5" />
      <circle cx="114" cy="52" r="12" fill="#FFF" stroke="#D9D9D9" strokeWidth="1.5" />
      <rect x="86" y="58" width="28" height="10" fill="#FFF" stroke="#D9D9D9" strokeWidth="1.5" />
      {/* Chef Character */}
      <circle cx="100" cy="74" r="11" fill="#FFDCB8" />
      <path d="M92 78 Q100 84 108 78" stroke="#874D00" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Chef Coat */}
      <path d="M88 88 Q100 84 112 88 L116 130 L84 130 Z" fill="#FA541C" />
      {/* Steaming Cloche Dish */}
      <ellipse cx="100" cy="132" rx="34" ry="8" fill="#D9D9D9" />
      <path d="M72 132 Q100 100 128 132 Z" fill="#FFA940" />
      <circle cx="100" cy="100" r="4" fill="#D46B08" />
      {/* Steam Wisps */}
      <path d="M92 94 Q90 86 94 80" stroke="#FF7A45" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M100 92 Q103 84 99 78" stroke="#FF7A45" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M108 94 Q106 86 110 80" stroke="#FF7A45" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function resolveExperienceTheme(title: string): ExperienceThemeConfig {
  const t = title.toLowerCase();

  if (/honeymoon|couple|romance/.test(t)) {
    return {
      icon: <Heart size={18} className="text-[#FF4D6D]" />,
      illustration: <HoneymoonCartoon />,
      tag: "Romantic Getaway",
      tagColor: "bg-rose-50 text-rose-600 border-rose-200",
      bgGradient: "from-rose-50/70 via-pink-50/30 to-white",
      ctaText: "Explore Honeymoon",
    };
  }
  if (/heritage|culture|historical|monument|taj|golden triangle/.test(t)) {
    return {
      icon: <Landmark size={18} className="text-[#F8904D]" />,
      illustration: <TajMahalCartoon />,
      tag: "Iconic Heritage",
      tagColor: "bg-orange-50 text-orange-600 border-orange-200",
      bgGradient: "from-orange-50/70 via-amber-50/30 to-white",
      ctaText: "Explore Heritage",
    };
  }
  if (/ayurveda|yoga|wellness|spa|meditation/.test(t)) {
    return {
      icon: <Flower2 size={18} className="text-[#2E8B8B]" />,
      illustration: <YogaCartoon />,
      tag: "Mind & Body Retreat",
      tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      bgGradient: "from-emerald-50/70 via-teal-50/30 to-white",
      ctaText: "Explore Wellness",
    };
  }
  if (/nature|wildlife|safari|tiger|jungle/.test(t)) {
    return {
      icon: <Mountain size={18} className="text-[#52C41A]" />,
      illustration: <WildlifeCartoon />,
      tag: "Jungle & Wildlife",
      tagColor: "bg-lime-50 text-lime-700 border-lime-200",
      bgGradient: "from-lime-50/70 via-green-50/30 to-white",
      ctaText: "Explore Safari",
    };
  }
  if (/spiritual|temple|pilgrim|ghat|sacred/.test(t)) {
    return {
      icon: <Sparkles size={18} className="text-[#D46B08]" />,
      illustration: <SpiritualCartoon />,
      tag: "Sacred Journeys",
      tagColor: "bg-amber-50 text-amber-700 border-amber-200",
      bgGradient: "from-amber-50/70 via-yellow-50/30 to-white",
      ctaText: "Explore Spiritual",
    };
  }
  if (/family|group|kids|friends/.test(t)) {
    return {
      icon: <Users size={18} className="text-[#1890FF]" />,
      illustration: <FamilyCartoon />,
      tag: "Fun for Everyone",
      tagColor: "bg-sky-50 text-sky-700 border-sky-200",
      bgGradient: "from-sky-50/70 via-blue-50/30 to-white",
      ctaText: "Explore Family",
    };
  }
  if (/beach|coastal|island|sea|lake|backwater/.test(t)) {
    return {
      icon: <Waves size={18} className="text-[#13C2C2]" />,
      illustration: <BeachCartoon />,
      tag: "Sun & Beach",
      tagColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
      bgGradient: "from-cyan-50/70 via-teal-50/30 to-white",
      ctaText: "Explore Beach",
    };
  }
  if (/culinary|food|cooking|dining|flavors/.test(t)) {
    return {
      icon: <Compass size={18} className="text-[#FA541C]" />,
      illustration: <CulinaryCartoon />,
      tag: "Food & Flavors",
      tagColor: "bg-orange-50 text-orange-700 border-orange-200",
      bgGradient: "from-orange-50/70 via-amber-50/30 to-white",
      ctaText: "Explore Flavors",
    };
  }

  return {
    icon: <Compass size={18} className="text-[#F8904D]" />,
    illustration: <AdventureCartoon />,
    tag: "Trending Style",
    tagColor: "bg-orange-50 text-orange-600 border-orange-200",
    bgGradient: "from-orange-50/60 via-slate-50/30 to-white",
    ctaText: "Explore Style",
  };
}


