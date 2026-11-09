import { prisma } from './utils/prismaConnection.js';

// Final verified base titles (clean without " | KoiKoi Travel" since layout.tsx template appends it)
const journeyUpdates = [
  { slug: '5-days-rajasthan-bird-sanctuary-wildlife-tour-package', seoTitle: '5 Days Rajasthan Wildlife & Bird Tour' },
  { slug: '12-days-srinagar-leh-ladakh-manali-road-trip', seoTitle: '12 Days Srinagar Leh Ladakh Road Trip' },
  { slug: '10-days-rajasthan-trip-including-golden-triangle', seoTitle: '10 Days Luxury Rajasthan & Golden Triangle' },
  { slug: '8-days-kerala-hills-backwaters-beaches-tour', seoTitle: '8 Days Kerala Hills & Backwaters Tour' },
  { slug: '7-days-rajasthan-pushkar-fair-tour-packages', seoTitle: '7 Days Rajasthan Pushkar Fair Tour' },
  { slug: '9-days-taj-mahal-with-shimla-tour-packages', seoTitle: '9 Days Taj Mahal with Shimla Tour' },
  { slug: '7-days-rajasthan-tour-packages', seoTitle: 'Best of Rajasthan Tour: 7 Days Royal Palaces' },
  { slug: '9-days-rajasthan-holiday-package-from-mumbai', seoTitle: '9 Days Rajasthan Tour from Mumbai' },
  { slug: '3-days-jim-corbett-wildlife-tour-from-delhi', seoTitle: '3 Days Jim Corbett Safari by Car from Delhi' },
  { slug: '3-days-ranthambore-weekend-tour-from-delhi', seoTitle: 'Ranthambore Tiger Safari by Train: 3 Days' },
  { slug: '8-days-rajasthan-wildlife-tour', seoTitle: '8 Days Rajasthan Tiger & Wildlife Tour' },
  { slug: '3-days-udaipur-cultural-tour-from-delhi', seoTitle: '3 Days Udaipur Tour from Delhi' },
  { slug: '7-days-kashmir-honeymoon-tour-packages', seoTitle: '7 Days Kashmir Honeymoon Tour Package' },
  { slug: '3-days-jaisalmer-jodhpur-tour', seoTitle: '3 Days Jaisalmer Private Desert Safari' },
  { slug: '15-days-south-india-tour-from-mumbai', seoTitle: '15 Days South India Tour from Mumbai' },
  { slug: '10-days-rajasthan-honeymoon-packages', seoTitle: '10 Days Romantic Rajasthan Honeymoon Tour' },
  { slug: '11-days-goa-and-kerala-tour', seoTitle: '11 Days Goa & Kerala Holiday Tour' },
  { slug: '8-days-triangle-with-varanasi-trip', seoTitle: '8 Days Golden Triangle with Varanasi Tour' },
  { slug: '10-days-south-india-tour-package', seoTitle: '10 Days South India Tour Itinerary' },
  { slug: '2-days-delhi-to-agra-weekend-tour', seoTitle: '2 Days Agra Private Tour by Car from Delhi' },
  { slug: '6-days-kerala-honeymoon-tour', seoTitle: 'Luxury Kerala Honeymoon Tour: 6 Days Package' },
  { slug: '8-days-golden-triangle-tour-with-ranthambore-tiger-safari-tour', seoTitle: '8 Days Golden Triangle & Tiger Safari by Car' },
  { slug: '3-days-delhi-agra-private-tour-with-tajmahal', seoTitle: '3 Days Delhi Agra Private Taj Tour' },
  { slug: '15-days-best-of-india-tour', seoTitle: '15 Days Best of India Heritage Tour' },
  { slug: '2-days-delhi-to-amritsar-weekend-tour', seoTitle: '2 Days Delhi to Amritsar Tour by Train' },
  { slug: '14-days-kerala-ayurveda-retreat-somatheeram-backwaters-beach', seoTitle: 'Luxury Kerala Ayurveda Retreat: 14 Days Tour' },
  { slug: '7-day-karnataka-and-kerala-tour-wayanad-coorg-and-bekal', seoTitle: '7 Days Karnataka & Kerala Tour' },
  { slug: '9-days-kerala-tour-package-cochin-kovalam', seoTitle: '9 Days Kerala Cochin to Kovalam Tour' },
  { slug: '3-days-delhi-agra-weekend-tour', seoTitle: '3 Days Delhi & Agra Weekend Tour' },
  { slug: '5-days-delhi-agra-amritsar-tour-package', seoTitle: '5 Days Delhi Agra Amritsar Tour' },
  { slug: '8-days-taj-mahal-with-kashmir-tour-package-from-delhi', seoTitle: '8 Days Taj Mahal with Kashmir Tour' },
  { slug: '3-days-rishikesh-yoga-meditation-tour-from-delhi', seoTitle: '3 Days Rishikesh Yoga Tour from Delhi' },
  { slug: '8-days-golden-triangle-with-rishikesh-yoga-tour', seoTitle: '8 Days Golden Triangle & Rishikesh Yoga' },
  { slug: '7-days-golden-triangle-tour', seoTitle: '7 Days Golden Triangle Tour Delhi Agra' },
  { slug: '6-days-wildlife-birdwatching-tour-with-taj-mahal', seoTitle: '6 Days Taj Mahal & Wildlife Private Safari' },
  { slug: '8-days-golden-triangle-tour-with-pushkar', seoTitle: '8 Days Golden Triangle with Pushkar' },
  { slug: '10-days-golden-triangle-with-kashmir-tour-package', seoTitle: '10 Days Golden Triangle & Kashmir Tour' },
  { slug: '6-days-karnataka-with-north-kerala-trip', seoTitle: '6 Days Karnataka & North Kerala Tour' },
  { slug: '10-days-golden-triangle-with-shimla-tour', seoTitle: '10 Days Golden Triangle with Shimla' },
  { slug: '2-days-varanasi-experience-tour-from-delhi', seoTitle: '2 Days Varanasi Tour from Delhi' },
  { slug: '15-days-rajasthan-with-taj-mahal-and-ganges-tour-package', seoTitle: '15 Days Rajasthan, Taj & Ganges Tour' },
  { slug: 'mathura-vrindavan-tour-package-from-delhi', seoTitle: '2 Days Mathura Vrindavan Tour from Delhi' },
  { slug: '6-days-kerala-houseboat-munnar-thekkady-tour', seoTitle: '6 Days Kerala Houseboat & Munnar Tour' },
  { slug: 'shirdi-with-shani-shingnapur-temple-tour', seoTitle: '3 Days Shirdi & Shani Shingnapur Tour' },
  { slug: '16-days-rajasthan-itinerary-with-agra-and-delhi', seoTitle: '16 Days Rajasthan, Agra & Delhi Tour' },
  { slug: '10-days-golden-triangle-with-khajuraho-varanasi-tour', seoTitle: '10 Days Golden Triangle & Varanasi Tour' },
  { slug: '6-days-shimla-manali-honeymoon-tours-from-delhi', seoTitle: 'Luxury Shimla Manali Honeymoon Tour: 6 Days' },
  { slug: '12-days-south-india-heritage-backwater-tour', seoTitle: '12 Days South India Heritage Tour' }
];

