import { prisma } from "./utils/prismaConnection.js";

const EXPERIENCE_FAQS = {
  "hill-station": [
    {
      ques: "Which hill stations in India are best to visit during summer months?",
      ans: "Shimla, Manali, and Dharamshala in Himachal, Nainital and Mussoorie in Uttarakhand, and Munnar and Ooty in South India offer pleasant weather between March and June, making them ideal to escape the city heat."
    },
    {
      ques: "Where can I experience snowfall in Indian hill stations?",
      ans: "Manali, Solang Valley, Gulmarg, and higher reaches of Shimla (Kufri and Narkanda) typically receive good snowfall from late December through February."
    },
    {
      ques: "Are hill station trips safe for children and senior citizens?",
      ans: "Yes. For families with seniors or young children, destinations with gentle roads and moderate altitude like Shimla, Mussoorie, and Ooty are very comfortable. We arrange experienced mountain drivers and heated rooms during winter."
    },
    {
      ques: "How many days are ideal for a relaxing hill station holiday?",
      ans: "A 4 to 6 day trip is perfect. It gives you 2 to 3 days to explore local viewpoints, tea gardens, or cafes and enough time for comfortable travel without rushing on mountain roads."
    },
    {
      ques: "Can KoiKoi Travel arrange a private cab for the entire hill circuit?",
      ans: "Yes, we provide dedicated private vehicles (Sedan, Innova, or Tempo Traveller) with experienced hill drivers from your nearest airport or railway station like Delhi, Chandigarh, or Kochi."
    }
  ],
  "wildlife": [
    {
      ques: "When are national parks in India open for jungle safaris?",
      ans: "Most major tiger reserves including Ranthambore, Jim Corbett, Kanha, and Bandhavgarh are open from October to June and close during the monsoon season (July to September). Kaziranga typically opens from November to April."
    },
    {
      ques: "Which national parks offer the highest chances of spotting wild tigers?",
      ans: "Ranthambore in Rajasthan, Bandhavgarh and Kanha in Madhya Pradesh, and Jim Corbett in Uttarakhand have the highest tiger density and well-managed core safari zones."
    },
    {
      ques: "What is the difference between a Jeep Safari (Gypsy) and a Canter Safari?",
      ans: "A Jeep (Gypsy) is an open 6-seater vehicle that is quieter, more agile, and goes deeper into narrow jungle tracks. A Canter is an open 16 to 20 seater vehicle, ideal for larger family groups or budget travelers."
    },
    {
      ques: "How far in advance should I book jungle safari permits?",
      ans: "Tiger reserve permits are strictly limited by the forest department and open 90 to 120 days in advance. We strongly recommend booking at least 2 to 3 months early, especially for prime zones during peak season."
    },
    {
      ques: "What should I wear and carry on an Indian jungle safari?",
      ans: "Wear muted, earthy colors like olive green, khaki, brown, or beige to blend with the forest. Carry a valid photo ID (the same one used for booking), sunglasses, a scarf or mask for dust, and binoculars or a camera."
    }
  ],
  "golden-triangle": [
    {
      ques: "What is the Golden Triangle tour in India?",
      ans: "It is India's most iconic travel circuit connecting three heritage cities in North India: Delhi (historic capital monuments), Agra (home of the Taj Mahal), and Jaipur (the royal Pink City of forts and palaces)."
    },
    {
      ques: "How many days do I need for a complete Golden Triangle tour?",
      ans: "A comfortable itinerary is 4 Nights / 5 Days or 5 Nights / 6 Days. For travelers with limited time, a 3 Nights / 4 Days highlights trip is also very popular."
    },
    {
      ques: "What is the best way to travel between Delhi, Agra, and Jaipur?",
      ans: "Traveling by a private air-conditioned car with a professional chauffeur via the modern Yamuna Expressway and Delhi-Jaipur Expressway is the smoothest and most flexible option."
    },
    {
      ques: "Can I add extensions like Ranthambore, Varanasi, or Udaipur to this tour?",
      ans: "Yes! The Golden Triangle connects easily with a 2-day tiger safari in Ranthambore, a spiritual extension to Varanasi, or romantic palace visits in Udaipur."
    },
    {
      ques: "What is the best time of year to take the Golden Triangle tour?",
      ans: "October to March offers cool, pleasant weather ideal for exploring large outdoor forts, UNESCO heritage monuments, and bustling local bazaars."
    }
  ],
  "spiritual": [
    {
      ques: "What are the most popular spiritual circuits in India?",
      ans: "The most popular routes include Varanasi-Ayodhya-Prayagraj (sacred ghats and temples), Haridwar-Rishikesh (Ganga Aarti and ashrams), Mathura-Vrindavan (Braj Bhoomi), and the Golden Temple in Amritsar."
    },
    {
      ques: "What is the best time to attend the Ganga Aarti in Varanasi and Rishikesh?",
      ans: "Ganga Aarti takes place every evening at sunset (around 6:00 PM in winter and 7:00 PM in summer) at Dashashwamedh Ghat in Varanasi and Triveni Ghat in Rishikesh. Arriving 45 minutes early or booking a boat seat gives you the best view."
    },
    {
      ques: "Is special Darshan assistance available for elderly parents?",
      ans: "Yes. At major temple sites like Kashi Vishwanath in Varanasi and Ram Mandir in Ayodhya, we assist with pre-booked darshan slots, battery-operated carts, and wheelchair support wherever authorized by temple trusts."
    },
    {
      ques: "What kind of food and stay options are provided on pilgrimage tours?",
      ans: "We arrange clean, comfortable hotels close to temple complexes and recommend verified pure-vegetarian dining options serving fresh local Satvik food."
    },
    {
      ques: "Can I customize a spiritual tour with a private boat ride or pooja?",
      ans: "Yes, we organize private morning and evening boat rides on the Ganges and can arrange certified local priests for private pooja rituals or special blessings."
    }
  ],
  "taj-mahal": [
    {
      ques: "What is the best time of day to visit the Taj Mahal?",
      ans: "Sunrise is the absolute best time. The morning light creates a warm golden glow on the white marble, temperatures are pleasant, and the monument is far less crowded than during the afternoon."
    },
    {
      ques: "Is the Taj Mahal open every day of the week?",
      ans: "No, the Taj Mahal is strictly closed to tourists every Friday. It is open from sunrise to sunset Saturday through Thursday. Always plan your Agra travel dates keeping Friday in mind."
    },
    {
      ques: "Can I do a Same-Day Taj Mahal tour from Delhi by car?",
      ans: "Yes. Thanks to the Yamuna Expressway, you can reach Agra in under 3.5 hours from Delhi. A same-day trip allows you to visit the Taj Mahal, Agra Fort, and Mehtab Bagh, returning comfortably to Delhi by evening."
    },
    {
      ques: "What items are prohibited inside the Taj Mahal?",
      ans: "Large backpacks, tripods, drone cameras, tobacco, lighters, food items, and sharp objects are prohibited. You are allowed to carry your mobile phone, DSLR camera, and a small water bottle."
    },
    {
      ques: "Do I need an authorized guide for the Taj Mahal?",
      ans: "A government-approved licensed tour guide helps you appreciate the rich Mughal history, optical illusions in the marble architecture, and guides you to the best photo spots without hassle."
    }
  ],
  "ayurveda-yoga": [
    {
      ques: "What are the top destinations in India for authentic Ayurveda and Yoga?",
      ans: "Kerala (Kovalam, Varkala, Kumarakom, Wayanad) is the global center for traditional Ayurvedic therapies and herbal oils, while Rishikesh in Uttarakhand is known worldwide as the Yoga Capital along the holy Ganges."
    },
    {
      ques: "What is the recommended duration for an Ayurveda retreat?",
      ans: "For general relaxation and stress relief, a 5 to 7 day program is great. For authentic detoxification (Panchakarma) or chronic relief, doctors recommend a minimum of 14 to 21 days."
    },
    {
      ques: "When is the best season for Ayurvedic treatments in Kerala?",
      ans: "Monsoon (June to September) is traditionally considered the most effective season because the atmosphere is cool and dust-free, and skin pores open naturally to absorb herbal oils. However, wellness programs run year-round."
    },
    {
      ques: "Are daily meals customized at the wellness resorts?",
      ans: "Yes. Qualified Ayurvedic doctors conduct an initial body constitution assessment (Dosha analysis) and provide a customized, fresh vegetarian diet tailored to your health needs."
    },
    {
      ques: "Can beginners with no prior yoga experience join these retreats?",
      ans: "Yes! Daily yoga and meditation sessions are designed for all experience levels, from complete beginners to regular practitioners, guided by certified yoga masters."
    }
  ],
  "heritage-and-culture": [
    {
      ques: "Which regions in India offer the richest heritage and cultural tours?",
      ans: "Rajasthan (royal forts, palaces, and havelis), Madhya Pradesh (Khajuraho temples, Gwalior Fort, Sanchi Stupa), and South India (Chola temples, Hampi ruins, and Madurai) offer world-class cultural richness."
    },
    {
      ques: "What heritage activities can I experience on a KoiKoi Travel tour?",
      ans: "You can enjoy stays in restored royal heritage havelis, sound and light shows at ancient forts, traditional folk dance performances, culinary walks, and artisan craft workshops."
    },
    {
      ques: "Are entry tickets and local monument guides included in heritage packages?",
      ans: "We can include pre-arranged monument entry tickets and verified government-licensed guides who share genuine historical stories in English or your preferred language."
    },
    {
      ques: "Is heritage travel suitable for solo travelers and senior citizens?",
      ans: "Yes. All our heritage itineraries feature vetted private vehicles, comfortable heritage hotels, and smooth pacing without exhausting stairs or rushed schedules."
    },
    {
      ques: "What is the best season for heritage sightseeing in India?",
      ans: "October to March is the ideal season when days are sunny and comfortable, making it easy to explore large open-air fort complexes and archaeological sites."
    }
  ],
  "honeymoon": [
    {
      ques: "What are the top honeymoon destinations in India?",
      ans: "Kashmir (snowy mountains and Dal Lake houseboats), Kerala (Munnar hills and Alleppey backwaters), Udaipur (romantic lake palaces), Goa (private beach resorts), and Andaman (clear waters and white sands)."
    },
    {
      ques: "What special honeymoon inclusions are provided by KoiKoi Travel?",
      ans: "We arrange candlelit dinners, flower-decorated rooms on arrival, romantic shikara or backwater boat rides, private viewpoint visits, and special surprise cakes."
    },
    {
      ques: "Can we choose between mountain, beach, and backwater honeymoon trips?",
      ans: "Yes! We tailor the itinerary completely to your dream style—whether you prefer a cozy snowy cottage in Manali, a royal palace suite in Rajasthan, or a private pool villa by the beach in Goa or Kerala."
    },
    {
      ques: "How far in advance should we plan our honeymoon trip?",
      ans: "For peak wedding and winter months (October to February), we recommend booking 4 to 8 weeks in advance to secure premium boutique resorts, luxury houseboats, and romantic lake-view rooms."
    },
    {
      ques: "Is our privacy assured during local sightseeing and travel?",
      ans: "Yes, all our honeymoon packages include a 100% private car with chauffeur and private accommodations with zero group sharing, giving you complete privacy throughout your trip."
    }
  ],
  "family": [
    {
      ques: "Which destinations in India are most recommended for a family holiday?",
      ans: "Kerala (houseboats, wildlife, and tea hills), Rajasthan (colorful forts and camel rides), Himachal (cable cars and mountain views), and the Golden Triangle (easy travel and world wonders) are top family favorites."
    },
    {
      ques: "How do you ensure comfort for young children and elderly grandparents?",
      ans: "We design relaxed itineraries with shorter driving hours, select hotels with elevators and kid-friendly food, and provide spacious vehicles (like Innova Crysta or Tempo Traveller) with ample luggage space."
    },
    {
      ques: "Can we request connecting rooms or family suites?",
      ans: "Yes, we prioritize hotels that offer interconnected bedrooms, family suites, or cottage villas so your entire family can stay together comfortably."
    },
    {
      ques: "What fun activities are included for children on family tours?",
      ans: "Depending on the destination, we include exciting experiences like elephant interactions in Kerala, desert camel rides, toy train rides in Shimla/Ooty, boat safaris, and traditional puppet shows."
    },
    {
      ques: "Is it possible to take breaks during road journeys?",
      ans: "Yes! Since you have a dedicated private vehicle and polite driver, you have complete freedom to stop for snacks, washrooms, or tea breaks whenever your family needs them."
    }
  ],
  "weekend-tours-in-india": [
    {
      ques: "What are the best 2 to 3-day weekend getaways from Delhi?",
      ans: "Agra and Fatehpur Sikri (Taj Mahal express trip), Jaipur (Pink City weekend), Rishikesh and Haridwar (Ganga Aarti and river rafting), Jim Corbett (jungle safari), and Neemrana (heritage fort stay)."
    },
    {
      ques: "How do weekend tour packages work?",
      ans: "We arrange an early morning private car pickup directly from your doorstep or hotel on Friday or Saturday, manage all hotel check-ins and sightseeing, and drop you back safely by Sunday evening."
    },
    {
      ques: "Can I book a last-minute weekend tour?",
      ans: "Yes, we accept short-notice weekend bookings. Our vehicles and verified hotel partners are ready on standby, allowing us to confirm weekend plans quickly."
    },
    {
      ques: "Are all road tolls, driver allowances, and state taxes included?",
      ans: "Yes, all our weekend package quotes are transparent and all-inclusive of fuel, toll taxes, inter-state permit charges, and parking fees."
    },
    {
      ques: "Can weekend trips be customized for groups of friends or corporate teams?",
      ans: "Yes, we provide Tempo Travellers or luxury vans with customized adventure activities, bonfire nights, and group dining options."
    }
  ],
  "beach-lake": [
    {
      ques: "What are the best beach and lake destinations in India?",
      ans: "For beaches: South Goa, Varkala and Kovalam in Kerala, Havelock Island in Andaman, and Gokarna. For scenic lakes: Alleppey backwaters in Kerala, Dal Lake in Srinagar, and Lake Pichola in Udaipur."
    },
    {
      ques: "What is the difference between North Goa and South Goa beach trips?",
      ans: "North Goa is famous for lively water sports, beach shacks, vibrant nightlife, and flea markets. South Goa offers peaceful, clean white-sand beaches with luxury resorts, ideal for romantic getaways and quiet relaxation."
    },
    {
      ques: "How is an overnight stay in an Alleppey backwater houseboat?",
      ans: "It is a relaxing experience. You cruise through palm-lined canals during the day, enjoy freshly cooked traditional Kerala meals prepared on board by a private chef, and anchor in a peaceful lagoon for a quiet night."
    },
    {
      ques: "What is the best season to plan a beach holiday in India?",
      ans: "October to March is the prime season with calm seas, sunny blue skies, and pleasant beach temperatures."
    },
    {
      ques: "Are water sports (scuba diving, jet skiing, parasailing) safe and regulated?",
      ans: "Yes, at major certified centers in Goa, Andaman, and Kerala, water sports are conducted with certified instructors and standard safety lifejackets."
    }
  ],
  "desert-safari": [
    {
      ques: "Where is the best place to experience a desert safari in India?",
      ans: "The Sam Sand Dunes and Khuri Dunes in Jaisalmer (Rajasthan) are the most authentic locations for golden sand dunes, camel rides, and desert glamping."
    },
    {
      ques: "What activities are included in a desert safari package?",
      ans: "A typical package includes a sunset camel ride or 4x4 Jeep dune bashing over sand ripples, a welcome tikka at the desert camp, evening Rajasthani folk music and Kalbelia dance, and a traditional buffet dinner under the stars."
    },
    {
      ques: "Can we stay overnight in desert camps? Is it comfortable in winter?",
      ans: "Yes! We offer luxury Swiss tents with attached modern bathrooms, running hot water, and cozy bedding. Desert nights can get chilly in winter (December-January), so warm blankets and evening bonfires are provided."
    },
    {
      ques: "Is Jeep dune bashing suitable for all age groups?",
      ans: "4x4 Jeep dune bashing is an exciting adventure popular with adults and youngsters. For seniors, pregnant women, or small kids, a gentle camel ride or relaxed camp seating is much more comfortable."
    },
    {
      ques: "What is the best time of year to visit the Jaisalmer desert?",
      ans: "October to March is the ideal season when daytime temperatures are pleasant and nights are cool. Desert camps generally pause operations during the extreme summer heat from April to August."
    }
  ]
};

