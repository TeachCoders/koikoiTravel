import { prisma } from './utils/prismaConnection.js';

const hillStationArticle = `<h2>Discover India's Best Hill Stations: Mountains, Mist, and Serene Escapes</h2>
<p>India is home to some of the world's most spectacular mountain destinations. From the snow-covered peaks of the Himalayas to the rolling green tea gardens of the Western Ghats, hill stations across India offer a refreshing escape from busy city life. Whether you want to relax with family, enjoy a romantic honeymoon, or experience high-altitude adventures, there is a perfect mountain getaway waiting for you.</p>

<h3>Top Hill Station Destinations in India</h3>
<ul>
  <li><strong>Himachal Pradesh:</strong> Visit <strong>Shimla</strong> for its charming colonial architecture and toy train, <strong>Manali</strong> for snow adventures in Solang Valley and Rohtang Pass, and <strong>Dharamshala</strong> for peaceful mountain views and Tibetan culture.</li>
  <li><strong>Uttarakhand:</strong> Explore <strong>Nainital</strong> with its emerald lake and boating, <strong>Mussoorie</strong> (the Queen of Hills) overlooking the Doon Valley, and scenic getaways like Ranikhet and Kausani.</li>
  <li><strong>Jammu & Kashmir:</strong> Experience the world-famous Gondola ride in <strong>Gulmarg</strong>, picturesque pine valleys in <strong>Pahalgam</strong>, and serene shikara rides in <strong>Srinagar</strong>.</li>
  <li><strong>Maharashtra:</strong> Enjoy cool valley breezes, strawberry farms, and panoramic viewpoints in <strong>Mahabaleshwar</strong>, <strong>Lonavala</strong>, and the car-free hill town of Matheran.</li>
  <li><strong>South India:</strong> Wander through sprawling tea estates in Munnar, ride the historic Nilgiri toy train in Ooty, and enjoy misty pine forests in Kodaikanal.</li>
</ul>

<h3>Best Time to Visit Hill Stations</h3>
<ul>
  <li><strong>Summer (March to June):</strong> The most popular season across Indian hill stations. Temperatures remain pleasantly cool between 15°C and 25°C, making it the best time to escape the summer heat.</li>
  <li><strong>Winter (October to February):</strong> The prime season for snowfall and winter sports in northern destinations like Manali, Gulmarg, and Shimla. Temperatures can drop below freezing, offering magical snow views.</li>
  <li><strong>Monsoon (July to September):</strong> Western Ghat hill stations like Mahabaleshwar and Lonavala become lush green wonderlands with countless roaring waterfalls.</li>
</ul>

<h3>Popular Activities & Mountain Experiences</h3>
<ul>
  <li><strong>Toy Train Rides:</strong> Heritage UNESCO toy trains in Shimla and Ooty offer unforgettable scenic journeys through tunnels and pine hills.</li>
  <li><strong>Adventure Sports:</strong> Paragliding in Solang Valley, river rafting in the foothills, trekking, and cable car rides in Gulmarg.</li>
  <li><strong>Nature Walks & Tea Tastings:</strong> Peaceful strolls through pine forests, apple orchards, and fresh tea plantation tasting tours.</li>
</ul>`;

