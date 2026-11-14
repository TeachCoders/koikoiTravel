import { prisma } from "../utils/prismaConnection.js";

const LADAKH_STATE_ID = 9;

const JOURNEYS_DATA = [
  // ─── 1. 8 Days Leh Ladakh Tour with Tso Moriri Lake ───
  {
    title: "8 Days Leh Ladakh Tour with Tso Moriri Lake",
    slug: "8-days-leh-ladakh-tour-with-tso-moriri-lake",
    h1Title: "8 Days Leh Ladakh Tour with Tso Moriri Lake",
    seoTitle: "8 Days Leh Ladakh Tour with Tso Moriri Lake | KoiKoi Travel",
    seoDescription: "Book an 8-day Leh Ladakh tour with Tso Moriri Lake. Experience Khardung La, Nubra Valley sand dunes, Pangong Tso sunrise and remote Korzok village. Get quote.",
    seoKeyword: "leh ladakh tour with tso moriri lake, 8 days ladakh tour, tso moriri tour package, leh nubra pangong tso moriri itinerary",
    destination: "Leh - Sham Valley - Nubra Valley - Pangong Tso - Tso Moriri - Leh",
    noDays: 8,
    duration: "8 Days / 7 Nights",
    pricePerPerson: 38500,
    discountPrice: 34500,
    thumbImg: "/india/trip/ladakh-trip-1793467387350-thumb-1793467387356-9727c4.webp",
    bannerTitle: "8 Days Leh Ladakh Tour with Tso Moriri Lake",
    bannerTag: "Remote Lake & High Altitude Special",
    bannerImages: [
      "/hero-banners/ladakh-trip-desktop-1793467345138-1793467368486-256677.webp",
      "/hero-banners/pangong-2-desktop-1793540770443-1793540789566-ea909f.webp",
      "/hero-banners/nubra-vallery-desktop-1793540052275-1793540086757-b8f8e3.webp"
    ],
    overView: "Tired of rushing through popular spots while missing Ladakh's true untouched wilderness? The 8 Days Leh Ladakh Tour with Tso Moriri Lake is handcrafted for travelers who crave high-altitude drama beyond the standard tourist trail. Venture past the iconic double-humped camel dunes of Nubra Valley and color-changing waters of Pangong Tso into the remote Changthang Plateau. Here, the serene sapphire expanse of Tso Moriri Lake and the centuries-old Korzok Monastery await with zero tourist crowds. Traveling in a dedicated private 4x4 vehicle with a seasoned local Himalayan chauffeur and verified oxygen-equipped camps, KoiKoi Travel guarantees a seamless, safely acclimatized, and deeply authentic Ladakh adventure.",
    highlights: [
      "Cross Khardung La (17,982 ft), one of the world's highest motorable mountain passes",
      "Ride double-humped Bactrian camels amid the cold desert dunes of Hunder in Nubra Valley",
      "Witness sunrise and kaleidoscopic color shifts over the 134-km long Pangong Tso Lake",
      "Explore untouched Tso Moriri Lake (4,522 m) and the ancient Korzok nomadic monastery",
      "Experience the anti-gravity wonder at Magnetic Hill and holy Indus-Zanskar confluence (Sangam)",
      "Drive through the scenic Changthang wildlife sanctuary and Tsaga La border route",
      "Dip your feet in the natural therapeutic hot sulphur springs of Chumathang",
      "24/7 dedicated trip manager and oxygen-cylinder supported private SUV for complete safety"
    ],
    cityIds: [84, 89, 87, 86, 85, 88], // Leh, Magnetic Hill, Khardung La, Nubra Valley, Pangong Tso, Tso Moriri Lake
    days: [
      {
        day: "Day 1: Arrival in Leh (3,500m) – Acclimatization & Evening Market Walk",
        description: "Arrive at Leh Kushok Bakula Rimpochee Airport where our warm local representative welcomes you and transfers you to your heritage hotel. Due to the rapid jump to 11,500 feet, strict complete rest for the first 24 hours is essential to acclimatize smoothly and prevent acute mountain sickness (AMS). Sip warm ginger-lemon-honey tea and stay well hydrated. By late evening, take a gentle relaxed stroll through the vibrant Leh Main Bazaar, visiting Tibetan curio stalls and cozy bakeries. Overnight stay in Leh."
      },
      {
        day: "Day 2: Sham Valley Exploration – Magnetic Hill, Gurudwara Pathar Sahib & Sangam",
        description: "After a hearty breakfast, set out along the picturesque Leh-Srinagar highway into the scenic Sham Valley. First, pay respects at the historic Gurudwara Pathar Sahib, maintained by the Indian Army. Next, be amazed at Magnetic Hill, where your vehicle appears to roll uphill against gravity with the engine turned off. Continue to the breathtaking Sangam confluence, where the muddy brown waters of the Zanskar River meet the sparkling teal Indus River. On the return drive, visit the poignant Hall of Fame museum and the peaceful white-domed Shanti Stupa at sunset for panoramic views over Leh valley. Overnight stay in Leh."
      },
      {
        day: "Day 3: Leh to Nubra Valley via Khardung La Pass (17,982 ft) – Diskit & Hunder",
        description: "Begin an exhilarating morning climb to Khardung La Pass (17,982 ft), proudly celebrated as one of the highest motorable roads on earth. Pause briefly at the prayer-flag draped summit for photos before descending into the picturesque Nubra Valley (Valley of Flowers). Visit the majestic 14th-century Diskit Monastery, crowned by a giant 106-foot statue of Maitreya Buddha overlooking the Shyok River. Later, head to the white sand dunes of Hunder for an unforgettable ride on double-humped Bactrian camels against stark mountain backdrops. Overnight stay in a luxury deluxe camp in Nubra Valley."
      },
      {
        day: "Day 4: Nubra Valley to Pangong Tso via Scenic Shyok River Route",
        description: "Wake up to fresh mountain air and embark on a spectacular drive towards the world-renowned Pangong Tso Lake via the rugged Shyok River gorge route. The dramatic road snakes through dramatic boulder valleys and gushing mountain streams, bypassing the need to return to Leh. By mid-afternoon, catch your very first mesmerizing glimpse of Pangong Lake's cobalt-blue waters shimmering at 14,270 feet. Check into your cozy lakefront cottage camp and spend the evening watching the sun dip behind the peaks, shifting the lake's shades from turquoise to indigo. Overnight stay by Pangong Tso."
      },
      {
        day: "Day 5: Pangong Tso Sunrise – Drive to Tso Moriri Lake via Chushul & Tsaga La",
        description: "Witness an unforgettable Himalayan sunrise over Pangong Lake as morning rays illuminate the snow-dusted Changchenmo range. After breakfast, venture off the beaten path into the raw, wild Changthang Plateau towards Tso Moriri Lake. Driving via Chushul, Tsaga La pass, and Loma bend, spot wild Tibetan asses (Kiang), marmots, and rare migratory bird species. By late afternoon, arrive at Korzok village on the shores of Tso Moriri (14,836 ft), a designated Ramsar Wetland protected area. Check in and soak in the undisturbed stillness. Overnight stay in Korzok / Tso Moriri."
      },
      {
        day: "Day 6: Explore Tso Moriri Lake & Historic Korzok Nomad Monastery",
        description: "Spend a magical morning exploring the pristine shores of Tso Moriri Lake. Because it is much less frequented than Pangong, you enjoy near-complete solitude by its crystal-clear sapphire waters. Visit the 300-year-old Korzok Monastery, belonging to the Drukpa Buddhist lineage, and interact with the resilient nomadic Changpa community who herd Pashmina goats across these rugged plateaus. Take a light walking trail along the lake banks, marveling at the reflections of Mentok Kangri peaks. Relax and enjoy star-studded night skies. Overnight stay in Korzok / Tso Moriri."
      },
      {
        day: "Day 7: Tso Moriri to Leh via Chumathang Sulphur Hot Springs",
        description: "Following breakfast, bid farewell to the high lake and start the scenic return journey back to Leh. En route, stop at Chumathang, famous for its natural hot sulphur springs bubbling on the banks of the Indus River, believed to possess medicinal and therapeutic healing powers. Trace the Indus Valley highway, passing quaint Ladakhi villages, willow groves, and colorful canyon walls. Reach Leh by late afternoon, with free time for last-minute souvenir shopping for pure Pashmina shawls, Ladakhi apricots, and Tibetan silver jewelry. Overnight stay in Leh."
      },
      {
        day: "Day 8: Departure from Leh Kushok Bakula Rimpochee Airport",
        description: "Enjoy an early morning breakfast with warm Ladakhi hospitality. Our team will transfer you to the Leh airport on time for your onward flight. As your flight lifts off over the snow-clad peaks of the Greater Himalayas, carry home lifelong memories of dramatic mountain passes, sacred monasteries, and the pristine blue waters of Ladakh's greatest high-altitude lakes."
      }
    ],
    inclusions: [
      "7 Nights accommodation (3N Leh, 1N Nubra Deluxe Camp, 1N Pangong Camp, 2N Tso Moriri Guest Camp)",
      "Daily buffet breakfast and hearty mountain dinner at all hotels and luxury camps",
      "Exclusive private SUV (Innova / Crysta / Scorpio) for all airport transfers, sightseeing, and high-altitude circuits",
      "Dedicated, polite local Ladakhi driver-guide fluent in terrain and altitude safety",
      "All Inner Line Permits (ILP), Ladakh Wildlife & Environment protection fees",
      "Emergency oxygen cylinder support onboard the vehicle throughout the high-altitude tour",
      "Fuel, toll taxes, state road taxes, parking fees, and driver allowances",
      "Personalized 24/7 on-call trip concierge assistance from KoiKoi Travel team"
    ],
    exclusions: [
      "Domestic or international airfares to/from Leh",
      "Monument, museum entrance tickets, and monastery donation fees",
      "Double-humped camel ride fees at Hunder Sand Dunes and ATV rides",
      "Personal expenses such as laundry, phone calls, room heaters, extra beverages, and tips",
      "Travel insurance, medical evacuation charges, or oxygen-concentrator machine rentals",
      "Expenses arising from landslides, roadblocks, severe weather, flight cancellations, or political strikes"
    ],
    whyChooseUs: [
      "100% Customized private itinerary built around safe acclimatization",
      "Handpicked deluxe hotels & heated lakefront camps with hot running water",
      "Verified local chauffeurs trained in high-pass mountain driving & altitude care",
      "Zero hidden fees – all Inner Line Permits, wildlife taxes & tolls included upfront",
      "24/7 dedicated personal trip manager by your side from landing to departure"
    ],
    faqs: [
      {
        ques: "Why do we need 2 full nights in Tso Moriri?",
        ans: "Tso Moriri sits at 4,522 meters (14,836 ft), which is even higher than Pangong Tso. Spending 2 nights allows your body to safely adjust to the altitude, explore the ancient Korzok monastery without exhaustion, and experience the stunning untouched landscape without an exhausting same-day rush.",
        order: 1
      },
      {
        ques: "What Inner Line Permits are required for Tso Moriri?",
        ans: "Tso Moriri lies in the protected Changthang region near the Indo-China border. All Indian and foreign travelers require Ladakh Protected Area / Inner Line Permits. KoiKoi Travel arranges all required permits, environmental fees, and wildlife charges seamlessly before your arrival.",
        order: 2
      },
      {
        ques: "What is the best time to do this 8-day tour?",
        ans: "The ideal season to explore Tso Moriri, Nubra, and Pangong is from late May to early October. During these months, Khardung La and Tsaga La mountain passes are fully open, days are comfortably sunny (15°C to 22°C), and the lakes are completely unfrozen with vibrant shades of blue.",
        order: 3
      },
      {
        ques: "How cold does it get at Tso Moriri and Pangong?",
        ans: "Nighttime temperatures at Pangong Lake and Tso Moriri can drop to 0°C to -5°C even during peak summer (July-August). We provide heavy quilts, heated deluxe camps, and hot water bags. Layered thermals, fleece jackets, and windproof outer layers are strongly recommended.",
        order: 4
      },
      {
        ques: "Is oxygen support available in the cab?",
        ans: "Yes, an emergency medical oxygen cylinder is permanently equipped in your private SUV throughout the Nubra, Pangong, and Tso Moriri journey for your complete peace of mind.",
        order: 5
      },
      {
        ques: "What kind of vehicle is provided for this tour?",
        ans: "We provide dedicated, high-clearance private SUVs such as Toyota Innova Crysta or Mahindra Scorpio 4x4, handled exclusively by expert local Ladakhi mountain drivers accustomed to high-pass gravel terrain.",
        order: 6
      },
      {
        ques: "Can this 8-day itinerary be customized?",
        ans: "Absolutely! At KoiKoi Travel, every journey is 100% customizable. You can add extra days in Leh, upgrade to boutique luxury camps, or include white-water rafting in Zanskar upon request.",
        order: 7
      },
      {
        ques: "Are phone networks and internet working at Tso Moriri?",
        ans: "Only postpaid BSNL and Jio networks work reliably in Leh and parts of Nubra. At Pangong and Tso Moriri, mobile connectivity is extremely limited or absent. This makes it an extraordinary opportunity for a true digital detox in nature.",
        order: 8
      },
      {
        ques: "What is the food like at remote camps?",
        ans: "Hot, freshly prepared vegetarian and non-vegetarian buffet meals (Indian, Continental, and Ladakhi dishes) are served at all our partner hotels and deluxe camps, prepared using filtered and boiling water.",
        order: 9
      },
      {
        ques: "How should I prepare for altitude sickness (AMS)?",
        ans: "Drink 3-4 liters of water daily, avoid strenuous physical activity on Day 1, refrain from alcohol and smoking, and consult your physician about taking Diamox (acetazolamide) 24 hours prior to landing in Leh.",
        order: 10
      }
    ]
  },

  // ─── 2. 10 Days Complete Ladakh Itinerary with Nubra & Pangong ───
  {
    title: "10 Days Complete Ladakh Itinerary with Nubra & Pangong",
    slug: "10-days-ladakh-itinerary-nubra-pangong",
    h1Title: "10 Days Complete Ladakh Itinerary with Nubra & Pangong",
    seoTitle: "10 Days Ladakh Itinerary: Nubra, Pangong & Turtuk | KoiKoi",
    seoDescription: "Explore a comprehensive 10-day Ladakh itinerary covering Leh, Sham Valley, Nubra Valley, Turtuk border village, Pangong Lake & Hemis. Private customized tour.",
    seoKeyword: "10 days ladakh itinerary nubra pangong, ladakh complete tour package, turtuk nubra pangong tour, ladakh 10 days road trip",
    destination: "Leh - Sham Valley - Nubra Valley - Turtuk - Pangong Tso - Hemis - Leh",
    noDays: 10,
    duration: "10 Days / 9 Nights",
    pricePerPerson: 44500,
    discountPrice: 39500,
    thumbImg: "/india/trip/nubra-valley-1793539896620-thumb-1793539896626-e400d2.webp",
    bannerTitle: "10 Days Complete Ladakh Itinerary with Nubra & Pangong",
    bannerTag: "In-Depth Himalayan Exploration",
    bannerImages: [
      "/hero-banners/nubra-3-desktop-1793540169172-1793540183556-5c52df.webp",
      "/hero-banners/pangong-lake-1-desktop-1793540721801-1793540736789-c8ae3a.webp",
      "/hero-banners/leh-desktop-1793539109577-1793539127495-c78085.webp"
    ],
    overView: "Few places on earth contrast stark grandeur with gentle soulfulness like Ladakh. If you have 10 days to spare, don't settle for a compressed weekend rush. The 10 Days Complete Ladakh Itinerary with Nubra & Pangong is crafted at a relaxed, unhurried pace that lets you acclimatize safely while exploring the deepest cultural and geographic treasures of the Trans-Himalayas. Beyond the dizzying heights of Khardung La Pass (17,982 ft) and the ever-shifting turquoise waters of Pangong Tso, explore the historic Balti village of Turtuk near the Line of Control, where lush apricot orchards thrive beneath snow peaks. With private chauffeur transportation, verified oxygen-supported deluxe retreats, and authentic monastic visits at Thiksey and Hemis, KoiKoi Travel delivers a bucket-list Himalayan journey of a lifetime.",
    highlights: [
      "Gradual, medically safe acclimatization plan with 3 comfortable nights in Leh",
      "Drive across Khardung La Pass (17,982 ft) with sweeping panoramic views of the Karakoram range",
      "Explore the fairy-tale Balti border village of Turtuk, famed for apricot groves and organic food",
      "Experience Bactrian camel riding across cold white sand dunes in Hunder, Nubra Valley",
      "Witness mesmerizing sunrise reflections across 134-kilometer long Pangong Tso Lake",
      "Cross the rugged high pass of Chang La (17,590 ft) with traditional Himalayan butter tea halts",
      "Visit ancient Buddhist powerhouses: Hemis Monastery, Thiksey Monastery & Shey Palace",
      "Test gravity anomalies at Magnetic Hill and witness the confluence of Indus and Zanskar rivers"
    ],
    cityIds: [84, 89, 87, 86, 95, 85, 93], // Leh, Magnetic Hill, Khardung La, Nubra Valley, Turtuk, Pangong Tso, Hemis Monastery
    days: [
      {
        day: "Day 1: Arrival in Leh (3,500m) – Altitude Acclimatization & Rest",
        description: "Touch down at Leh Airport, nestled amid towering peaks. Our friendly local escort greets you and whisks you away to your pre-arranged deluxe hotel. The first day is strictly dedicated to complete physical rest to allow your lungs and circulatory system to adjust to the 11,500 ft atmospheric pressure. Relax indoors, drink plenty of water, and enjoy wholesome hot meals. Overnight stay in Leh."
      },
      {
        day: "Day 2: Leh Local Highlights – Shanti Stupa, Leh Palace & Hall of Fame",
        description: "After breakfast, start your leisurely sightseeing tour around Leh town. Visit the historic 9-storey Leh Palace, constructed in the 17th century by King Sengge Namgyal. Next, explore the Indian Army Hall of Fame museum, displaying moving wartime tributes and high-altitude gear. In the late afternoon, head up to the magnificent white-domed Shanti Stupa, built by Japanese Buddhists, for a magical sunset overlooking the entire Indus Valley and Namgyal Tsemo fortress. Overnight stay in Leh."
      },
      {
        day: "Day 3: Sham Valley Tour – Magnetic Hill, Gurudwara Pathar Sahib & Sangam",
        description: "Drive westward along the smooth Leh-Srinagar highway into the scenic Sham Valley. Experience the gravity-defying phenomenon at Magnetic Hill, where cars parked in neutral appear to roll uphill. Pay respects at the reverent Gurudwara Pathar Sahib, commemorating Guru Nanak Dev Ji's journey through Ladakh. Continue downhill to Sangam, the dramatic visual confluence of the muddy Zanskar and crystal-green Indus rivers. Return to Leh by evening with time to browse the local bakeries and handicraft bazaars. Overnight stay in Leh."
      },
      {
        day: "Day 4: Leh to Nubra Valley via Khardung La Pass (17,982 ft)",
        description: "Embark on an epic morning drive up the world's most famous mountain pass, Khardung La (17,982 ft). Take in panoramic vistas of the snow-crested Karakoram mountains before descending into the dramatic Nubra Valley. Stop at Diskit Monastery to marvel at the 32-meter tall open-air statue of Jampa (Maitreya) Buddha. Later, arrive at Hunder's silver dunes for a scenic ride on rare double-humped Bactrian camels. Check into your deluxe camp retreat for an evening under sparkling starry skies. Overnight stay in Nubra Valley."
      },
      {
        day: "Day 5: Excursion to Turtuk – Baltic Border Village near Line of Control",
        description: "Today, journey along the turquoise Shyok River towards Turtuk, one of the northernmost border villages opened to tourism in 2010. Geographically and culturally distinct, Turtuk is home to the Muslim Balti people who speak an archaic Tibetan dialect. Stroll through cobblestone alleys lined with stone water channels, ancient wooden houses, and lush apricot and walnut orchards. Meet the descendants of the local Yabgo royal dynasty at the local heritage museum. Return to Hunder by evening. Overnight stay in Nubra Valley."
      },
      {
        day: "Day 6: Nubra Valley to Pangong Tso via Direct Shyok Valley Route",
        description: "Following breakfast, set out along the adventurous Shyok River gorge route towards the world-famous Pangong Tso Lake. Navigating dramatic river crossings and jagged rock faces, you reach the breathtaking shores of Pangong Lake (14,270 ft) by early afternoon. The lake spans 134 km across India and Tibet, famously shifting shades from emerald green to deep navy blue as clouds pass overhead. Check in to your lakeside cottages and enjoy peaceful lakeside photography. Overnight stay at Pangong Tso."
      },
      {
        day: "Day 7: Pangong Tso Sunrise – Drive to Leh via Chang La Pass (17,590 ft)",
        description: "Wake up early to catch the serene sunrise reflecting golden hues over Pangong Lake's crystal water. After a hearty breakfast, begin the scenic return drive to Leh via the mighty Chang La Pass (17,590 ft), the third-highest motorable pass in the region. Stop at the Chang La cafe for a steaming cup of tea or kahwa before descending into the fertile Indus Valley. Arrive back in Leh by afternoon and check into your hotel for a relaxing hot bath and rest. Overnight stay in Leh."
      },
      {
        day: "Day 8: Indus Valley Monasteries – Hemis, Thiksey & Shey Palace",
        description: "Spend a deeply enriching cultural day visiting Ladakh's grandest Buddhist monasteries. First, explore Thiksey Monastery, a breathtaking 12-storey complex dramatically resembling the Potala Palace of Lhasa, home to a revered 15-meter Maitreya Buddha shrine. Next, drive to Hemis Monastery, the largest and wealthiest monastery in Ladakh, tucked secretly inside a mountain gorge. On the way back, stop at Shey Palace, the ancient summer capital featuring a giant copper-gilt Buddha statue, and tranquil Sindhu Ghat. Overnight stay in Leh."
      },
      {
        day: "Day 9: Free Day in Leh – Souvenir Shopping & Tibetan Cafes",
        description: "Enjoy a leisurely free day to explore Leh at your own rhythm. Wander through the atmospheric Old Town alleys, relax in cozy rooftop cafes sipping freshly brewed coffee and seabuckthorn juice, and shop for certified pure Pashmina shawls, Ladakhi dry fruits, handcrafted prayer wheels, and Tibetan silver jewelry. Take time to soak in the tranquil mountain atmosphere on your final evening. Overnight stay in Leh."
      },
      {
        day: "Day 10: Departure from Leh Kushok Bakula Rimpochee Airport",
        description: "After a warm breakfast, our team will transfer you to the Leh airport on time for your departure flight. As you look out the airplane window over the vast Himalayan snow peaks, reminisce about 10 unforgettable days of adventure, culture, and high-altitude bliss across Ladakh."
      }
    ],
    inclusions: [
      "9 Nights accommodation (5N Leh deluxe hotel, 2N Nubra luxury camp, 1N Pangong lakeside camp, 1N Leh heritage stay)",
      "Daily breakfast and dinner (MAP plan) with wholesome hot multi-cuisine meals",
      "Exclusive private SUV (Innova Crysta / Scorpio 4x4) for all sightseeing, high-pass drives & airport transfers",
      "Experienced local Ladakhi chauffeur knowledgeable in road conditions and high-altitude safety",
      "All Inner Line Permits (ILP), Wildlife & Environment fees for Nubra, Turtuk, and Pangong",
      "Complimentary medical oxygen cylinder installed in the vehicle throughout high-altitude circuits",
      "All toll taxes, parking fees, state road taxes, and driver allowances",
      "24/7 dedicated trip assistance and concierge support from KoiKoi Travel"
    ],
    exclusions: [
      "Flights to and from Leh",
      "Entrance fees to monuments, palaces, and monasteries",
      "Double-humped camel safari charges at Hunder and local village guide fees",
      "Personal expenses such as laundry, phone charges, extra beverages, and tips",
      "Travel insurance or emergency medical evacuation expenses",
      "Unforeseen costs caused by roadblocks, flight delays, extreme weather, or natural events"
    ],
    whyChooseUs: [
      "Smart 10-day slow-paced itinerary maximizing safety and minimizing AMS risk",
      "Covers Turtuk border village in addition to classic Nubra and Pangong circuits",
      "Verified hand-picked hotels and luxury camps with private hot-water bathrooms",
      "Private dedicated 4x4 SUV with veteran local mountain driver",
      "Personalized 24/7 trip manager ensuring effortless logistics from start to finish"
    ],
    faqs: [
      {
        ques: "Why is a 10-day itinerary recommended for Ladakh?",
        ans: "10 days allows for ideal acclimatization (3 nights in Leh before heading to high passes), reduces driving fatigue, and lets you include Turtuk village and the grand Indus monasteries without rushing.",
        order: 1
      },
      {
        ques: "Is Turtuk village safe and open to tourists?",
        ans: "Yes, Turtuk was opened to tourists in 2010 and is completely safe, peaceful, and hospitable. It offers a unique cultural insight into Balti heritage, distinct from Buddhist Ladakh.",
        order: 2
      },
      {
        ques: "What permits are needed for Turtuk, Nubra, and Pangong?",
        ans: "All these areas require Inner Line Permits (ILPs) from the Leh district administration. KoiKoi Travel handles all permit paperwork, wildlife fees, and border clearance ahead of time.",
        order: 3
      },
      {
        ques: "What is the best month to book this 10-day trip?",
        ans: "June to September is the prime window. Weather is pleasant (15°C to 24°C in daytime), roads are fully clear of snow, and Turtuk's apricot trees are laden with fruit.",
        order: 4
      },
      {
        ques: "What precautions are taken for altitude sickness?",
        ans: "We mandate complete rest on Day 1, stage the ascent gradually, provide an onboard oxygen cylinder throughout the high passes, and stay in touch with local clinics along the route.",
        order: 5
      },
      {
        ques: "Are ATMs and card payments accepted across Ladakh?",
        ans: "ATMs are available only in Leh town. In Nubra, Turtuk, and Pangong, card swipe machines rarely work due to network issues. Always carry sufficient liquid cash from Leh.",
        order: 6
      },
      {
        ques: "Can solo female travelers or families do this tour comfortably?",
        ans: "Yes, Ladakh is one of the safest regions in India with welcoming locals and low crime rates. Our verified drivers and vetted family-friendly hotels make it ideal for solo travelers and families alike.",
        order: 7
      },
      {
        ques: "What clothes should I pack for 10 days in Ladakh?",
        ans: "Pack in layers: thermal inners, full-sleeve t-shirts, fleece pullover, windproof down jacket, woolen socks, gloves, sunglasses with UV protection, broad-spectrum sunscreen, and lip balm.",
        order: 8
      },
      {
        ques: "Is Wi-Fi available at hotels and camps?",
        ans: "Leh hotels offer functional Wi-Fi. In Nubra and Pangong camps, Wi-Fi is either unavailable or very weak. Postpaid Jio and BSNL mobile connections have partial coverage.",
        order: 9
      },
      {
        ques: "Can we extend this trip to include Tso Moriri or Manali?",
        ans: "Yes! We can easily extend this trip to 12 or 14 days, including Tso Moriri Lake or continuing via Sarchu and Jispa down to Manali. Simply let your KoiKoi Travel trip planner know.",
        order: 10
      }
    ]
  },

  // ─── 3. 7 Days Ladakh Cultural & Monastery Tour with Magnetic Hill ───
  {
    title: "7 Days Ladakh Cultural & Monastery Tour with Magnetic Hill",
    slug: "7-days-ladakh-monastery-tour-magnetic-hill",
    h1Title: "7 Days Ladakh Cultural & Monastery Tour with Magnetic Hill",
    seoTitle: "7 Days Ladakh Monastery Tour with Magnetic Hill | KoiKoi",
    seoDescription: "Plan a 7-day Ladakh cultural and monastery tour. Visit Magnetic Hill, Alchi, Thiksey, Khardung La Pass, Nubra Valley and Pangong Lake with private cab & guide.",
    seoKeyword: "ladakh monastery tour with magnetic hill, 7 days ladakh tour package, leh nubra pangong 7 days, magnetic hill alchi thiksey tour",
    destination: "Leh - Magnetic Hill - Sham Valley - Nubra Valley - Pangong Tso - Leh",
    noDays: 7,
    duration: "7 Days / 6 Nights",
    pricePerPerson: 32500,
    discountPrice: 28500,
    thumbImg: "/india/trip/lehi-1793539089467-thumb-1793539089472-384405.webp",
    bannerTitle: "7 Days Ladakh Cultural & Monastery Tour with Magnetic Hill",
    bannerTag: "Ancient Monasteries & Gravity Wonder",
    bannerImages: [
      "/hero-banners/leh-2-desktop-1793539177004-1793540183559-92d4fb.webp",
      "/hero-banners/pangong-2-desktop-1793540770443-1793540789566-ea909f.webp",
      "/hero-banners/ladakh-trip-desktop-1793467345138-1793467368486-256677.webp"
    ],
    overView: "Experience the timeless spiritual heritage and dramatic geological wonders of Ladakh in a perfectly paced week-long escape. The 7 Days Ladakh Cultural & Monastery Tour with Magnetic Hill combines sacred 11th-century Buddhist gompas with the Trans-Himalayas' most awe-inspiring landscapes. Begin by unraveling the mysteries of Sham Valley — watching vehicles defy gravity on Magnetic Hill, seeking blessings at holy Sangam and Gurudwara Pathar Sahib, and admiring ancient Kashmiri-style Buddhist wall frescoes at Alchi Monastery. Then journey across legendary Khardung La Pass (17,982 ft) to the white dunes of Nubra Valley, followed by an overnight stay beside the shimmering turquoise waters of Pangong Tso. Curated with private SUV transport, handpicked deluxe stays, and 24/7 safety assistance by KoiKoi Travel.",
    highlights: [
      "Comprehensive cultural tour covering Alchi, Thiksey, Diskit & Shey monasteries",
      "Witness the optical gravity-defying phenomenon at Magnetic Hill on the Leh-Srinagar highway",
      "See the vibrant confluence of Indus and Zanskar rivers at Nimmu (Sangam)",
      "Conquer the thrilling heights of Khardung La (17,982 ft), one of earth's highest motorable roads",
      "Ride double-humped Bactrian camels across the silver sand dunes of Hunder in Nubra",
      "Stay overnight beside the serene, color-changing waters of 134-km long Pangong Tso",
      "Cross Chang La Pass (17,590 ft) with hot tea and magnificent mountain panoramas",
      "End-to-end private vehicle, medical oxygen support, and certified Inner Line Permits"
    ],
    cityIds: [84, 89, 94, 87, 86, 85, 93], // Leh, Magnetic Hill, Alchi Monastery, Khardung La, Nubra Valley, Pangong Tso, Hemis Monastery
    days: [
      {
        day: "Day 1: Arrival in Leh (3,500m) – Acclimatization & Evening Stroll",
        description: "Arrive at Leh Airport, where crisp mountain air greets you. Our representative transfers you to your boutique hotel. Take it easy and spend the entire day resting indoors to adapt smoothly to the high altitude. In the late afternoon, take a relaxed walk around the local Leh Market to witness Buddhist monks, prayer flags, and local Ladakhi merchants. Overnight stay in Leh."
      },
      {
        day: "Day 2: Leh Heritage Sightseeing – Shanti Stupa, Leh Palace & Hall of Fame",
        description: "After breakfast, discover the royal and spiritual legacy of Leh town. Tour the dramatic 17th-century Leh Palace, reminiscent of Tibet's Potala Palace. Pay tribute to soldiers at the Hall of Fame army museum. In the evening, ascend to the hilltop Shanti Stupa, built to promote world peace, and witness the golden sunset cast glowing light over the Stok Kangri mountain range. Overnight stay in Leh."
      },
      {
        day: "Day 3: Sham Valley Monastery & Gravity Tour – Magnetic Hill, Sangam & Alchi",
        description: "Set out along the scenic Indus Valley highway. Experience the fascinating gravity phenomenon at Magnetic Hill, where neutral vehicles move uphill on their own. Visit sacred Gurudwara Pathar Sahib and stop at Sangam, the dramatic meeting point of Indus and Zanskar rivers. Continue deeper into Sham Valley to explore Alchi Monastery, a UNESCO-recognized 11th-century monastic treasure known for its intricate wood carvings and vibrant Indo-Tibetan wall frescoes. Return to Leh by evening. Overnight stay in Leh."
      },
      {
        day: "Day 4: Leh to Nubra Valley via Khardung La Pass (17,982 ft) – Diskit & Hunder",
        description: "Drive north from Leh climbing the legendary Khardung La Pass (17,982 ft). Capture breathtaking photos at the summit before descending into the fertile Nubra Valley. Visit the historic Diskit Gompa, famous for its colossal 106-foot statue of Maitreya Buddha overlooking the valley. In the afternoon, head to the white sand dunes of Hunder for an iconic ride on double-humped Bactrian camels. Check into your deluxe camp and enjoy a starry Himalayan evening. Overnight stay in Nubra Valley."
      },
      {
        day: "Day 5: Nubra Valley to Pangong Tso via Direct Shyok Valley Route",
        description: "After breakfast, depart Hunder and follow the scenic Shyok River route towards Pangong Tso Lake. Passing through dramatic rocky canyons and alpine rivers, reach the turquoise shores of Pangong Lake (14,270 ft) by early afternoon. Marvel at the multi-hued waters stretching across the horizon into Tibet. Check into your lakefront cottage camp and enjoy photography along the shoreline as sunset paints the water in shades of purple and gold. Overnight stay at Pangong Tso."
      },
      {
        day: "Day 6: Pangong Tso to Leh via Chang La Pass (17,590 ft) – Thiksey Monastery",
        description: "Greet the crisp morning with a mesmerizing sunrise over Pangong Lake. Following breakfast, begin your scenic drive back to Leh crossing Chang La Pass (17,590 ft). On reaching the Indus Valley, visit Thiksey Monastery, a majestic multi-storey gompa housing an iconic 15-meter golden statue of Future Buddha. Also stop at Shey Palace, famous for its giant gilded copper Buddha. Arrive in Leh by late afternoon with free time for shopping. Overnight stay in Leh."
      },
      {
        day: "Day 7: Departure from Leh Kushok Bakula Rimpochee Airport",
        description: "Enjoy your final breakfast surrounded by snow peaks. We will transfer you to the Leh airport on time to catch your scheduled flight back home. Board your aircraft with a camera full of extraordinary photographs and your heart enriched by the peaceful spirit of Ladakh."
      }
    ],
    inclusions: [
      "6 Nights accommodation (4N Leh hotel, 1N Nubra luxury camp, 1N Pangong lakeside camp)",
      "Daily breakfast and dinner (MAP plan) featuring wholesome hot meals",
      "Private sanitized SUV (Innova Crysta / Scorpio) for all sightseeing, high-pass journeys, and airport transfers",
      "Experienced local Ladakhi driver familiar with mountain terrain and altitude care",
      "All Inner Line Permits (ILP), Wildlife Sanctuary, and Environment conservation fees",
      "Medical emergency oxygen cylinder equipped inside the vehicle",
      "All toll taxes, parking fees, state road taxes, and driver allowances",
      "24/7 dedicated trip support and on-call concierge service from KoiKoi Travel"
    ],
    exclusions: [
      "Airfare to and from Leh",
      "Monastery and monument entrance ticket fees",
      "Bactrian camel ride charges at Hunder Sand Dunes and ATV rides",
      "Personal expenses such as laundry, beverages, telephone calls, and tips",
      "Travel insurance or emergency evacuation costs",
      "Unforeseen expenses resulting from flight cancellations, landslides, weather delays, or roadblocks"
    ],
    whyChooseUs: [
      "Ideal 7-day compact duration covering all must-visit highlights without burnout",
      "Comprehensive cultural inclusion: Alchi, Thiksey, Diskit and Shey monasteries",
      "Tested deluxe hotels and heated luxury camps with private bathrooms",
      "Dedicated private 4x4 SUV with experienced local Ladakhi mountain chauffeur",
      "100% transparent pricing with all permits, taxes and emergency oxygen included"
    ],
    faqs: [
      {
        ques: "Is 7 days enough to see Ladakh?",
        ans: "Yes, 7 days is the ideal duration for travelers with limited vacation time. It comfortably covers Leh, Magnetic Hill, Sham Valley, Alchi Monastery, Khardung La Pass, Nubra Valley, and Pangong Lake without excessive strain.",
        order: 1
      },
      {
        ques: "What makes Magnetic Hill so famous?",
        ans: "Magnetic Hill is an optical and magnetic wonder where the surrounding slopes create a strong illusion that vehicles parked in neutral roll uphill on their own, defying gravity.",
        order: 2
      },
      {
        ques: "Why is Alchi Monastery special?",
        ans: "Unlike most Tibetan-style monasteries built on hilltops, Alchi is built on the plains and dates back to the 11th century. It features rare Kashmiri-influenced wood carvings and centuries-old wall paintings preserved in pristine condition.",
        order: 3
      },
      {
        ques: "How bad is altitude sickness on a 7-day tour?",
        ans: "By dedicating Day 1 completely to rest in Leh and keeping physical exertion minimal on Day 2, most travelers acclimatize safely. We also keep an emergency oxygen cylinder in your SUV.",
        order: 4
      },
      {
        ques: "What permits are needed and who arranges them?",
        ans: "Inner Line Permits are required for Khardung La, Nubra Valley, and Pangong Tso. KoiKoi Travel manages all permit documentation and fee payments prior to your arrival.",
        order: 5
      },
      {
        ques: "What is the best time of year for this 7-day tour?",
        ans: "May to October offers the best conditions with clear roads, pleasant daytime temperatures (15°C to 22°C), and full access to monasteries and high passes.",
        order: 6
      },
      {
        ques: "Can senior citizens or children join this tour?",
        ans: "Yes, provided they have no severe cardiac or respiratory conditions. Because this tour involves high altitudes, consulting a doctor before booking is strongly advised.",
        order: 7
      },
      {
        ques: "What type of vehicle is provided?",
        ans: "A dedicated private SUV (such as Toyota Innova Crysta or Mahindra Scorpio) with an expert local driver is provided for your entire group.",
        order: 8
      },
      {
        ques: "Are meals included during the tour?",
        ans: "Yes, daily breakfast and hot dinner are included at all partner hotels and camps. Lunch can be enjoyed at quaint local cafes along the route.",
        order: 9
      },
      {
        ques: "What is the luggage limit for flights to Leh?",
        ans: "Most domestic airlines flying to Leh permit 15 kg check-in baggage and 7 kg cabin baggage. In Leh airport, strict security rules prohibit power banks in checked luggage.",
        order: 10
      }
    ]
  }
];