async function seedExperienceFaqs() {
  console.log("=== Seeding Travel Experience FAQs ===");
  
  const experiences = await prisma.travelExperience.findMany({
    where: { isActive: true },
    select: { id: true, slug: true, title: true }
  });

  for (const exp of experiences) {
    const faqs = EXPERIENCE_FAQS[exp.slug];
    if (!faqs || faqs.length === 0) {
      console.log(`[SKIP] No FAQs defined for slug: ${exp.slug}`);
      continue;
    }

    // 1. Delete old FAQs for this travel experience
    await prisma.faq.deleteMany({
      where: { entityType: "TravelExperience", entityId: exp.id }
    });

    // 2. Insert new FAQs
    for (const f of faqs) {
      await prisma.faq.create({
        data: {
          ques: f.ques,
          ans: f.ans,
          entityType: "TravelExperience",
          entityId: exp.id
        }
      });
    }

    console.log(`[SUCCESS] Seeded ${faqs.length} FAQs for ${exp.title} (${exp.slug}) [ID: ${exp.id}]`);
  }

  const totalCount = await prisma.faq.count({
    where: { entityType: "TravelExperience" }
  });
  console.log(`\n=== Total TravelExperience FAQs in DB: ${totalCount} ===`);
  await prisma.$disconnect();
}

seedExperienceFaqs().catch(err => {
  console.error(err);
  process.exit(1);
});
