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

// 1. Taj Mahal & Monuments (Explorer with Camera & Monument)
function TajMahalCartoon() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="140" rx="75" ry="12" fill="#FFE8DC" />
      <path d="M50 135 L50 80 Q50 70 60 70 L140 70 Q150 70 150 80 L150 135 Z" fill="#FFF3EC" stroke="#F8904D" strokeWidth="2.5" />
      <path d="M100 28 Q80 50 80 70 L120 70 Q120 50 100 28 Z" fill="#FFA56E" stroke="#E06820" strokeWidth="2" />
      <path d="M62 48 Q50 62 50 70 L74 70 Q74 62 62 48 Z" fill="#FFC9A8" stroke="#E06820" strokeWidth="1.5" />
      <path d="M138 48 Q150 62 150 70 L126 70 Q126 62 138 48 Z" fill="#FFC9A8" stroke="#E06820" strokeWidth="1.5" />
      <path d="M88 135 L88 100 Q100 88 112 100 L112 135 Z" fill="#E06820" />
      {/* Cartoon Explorer Character */}
      <circle cx="145" cy="98" r="14" fill="#FFDCB8" />
      <path d="M136 93 Q145 83 154 93 Q156 86 145 84 Q134 86 136 93 Z" fill="#5C3B1E" />
      <ellipse cx="145" cy="85" rx="16" ry="4" fill="#E89B38" />
      <path d="M135 85 Q145 74 155 85 Z" fill="#E89B38" stroke="#B87314" strokeWidth="1.5" />
      {/* Body */}
      <path d="M133 112 Q145 106 157 112 L160 142 L130 142 Z" fill="#2E8B8B" />
      {/* Camera */}
      <rect x="136" y="114" width="18" height="13" rx="3" fill="#222" />
      <circle cx="145" cy="120" r="4.5" fill="#50E3C2" stroke="#FFF" strokeWidth="1" />
      <circle cx="151" cy="116" r="1.5" fill="#F8904D" />
      {/* Sparkles & Birds */}
      <path d="M35 45 Q40 40 45 45 Q50 40 55 45" stroke="#F8904D" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M25 60 Q28 56 31 60 Q34 56 37 60" stroke="#F8904D" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="168" cy="45" r="3" fill="#F8904D" />
      <path d="M168 36 L168 54 M159 45 L177 45" stroke="#FFA56E" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// 2. Ayurveda & Yoga (Meditating Yogi with Lotus & Floating Leaves)
function YogaCartoon() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="142" rx="70" ry="12" fill="#E6F7F2" />
      {/* Aura Circles */}
      <circle cx="100" cy="85" r="46" fill="#F0FBF7" stroke="#B2EBD9" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="100" cy="85" r="32" fill="#D2F6EA" />
      {/* Meditating Character */}
      <circle cx="100" cy="56" r="14" fill="#FFDCB8" />
      {/* Hair Bun */}
      <circle cx="100" cy="41" r="7" fill="#3D2918" />
      <path d="M89 54 Q100 45 111 54 Q113 47 100 46 Q87 47 89 54 Z" fill="#3D2918" />
      {/* Peaceful Face (Closed Eyes & Smile) */}
      <path d="M94 57 Q97 60 100 57" stroke="#8A5A36" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M102 57 Q105 60 108 57" stroke="#8A5A36" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M98 63 Q100 65 102 63" stroke="#8A5A36" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Body in Lotus */}
      <path d="M88 70 Q100 66 112 70 L115 96 L85 96 Z" fill="#2E8B8B" />
      {/* Arms in Namaste / Gyan Mudra */}
      <path d="M88 74 L70 88 L85 92" stroke="#2E8B8B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M112 74 L130 88 L115 92" stroke="#2E8B8B" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="70" cy="88" r="4" fill="#FFDCB8" />
      <circle cx="130" cy="88" r="4" fill="#FFDCB8" />
      {/* Crossed Legs */}
      <path d="M68 102 Q100 88 132 102 Q100 114 68 102 Z" fill="#247070" />
      {/* Giant Lotus Petals */}
      <path d="M100 118 Q80 106 60 118 Q80 134 100 118 Z" fill="#FF8BA7" />
      <path d="M100 118 Q120 106 140 118 Q120 134 100 118 Z" fill="#FF8BA7" />
      <path d="M100 112 Q88 98 100 88 Q112 98 100 112 Z" fill="#FFB8C6" />
      {/* Floating Zen Leaves */}
      <path d="M42 58 Q55 52 48 70 Q40 68 42 58 Z" fill="#52C41A" />
      <path d="M155 50 Q168 56 160 70 Q150 64 155 50 Z" fill="#73D13D" />
    </svg>
  );
}

