"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";

export default function SeoTextBlock() {
  return (
    <section className="bg-[#f8f8f8] border-t border-slate-100 py-8 sm:py-10 md:py-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10">

        <div>
          <SectionLabel icon={<BookOpen className="w-4 h-4" />}>Our Story</SectionLabel>
          <h2 className="text-xl sm:text-2xl md:text-[26px] font-bold text-slate-900 tracking-tight mt-1.5">About KoiKoi Travel</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <h3 className="text-slate-900 font-semibold text-sm sm:text-[15px] mb-2">Making Every Journey Memorable</h3>
            <p className="text-slate-600 font-normal text-xs sm:text-sm leading-relaxed">This is not just our tagline — it is our commitment. At KoiKoi Travel, we believe that a great trip is not measured by how many places you visited, but by how deeply you experienced them. Every itinerary we craft carries our signature blend of care, authenticity, and personal attention.</p>
          </div>
          <div>
            <h3 className="text-slate-900 font-semibold text-sm sm:text-[15px] mb-2">Atithi Devo Bhava — Guest is God</h3>
            <p className="text-slate-600 font-normal text-xs sm:text-sm leading-relaxed">Our brand is rooted in India&apos;s oldest tradition of hospitality. We welcome every traveler — international visitors, NRIs, and domestic explorers — with warmth, transparency, and zero compromise on quality. No hidden costs, no middlemen, no shortcuts.</p>
          </div>
          <div>
            <h3 className="text-slate-900 font-semibold text-sm sm:text-[15px] mb-2">A Brand Built on Trust</h3>
            <p className="text-slate-600 font-normal text-xs sm:text-sm leading-relaxed">Thousands of travelers have trusted KoiKoi Travel to plan their most important moments — honeymoons, family trips, anniversary getaways, and bucket-list adventures. Their stories, smiles, and shared memories are what define who we are as a brand.</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/about-us"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
          >
            Learn more about us
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Popular Circuits Internal Links for SEO Crawlers & Navigation */}
        <div className="mt-8 pt-6 border-t border-slate-200/80">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Popular India Travel Circuits & Themes
          </h4>
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 text-xs text-slate-600">
            <Link href="/tour-packages/india/rajasthan" className="hover:text-[#F8904D] transition-colors hover:underline">
              Rajasthan Heritage Tours
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/travel-experiences/golden-triangle" className="hover:text-[#F8904D] transition-colors hover:underline">
              Golden Triangle Packages (Delhi, Agra, Jaipur)
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/tour-packages/india/kerala" className="hover:text-[#F8904D] transition-colors hover:underline">
              Kerala Backwaters & Houseboat Trips
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/tour-packages/india/jammu-and-kashmir" className="hover:text-[#F8904D] transition-colors hover:underline">
              Kashmir & Ladakh Holiday Tours
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/travel-experiences/wildlife" className="hover:text-[#F8904D] transition-colors hover:underline">
              India Wildlife & Tiger Safaris
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/travel-experiences/spiritual" className="hover:text-[#F8904D] transition-colors hover:underline">
              Varanasi & Spiritual Pilgrimages
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/tour-packages/same-day-agra-tour-by-car-from-delhi" className="hover:text-[#F8904D] transition-colors hover:underline">
              Same Day Agra Taj Mahal by Car
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
