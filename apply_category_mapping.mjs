import { prisma } from './Backend/utils/prismaConnection.js';

const rawMapping = {
  'golden-triangle-tour-india': [
    '5-days-delhi-agra-jaipur-golden-triangle-tour',
    '5-days-delhi-agra-jaipur-golden-triangle-tour-by-train',
    '7-days-golden-triangle-tour',
    '7-days-golden-triangle-tour-with-sariska',
    '8-days-golden-triangle-tour-with-ranthambore-tiger-safari-tour',
    '8-days-golden-triangle-tour-with-pushkar',
    '8-days-golden-triangle-with-rishikesh-yoga-tour',
    '8-days-triangle-with-varanasi-trip',
    '9-days-mumbai-with-golden-triangle-tour',
    '10-days-golden-triangle-with-kashmir-tour-package',
    '10-days-golden-triangle-with-khajuraho-varanasi-tour',
    '10-days-golden-triangle-with-shimla-tour',
    '3-days-jaipur-agra-trip-from-delhi-golden-triangle',
    '10-days-rajasthan-trip-including-golden-triangle',
    '15-days-best-of-india-tour'
  ],
  'ayurveda-yoga': [
    '14-days-kerala-ayurveda-retreat-somatheeram-backwaters-beach',
    'kumarakom-ayurveda-wellness-retreat-3-days',
    '3-days-rishikesh-yoga-meditation-tour-from-delhi',
    '8-days-golden-triangle-with-rishikesh-yoga-tour'
  ],
  'wildlife': [
    '3-days-ranthambore-weekend-tour-from-delhi',
    '3-days-jim-corbett-wildlife-tour-from-delhi',
    '5-days-rajasthan-bird-sanctuary-wildlife-tour-package',
    '6-days-wildlife-birdwatching-tour-with-taj-mahal',
    '8-days-rajasthan-wildlife-tour',
    '15-days-north-india-wildlife-cultural-tour',
    '3-days-pench-wildlife-tour-from-nagpur',
    '3-days-tadoba-wildlife-tour-from-mumbai',
    '15-days-south-india-wildlife-tour',
    '8-days-golden-triangle-tour-with-ranthambore-tiger-safari-tour',
    '7-days-golden-triangle-tour-with-sariska',
    'delhi-ranthambore-bundi-jaipur-tour',
    '6-days-jaipur-chittorgarh-ranthambore-tour',
    '7-day-karnataka-and-kerala-tour-wayanad-coorg-and-bekal'
  ],
  'honeymoon': [
    '6-days-shimla-manali-honeymoon-tours-from-delhi',
    '7-days-kashmir-honeymoon-tour-packages',
    '10-days-rajasthan-honeymoon-packages',
    '6-days-kerala-honeymoon-tour'
  ],
  'spiritual': [
    'mathura-vrindavan-tour-package-from-delhi',
    '2-days-varanasi-experience-tour-from-delhi',
    '3-days-rishikesh-yoga-meditation-tour-from-delhi',
    'shirdi-with-shani-shingnapur-temple-tour',
    '13-days-south-india-temple-tour',
    '7-days-rajasthan-pushkar-fair-tour-packages',
    '8-days-golden-triangle-tour-with-pushkar',
    '8-days-triangle-with-varanasi-trip',
    '10-days-golden-triangle-with-khajuraho-varanasi-tour',
    '5-days-delhi-agra-amritsar-tour-package',
    '2-days-delhi-to-amritsar-weekend-tour',
    '15-days-rajasthan-with-taj-mahal-and-ganges-tour-package'
  ],
  'family': [
    '8-days-shimla-manali-family-trip'
  ],
  'heritage-and-culture': [
    '7-days-heritage-tour-of-rajasthan',
    '7-days-rajasthan-tour-packages',
    '9-days-rajasthan-holiday-package-from-mumbai',
    '9-days-rajasthan-tour-from-delhi-to-mumbai',
    '16-days-rajasthan-itinerary-with-agra-and-delhi',
    '3-days-udaipur-cultural-tour-from-delhi',
    '3-days-jaisalmer-jodhpur-tour',
    'delhi-ranthambore-bundi-jaipur-tour',
    '6-days-jaipur-chittorgarh-ranthambore-tour',
    '6-days-ajanta-ellora-caves-tour',
    '12-days-south-india-heritage-backwater-tour',
    '13-days-south-india-temple-tour',
    '14-days-south-india-heritage-nature-tour',
    '15-days-south-india-culture-tour-package',
    '15-days-best-of-india-tour',
    '15-days-north-india-wildlife-cultural-tour'
  ],
  'desert-safari': [
    '3-days-jaisalmer-jodhpur-tour',
    '7-days-rajasthan-tour-packages',
    '10-days-rajasthan-honeymoon-packages',
    '16-days-rajasthan-itinerary-with-agra-and-delhi'
  ],
  'weekend-tours-in-india': [
    'same-day-agra-tour-by-car-from-delhi',
    '2-days-delhi-to-agra-weekend-tour',
    '2-days-delhi-to-amritsar-weekend-tour',
    '2-days-varanasi-experience-tour-from-delhi',
    '3-days-delhi-agra-weekend-tour',
    '3-days-delhi-agra-private-tour-with-tajmahal',
    '3-days-jaipur-agra-trip-from-delhi-golden-triangle',
    '3-days-ranthambore-weekend-tour-from-delhi',
    '3-days-jim-corbett-wildlife-tour-from-delhi',
    '3-days-rishikesh-yoga-meditation-tour-from-delhi',
    '3-days-udaipur-cultural-tour-from-delhi',
    '3-days-jaisalmer-jodhpur-tour',
    '3-days-pench-wildlife-tour-from-nagpur',
    '3-days-tadoba-wildlife-tour-from-mumbai',
    'kumarakom-ayurveda-wellness-retreat-3-days',
    'mathura-vrindavan-tour-package-from-delhi',
    'shirdi-with-shani-shingnapur-temple-tour'
  ],
  'hill-station': [
    '6-days-shimla-manali-honeymoon-tours-from-delhi',
    '8-days-shimla-manali-family-trip',
    '9-days-taj-mahal-with-shimla-tour-packages',
    '10-days-golden-triangle-with-shimla-tour',
    '7-days-kashmir-honeymoon-tour-packages',
    '8-days-taj-mahal-with-kashmir-tour-package-from-delhi',
    '10-days-golden-triangle-with-kashmir-tour-package',
    '10-days-kashmir-with-leh-ladakh-tour',
    '12-days-srinagar-leh-ladakh-manali-road-trip',
    'manali-to-leh-ladakh-bike-trip',
    '8-days-ladakh-hemis-festival-tour',
    '7-days-south-india-hill-stations-tour',
    '6-days-kerala-houseboat-munnar-thekkady-tour',
    '8-days-kerala-hills-backwaters-beaches-tour'
  ],
  'nature': [
    '8-days-kerala-hills-backwaters-beaches-tour',
    '7-day-karnataka-and-kerala-tour-wayanad-coorg-and-bekal',
    '6-days-karnataka-with-north-kerala-trip',
    '14-days-south-india-heritage-nature-tour',
    '7-days-south-india-hill-stations-tour',
    '6-days-kerala-houseboat-munnar-thekkady-tour',
    '12-days-srinagar-leh-ladakh-manali-road-trip',
    '10-days-kashmir-with-leh-ladakh-tour',
    '8-days-ladakh-hemis-festival-tour',
    '5-days-rajasthan-bird-sanctuary-wildlife-tour-package'
  ],
  'beach-lake': [
    '14-days-kerala-ayurveda-retreat-somatheeram-backwaters-beach',
    '9-days-kerala-tour-package-cochin-kovalam',
    '8-days-kerala-hills-backwaters-beaches-tour',
    '11-days-goa-and-kerala-tour',
    '6-days-kerala-houseboat-munnar-thekkady-tour',
    '6-days-kerala-honeymoon-tour',
    'kumarakom-ayurveda-wellness-retreat-3-days',
    '12-days-south-india-heritage-backwater-tour',
    '7-day-karnataka-and-kerala-tour-wayanad-coorg-and-bekal',
    '10-days-south-india-tour-package',
    '15-days-south-india-tour-from-mumbai'
  ]
};

