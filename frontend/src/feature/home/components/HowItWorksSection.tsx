"use client";

import React from "react";
import {
  Sparkles,
  Send,
  FileText,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { SectionLabel } from "@/components/shared/SectionLabel";
import { QuoteModal } from "@/components/shared/QuoteModal";

interface StepItem {
  num: string;
  stepName: string;
  timeBadge: string;
  themeColor: string; // hex
  borderColor: string;
  bgColor: string;
  stemColor: string;
  iconBg: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
}

const TIMELINE_STEPS: StepItem[] = [
  {
    num: "01",
    stepName: "Step 01",
    timeBadge: "Takes ~2 Mins",
    themeColor: "#F8904D",
    borderColor: "border-[#F8904D]",
    bgColor: "bg-orange-50/50",
    stemColor: "bg-[#F8904D]",
    iconBg: "bg-gradient-to-br from-[#F8904D] to-[#E0722E]",
    icon: Send,
    title: "Tell Us Your Travel Vision",
    tagline: "Dream freely, we connect the dots",
    description:
      "Share your travel dates, preferred destinations, or rough ideas. You don't need a finalized route — our India specialists will guide you at every step.",
    highlights: [
      "100% Free consultation & zero booking obligation",
      "Tailored for couples, families, solo, or luxury groups",
    ],
  },
  {
    num: "02",
    stepName: "Step 02",
    timeBadge: "Within 12–24 Hours",
    themeColor: "#0D9488",
    borderColor: "border-[#0D9488]",
    bgColor: "bg-teal-50/50",
    stemColor: "bg-[#0D9488]",
    iconBg: "bg-gradient-to-br from-[#0D9488] to-[#0F766E]",
    icon: FileText,
    title: "Get Your Custom Plan & Quote",
    tagline: "Crafted specifically for you, not the crowd",
    description:
      "Receive a handcrafted day-by-day itinerary with handpicked boutique stays and clear upfront quotes. Tweak hotels, adjust pace, or add offbeat experiences until it's 100% right.",
    highlights: [
      "Handpicked boutique heritage stays & licensed guides",
      "Unlimited itinerary revisions at no extra cost",
    ],
  },
  {
    num: "03",
    stepName: "Step 03",
    timeBadge: "On-Ground 24/7",
    themeColor: "#10B981",
    borderColor: "border-[#10B981]",
    bgColor: "bg-emerald-50/50",
    stemColor: "bg-[#10B981]",
    iconBg: "bg-gradient-to-br from-[#10B981] to-[#059669]",
    icon: ShieldCheck,
    title: "Travel With Total Peace of Mind",
    tagline: "A seamless journey from landing to departure",
    description:
      "Arrive in India to a warm personal welcome, private chauffeur, and top licensed storytellers. Your personal Trip Manager stays active 24/7 on WhatsApp for effortless support.",
    highlights: [
      "Spacious private AC vehicle & certified professional driver",
      "24/7 on-ground WhatsApp support for zero stress",
    ],
  },
];

export const HowItWorksSection: React.FC = () => {
  const whatsappUrl = `https://wa.me/919873003099?text=${encodeURIComponent(
    "Hi KoiKoi Travel! I am planning a trip to India and would love to get a customized itinerary."
  )}`;

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-y border-section-border bg-section-tint py-12 sm:py-16 md:py-20"
    >
      {/* Background warm glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex justify-center overflow-hidden opacity-35"
      >
        <div className="h-[450px] w-[1000px] -translate-y-24 rounded-full bg-gradient-to-b from-[#F8904D]/15 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-[1600px] px-4 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mb-10 max-w-2xl text-left sm:mb-14">
          <SectionLabel>How It Works • 3 Simple Steps</SectionLabel>
          <h2 className="mt-1.5 text-2xl font-bold tracking-tight text-slate-900 sm:mt-2 sm:text-3xl md:text-[34px]">
            How It <span className="text-[#F8904D]">Works</span>
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
            No cookie-cutter packages, no rigid schedules. Connect with your personal advisor to start your journey — here is how we make exploring India seamless and stress-free.
          </p>
        </div>

        {/* =========================================================================
            DESKTOP TIMELINE (Like WWII Infographic: Horizontal Axis -> Stems -> Cards)
           ========================================================================= */}
        <div className="hidden md:block">
          {/* Timeline Container with 3 Equal Columns */}
          <div className="relative">
            {/* The Main Axis Line running horizontally across the 3 nodes */}
            <div
              aria-hidden="true"
              className="absolute top-[46px] left-[14%] right-[4%] h-[3px] bg-slate-800 z-0"
            >
              {/* Arrowhead at the right end of axis */}
              <div
                className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[12px] border-l-slate-800"
              />
            </div>

            {/* 3 Step Columns */}
            <div className="grid grid-cols-3 gap-6 lg:gap-8 relative z-10">
              {TIMELINE_STEPS.map((step) => (
                <div key={step.num} className="flex flex-col items-center">
                  {/* 1. Time / Step Tag Above Axis */}
                  <div className="h-8 flex items-center justify-center">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {step.stepName} • <span style={{ color: step.themeColor }}>{step.timeBadge}</span>
                    </span>
                  </div>

                  {/* 2. Axis Milestone Node Circle */}
                  <div className="relative my-1 flex items-center justify-center">
                    <div
                      className="h-6 w-6 rounded-full border-4 border-white shadow-md transition-transform duration-300 hover:scale-125"
                      style={{ backgroundColor: step.themeColor }}
                    />
                  </div>

                  {/* 3. Vertical Stem Line Dropping Down to the Card */}
                  <div
                    aria-hidden="true"
                    className="w-[2.5px] h-8 sm:h-10 transition-colors"
                    style={{ backgroundColor: step.themeColor }}
                  />

                  {/* 4. The Step Card (Capsule & Editorial Box) */}
                  <div
                    className="w-full flex flex-col rounded-2xl border-2 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                    style={{ borderColor: `${step.themeColor}35` }}
                  >
                    {/* Top Oval Capsule Frame (Inspired by reference infographic) */}
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      {/* Oval Icon Badge */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-md ${step.iconBg}`}
                        >
                          <step.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <span
                            className="text-[11px] font-bold uppercase tracking-wider"
                            style={{ color: step.themeColor }}
                          >
                            {step.stepName}
                          </span>
                          <h4 className="text-sm font-bold text-slate-800">
                            {step.timeBadge}
                          </h4>
                        </div>
                      </div>

                      {/* Number Stamp */}
                      <span className="text-2xl font-black tracking-tight text-slate-200">
                        {step.num}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="mt-4 flex flex-1 flex-col">
                      <h3 className="text-lg font-bold text-slate-900">
                        {step.title}
                      </h3>
                      <p
                        className="mt-0.5 text-xs font-semibold"
                        style={{ color: step.themeColor }}
                      >
                        {step.tagline}
                      </p>

                      <p className="mt-3 text-sm leading-relaxed text-slate-600">
                        {step.description}
                      </p>

                      {/* Highlights */}
                      <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 mt-auto">
                        {step.highlights.map((item, hIdx) => (
                          <div
                            key={hIdx}
                            className="flex items-start gap-2 text-[13px] text-slate-700"
                          >
                            <CheckCircle2
                              className="mt-0.5 h-3.5 w-3.5 shrink-0"
                              style={{ color: step.themeColor }}
                            />
                            <span className="leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            MOBILE TIMELINE (Rotated 90°: Vertical Axis -> Stems -> Cards)
           ========================================================================= */}
        <div className="md:hidden relative">
          {/* Vertical Main Axis Line running down on the left */}
          <div
            aria-hidden="true"
            className="absolute left-[15px] top-6 bottom-4 w-[3px] bg-slate-800 z-0"
          >
            {/* Arrowhead at the bottom end of vertical axis */}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-[5px] border-x-transparent border-t-[10px] border-t-slate-800"
            />
          </div>

          {/* Vertical Steps */}
          <div className="space-y-6 relative z-10">
            {TIMELINE_STEPS.map((step) => (
              <div key={`mob-${step.num}`} className="relative flex items-start">
                {/* 1. Axis Milestone Node on the line */}
                <div className="relative mt-5 shrink-0">
                  <div
                    className="h-8 w-8 rounded-full border-4 border-white shadow-md flex items-center justify-center"
                    style={{ backgroundColor: step.themeColor }}
                  >
                    <span className="text-[10px] font-bold text-white">
                      {step.num}
                    </span>
                  </div>
                </div>

                {/* 2. Horizontal Stem Line branching to the card */}
                <div
                  aria-hidden="true"
                  className="mt-[34px] w-4 shrink-0 h-[2.5px]"
                  style={{ backgroundColor: step.themeColor }}
                />

                {/* 3. The Step Card */}
                <div
                  className="flex-1 rounded-2xl border-2 bg-white p-4 shadow-sm"
                  style={{ borderColor: `${step.themeColor}35` }}
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-xl shadow-xs ${step.iconBg}`}
                      >
                        <step.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-xs font-bold text-slate-800">
                        {step.stepName}
                      </span>
                    </div>

                    <span
                      className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                      style={{
                        backgroundColor: `${step.themeColor}15`,
                        color: step.themeColor,
                      }}
                    >
                      {step.timeBadge}
                    </span>
                  </div>

                  {/* Body */}
                  <h3 className="mt-3 text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p
                    className="mt-0.5 text-xs font-semibold"
                    style={{ color: step.themeColor }}
                  >
                    {step.tagline}
                  </p>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {step.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                    {step.highlights.map((item, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-1.5 text-xs text-slate-700"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-3 w-3 shrink-0"
                          style={{ color: step.themeColor }}
                        />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            BOTTOM REASSURANCE & ACTION BAR
           ========================================================================= */}
        <div className="mt-10 rounded-2xl border border-section-border bg-gradient-to-r from-amber-50/50 via-white to-orange-50/40 p-5 sm:mt-14 sm:p-6 md:p-7 shadow-xs">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <h4 className="text-base font-bold text-slate-900 sm:text-lg">
                Connect with your personal advisor to start your journey.
              </h4>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <QuoteModal>
                <button
                  type="button"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#F8904D] px-5 py-2.5 text-xs font-semibold tracking-wide text-white shadow-sm shadow-[#F8904D]/25 transition-all duration-200 hover:bg-[#e07b3b] hover:shadow-md sm:text-sm"
                >
                  <span>Connect With Advisor</span>
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
              </QuoteModal>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 sm:text-sm"
              >
                <MessageCircle className="h-4 w-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
