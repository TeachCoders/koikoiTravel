import React from "react";
import type { Metadata } from "next";
import LuxuryTrainHero from "@/feature/luxuryTrains/components/LuxuryTrainHero";
import TrainShowcaseSection from "@/feature/luxuryTrains/components/TrainShowcaseSection";
import RoyalExperienceSection from "@/feature/luxuryTrains/components/RoyalExperienceSection";
import TrainComparisonTable from "@/feature/luxuryTrains/components/TrainComparisonTable";
import WhyBookKoiKoiTrain from "@/feature/luxuryTrains/components/WhyBookKoiKoiTrain";
import LuxuryTrainFaqSection from "@/feature/luxuryTrains/components/LuxuryTrainFaqSection";

export const metadata: Metadata = {
  title: "Luxury Trains of India – Palace on Wheels, Maharajas' Express, Golden Chariot | KoiKoi Travel",
  description:
    "Experience India in royal grandeur aboard the 4 iconic luxury trains: Maharajas' Express, Palace on Wheels, The Golden Chariot, and Deccan Odyssey. Compare itineraries, departure dates, cabins, and all-inclusive tariffs.",
  openGraph: {
    title: "Luxury Trains of India – Royal Palaces on Wheels | KoiKoi Travel",
    description:
      "Explore India's legendary luxury trains. Private royal cabins, personal butlers, Michelin-grade dining cars, and curated VIP palace excursions.",
    images: [
      {
        url: "https://koikoitravel.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Luxury Trains of India - KoiKoi Travel",
      },
    ],
  },
};

export default function LuxuryTrainDemoPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <LuxuryTrainHero />

      {/* 2. 4 Luxury Trains Showcase (Detailed Cards with internal tabs: Overview, Circuits, Cabins, Dining) */}
      <TrainShowcaseSection />

      {/* 3. Royal Experience Pillars (Suites, Dining, Valet, Safaris, Bars, Spas) */}
      <RoyalExperienceSection />

      {/* 4. Side-by-Side Comparison Matrix */}
      <TrainComparisonTable />

      {/* 5. The KoiKoi Travel Advantage & Booking Assistance */}
      <WhyBookKoiKoiTrain />

      {/* 6. Comprehensive FAQ Section */}
      <LuxuryTrainFaqSection />
    </div>
  );
}
