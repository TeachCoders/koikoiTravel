export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

/**
 * Curated, genuine 10 FAQs for prominent destinations, experiences, and seasons.
 * Written in clear, accessible traveler English.
 */
export const CURATED_DESTINATION_FAQS: Record<string, FaqItem[]> = {
  // ===== 1. JAIPUR =====
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

  // ===== 2. BUNDI =====
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

  // ===== 3. DHARAMSHALA =====
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

  // ===== 4. HEMIS MONASTERY =====
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

  // ===== 5. PENCH =====
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

  // ===== 6. HUBLI =====
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

  // ===== 7. DESERT SAFARI =====
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

  // ===== 8. SPRING TOURS IN INDIA =====
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

  // ===== TAJ MAHAL =====
  "taj-mahal": [
    {
      question: "When is the Taj Mahal closed to visitors?",
      answer: "The Taj Mahal is closed to all general visitors every Friday. It remains open on all other days of the week from 30 minutes before sunrise to 30 minutes before sunset.",
    },
    {
      question: "What is the best time of day to visit the Taj Mahal?",
      answer: "Sunrise is by far the finest time. The morning dawn casts a magical soft pink and golden hue across the white Makrana marble, queues are minimal, and the atmosphere in the symmetrical Charbagh gardens is quiet and serene.",
    },
    {
      question: "Can I do a same-day Taj Mahal trip from Delhi comfortably?",
      answer: "Yes, Agra is easily accessible from Delhi for a day tour. The Gatimaan Express takes just 1 hour 40 minutes from Hazrat Nizamuddin station, while private chauffeur drives via the smooth Yamuna Expressway take around 3.5 hours.",
    },
    {
      question: "Are monument entry tickets and guided tours included?",
      answer: "Yes. With KoiKoi Travel, your monument admission tickets with mausoleum interior access are pre-booked to bypass long counter queues. You are accompanied by a certified, licensed English-speaking heritage guide.",
    },
    {
      question: "Can we visit Agra Fort and Mehtab Bagh on the same trip?",
      answer: "Yes, most of our Taj Mahal packages include Agra Fort (the grand red-sandstone imperial residence of the Mughals) and Mehtab Bagh (the Moonlight Garden across the Yamuna River), which offers the most famous sunset reflection view of the Taj Mahal.",
    },
    {
      question: "What is the best time of year to visit the Taj Mahal?",
      answer: "October to March is the ideal travel window with pleasant daytime temperatures between 15°C and 28°C.",
    },
    {
      question: "What items are prohibited inside the Taj Mahal complex?",
      answer: "Prohibited items include tripods, camera drones, large backpacks, food items, tobacco, and lighters. Small personal bags, smartphones, and handheld cameras are allowed.",
    },
    {
      question: "Can the Taj Mahal tour be combined with Jaipur and Delhi?",
      answer: "Yes! Agra is the pivotal anchor of India's iconic Golden Triangle circuit. You can easily extend your Taj Mahal tour to Jaipur (the Pink City) stopping en route at Fatehpur Sikri and Chand Baori stepwell.",
    },
    {
      question: "What local Agra food and crafts should we not miss?",
      answer: "Agra is world-renowned for Agra Petha (authentic pumpkin sweet from Panchi Petha) and rich Mughlai cuisine. In crafts, Agra's artisan families still create authentic Pietra Dura (semi-precious stone inlay on marble).",
    },
    {
      question: "Why book your Taj Mahal tour with KoiKoi Travel?",
      answer: "KoiKoi Travel provides 100% private, tailor-made journeys with verified chauffeurs, handpicked 4-star and 5-star heritage hotels, licensed historians, transparent pricing, and 24/7 dedicated on-trip concierge assistance.",
    },
  ],
};

/**
 * Intelligent helper to get 10 genuine FAQs for any destination/entity.
 * 1. If explicit CMS FAQs are provided (e.g. from database), it uses them.
 * 2. If curated FAQs exist for the slug, it returns them.
 * 3. Otherwise, generates 10 unique, natural, highly-contextual questions based on the entity name & context.
 * 4. NEVER falls back to generic Home FAQs!
 */