const cityUpdates = [
  { slug: 'pahalgam', seoTitle: 'Pahalgam Tour Packages: Valleys & Trek' },
  { slug: 'amritsar', seoTitle: 'Amritsar Tour Packages: Golden Temple' },
  { slug: 'jodhpur', seoTitle: 'Jodhpur Tour Packages: Mehrangarh Fort' },
  { slug: 'bharatpur', seoTitle: 'Bharatpur Bird Sanctuary Tour Packages' },
  { slug: 'thekkady', seoTitle: 'Thekkady Tour Packages & Periyar Safari' },
  { slug: 'pushkar', seoTitle: 'Pushkar Tour Packages & Camel Safari' },
  { slug: 'jaisalmer', seoTitle: 'Jaisalmer Tour Packages: Desert Safari' },
  { slug: 'cochin', seoTitle: 'Cochin Tour Packages: Fort Kochi Heritage' },
  { slug: 'ranthambore', seoTitle: 'Ranthambore Tour Packages: Tiger Safari' },
  { slug: 'agra', seoTitle: 'Agra Tour Packages: Taj Mahal & Fort' },
  { slug: 'mahabalipuram', seoTitle: 'Mahabalipuram Tour Packages: Shore Temples' },
  { slug: 'kumarakom', seoTitle: 'Kumarakom Tour Packages: Backwater Resorts' },
  { slug: 'hassan', seoTitle: 'Hassan Tour Packages: Hoysala Temples' },
  { slug: 'munnar', seoTitle: 'Munnar Tour Packages: Tea Plantations' },
  { slug: 'sonamarg', seoTitle: 'Sonamarg Tour Packages: Thajiwas Glacier' },
  { slug: 'gulmarg', seoTitle: 'Gulmarg Tour Packages: Gondola & Skiing' },
  { slug: 'jaipur', seoTitle: 'Jaipur Tour Packages: Forts & Palaces' },
  { slug: 'manali', seoTitle: 'Manali Tour Packages: Rohtang & Solang' },
  { slug: 'wayanad', seoTitle: 'Wayanad Tour Packages: Nature & Caves' },
  { slug: 'ooty', seoTitle: 'Ooty Tour Packages: Queen of Hills' },
  { slug: 'madurai', seoTitle: 'Madurai Tour Packages: Meenakshi Temple' },
  { slug: 'bundi', seoTitle: 'Bundi Tour Packages: Stepwells & Forts' },
  { slug: 'shimla', seoTitle: 'Shimla Tour Packages: Mall Road & Hills' },
  { slug: 'coorg', seoTitle: 'Coorg Tour Packages: Coffee & Waterfalls' },
  { slug: 'alleppey', seoTitle: 'Alleppey Tour Packages: Houseboat Cruise' },
  { slug: 'srinagar', seoTitle: 'Srinagar Tour Packages: Dal Lake & Gardens' },
  { slug: 'nubra-valley', seoTitle: 'Nubra Valley Tour Packages: Sand Dunes' },
  { slug: 'leh', seoTitle: 'Leh Ladakh Tour Packages: High Passes' },
  { slug: 'pangong-tso', seoTitle: 'Pangong Tso Tour Packages & Lake Camp' },
  { slug: 'mysore', seoTitle: 'Mysore Tour Packages: Palaces & Heritage' },
  { slug: 'chennai', seoTitle: 'Chennai Tour Packages: Coastal Heritage' },
  { slug: 'varanasi', seoTitle: 'Varanasi Tour Packages: Ghats & Aarti' },
  { slug: 'udaipur', seoTitle: 'Udaipur Tour Packages: Lakes & Palaces' }
];

