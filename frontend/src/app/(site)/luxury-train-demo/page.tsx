import React from "react";
import type { Metadata } from "next";
import LuxuryTrainHomeView from "@/feature/luxuryTrains/components/LuxuryTrainHomeView";

export const metadata: Metadata = {
  title: "Luxury Trains of India | Palace on Wheels, Maharajas' Express & More | KoiKoi Travel",
  description:
    "Plan a luxury train journey in India with KoiKoi Travel. Palace on Wheels, Maharajas' Express, Golden Chariot and Deccan Odyssey: itineraries, departures, cabins and a custom quote.",
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
  return <LuxuryTrainHomeView />;
}
