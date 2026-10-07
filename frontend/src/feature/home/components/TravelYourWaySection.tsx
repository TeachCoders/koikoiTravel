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
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-1.5">About KoiKoi Travel</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <h4 className="text-slate-800 font-bold text-sm mb-2">Making Every Journey Memorable</h4>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">This is not just our tagline — it is our commitment. At KoiKoi Travel, we believe that a great trip is not measured by how many places you visited, but by how deeply you experienced them. Every itinerary we craft carries our signature blend of care, authenticity, and personal attention.</p>
          </div>
          <div>
            <h4 className="text-slate-800 font-bold text-sm mb-2">Atithi Devo Bhava — Guest is God</h4>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">Our brand is rooted in India&apos;s oldest tradition of hospitality. We welcome every traveler — international visitors, NRIs, and domestic explorers — with warmth, transparency, and zero compromise on quality. No hidden costs, no middlemen, no shortcuts.</p>
          </div>
          <div>
            <h4 className="text-slate-800 font-bold text-sm mb-2">A Brand Built on Trust</h4>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">Thousands of travelers have trusted KoiKoi Travel to plan their most important moments — honeymoons, family trips, anniversary getaways, and bucket-list adventures. Their stories, smiles, and shared memories are what define who we are as a brand.</p>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/about-us"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Learn more about us
            <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
}