const stateUpdates = [
  { slug: 'himachal-pradesh', seoTitle: 'Himachal Pradesh Tour Packages & Hills' },
  { slug: 'jammu-and-kashmir', seoTitle: 'Jammu & Kashmir Tour Packages' },
  { slug: 'uttar-pradesh', seoTitle: 'Uttar Pradesh Tour Packages & Heritage' },
  { slug: 'delhi', seoTitle: 'Delhi Tour Packages & Heritage Sightseeing' },
  { slug: 'uttarakhand', seoTitle: 'Uttarakhand Tour Packages & Hill Stations' },
  { slug: 'madhya-pradesh', seoTitle: 'Madhya Pradesh Tour Packages: Wildlife' },
  { slug: 'ladakh', seoTitle: 'Ladakh Tour Packages: Pangong & Monasteries' },
  { slug: 'punjab', seoTitle: 'Punjab Tour Packages: Golden Temple & More' },
  { slug: 'golden-triangle', seoTitle: 'Golden Triangle Tour Packages India' },
  { slug: 'rajasthan', seoTitle: 'Rajasthan Tour Packages: Forts & Desert' },
  { slug: 'kerala', seoTitle: 'Kerala Tour Packages: Backwaters & Hills' },
  { slug: 'south-india', seoTitle: 'South India Tour Packages & Temples' },
  { slug: 'karnataka', seoTitle: 'Karnataka Tour Packages: Heritage & Hills' },
  { slug: 'tamil-nadu', seoTitle: 'Tamil Nadu Tour Packages: Temples & Heritage' }
];

const experienceUpdates = [
  { slug: 'wildlife', seoTitle: 'India Wildlife Tour Packages & Safaris' },
  { slug: 'family', seoTitle: 'Family Tour Packages in India: Vacations' },
  { slug: 'spiritual', seoTitle: 'Spiritual & Pilgrimage Tours in India' },
  { slug: 'hill-station', seoTitle: 'Hill Station Tour Packages in India' },
  { slug: 'ayurveda-yoga', seoTitle: 'Ayurveda & Yoga Tour Packages in India' },
  { slug: 'desert-safari', seoTitle: 'Desert Safari Tour Packages in India' },
  { slug: 'weekend-tours-in-india', seoTitle: 'Weekend Getaway Tours in India' },
  { slug: 'honeymoon', seoTitle: 'Honeymoon Tour Packages in India' }
];