// 3. Wildlife & Jungle Safari (Jeep & Tiger / Safari Explorer)
function WildlifeCartoon() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="142" rx="75" ry="12" fill="#EAF3DE" />
      {/* Jungle foliage */}
      <path d="M20 135 Q35 70 65 110 Q50 60 85 100 Q75 135 75 135 Z" fill="#7CB305" opacity="0.3" />
      <path d="M180 135 Q165 70 135 110 Q150 60 115 100 Q125 135 125 135 Z" fill="#52C41A" opacity="0.3" />
      {/* Safari Jeep */}
      <rect x="52" y="96" width="76" height="34" rx="6" fill="#F8904D" />
      <rect x="58" y="78" width="64" height="20" rx="3" fill="#E6F7FF" stroke="#333" strokeWidth="2.5" />
      <line x1="90" y1="78" x2="90" y2="98" stroke="#333" strokeWidth="2.5" />
      {/* Wheels */}
      <circle cx="68" cy="130" r="13" fill="#262626" />
      <circle cx="68" cy="130" r="5" fill="#8C8C8C" />
      <circle cx="112" cy="130" r="13" fill="#262626" />
      <circle cx="112" cy="130" r="5" fill="#8C8C8C" />
      {/* Safari Explorer Character in Jeep */}
      <circle cx="76" cy="68" r="9" fill="#FFDCB8" />
      <path d="M68 62 L84 62 L81 55 L71 55 Z" fill="#D48806" />
      <ellipse cx="76" cy="62" rx="12" ry="2.5" fill="#D48806" />
      {/* Binoculars */}
      <rect x="73" y="67" width="10" height="5" rx="2" fill="#1F1F1F" />
      <circle cx="75" cy="69.5" r="2.5" fill="#40A9FF" />
      <circle cx="81" cy="69.5" r="2.5" fill="#40A9FF" />
      {/* Playful Tiger Face / Tracks */}
      <circle cx="148" cy="98" r="16" fill="#FA8C16" />
      <circle cx="136" cy="86" r="5" fill="#D46B08" />
      <circle cx="160" cy="86" r="5" fill="#D46B08" />
      <path d="M142 96 L144 99 L140 99 Z M154 96 L156 99 L152 99 Z" fill="#1F1F1F" />
      <ellipse cx="148" cy="104" rx="4" ry="2.5" fill="#1F1F1F" />
      <path d="M136 100 L130 99 M136 104 L128 105 M160 100 L166 99 M160 104 L168 105" stroke="#1F1F1F" strokeWidth="1.5" />
    </svg>
  );
}

// 4. Honeymoon & Romance (Happy Couple with Hearts & Sunset)
function HoneymoonCartoon() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="142" rx="72" ry="12" fill="#FFE8EC" />
      {/* Sunset Glow */}
      <circle cx="100" cy="78" r="44" fill="#FFF0F5" stroke="#FFB6C1" strokeWidth="2" strokeDasharray="5 5" />
      <circle cx="100" cy="78" r="30" fill="#FFD6E0" />
      {/* Floating Big Heart */}
      <path d="M100 48 C100 38, 86 32, 86 44 C86 54, 100 66, 100 66 C100 66, 114 54, 114 44 C114 32, 100 38, 100 48 Z" fill="#FF4D6D" />
      {/* Male Character */}
      <circle cx="84" cy="82" r="12" fill="#FFDCB8" />
      <path d="M74 78 Q84 69 94 78 Q96 73 84 71 Q72 73 74 78 Z" fill="#43281C" />
      <path d="M74 94 Q84 90 94 94 L96 135 L72 135 Z" fill="#3D5A80" />
      {/* Female Character */}
      <circle cx="116" cy="84" r="11" fill="#FFDCB8" />
      <path d="M106 80 Q116 71 126 80 Q130 92 127 100 Q122 84 116 82 Q110 84 105 100 Q102 92 106 80 Z" fill="#9C6644" />
      <path d="M106 95 Q116 91 126 95 L129 135 L103 135 Z" fill="#FF758F" />
      {/* Glasses / Toasting Sparkles */}
      <path d="M92 108 L100 102 L108 108" stroke="#FFD166" strokeWidth="2" strokeLinecap="round" />
      <circle cx="70" cy="55" r="2.5" fill="#FF758F" />
      <circle cx="132" cy="58" r="3.5" fill="#FF758F" />
      <circle cx="145" cy="42" r="2" fill="#FF4D6D" />
    </svg>
  );
}