async function main() {
  console.log("Restoring Ladakh journeys...");

  for (const data of JOURNEYS_DATA) {
    const {
      days,
      inclusions,
      exclusions,
      whyChooseUs,
      faqs,
      highlights,
      cityIds,
      bannerTitle,
      bannerTag,
      bannerImages,
      ...journeyFields
    } = data;

    console.log(`Processing: ${data.slug} (${data.title})...`);

    // 1. Upsert Journey record
    const existing = await prisma.journey.findUnique({
      where: { slug: data.slug }
    });

    let journeyId;
    if (existing) {
      console.log(`  Updating existing Journey ID ${existing.id}...`);
      const updated = await prisma.journey.update({
        where: { id: existing.id },
        data: {
          ...journeyFields,
          highlights,
          cityOrder: cityIds,
          contentUpdatedAt: new Date(),
          isActive: true,
          states: { set: [{ id: LADAKH_STATE_ID }] },
          cities: { set: cityIds.map(id => ({ id })) }
        }
      });
      journeyId = updated.id;
    } else {
      console.log(`  Creating new Journey...`);
      const created = await prisma.journey.create({
        data: {
          ...journeyFields,
          highlights,
          cityOrder: cityIds,
          contentUpdatedAt: new Date(),
          isActive: true,
          states: { connect: [{ id: LADAKH_STATE_ID }] },
          cities: { connect: cityIds.map(id => ({ id })) }
        }
      });
      journeyId = created.id;
    }

    // 2. Journey Days
    await prisma.journeyDay.deleteMany({ where: { journeyId } });
    if (days && days.length > 0) {
      await prisma.journeyDay.createMany({
        data: days.map(d => ({
          journeyId,
          day: d.day,
          description: d.description,
          image: ""
        }))
      });
    }

    // 3. Inclusions
    await prisma.inclusion.deleteMany({ where: { journeyId } });
    if (inclusions && inclusions.length > 0) {
      await prisma.inclusion.create({
        data: { journeyId, inclusionList: inclusions }
      });
    }

    // 4. Exclusions
    await prisma.exclusion.deleteMany({ where: { journeyId } });
    if (exclusions && exclusions.length > 0) {
      await prisma.exclusion.create({
        data: { journeyId, inclusionList: exclusions }
      });
    }

    // 5. Why Choose Us
    await prisma.whyChoose.deleteMany({ where: { journeyId } });
    if (whyChooseUs && whyChooseUs.length > 0) {
      await prisma.whyChoose.create({
        data: { journeyId, choseUsList: whyChooseUs }
      });
    }

    // 6. FAQs
    await prisma.faq.deleteMany({ where: { entityType: "Journey", entityId: journeyId } });
    if (faqs && faqs.length > 0) {
      await prisma.faq.createMany({
        data: faqs.map(f => ({
          entityType: "Journey",
          entityId: journeyId,
          ques: f.ques,
          ans: f.ans,
          order: f.order
        }))
      });
    }

    // 7. Banner
    await prisma.banner.deleteMany({ where: { entityType: "Journey", entityId: journeyId } });
    if (bannerImages && bannerImages.length > 0) {
      await prisma.banner.create({
        data: {
          entityType: "Journey",
          entityId: journeyId,
          bannerTitle: bannerTitle || data.title,
          bannerTag: bannerTag || "Special Tour Package",
          images: bannerImages
        }
      });
    }

    console.log(`  ✓ Successfully restored ${data.slug} (ID: ${journeyId})`);
  }

  console.log("All 3 Ladakh journeys restored successfully!");
}

main()
  .catch((e) => {
    console.error("Error restoring Ladakh journeys:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
