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
        className="relative text-white py-20 sm:py-28 lg:py-32 overflow-hidden bg-[#091b2c]"
        style={{
          backgroundImage:
            "linear-gradient(105deg, rgba(9,27,44,0.92) 0%, rgba(9,27,44,0.70) 55%, rgba(9,27,44,0.35) 100%), url('https://koikoitravel.com/hero-banners/tajmahal-1820x600-desktop.webp')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-[1180px] mx-auto px-5 sm:px-6">
          <span className="inline-block border border-white/40 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-5 text-amber-300">
            LUXURY TRAINS OF INDIA
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white max-w-3xl leading-[1.15] mb-5">
            Travel India Like Royalty, On Board a Palace on Wheels
          </h1>

          <p className="max-w-2xl text-base sm:text-lg md:text-xl text-slate-200 mb-8 leading-relaxed font-light">
            Four iconic luxury trains. One personal travel team. Tell us your dates and we will help you pick the right train, journey and cabin, then send a quote on WhatsApp and email.
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <a
              href="#trains"
              className="inline-block px-7 py-3.5 rounded-full bg-[#c9973b] hover:bg-[#a87c28] text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-md cursor-pointer"
            >
              Explore the 4 Trains
            </a>
            <QuoteModal>
              <button
                type="button"
                className="inline-block px-7 py-3.5 rounded-full border-2 border-white hover:bg-white hover:text-[#0f2a43] text-white font-semibold text-sm sm:text-base transition-all duration-200 cursor-pointer"
              >
                Get a Free Quote
              </button>
            </QuoteModal>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-sm sm:text-base transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. CHOOSE YOUR TRAIN - 4 CARDS */}
      <section id="trains" className="py-16 sm:py-20 bg-[#f6f3ee]">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-6">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-[#a87c28] mb-2">
              Choose Your Train
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f2a43] mb-3">
              India&apos;s Luxury Trains
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Each train has its own route, season and style. Open any train to see its itinerary, departure dates, price, cabins and photos.
            </p>
          </div>

          {/* Grid of 4 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {trains.map((train) => (
              <article
                key={train.id}
                id={train.id}
                className="bg-white rounded-[14px] overflow-hidden shadow-[0_8px_28px_rgba(15,42,67,0.08)] border border-[#e6e1d8] flex flex-col justify-between"
              >
                {/* Photo / Header Banner */}
                <div
                  className={`h-72 sm:h-80 relative flex items-end p-5 text-white bg-gradient-to-br ${train.gradientClass}`}
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.55)), url('${train.image}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                >
                  <span className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium tracking-wide text-white">
                    {train.badge}
                  </span>
                  <div className="absolute top-5 right-5 w-[72px] h-[72px] bg-white rounded-full overflow-hidden flex items-center justify-center p-[5px] border-[2.5px] border-[#c59b27] shadow-[0_6px_18px_rgba(0,0,0,0.35)] z-10 transition-transform duration-200 hover:scale-105">
                    <img
                      src={`/images/luxury-trains/${train.slug}/logo.png`}
                      alt={`${train.name} Logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[#0f2a43] mb-0.5">
                      {train.name}
                    </h3>
                    <div className="text-[#a87c28] font-semibold text-xs sm:text-sm mb-3">
                      {train.subtitle}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {train.description}
                    </p>

                    {/* Facts List */}
                    <ul className="border-t border-[#e6e1d8] mb-5">
                      {train.facts.map((fact, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex justify-between gap-4 py-2.5 border-b border-[#e6e1d8] text-xs sm:text-sm"
                        >
                          <span className="text-slate-500">{fact.label}</span>
                          <span className="text-right font-medium text-slate-800 max-w-[65%]">
                            {fact.value}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Subpage Quick Links */}
                    <div className="grid grid-cols-3 gap-2 mb-5">
                      {train.sublinks.map((link, lIdx) => (
                        <Link
                          key={lIdx}
                          href={link.href}
                          className="w-full block text-center text-xs font-semibold py-2 px-1 border border-[#e6e1d8] rounded-lg text-[#0f2a43] hover:bg-[#0f2a43] hover:text-white hover:border-[#0f2a43] transition-all cursor-pointer"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Main Train CTA */}
                  <Link
                    href={`/luxury-trains/${train.slug}`}
                    className="w-full block text-center py-3 px-6 rounded-full bg-[#0f2a43] hover:bg-[#091b2c] text-white font-semibold text-sm transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    View {train.name}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. QUICK COMPARE TABLE */}
      <section id="compare" className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-6">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-[#a87c28] mb-2">
              Quick Compare
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f2a43] mb-3">
              Which Train Is Right for You?
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Not sure where to start? This table shows the main differences. Or just message us and we will suggest one.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-[14px] shadow-[0_8px_28px_rgba(15,42,67,0.08)] bg-white border border-[#e6e1d8]">
            <table className="w-full border-collapse min-w-[760px] text-sm text-left">
              <thead>
                <tr className="bg-[#0f2a43] text-white text-xs uppercase tracking-wider">
                  <th className="py-3.5 px-5 font-semibold">Train</th>
                  <th className="py-3.5 px-5 font-semibold">Region</th>
                  <th className="py-3.5 px-5 font-semibold">Journeys</th>
                  <th className="py-3.5 px-5 font-semibold">Duration</th>
                  <th className="py-3.5 px-5 font-semibold">Season</th>
                  <th className="py-3.5 px-5 font-semibold">Starts from</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6e1d8]">
                {compareRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-5 font-bold text-[#0f2a43]">{row.train}</td>
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
      <section className="py-16 sm:py-20 bg-[#f6f3ee]">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-6">
          <div className="max-w-2xl mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-[#a87c28] mb-2">
              Why KoiKoi Travel
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f2a43] mb-3">
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
                className="bg-white rounded-[14px] border border-[#e6e1d8] overflow-hidden pb-6 shadow-sm hover:shadow-md transition-shadow"
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
                  <h3 className="font-serif text-lg font-bold text-[#0f2a43] mb-2">
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
      <section className="py-16 sm:py-20 bg-[#0f2a43] text-white">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-6">
          <div className="max-w-2xl mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-[#c9973b] mb-2">
              How It Works
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">
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
                className="border border-white/20 rounded-[14px] p-7 bg-white/5 backdrop-blur-sm"
              >
                <div className="font-serif text-4xl text-[#c9973b] leading-none mb-3 font-bold">
                  {step.num}
                </div>
                <h3 className="text-xl font-serif font-bold text-white mb-2">
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
        <div className="max-w-[820px] mx-auto px-5 sm:px-6">
          <div className="text-center mb-10">
            <div className="text-xs font-bold uppercase tracking-widest text-[#a87c28] mb-2">
              FAQs
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f2a43]">
              Luxury Train Questions
            </h2>
          </div>

          <div className="divide-y divide-[#e6e1d8]">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="py-4.5">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left flex items-center justify-between gap-4 font-semibold text-base sm:text-lg text-[#0f2a43] cursor-pointer hover:text-[#a87c28] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="text-2xl text-[#a87c28] shrink-0 font-light leading-none">
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
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#0f2a43] to-[#1d4468] text-white text-center">
        <div className="max-w-[1180px] mx-auto px-5 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3">
            Ready to Ride the Rails Like a Maharaja?
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-slate-200 mb-7">
            Share your dates and we will send your custom luxury train plan on WhatsApp and email within 12–24 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <QuoteModal>
              <button
                type="button"
                className="inline-block px-7 py-3.5 rounded-full bg-[#c9973b] hover:bg-[#a87c28] text-white font-semibold text-sm sm:text-base transition-all duration-200 shadow-md cursor-pointer"
              >
                Get My Free Quote
              </button>
            </QuoteModal>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm sm:text-base transition-all shadow-md"
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
