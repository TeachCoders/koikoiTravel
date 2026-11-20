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
  const [isPowVideoPlaying, setIsPowVideoPlaying] = useState<boolean>(false);

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
      region: "Rajasthan & Agra",
      journeys: "1",
      duration: "7N / 8D",
      season: "Oct – Mar (peak)",
      startsFrom: "Delhi",
    },
    {
      train: "Maharajas' Express",
      region: "Rajasthan, Central & North India",
      journeys: "4",
      duration: "3N / 4D, 6N / 7D",
      season: "Oct – Apr",
      startsFrom: "Delhi or Mumbai",
    },
    {
      train: "Golden Chariot",
      region: "Karnataka, Goa, Tamil Nadu, Kerala",
      journeys: "3",
      duration: "3N / 4D, 5N / 6D",
      season: "Oct – Mar",
      startsFrom: "Bengaluru",
    },
    {
      train: "Deccan Odyssey",
      region: "Maharashtra, Rajasthan, Gujarat, Golden Triangle",
      journeys: "6",
      duration: "7N / 8D",
      season: "Sep – May",
      startsFrom: "Mumbai or Delhi",
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

      {/* DEDICATED SEO & EDITORIAL SECTION (BELOW HERO) */}
      <section className="bg-[#faf8f5] border-y border-[#eee7de] py-14 sm:py-16 md:py-20 relative">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Text & Editorial narrative */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F8904D]/10 border border-[#F8904D]/30 text-[#d96b27] text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#F8904D]" />
                <span>Bespoke Heritage Rail Expeditions</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-outfit font-bold text-[#0f172a] tracking-tight leading-tight mb-3">
                <span className="text-[#F8904D]">Luxury Train Journeys in India</span>: Handcrafted Royal Expeditions
              </h1>

              <p className="text-base sm:text-lg font-semibold text-slate-800 mb-4 leading-snug">
                Experience the Subcontinent Aboard India&apos;s 4 Iconic Palaces on Wheels, Planned by{" "}
                <span className="text-[#F8904D]">Independent Travel Specialists</span>
              </p>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-4">
                Stepping aboard one of India&apos;s legendary luxury trains is a journey back to the golden era of rail travel. Far beyond ordinary transit, each voyage is an immersive five-star sanctuary where panoramic observation windows frame Rajput hill forts, untamed wildlife sanctuaries, and golden desert dunes—accompanied by white-gloved butler service, fine dining salons, and curated private excursions.
              </p>

              <div className="bg-[#F8904D]/5 border border-[#F8904D]/25 rounded-xl p-4 sm:p-5 mb-5 text-xs sm:text-sm text-[#78350f] leading-relaxed">
                <strong className="text-[#0f172a] block font-bold mb-1 text-sm sm:text-base">
                  Independent Luxury Travel Curator &amp; Advisory Notice
                </strong>
                KoiKoi Travel is an independent boutique luxury tour designer. India&apos;s four luxury trains are operated by their respective state rail corporations and tourism boards (IRCTC, RTDC, KSTDC, and MTDC). While train operators provide only station-to-station rail tickets, KoiKoi Travel crafts the complete, seamless vacation around your train voyage: securing your preferred cabin class, managing departure logistics, providing private chauffeured luxury transfers, arranging handpicked 5-star heritage palace stays in Delhi and Mumbai, and designing private guided pre- and post-rail excursions.
              </div>

              <p className="text-slate-700 text-sm sm:text-base font-medium mb-3">
                Choosing between India&apos;s four legendary trains depends on your travel season, preferred pace, and the regions you wish to discover:
              </p>

              <ul className="space-y-3 mb-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-[#F8904D] text-lg leading-none mt-0.5">•</span>
                  <span>
                    <strong className="text-slate-900">Palace on Wheels (7N / 8D)</strong>: India&apos;s original luxury train (operating since 1982). A classic circuit through the royal heart of Rajasthan—Jaipur&apos;s Pink City, Ranthambore tiger safari, Chittorgarh fort, Udaipur&apos;s lakes, Jaisalmer&apos;s Thar desert dunes, and Jodhpur—culminating at Agra&apos;s Taj Mahal. Ideal for first-time visitors seeking timeless Rajputana romance.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F8904D] text-lg leading-none mt-0.5">•</span>
                  <span>
                    <strong className="text-slate-900">Maharajas&apos; Express (3N to 6N)</strong>: India&apos;s most modern and opulent luxury train, featuring pneumatic suspension, twin fine-dining restaurants (Mayur Mahal &amp; Rang Mahal), and Presidential Suites spanning entire carriages. Offers four distinct routes connecting Delhi, Agra, and Rajasthan with the temple carvings of Khajuraho and the sacred ghats of Varanasi.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F8904D] text-lg leading-none mt-0.5">•</span>
                  <span>
                    <strong className="text-slate-900">The Golden Chariot (3N to 5N)</strong>: South India&apos;s premier luxury train gliding from Bengaluru through the boulder-strewn UNESCO World Heritage ruins of Hampi, Mysore&apos;s ornate palaces, Bandipur tiger reserve, and the sunlit beaches of Goa. Best for travelers seeking southern architecture, culture, and nature.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#F8904D] text-lg leading-none mt-0.5">•</span>
                  <span>
                    <strong className="text-slate-900">Deccan Odyssey (7N / 8D)</strong>: The royal blue train of Western India, navigating Maharashtra, Gujarat, and Rajasthan. Highlights include the awe-inspiring rock-cut UNESCO caves of Ajanta and Ellora, Nashik&apos;s vineyard valleys, and vibrant coastal heritage.
                  </span>
                </li>
              </ul>

              <div className="border-l-4 border-[#F8904D] bg-white p-4 rounded-r-xl shadow-sm text-xs sm:text-sm text-slate-700 italic leading-relaxed mb-6">
                &ldquo;A train ticket gets you between stations. A handcrafted journey with KoiKoi Travel ensures you are met at the aircraft door, chauffeured in private luxury, housed in legendary palace hotels, and supported by a dedicated 24/7 personal trip manager throughout India.&rdquo;
              </div>

              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="#trains"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#F8904D] hover:bg-[#e07b3b] text-white font-semibold text-xs sm:text-sm transition-all shadow-md hover:scale-105 active:scale-95"
                >
                  <span>Explore the 4 Trains Below</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Speak with a Rail Specialist</span>
                </a>
              </div>
            </div>

            {/* Right: Visual Feature Card */}
            <div className="lg:col-span-5">
              <div className="relative group">
                {/* Decorative offset frame */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-gradient-to-br from-[#F8904D] to-[#e07b3b] shadow-lg transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4"
                />

                {/* Main Card */}
                <div className="relative rounded-2xl bg-white overflow-hidden shadow-2xl border-2 border-white">
                  <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                    <Image
                      src="/images/luxury-trains/maharajas-express/dining-pink.jpg"
                      alt="Maharajas Express Fine Dining"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/30" />
                    <span className="absolute top-4 left-4 inline-block bg-[#0f172a]/85 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      THE KOIKOI CURATOR PROMISE
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#0f172a] font-outfit mb-4">
                      Why Plan Your Rail Journey With Us
                    </h3>
                    <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600">
                      <li className="flex items-start gap-2.5 pb-3 border-b border-slate-100">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          ✓
                        </span>
                        <div>
                          <strong className="text-slate-900 block font-semibold">Impartial Route &amp; Cabin Guidance:</strong>
                          Unbiased advice on train seasons (October to April), routes, and cabin layouts (Deluxe vs Junior Suite vs Presidential Suite).
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5 pb-3 border-b border-slate-100">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          ✓
                        </span>
                        <div>
                          <strong className="text-slate-900 block font-semibold">Bespoke Pre &amp; Post Extensions:</strong>
                          Tailored Golden Triangle tours, private chauffeured Mercedes/Innova Crysta cars, and airport VIP meet-and-greets.
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5 pb-3 border-b border-slate-100">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          ✓
                        </span>
                        <div>
                          <strong className="text-slate-900 block font-semibold">Handpicked 5-Star Heritage Stays:</strong>
                          Curated suites and preferential arrangements at legendary palace hotels (The Oberoi, Taj Mahal Palace, The Leela).
                        </div>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          ✓
                        </span>
                        <div>
                          <strong className="text-slate-900 block font-semibold">Dedicated 24/7 Concierge:</strong>
                          One trip manager on WhatsApp before, during, and after your journey until you return home safely.
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
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

      {/* 2.5 PALACE ON WHEELS VIDEO SPOTLIGHT (SPLIT ROYAL LAYOUT) */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden shadow-2xl border border-[#eee7de] bg-[#0f172a]">
            {/* Left: Content */}
            <div className="p-8 sm:p-12 flex flex-col justify-center text-white bg-[#0f172a]">
              <div className="w-[76px] h-[76px] rounded-full bg-white p-1.5 border-[2.5px] border-[#F8904D] mb-6 flex items-center justify-center shadow-lg">
                <img
                  src="/images/luxury-trains/palace-on-wheels/logo.png"
                  alt="Palace on Wheels Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-white mb-4">
                Palace on Wheels
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                World&apos;s leading heritage luxury train &mdash; Modelled along the personal royal saloons of the erstwhile Rajput Maharajas, the Palace on Wheels is a royal 5-star palace on tracks taking guests across Rajasthan, the golden dunes of Jaisalmer, the lake palaces of Udaipur, and the timeless Taj Mahal in Agra.
              </p>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                7 Nights &amp; 8 Days of imperial grandeur: In operation since 1982, this iconic train departs weekly from Delhi, traversing Jaipur, Ranthambore tiger safari, Chittorgarh, Udaipur, Jaisalmer, Jodhpur, and Bharatpur. Each deluxe saloon is serviced by dedicated personal Khidmatgars.
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <Link
                  href="/luxury-trains/palace-on-wheels/itinerary"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F8904D] hover:bg-[#e07b3b] text-white font-bold text-sm sm:text-base transition-all shadow-md hover:scale-105 active:scale-95 font-outfit"
                >
                  <span>View 7-Night Itinerary</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-[#0f172a] font-bold text-sm sm:text-base transition-all shadow-md hover:scale-105 active:scale-95 font-outfit"
                >
                  <span>Get a Free Quote</span>
                </a>
              </div>
            </div>

            {/* Right: Video Player / Facade */}
            <div className="relative w-full min-h-[340px] sm:min-h-[420px] bg-black flex items-center justify-center overflow-hidden">
              {!isPowVideoPlaying ? (
                <div
                  className="relative w-full h-full min-h-[340px] sm:min-h-[420px] cursor-pointer group"
                  onClick={() => setIsPowVideoPlaying(true)}
                >
                  <Image
                    src="https://img.youtube.com/vi/HnY_2_BBbW4/maxresdefault.jpg"
                    alt="Palace on Wheels Video Preview"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/35 transition-colors group-hover:bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F8904D] text-white flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                  <span className="absolute bottom-4 left-4 z-10 bg-black/75 backdrop-blur-md text-white text-xs font-semibold px-3.5 py-1.5 rounded-full border border-white/20">
                    Palace on Wheels · Experience Video
                  </span>
                </div>
              ) : (
                <iframe
                  src="https://www.youtube-nocookie.com/embed/HnY_2_BBbW4?autoplay=1&rel=0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. QUICK COMPARE TABLE */}
      <section id="compare" className="py-16 sm:py-20 bg-[#faf8f5] border-y border-[#eee7de]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0f172a] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F8904D]"></span>
              <span>Quick Compare</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-outfit font-bold text-[#0f172a] mb-3">
              Which Train Is Right for You?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Not sure where to start? This table shows the main differences. Or just message us and we will suggest one.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl shadow-sm bg-white border border-[#eee7de]">
            <table className="w-full border-collapse min-w-[760px] text-sm text-left">
              <thead>
                <tr className="bg-[#0f172a] text-white text-xs uppercase tracking-wider font-outfit">
                  <th className="py-3.5 px-5 font-bold">Train</th>
                  <th className="py-3.5 px-5 font-bold">Region</th>
                  <th className="py-3.5 px-5 font-bold">Journeys</th>
                  <th className="py-3.5 px-5 font-bold">Duration</th>
                  <th className="py-3.5 px-5 font-bold">Season</th>
                  <th className="py-3.5 px-5 font-bold">Starts from</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eee7de]">
                {compareRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-5 font-bold text-[#0f172a]">{row.train}</td>
                    <td className="py-4 px-5 text-slate-700">{row.region}</td>
                    <td className="py-4 px-5 text-slate-700">{row.journeys}</td>
                    <td className="py-4 px-5 text-slate-700 whitespace-nowrap">{row.duration}</td>
                    <td className="py-4 px-5 text-slate-700">{row.season}</td>
                    <td className="py-4 px-5 text-slate-700">{row.startsFrom}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