const wildlifeArticle = `<h2>Experience Wildlife Safaris in India: The Land of the Royal Bengal Tiger</h2>
<p>India is one of the world's richest biodiversity hotspots, holding over 70% of the planet's wild Royal Bengal tiger population. From dense sal forests and sprawling grasslands to rugged river valleys, India's national parks offer thrilling open-jeep jungle safaris and intimate encounters with nature.</p>

<h3>Top National Parks & Wildlife Reserves in India</h3>
<ul>
  <li><strong>Jim Corbett National Park (Uttarakhand):</strong> India's oldest national park, famous for Royal Bengal tigers, wild Asian elephants, and rich birdlife in the Himalayan foothills.</li>
  <li><strong>Ranthambore National Park (Rajasthan):</strong> Famous for daytime tiger sightings roaming amidst medieval fort ruins and scenic jungle lakes.</li>
  <li><strong>Bandhavgarh & Kanha National Parks (Madhya Pradesh):</strong> Renowned for having the highest density of Royal Bengal tigers, lush sal forests, and the inspirations behind <em>The Jungle Book</em>.</li>
  <li><strong>Tadoba-Andhari Tiger Reserve (Maharashtra):</strong> One of central India's fastest-growing tiger safari destinations with exceptional sighting records throughout the year.</li>
  <li><strong>Kaziranga National Park (Assam):</strong> A UNESCO World Heritage Site home to the world's largest population of the Great Indian One-Horned Rhinoceros.</li>
  <li><strong>Gir National Park (Gujarat):</strong> The only place on Earth where you can see Asiatic lions living freely in the wild.</li>
</ul>

<h3>Best Season for Wildlife Safaris</h3>
<ul>
  <li><strong>October to March (Pleasant Weather):</strong> Clear blue skies, crisp morning breezes, and active birdlife. National parks reopen in October after the monsoon rejuvenation.</li>
  <li><strong>April to June (Peak Tiger Sightings):</strong> Summer months dry up the undergrowth, prompting tigers and leopards to gather regularly near natural watering holes for great photography opportunities.</li>
</ul>`;

const spiritualArticle = `<h2>Spiritual & Pilgrimage Journeys in India: Sacred Rivers, Temples, and Peace</h2>
<p>For thousands of years, India has been a beacon of spirituality, welcoming seekers from across the world. From sacred riverbanks where ancient Vedic chants echo at dusk to magnificent temple complexes and peaceful Himalayan ashrams, a spiritual journey in India is a deeply transformative experience.</p>

<h3>Top Spiritual Destinations & Circuits</h3>
<ul>
  <li><strong>Varanasi (Kashi):</strong> One of the world's oldest living cities, celebrated for its sacred Ganga Ghats, Kashi Vishwanath Jyotirlinga temple, and the mesmerizing evening Ganga Aarti.</li>
  <li><strong>Rishikesh & Haridwar:</strong> The Yoga Capital of the World along the holy Ganges, offering meditation retreats, sacred river baths at Har Ki Pauri, and peaceful Himalayan foothills.</li>
  <li><strong>Mathura & Vrindavan:</strong> The sacred land of Lord Krishna, filled with historic temples, devotional music, and joyful festive celebrations.</li>
  <li><strong>Ayodhya:</strong> The sacred birthplace of Lord Rama along the Sarayu River, featuring the grand Shri Ram Janmabhoomi Mandir.</li>
  <li><strong>Golden Temple (Amritsar):</strong> The holiest shrine of Sikhism, renowned for its golden architecture, serene holy pool, and 24/7 community langar welcoming everyone.</li>
  <li><strong>Char Dham & Jyotirlinga Circuits:</strong> Sacred pilgrimage routes across the Himalayas and central India including Kedarnath, Badrinath, Ujjain, and Somnath.</li>
</ul>`;

const familyArticle = `<h2>Family Tour Packages in India: Cherished Holidays for All Generations</h2>
<p>Planning a vacation with your loved ones creates memories that last a lifetime. India offers a rich variety of family-friendly destinations designed to keep both kids and grandparents comfortable, entertained, and inspired. From private guided heritage tours and jungle safaris to relaxing beach resorts and mountain retreats, our family tour packages ensure smooth, worry-free journeys.</p>

<h3>Best Family Holiday Circuits in India</h3>
<ul>
  <li><strong>Golden Triangle (Delhi, Agra & Jaipur):</strong> A classic, comfortable circuit featuring majestic Mughal forts, royal palaces, private air-conditioned cars, and the wonder of the Taj Mahal.</li>
  <li><strong>Himachal & Uttarakhand Hills:</strong> Safe mountain getaways like Shimla, Manali, and Nainital offering pleasant weather, scenic cable car rides, lake boating, and family resorts.</li>
  <li><strong>Kerala Backwaters & Hills:</strong> Relaxing private houseboat stays in Alleppey, gentle tea estate strolls in Munnar, and soothing coastal breezes.</li>
  <li><strong>Rajasthan Royal Heritage:</strong> Interactive puppet shows, desert camel rides, vibrant bazaars, and grand heritage palace stays.</li>
</ul>`;