export function getDestinationFaqs(
  slug?: string | null,
  entityName?: string | null,
  entityType?: "City" | "State" | "Country" | "TravelExperience" | "Season" | "Journey" | string,
  cmsFaqs?: Array<{ ques?: string; question?: string; ans?: string; answer?: string }> | null
): FaqItem[] {
  // 1. If custom CMS FAQs exist, use them
  if (cmsFaqs && cmsFaqs.length > 0) {
    const valid = cmsFaqs
      .filter((f) => (f.ques || f.question) && (f.ans || f.answer))
      .map((f) => ({
        question: (f.ques || f.question || "").trim(),
        answer: (f.ans || f.answer || "").trim(),
      }));
    if (valid.length > 0) return valid;
  }

  // 2. Check curated dictionary by slug
  const normalizedSlug = (slug || "").toLowerCase().trim();
  if (normalizedSlug && CURATED_DESTINATION_FAQS[normalizedSlug]) {
    return CURATED_DESTINATION_FAQS[normalizedSlug];
  }

  // 3. Fallback to generating 10 genuine, destination-specific FAQs (never duplicate Home FAQs!)
  const name = (entityName || slug || "this destination")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return [
    {
      question: `What is the best time of year to visit ${name}?`,
      answer: `October to March is generally the most pleasant time to visit ${name}, with comfortable daytime temperatures, clear sunny skies, and pleasant evenings ideal for sightseeing.`,
    },
    {
      question: `How many days are recommended for a trip to ${name}?`,
      answer: `A 2 to 3-day itinerary is recommended to explore the major attractions, heritage sites, and local culture of ${name} at a relaxed and enjoyable pace.`,
    },
    {
      question: `How do I reach ${name} by air, rail, or road?`,
      answer: `${name} is well connected via regional highways and nearby airports/railway stations. Traveling with a verified private chauffeur from KoiKoi Travel provides door-to-door comfort and luggage convenience.`,
    },
    {
      question: `What are the top must-visit tourist attractions in ${name}?`,
      answer: `${name} features iconic cultural landmarks, historical architecture, vibrant local markets, and scenic viewpoints that showcase the rich heritage of the region.`,
    },
    {
      question: `What local cuisine and regional specialties should I try in ${name}?`,
      answer: `Be sure to sample authentic regional dishes, freshly prepared street snacks, and traditional sweets at reputable local restaurants and heritage eateries in ${name}.`,
    },
    {
      question: `Is ${name} safe for solo female travelers and families?`,
      answer: `Yes, ${name} is widely visited and welcoming for families, couples, and solo travelers. Having a verified private driver and pre-arranged hotels ensures a safe, hassle-free holiday.`,
    },
    {
      question: `What should I wear and pack when visiting ${name}?`,
      answer: `Pack modest, comfortable cotton clothing covering shoulders and knees for temple and monument visits. Bring comfortable walking shoes, sunglasses, and a light jacket for cooler evenings.`,
    },
    {
      question: `What unique local handicrafts and souvenirs can I shop for in ${name}?`,
      answer: `Local bazaars in ${name} offer authentic regional handlooms, traditional textiles, local artwork, spices, and handmade souvenirs crafted by skilled native artisans.`,
    },
    {
      question: `What are the best day trips and excursions around ${name}?`,
      answer: `Several scenic hill viewpoints, historic temples, nature reserves, and heritage stepwells are situated within a 1 to 2-hour drive from ${name}, making excellent day excursions.`,
    },
    {
      question: `Why should I book a private tour and chauffeur with KoiKoi Travel for ${name}?`,
      answer: `KoiKoi Travel provides 100% tailor-made itineraries, verified private air-conditioned cars, respectful chauffeurs, transparent pricing, and 24/7 on-trip support for a seamless vacation.`,
    },
  ];
}

/**
 * Curated 10 FAQs for blog articles.
 */
