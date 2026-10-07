export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

export const HOME_FAQS: FaqItem[] = [
  {
    id: 1,
    question: "How does KoiKoi Travel make India trip planning easy?",
    answer: "Planning India on your own can feel overwhelming with thousands of hotels, routes, and transport options. With KoiKoi Travel, you simply share your travel dates, preferred destinations, group size, and interests. Our local destination experts will craft a 100% personalized day-by-day itinerary tailored to your budget and travel pace — with zero obligation.",
    category: "Planning",
  },
  {
    id: 2,
    question: "Are KoiKoi Travel itineraries 100% customizable?",
    answer: "Yes, every journey is completely customized around you. Whether you want to add an extra day in Jaipur, experience a luxury tiger safari in Ranthambore, include private cooking classes, or slow down your pace, our travel experts will modify the plan until it matches your exact expectations.",
    category: "Customization",
  },
  {
    id: 3,
    question: "What is included in a KoiKoi Travel India tour package?",
    answer: "Our standard packages typically include hand-picked verified accommodations, private air-conditioned vehicles with experienced English-speaking chauffeurs, government-approved local tour guides, monument entry arrangements, internal transfers, and 24/7 on-trip concierge assistance. All inclusions are clearly stated upfront with transparent pricing and no hidden costs.",
    category: "Inclusions",
  },
  {
    id: 4,
    question: "How do booking and payment work with KoiKoi Travel?",
    answer: "Once you approve your custom itinerary and transparent quotation, you can secure your reservation with a modest advance deposit. The remaining balance can be settled closer to your departure date or upon arrival in India, supported by secure international payment methods.",
    category: "Payment",
  },
  {
    id: 5,
    question: "What on-ground support do I receive during my journey?",
    answer: "You receive dedicated 24/7 support throughout your trip in India. From airport greeting on Day 1 to hotel check-in assistance, chauffeur coordination, and 24/7 WhatsApp emergency support, our local team is always available so you can travel with complete peace of mind.",
    category: "Support",
  },
  {
    id: 6,
    question: "Can I get my custom itinerary and quotation on WhatsApp?",
    answer: "Yes! After submitting your trip ideas or contacting us on WhatsApp, our travel experts will send you a complete day-by-day itinerary along with hotel options and pricing directly on WhatsApp within a few hours.",
    category: "Contact",
  },
];
