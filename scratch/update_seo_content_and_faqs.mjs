import { prisma } from "./utils/prismaConnection.js";

const CURATED_DESTINATION_FAQS = {
  // 1. JAIPUR
  jaipur: [
    {
      question: "How many days are ideal to explore Jaipur's forts, palaces, and markets?",
      answer: "A 2 to 3-day itinerary is recommended. This allows you to explore Amber Fort, City Palace, Hawa Mahal, and Jantar Mantar on days 1 and 2, and spend day 3 enjoying the Nahargarh sunset view and shopping in Johari and Bapu Bazaars.",
    },
    {
      question: "What is the best time of the year to visit Jaipur?",
      answer: "October to March is the best season with pleasant daytime temperatures between 15°C and 26°C. Days are sunny and comfortable for monument walks, while evenings are refreshingly cool.",
    },
    {
      question: "What are the top must-visit attractions in Jaipur?",
      answer: "The iconic sights include Amber Fort & Palace, Hawa Mahal (Palace of Winds), City Palace museum, Jantar Mantar observatory, Nahargarh Fort, Jal Mahal, and the Albert Hall Museum.",
    },
    {
      question: "Why is Jaipur called the Pink City?",
      answer: "In 1876, Maharaja Sawai Ram Singh painted the entire walled city terracotta pink—the traditional color of warm hospitality—to welcome Prince Albert of Great Britain. The city continues this heritage by law today.",
    },
    {
      question: "Should I visit Amber Fort in the morning, and how do I reach the top?",
      answer: "Early morning (8:00 AM to 10:30 AM) is the best time to visit Amber Fort before crowds and midday heat. You can reach the main courtyard via authorized elephant rides, air-conditioned 4x4 Jeeps, or by walking the royal cobbled ramp.",
    },
    {
      question: "What are the best shopping spots in Jaipur for authentic crafts?",
      answer: "Johari Bazaar is famous for certified gemstones and handmade Meenakari jewellery; Bapu Bazaar is best for Jaipuri block-printed cottons, quilts, and Mojari leather juttis; and Chandpole Bazaar specializes in traditional marble statues and blue pottery.",
    },
    {
      question: "What local Rajasthani food and sweets should I try in Jaipur?",
      answer: "Do not miss authentic Dal Baati Churma with pure ghee, crispy Pyaz Kachori at Rawat Mishtan Bhandar, Ghewar sweet at LMB, Ker Sangri curry, and creamy chilled Lassi at Lassiwala on MI Road.",
    },
    {
      question: "Is Jaipur safe for solo female travelers and foreign tourists?",
      answer: "Yes, Jaipur is one of India's most tourist-friendly and hospitable cities. As with any busy destination, booking a verified private chauffeur and licensed monument guide ensures peace of mind and avoids shopping commission hassles.",
    },
    {
      question: "What are the best day trips and excursions from Jaipur?",
      answer: "Popular day trips include the ancient Chand Baori stepwell at Abhaneri (95 km), the holy lake town of Pushkar (145 km), the historic ghost fort of Bhangarh (85 km), and Samode Palace (42 km).",
    },
    {
      question: "Why is hiring a private car and chauffeur the best way to see Jaipur?",
      answer: "Jaipur's attractions are spread across a wide area—hill forts like Amber and Nahargarh are outside town while bazaars are in the crowded walled city. A private air-conditioned vehicle with an experienced chauffeur provides stress-free, door-to-door comfort throughout the day.",
    },
  ],

  // 2. BUNDI
  bundi: [
    {
      question: "What makes Bundi unique compared to Jaipur, Jodhpur, and Udaipur?",
      answer: "Bundi retains an authentic, unhurried medieval charm. Famous for its blue-washed houses, narrow alleys, magnificent stepwells, and ancient Rajput palace murals, Bundi offers a rich cultural experience free from tourist crowds.",
    },
    {
      question: "What is the best time of year to visit Bundi, Rajasthan?",
      answer: "October to March is ideal with mild sunny days (20°C–28°C) and crisp nights. The monsoon season (July to September) is also scenic as the Aravalli hills turn emerald green and regional waterfalls come alive.",
    },
    {
      question: "How many days do I need to explore Bundi comfortably?",
      answer: "2 days is plenty to tour Garh Palace, the Chitrashala art gallery, Taragarh Fort, major stepwells like Raniji ki Baori, Sukh Mahal on Jait Sagar Lake, and the 84-Pillared Cenotaph.",
    },
    {
      question: "How do I reach Bundi from Jaipur, Kota, or Delhi?",
      answer: "Bundi is about 210 km south of Jaipur (~3.5 hours drive by private car). Major rail junction Kota is just 38 km away (~45 minutes drive), connecting to Delhi and Mumbai by high-speed trains.",
    },
    {
      question: "What are the top tourist attractions in Bundi?",
      answer: "Must-visit sights include Garh Palace, Taragarh Fort overlooking the city, Raniji ki Baori (Queen's Stepwell), Dabhai Kund, Sukh Mahal (where Rudyard Kipling stayed), and the 84-Pillared Cenotaph.",
    },
    {
      question: "Why is Bundi called the City of Stepwells?",
      answer: "Bundi has over 50 historic stepwells (baoris) engineered centuries ago to harvest rainwater in Rajasthan. Raniji ki Baori is the finest example, featuring multi-tiered stone archways carved with divine figures and guardian elephants.",
    },
    {
      question: "What is special about Bundi miniature paintings?",
      answer: "The Bundi School of painting is famous across the art world for vibrant natural pigments, expressive figures, and lush depictions of nature, monsoon skies, and Radha-Krishna lore. You can see original 17th-century frescoes at the Chitrashala inside Garh Palace.",
    },
    {
      question: "Is Bundi safe and relaxed for solo foreign travelers and couples?",
      answer: "Yes, Bundi is exceptionally peaceful, safe, and welcoming. Local townspeople and shopkeepers are warm and hospitable, and visitors rarely experience the aggressive touting found in larger tourist cities.",
    },
    {
      question: "What local food should I try in Bundi?",
      answer: "Try traditional Rajasthani Dal Baati Churma, crisp spiced Kota Kachoris, sweet mawa pedas, and fresh masala chai at the quaint cafes around the palace base.",
    },
    {
      question: "Can Bundi be easily combined with other Rajasthan destinations?",
      answer: "Yes, Bundi pairs seamlessly with Ranthambore Tiger Reserve (130 km, ~2.5 hrs), Kota (38 km), and Chittorgarh Fort (150 km, ~3 hrs) en route to Udaipur.",
    },
  ],

  // 3. DHARAMSHALA
  dharamshala: [
    {
      question: "What is the best time to visit Dharamshala and McLeod Ganj?",
      answer: "March to June is the peak spring/summer season with pleasant weather (15°C–25°C), blooming rhododendrons, and clear mountain vistas. October to February brings chilly winter weather and snow on higher peaks like Triund.",
    },
    {
      question: "How many days are ideal for a complete Dharamshala trip?",
      answer: "3 to 4 days is the recommended duration. This allows 2 days to explore McLeod Ganj's Buddhist monasteries, cafes, and markets, 1 day for a scenic Triund hike or Kangra Valley day trip, and time to visit the tea gardens and cricket stadium.",
    },
    {
      question: "How do I reach Dharamshala from Delhi or Chandigarh?",
      answer: "Gaggal Airport (DHM) is just 14 km from Dharamshala with daily direct flights from Delhi. The nearest broad-gauge railway station is Pathankot Cantt (85 km, ~2.5 hrs drive). Private chauffeur cabs take about 9–10 hours from Delhi or 5–6 hours from Chandigarh.",
    },
    {
      question: "What is the difference between Dharamshala and McLeod Ganj?",
      answer: "Dharamshala is the lower commercial town famous for the scenic HPCA International Cricket Stadium and tea gardens. McLeod Ganj (Upper Dharamshala, 9 km uphill) is the Tibetan cultural hub and residence of His Holiness the Dalai Lama.",
    },
    {
      question: "What are the top places to visit in Dharamshala and McLeod Ganj?",
      answer: "Top sights include the Tsuglagkhang Complex (Dalai Lama Temple), HPCA Cricket Stadium, Bhagsunag Waterfall, St. John in the Wilderness Church, Norbulingka Institute, Gyuto Monastery, and Kangra Art Museum.",
    },
    {
      question: "Is the Triund trek suitable for beginners and families?",
      answer: "Yes, the 9 km Triund day hike is a beginner-friendly trek with well-marked trails. It offers breathtaking panoramic views of the Dhauladhar mountain range and the Kangra Valley.",
    },
    {
      question: "What local Tibetan and Himachali dishes should I try?",
      answer: "Enjoy steamed and fried momos, hot thukpa noodle soup, tingmo bread with spicy sauce, and traditional Himachali Kangra Dham (a festive multi-dish vegetarian feast cooked in brass pots).",
    },
    {
      question: "What unique souvenirs can I shop for in McLeod Ganj?",
      answer: "Shop for Tibetan singing bowls, thangka scroll art, prayer wheels and flags, Kangra orthodox green tea, handmade silver jewelry, and warm Himalayan woollen shawls in Temple Road markets.",
    },
    {
      question: "Is Dharamshala safe for solo female travelers and senior citizens?",
      answer: "Dharamshala is consistently rated among India's safest and most welcoming hill stations. The peaceful Buddhist culture, friendly locals, and active cafe scene make it very comfortable for solo female travelers and families.",
    },
    {
      question: "Why book a private chauffeur with KoiKoi Travel in Dharamshala?",
      answer: "Mountain roads between Lower Dharamshala, McLeod Ganj, Dharamkot, and Kangra are steep and curvy. Having a verified mountain driver ensures safe, comfortable transit and hassle-free day trips to Kangra Fort or Bir Billing.",
    },
  ],

  // 4. HEMIS MONASTERY
  "hemis-monastery": [
    {
      question: "Where is Hemis Monastery located and how far is it from Leh?",
      answer: "Hemis Gompa is located about 45 km southeast of Leh along the Indus River valley, nestled inside a dramatic gorge off the Leh-Manali highway (~1 to 1.5 hours drive by private car).",
    },
    {
      question: "When does the world-famous Hemis Festival take place?",
      answer: "The Hemis Festival (Hemis Tsechu) is celebrated in June or July (lunar 10th day of Tsechu month) marking Guru Padmasambhava's birth anniversary. Monks perform colorful sacred masked dances (Cham) in the central courtyard.",
    },
    {
      question: "Why is Hemis Monastery considered the richest and largest monastery in Ladakh?",
      answer: "Belonging to the Drukpa Kagyu lineage of Tibetan Buddhism, Hemis was re-established in 1672 under royal patronage of King Sengge Namgyal. It safeguards immense wealth including a gold-plated Buddha, priceless thangkas, and ancient relics.",
    },
    {
      question: "What are the visitor timings and entry ticket fees for Hemis Gompa?",
      answer: "Hemis Monastery is open daily from 8:00 AM to 6:00 PM (with a short lunch break around 1:00 PM). Entry fee is ₹100 per adult, which grants entry to both the monastery shrines and the underground museum.",
    },
    {
      question: "What precautions are needed for altitude sickness before visiting Hemis?",
      answer: "Hemis sits at ~3,700 meters (12,100 feet). Travelers flying into Leh must rest for the first 24 to 48 hours to acclimatize before taking road excursions to Hemis or higher mountain passes.",
    },
    {
      question: "Can I visit Hemis National Park on the same trip?",
      answer: "Hemis Monastery serves as the primary eastern entrance to Hemis National Park, famous for wild snow leopards, blue sheep (bharal), and golden eagles. Visiting the monastery is a day trip, while snow leopard tracking inside the park requires guided winter expeditions.",
    },
    {
      question: "What is the dress code and etiquette inside Hemis Monastery?",
      answer: "Dress modestly covering shoulders and knees. Remove shoes before entering prayer halls, walk clockwise around shrines and stupas, do not touch sacred idols or thangkas, and maintain respectful silence during chanting.",
    },
    {
      question: "How long does a typical visit to Hemis Monastery take?",
      answer: "A complete visit takes about 2 to 3 hours, allowing you to admire the main assembly hall (Tukkhang), the shrine of Guru Padmasambhava, the rooftop valley views, and the museum.",
    },
    {
      question: "Is road travel to Hemis comfortable by private car?",
      answer: "Yes, the road from Leh through Choglamsar and Karu is well-paved and follows the scenic Indus River. Traveling in a private SUV like a Toyota Innova Crysta ensures a smooth, comfortable journey.",
    },
    {
      question: "Can Hemis Monastery be combined with other sights on a day tour?",
      answer: "Yes, a popular full-day Indus Valley cultural circuit combines Hemis Monastery with Thiksey Monastery, Shey Palace, Stakna Gompa, and Sindhu Ghat.",
    },
  ],

  // 5. PENCH
  pench: [
    {
      question: "What is Pench famous for and why is it called the Land of The Jungle Book?",
      answer: "Pench Tiger Reserve is the real-life forest setting that inspired Rudyard Kipling's classic *The Jungle Book*. It is home to Royal Bengal tigers, leopards, Indian wild dogs (dhole), sloth bears, gaurs, and over 285 bird species.",
    },
    {
      question: "Which state is Pench in – Maharashtra or Madhya Pradesh?",
      answer: "Pench National Park straddles both Madhya Pradesh and Maharashtra across the Satpura hill range. You can enter through Maharashtra gates (Sillari, Khursapar, Kolitmara) or MP gates (Turia, Karmajhiri, Jamtara).",
    },
    {
      question: "What is the best time of year to visit Pench National Park for tiger sightings?",
      answer: "October to June is the open safari season. March to May is the best time for tiger sightings as drying forest foliage and shrinking waterholes draw animals into open view. Winter (November to February) offers cool, pleasant morning weather and great birdwatching.",
    },
    {
      question: "How do I reach Pench National Park from Nagpur?",
      answer: "Nagpur's Dr. Babasaheb Ambedkar International Airport and railway station are just 85 km (~2 hours drive via the four-lane NH44 expressway) to Sillari gate and ~95 km (~2.5 hours) to Turia gate.",
    },
    {
      question: "How do I book jungle Jeep safaris in Pench?",
      answer: "Safaris are conducted in authorized open 4x4 Gypsys with a forest department tracker. Weekend and peak season permits sell out weeks in advance on the forest portal, so booking 60–90 days ahead is strongly advised.",
    },
    {
      question: "What are the most popular safari entry gates in Pench?",
      answer: "Turia (MP) and Sillari (MH) are the most popular gates with high tiger densities and luxury forest lodges nearby. Khursapar (MH) is famous for frequent predator sightings, while Karmajhiri offers dense teak forest scenery.",
    },
    {
      question: "How many safari drives should I take to spot a tiger?",
      answer: "Taking at least 3 to 4 safari drives across both morning and afternoon slots significantly increases your chance of tracking and photographing a Royal Bengal tiger in the wild.",
    },
    {
      question: "What kinds of accommodations are available near Pench?",
      answer: "Pench features world-class eco-luxury jungle lodges, heritage tented camps, and comfortable family resorts near Turia and Sillari gates, offering expert resident naturalists, outdoor pools, and bonfire dinners.",
    },
    {
      question: "What should I wear and pack for a jungle safari in Pench?",
      answer: "Wear neutral earthy colors (khaki, beige, olive green) and avoid bright neon clothes or strong perfumes. For morning winter safaris, bring a warm windproof jacket, scarf, and beanie as open Gypsys get very cold at sunrise.",
    },
    {
      question: "Can I combine Pench with Tadoba or Kanha Tiger Reserves?",
      answer: "Yes, Pench connects smoothly via NH44 to Tadoba-Andhari Tiger Reserve (3.5 hours south) and Kanha National Park (4 hours northeast), forming Central India's premier tiger safari circuit.",
    },
  ],

  // 6. HUBLI
  hubli: [
    {
      question: "What is Hubli famous for, and why is it worth visiting?",
      answer: "Hubli (Hubballi) and its twin city Dharwad form the commercial and cultural capital of North Karnataka, famous for the 900-year-old Chandramouleshwara Temple, Unkal Lake, the Sufi-Hindu shrine of Siddharoodha Math, and the GI-tagged Dharwad Peda.",
    },
    {
      question: "What is the best time of year to visit Hubli?",
      answer: "October to March is the best season with cool, dry weather (16°C–28°C), making it comfortable for heritage sightseeing and exploring nearby Chalukyan temple circuits.",
    },
    {
      question: "How do I reach Hubli by air, train, and road?",
      answer: "Hubli Airport (HBX) has daily direct flights from Bengaluru, Mumbai, Hyderabad, and Chennai. Hubballi Junction is the headquarters of South Western Railway with nationwide train connections, and NH48 connects it seamlessly to Bengaluru and Goa.",
    },
    {
      question: "What are the top tourist attractions in Hubli and Dharwad?",
      answer: "Top sights include Chandramouleshwara Temple (Western Chalukya masterpiece), Unkal Lake and musical fountain park, Nrupatunga Betta hill viewpoint, Indira Gandhi Glass House, and Siddharoodha Math.",
    },
    {
      question: "Can I do a day trip to Hampi from Hubli?",
      answer: "Yes, UNESCO World Heritage Site Hampi is located 160 km east of Hubli (~3.5 hours drive via NH67), making Hubli an excellent gateway city with comfortable flights and luxury business hotels.",
    },
    {
      question: "What is the world-famous Dharwad Peda and where can I buy authentic boxes?",
      answer: "Dharwad Peda is a Geographical Indication (GI) tagged sweet made by slowly caramelizing fresh buffalo milk mawa and dusting it with sugar. The historic Babu Singh Thakur Peda shop on Line Bazaar in Dharwad is the original 175-year-old home of this delicacy.",
    },
    {
      question: "Can Hubli be used as a base to explore Badami, Aihole, and Pattadakal?",
      answer: "Yes, the 6th-century rock-cut cave temples of Badami (105 km, ~2 hrs drive) and the UNESCO World Heritage monuments of Pattadakal and Aihole are an easy, scenic day trip from Hubli.",
    },
    {
      question: "What are the traditional North Karnataka meals to try in Hubli?",
      answer: "Savor authentic Jolada Rotti Oota (sorghum flatbread with spicy brinjal curry/ennegai, shenga peanut chutney, and fresh butter), spicy Girmit puffed rice snack, and hot Mirchi Bhajji.",
    },
    {
      question: "How many days are ideal to spend in Hubli?",
      answer: "1 to 2 days is ideal for Hubli and Dharwad sights, or 4 to 5 days if you use Hubli as a comfortable base to tour Hampi, Badami, and the Dandeli wildlife forests.",
    },
    {
      question: "Why book a private car with KoiKoi Travel for exploring North Karnataka?",
      answer: "North Karnataka's top heritage attractions are dispersed across several historic towns. Having a dedicated air-conditioned car and verified chauffeur guarantees seamless highway travel, luggage security, and timely station/airport transfers.",
    },
  ],

  // 7. DESERT SAFARI
  "desert-safari": [
    {
      question: "Where is the best place to experience an authentic desert safari in India?",
      answer: "The Sam Sand Dunes and Khuri Sand Dunes in Jaisalmer (Thar Desert, Rajasthan) are the most authentic locations for golden desert safaris. Other notable spots include Osian near Jodhpur and the dunes around Bikaner.",
    },
    {
      question: "What activities are included in a desert safari package?",
      answer: "A standard luxury package includes a sunset camel ride across sand ripples, 4x4 Jeep dune bashing, traditional Rajasthani dhol and tikka welcome, evening bonfire with Kalbelia folk dance and Manganiyar music, a royal buffet dinner, and an overnight luxury tent stay.",
    },
    {
      question: "Can we stay overnight in desert camps, and are tents comfortable in winter?",
      answer: "Yes! Modern luxury desert camps offer Swiss-style canvas tents with attached tiled bathrooms, hot water, comfortable double beds, and heavy quilts to keep you warm against crisp winter desert night temperatures.",
    },
    {
      question: "What is the difference between Sam Sand Dunes and Khuri Sand Dunes?",
      answer: "Sam Dunes (42 km from Jaisalmer) features tall shifting dunes and energetic evening entertainment with numerous desert resorts. Khuri Dunes (48 km) is quieter, less crowded, and ideal for travelers seeking serenity, village culture, and stargazing.",
    },
    {
      question: "Is 4x4 Jeep dune bashing safe for seniors and young children?",
      answer: "Yes, experienced desert drivers navigate customized 4x4 vehicles across sand dunes. Gentle scenic drives can be requested for seniors, pregnant women, and small children, while thrill-seekers can opt for high-adrenaline crest surfing.",
    },
    {
      question: "What is the best month of the year to take a desert safari in Rajasthan?",
      answer: "October to March is the ideal season. Daytime temperatures are pleasant and sunny (22°C–28°C), while nights are cool and refreshing (8°C–14°C). Desert safaris are generally closed or avoided during scorching summer months (April to June).",
    },
    {
      question: "What should I pack and wear for cold desert nights and sunny days?",
      answer: "Pack light, breathable cotton clothes, sunglasses, and sun hats for midday sun. For the evening and night, carry warm jackets, a fleece pullover, and socks, as desert temperatures drop rapidly after sunset.",
    },
    {
      question: "Is vegetarian and international food available at desert camps?",
      answer: "Yes, reputable desert camps serve generous buffet spreads with vegetarian and non-vegetarian options, including authentic Rajasthani specialties like Dal Baati Churma and Gatte ki Sabzi, alongside mild continental dishes.",
    },
    {
      question: "What cultural entertainment is provided in the evening?",
      answer: "Evenings come alive around a glowing campfire with live performances by famous Kalbelia gypsy dancers, fire-eaters, and soul-stirring Thar folk songs played on the kamaicha, morchang, and dholak.",
    },
    {
      question: "Can I combine a desert safari with a Jaisalmer city tour?",
      answer: "Yes, most travelers spend one day touring Jaisalmer's living Golden Fort, Jain temples, Patwon ki Haveli, and Gadisar Lake, before heading to the sand dunes for the afternoon safari and overnight camp stay.",
    },
  ],

  // 8. SPRING SEASON
  "spring-tours-in-india": [
    {
      question: "Which months constitute the spring season in India?",
      answer: "Spring spans mid-February through April. It is the golden transition window between the winter chill and scorching summer heat across the subcontinent.",
    },
    {
      question: "Why is spring considered one of the best times to travel in India?",
      answer: "Spring brings ideal temperatures (18°C–28°C across most regions), clear sunny skies, lush green landscapes, blooming flower gardens, and prime wildlife viewing conditions before peak summer begins.",
    },
    {
      question: "Which are the top destinations to visit in India during spring?",
      answer: "Top choices include Srinagar and Kashmir (for the world-famous Tulip Garden), the Golden Triangle (Delhi, Agra, Jaipur), the tea hills of Munnar and Ooty, wildlife reserves like Corbett and Ranthambore, and temple heritage towns across Tamil Nadu and Karnataka.",
    },
    {
      question: "When does the famous Srinagar Tulip Garden bloom in Kashmir?",
      answer: "The Indira Gandhi Memorial Tulip Garden in Srinagar blooms from mid-March to mid-April, featuring over 1.5 million colorful tulips in more than 60 varieties backdropped by the snow-capped Zabarwan mountains.",
    },
    {
      question: "How are wildlife safari sightings in spring compared to winter?",
      answer: "Spring is considered prime wildlife tracking season. As winter vegetation recedes and natural waterholes begin drying up, tigers, leopards, elephants, and deer regularly gather around major lakes and riverbanks, offering fantastic photography opportunities.",
    },
    {
      question: "What is the weather like in North and South India during spring?",
      answer: "North India enjoys crisp, pleasant sunny days (20°C–28°C) and cool evenings. Central and South India are comfortably warm (26°C–32°C), while Himalayan hill stations offer fresh mountain air without freezing winter sub-zero temperatures.",
    },
    {
      question: "Can I experience the festival of Holi during a spring tour in India?",
      answer: "Yes! Holi, the world-famous festival of colors and love, is celebrated in March every year. Travelers can experience royal palace celebrations in Jaipur, sacred Phoolon ki Holi (flower petals) in Mathura and Vrindavan, or vibrant beach gatherings in Goa.",
    },
    {
      question: "What clothes should I pack for an India spring holiday?",
      answer: "Pack lightweight, breathable cotton clothes for daytime sightseeing, along with comfortable walking shoes, sunglasses, and sunblock. If visiting northern hill stations or going on early morning safaris, pack a light jacket or fleece.",
    },
    {
      question: "Is spring a good time for budget travelers compared to peak winter?",
      answer: "Yes, March and early April see fewer holiday crowds compared to peak December and January, offering better hotel availability, quieter monument visits, and attractive value pricing across luxury heritage resorts.",
    },
    {
      question: "How does KoiKoi Travel help plan and customize a private spring holiday?",
      answer: "KoiKoi Travel provides tailor-made spring itineraries with private air-conditioned vehicles, verified chauffeurs, handpicked boutique hotels, and dedicated 24/7 on-trip assistance customized to your personal pace and budget.",
    },
  ],
};