export const BLOG_FAQS: Record<string, FaqItem[]> = {
  "golden-triangle-tour-itinerary-cost-best-time": [
    {
      question: "What is the classic Golden Triangle tour route in India?",
      answer: "The Golden Triangle connects three of India's most iconic heritage cities: New Delhi (national capital), Agra (home of the Taj Mahal in Uttar Pradesh), and Jaipur (the Pink City of Rajasthan), forming a roughly equilateral triangle of approximately 720 km on the map.",
    },
    {
      question: "How many days are recommended for a relaxed Golden Triangle tour?",
      answer: "A 5 to 6-day itinerary is the sweet spot (2 days in Delhi, 1-2 days in Agra including Fatehpur Sikri, and 2 days in Jaipur). A fast 3 to 4-day version is also possible for travelers with limited time, while a 7 to 9-day trip allows scenic extensions to Ranthambore Tiger Reserve or Pushkar.",
    },
    {
      question: "What is the realistic cost of a Golden Triangle tour for a couple?",
      answer: "A standard budget package runs between ₹28,000 and ₹40,000 ($350–$480 USD) with clean 3-star hotels and private AC sedan. A comfort/mid-range tour with handpicked 4-star boutique heritage hotels and verified chauffeur ranges from ₹45,000 to ₹75,000 ($550–$900 USD). A luxury 5-star palace tour (Oberoi, Taj, ITC) ranges from ₹85,000 to ₹1,60,000+ ($1,000–$2,000+ USD).",
    },
    {
      question: "What is the best time of year to visit the Golden Triangle?",
      answer: "October to March is peak season with sunny, pleasant daytime temperatures (15°C–26°C) and cool evenings. April to June is extremely hot (38°C–44°C), and July to September brings monsoon showers.",
    },
    {
      question: "Is it better to travel the Golden Triangle by private car or train?",
      answer: "A private car with a dedicated chauffeur is by far the most flexible and convenient option, offering door-to-door hotel transfers, luggage security, and stops at Fatehpur Sikri and Chand Baori stepwell. Gatimaan Express train is a fast alternative specifically for the Delhi-to-Agra leg (100 minutes).",
    },
    {
      question: "What are the essential tips for visiting the Taj Mahal in Agra?",
      answer: "Visit at sunrise (gates open 30 minutes before sunrise) for magical lighting, cooler temperatures, and fewer crowds. Remember that the Taj Mahal is strictly closed on Fridays. Always pre-book tickets online to skip ticket counter lines.",
    },
    {
      question: "Can I extend the Golden Triangle tour to other destinations?",
      answer: "Yes! The most popular extensions are Ranthambore National Park (2 nights for wild tiger safaris, 3.5 hrs from Jaipur), the holy lake city of Pushkar (2 hrs from Jaipur), Udaipur Lake City, or an easy domestic flight to spiritual Varanasi on the Ganges.",
    },
    {
      question: "What should I wear at monuments and temples across the Golden Triangle?",
      answer: "Dress respectfully covering shoulders and knees at religious sites like Jama Masjid in Delhi and Birla Temple in Jaipur. Slip-on shoes with socks are helpful as shoes must be removed or shoe-covers worn at many monuments.",
    },
    {
      question: "How can I avoid common tourist scams and touts along the route?",
      answer: "Avoid unverified street touts offering cheap gem deals or unsolicited guides. Book authorized monument guides through your tour operator or ticket counters, and rely on your private chauffeur who acts as a trusted local guardian.",
    },
    {
      question: "Why book your Golden Triangle tour with KoiKoi Travel?",
      answer: "KoiKoi Travel offers 100% custom flexible itineraries, transparent all-inclusive quotes with no hidden fees, verified private chauffeurs who stay with you throughout the journey, and 24/7 dedicated trip support.",
    },
  ],
  "complete-honeymoon-guide-to-kashmir": [
    {
      question: "How many days are ideal for a Kashmir honeymoon trip?",
      answer: "A 5-night, 6-day or 6-night, 7-day trip is ideal for couples. This allows 2 nights in Srinagar (including a traditional heritage houseboat on Dal Lake), 1-2 nights in the snowy pine valleys of Gulmarg, and 2 nights relaxing alongside the Lidder River in Pahalgam without feeling rushed.",
    },
    {
      question: "Which season is best for a honeymoon in Kashmir: Summer or Winter?",
      answer: "Both offer magical romantic experiences. April to October offers lush green valleys, blooming tulip and Mughal gardens, floating lotus flowers on Dal Lake, and pleasant 15°C–25°C weather. December to February brings heavy snowfall, frozen lakes, roaring fire bukharis, and world-class skiing and Gondola cable car rides in Gulmarg.",
    },
    {
      question: "Is Kashmir safe for honeymoon couples and tourists?",
      answer: "Yes, Kashmir is very welcoming and hospitable for tourists and newlyweds. Millions of domestic and international travelers visit every year without issue. Booking a verified tour package with a private chauffeur and recognized hotels ensures a seamless, worry-free vacation.",
    },
    {
      question: "What is the expected budget for a 6-day Kashmir honeymoon package?",
      answer: "A comfortable mid-range honeymoon package with verified 3/4-star boutique hotels, one night in a luxury Dal Lake houseboat, private cab transfers, and breakfast & dinner costs around ₹35,000 to ₹55,000 per couple. Luxury packages featuring high-end pine-wood chalets, five-star resorts (like Khyber in Gulmarg), and premium shikaras range from ₹75,000 to ₹1,40,000+ per couple.",
    },
    {
      question: "Is staying in a Dal Lake houseboat recommended for couples, and for how long?",
      answer: "Yes, a 1-night stay on a heritage Kashmiri houseboat (preferably on Dal Lake or quieter Nigeen Lake) is a signature romantic experience. Handcrafted deodar woodwork, private cedar-wood balconies, and candle-lit Wazwan dinners make it unforgettable. 1 night is usually enough before moving to resorts for better central heating and amenities.",
    },
    {
      question: "How and when should we book the Gulmarg Gondola tickets?",
      answer: "Gulmarg Gondola tickets (Phase 1 to Kongdoori and Phase 2 to Apharwat Peak) must be booked online well in advance via the official Jammu & Kashmir Cable Car Corporation website (jammukashmircablecar.com). In peak winter and spring seasons, Phase 2 tickets often sell out weeks ahead.",
    },
    {
      question: "How do local union taxis work in Gulmarg and Pahalgam?",
      answer: "Under local tourist association rules, outside tourist vehicles (including your Srinagar cab) are only permitted to drop you at the main hotel or taxi stand in Gulmarg and Pahalgam. For internal sightseeing (such as Betaab Valley, Aru Valley, and Chandanwari in Pahalgam, or Tangmarg to Gulmarg snow roads in heavy winter), you need to hire authorized local union 4x4 cabs or ponies.",
    },
    {
      question: "What are the most romantic things to do on a Kashmir honeymoon?",
      answer: "Unmissable romantic moments include: a sunset Shikara ride across Dal Lake with flower vendors, sipping steaming hot Kashmiri saffron Kahwa together, taking the world's highest cable car to Apharwat Peak in Gulmarg, taking a riverside couple walk along the Lidder River in Pahalgam, and posing in traditional Kashmiri Pheran attire.",
    },
    {
      question: "What clothes and footwear should honeymooners pack for Kashmir?",
      answer: "For summer/spring (April–September), pack light woollens, cardigans, and comfortable walking shoes. For winter (November–March), heavy thermal innerwear, fleece jackets, waterproof down coats, snow boots or sturdy shoes with good traction, gloves, and beanies are essential. Snow boots and long pherans can also be rented locally in Tangmarg.",
    },
    {
      question: "What authentic Kashmiri food and souvenirs should couples buy?",
      answer: "Couples must savor a traditional Wazwan meal (featuring Rogan Josh, Rista, and Gushtaba) or vegetarian Kashmiri Dum Aloo and Nadru Yakhni, followed by aromatic Saffron Kahwa. For souvenirs, look for certified Kashmiri GI-tagged Pashmina shawls, pure saffron from Pampore, walnut-wood carved keepsakes, hand-knotted silk carpets, and fresh Kashmiri almonds and walnuts.",
    },
  ],
};