const beachLakeArticle = `<h2>Beach & Lake Getaways in India: Coastal Breezes and Peaceful Waters</h2>
<p>With thousands of kilometers of sunny coastline and majestic inland freshwater lakes, India is a paradise for water lovers. Whether you want to relax on golden tropical beaches, cruise through tranquil backwater lagoons, or admire high-altitude alpine lakes, these getaways promise pure relaxation and scenic beauty.</p>

<h3>Top Beach & Lake Destinations in India</h3>
<ul>
  <li><strong>Goa:</strong> India's beach capital, famous for golden sandy shores, water sports, Portuguese heritage villas, and beachside dining.</li>
  <li><strong>Kerala Backwaters (Alleppey & Kumarakom):</strong> A serene network of palm-fringed canals, lagoons, and traditional luxury houseboats on Vembanad Lake.</li>
  <li><strong>Andaman & Nicobar Islands:</strong> World-class turquoise waters, coral reefs, scuba diving, and white sand beaches at Radhanagar Beach on Havelock Island.</li>
  <li><strong>Udaipur (The City of Lakes):</strong> Royal palaces rising from Lake Pichola and Fateh Sagar Lake, creating one of India's most romantic settings.</li>
  <li><strong>High-Altitude Himalayan Lakes:</strong> The deep blue waters of Pangong Tso in Ladakh and the emerald waters of Naini Lake in Nainital.</li>
</ul>`;

