import { prisma } from './utils/prismaConnection.js';

const descriptions = {
  "3-days-delhi-agra-private-tour-with-tajmahal": "Experience a 3-day Delhi Agra private Taj tour with private car and driver. See top Delhi monuments, sunrise at the Taj Mahal and Agra Fort. Book today.",
  "3-days-delhi-agra-weekend-tour": "Enjoy a 3-day Delhi and Agra weekend tour. Explore historical Delhi landmarks, sunrise at the Taj Mahal, Agra Fort and Mehtab Bagh. Plan your trip now.",
  "2-days-delhi-to-agra-weekend-tour": "Take a 2-day Delhi to Agra private tour with a private chauffeur. Visit the Taj Mahal at sunrise, Agra Fort and Fatehpur Sikri. Book your getaway today.",
  "7-days-golden-triangle-tour": "Explore Delhi, Agra and Jaipur on a 7-day Golden Triangle tour. Visit UNESCO heritage sites, sunrise at the Taj Mahal and royal forts. Book your trip.",
  "8-days-golden-triangle-tour-with-ranthambore-tiger-safari-tour": "Combine heritage and wildlife on an 8-day Golden Triangle and Ranthambore safari. Visit the Taj Mahal, Jaipur palaces and spot wild tigers. Book now.",
  "8-days-golden-triangle-with-rishikesh-yoga-tour": "Join an 8-day Golden Triangle and Rishikesh yoga tour. Explore the Taj Mahal, Jaipur forts, Delhi monuments and peaceful Ganga Aarti. Plan your trip.",
  "8-days-golden-triangle-tour-with-pushkar": "Experience an 8-day Golden Triangle with Pushkar tour. Explore Delhi monuments, the Taj Mahal in Agra, Jaipur forts and holy Pushkar lake. Book today.",
  "8-days-triangle-with-varanasi-trip": "Explore heritage and spirituality on an 8-day Golden Triangle with Varanasi tour. Visit the Taj Mahal, Jaipur palaces and Ganga Aarti. Plan your trip.",
  "10-days-golden-triangle-with-khajuraho-varanasi-tour": "Take a 10-day Golden Triangle and Varanasi tour with Khajuraho. Explore the Taj Mahal, Jaipur palaces, ancient temples and sacred ghats. Book today.",
  "9-days-taj-mahal-with-shimla-tour-packages": "Enjoy a 9-day Taj Mahal with Shimla tour. Explore Delhi heritage sights, the Taj Mahal in Agra and scenic Himalayan mountain views. Plan your trip now.",
  "10-days-golden-triangle-with-shimla-tour": "Experience a 10-day Golden Triangle with Shimla tour. Visit the Taj Mahal in Agra, Jaipur palaces, Delhi monuments and cool hill views. Book your trip.",
  "8-days-taj-mahal-with-kashmir-tour-package-from-delhi": "Take an 8-day Taj Mahal with Kashmir tour from Delhi. Visit the Taj Mahal in Agra, luxury houseboats on Dal Lake and snow in Gulmarg. Plan your trip.",
  "10-days-golden-triangle-with-kashmir-tour-package": "Combine heritage and mountains on a 10-day Golden Triangle and Kashmir tour. See the Taj Mahal, Jaipur forts, Dal Lake and Gulmarg. Book your vacation.",
  "6-days-wildlife-birdwatching-tour-with-taj-mahal": "Enjoy a 6-day Taj Mahal and wildlife private safari. Explore the Taj Mahal, migratory birds in Bharatpur and wild tigers in Ranthambore. Book your trip.",
  "10-days-rajasthan-trip-including-golden-triangle": "Experience a 10-day luxury Rajasthan and Golden Triangle tour. Visit Delhi sights, the Taj Mahal, Jaipur palaces, Jodhpur and Udaipur. Book your trip.",
  "10-days-rajasthan-honeymoon-packages": "Celebrate romance with a 10-day romantic Rajasthan honeymoon tour. Enjoy Jaipur palaces, desert camping in Jaisalmer and Udaipur lakes. Plan your trip.",
  "7-days-rajasthan-tour-packages": "Discover the best of Rajasthan tour with 7 days of royal palaces. Explore Jaipur heritage, holy Pushkar, Mehrangarh Fort and Udaipur. Book your trip.",
  "7-days-rajasthan-pushkar-fair-tour-packages": "Witness culture on a 7-day Rajasthan Pushkar Fair tour. Experience the vibrant camel fair, royal Jaipur palaces and Mehrangarh Fort. Book your trip now.",
  "9-days-rajasthan-holiday-package-from-mumbai": "Take a 9-day Rajasthan tour from Mumbai. Visit Mehrangarh Fort in Jodhpur, romantic Udaipur lakes, historic Bundi and royal Jaipur. Plan your holiday.",
  "15-days-rajasthan-with-taj-mahal-and-ganges-tour-package": "Experience a 15-day Rajasthan, Taj and Ganges tour. Explore Delhi, the Taj Mahal, Jaipur, Jodhpur, Udaipur lakes and Varanasi ghats. Plan your trip now.",
  "16-days-rajasthan-itinerary-with-agra-and-delhi": "Discover heritage on a 16-day Rajasthan, Agra and Delhi tour. Visit Mandawa havelis, Bikaner, Jaisalmer dunes, Jodhpur and the Taj Mahal. Book today.",
  "3-days-udaipur-cultural-tour-from-delhi": "Take a 3-day Udaipur tour from Delhi. Visit City Palace, enjoy a sunset boat ride on Lake Pichola and explore Jagdish Temple. Plan your quick holiday.",
  "3-days-jaisalmer-jodhpur-tour": "Enjoy a 3-day Jaisalmer private desert safari with Jodhpur. Experience Thar camel rides, Sam sand dune camps and Mehrangarh Fort. Book your trip today.",
  "5-days-rajasthan-bird-sanctuary-wildlife-tour-package": "Experience a 5-day Rajasthan wildlife and bird tour. Visit Jaipur forts, rare migratory birds in Bharatpur and wild tigers in Ranthambore. Book today.",
  "8-days-rajasthan-wildlife-tour": "Explore nature on an 8-day Rajasthan tiger and wildlife tour. Visit Jaipur palaces, tiger safaris in Ranthambore and Sariska park. Plan your holiday.",
  "3-days-ranthambore-weekend-tour-from-delhi": "Enjoy a 3-day Ranthambore private tiger safari from Delhi. Take morning and evening jungle jeep safaris to spot Royal Bengal tigers. Book your tour now.",
  "3-days-jim-corbett-wildlife-tour-from-delhi": "Take a 3-day Jim Corbett private wildlife safari from Delhi. Enjoy jeep safaris, wild elephant sightings and Royal Bengal tiger tracking. Book today.",
  "6-days-kerala-honeymoon-tour": "Celebrate romance with a luxury Kerala honeymoon tour 6 days package. Enjoy tea hills in Munnar, Thekkady wildlife and an Alleppey houseboat. Book now.",
  "6-days-kerala-houseboat-munnar-thekkady-tour": "Relax on a 6-day Kerala houseboat and Munnar tour. Explore misty tea gardens, Periyar wildlife in Thekkady and a private backwater cruise. Book today.",
  "8-days-kerala-hills-backwaters-beaches-tour": "Discover nature on an 8-day Kerala hills and backwaters tour. Visit Munnar tea hills, Thekkady wildlife, Alleppey houseboats and Kovalam. Book today.",
  "9-days-kerala-tour-package-cochin-kovalam": "Travel through paradise on a 9-day Kerala Cochin to Kovalam tour. Explore Fort Kochi, Munnar hills, Thekkady and sunny Kovalam beaches. Book your trip.",
  "14-days-kerala-ayurveda-retreat-somatheeram-backwaters-beach": "Rejuvenate with a luxury Kerala Ayurveda retreat 14 days tour. Enjoy daily yoga, traditional herbal therapies, backwaters and beach stays. Book today.",
  "11-days-goa-and-kerala-tour": "Enjoy the best of South India on an 11-day Goa and Kerala holiday tour. Relax on Goa beaches, explore Munnar tea hills and backwaters. Plan your trip.",
  "6-days-karnataka-with-north-kerala-trip": "Explore heritage on a 6-day Karnataka and North Kerala tour. Visit Mysore Palace, fragrant coffee hills in Coorg and scenic Wayanad. Plan your getaway.",
  "7-day-karnataka-and-kerala-tour-wayanad-coorg-and-bekal": "Discover green landscapes on a 7-day Karnataka and Kerala tour. Visit coffee plantations in Coorg, waterfalls in Wayanad and Bekal Fort. Book your trip.",
  "10-days-south-india-tour-package": "Follow our popular 10-day South India tour itinerary. Explore ancient Madurai temples, Munnar tea hills, Thekkady wildlife and Alleppey. Book today.",
  "12-days-south-india-heritage-backwater-tour": "Experience history and nature on a 12-day South India heritage tour. Visit Fort Kochi, Munnar hills, Periyar wildlife and houseboats. Plan your trip.",
  "15-days-south-india-tour-from-mumbai": "Take a 15-day South India tour from Mumbai. Explore royal Mysore, Coorg coffee plantations, Hassan temples, Kerala backwaters and beaches. Book today.",
  "7-days-kashmir-honeymoon-tour-packages": "Celebrate love with a 7-day Kashmir honeymoon tour package. Stay in a luxury Dal Lake houseboat, ride the Gulmarg gondola and visit Betaab Valley. Book.",
  "12-days-srinagar-leh-ladakh-manali-road-trip": "Drive across the Himalayas on a 12-day Srinagar Leh Ladakh road trip. Explore Nubra Valley, Pangong Lake and scenic mountain passes to Manali. Book now.",
  "6-days-shimla-manali-honeymoon-tours-from-delhi": "Experience a luxury Shimla Manali honeymoon tour for 6 days from Delhi. Enjoy romantic mountain views, Kufri snow, Solang Valley and cozy stays. Book.",
  "3-days-rishikesh-yoga-meditation-tour-from-delhi": "Refresh mind and soul on a 3-day Rishikesh yoga tour from Delhi. Enjoy guided yoga classes, daily meditation and evening Ganga Aarti. Plan your trip.",
  "2-days-varanasi-experience-tour-from-delhi": "Experience holy traditions on a 2-day Varanasi tour from Delhi. Witness evening Ganga Aarti, sunrise boat ride on the river and visit Sarnath. Book now.",
  "2-days-delhi-to-amritsar-weekend-tour": "Take a 2-day Delhi to Amritsar private tour. Visit the spiritual Golden Temple, historical Jallianwala Bagh and watch the Wagah Border parade. Book now.",
  "5-days-delhi-agra-amritsar-tour-package": "Combine heritage and spirituality on a 5-day Delhi Agra Amritsar tour. Explore Delhi sights, sunrise at the Taj Mahal and the Golden Temple. Book today.",
  "mathura-vrindavan-tour-package-from-delhi": "Take a peaceful 2-day Mathura Vrindavan tour from Delhi. Visit Shri Krishna Janmabhoomi, Banke Bihari Temple and beautiful Prem Mandir. Plan your trip.",
  "shirdi-with-shani-shingnapur-temple-tour": "Seek divine blessings on a 3-day Shirdi and Shani Shingnapur tour. Visit Sai Baba Temple, Trimbakeshwar Jyotirlinga and holy shrines. Book your trip.",
  "15-days-best-of-india-tour": "Discover iconic highlights on a 15-day best of India heritage tour. Visit the Taj Mahal, Jaipur forts, Jodhpur, Udaipur lakes and Varanasi. Book today."
};

async function updateDescriptions() {
  console.log('Starting meta descriptions update...');
  let updatedCount = 0;

  for (const [slug, seoDescription] of Object.entries(descriptions)) {
    try {
      const res = await prisma.journey.updateMany({
        where: { slug },
        data: { seoDescription }
      });
      if (res.count > 0) {
        updatedCount += res.count;
        console.log(`✅ Updated ${slug} (${seoDescription.length} chars)`);
      } else {
        console.log(`⚠️ Not found in Journey: ${slug}`);
      }
    } catch (err) {
      console.error(`❌ Failed to update ${slug}:`, err.message);
    }
  }

  console.log(`
Finished! Total journeys updated: ${updatedCount} / ${Object.keys(descriptions).length}`);
  await prisma.$disconnect();
}

updateDescriptions().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
