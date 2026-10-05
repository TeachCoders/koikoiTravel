import { prisma } from './utils/prismaConnection.js';

const STATE_FAQS = {
  16: [ // Maharashtra
    {
      ques: "How many days are ideal for a complete Maharashtra tour?",
      ans: "A 6 to 9-day trip allows you to comfortably explore Mumbai, the historic Ajanta and Ellora caves near Aurangabad, and relax at a scenic hill station like Lonavala or Mahabaleshwar."
    },
    {
      ques: "What is the best time of the year to visit Maharashtra?",
      ans: "October to March offers pleasant and cool weather for city tours, heritage sites, and wildlife safaris. If you love lush green valleys and waterfalls, July to September (monsoon) is the best time for Western Ghat hill stations."
    },
    {
      ques: "Which wildlife sanctuary in Maharashtra has the highest tiger sightings?",
      ans: "Tadoba-Andhari National Park in Chandrapur district is widely recognized as one of India's best reserves for spotting Royal Bengal tigers in their natural habitat."
    },
    {
      ques: "How do I travel to Ajanta and Ellora Caves from Mumbai?",
      ans: "You can take an overnight train, a short 1-hour flight from Mumbai to Aurangabad (Chhatrapati Sambhajinagar), or drive via the Samruddhi Expressway. Both cave complexes are easily accessible by cab from Aurangabad."
    }
  ],
  15: [ // Madhya Pradesh
    {
      ques: "What is the most popular tourist route for first-time visitors in Madhya Pradesh?",
      ans: "The Heritage & Wildlife circuit is the most popular: Gwalior Fort -> Orchha palaces -> Khajuraho temples -> Bandhavgarh or Kanha National Park for a tiger safari."
    },
    {
      ques: "When is the best season for tiger safaris in Kanha and Bandhavgarh?",
      ans: "October to June is open for safaris. October to March offers very pleasant weather, while April to May provides the highest tiger sighting probability as animals gather near waterholes."
    },
    {
      ques: "How do I reach Khajuraho and Orchha?",
      ans: "Khajuraho has its own airport and railway station. Orchha is just a 20-minute drive (15 km) from Jhansi Junction, which is connected by fast Shatabdi and Vande Bharat trains from Delhi."
    },
    {
      ques: "Are the Khajuraho Temples suitable for family visits?",
      ans: "Yes, absolutely. The temples are UNESCO World Heritage Sites celebrated worldwide for their exquisite stone architecture, intricate sculptures, and serene manicured garden grounds."
    }
  ],
  1: [ // Rajasthan
    {
      ques: "How many days are recommended for a Rajasthan holiday?",
      ans: "A 7 to 10-day itinerary is ideal to cover the classic Golden Triangle extension: Jaipur, Jodhpur, Udaipur, and the sand dunes of Jaisalmer at a relaxed pace."
    },
    {
      ques: "What is the best time to visit Rajasthan?",
      ans: "October to March is the best season. Winter days are sunny and comfortable (15°C to 25°C), perfect for sightseeing grand forts, palaces, and desert safaris."
    },
    {
      ques: "Is an overnight desert camp in Jaisalmer family-friendly?",
      ans: "Yes. Desert camps in the Sam Sand Dunes provide luxury tents, camel rides, folk music and dance performances, bonfire dinners, and stargazing suitable for all age groups."
    }
  ],
  5: [ // Uttar Pradesh
    {
      ques: "What are the must-visit cities in Uttar Pradesh for tourists?",
      ans: "Agra (Taj Mahal & Agra Fort), Varanasi (Ganga Ghats & evening Aarti), Mathura-Vrindavan (Krishna Janmabhoomi & temples), Ayodhya (Ram Mandir), and Lucknow (Nawabi heritage & cuisine)."
    },
    {
      ques: "What is the best way to travel from Delhi to Agra and Varanasi?",
      ans: "Delhi to Agra takes under 2 hours via the Gatimaan Express or Yamuna Expressway. For Varanasi, high-speed Vande Bharat trains or direct 1-hour flights from Delhi and Mumbai are the most convenient."
    },
    {
      ques: "What is the best time to attend the Ganga Aarti in Varanasi?",
      ans: "The evening Ganga Aarti at Dashashwamedh Ghat takes place every day at sunset (around 6:30 PM in summer and 5:45 PM in winter). Arriving 45 minutes early by boat offers the best view."
    }
  ],
  3: [ // Himachal Pradesh
    {
      ques: "Which destination is better for a holiday: Shimla or Manali?",
      ans: "Shimla is ideal for relaxed colonial charm, heritage walks, and easy accessibility. Manali is best for high-altitude mountain landscapes, snow activities in Solang Valley/Rohtang, and adventure sports."
    },
    {
      ques: "When can we experience snowfall in Himachal Pradesh?",
      ans: "December to February is the peak snowfall season in Manali, Rohtang Pass, Kufri, and high-altitude valleys like Spiti and Kinnaur."
    },
    {
      ques: "How can I travel to Manali from Delhi or Chandigarh?",
      ans: "You can take an overnight luxury Volvo bus, book a private cab via the newly opened 4-lane expressway, or fly to Kullu-Bhuntar Airport (KUU)."
    }
  ],
  4: [ // Uttarakhand
    {
      ques: "What is the best circuit to explore in Uttarakhand?",
      ans: "A 5 to 7-day trip covering Haridwar (Ganga Aarti) -> Rishikesh (yoga, rafting, cafes) -> Jim Corbett National Park (jungle safari) -> Nainital (lake views) is the most popular route."
    },
    {
      ques: "When is white water river rafting open in Rishikesh?",
      ans: "Rafting in Rishikesh is open from mid-September to late June. March to May and October to November provide the most pleasant river conditions."
    },
    {
      ques: "Which safari zone is best in Jim Corbett National Park?",
      ans: "Dhikala, Bijrani, and Jhirna zones are the most famous for wildlife encounters and Royal Bengal tiger sightings."
    }
  ],
  8: [ // Jammu & Kashmir
    {
      ques: "Is Jammu & Kashmir safe for family vacations?",
      ans: "Yes, Kashmir is a popular, hospitable, and safe destination welcoming millions of tourists every year across Srinagar, Gulmarg, Pahalgam, and Sonamarg."
    },
    {
      ques: "What experiences should not be missed in Kashmir?",
      ans: "A Shikara ride and staying overnight on a luxury Houseboat in Dal Lake, the Gulmarg Gondola cable car ride to Apharwat peak, and river walks in Pahalgam's Betaab Valley."
    },
    {
      ques: "When is the best time to see the Tulip Garden in Srinagar?",
      ans: "The Indira Gandhi Memorial Tulip Garden blooms during the annual Tulip Festival, typically from late March to late April."
    }
  ],
  9: [ // Ladakh
    {
      ques: "Why is acclimatization necessary in Ladakh?",
      ans: "Leh is located at an altitude of over 11,500 feet. Spending your first 24 to 48 hours resting in Leh allows your body to adapt safely to lower oxygen levels and prevents AMS (Altitude Sickness)."
    },
    {
      ques: "What is the best time of year to visit Ladakh?",
      ans: "May to September offers clear roads, open mountain passes (Khardung La, Chang La), pleasant day weather, and stunning blue waters at Pangong Tso and Tso Moriri."
    },
    {
      ques: "Can we visit Nubra Valley and Pangong Lake in the same tour?",
      ans: "Yes. Most 6 to 8-day Ladakh itineraries travel from Leh -> Nubra Valley via Khardung La -> direct route to Pangong Lake via Shyok -> back to Leh."
    }
  ],
  10: [ // Delhi NCR
    {
      ques: "How many days are needed for Delhi sightseeing?",
      ans: "A 2 to 3-day itinerary is perfect to experience both Old Delhi (Red Fort, Jama Masjid, Chandni Chowk street food) and New Delhi (India Gate, Qutub Minar, Humayun's Tomb, Lotus Temple)."
    },
    {
      ques: "What is the best way to get around Delhi?",
      ans: "The Delhi Metro is fast, air-conditioned, and connects every major monument and shopping area. Private air-conditioned cabs are also readily available for full-day city tours."
    }
  ],
  24: [ // Chandigarh
    {
      ques: "What are the top tourist attractions in Chandigarh?",
      ans: "Nek Chand's Rock Garden (made from recycled ceramic and industrial waste), Sukhna Lake, the Asia's largest Rose Garden, and the UNESCO-listed Capitol Complex."
    },
    {
      ques: "Is Chandigarh a good stopover on the way to Himachal Pradesh?",
      ans: "Yes, Chandigarh is the premier transit gateway to Shimla (3.5 hours drive) and Manali (6.5 hours drive), offering great airport and Shatabdi train connections from Delhi."
    }
  ]
};

async function seedFaqs() {
  console.log("Starting FAQ population for States...");
  for (const [stateIdStr, faqs] of Object.entries(STATE_FAQS)) {
    const stateId = parseInt(stateIdStr, 10);
    // Remove old FAQs for this state
    await prisma.faq.deleteMany({
      where: { entityType: 'State', entityId: stateId }
    });

    // Insert new unique human-friendly FAQs
    for (const faq of faqs) {
      await prisma.faq.create({
        data: {
          ques: faq.ques,
          ans: faq.ans,
          entityType: 'State',
          entityId: stateId
        }
      });
    }
    console.log(`Seeded ${faqs.length} unique FAQs for State ID ${stateId}`);
  }
  console.log("State FAQ population completed successfully!");
}

seedFaqs().catch(console.error).finally(() => prisma.$disconnect());
