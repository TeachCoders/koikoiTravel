"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { 
  Train, 
  Sparkles, 
  Check, 
  Plus, 
  Minus, 
  MessageCircle, 
  Clock, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  ArrowRight,
  ExternalLink
} from "lucide-react";

export default function LuxuryTrainHomeView() {
  const WHATSAPP_URL =
    "https://wa.me/919136739178?text=Hi%20KoiKoi%20Travel%2C%20I%20want%20to%20inquire%20about%20a%20luxury%20train%20journey.";

  // Accordion state for FAQs
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const trains = [
    {
      id: "palace-on-wheels",
      slug: "palace-on-wheels",
      name: "Palace on Wheels",
      badge: "Rajasthan & Agra",
      subtitle: "India's first luxury train, since 1982",
      description:
        "A week through the land of kings: forts, palaces, lakes and desert, ending at the Taj Mahal.",
      gradientClass: "from-[#7a2e3a] via-[#94424e] to-[#c9973b]",
      image: "/images/luxury-trains/palace-on-wheels/hero.jpg",
      facts: [
        { label: "Duration", value: "7 Nights / 8 Days" },
        {
          label: "Route",
          value:
            "Delhi · Jaipur · Ranthambore · Chittorgarh · Udaipur · Jaisalmer · Jodhpur · Bharatpur · Agra",
        },
        { label: "Best season", value: "October to March" },
      ],
      sublinks: [
        { label: "Itinerary", href: "/luxury-trains/palace-on-wheels/itinerary" },
        { label: "Departures", href: "/luxury-trains/palace-on-wheels/departures" },
        { label: "Price", href: "/luxury-trains/palace-on-wheels/price" },
        { label: "Cabins", href: "/luxury-trains/palace-on-wheels/cabins" },
        { label: "Photo Gallery", href: "/luxury-trains/palace-on-wheels/photo-gallery" },
        { label: "Overview", href: "/luxury-trains/palace-on-wheels" },
      ],
    },
    {
      id: "maharajas-express",
      slug: "maharajas-express",
      name: "Maharajas' Express",
      badge: "North, West & Central India",
      subtitle: "4 journeys · 23 coaches · 4 cabin types",
      description:
        "The most varied train: pick a short 4-day trip or a full week through Rajasthan, Orchha, Khajuraho and Varanasi.",
      gradientClass: "from-[#1c2f5a] via-[#2d477e] to-[#8c6bb1]",
      image: "/images/luxury-trains/maharajas-express/hero.jpg",
      facts: [
        { label: "Duration", value: "3N / 4D or 6N / 7D" },
        {
          label: "Journeys",
          value:
            "Treasures of India · Indian Panorama · Indian Splendour · Heritage of India",
        },
        { label: "Best season", value: "October to April" },
      ],
      sublinks: [
        { label: "Itinerary", href: "/luxury-trains/maharajas-express/itinerary" },
        { label: "Departures", href: "/luxury-trains/maharajas-express/departures" },
        { label: "Price", href: "/luxury-trains/maharajas-express/price" },
        { label: "Cabins", href: "/luxury-trains/maharajas-express/cabins" },
        { label: "Photo Gallery", href: "/luxury-trains/maharajas-express/photo-gallery" },
        { label: "Overview", href: "/luxury-trains/maharajas-express" },
      ],
    },
    {
      id: "golden-chariot",
      slug: "golden-chariot",
      name: "Golden Chariot",
      badge: "South India",
      subtitle: "South India's luxury train",
      description:
        "Mysore palaces, Hampi ruins, Bandipur wildlife and the beaches of Goa, all starting from Bengaluru.",
      gradientClass: "from-[#1f5a46] via-[#2c775e] to-[#d9b64a]",
      image: "/images/luxury-trains/golden-chariot/hero.jpg",
      facts: [
        { label: "Duration", value: "3N / 4D or 5N / 6D" },
        {
          label: "Journeys",
          value: "Glimpses of Karnataka · Pride of Karnataka · Jewels of South",
        },
        { label: "Best season", value: "October to March" },
      ],
      sublinks: [
        { label: "Itinerary", href: "/luxury-trains/golden-chariot/itinerary" },
        { label: "Departures", href: "/luxury-trains/golden-chariot/departures" },
        { label: "Price", href: "/luxury-trains/golden-chariot/price" },
        { label: "Cabins", href: "/luxury-trains/golden-chariot/cabins" },
        { label: "Photo Gallery", href: "/luxury-trains/golden-chariot/photo-gallery" },
        { label: "Overview", href: "/luxury-trains/golden-chariot" },
      ],
    },
    {
      id: "deccan-odyssey",
      slug: "deccan-odyssey",
      name: "Deccan Odyssey",
      badge: "Maharashtra, Rajasthan & Gujarat",
      subtitle: "Six 7-night journeys",
      description:
        "Ajanta and Ellora caves, Goa, Udaipur, the Golden Triangle and even Tadoba tiger country, on one train.",
      gradientClass: "from-[#16465f] via-[#235f80] to-[#c4683a]",
      image: "/images/luxury-trains/deccan-odyssey/hero.jpg",
      facts: [
        { label: "Duration", value: "7 Nights / 8 Days" },
        {
          label: "Journeys",
          value:
            "Maharashtra Splendour · Wild Trail · Indian Odyssey · Indian Sojourn · Cultural Odyssey · Heritage Odyssey",
        },
        { label: "Best season", value: "September to May" },
      ],
      sublinks: [
        { label: "Itinerary", href: "/luxury-trains/deccan-odyssey/itinerary" },
        { label: "Departures", href: "/luxury-trains/deccan-odyssey/departures" },
        { label: "Price", href: "/luxury-trains/deccan-odyssey/price" },
        { label: "Cabins", href: "/luxury-trains/deccan-odyssey/cabins" },
        { label: "Photo Gallery", href: "/luxury-trains/deccan-odyssey/photo-gallery" },
        { label: "Overview", href: "/luxury-trains/deccan-odyssey" },
      ],
    },
  ];

  const compareRows = [
    {
      train: "Palace on Wheels",
      slug: "palace-on-wheels",
      region: "Rajasthan & Agra",
      journeys: "1 Classic Circuit",
      duration: "7N / 8D",
      season: "Sep – Apr (Peak: Oct–Mar)",
      startsFrom: "Delhi",
      departures: "Every Wednesday",
      datesPreview: "Oct: 01, 08, 15, 22, 29 · Nov: 05, 12, 19, 26 · Dec: 03, 10, 17, 24, 31",
    },
    {
      train: "Maharajas' Express",
      slug: "maharajas-express",
      region: "Rajasthan, Central & North India",
      journeys: "4 Distinct Circuits",
      duration: "3N / 4D or 6N / 7D",
      season: "Oct – Apr",
      startsFrom: "Delhi or Mumbai",
      departures: "Selected Weekends",
      datesPreview: "Heritage: 11 Oct, 08 Nov · Panorama: 25 Oct, 22 Nov · Splendour: 18 Oct, 15 Nov",
    },
    {
      train: "The Golden Chariot",
      slug: "golden-chariot",
      region: "Karnataka, Goa, Kerala, TN",
      journeys: "3 Southern Circuits",
      duration: "3N / 4D or 5N / 6D",
      season: "Oct – Mar",
      startsFrom: "Bengaluru",
      departures: "Alternate Saturdays",
      datesPreview: "Pride: 18 Oct, 15 Nov, 13 Dec · Jewels: 01 Nov, 29 Nov · Glimpses: 08 Nov, 06 Dec",
    },
    {
      train: "Deccan Odyssey",
      slug: "deccan-odyssey",
      region: "Maharashtra, Gujarat, Rajasthan",
      journeys: "6 Western Circuits",
      duration: "7N / 8D",
      season: "Sep – May",
      startsFrom: "Mumbai or Delhi",
      departures: "Selected Saturdays",
      datesPreview: "Maharashtra Splendour: 04 Oct, 01 Nov · Indian Odyssey: 18 Oct, 15 Nov",
    },
  ];

  const whyChooseUs = [
    {
      img: "https://koikoitravel.com/images/why-choose-us/designer-v5.jpg",
      title: "Right Train, Right Dates",
      desc: "Your personal travel designer matches the train and journey to your dates, group and budget, so you do not have to read four websites.",
    },
    {
      img: "https://koikoitravel.com/images/why-choose-us/storyteller-v5.jpg",
      title: "Local Storytellers",
      desc: "Add a private guide or a stay in Delhi, Agra or Jaipur before and after your train, with stories you will not find in a guidebook.",
    },
    {
      img: "https://koikoitravel.com/images/why-choose-us/driver-v5.jpg",
      title: "Private Car & Transfers",
      desc: "Airport pickups and a private car at your own pace, so every link in the trip connects.",
    },
    {
      img: "https://koikoitravel.com/images/why-choose-us/support-v5.jpg",
      title: "24/7 WhatsApp Support",
      desc: "One trip manager on WhatsApp from your first message until you are back home.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Tell Us Your Plan",
      desc: "Share your dates, number of guests and the type of cabin you like. Rough ideas are fine.",
    },
    {
      num: "02",
      title: "Get Your Custom Quote",
      desc: "We send train options, departure dates and a clear quote on WhatsApp and email within 12–24 hours.",
    },
    {
      num: "03",
      title: "Board & Enjoy",
      desc: "We confirm your cabin and arrange everything else. You just arrive and enjoy the ride.",
    },
  ];

  const faqs = [
    {
      question: "Which is the best luxury train in India?",
      answer:
        "It depends on what you want to see. Palace on Wheels is best for Rajasthan and the Taj Mahal. Maharajas' Express has the most journey choices. Golden Chariot covers South India. Deccan Odyssey mixes Maharashtra, Rajasthan and Gujarat. Message us and we will suggest one.",
    },
    {
      question: "When do the luxury trains run?",
      answer:
        "Most run in the cooler months, roughly September or October to March or April. Exact departure dates change every season, so each train page lists the current dates.",
    },
    {
      question: "How much does a luxury train journey cost?",
      answer:
        "The price depends on the train, journey, cabin type and travel dates. We do not publish a fixed price here. Send us your dates and we will share a clear quote.",
    },
    {
      question: "What is included on board?",
      answer:
        "In general, your cabin, meals, sightseeing with a guide and on-board service are part of the journey. Inclusions differ by train, so please check the train page or ask us for the exact list.",
    },
    {
      question: "Can you add hotels, flights or a private tour?",
      answer:
        "Yes. We can add a hotel before or after your train, airport transfers, domestic flights and a private tour to any other part of India.",
    },
    {
      question: "Can children travel on these trains?",
      answer:
        "Rules are different for each train. Palace on Wheels, for example, treats guests up to 12 years as children. Tell us who is travelling and we will confirm the policy for your train.",
    },
  ];

  return (
    <div className="text-slate-800 bg-white font-sans antialiased">
      {/* 1. HERO SECTION */}
      <section
        className="relative text-white py-20 sm:py-24 lg:py-28 overflow-hidden bg-[#091b2c]"
        style={{
          backgroundImage:
            "linear-gradient(105deg, rgba(9,27,44,0.92) 0%, rgba(9,27,44,0.70) 55%, rgba(9,27,44,0.35) 100%), url('https://koikoitravel.com/hero-banners/tajmahal-1820x600-desktop.webp')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <span className="inline-flex items-center gap-2 border border-white/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5 text-white/90 bg-black/40 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F8904D] shadow-[0_0_8px_#F8904D]"></span>
            <span>Curated Heritage Rail Journeys</span>
          </span>

          <div className="text-3xl sm:text-5xl lg:text-6xl font-outfit font-bold text-white max-w-4xl leading-[1.1] mb-4 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
            <span className="block">Travel India, </span>
            <span className="block">like Royalty</span>
          </div>

          <p className="max-w-2xl text-base sm:text-lg text-white/90 mb-7 leading-relaxed font-normal">
            Bespoke luxury rail journeys across India, crafted with personalized pre and post-tour extensions.
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href="#trains"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F8904D] hover:bg-[#e07b3b] text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95"
            >
              <span>Explore the 4 Trains</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <QuoteModal>
              <button
                type="button"
                className="inline-block px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#0f172a] font-bold text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-md hover:scale-105 active:scale-95"
              >
                Plan My Journey
              </button>
            </QuoteModal>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-sm sm:text-base transition-all shadow-md hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* DEDICATED SEO & EDITORIAL SECTION (BELOW HERO - FULL WIDTH) */}
      <section className="bg-[#faf8f5] border-y border-[#eee7de] py-14 sm:py-16 md:py-20 relative">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="w-full">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F8904D]/10 border border-[#F8904D]/30 text-[#d96b27] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#F8904D]" />
              <span>Independent Travel Curator</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-outfit font-bold text-[#0f172a] tracking-tight leading-tight mb-3">
              <span className="text-[#F8904D]">Luxury Train Journeys in India</span>: Royal Rail Holidays
            </h1>

            <p className="text-base sm:text-lg font-semibold text-slate-800 mb-4 leading-snug">
              Explore India aboard 4 iconic luxury trains &mdash; with private airport transfers, 5-star heritage hotels, and personalized trip planning by{" "}
              <span className="text-[#F8904D]">KoiKoi Travel</span>.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
              A luxury train journey is the most relaxing and royal way to experience India. Instead of repacking bags and rushing for flights every morning, your 5-star private hotel travels with you on rails. Enjoy private ensuite cabins, gourmet dining cars, panoramic lounge bars, and daily guided sightseeing to world-famous palaces, desert dunes, and tiger reserves.
            </p>

            {/* Transparent Advisory Notice */}
            <div className="bg-[#faf5eb] border border-[#ebd9b8] rounded-xl p-4 sm:p-5 mb-6 text-xs sm:text-sm text-[#553f0c] leading-relaxed">
              <strong className="text-[#0f172a] block font-bold mb-1 text-sm sm:text-base">
                Important Advisory &middot; Independent Booking &amp; Tour Support
              </strong>
              India&apos;s luxury trains are government-operated by state rail corporations and tourism boards (IRCTC, RTDC, KSTDC, and MTDC). While train tickets only cover the train journey from station to station, <strong>KoiKoi Travel designs your entire vacation</strong>: booking your ideal cabin, reserving pre- and post-tour 5-star heritage stays in Delhi or Mumbai, providing private chauffeured luxury airport transfers, and giving you dedicated 24/7 personal WhatsApp support throughout your holiday.
            </div>

            {/* Quick 4 Trains Cards */}
            <h2 className="text-xl sm:text-2xl font-bold font-outfit text-[#0f172a] mb-4">
              Which Luxury Train Is Best for You?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white border border-[#eee7de] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <h3 className="font-outfit font-bold text-base text-[#0f172a]">1. Palace on Wheels</h3>
                  <span className="text-xs font-semibold text-[#F8904D]">7 Nights / 8 Days</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-1.5 leading-relaxed">
                  <strong className="text-slate-900 font-semibold">Route:</strong> Delhi &rarr; Jaipur &rarr; Ranthambore (Tiger Safari) &rarr; Udaipur &rarr; Jaisalmer &rarr; Jodhpur &rarr; Agra (Taj Mahal) &rarr; Delhi
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900 font-semibold">Best for:</strong> First-time visitors to India who want the classic royal Rajasthan, desert dunes, and Taj Mahal experience.
                </p>
              </div>

              <div className="bg-white border border-[#eee7de] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <h3 className="font-outfit font-bold text-base text-[#0f172a]">2. Maharajas&apos; Express</h3>
                  <span className="text-xs font-semibold text-[#F8904D]">3 Nights to 6 Nights</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-1.5 leading-relaxed">
                  <strong className="text-slate-900 font-semibold">Route:</strong> 4 flexible circuits across Rajasthan, Agra, Khajuraho temples, and the sacred river ghats of Varanasi.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900 font-semibold">Best for:</strong> Travelers looking for highest-tier modern luxury, spacious suites, and flexible shorter 4-day or 7-day trips.
                </p>
              </div>

              <div className="bg-white border border-[#eee7de] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <h3 className="font-outfit font-bold text-base text-[#0f172a]">3. The Golden Chariot</h3>
                  <span className="text-xs font-semibold text-[#F8904D]">3 Nights to 5 Nights</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-1.5 leading-relaxed">
                  <strong className="text-slate-900 font-semibold">Route:</strong> Bengaluru &rarr; Bandipur Safari &rarr; Mysore Palaces &rarr; Hampi UNESCO Ruins &rarr; Goa Beaches
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900 font-semibold">Best for:</strong> Travelers wanting to discover South India&apos;s ancient temples, rich nature, and tropical beaches.
                </p>
              </div>

              <div className="bg-white border border-[#eee7de] rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <h3 className="font-outfit font-bold text-base text-[#0f172a]">4. Deccan Odyssey</h3>
                  <span className="text-xs font-semibold text-[#F8904D]">7 Nights / 8 Days</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mb-1.5 leading-relaxed">
                  <strong className="text-slate-900 font-semibold">Route:</strong> 6 distinct journeys through Maharashtra, Gujarat, and Rajasthan, including Ajanta &amp; Ellora caves and Nashik wine country.
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-900 font-semibold">Best for:</strong> History and art lovers who want to explore Western India&apos;s world-famous cave architecture.
                </p>
              </div>
            </div>

            <div className="border-l-4 border-[#F8904D] bg-white p-4 rounded-r-xl shadow-sm text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
              &ldquo;A train ticket only takes you from station to station. KoiKoi Travel takes care of your entire vacation &mdash; from the moment you land at the airport until you fly back home safely.&rdquo;
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
              <a
                href="#trains"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F8904D] hover:bg-[#e07b3b] text-white font-semibold text-xs sm:text-sm transition-all shadow-md hover:scale-105 active:scale-95 font-outfit"
              >
                <span>Explore All 4 Trains Below</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Talk to a Specialist on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CHOOSE YOUR TRAIN - 4 CARDS */}
      <section id="trains" className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0f172a] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F8904D]"></span>
              <span>Choose Your Train</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-[#0f172a] mb-3">
              India&apos;s Luxury Trains
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Each train has its own route, season and style. Open any train to see its itinerary, departure dates, price, cabins and photos.
            </p>
          </div>

          {/* Grid of 4 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trains.map((train) => (
              <article
                key={train.id}
                id={train.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#eee7de] flex flex-col justify-between"
              >
                {/* Photo / Header Banner */}
                <div
                  className={`h-80 sm:h-96 md:h-[420px] relative flex items-end p-6 text-white bg-gradient-to-br ${train.gradientClass}`}
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.12), rgba(0,0,0,0.26)), url('${train.image}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <span className="bg-black/60 backdrop-blur-sm px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white">
                    {train.badge}
                  </span>
                  <div className="absolute top-5 right-5 w-[72px] h-[72px] bg-white rounded-full overflow-hidden flex items-center justify-center p-[5px] border-[2.5px] border-[#F8904D] shadow-[0_6px_18px_rgba(0,0,0,0.25)] z-10 transition-transform duration-200 hover:scale-105">
                    <img
                      src={`/images/luxury-trains/${train.slug}/logo.png`}
                      alt={`${train.name} Logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-outfit text-2xl font-bold text-[#0f172a] mb-1">
                      {train.name}
                    </h3>
                    <div className="text-[#F8904D] font-semibold text-xs sm:text-sm uppercase tracking-wide mb-3">
                      {train.subtitle}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-5">
                      {train.description}
                    </p>

                    {/* Facts List */}
                    <ul className="border-t border-[#eee7de] mb-6">
                      {train.facts.map((fact, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex justify-between gap-4 py-2.5 border-b border-[#eee7de] text-xs sm:text-sm"
                        >
                          <span className="text-slate-500">{fact.label}</span>
                          <span className="text-right font-semibold text-[#0f172a] max-w-[65%]">
                            {fact.value}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Subpage Quick Links */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {train.sublinks.map((link, lIdx) => (
                        <Link
                          key={lIdx}
                          href={link.href}
                          className="w-full block text-center text-xs font-semibold py-2.5 px-1 border border-[#eee7de] rounded-lg text-[#0f172a] bg-[#faf8f5] hover:bg-[#F8904D] hover:text-white hover:border-[#F8904D] transition-all cursor-pointer font-outfit"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Main Train CTA */}
                  <Link
                    href={`/luxury-trains/${train.slug}`}
                    className="w-full block text-center py-3.5 px-6 rounded-full bg-[#F8904D] hover:bg-[#e07b3b] text-white font-bold text-sm transition-all duration-200 cursor-pointer shadow-md hover:scale-[1.02] active:scale-95 font-outfit"
                  >
                    View {train.name}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. QUICK COMPARE & OFFICIAL DEPARTURE SCHEDULE */}
      <section id="compare" className="py-16 sm:py-20 bg-[#faf8f5] border-y border-[#eee7de]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0f172a] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F8904D]"></span>
              <span>Quick Compare &amp; Departure Schedule</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-[#0f172a] mb-3">
              Which Train Is Right for You?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Compare regions, durations, operating seasons, and official upcoming departure schedules for all 4 luxury trains in India.
            </p>
          </div>

          {/* Responsive Comparison Table */}
          <div className="overflow-x-auto rounded-2xl shadow-sm bg-white border border-[#eee7de]">
            <table className="w-full border-collapse min-w-[860px] text-sm text-left">
              <thead>
                <tr className="bg-[#0f172a] text-white text-xs uppercase tracking-wider font-outfit">
                  <th className="py-3.5 px-5 font-bold">Train</th>
                  <th className="py-3.5 px-5 font-bold">Region</th>
                  <th className="py-3.5 px-5 font-bold">Journeys &amp; Duration</th>
                  <th className="py-3.5 px-5 font-bold">Season</th>
                  <th className="py-3.5 px-5 font-bold">Official Departures</th>
                  <th className="py-3.5 px-5 font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eee7de]">
                {compareRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-[#0f172a]">{row.train}</div>
                      <div className="text-xs text-slate-500 font-normal">Starts: {row.startsFrom}</div>
                    </td>
                    <td className="py-4 px-5 text-slate-700">{row.region}</td>
                    <td className="py-4 px-5 text-slate-700">
                      <div>{row.journeys}</div>
                      <span className="text-xs font-semibold text-[#F8904D]">{row.duration}</span>
                    </td>
                    <td className="py-4 px-5 text-slate-700">{row.season}</td>
                    <td className="py-4 px-5 text-slate-700">
                      <strong className="text-slate-900 block font-semibold">{row.departures}</strong>
                      <div className="text-xs text-slate-500 mt-0.5">{row.datesPreview}</div>
                    </td>
                    <td className="py-4 px-5 whitespace-nowrap">
                      <Link
                        href={`/luxury-trains/${row.slug}/departures`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#F8904D] hover:text-[#e07b3b] hover:underline font-outfit"
                      >
                        <span>Full Calendar</span>
                        <span>&rarr;</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Responsive Official Departure Dates Cards */}
          <div className="mt-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h3 className="text-2xl font-bold font-outfit text-[#0f172a]">
                  Official 2025–2026 Departure Calendars
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Verified official dates by train. Peak winter departures (October to February) book out early.
                </p>
              </div>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs sm:text-sm transition-all shadow-sm font-outfit shrink-0"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Inquire Live Dates on WhatsApp</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1: Palace on Wheels */}
              <div className="bg-white border border-[#eee7de] rounded-2xl p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 flex-wrap gap-2">
                  <h4 className="font-outfit font-bold text-lg text-[#0f172a]">Palace on Wheels</h4>
                  <span className="text-xs font-semibold text-[#F8904D] bg-[#F8904D]/10 px-3 py-1 rounded-full border border-[#F8904D]/25">
                    Departs Every Wednesday
                  </span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-6 flex-1">
                  <li className="pb-2.5 border-b border-dashed border-slate-100">
                    <strong className="text-slate-900 block font-semibold mb-0.5">Operating Season &amp; Route</strong>
                    September to April &middot; 7 Nights / 8 Days circular journey starting &amp; ending in Delhi (Safdarjung Station).
                  </li>
                  <li className="pb-2.5 border-b border-dashed border-slate-100">
                    <strong className="text-slate-900 block font-semibold mb-0.5">2025–2026 Peak Departure Dates</strong>
                    Oct: 01, 08, 15, 22, 29 &middot; Nov: 05, 12, 19, 26 &middot; Dec: 03, 10, 17, 24, 31 (Holiday Gala) &middot; Jan: 07, 14, 21, 28 &middot; Feb: 04, 11, 18, 25 &middot; Mar: 04, 11, 18, 25
                  </li>
                  <li>
                    <strong className="text-slate-900 block font-semibold mb-0.5">Lean Season Dates (Special Lower Tariff)</strong>
                    September 2025: 03, 10, 17, 24 Sep &middot; April 2026: 01, 08, 15, 22, 29 Apr
                  </li>
                </ul>
                <div className="pt-4 border-t border-[#eee7de] flex items-center justify-between text-xs font-semibold font-outfit mt-auto">
                  <Link href="/luxury-trains/palace-on-wheels/departures" className="text-[#F8904D] hover:underline">
                    View Official Schedule &rarr;
                  </Link>
                  <Link href="/luxury-trains/palace-on-wheels/price" className="text-slate-500 hover:text-slate-900">
                    Check Tariffs &rarr;
                  </Link>
                </div>
              </div>

              {/* Card 2: Maharajas' Express */}
              <div className="bg-white border border-[#eee7de] rounded-2xl p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 flex-wrap gap-2">
                  <h4 className="font-outfit font-bold text-lg text-[#0f172a]">Maharajas&apos; Express</h4>
                  <span className="text-xs font-semibold text-[#F8904D] bg-[#F8904D]/10 px-3 py-1 rounded-full border border-[#F8904D]/25">
                    4 Distinct Circuits
                  </span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-6 flex-1">
                  <li className="pb-2.5 border-b border-dashed border-slate-100">
                    <strong className="text-slate-900 block font-semibold mb-0.5">The Heritage of India (6N / 7D &middot; Mumbai to Delhi)</strong>
                    11 Oct, 08 Nov, 06 Dec 2025 &middot; 03 Jan, 31 Jan, 28 Feb 2026
                  </li>
                  <li className="pb-2.5 border-b border-dashed border-slate-100">
                    <strong className="text-slate-900 block font-semibold mb-0.5">The Indian Panorama (6N / 7D &middot; Delhi to Delhi)</strong>
                    25 Oct, 22 Nov, 20 Dec 2025 &middot; 17 Jan, 14 Feb, 14 Mar 2026
                  </li>
                  <li className="pb-2.5 border-b border-dashed border-slate-100">
                    <strong className="text-slate-900 block font-semibold mb-0.5">The Indian Splendour (6N / 7D &middot; Delhi to Mumbai)</strong>
                    18 Oct, 15 Nov, 13 Dec 2025 &middot; 10 Jan, 07 Feb, 07 Mar 2026
                  </li>
                  <li>
                    <strong className="text-slate-900 block font-semibold mb-0.5">Treasures of India (3N / 4D Golden Triangle)</strong>
                    02 Nov, 30 Nov, 28 Dec 2025 &middot; 25 Jan, 22 Feb, 22 Mar 2026
                  </li>
                </ul>
                <div className="pt-4 border-t border-[#eee7de] flex items-center justify-between text-xs font-semibold font-outfit mt-auto">
                  <Link href="/luxury-trains/maharajas-express/departures" className="text-[#F8904D] hover:underline">
                    View Official Schedule &rarr;
                  </Link>
                  <Link href="/luxury-trains/maharajas-express/price" className="text-slate-500 hover:text-slate-900">
                    Check Tariffs &rarr;
                  </Link>
                </div>
              </div>

              {/* Card 3: The Golden Chariot */}
              <div className="bg-white border border-[#eee7de] rounded-2xl p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 flex-wrap gap-2">
                  <h4 className="font-outfit font-bold text-lg text-[#0f172a]">The Golden Chariot</h4>
                  <span className="text-xs font-semibold text-[#F8904D] bg-[#F8904D]/10 px-3 py-1 rounded-full border border-[#F8904D]/25">
                    South India Heritage
                  </span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-6 flex-1">
                  <li className="pb-2.5 border-b border-dashed border-slate-100">
                    <strong className="text-slate-900 block font-semibold mb-0.5">Pride of Karnataka (5N / 6D &middot; Bengaluru to Bengaluru)</strong>
                    18 Oct, 15 Nov, 13 Dec 2025 &middot; 03 Jan, 31 Jan, 28 Feb 2026
                  </li>
                  <li className="pb-2.5 border-b border-dashed border-slate-100">
                    <strong className="text-slate-900 block font-semibold mb-0.5">Jewels of South (5N / 6D &middot; Bengaluru to Bengaluru via Kerala)</strong>
                    01 Nov, 29 Nov, 27 Dec 2025 &middot; 17 Jan, 14 Feb, 14 Mar 2026
                  </li>
                  <li>
                    <strong className="text-slate-900 block font-semibold mb-0.5">Glimpses of Karnataka (3N / 4D Short Circuit)</strong>
                    08 Nov, 06 Dec, 20 Dec 2025 &middot; 24 Jan, 21 Feb 2026
                  </li>
                </ul>
                <div className="pt-4 border-t border-[#eee7de] flex items-center justify-between text-xs font-semibold font-outfit mt-auto">
                  <Link href="/luxury-trains/golden-chariot/departures" className="text-[#F8904D] hover:underline">
                    View Official Schedule &rarr;
                  </Link>
                  <Link href="/luxury-trains/golden-chariot/price" className="text-slate-500 hover:text-slate-900">
                    Check Tariffs &rarr;
                  </Link>
                </div>
              </div>

              {/* Card 4: Deccan Odyssey */}
              <div className="bg-white border border-[#eee7de] rounded-2xl p-6 shadow-sm flex flex-col">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 flex-wrap gap-2">
                  <h4 className="font-outfit font-bold text-lg text-[#0f172a]">Deccan Odyssey</h4>
                  <span className="text-xs font-semibold text-[#F8904D] bg-[#F8904D]/10 px-3 py-1 rounded-full border border-[#F8904D]/25">
                    6 Royal Circuits
                  </span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-slate-600 mb-6 flex-1">
                  <li className="pb-2.5 border-b border-dashed border-slate-100">
                    <strong className="text-slate-900 block font-semibold mb-0.5">Maharashtra Splendour (7N / 8D &middot; Mumbai to Mumbai)</strong>
                    04 Oct, 01 Nov, 06 Dec 2025 &middot; 03 Jan, 31 Jan, 28 Feb 2026
                  </li>
                  <li className="pb-2.5 border-b border-dashed border-slate-100">
                    <strong className="text-slate-900 block font-semibold mb-0.5">Indian Odyssey (7N / 8D &middot; Delhi to Mumbai)</strong>
                    18 Oct, 15 Nov, 13 Dec 2025 &middot; 17 Jan, 14 Feb, 14 Mar 2026
                  </li>
                  <li>
                    <strong className="text-slate-900 block font-semibold mb-0.5">Maharashtra Wild Trail (7N / 8D &middot; Tadoba &amp; Pench)</strong>
                    25 Oct, 22 Nov, 20 Dec 2025 &middot; 24 Jan, 21 Feb, 21 Mar 2026
                  </li>
                </ul>
                <div className="pt-4 border-t border-[#eee7de] flex items-center justify-between text-xs font-semibold font-outfit mt-auto">
                  <Link href="/luxury-trains/deccan-odyssey/departures" className="text-[#F8904D] hover:underline">
                    View Official Schedule &rarr;
                  </Link>
                  <Link href="/luxury-trains/deccan-odyssey/price" className="text-slate-500 hover:text-slate-900">
                    Check Tariffs &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY KOIKOI TRAVEL */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0f172a] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F8904D]"></span>
              <span>Why KoiKoi Travel</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-[#0f172a] mb-3">
              We Plan It Like It&apos;s Our Own Trip
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              The train is only one part of the journey. We look after everything around it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#eee7de] overflow-hidden pb-6 shadow-xs hover:shadow-lg transition-all duration-300"
              >
                <div className="w-full h-44 relative bg-slate-200">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-outfit text-lg font-bold text-[#0f172a] mb-2">
                    {card.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-300 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F8904D]"></span>
              <span>How It Works</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-white mb-3">
              3 Simple Steps
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              No forms to fill and no pressure. Just a quick chat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="border border-white/15 rounded-2xl p-7 bg-white/5 backdrop-blur-sm"
              >
                <div className="font-outfit text-4xl text-[#F8904D] leading-none mb-3 font-extrabold">
                  {step.num}
                </div>
                <h3 className="text-xl font-outfit font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQS */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0f172a] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F8904D]"></span>
              <span>FAQs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-[#0f172a]">
              Luxury Train Questions
            </h2>
          </div>

          <div className="divide-y divide-[#eee7de]">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-5">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#0f172a] cursor-pointer hover:text-[#F8904D] transition-colors font-outfit"
                  >
                    <span>{faq.question}</span>
                    <span className="text-2xl text-[#F8904D] shrink-0 font-light leading-none">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. CTA BAND */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white text-center">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-white mb-3">
            Ready to Ride the Rails Like a Maharaja?
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-200 mb-7">
            Share your dates and we will send your custom luxury train plan on WhatsApp and email within 12–24 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <QuoteModal>
              <button
                type="button"
                className="inline-block px-7 py-3.5 rounded-full bg-[#F8904D] hover:bg-[#e07b3b] text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95 font-outfit"
              >
                Get My Free Quote
              </button>
            </QuoteModal>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base transition-all shadow-md hover:scale-105 active:scale-95 font-outfit"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