const EXPERIENCE_UPDATES = [
  {
    slug: 'hill-station',
    moreDescription: hillStationArticle,
    h1Title: 'Hill Station Tour Packages in India - Mountains, Weather & Scenic Getaways',
    seoTitle: 'Hill Station Tour Packages in India | Best Mountain Holidays',
    seoDescription: 'Explore top hill station tour packages in India. Visit Shimla, Manali, Nainital, Mussoorie, Mahabaleshwar, Munnar, and Gulmarg at the best prices.',
    faqs: [
      {
        ques: "What are the best hill stations in India to see snowfall?",
        ans: "Manali, Solang Valley, Rohtang Pass, Gulmarg, and Kufri are the top destinations for experiencing fresh snowfall between December and February."
      },
      {
        ques: "Which hill stations are best for a quick weekend trip from Delhi?",
        ans: "Shimla, Mussoorie, Nainital, and Kasauli are easily accessible within 5 to 7 hours by car or train from Delhi NCR."
      },
      {
        ques: "What is the best season to visit hill stations in South India?",
        ans: "Munnar, Ooty, and Kodaikanal are pleasant throughout the year. October to May is the most popular time with cool temperatures and clear blue skies."
      }
    ]
  },
  {
    slug: 'wildlife',
    moreDescription: wildlifeArticle,
    h1Title: 'Wildlife Tour Packages in India - Tiger Safaris & National Parks',
    seoTitle: 'Wildlife Tour Packages in India | Best Tiger Safaris & Jungle Tours',
    seoDescription: 'Book top-rated wildlife tour packages in India. Experience tiger safaris in Jim Corbett, Ranthambore, Bandhavgarh, Kanha, and Tadoba National Parks.',
    faqs: [
      {
        ques: "Which national park in India has the highest tiger sighting probability?",
        ans: "Bandhavgarh National Park, Tadoba-Andhari, and Ranthambore are known for the highest tiger densities and frequent daytime sightings."
      },
      {
        ques: "When are national parks in India open for tourists?",
        ans: "Most major tiger reserves are open for safaris from October 1st to June 30th every year, closing during the monsoon season for breeding and road maintenance."
      }
    ]
  },
  {
    slug: 'spiritual',
    moreDescription: spiritualArticle,
    h1Title: 'Spiritual Tour Packages in India - Sacred Temples & Holy River Circuits',
    seoTitle: 'Spiritual Tour Packages in India | Pilgrimage & Temple Tours',
    seoDescription: 'Explore sacred spiritual tour packages across India. Visit Varanasi, Rishikesh, Haridwar, Mathura, Vrindavan, Ayodhya, and the Golden Temple.',
    faqs: [
      {
        ques: "What are the top spiritual circuits for first-time travelers in India?",
        ans: "The Varanasi-Prayagraj-Ayodhya circuit and the Delhi-Mathura-Vrindavan-Agra circuit are the most popular and convenient routes."
      },
      {
        ques: "What is the best time to attend the Ganga Aarti in Rishikesh and Varanasi?",
        ans: "The Ganga Aarti happens daily at sunset (around 6:00 PM to 6:45 PM). Arriving 30 to 45 minutes early ensures good seating near the river."
      }
    ]
  },
  {
    slug: 'family',
    moreDescription: familyArticle,
    h1Title: 'Family Tour Packages in India - Comfortable Holidays for All Generations',
    seoTitle: 'Family Tour Packages in India | Safe & Curated Family Vacations',
    seoDescription: 'Plan memorable family vacations in India. Custom itineraries with private transport, child-friendly activities, and handpicked family hotels.',
    faqs: [
      {
        ques: "Which destinations in India are most recommended for family travel with children and seniors?",
        ans: "The Golden Triangle (Delhi-Agra-Jaipur), Himachal Pradesh (Shimla-Manali), and Kerala (Munnar & Alleppey houseboats) offer the best combination of smooth roads, quality hotels, and diverse sightseeing."
      }
    ]
  },
  {
    slug: 'beach-lake',
    moreDescription: beachLakeArticle,
    h1Title: 'Beach & Lake Holiday Packages in India - Coastal Escapes & Calm Waters',
    seoTitle: 'Beach & Lake Tour Packages in India | Coastal Getaways & Houseboats',
    seoDescription: 'Discover top beach and lake holiday packages in India. Visit Goa beaches, Kerala backwaters, Andaman Islands, and Udaipur lakes at best rates.',
    faqs: [
      {
        ques: "What is the best time to visit beach destinations in India?",
        ans: "November to March is the ideal season for beach holidays in Goa, Kerala, and the Andaman Islands, with warm sunny days and pleasant evening sea breezes."
      }
    ]
  }
];

async function updateExperiences() {
  console.log("Updating travel experiences in DB...");
  for (const item of EXPERIENCE_UPDATES) {
    const exp = await prisma.travelExperience.findFirst({ where: { slug: item.slug } });
    if (!exp) {
      console.log(`Experience ${item.slug} not found, skipping`);
      continue;
    }

    await prisma.travelExperience.update({
      where: { id: exp.id },
      data: {
        moreDescription: item.moreDescription,
        h1Title: item.h1Title,
        seoTitle: item.seoTitle,
        seoDescription: item.seoDescription
      }
    });

    if (item.faqs && item.faqs.length > 0) {
      await prisma.faq.deleteMany({
        where: { entityType: 'TravelExperience', entityId: exp.id }
      });
      for (const f of item.faqs) {
        await prisma.faq.create({
          data: {
            ques: f.ques,
            ans: f.ans,
            entityType: 'TravelExperience',
            entityId: exp.id
          }
        });
      }
    }
    console.log(`Updated experience: ${item.slug} (ID ${exp.id})`);
  }
  console.log("All travel experiences updated successfully!");
}

updateExperiences().catch(console.error).finally(() => prisma.$disconnect());