// 5. Spiritual & Pilgrimage (Temple Diya, Bells & Divine Aura)
function SpiritualCartoon() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="142" rx="72" ry="12" fill="#FFF4DE" />
      {/* Sun / Divine Aura */}
      <circle cx="100" cy="80" r="42" fill="#FFF9EC" stroke="#FADB14" strokeWidth="2" strokeDasharray="6 4" />
      <circle cx="100" cy="80" r="28" fill="#FFE58F" />
      {/* Temple Dome Silhouette in background */}
      <path d="M75 135 L75 95 Q100 60 125 95 L125 135 Z" fill="#FFD591" opacity="0.6" />
      <path d="M100 52 L100 68" stroke="#D46B08" strokeWidth="3" strokeLinecap="round" />
      <path d="M100 52 L112 58 L100 64 Z" fill="#FA541C" />
      {/* Giant Golden Diya (Lamp) in Foreground */}
      <ellipse cx="100" cy="116" rx="36" ry="10" fill="#D46B08" />
      <path d="M64 116 Q100 142 136 116 Q100 128 64 116 Z" fill="#FA8C16" />
      {/* Diya Flame */}
      <path d="M100 78 Q90 98 100 114 Q110 98 100 78 Z" fill="#FF4D4F" />
      <path d="M100 86 Q94 100 100 112 Q106 100 100 86 Z" fill="#FFEC3D" />
      {/* Temple Hanging Bells */}
      <path d="M48 60 L48 85 M152 60 L152 85" stroke="#8C8C8C" strokeWidth="1.5" />
      <path d="M42 85 Q48 78 54 85 L56 94 L40 94 Z" fill="#FAAD14" stroke="#D48806" strokeWidth="1.5" />
      <path d="M146 85 Q152 78 158 85 L160 94 L144 94 Z" fill="#FAAD14" stroke="#D48806" strokeWidth="1.5" />
    </svg>
  );
}

// 6. Family & Group Vacations (Happy Group / Characters Running with bags - Klook Style!)
function FamilyCartoon() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="142" rx="76" ry="12" fill="#E6F7FF" />
      {/* Yellow Balloon */}
      <circle cx="152" cy="46" r="14" fill="#FFC53D" />
      <path d="M152 60 L150 63 L154 63 Z" fill="#D48806" />
      <path d="M152 63 Q146 76 138 90" stroke="#8C8C8C" strokeWidth="1.2" fill="none" />
      {/* Parent 1 (Left - Running with Travel Backpack) */}
      <circle cx="62" cy="76" r="11" fill="#FFDCB8" />
      <path d="M52 72 Q62 64 72 72 Q74 68 62 66 Q50 68 52 72 Z" fill="#3D2918" />
      <path d="M54 87 Q62 83 70 87 L74 125 L50 125 Z" fill="#13C2C2" />
      {/* Backpack */}
      <rect x="42" y="86" width="12" height="22" rx="4" fill="#FA8C16" />
      {/* Child in Middle (Jumping with Joy!) */}
      <circle cx="100" cy="85" r="9" fill="#FFDCB8" />
      <path d="M92 82 Q100 76 108 82 Q110 78 100 76 Q90 78 92 82 Z" fill="#874D00" />
      <path d="M93 94 Q100 91 107 94 L110 120 L90 120 Z" fill="#FF7A45" />
      <path d="M93 96 L82 86 M107 96 L118 86" stroke="#FFDCB8" strokeWidth="3.5" strokeLinecap="round" />
      {/* Parent 2 (Right - Running with Shopping / Beach Bag) */}
      <circle cx="134" cy="74" r="11" fill="#FFDCB8" />
      <path d="M124 70 Q134 62 144 70 Q148 84 144 92 Q140 76 134 74 Q128 76 124 92 Z" fill="#78350F" />
      <path d="M126 85 Q134 81 142 85 L146 125 L122 125 Z" fill="#722ED1" />
      {/* Colorful Shopping / Travel Bags */}
      <rect x="144" y="102" width="14" height="18" rx="3" fill="#52C41A" />
      <path d="M148 102 Q151 96 154 102" stroke="#237804" strokeWidth="1.5" fill="none" />
      <rect x="36" y="106" width="13" height="15" rx="3" fill="#1890FF" />
    </svg>
  );
}

// 7. General Adventure & Mountain Explorers
function AdventureCartoon() {
  return (
    <svg viewBox="0 0 200 160" fill="none" className="w-full h-full max-h-[140px]" xmlns="http://www.w3.org/2000/svg">
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

  return {
    icon: <Compass size={18} className="text-[#F8904D]" />,
    illustration: <AdventureCartoon />,
    tag: "Trending Style",
    tagColor: "bg-orange-50 text-orange-600 border-orange-200",
    bgGradient: "from-orange-50/60 via-slate-50/30 to-white",
    ctaText: "Explore Style",
  };
}

