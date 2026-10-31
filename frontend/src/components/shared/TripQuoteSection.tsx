"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Check, Mail } from "lucide-react";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";
import apiClient, { fetchCsrfToken } from "@/lib/apiClient";

export default function TripQuoteSection() {
  const pathname = usePathname();

  // Hide on checkout, auth, or thank-you pages
  const isHidden =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/auth") ||
    pathname?.startsWith("/booking") ||
    pathname?.startsWith("/thank-you");

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    whereTo: "",
    travelDates: "",
    travellers: "",
    hotelLevel: "Not sure yet",
    anythingElse: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isHidden) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919136739178";

    // Format rich WhatsApp message
    const lines = [
      "Hi KoiKoi Travel, I would like to inquire about a custom holiday trip!",
      "",
      formData.name ? `*Name:* ${formData.name.trim()}` : "",
      formData.country ? `*Country:* ${formData.country.trim()}` : "",
      formData.whereTo ? `*Where to:* ${formData.whereTo.trim()}` : "",
      formData.travelDates ? `*Travel Dates:* ${formData.travelDates.trim()}` : "",
      formData.travellers ? `*Travellers:* ${formData.travellers.trim()}` : "",
      formData.hotelLevel ? `*Hotel Level:* ${formData.hotelLevel}` : "",
      formData.anythingElse ? `*Special Notes:* ${formData.anythingElse.trim()}` : "",
      "",
      `_Inquired from:_ ${typeof window !== "undefined" ? window.location.href : "Website"}`,
    ].filter(Boolean);

    const fullMessage = lines.join("\n");
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(fullMessage)}`;

    // Silently save lead in background
    try {
      await fetchCsrfToken();
      await apiClient.post("/traveller-lead", {
        name: formData.name || "Website Lead",
        country: formData.country || "Not specified",
        travellerMessage: `Where to: ${formData.whereTo} | Dates: ${formData.travelDates} | Travellers: ${formData.travellers} | Hotels: ${formData.hotelLevel} | Notes: ${formData.anythingElse}`,
        pageReference: typeof window !== "undefined" ? window.location.href : "Trip Quote Section",
      });
    } catch (err) {
      // Ignore background lead error so WhatsApp open is never blocked
      console.warn("[TripQuoteSection] lead recording error:", err);
    } finally {
      setIsSubmitting(false);
      window.open(waUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="quote" className="bg-[#11322b] text-white py-14 sm:py-16 md:py-20 border-t border-[#1b443b] relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Eyebrow, Heading, Value Propositions */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#F8904D] uppercase">
                FREE QUOTE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-white tracking-tight leading-tight mt-1.5 font-heading">
                Tell us about your trip
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2.5 leading-relaxed">
                Share a few details and we will build a plan for you. No payment needed to ask.
              </p>
            </div>

            {/* Checklist */}
            <ul className="space-y-3 pt-2 text-slate-100 text-sm sm:text-[15px]">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#F8904D]/20 text-[#F8904D] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span>Private car, chauffeur and licensed guides</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#F8904D]/20 text-[#F8904D] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span>Hotels to match your style</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#F8904D]/20 text-[#F8904D] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span>Change anything: days, cities, pace</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-[#F8904D]/20 text-[#F8904D] flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
                <span>Talk to a real person on WhatsApp</span>
              </li>
            </ul>

            <div className="pt-2 text-xs sm:text-sm text-slate-300">
              Prefer email? Write to{" "}
              <a
                href="mailto:info@koikoitravel.com"
                className="text-white underline hover:text-[#F8904D] transition-colors"
              >
                info@koikoitravel.com
              </a>
            </div>
          </div>

          {/* Right Column: Quote Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-9 shadow-2xl text-slate-800 border border-slate-100">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Your Name & Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-1">
                      Your name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#F8904D] focus:ring-2 focus:ring-[#F8904D]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="e.g. United Kingdom, USA"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#F8904D] focus:ring-2 focus:ring-[#F8904D]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Where to? & Travel dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-1">
                      Where to?
                    </label>
                    <input
                      type="text"
                      name="whereTo"
                      value={formData.whereTo}
                      onChange={handleChange}
                      placeholder="e.g. Golden Triangle, Kerala"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#F8904D] focus:ring-2 focus:ring-[#F8904D]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-1">
                      Travel dates
                    </label>
                    <input
                      type="text"
                      name="travelDates"
                      value={formData.travelDates}
                      onChange={handleChange}
                      placeholder="e.g. 10 to 16 Nov 2026"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#F8904D] focus:ring-2 focus:ring-[#F8904D]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: Travellers & Hotel level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-1">
                      Travellers
                    </label>
                    <input
                      type="text"
                      name="travellers"
                      value={formData.travellers}
                      onChange={handleChange}
                      placeholder="How many?"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#F8904D] focus:ring-2 focus:ring-[#F8904D]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-1">
                      Hotel level
                    </label>
                    <select
                      name="hotelLevel"
                      value={formData.hotelLevel}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:border-[#F8904D] focus:ring-2 focus:ring-[#F8904D]/20 transition-all"
                    >
                      <option value="Not sure yet">Not sure yet</option>
                      <option value="3-star Heritage / Boutique">3-star Heritage / Boutique</option>
                      <option value="4-star Premium Comfort">4-star Premium Comfort</option>
                      <option value="5-star Luxury">5-star Luxury</option>
                      <option value="Palace & Ultra Luxury">Palace & Ultra Luxury</option>
                    </select>
                  </div>
                </div>

                {/* Row 4: Anything else? */}
                <div>
                  <label className="block text-xs sm:text-[13px] font-semibold text-slate-700 mb-1">
                    Anything else?
                  </label>
                  <textarea
                    rows={3}
                    name="anythingElse"
                    value={formData.anythingElse}
                    onChange={handleChange}
                    placeholder="Interests, trip length, special needs"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#F8904D] focus:ring-2 focus:ring-[#F8904D]/20 transition-all resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 sm:py-4 px-6 rounded-xl bg-[#F8904D] hover:bg-[#e07a38] text-white font-bold text-base sm:text-[17px] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <WhatsAppIcon className="w-5 h-5 text-white" />
                    <span>Send on WhatsApp</span>
                  </button>
                  <p className="text-[12px] text-slate-400 text-center mt-2">
                    This opens WhatsApp with your details filled in, ready to send.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