async function run() {
  const allJourneys = await prisma.journey.findMany({
    select: { id: true, slug: true, title: true }
  });
  const journeyBySlug = new Map(allJourneys.map(j => [j.slug, j]));

  for (const [catSlug, slugs] of Object.entries(rawMapping)) {
    const validIds = [];
    for (const slug of slugs) {
      const j = journeyBySlug.get(slug);
      if (j) {
        validIds.push(j.id);
      } else {
        console.warn(`[WARN] Journey slug not found in DB: "${slug}" for category "${catSlug}"`);
      }
    }

    const exp = await prisma.travelExperience.findUnique({
      where: { slug: catSlug }
    });

    if (!exp) {
      console.error(`[ERROR] Category slug not found: "${catSlug}"`);
      continue;
    }

    await prisma.travelExperience.update({
      where: { slug: catSlug },
      data: {
        journeys: {
          set: validIds.map(id => ({ id }))
        }
      }
    });

    console.log(`[SUCCESS] Updated "${catSlug}" (ID: ${exp.id}) with ${validIds.length} journeys.`);
  }

  console.log('\n--- Final Verification ---');
  const exps = await prisma.travelExperience.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      _count: { select: { journeys: true } }
    },
    orderBy: { id: 'asc' }
  });
  console.table(exps.map(e => ({
    id: e.id,
    slug: e.slug,
    title: e.title,
    count: e._count.journeys
  })));

  await prisma.$disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