const blogUpdates = [
  { slug: 'golden-triangle-tour-itinerary-cost-best-time', seoTitle: 'Golden Triangle Tour: Cost & Itinerary' },
  { slug: 'lamayuru-monastery-guide', seoTitle: 'Lamayuru Monastery Ladakh Travel Guide' },
  { slug: 'mathura-vrindavan-2-days-itinerary', seoTitle: 'Mathura Vrindavan 2 Days Tour Guide' },
  { slug: 'emirates-ai-check-in-robots-2027-foreign-tourists', seoTitle: 'Emirates AI Check-In Robots Guide' },
  { slug: '10-essential-travel-tips-for-first-time-visitors-to-india', seoTitle: '10 Essential India Travel Tips for Tourists' },
  { slug: 'jawai-leopard-safari-guide', seoTitle: 'Jawai Leopard Safari Guide: Cost & Tips' }
];

async function main() {
  console.log('=== UPDATING SEO TITLES ACROSS DATABASE ===\n');

  // 1. Journeys
  console.log(`[1/6] Updating ${journeyUpdates.length} Journeys...`);
  let jCount = 0;
  for (const j of journeyUpdates) {
    const res = await prisma.journey.updateMany({
      where: { slug: j.slug },
      data: { seoTitle: j.seoTitle }
    });
    if (res.count > 0) jCount += res.count;
    else console.warn(`  - Journey not found: ${j.slug}`);
  }
  console.log(`  -> Successfully updated ${jCount} journeys.`);

  // 2. Cities
  console.log(`\n[2/6] Updating ${cityUpdates.length} Cities...`);
  let cCount = 0;
  for (const c of cityUpdates) {
    const res = await prisma.city.updateMany({
      where: { slug: c.slug },
      data: { seoTitle: c.seoTitle }
    });
    if (res.count > 0) cCount += res.count;
    else console.warn(`  - City not found: ${c.slug}`);
  }
  console.log(`  -> Successfully updated ${cCount} cities.`);

  // 3. States
  console.log(`\n[3/6] Updating ${stateUpdates.length} States...`);
  let sCount = 0;
  for (const s of stateUpdates) {
    const res = await prisma.state.updateMany({
      where: { slug: s.slug },
      data: { seoTitle: s.seoTitle }
    });
    if (res.count > 0) sCount += res.count;
    else console.warn(`  - State not found: ${s.slug}`);
  }
  console.log(`  -> Successfully updated ${sCount} states.`);

  // 4. Country (India)
  console.log(`\n[4/6] Updating Country (India)...`);
  const coRes = await prisma.country.updateMany({
    where: { slug: 'india' },
    data: { seoTitle: 'Incredible India Tour Packages & Trips' }
  });
  console.log(`  -> Successfully updated ${coRes.count} country.`);

  // 5. Travel Experiences
  console.log(`\n[5/6] Updating ${experienceUpdates.length} Travel Experiences...`);
  let expCount = 0;
  for (const exp of experienceUpdates) {
    const res = await prisma.travelExperience.updateMany({
      where: { slug: exp.slug },
      data: { seoTitle: exp.seoTitle }
    });
    if (res.count > 0) expCount += res.count;
    else console.warn(`  - Experience not found: ${exp.slug}`);
  }
  console.log(`  -> Successfully updated ${expCount} travel experiences.`);

  // 6. Blogs
  console.log(`\n[6/6] Updating ${blogUpdates.length} Blogs...`);
  let bCount = 0;
  for (const b of blogUpdates) {
    const res = await prisma.blog.updateMany({
      where: { slug: b.slug },
      data: { seoTitle: b.seoTitle }
    });
    if (res.count > 0) bCount += res.count;
    else console.warn(`  - Blog not found: ${b.slug}`);
  }
  console.log(`  -> Successfully updated ${bCount} blogs.`);

  console.log('\n=== ALL SEO TITLES UPDATED SUCCESSFULLY! ===');
}

main()
  .catch((e) => {
    console.error('Update failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