async function main() {
  console.log("Starting database content & FAQ update for SEO indexing...");

  // 1. Dharamshala (City ID 48)
  console.log("Updating Dharamshala (City 48)...");
  await prisma.faq.deleteMany({ where: { entityType: "City", entityId: 48 } });
  await prisma.faq.createMany({
    data: CURATED_DESTINATION_FAQS["dharamshala"].map((f) => ({
      ques: f.question,
      ans: f.answer,
      entityType: "City",
      entityId: 48,
    })),
  });

  // 2. Hemis Monastery (City ID 93)
  console.log("Updating Hemis Monastery (City 93)...");
  await prisma.faq.deleteMany({ where: { entityType: "City", entityId: 93 } });
  await prisma.faq.createMany({
    data: CURATED_DESTINATION_FAQS["hemis-monastery"].map((f) => ({
      ques: f.question,
      ans: f.answer,
      entityType: "City",
      entityId: 93,
    })),
  });

  // 3. Pench (City ID 119)
  console.log("Updating Pench (City 119)...");
  const penchOverview = "Pench National Park, immortalized as the real-life setting for Rudyard Kipling's *The Jungle Book*, is one of Central India's finest tiger reserves. Straddling Maharashtra and Madhya Pradesh along the southern slopes of the Satpura hills, Pench features teak-dominated forests, open savannah meadows, and the tranquil waters of the Pench River, sheltering Bengal tigers, leopards, wild dogs, and over 285 bird species.";
  const penchMoreDesc = `<h2>About Pench National Park – The Land of Mowgli</h2>
<p>Nestled along the picturesque border of southern Madhya Pradesh and northern Maharashtra, Pench Tiger Reserve is celebrated worldwide as the untamed playground of Mowgli, Bagheera, and Sher Khan from Rudyard Kipling's immortal <em>The Jungle Book</em>. Spanning across rolling Satpura foothills, the park is named after the meandering Pench River, which bifurcates the sanctuary into eastern and western halves before feeding the sprawling Totladoh reservoir.</p>

<p>Characterized by dense tropical dry deciduous teak forests, bamboo clumps, and open grassy clearings known as 'maidans', Pench provides an exceptional natural theater for wildlife photography. Unlike denser rainforests, the open canopy and gently undulating terrain offer superb visibility for tracking big cats and herds of herbivores.</p>

<h3>Wildlife and Predator Habitats in Pench</h3>
<p>Pench is home to a thriving population of Royal Bengal tigers, leopards, Asiatic wild dogs (dhole), jungle cats, and striped hyenas. Herds of spotted deer (chital), sambar, nilgai, wild boars, and the massive Indian gaur (the largest wild bovine on Earth) roam the forest floor. Birdwatchers can spot over 285 species, including the Malabar pied hornbill, Indian pitta, crested serpent eagle, and migratory waterfowl around the Totladoh reservoir.</p>

<h3>Pench Safari Entry Gates: Maharashtra vs Madhya Pradesh</h3>
<p>Because Pench is a contiguous forest reserve straddling two states, safaris are accessed through different official entry gates:</p>
<ul>
<li><strong>Turia Gate (MP):</strong> The most famous entry gate with the highest density of tourist lodges and frequent tiger sightings around the Baghin Nala and Pyorthuri zones.</li>
<li><strong>Sillari Gate (Maharashtra):</strong> Easily accessible from Nagpur via NH44 (just 85 km), Sillari covers pristine riverine forests and the bamboo valleys of Maharashtra.</li>
<li><strong>Khursapar Gate (Maharashtra):</strong> Renowned among wildlife enthusiasts for dedicated tiger territorial movements and high predator activity.</li>
<li><strong>Karmajhiri & Jamtara Gates (MP):</strong> Quiet, secluded gates offering deep forest tranquility and superb birdwatching.</li>
</ul>

<h3>Best Time to Visit Pench for Wildlife & Tiger Safaris</h3>
<p>The park is open for safaris from <strong>October 1 to June 30</strong> every year. The best period depends on your travel goals:</p>
<ul>
<li><strong>March to May (Spring / Summer):</strong> Peak tiger sightings. As heat dries out forest foliage and seasonal waterholes disappear, tigers and leopards congregate around surviving water points.</li>
<li><strong>November to February (Winter):</strong> Crisp morning air, lush post-monsoon greenery, comfortable afternoon drives, and spectacular migratory bird activity.</li>
</ul>

<h3>How to Reach Pench National Park</h3>
<p>Pench is one of the easiest tiger reserves in India to reach by air and rail:</p>
<ul>
<li><strong>By Air:</strong> Dr. Babasaheb Ambedkar International Airport in Nagpur is just 85 km (~2 hours drive via the 4-lane NH44 highway) to Sillari and 95 km (~2.5 hours) to Turia.</li>
<li><strong>By Train:</strong> Nagpur Junction and Seoni Railway Stations are the primary railheads, with direct express trains from Delhi, Mumbai, Bengaluru, and Kolkata.</li>
<li><strong>By Private Chauffeur:</strong> KoiKoi Travel provides private air-conditioned airport transfers with experienced chauffeurs directly from Nagpur Airport to your jungle lodge.</li>
</ul>`;

  await prisma.city.update({
    where: { id: 119 },
    data: {
      overView: penchOverview,
      moreDescription: penchMoreDesc,
      seoTitle: "Pench Tiger Reserve Tour Packages | Jungle Safari & Resort Stays",
      seoDescription: "Book tailor-made Pench National Park tour packages with open 4x4 Jeep safaris, luxury jungle lodges, and private cab transfers from Nagpur. Spot wild tigers in Kipling's Jungle Book.",
    },
  });
  await prisma.faq.deleteMany({ where: { entityType: "City", entityId: 119 } });
  await prisma.faq.createMany({
    data: CURATED_DESTINATION_FAQS["pench"].map((f) => ({
      ques: f.question,
      ans: f.answer,
      entityType: "City",
      entityId: 119,
    })),
  });

  // 4. Hubli (City ID 169)
  console.log("Updating Hubli (City 169)...");
  const hubliOverview = "Hubli (Hubballi) and its twin city Dharwad form the commercial and cultural capital of North Karnataka. Serving as the primary gateway to UNESCO World Heritage Sites Hampi and Pattadakal, as well as the rock-cut caves of Badami, Hubli is famous for ancient Western Chalukya temples, scenic lakes, vibrant classical music heritage, and the mouth-watering GI-tagged Dharwad Peda.";
  const hubliMoreDesc = `<h2>Discover Hubli-Dharwad – Gateway to North Karnataka's Heritage</h2>
<p>Hubli (officially known as Hubballi) and its scenic twin city Dharwad represent the beating cultural heart of North Karnataka. While Hubli is a dynamic railway hub and trading center, Dharwad is a serene educational and literary city resting on the undulating slopes of the Western Ghats transition zone. Together, the twin cities serve as the most convenient and comfortable gateway for touring North Karnataka's world-renowned historical circuits, including Hampi, Badami, Aihole, and Pattadakal.</p>

<h3>Key Tourist Attractions in Hubli-Dharwad</h3>
<ul>
<li><strong>Chandramouleshwara Temple:</strong> A 900-year-old architectural jewel built during the Western Chalukya era on the banks of Unkal Lake. Carved entirely from black granite, it features intricately sculpted dancing deities and four grand entrances facing the cardinal directions.</li>
<li><strong>Unkal Lake & Garden:</strong> A 110-year-old water reservoir spanning 200 acres with a statue of Swami Vivekananda at its center, illuminated musical fountains, boating facilities, and sunset walking tracks.</li>
<li><strong>Nrupatunga Betta:</strong> A hill viewpoint on the outskirts of Hubli offering sweeping panoramic views of the twin cities, especially during sunrise and sunset.</li>
<li><strong>Indira Gandhi Glass House:</strong> A sprawling landscaped public garden modeled after Bengaluru's Lalbagh Glass House, hosting seasonal flower shows and musical fountains.</li>
<li><strong>Siddharoodha Math:</strong> A revered spiritual center and monastery honoring Sri Siddharoodha Swamiji, visited by thousands of pilgrims every year.</li>
</ul>

<h3>Hubli as a Touring Hub for Hampi, Badami & Dandeli</h3>
<p>Thanks to its modern airport and high-speed rail junction, Hubli is the most comfortable base for multi-day heritage road trips:</p>
<ul>
<li><strong>Hampi (160 km, ~3.5 hrs drive):</strong> Explore the sprawling boulder-strewn ruins of the 14th-century Vijayanagara Empire, the Virupaksha Temple, and the stone chariot at Vittala Temple.</li>
<li><strong>Badami, Aihole & Pattadakal (105 km, ~2 hrs drive):</strong> Discover ancient 6th-century rock-cut cave temples and the UNESCO World Heritage monuments that shaped early South Indian temple architecture.</li>
<li><strong>Dandeli Wildlife & River Rafting (75 km, ~1.5 hrs drive):</strong> Experience white-water rafting on the Kali River, hornbill spotting, and lush Western Ghats nature camps.</li>
</ul>

<h3>The World-Famous Dharwad Peda & North Karnataka Cuisine</h3>
<p>No trip to the region is complete without tasting the legendary <strong>Dharwad Peda</strong>, a Geographical Indication (GI) tagged sweet crafted from slow-simmered buffalo milk mawa and crystallized sugar. The 175-year-old Babu Singh Thakur Peda shop on Line Bazaar in Dharwad remains the original pilgrimage spot for foodies.</p>
<p>For meals, relish traditional <strong>Jolada Rotti Oota</strong>—hearty sorghum flatbreads served with stuffed spicy eggplant (badanekayi ennegai), roasted peanut chutney powder (shenga chutney), and fresh butter, followed by crunchy street snacks like Girmit and Mirchi Bhajji.</p>

<h3>Best Time to Visit Hubli</h3>
<p>The best season to visit Hubli and North Karnataka is from <strong>October to March</strong>. Winters are mild and pleasant with daytime temperatures between 16°C and 28°C, making heritage walks and day tours comfortable and refreshing.</p>`;

  await prisma.city.update({
    where: { id: 169 },
    data: {
      overView: hubliOverview,
      moreDescription: hubliMoreDesc,
      seoTitle: "Hubli Tour Packages | North Karnataka Heritage & Temple Tours",
      seoDescription: "Explore Hubli and Dharwad with tailor-made tour packages. Gateway to Hampi, Badami caves & Chalukyan temples with verified private chauffeurs and hotel stays.",
    },
  });
  await prisma.faq.deleteMany({ where: { entityType: "City", entityId: 169 } });
  await prisma.faq.createMany({
    data: CURATED_DESTINATION_FAQS["hubli"].map((f) => ({
      ques: f.question,
      ans: f.answer,
      entityType: "City",
      entityId: 169,
    })),
  });

  // 5. Bundi (City ID 97)
  console.log("Updating Bundi (City 97)...");
  await prisma.faq.deleteMany({ where: { entityType: "City", entityId: 97 } });
  await prisma.faq.createMany({
    data: CURATED_DESTINATION_FAQS["bundi"].map((f) => ({
      ques: f.question,
      ans: f.answer,
      entityType: "City",
      entityId: 97,
    })),
  });

  // 6. Jaipur (City ID 1)
  console.log("Updating Jaipur (City 1)...");
  await prisma.faq.deleteMany({ where: { entityType: "City", entityId: 1 } });
  await prisma.faq.createMany({
    data: CURATED_DESTINATION_FAQS["jaipur"].map((f) => ({
      ques: f.question,
      ans: f.answer,
      entityType: "City",
      entityId: 1,
    })),
  });

  // 7. Desert Safari (TravelExperience ID 20)
  console.log("Updating Desert Safari (TravelExperience 20)...");
  await prisma.faq.deleteMany({ where: { entityType: "TravelExperience", entityId: 20 } });
  await prisma.faq.createMany({
    data: CURATED_DESTINATION_FAQS["desert-safari"].map((f) => ({
      ques: f.question,
      ans: f.answer,
      entityType: "TravelExperience",
      entityId: 20,
    })),
  });

  // 8. Spring Season (Season ID 21)
  console.log("Updating Spring Season (Season 21)...");
  const springOverview = "Spring in India (mid-February to April) is one of the most delightful travel seasons of the year. With refreshing sunny days, cool mountain breezes, and flowers in full bloom across the subcontinent, spring offers ideal weather for sightseeing in Rajasthan and the Golden Triangle, tulip blooms in Kashmir, tiger safaris in Central India, and plantation walks in the South Indian hills.";
  const springMoreDesc = `<h2>Why Spring is One of the Best Times to Tour India</h2>
<p>Spanning from <strong>mid-February through April</strong>, spring represents the golden transition between the winter chill and the blazing summer sun across the Indian subcontinent. Temperatures throughout North, Central, and South India hover pleasantly between 18°C and 28°C, making outdoor exploration, heritage walking tours, and wildlife safaris immensely enjoyable.</p>

<p>From the blooming tulip valleys of the Himalayas to the golden sand dunes of Rajasthan and the misty tea hills of Kerala, a spring vacation in India offers vibrant cultural festivals, colorful natural landscapes, and uncrowded historical monuments.</p>

<h3>Top Destinations for an India Spring Tour</h3>
<ul>
<li><strong>Srinagar & Kashmir Valley:</strong> Asia's largest Tulip Garden opens in late March on the foothills of the Zabarwan range, displaying over 1.5 million tulips in 60+ vibrant colors. Shikara rides on Dal Lake and snow views at Gulmarg are magical in spring.</li>
<li><strong>The Golden Triangle (Delhi, Agra & Jaipur):</strong> Clear blue skies and comfortable daytime temperatures make visiting the Taj Mahal, Amber Fort, and Delhi's Mughal monuments breezy and fatigue-free.</li>
<li><strong>Wildlife Reserves (Ranthambore, Corbett, Pench & Bandhavgarh):</strong> Spring is prime tiger tracking season. As deciduous forests shed their winter foliage and seasonal waterholes dry up, predators and herds gather around permanent water bodies.</li>
<li><strong>Kerala & Munnar Tea Estates:</strong> Fresh spring tea flushes carpet Munnar's rolling hills in vivid emerald green, while the backwaters of Alleppey offer calm, sunny cruising conditions.</li>
<li><strong>Rishikesh & Haridwar:</strong> Pleasant daytime temperatures make spring the ideal time for holy Ganga aartis, yoga retreats, and river rafting in the Himalayan foothills.</li>
</ul>

<h3>Cultural Celebrations: The Festival of Holi in Spring</h3>
<p>March heralds <strong>Holi</strong>, the world-famous festival of colors, music, and joy. Experiencing Holi in India during your spring holiday is an unforgettable cultural memory. Travelers can partake in royal palace celebrations hosted by former royal families in Jaipur, the devotional <em>Phoolon ki Holi</em> (played with fragrant flower petals) in Vrindavan and Mathura, or festive musical celebrations along Goa's sun-drenched beaches.</p>

<h3>Packing Tips for an Indian Spring Holiday</h3>
<ul>
<li>Pack lightweight, breathable cotton shirts, linen trousers, and sunglasses for daytime city tours.</li>
<li>For Himalayan hill stations (Shimla, Dharamshala, Srinagar) or early morning wildlife safaris, carry a warm fleece jacket, scarf, and windcheater.</li>
<li>Carry comfortable walking shoes with socks for exploring stone-paved forts and temple complexes.</li>
</ul>

<h3>Tailor-Made Spring Holidays with KoiKoi Travel</h3>
<p>KoiKoi Travel customizes private spring itineraries tailored to your pace. Enjoy verified private chauffeurs, premium air-conditioned vehicles, handpicked heritage hotels, and dedicated 24/7 on-trip assistance from start to finish.</p>`;

  await prisma.month.update({
    where: { id: 21 },
    data: {
      overView: springOverview,
      moreDescription: springMoreDesc,
      seoTitle: "Spring Tours in India | Best Places to Visit in February, March & April",
      seoDescription: "Experience India in spring. Discover Kashmir tulip gardens, Golden Triangle tours, tiger safaris, and Kerala hill stations with private chauffeur & customized itineraries.",
    },
  });
  await prisma.faq.deleteMany({ where: { entityType: "Season", entityId: 21 } });
  await prisma.faq.createMany({
    data: CURATED_DESTINATION_FAQS["spring-tours-in-india"].map((f) => ({
      ques: f.question,
      ans: f.answer,
      entityType: "Season",
      entityId: 21,
    })),
  });

  // 9. Blog Post: golden-triangle-tour-itinerary-cost-best-time (ID 3)
  console.log("Updating Blog Post (ID 3)...");
  const blogFullArticle = `<p>The <strong>Golden Triangle tour</strong> connecting <strong>Delhi, Agra, and Jaipur</strong> is India’s most celebrated travel circuit. Forming a roughly equilateral triangle of approximately 720 kilometers on the map, this legendary route brings together three distinct facets of Indian history and culture: the monumental imperial legacy of New Delhi, the immortal Mughal romance of Agra's Taj Mahal, and the royal Rajput valor and desert palaces of the Pink City, Jaipur.</p>

<p>Whether you are visiting India for the very first time or returning for a deeper cultural exploration, this definitive guide provides a realistic day-by-day itinerary, transparent cost breakdowns, seasonal timing recommendations, transport insights, and practical travel advice to plan an unforgettable journey.</p>

<h2>The Classic 6-Day Golden Triangle Itinerary (Day-by-Day)</h2>

<h3>Day 1: Arrival & Exploring the Layers of Delhi</h3>
<p>Arrive at New Delhi's Indira Gandhi International Airport, where your private chauffeur meets you for a comfortable transfer to your hotel. Begin your afternoon in <strong>Old Delhi</strong> with a guided rickshaw ride through the bustling spice alleys of Chandni Chowk, admiring the 17th-century Jama Masjid and driving past the sandstone bastions of the Red Fort. In the evening, explore the grand colonial boulevards of New Delhi, stopping at <strong>India Gate</strong> and driving past Rashtrapati Bhavan (President’s Residence) before a welcome dinner featuring North Indian tandoori specialties.</p>

<h3>Day 2: New Delhi's Heritage & Drive to Agra</h3>
<p>Start your morning visiting <strong>Qutub Minar</strong>, the world’s tallest brick minaret, surrounded by intricate Indo-Islamic ruins dating back to 1192 AD. Continue to <strong>Humayun’s Tomb</strong>, a UNESCO World Heritage garden tomb that served as the architectural precursor to the Taj Mahal. After a relaxed lunch, embark on the smooth 3.5-hour drive to Agra via the 6-lane Yamuna Expressway in your private air-conditioned vehicle. Arrive in Agra by late afternoon, check in to your hotel, and view the Taj Mahal from across the river at <strong>Mehtab Bagh</strong> during sunset.</p>

<h3>Day 3: The Sunrise Taj Mahal & Agra Fort</h3>
<p>Witness the ethereal beauty of the <strong>Taj Mahal at sunrise</strong> as morning light shifts from soft lavender to dazzling ivory across the white marble domes. Commissioned in 1631 by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, the monument is an unrivaled triumph of symmetrical art and gemstone pietra dura inlay. Return to your hotel for breakfast, then explore the colossal <strong>Agra Fort</strong>, where Shah Jahan spent his final years gazing out at the Taj from the octagonal Musamman Burj tower. In the afternoon, visit the delicate tomb of Itmad-ud-Daulah (fondly called the 'Baby Taj') and browse Agra's famous marble craftsmanship.</p>

<h3>Day 4: Fatehpur Sikri, Chand Baori Stepwell & Arrival in Jaipur</h3>
<p>Depart Agra toward Rajasthan, stopping first at <strong>Fatehpur Sikri</strong>, the abandoned 16th-century red sandstone imperial capital built by Emperor Akbar. Marvel at the soaring Buland Darwaza gate and the white marble shrine of Sufi saint Sheikh Salim Chishti. En route to Jaipur, take a scenic detour to the village of Abhaneri to see <strong>Chand Baori</strong>, one of India’s deepest and most visually mesmerizing ancient stepwells, featuring 3,500 narrow stone steps arranged in perfect geometric harmony. Arrive in the Pink City of Jaipur by late afternoon and check in to a boutique heritage haveli.</p>

<h3>Day 5: The Royal Wonders of Jaipur (The Pink City)</h3>
<p>Spend a full day exploring Jaipur's royal heritage. Begin early at the majestic <strong>Amber Fort</strong>, perched high on the Aravalli hills overlooking Maota Lake. Ascend to the royal courtyard and tour the dazzling <strong>Sheesh Mahal (Mirror Palace)</strong>, where a single candle reflects into a thousand sparkling stars. Next, take photo stops at the floating palace of <strong>Jal Mahal</strong> and the iconic honeycombed façade of <strong>Hawa Mahal (Palace of Winds)</strong>, built for royal ladies to view street festivals unnoticed. In the afternoon, visit the <strong>City Palace museum</strong>, still the residence of the royal family, and the astronomical marvel of <strong>Jantar Mantar</strong>. Spend the evening browsing Jaipur’s bustling bazaars for gemstones, block-printed cottons, and handmade blue pottery.</p>

<h3>Day 6: Nahargarh Fort Morning Views & Return to Delhi</h3>
<p>Enjoy a panoramic morning view of Jaipur from <strong>Nahargarh Fort</strong> before savoring authentic Rajasthani Pyaz Kachori and sweet Ghewar for breakfast. After check-out, begin your relaxed 4.5 to 5-hour drive back to New Delhi via the newly constructed Delhi-Mumbai Expressway. Your chauffeur drops you off directly at Delhi Airport or your preferred hotel, concluding your Golden Triangle tour.</p>

<h2>Realistic Cost Breakdown for a Golden Triangle Tour (Per Couple)</h2>
<p>The cost of a Golden Triangle tour depends on your chosen hotel comfort category, vehicle type, and touring inclusions. Below is a realistic price guideline for a 6-day private tour for two travelers:</p>

<table class="w-full text-left border-collapse my-6">
<thead>
<tr class="border-b border-slate-300 bg-slate-100">
<th class="p-3 font-bold text-slate-800">Tour Category</th>
<th class="p-3 font-bold text-slate-800">Approx. Cost (Per Couple)</th>
<th class="p-3 font-bold text-slate-800">What is Included</th>
</tr>
</thead>
<tbody>
<tr class="border-b border-slate-200">
<td class="p-3 font-semibold text-slate-800">Standard / Budget</td>
<td class="p-3 text-slate-700">₹28,000 – ₹40,000<br><span class="text-xs text-slate-500">($350 – $480 USD)</span></td>
<td class="p-3 text-sm text-slate-600">Clean, verified 3-star hotels with breakfast, private air-conditioned compact sedan (Swift Dzire/Etios), highway tolls, fuel, and dedicated driver.</td>
</tr>
<tr class="border-b border-slate-200 bg-orange-50/40">
<td class="p-3 font-semibold text-slate-800">Comfort / Mid-Range (Most Popular)</td>
<td class="p-3 text-slate-700">₹45,000 – ₹75,000<br><span class="text-xs text-slate-500">($550 – $900 USD)</span></td>
<td class="p-3 text-sm text-slate-600">Handpicked 4-star hotels & authentic boutique heritage havelis, private AC SUV (Innova Crysta), daily breakfast, verified English-speaking chauffeur, and monument entry assistance.</td>
</tr>
<tr class="border-b border-slate-200">
<td class="p-3 font-semibold text-slate-800">Luxury 5-Star Palace</td>
<td class="p-3 text-slate-700">₹85,000 – ₹1,60,000+<br><span class="text-xs text-slate-500">($1,000 – $2,000+ USD)</span></td>
<td class="p-3 text-sm text-slate-600">5-star luxury palatial stays (The Oberoi, Taj Hotels, ITC Grand), private premium SUV, licensed monument guides in each city, all monument entry tickets, and personalized experiential dining.</td>
</tr>
</tbody>
</table>

<h2>Best Time of the Year to Visit the Golden Triangle</h2>
<ul>
<li><strong>October to March (Peak Season – Highly Recommended):</strong> Crisp, sunny daytime temperatures (15°C to 26°C) make walking through expansive stone courtyards and palaces delightful. Evenings are cool, requiring a light jacket.</li>
<li><strong>April to June (Summer):</strong> Temperatures regularly exceed 40°C in May and June. While monument crowds are thin and hotel prices are heavily discounted, afternoon sightseeing can be taxing due to dry desert heat.</li>
<li><strong>July to September (Monsoon):</strong> Humid with periodic rain showers. The Aravalli hills around Jaipur turn pleasantly green, and Taj Mahal reflecting pools fill up with rainwater, making it a viable shoulder season for budget travelers.</li>
</ul>

<h2>Private Chauffeur Car vs. Train: Which is Better?</h2>
<p>While the high-speed <strong>Gatimaan Express</strong> train is an excellent 100-minute ride between Delhi and Agra, traveling the full Golden Triangle by <strong>private air-conditioned vehicle with a dedicated chauffeur</strong> is by far the preferred choice for overseas visitors. A private car grants door-to-door convenience from your hotel lobby, total freedom to stop at en-route gems like Fatehpur Sikri and Chand Baori stepwell, complete luggage security, and the flexibility to adjust sightseeing hours at your own pace.</p>

<h2>Popular Extensions to the Golden Triangle</h2>
<p>If you have extra days, you can seamlessly connect your Golden Triangle holiday with other world-famous destinations:</p>
<ul>
<li><strong>Ranthambore National Park (Add 2 Nights):</strong> Located just 3.5 hours drive from Jaipur, Ranthambore is India’s premier Royal Bengal tiger reserve.</li>
<li><strong>Pushkar & Ajmer (Add 1-2 Nights):</strong> Located 2 hours southwest of Jaipur, Pushkar is famous for its sacred lake, Brahma Temple, and November Camel Fair.</li>
<li><strong>Udaipur (Add 2-3 Nights):</strong> The romantic 'City of Lakes' in southern Rajasthan with magnificent island palaces and boat rides on Lake Pichola.</li>
<li><strong>Varanasi (Add 2 Nights):</strong> Take a short 80-minute flight from Delhi to the spiritual heart of India on the banks of the sacred River Ganges.</li>
</ul>`;

  await prisma.blogPost.update({
    where: { id: 3 },
    data: {
      moreDescription: blogFullArticle,
      seoTitle: "Golden Triangle Tour Itinerary, Cost & Best Time | Complete India Guide",
      seoDescription: "Plan your Golden Triangle tour (Delhi, Agra, Jaipur) with our complete guide: 6-day itinerary, realistic costs, best time to visit, hotel options, and private car tips.",
      h1Title: "Golden Triangle Tour – Itinerary, Real Costs & Best Time to Visit",
    },
  });

  console.log("All 9 entities updated successfully in database!");
  process.exit(0);
}

main().catch((e) => {
  console.error("Error updating database:", e);
  process.exit(1);
});
