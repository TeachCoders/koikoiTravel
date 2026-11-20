"use client";

import React from "react";
import { QuoteModal } from "@/components/shared/QuoteModal";
import { Check, X, Train, ShieldCheck, ArrowRight } from "lucide-react";

export default function TrainComparisonTable() {
  const trains = [
    {
      name: "Maharajas' Express",
      operator: "IRCTC",
      highlight: "Pan-India Royalty & Taj Mahal",
      startingPrice: "$4,890 USD / ₹4,10,000",
      duration: "4D/3N to 7D/6N",
      circuits: "4 Iconic Circuits",
      regions: "Delhi, Agra, Rajasthan, Varanasi, Mumbai",
      presidentialSuite: "448 sq.ft (Full Carriage)",
      diningLounges: "2 Restaurants + 2 Bars",
      onboardSpa: true,
      wifi: true,
      bestFor: "First-time travelers wanting the ultimate royal experience",
    },
    {
      name: "Palace on Wheels",
      operator: "RTDC & Railways",
      highlight: "The Original Rajasthan Heritage Train",
      startingPrice: "$5,250 USD / ₹4,40,000",
      duration: "8D/7N (Circular)",
      circuits: "1 Master Circuit",
      regions: "Delhi, Jaipur, Ranthambore, Udaipur, Jaisalmer, Agra",
      presidentialSuite: "Super Deluxe Suite (140 sq.ft)",
      diningLounges: "2 Dining Cars + 1 Bar",
      onboardSpa: true,
      wifi: true,
      bestFor: "Deep immersion in Rajasthan forts, deserts & lakes",
    },
    {
      name: "The Golden Chariot",
      operator: "KSTDC & IRCTC",
      highlight: "Temples, UNESCO Ruins & Goa Coast",
      startingPrice: "$4,200 USD / ₹3,55,000",
      duration: "4D/3N to 6D/5N",
      circuits: "3 South Circuits",
      regions: "Bengaluru, Mysore, Hampi, Badami, Goa, Kerala",
      presidentialSuite: "Deluxe Couples Suite",
      diningLounges: "2 Dining Cars + 1 Bar",
      onboardSpa: true,
      wifi: true,
      bestFor: "Southern architecture, UNESCO Hampi & coastal luxury",
    },
    {
      name: "Deccan Odyssey",
      operator: "MTDC & Railways",
      highlight: "Wine Capitals, Ancient Caves & Tigers",
      startingPrice: "$7,320 USD / ₹6,15,000",
      duration: "8D/7N",
      circuits: "6 Distinct Circuits",
      regions: "Mumbai, Nashik, Ajanta, Ellora, Goa, Pench, Delhi",
      presidentialSuite: "Royal Suite (205 sq.ft)",
      diningLounges: "2 Restaurants + 1 Lounge",
      onboardSpa: true,
      wifi: true,
      bestFor: "Art, rock-cut architecture, wine tasting & wildlife",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900 text-amber-300 text-xs font-bold tracking-wider uppercase mb-3">
            <Train className="w-3.5 h-3.5 text-[#F8904D]" />
            <span>Comparison Matrix</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Compare India&apos;s 4 Luxury Trains at a Glance
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Find the perfect journey matching your preferred regions, itinerary length, and royal preferences.
          </p>
        </div>

        {/* Responsive Table Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_25px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700 min-w-[750px]">
              <thead className="bg-slate-900 text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6 font-bold">Luxury Train</th>
                  <th className="py-4 px-6 font-bold">Key Circuits & Regions</th>
                  <th className="py-4 px-6 font-bold">Duration</th>
                  <th className="py-4 px-6 font-bold">Starting Tariff</th>
                  <th className="py-4 px-6 font-bold">Onboard Amenities</th>
                  <th className="py-4 px-6 font-bold text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {trains.map((train, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    {/* Train Name & Badge */}
                    <td className="py-5 px-6 font-bold text-slate-900">
                      <div className="text-base text-slate-900 font-extrabold">{train.name}</div>
                      <span className="text-[11px] text-slate-400 font-medium block">{train.operator}</span>
                      <span className="inline-block mt-1 text-[11px] font-semibold text-[#F8904D] bg-[#F8904D]/10 px-2 py-0.5 rounded">
                        {train.highlight}
                      </span>
                    </td>

                    {/* Regions */}
                    <td className="py-5 px-6 max-w-xs">
                      <div className="font-semibold text-slate-800 text-xs mb-1">{train.circuits}</div>
                      <div className="text-xs text-slate-500 leading-relaxed">{train.regions}</div>
                    </td>

                    {/* Duration */}
                    <td className="py-5 px-6 font-semibold text-slate-800 whitespace-nowrap text-xs">
                      {train.duration}
                    </td>

                    {/* Tariff */}
                    <td className="py-5 px-6 whitespace-nowrap">
                      <div className="font-extrabold text-slate-900 text-sm">{train.startingPrice}</div>
                      <div className="text-[10px] text-slate-400">All-Inclusive fare</div>
                    </td>

                    {/* Amenities */}
                    <td className="py-5 px-6 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 mb-1 font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{train.diningLounges}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Spa & High-Speed Wi-Fi</span>
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-5 px-6 text-center whitespace-nowrap">
                      <QuoteModal>
                        <button
                          type="button"
                          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-[#F8904D] text-white text-xs font-bold transition-all shadow-sm cursor-pointer inline-flex items-center gap-1"
                        >
                          <span>Get Quote</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </QuoteModal>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
