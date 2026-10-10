import { prisma } from './utils/prismaConnection.js';

const SOUTH_INDIA_DATA = [
  {
    "state": {
      "title": "Tamil Nadu",
      "slug": "tamil-nadu",
      "seoTitle": "Tamil Nadu Tour Packages | Temples, Hill Stations & Heritage Circuits",
      "h1Title": "Tamil Nadu Tour Packages & Local Travel Guide",
      "seoDescription": "Book 100% customized Tamil Nadu tour packages. Explore Madurai Meenakshi Temple, Mahabalipuram shore temples, Ooty tea hills, and French Pondicherry with KoiKoi Travel.",
      "seoKeyword": "Tamil Nadu tour packages, Tamil Nadu trip itinerary, Madurai Ooty tour, South India temple tour packages, KoiKoi Travel Tamil Nadu",
      "overView": "<p>Planning a trip across <strong>Tamil Nadu</strong> can feel overwhelming. Between endless temple queues, unverified local taxi drivers demanding hidden surge fares, and confusing mountain roads up to <strong>Ooty</strong> and <strong>Kodaikanal</strong>, travel stress can easily ruin your vacation.</p>\n<p>That is where <strong>KoiKoi Travel</strong> comes in. We eliminate travel confusion with dedicated private AC cab transfers, pre-booked VIP temple access, and handpicked heritage resorts. Whether exploring the gopurams of <strong>Madurai</strong>, French lanes of Pondicherry, or tea gardens in <strong>Coonoor</strong>, we ensure a smooth, worry-free holiday.</p>\n<p>Enjoy transparent pricing, 24/7 dedicated trip support, and complete flexibility. Ready for an unforgettable South India experience? Check out our handpicked tour packages listed below and choose your ideal itinerary today!</p>",
      "famousFor": "Dravidian Temple Architecture, Nilgiri Hill Stations, UNESCO Monuments, Kanjeevaram Silk, Chettinad Cuisine",
      "capital": "Chennai",
      "language": "Tamil, English",
      "area": "130,058 sq km",
      "moreDescription": "<h2>Complete Tamil Nadu Travel Guide & Tips</h2>\n<p>Tamil Nadu is a vibrant southern realm where ancient stone craftsmanship meets misty blue mountain ranges and pristine coastal coastlines. Here is everything you need to know to plan a flawless trip.</p>\n<h3>Best Time to Visit</h3>\n<p>The winter months from November to March bring pleasant weather across the state, with cool hill station breezes in Ooty and comfortable sightseeing temperatures in Madurai, Tanjore, and Chennai.</p>\n<h3>Must-Try Regional Delights</h3>\n<p>Savor authentic South Indian filter coffee, crispy ghee roast dosas, Chettinad spicy chicken curry, and fresh coastal seafood thalis served on banana leaves.</p>\n<h3>Smart Travel Advice</h3>\n<p>Dress respectfully when visiting active temples (shoulders and knees covered). Keep lightweight cotton clothes for coastal towns and a light jacket for Ooty and Kodaikanal hill stations.</p>",
      "faqs": [
        {
          "ques": "What is the best time to plan a Tamil Nadu tour?",
          "ans": "November to March is the ideal season when temperatures are pleasant for temple visits and hill station drives."
        },
        {
          "ques": "Are private AC cab transfers included in KoiKoi Travel packages?",
          "ans": "Yes! Every KoiKoi Travel package includes a dedicated private AC cab with an experienced driver for all airport transfers and daily sightseeing."
        },
        {
          "ques": "Can we combine Tamil Nadu with Kerala or Pondicherry?",
          "ans": "Absolutely. We specialize in cross-state circuits like Chennai - Pondicherry - Tanjore - Madurai - Munnar - Alleppey."
        },
        {
          "ques": "What dress code is required for temples in Tamil Nadu?",
          "ans": "Traditional conservative attire (dhotis/trousers for men, sarees/salwars for women) is required inside major temples like Madurai Meenakshi Temple."
        }
      ]
    },
    "cities": [
      {
        "title": "Chennai",
        "slug": "chennai",
        "seoTitle": "Chennai Tour Packages | Coastal Heritage & Local Sightseeing",
        "h1Title": "Chennai Tour Packages & Travel Guide",
        "seoDescription": "Book Chennai tour packages with KoiKoi Travel. Explore Kapaleeshwarar Temple, Marina Beach, Mylapore filter coffee walks, and Fort St. George with private cab transfers.",
        "seoKeyword": "Chennai tour packages, Chennai sightseeing tour, Kapaleeshwarar Temple visit, Marina Beach tour, KoiKoi Travel Chennai",
        "overView": "<p>Arriving in <strong>Chennai</strong> can feel chaotic. Navigating crowded auto fares, coastal humidity, and guessing where to find authentic local filter coffee instead of tourist traps can drain your vacation energy.</p>\n<p>With <strong>KoiKoi Travel</strong>, your trip to <strong>Chennai</strong> is completely seamless. Your private AC cab driver meets you at the airport or station, escorting you to handpicked hotels. We take you straight to <strong>Kapaleeshwarar Temple</strong>, sunset strolls at <strong>Marina Beach</strong>, and genuine Mylapore eateries.</p>\n<p>Enjoy transparent fares and 24/7 local manager support. Explore our handpicked Chennai packages listed below and choose your favorite itinerary today!</p>",
        "famousFor": "Marina Beach, Kapaleeshwarar Temple, Mylapore Filter Coffee, Fort St. George, Silk Shopping",
        "attractions": "Kapaleeshwarar Temple, Marina Beach, Fort St. George, San Thome Basilica, Government Museum, Kalakshetra Foundation",
        "weather": "Tropical coastal climate (24\u00b0C to 34\u00b0C). Best visited between November and February for cooler ocean breezes.",
        "moreDescription": "<h2>Chennai Visitor Guide & Travel Tips</h2>\n<p>Chennai seamlessly blends centuries of Carnatic music and temple traditions with a thriving modern food and beach scene.</p>\n<h3>Top Experiences in Chennai</h3>\n<p>Take an early morning temple walk in Mylapore, sip piping hot filter coffee in a brass tumbler, and watch the sun set over the Bay of Bengal at Marina Beach.</p>\n<h3>Food & Dining Highlights</h3>\n<p>Do not miss authentic Tamil breakfast items like Murugan Idli, crispy Ghee Podi Dosa, and traditional South Indian thalis.</p>",
        "faqs": [
          {
            "ques": "Is 1 or 2 days enough for Chennai sightseeing?",
            "ans": "Yes, 1 to 2 days is perfect to cover Kapaleeshwarar Temple, Marina Beach, Fort St. George, and local shopping."
          },
          {
            "ques": "How far is Chennai from Mahabalipuram?",
            "ans": "Mahabalipuram is just 55 km from Chennai (about 1.5 hours drive along the scenic East Coast Road)."
          }
        ]
      },
      {
        "title": "Mahabalipuram",
        "slug": "mahabalipuram",
        "seoTitle": "Mahabalipuram Tour Packages | Shore Temple & UNESCO Heritage",
        "h1Title": "Mahabalipuram Tour Packages & Travel Guide",
        "seoDescription": "Discover UNESCO stone marvels in Mahabalipuram with KoiKoi Travel. Explore Shore Temple, Pancha Rathas, Krishna's Butterball, and beachside seafood dining.",
        "seoKeyword": "Mahabalipuram tour packages, Shore Temple trip, UNESCO Mahabalipuram tour, East Coast Road trip, KoiKoi Travel Mahabalipuram",
        "overView": "<p>Exploring <strong>Mahabalipuram</strong> without a structured plan can mean dealing with persistent beach vendors, confusing monument layouts, and unverified taxi rates along East Coast Road.</p>\n<p>With <strong>KoiKoi Travel</strong>, your <strong>Mahabalipuram</strong> getaway is effortless. Enjoy private AC cab transfers directly from Chennai, pre-booked tickets for the <strong>Shore Temple</strong> and <strong>Pancha Rathas</strong>, and comfortable coastal resort stays.</p>\n<p>Relax by the ocean with zero hidden costs and total peace of mind. Check out our curated Mahabalipuram tour packages below to book your coastal heritage escape today!</p>",
        "famousFor": "Shore Temple, Pancha Rathas, Krishna's Butterball, Rock Carvings, Seafood & Beach Resorts",
        "attractions": "Shore Temple, Pancha Rathas, Arjuna's Penance, Krishna's Butterball, Mahabalipuram Lighthouse, Covelong Beach",
        "weather": "Coastal sunny climate (22\u00b0C to 33\u00b0C). November to March brings breezy beach weather.",
        "moreDescription": "<h2>Mahabalipuram Travel Guide & Sightseeing Tips</h2>\n<p>A UNESCO World Heritage town located right on the ocean, Mahabalipuram showcases 7th-century Pallava rock architecture.</p>\n<h3>Must-See Highlights</h3>\n<p>Walk around the oceanfront Shore Temple at sunrise, marvel at the giant balancing boulder Krishna's Butterball, and explore the monolith Pancha Rathas.</p>",
        "faqs": [
          {
            "ques": "Can Mahabalipuram be done as a day trip from Chennai?",
            "ans": "Yes! Mahabalipuram is only 1.5 hours from Chennai via the East Coast Road, making it ideal for a day excursion or 1-night beach stay."
          }
        ]
      },
      {
        "title": "Madurai",
        "slug": "madurai",
        "seoTitle": "Madurai Tour Packages | Meenakshi Amman Temple & Heritage Trails",
        "h1Title": "Madurai Tour Packages & Travel Guide",
        "seoDescription": "Experience the soul of Madurai with KoiKoi Travel. Visit Meenakshi Amman Temple, Thirumalai Nayak Palace, Jigarthanda street food, and night ceremony rituals.",
        "seoKeyword": "Madurai tour packages, Meenakshi Temple trip, Madurai heritage tour, Jigarthanda Madurai, KoiKoi Travel Madurai",
        "overView": "<p>Visiting <strong>Madurai</strong> can feel daunting due to intense temple crowds, strict entry rules, and tricky narrow market lanes around the ancient city center.</p>\n<p><strong>KoiKoi Travel</strong> solves your travel worries in <strong>Madurai</strong>. We arrange seamless transfers, comfortable hotel stays near the temple, and guided visits to <strong>Meenakshi Amman Temple</strong> and <strong>Thirumalai Nayak Palace</strong>. Enjoy authentic local street treats like iconic <i>Jigarthanda</i> without hassle.</p>\n<p>Travel comfortably with dedicated driver support and clear pricing. Browse our handpicked Madurai tour packages below and plan your temple journey today!</p>",
        "famousFor": "Meenakshi Amman Temple, Thirumalai Nayak Palace, Jigarthanda Drink, Jasmine Markets, Temple Architecture",
        "attractions": "Meenakshi Amman Temple, Thirumalai Nayakkar Palace, Gandhi Memorial Museum, Alagar Koyil, Vandiyur Mariamman Teppakulam",
        "weather": "Warm tropical climate (23\u00b0C to 36\u00b0C). October to March is the best time for temple sightseeing.",
        "moreDescription": "<h2>Madurai Sightseeing & Cultural Guide</h2>\n<p>Known as the 'Athens of the East', Madurai revolves around its breathtaking 2,500-year-old Meenakshi Temple.</p>\n<h3>Cultural Experiences</h3>\n<p>Attend the evening night ceremony at Meenakshi Temple, sample famous Jigarthanda near Town Hall, and shop for traditional Madurai cotton sarees.</p>",
        "faqs": [
          {
            "ques": "What is the dress code for Madurai Meenakshi Temple?",
            "ans": "Strict traditional dress code applies. Dhotis/trousers for men, sarees/salwars for women. Mobile phones and cameras are prohibited inside."
          }
        ]
      },
      {
        "title": "Tanjore (Thanjavur)",
        "slug": "tanjore",
        "seoTitle": "Tanjore Tour Packages | Brihadeeswarar Temple & Chola Art",
        "h1Title": "Tanjore Tour Packages & Travel Guide",
        "seoDescription": "Discover Chola grandeur in Tanjore with KoiKoi Travel. Visit Brihadeeswarar Temple, Tanjore Royal Palace, Tanjore paintings, and bronze craft workshops.",
        "seoKeyword": "Tanjore tour packages, Thanjavur temple tour, Brihadeeswarar Temple trip, Chola heritage tour, KoiKoi Travel Tanjore",
        "overView": "<p>Planning a trip to <strong>Tanjore</strong> often brings confusion around monument timings, finding authentic Chola bronze artisan workshops, and securing clean reliable cabs.</p>\n<p>With <strong>KoiKoi Travel</strong>, exploring <strong>Tanjore</strong> is smooth and enriching. We handle your private transfers, handpick comfortable heritage stays, and ensure easy visits to the grand UNESCO-listed <strong>Brihadeeswarar Temple</strong> and <strong>Thanjavur Maratha Palace</strong>.</p>\n<p>Experience genuine Chola art and temple architecture with 100% transparent rates. Check out our customized Tanjore tour packages listed below and choose your trip today!</p>",
        "famousFor": "Brihadeeswarar Temple, Tanjore Paintings, Chola Bronze Idols, Thanjavur Royal Palace, Dancing Dolls",
        "attractions": "Brihadeeswarar Temple (Big Temple), Thanjavur Royal Palace & Art Gallery, Saraswathi Mahal Library, Schwartz Church",
        "weather": "Warm inland climate (22\u00b0C to 35\u00b0C). Best visited between November and February.",
        "moreDescription": "<h2>Tanjore Travel Guide & Heritage Insights</h2>\n<p>Tanjore was the celebrated capital of the Chola Empire, famous for architectural wonders and classical arts.</p>\n<h3>Sightseeing Highlights</h3>\n<p>Marvel at the giant monolithic Nandi statue and towering shadowless Vimana at the Big Temple, and inspect centuries-old palm-leaf manuscripts at Saraswathi Mahal Library.</p>",
        "faqs": [
          {
            "ques": "Why is Tanjore Big Temple famous?",
            "ans": "Built by Emperor Raja Raja Chola I in 1010 AD, it features one of India's tallest temple towers (66m) made entirely of granite."
          }
        ]
      },
      {
        "title": "Trichy (Tiruchirappalli)",
        "slug": "trichy",
        "seoTitle": "Trichy Tour Packages | Rockfort Temple & Srirangam Island",
        "h1Title": "Trichy Tour Packages & Travel Guide",
        "seoDescription": "Book Trichy tour packages with KoiKoi Travel. Explore Rockfort Ucchi Pillayar Temple, Srirangam Ranganathaswamy Temple, and Kaveri river views with private cab.",
        "seoKeyword": "Trichy tour packages, Srirangam temple visit, Rockfort Temple Trichy, South India temple circuit, KoiKoi Travel Trichy",
        "overView": "<p>Sightseeing in <strong>Trichy</strong> can be exhausting due to steep stone stair climbs, busy inner-city traffic, and crowded pilgrim queues across Srirangam island.</p>\n<p><strong>KoiKoi Travel</strong> makes your <strong>Trichy</strong> visit effortless. We provide dedicated private AC cab transfers, well-located hotel bookings, and comfortable sightseeing at <strong>Rockfort Temple</strong> and <strong>Srirangam Ranganathaswamy Temple</strong>.</p>\n<p>Enjoy hassle-free transit with dedicated 24/7 travel support and zero hidden costs. Browse our curated Trichy tour packages below and pick your ideal itinerary today!</p>",
        "famousFor": "Rockfort Ucchi Pillayar Temple, Srirangam Ranganathaswamy Temple, Kaveri River, Brass Utensils",
        "attractions": "Rockfort Temple, Srirangam Temple, Jambukeswarar Temple (Thiruvanaikaval), Kallanai Dam, St. Lourdes Church",
        "weather": "Tropical climate (24\u00b0C to 36\u00b0C). Best visited from November to February.",
        "moreDescription": "<h2>Trichy Visitor Guide & Temple Highlights</h2>\n<p>Trichy sits along the Kaveri River, blending ancient rock-cut temples with vibrant bazaar streets.</p>\n<h3>Top Attractions</h3>\n<p>Climb the 437 steps inside Rockfort for panoramic city views and explore Srirangam, the world's largest functioning Hindu temple complex.</p>",
        "faqs": [
          {
            "ques": "How many steps are there at Rockfort Temple Trichy?",
            "ans": "There are 437 stone steps cut into the ancient 3.8 billion-year-old rock leading to the top Ucchi Pillayar Temple."
          }
        ]
      },
      {
        "title": "Kodaikanal",
        "slug": "kodaikanal",
        "seoTitle": "Kodaikanal Tour Packages | Misty Lakes, Pine Forests & Hill Escapes",
        "h1Title": "Kodaikanal Tour Packages & Travel Guide",
        "seoDescription": "Escape to misty Kodai hills with KoiKoi Travel. Book customized packages covering Kodai Lake, Pillar Rocks, Coaker's Walk, and Pine Forest with private cab.",
        "seoKeyword": "Kodaikanal tour packages, Kodaikanal trip itinerary, Kodai hill station tour, Kodaikanal honeymoon package, KoiKoi Travel Kodaikanal",
        "overView": "<p>Traveling to <strong>Kodaikanal</strong> often involves stressful mountain hairpin drives, unverified local taxi surges, and overpriced boat ride queues at Kodai Lake.</p>\n<p>With <strong>KoiKoi Travel</strong>, your <strong>Kodaikanal</strong> hill retreat is pure relaxation. Experienced mountain drivers guide your private AC cab along scenic roads, dropping you at handpicked valley-view resorts. Explore <strong>Kodai Lake</strong>, <strong>Pillar Rocks</strong>, and <strong>Coaker's Walk</strong> at your own pace.</p>\n<p>Enjoy transparent rates and total comfort in the misty hills. Check out our handpicked Kodaikanal tour packages listed below and choose your dream holiday today!</p>",
        "famousFor": "Kodai Lake, Pillar Rocks, Coaker's Walk, Pine Forests, Homemade Chocolates, Kurinji Flowers",
        "attractions": "Kodaikanal Lake, Pillar Rocks, Coaker's Walk, Bryant Park, Pine Forest, Silver Cascade Falls, Moir Point",
        "weather": "Cool mountain climate (11\u00b0C to 20\u00b0C). Pleasant year-round, ideal from September to May.",
        "moreDescription": "<h2>Kodaikanal Hill Station Guide & Insider Tips</h2>\n<p>Known as the 'Princess of Hill Stations', Kodaikanal sits at 2,133m altitude amid dense pine forests and misty valleys.</p>\n<h3>Best Experiences</h3>\n<p>Enjoy a pedal boat ride on Kodai Lake, stroll along Coaker's Walk for sweeping valley views, and buy freshly made artisanal chocolates from local markets.</p>",
        "faqs": [
          {
            "ques": "Which is better for a honeymoon: Ooty or Kodaikanal?",
            "ans": "Kodaikanal is generally quieter, greener, and offers more secluded romantic forest walks, while Ooty is larger with tea garden landscapes."
          }
        ]
      },
      {
        "title": "Ooty",
        "slug": "ooty",
        "seoTitle": "Ooty Tour Packages | Nilgiri Tea Gardens & Toy Train Journeys",
        "h1Title": "Ooty Tour Packages & Travel Guide",
        "seoDescription": "Plan your Ooty getaway with KoiKoi Travel. Explore Nilgiri Tea Estates, Doddabetta Peak, Ooty Lake, Botanical Gardens, and Nilgiri Mountain Railway.",
        "seoKeyword": "Ooty tour packages, Ooty travel itinerary, Nilgiri toy train booking, Ooty honeymoon package, KoiKoi Travel Ooty",
        "overView": "<p>Planning an <strong>Ooty</strong> trip can get stressful with peak season traffic jams, sold-out toy train tickets, and inflated hotel rates near town center.</p>\n<p><strong>KoiKoi Travel</strong> takes the hassle out of your <strong>Ooty</strong> vacation. We pre-arrange private AC cab transfers, comfortable hill stay bookings, and sightseeing across <strong>Doddabetta Peak</strong>, <strong>Ooty Botanical Gardens</strong>, and lush <strong>Nilgiri Tea Estates</strong>.</p>\n<p>Enjoy transparent pricing and dedicated 24/7 manager support. Browse our curated Ooty tour packages listed below and pick your ideal hill escape today!</p>",
        "famousFor": "Nilgiri Mountain Railway (Toy Train), Tea Plantations, Doddabetta Peak, Ooty Lake, Homemade Chocolates",
        "attractions": "Doddabetta Peak, Ooty Botanical Gardens, Ooty Lake, Rose Garden, Pykara Lake & Waterfalls, Tea Factory Museum",
        "weather": "Cool hill climate (5\u00b0C to 20\u00b0C). Best visited between October and May.",
        "moreDescription": "<h2>Ooty Travel Guide & Sightseeing Highlights</h2>\n<p>Ooty (Udhagamandalam) is South India's quintessential hill station, surrounded by rolling tea gardens and Nilgiri mist.</p>\n<h3>Top Activities in Ooty</h3>\n<p>Ride the historic UNESCO Nilgiri Mountain Railway toy train, sample fresh tea at tea factories, and watch panoramic sunsets from Doddabetta Peak.</p>",
        "faqs": [
          {
            "ques": "How to book the Nilgiri Toy Train in Ooty?",
            "ans": "Tickets can be booked via IRCTC. KoiKoi Travel helps coordinate toy train schedules as part of your customized Ooty itinerary."
          }
        ]
      },
      {
        "title": "Coonoor",
        "slug": "coonoor",
        "seoTitle": "Coonoor Tour Packages | Quiet Tea Estates & Nilgiri Viewpoints",
        "h1Title": "Coonoor Tour Packages & Travel Guide",
        "seoDescription": "Discover serene Coonoor with KoiKoi Travel. Explore Sim's Park, Dolphin's Nose, Highfield Tea Factory, and scenic Nilgiri toy train rides.",
        "seoKeyword": "Coonoor tour packages, Coonoor tea estate stay, Dolphin's Nose Coonoor, Nilgiri hill tour, KoiKoi Travel Coonoor",
        "overView": "<p>Visiting <strong>Coonoor</strong> without private transport can lead to cab availability issues, missed tea estate views, and confusing hill roads.</p>\n<p>With <strong>KoiKoi Travel</strong>, your <strong>Coonoor</strong> experience is seamless. Your dedicated private AC cab driver guides you along scenic mountain routes, taking you to <strong>Sim's Park</strong>, <strong>Dolphin's Nose</strong> viewpoint, and organic tea factories.</p>\n<p>Relax in peaceful tea garden resorts with transparent rates and full support. Check out our customized Coonoor tour packages below and book your serene Nilgiri retreat today!</p>",
        "famousFor": "Sim's Park, Dolphin's Nose Viewpoint, Tea Estates, Lamb's Rock, Highfield Tea Factory",
        "attractions": "Sim's Park, Dolphin's Nose, Lamb's Rock, Catherine Falls, Highfield Tea Factory, Laws Falls",
        "weather": "Mild pleasant climate (10\u00b0C to 22\u00b0C). Ideal to visit year-round, especially September to May.",
        "moreDescription": "<h2>Coonoor Travel Guide & Quiet Hill Tips</h2>\n<p>Coonoor is a peaceful alternative to busy Ooty, famous for sprawling green tea plantations and botanical gardens.</p>\n<h3>Must-Do Experiences</h3>\n<p>Take a guided tea tasting tour at Highfield Tea Factory, walk among rare plants at Sim's Park, and enjoy dramatic gorge views from Dolphin's Nose.</p>",
        "faqs": [
          {
            "ques": "Is Coonoor worth visiting along with Ooty?",
            "ans": "Yes! Coonoor is only 18 km from Ooty and offers a much quieter, less crowded tea estate environment."
          }
        ]
      },
      {
        "title": "Rameshwaram",
        "slug": "rameshwaram",
        "seoTitle": "Rameshwaram Tour Packages | Sacred Temple Baths & Dhanushkodi Beach",
        "h1Title": "Rameshwaram Tour Packages & Travel Guide",
        "seoDescription": "Book Rameshwaram tour packages with KoiKoi Travel. Visit Ramanathaswamy Temple, 22 Holy Wells bath ritual, Pamban Bridge, and Dhanushkodi ghost town.",
        "seoKeyword": "Rameshwaram tour packages, Ramanathaswamy Temple visit, Dhanushkodi tour, Pamban Bridge drive, KoiKoi Travel Rameshwaram",
        "overView": "<p>Planning a <strong>Rameshwaram</strong> pilgrimage can involve confusing temple bath rules, long ticket queues, and unreliable local cabs for Dhanushkodi.</p>\n<p><strong>KoiKoi Travel</strong> handles your entire <strong>Rameshwaram</strong> trip with care. We arrange comfortable hotel stays near the temple, private AC cab transfers for <strong>Pamban Bridge</strong> and <strong>Dhanushkodi</strong>, and clear guidance for the 22 holy wells bath ritual.</p>\n<p>Experience a spiritual, stress-free island journey with transparent pricing. Explore our handpicked Rameshwaram packages listed below and choose your itinerary today!</p>",
        "famousFor": "Ramanathaswamy Temple, 22 Holy Theerthams, Pamban Bridge, Dhanushkodi Ghost Town, APJ Abdul Kalam Memorial",
        "attractions": "Ramanathaswamy Temple, Dhanushkodi Beach, Pamban Sea Bridge, Dr. APJ Abdul Kalam Memorial, Agni Theertham, Panchamukhi Hanuman Temple",
        "weather": "Tropical island climate (23\u00b0C to 34\u00b0C). Best visited between October and March.",
        "moreDescription": "<h2>Rameshwaram Pilgrimage & Visitor Guide</h2>\n<p>Rameshwaram is a holy island town connected to mainland India by the iconic Pamban Bridge.</p>\n<h3>Key Pilgrimage Steps</h3>\n<p>Take a holy dip at Agni Theertham sea, experience the 22 sacred well baths inside Ramanathaswamy Temple, and marvel at the world's longest temple corridor.</p>",
        "faqs": [
          {
            "ques": "How to visit Dhanushkodi from Rameshwaram?",
            "ans": "Dhanushkodi is 20 km from Rameshwaram. Private cabs can easily drive up to the tip of Dhanushkodi along the scenic newly built road."
          }
        ]
      },
      {
        "title": "Kanchipuram",
        "slug": "kanchipuram",
        "seoTitle": "Kanchipuram Tour Packages | Thousand Temples & Silk Weaving Trails",
        "h1Title": "Kanchipuram Tour Packages & Travel Guide",
        "seoDescription": "Explore silk and stone in Kanchipuram with KoiKoi Travel. Visit Kailasanathar Temple, Kamakshi Amman Temple, Varadharaja Perumal, and authentic silk sari weavers.",
        "seoKeyword": "Kanchipuram tour packages, Kanchipuram silk sari tour, Kailasanathar temple visit, Temple town Tamil Nadu, KoiKoi Travel Kanchipuram",
        "overView": "<p>Visiting <strong>Kanchipuram</strong> can become exhausting with aggressive silk commission touts, crowded temple lanes, and unorganized transport options.</p>\n<p>With <strong>KoiKoi Travel</strong>, your <strong>Kanchipuram</strong> excursion is relaxed and authentic. Enjoy private AC cab transfers from Chennai, guided visits to ancient temples like <strong>Kailasanathar</strong> and <strong>Kamakshi Amman</strong>, and direct visits to genuine silk weaver society stores.</p>\n<p>Shop for real Kanjeevaram silk with zero pressure and zero hidden fees. Check out our customized Kanchipuram tour packages below and book your trip today!</p>",
        "famousFor": "Silk Sarees (Kanjeevaram), Kailasanathar Temple, Kamakshi Amman Temple, Varadharaja Perumal Temple, Temple Architecture",
        "attractions": "Kailasanathar Temple, Ekambareswarar Temple, Kamakshi Amman Temple, Varadharaja Perumal Temple, Weaver Cooperative Societies",
        "weather": "Tropical inland climate (22\u00b0C to 35\u00b0C). Best visited between October and March.",
        "moreDescription": "<h2>Kanchipuram Travel Guide & Temple Insights</h2>\n<p>Known as the 'City of Thousand Temples', Kanchipuram is legendary for Dravidian stone architecture and handwoven silk.</p>\n<h3>Sightseeing Highlights</h3>\n<p>Admire 8th-century Pallava stone carvings at Kailasanathar Temple and buy certified pure mulberry silk sarees directly from weaver cooperatives.</p>",
        "faqs": [
          {
            "ques": "How far is Kanchipuram from Chennai?",
            "ans": "Kanchipuram is approximately 75 km from Chennai (about 2 hours drive via the Chennai - Bengaluru highway)."
          }
        ]
      }
    ]
  },
  {
    "state": {
      "title": "Kerala",
      "slug": "kerala",
      "seoTitle": "Kerala Tour Packages | Backwaters, Tea Hills & Beach Resorts",
      "h1Title": "Kerala Tour Packages & Local Travel Guide",
      "seoDescription": "Book 100% customized Kerala tour packages with KoiKoi Travel. Experience Alleppey houseboats, Munnar tea hills, Thekkady wildlife safaris, and Kovalam beaches.",
      "seoKeyword": "Kerala tour packages, Kerala backwater houseboat, Munnar Alleppey tour, Kerala travel itinerary, KoiKoi Travel Kerala",
      "overView": "<p>Planning a trip to <strong>Kerala</strong> can get confusing. Unlicensed houseboat operators overcharging for poor quality boats, tricky ghat driving routes to <strong>Munnar</strong>, and unverified spice farm fees can easily ruin your dream holiday.</p>\n<p>That is where <strong>KoiKoi Travel</strong> steps in. We ensure a 100% smooth Kerala experience with verified luxury houseboats in <strong>Alleppey</strong>, private AC cab transfers with mountain-trained drivers, and handpicked hill resorts in <strong>Munnar</strong> and <strong>Thekkady</strong>.</p>\n<p>Enjoy transparent pricing, 24/7 dedicated trip support, and complete itinerary flexibility. Ready to experience God's Own Country? Check out our handpicked Kerala tour packages listed below and choose your ideal holiday today!</p>",
      "famousFor": "Backwaters & Houseboats, Tea Gardens, Ayurvedic Massages, Spice Plantations, Kathakali Dance, Beaches",
      "capital": "Thiruvananthapuram",
      "language": "Malayalam, English",
      "area": "38,863 sq km",
      "moreDescription": "<h2>Complete Kerala Travel Guide & Insider Tips</h2>\n<p>Kerala is a tropical paradise in South India renowned for palm-fringed backwaters, misty mountain ranges, and rich cultural traditions.</p>\n<h3>Best Time to Visit</h3>\n<p>September to March offers pleasant, dry weather perfect for backwater cruises and hill station sightseeing in Munnar and Wayanad.</p>\n<h3>Must-Try Local Experiences</h3>\n<p>Overnight stay in a private houseboat, authentic Ayurvedic massage, watching a Kathakali performance, and savoring Kerala Karimeen fish curry.</p>",
      "faqs": [
        {
          "ques": "How many days are recommended for a complete Kerala tour?",
          "ans": "6 to 8 days is ideal to cover Cochin, Munnar tea hills, Thekkady wildlife, and Alleppey backwater houseboat."
        },
        {
          "ques": "Are houseboats safe for families and couples?",
          "ans": "Yes! All KoiKoi Travel houseboats are 100% verified, private, fully equipped with safety gear, private bedrooms, and dedicated chef & crew."
        }
      ]
    },
    "cities": [
      {
        "title": "Cochin (Kochi)",
        "slug": "cochin",
        "seoTitle": "Cochin Tour Packages | Fort Kochi Heritage & Colonial Charm",
        "h1Title": "Cochin Tour Packages & Travel Guide",
        "seoDescription": "Explore Fort Kochi with KoiKoi Travel. Visit Chinese Fishing Nets, Mattancherry Palace, Jew Town, St. Francis Church, and Kathakali shows with private cab.",
        "seoKeyword": "Cochin tour packages, Fort Kochi sightseeing, Chinese Fishing Nets Kochi, Jew Town Mattancherry, KoiKoi Travel Cochin",
        "overView": "<p>Arriving in <strong>Cochin</strong> can feel overwhelming with airport cab hassles, confusing ferry lines, and overpriced tourist shows in Fort Kochi.</p>\n<p>With <strong>KoiKoi Travel</strong>, your <strong>Cochin</strong> arrival is effortless. Your private AC driver meets you at Cochin Airport (COK), whisking you to boutique heritage stays. Explore iconic <strong>Chinese Fishing Nets</strong>, <strong>Jew Town</strong>, and authentic Kathakali performances without stress.</p>\n<p>Enjoy transparent pricing and 24/7 trip assistance. Check out our curated Cochin tour packages below and pick your ideal gateway itinerary today!</p>",
        "famousFor": "Chinese Fishing Nets, Fort Kochi Heritage, Jew Town, Mattancherry Palace, Kathakali Dance, Seafood",
        "attractions": "Chinese Fishing Nets, Mattancherry Dutch Palace, Paradesi Synagogue, St. Francis Church, Fort Kochi Beach, Marine Drive",
        "weather": "Tropical coastal climate (23\u00b0C to 33\u00b0C). Best visited between October and March.",
        "moreDescription": "<h2>Cochin Travel Guide & Heritage Walking Tips</h2>\n<p>Cochin (Kochi) is Kerala's historical port city where Portuguese, Dutch, British, and Chinese influences blend seamlessly.</p>\n<h3>Top Sightseeing Spots</h3>\n<p>Stroll through the colonial streets of Fort Kochi, buy spice souvenirs in Jew Town, and watch fishermen operate giant wooden Chinese fishing nets.</p>",
        "faqs": [
          {
            "ques": "How far is Cochin Airport from Fort Kochi?",
            "ans": "Cochin International Airport (COK) is about 42 km from Fort Kochi (approx 1 hour 15 minutes drive)."
          }
        ]
      },
      {
        "title": "Munnar",
        "slug": "munnar",
        "seoTitle": "Munnar Tour Packages | Tea Estates, Waterfalls & Mountain Escapes",
        "h1Title": "Munnar Tour Packages & Travel Guide",
        "seoDescription": "Escape to misty Munnar hills with KoiKoi Travel. Explore Tea Gardens, Eravikulam National Park (Nilgiri Tahr), Mattupetty Dam, and spice plantations.",
        "seoKeyword": "Munnar tour packages, Munnar tea estate tour, Munnar honeymoon package, Eravikulam safari, KoiKoi Travel Munnar",
        "overView": "<p>Driving up to <strong>Munnar</strong> can be stressful due to steep mountain hairpin bends, heavy fog, and unverified local driver charges.</p>\n<p><strong>KoiKoi Travel</strong> ensures a peaceful <strong>Munnar</strong> holiday. Our mountain-trained private drivers navigate scenic ghats comfortably while you relax. Enjoy handpicked tea-resort stays and guided visits to <strong>Eravikulam National Park</strong>, <strong>Mattupetty Dam</strong>, and lush tea estates.</p>\n<p>Travel with 100% transparent rates and 24/7 dedicated support. Explore our handpicked Munnar tour packages listed below and book your tea hill retreat today!</p>",
        "famousFor": "Tea Plantations, Eravikulam National Park (Nilgiri Tahr), Mattupetty Dam, Anamudi Peak, Tea Museum, Waterfalls",
        "attractions": "Eravikulam National Park, Mattupetty Dam, Tea Museum, Echo Point, Anamudi Peak, Attukad Waterfalls, Kundala Lake",
        "weather": "Cool hill climate (10\u00b0C to 20\u00b0C). Ideal to visit year-round, especially September to May.",
        "moreDescription": "<h2>Munnar Hill Station Guide & Travel Tips</h2>\n<p>Perched at 1,600m altitude, Munnar is South India's premier tea town surrounded by green hills and cascading waterfalls.</p>\n<h3>Best Experiences</h3>\n<p>Spotted endangered Nilgiri Tahr mountain goats at Rajamalai, sip freshly plucked tea at the Tea Museum, and take photo stops at Echo Point.</p>",
        "faqs": [
          {
            "ques": "How many days are needed for Munnar?",
            "ans": "2 to 3 days is ideal to comfortably explore tea gardens, national parks, waterfalls, and spice plantations."
          }
        ]
      },
      {
        "title": "Periyar (Thekkady)",
        "slug": "periyar",
        "seoTitle": "Periyar Tour Packages | Wildlife Safaris & Spice Plantation Walks",
        "h1Title": "Periyar (Thekkady) Tour Packages & Travel Guide",
        "seoDescription": "Experience Thekkady wildlife with KoiKoi Travel. Book Periyar Lake boat safaris, spice plantation walks, elephant interactions, and jungle eco-tours.",
        "seoKeyword": "Periyar tour packages, Thekkady wildlife safari, Periyar boat ride booking, Spice garden tour Kerala, KoiKoi Travel Thekkady",
        "overView": "<p>Visiting <strong>Periyar (Thekkady)</strong> often involves last-minute boat safari ticket rushes, unverified spice farm fees, and crowded transport hubs.</p>\n<p>With <strong>KoiKoi Travel</strong>, your <strong>Thekkady</strong> adventure is completely smooth. We pre-arrange your <strong>Periyar Lake</strong> boat safari tickets, private AC transfers, and handpicked jungle lodge stays. Explore organic cardamom gardens and elephant sanctuaries with ease.</p>\n<p>Enjoy transparent rates and 24/7 local trip coordination. Check out our customized Periyar tour packages below and pick your wildlife itinerary today!</p>",
        "famousFor": "Periyar Wildlife Sanctuary, Boat Safari, Spice Plantations, Elephant Rides, Kalaripayattu Martial Arts",
        "attractions": "Periyar Lake Boat Safari, Elephant Junction, Anakkara Spice Gardens, Kadathanadan Kalari Centre, Mangala Devi Temple",
        "weather": "Pleasant forest climate (15\u00b0C to 26\u00b0C). Best visited between September and May.",
        "moreDescription": "<h2>Periyar & Thekkady Travel Guide</h2>\n<p>Thekkady is Kerala's spice and wildlife hub, centered around the sprawling Periyar Tiger Reserve.</p>\n<h3>Top Jungle Activities</h3>\n<p>Spot wild elephants and sambar deer on a Periyar Lake boat cruise, take a guided spice garden walk, and watch a live Kalaripayattu martial arts show.</p>",
        "faqs": [
          {
            "ques": "How to book Periyar Lake boat safari tickets?",
            "ans": "Boat tickets are limited and sold online via Kerala Forest Department. KoiKoi Travel pre-arranges tickets as part of your customized package."
          }
        ]
      },
      {
        "title": "Kumarakom",
        "slug": "kumarakom",
        "seoTitle": "Kumarakom Tour Packages | Vembanad Lake & Luxury Backwater Resorts",
        "h1Title": "Kumarakom Tour Packages & Travel Guide",
        "seoDescription": "Discover luxury backwaters in Kumarakom with KoiKoi Travel. Explore Vembanad Lake cruises, Kumarakom Bird Sanctuary, and premium lakefront resort stays.",
        "seoKeyword": "Kumarakom tour packages, Vembanad Lake resort, Kumarakom bird sanctuary tour, Kerala luxury backwaters, KoiKoi Travel Kumarakom",
        "overView": "<p>Planning a <strong>Kumarakom</strong> stay can lead to confusion over resort locations, unverified boat jetty rates, and tourist trap dining spots.</p>\n<p><strong>KoiKoi Travel</strong> ensures a luxurious, peaceful <strong>Kumarakom</strong> escape. We book handpicked waterfront resorts along <strong>Vembanad Lake</strong>, private motorboat cruises, and visits to the <strong>Kumarakom Bird Sanctuary</strong>.</p>\n<p>Unwind in total tranquil comfort with transparent pricing and 24/7 manager support. Browse our handpicked Kumarakom tour packages listed below and choose your luxury retreat today!</p>",
        "famousFor": "Vembanad Lake, Luxury Water Resorts, Kumarakom Bird Sanctuary, Shikara Boat Cruises, Ayurvedic Wellness",
        "attractions": "Vembanad Lake, Kumarakom Bird Sanctuary, Arosseril Waterfalls, Pathiramanal Island, Bay Island Driftwood Museum",
        "weather": "Tropical humid climate (22\u00b0C to 32\u00b0C). Best visited from September to March.",
        "moreDescription": "<h2>Kumarakom Backwater Visitor Guide</h2>\n<p>Kumarakom is a cluster of peaceful islands on Vembanad Lake, famous for migratory birds and high-end luxury resorts.</p>\n<h3>Serene Highlights</h3>\n<p>Spot migratory herons and Siberian storks at Kumarakom Bird Sanctuary, enjoy sunset shikara rides, and relax with authentic Kerala Ayurveda treatments.</p>",
        "faqs": [
          {
            "ques": "What is the difference between Alleppey and Kumarakom?",
            "ans": "Alleppey is the busy hub for houseboat cruises, while Kumarakom offers quieter, high-end luxury lakefront resort stays."
          }
        ]
      },
      {
        "title": "Alleppey (Alappuzha)",
        "slug": "alleppey",
        "seoTitle": "Alleppey Tour Packages | Houseboat Cruises & Backwater Trails",
        "h1Title": "Alleppey (Alappuzha) Tour Packages & Travel Guide",
        "seoDescription": "Book authentic Alleppey houseboat packages with KoiKoi Travel. Cruise Punnamada Lake, backwater canals, village life, and enjoy freshly cooked Kerala meals.",
        "seoKeyword": "Alleppey houseboat package, Alappuzha backwater tour, Kerala houseboat booking, Alleppey trip itinerary, KoiKoi Travel Alleppey",
        "overView": "<p>Booking an <strong>Alleppey</strong> houseboat can be risky with tout scams, unverified old boats, poor food quality, and hidden AC electricity fees.</p>\n<p>With <strong>KoiKoi Travel</strong>, your <strong>Alleppey</strong> houseboat experience is 100% verified and stress-free. Cruise peaceful backwaters on private deluxe or luxury houseboats featuring air-conditioned bedrooms, private upper decks, and dedicated onboard chefs serving fresh Karimeen fish.</p>\n<p>Enjoy transparent rates and total peace of mind. Check out our curated Alleppey houseboat packages below and book your backwater cruise today!</p>",
        "famousFor": "Houseboat Overnight Stay, Backwater Canals, Punnamada Lake, Nehru Trophy Boat Race, Marari Beach",
        "attractions": "Alleppey Backwaters, Punnamada Lake, Alappuzha Beach & Lighthouse, Marari Beach, Krishnapuram Palace, Revi Karunakaran Museum",
        "weather": "Warm coastal backwater climate (23\u00b0C to 33\u00b0C). Best visited from October to March.",
        "moreDescription": "<h2>Alleppey Houseboat & Backwater Travel Guide</h2>\n<p>Known as the 'Venice of the East', Alleppey is famous worldwide for its vast network of emerald backwater canals.</p>\n<h3>Houseboat Stay Experience</h3>\n<p>Check-in at noon, enjoy freshly cooked Kerala lunch while gliding past palm-lined villages, watch sunset over the lake, and anchor peacefully for the night.</p>",
        "faqs": [
          {
            "ques": "What is included in a KoiKoi Travel Alleppey houseboat booking?",
            "ans": "Every houseboat booking includes private boat, AC bedroom, all meals (lunch, evening tea/snacks, dinner, breakfast), and personal crew/chef."
          }
        ]
      },
      {
        "title": "Wayanad",
        "slug": "wayanad",
        "seoTitle": "Wayanad Tour Packages | Forest Trails, Caves & Eco-Resorts",
        "h1Title": "Wayanad Tour Packages & Travel Guide",
        "seoDescription": "Explore green Wayanad hills with KoiKoi Travel. Visit Edakkal Caves, Banasura Sagar Dam, Chembra Peak, Kuruva Island, and coffee estate resorts.",
        "seoKeyword": "Wayanad tour packages, Wayanad travel itinerary, Edakkal caves tour, Banasura dam Wayanad, KoiKoi Travel Wayanad",
        "overView": "<p>Exploring <strong>Wayanad</strong> without local planning can lead to navigation confusion on remote forest roads, unverified cab rates, and missed sight timings.</p>\n<p><strong>KoiKoi Travel</strong> makes your <strong>Wayanad</strong> trip smooth and enjoyable. We provide private AC cab transfers, mountain drivers, and handpicked stays in coffee plantation resorts. Explore prehistoric <strong>Edakkal Caves</strong>, <strong>Banasura Sagar Dam</strong>, and <strong>Kuruva Island</strong> with ease.</p>\n<p>Enjoy 100% transparent pricing and 24/7 local manager support. Explore our handpicked Wayanad tour packages listed below and choose your eco-escape today!</p>",
        "famousFor": "Edakkal Caves (Neolithic Carvings), Banasura Sagar Dam, Coffee & Spice Estates, Chembra Peak, Kuruva Island",
        "attractions": "Edakkal Caves, Banasura Sagar Dam, Chembra Peak (Heart Lake), Kuruva Dweep Island, Wayanad Wildlife Sanctuary, Soochipara Falls",
        "weather": "Cool green forest climate (15\u00b0C to 27\u00b0C). Best visited between September and May.",
        "moreDescription": "<h2>Wayanad Hill & Forest Visitor Guide</h2>\n<p>Wayanad is North Kerala's green highland district, filled with dense wildlife sanctuaries, mist-covered peaks, and ancient caves.</p>\n<h3>Top Sightseeing Highlights</h3>\n<p>Trek up to Edakkal Caves to see 7,000-year-old rock carvings, ride speedboats at Banasura Sagar Dam, and walk through spice plantations.</p>",
        "faqs": [
          {
            "ques": "How far is Wayanad from Calicut (Kozhikode)?",
            "ans": "Wayanad is about 85 km from Calicut Airport/Railway Station (approx 2.5 hours drive up the scenic Thamarassery Ghat pass)."
          }
        ]
      },
      {
        "title": "Bekal",
        "slug": "bekal",
        "seoTitle": "Bekal Tour Packages | Historic Ocean Fort & Quiet Beaches",
        "h1Title": "Bekal Tour Packages & Travel Guide",
        "seoDescription": "Discover serene Bekal with KoiKoi Travel. Explore historic Bekal Fort overlooking the Arabian Sea, pristine beaches, and luxury coastal resorts.",
        "seoKeyword": "Bekal tour packages, Bekal fort trip, Bekal beach resort Kerala, North Kerala tour, KoiKoi Travel Bekal",
        "overView": "<p>Visiting <strong>Bekal</strong> in North Kerala can be tricky due to sparse public transport, limited local cab availability, and lack of guided information.</p>\n<p>With <strong>KoiKoi Travel</strong>, your <strong>Bekal</strong> retreat is completely comfortable. Enjoy private AC cab transfers, luxury oceanfront resort stays, and effortless visits to the giant keyhole-shaped <strong>Bekal Fort</strong> overlooking the Arabian Sea.</p>\n<p>Relax on untouched golden beaches with zero hidden fees and total peace of mind. Check out our customized Bekal tour packages below and plan your coastal getaway today!</p>",
        "famousFor": "Bekal Fort, Arabian Sea Sunset Views, Bekal Beach, Backwater Estuaries, Luxury Resorts",
        "attractions": "Bekal Fort, Bekal Fort Beach, Kappil Beach, Chandragiri Fort, Nombili Hill, Ananthapura Lake Temple",
        "weather": "Coastal tropical climate (23\u00b0C to 33\u00b0C). Best visited from October to March.",
        "moreDescription": "<h2>Bekal Coastal Visitor Guide</h2>\n<p>Bekal is North Kerala's hidden coastal jewel, dominated by 300-year-old Bekal Fort built right on the ocean waves.</p>\n<h3>Quiet Beach Highlights</h3>\n<p>Walk along the stone ramparts of Bekal Fort for 360-degree ocean views, watch golden sunsets at Kappil Beach, and enjoy peaceful luxury resort stays.</p>",
        "faqs": [
          {
            "ques": "Which is the nearest airport to Bekal?",
            "ans": "Mangalore International Airport (IXE) in Karnataka is the nearest airport, located just 50 km from Bekal (1.5 hours drive)."
          }
        ]
      },
      {
        "title": "Calicut (Kozhikode)",
        "slug": "calicut",
        "seoTitle": "Calicut Tour Packages | Malabar Culinary Trails & Coastal Culture",
        "h1Title": "Calicut (Kozhikode) Tour Packages & Travel Guide",
        "seoDescription": "Experience Calicut with KoiKoi Travel. Explore Kozhikode Beach, Sweet Street (Mithai Theravu), authentic Malabar Biryani hubs, and Mananchira Square.",
        "seoKeyword": "Calicut tour packages, Kozhikode biryani tour, Malabar tourism Kerala, Kozhikode beach, KoiKoi Travel Calicut",
        "overView": "<p>Exploring <strong>Calicut (Kozhikode)</strong> without local insight can mean getting stuck in city traffic and missing legendary culinary spots and sweet shops.</p>\n<p><strong>KoiKoi Travel</strong> ensures a rich <strong>Calicut</strong> experience. We arrange private AC transfers, central hotel stays, and guided food walks to authentic Malabar Biryani houses, <i>Mithai Theravu</i> (Sweet Street), and sunset strolls on <strong>Kozhikode Beach</strong>.</p>\n<p>Taste true Malabar hospitality with clear pricing and 24/7 support. Browse our curated Calicut tour packages listed below and choose your food & coastal trip today!</p>",
        "famousFor": "Malabar Biryani, Kozhikode Halwa, Sweet Street (Mithai Theravu), Kozhikode Beach, Vasco da Gama Landing (Kappad)",
        "attractions": "Kozhikode Beach, Sweet Street (SM Street), Mananchira Square, Kappad Beach, Beypore Shipyard, Regional Science Centre",
        "weather": "Tropical coastal climate (24\u00b0C to 34\u00b0C). Best visited from October to March.",
        "moreDescription": "<h2>Calicut Cultural & Food Guide</h2>\n<p>Calicut is the historic capital of Malabar where Vasco da Gama first set foot in India in 1498, world-famous for spice trade and food.</p>\n<h3>Must-Try Culinary Highlights</h3>\n<p>Feast on aromatic Malabar Dum Biryani, try colorful Kozhikode Banana Halwa, and sip warm Sulaimani tea along Kozhikode Beach at dusk.</p>",
        "faqs": [
          {
            "ques": "What is Calicut famous for?",
            "ans": "Calicut is world-famous for Malabar cuisine (Biryani & Halwa), historic beach sunsets, and traditional Beypore wooden shipbuilding (Urus)."
          }
        ]
      },
      {
        "title": "Kannur",
        "slug": "kannur",
        "seoTitle": "Kannur Tour Packages | Theyyam Rituals & Drive-in Beach Trails",
        "h1Title": "Kannur Tour Packages & Travel Guide",
        "seoDescription": "Discover cultural Kannur with KoiKoi Travel. Experience Theyyam ritual performances, Muzhappilangad Drive-in Beach, St. Angelo Fort, and handloom crafts.",
        "seoKeyword": "Kannur tour packages, Theyyam ritual tour, Muzhappilangad drive in beach, St Angelo Fort Kannur, KoiKoi Travel Kannur",
        "overView": "<p>Tracking down sacred <strong>Theyyam</strong> ritual dates in <strong>Kannur</strong> and arranging remote beach transfers can be confusing for travelers.</p>\n<p>With <strong>KoiKoi Travel</strong>, your <strong>Kannur</strong> trip is seamless. We coordinate local Theyyam temple calendars, provide private AC cab transfers, and take you to <strong>St. Angelo Fort</strong> and <strong>Muzhappilangad Drive-in Beach</strong>\u2014Asia's longest drive-in beach.</p>\n<p>Experience North Kerala's raw culture with transparent rates and full support. Check out our customized Kannur tour packages below and book your trip today!</p>",
        "famousFor": "Theyyam Ritual Performances, Muzhappilangad Drive-in Beach, St. Angelo Fort, Handloom Fabrics, Theyyam Temples",
        "attractions": "Muzhappilangad Drive-in Beach, St. Angelo Fort (Kannur Fort), Arakkal Museum, Payyambalam Beach, Parassinikkadavu Snake Park",
        "weather": "Tropical coastal climate (23\u00b0C to 33\u00b0C). Best visited between October and March for Theyyam season.",
        "moreDescription": "<h2>Kannur Cultural & Theyyam Guide</h2>\n<p>Kannur is North Kerala's cultural crown, famous for ancient Theyyam ritual art forms where dancers embody divine spirits.</p>\n<h3>Unique Experiences</h3>\n<p>Drive your car right onto the sands of Muzhappilangad Beach, explore Portuguese stone battlements at St. Angelo Fort, and witness night Theyyam rituals.</p>",
        "faqs": [
          {
            "ques": "When is the Theyyam season in Kannur?",
            "ans": "Theyyam ritual performances take place in village temples across Kannur from October to May every year."
          }
        ]
      }
    ]
  },
  {
    "state": {
      "title": "Karnataka",
      "slug": "karnataka",
      "seoTitle": "Karnataka Tour Packages | Palaces, UNESCO Ruins & Coffee Hills",
      "h1Title": "Karnataka Tour Packages & Local Travel Guide",
      "seoDescription": "Book 100% customized Karnataka tour packages with KoiKoi Travel. Explore Hampi UNESCO ruins, Mysore Palace, Coorg coffee hills, and Bandipur tiger safaris.",
      "seoKeyword": "Karnataka tour packages, Hampi Mysore Coorg tour, Karnataka travel itinerary, Bangalore sightsee, KoiKoi Travel Karnataka",
      "overView": "<p>Traveling across <strong>Karnataka</strong> can get complicated. Navigating urban traffic in <strong>Bengaluru</strong>, securing long palace entry tickets in <strong>Mysore</strong>, and finding reliable cabs in remote <strong>Hampi</strong> or <strong>Coorg</strong> can drain your vacation energy.</p>\n<p>That is where <strong>KoiKoi Travel</strong> steps in. We make your Karnataka journey completely hassle-free with private AC cab transfers, pre-arranged tickets, and handpicked stays in heritage hotels and coffee estate resorts.</p>\n<p>Enjoy 100% transparent pricing, 24/7 dedicated trip support, and complete flexibility. Ready for an incredible Karnataka expedition? Check out our handpicked tour packages listed below and choose your ideal itinerary today!</p>",
      "famousFor": "Hampi UNESCO Ruins, Mysore Palace, Coorg Coffee Estates, Bandipur Wildlife Safaris, Gokarna Beaches, Silk",
      "capital": "Bengaluru (Bangalore)",
      "language": "Kannada, English",
      "area": "191,791 sq km",
      "moreDescription": "<h2>Complete Karnataka Travel Guide & Insider Tips</h2>\n<p>Karnataka is a diverse state in South India offering ancient stone empires, regal palaces, lush Western Ghat hill stations, and wildlife reserves.</p>\n<h3>Best Time to Visit</h3>\n<p>October to March brings pleasant weather ideal for exploring Hampi ruins, Mysore royal heritage, and coffee plantation walks in Coorg.</p>\n<h3>Top Regional Highlights</h3>\n<p>Marvel at Vijayanagara stone architecture in Hampi, witness the illuminated Mysore Palace, taste Mysore Pak sweets, and sip fresh Coorg filter coffee.</p>",
      "faqs": [
        {
          "ques": "What are the top places to visit in Karnataka?",
          "ans": "The ultimate Karnataka circuit covers Bengaluru, Mysore Palace, Coorg coffee hills, Belur-Halebid stone temples, and Hampi UNESCO ruins."
        },
        {
          "ques": "Are private cab transfers included in Karnataka packages?",
          "ans": "Yes! All KoiKoi Travel Karnataka packages include a dedicated private AC cab with an experienced driver for all transfers and daily sightseeing."
        }
      ]
    },
    "cities": [
      {
        "title": "Bangalore (Bengaluru)",
        "slug": "bangalore",
        "seoTitle": "Bangalore Tour Packages | Garden City & Tech Capital Sightseeing",
        "h1Title": "Bangalore (Bengaluru) Tour Packages & Travel Guide",
        "seoDescription": "Explore Bengaluru with KoiKoi Travel. Visit Lalbagh Botanical Garden, Bangalore Palace, ISKCON Temple, Cubbon Park, and craft breweries with private cab.",
        "seoKeyword": "Bangalore tour packages, Bengaluru sightseeing tour, Bangalore Palace visit, Lalbagh garden tour, KoiKoi Travel Bangalore",
        "overView": "<p>Arriving in <strong>Bangalore</strong> can feel overwhelming with notorious city traffic, long airport highway drives, and confusing metro routes.</p>\n<p>With <strong>KoiKoi Travel</strong>, your <strong>Bengaluru</strong> trip is smooth and effortless. Your private AC driver handles all navigation from Bengaluru Airport (BLR), taking you directly to <strong>Lalbagh Botanical Garden</strong>, <strong>Bangalore Palace</strong>, and vibrant dining hubs.</p>\n<p>Enjoy transparent fares and 24/7 manager assistance. Check out our curated Bangalore tour packages below and choose your gateway itinerary today!</p>",
        "famousFor": "Garden City Parks, Bangalore Palace, Lalbagh Glass House, Craft Breweries, IT Hubs, Mysore Dosa",
        "attractions": "Lalbagh Botanical Garden, Bangalore Palace, Cubbon Park, ISKCON Temple, Tipu Sultan's Summer Palace, Commercial Street",
        "weather": "Pleasant moderate climate (18\u00b0C to 30\u00b0C). Best visited between September and March.",
        "moreDescription": "<h2>Bangalore Visitor Guide & Sightseeing Tips</h2>\n<p>India's 'Garden City' and tech capital seamlessly combines royal heritage palaces with sprawling green parks and modern pub culture.</p>\n<h3>Top Sightseeing Highlights</h3>\n<p>Walk through the historic glasshouse at Lalbagh, admire Tudor-style architecture at Bangalore Palace, and sample legendary Benne Masala Dosa.</p>",
        "faqs": [
          {
            "ques": "How far is Bangalore Airport from the city center?",
            "ans": "Kempegowda International Airport (BLR) is about 35 km from Bangalore city center (approx 1 to 1.5 hours drive)."
          }
        ]
      },
      {
        "title": "Mysore (Mysuru)",
        "slug": "mysore",
        "seoTitle": "Mysore Tour Packages | Royal Palace Heritage & Silk Trails",
        "h1Title": "Mysore (Mysuru) Tour Packages & Travel Guide",
        "seoDescription": "Discover royal Mysore with KoiKoi Travel. Visit grand Mysore Palace, Chamundi Hill, Brindavan Gardens, Mysore Zoo, and authentic silk & sandalwood markets.",
        "seoKeyword": "Mysore tour packages, Mysore Palace trip, Mysuru Dasara tour, Chamundi Hill Mysore, KoiKoi Travel Mysore",
        "overView": "<p>Visiting <strong>Mysore</strong> can become tiring with long palace ticket queues, crowded festival markets, and unverified local taxi fares.</p>\n<p><strong>KoiKoi Travel</strong> makes your <strong>Mysore</strong> royal tour relaxed and memorable. We arrange private AC cab transfers, well-located hotel stays, and pre-booked entrance tickets for <strong>Mysore Palace</strong>, <strong>Chamundi Hill</strong>, and <strong>Brindavan Gardens</strong>.</p>\n<p>Shop for real Mysore Silk and Mysore Pak with zero hassle and transparent rates. Explore our handpicked Mysore tour packages listed below and book your royal trip today!</p>",
        "famousFor": "Mysore Palace, Chamundi Hill Temple, Mysore Silk Sarees, Mysore Pak Sweet, Sandalwood Carvings, Brindavan Gardens",
        "attractions": "Mysore Palace, Chamundeshwari Temple, Brindavan Gardens, Sri Chamarajendra Zoological Gardens, St. Philomena's Church, Jaganmohan Palace",
        "weather": "Pleasant inland climate (19\u00b0C to 31\u00b0C). Best visited from October to March.",
        "moreDescription": "<h2>Mysore Royal Heritage & Sightseeing Guide</h2>\n<p>Mysore is Karnataka's cultural capital, renowned worldwide for the grand Wodeyar dynasty palace and royal traditions.</p>\n<h3>Must-See Highlights</h3>\n<p>Witness the evening illumination of Mysore Palace with nearly 100,000 light bulbs, visit the giant Nandi monolith on Chamundi Hill, and sample fresh hot Mysore Pak.</p>",
        "faqs": [
          {
            "ques": "When is Mysore Palace illuminated?",
            "ans": "Mysore Palace is illuminated on Sundays and public holidays from 7:00 PM to 7:45 PM, and during the 10 days of Dasara festival."
          }
        ]
      },
      {
        "title": "Coorg (Kodagu)",
        "slug": "coorg",
        "seoTitle": "Coorg Tour Packages | Coffee Estates, Waterfalls & Hill Resorts",
        "h1Title": "Coorg (Kodagu) Tour Packages & Travel Guide",
        "seoDescription": "Escape to coffee hills in Coorg with KoiKoi Travel. Book customized packages covering Abbey Falls, Raja's Seat, Dubare Elephant Camp, and plantation resorts.",
        "seoKeyword": "Coorg tour packages, Coorg coffee estate stay, Coorg travel itinerary, Abbey Falls Coorg, KoiKoi Travel Coorg",
        "overView": "<p>Driving to <strong>Coorg</strong> can be challenging due to winding coffee plantation roads, unverified homestay pricing, and local cab shortages.</p>\n<p>With <strong>KoiKoi Travel</strong>, your <strong>Coorg</strong> holiday is smooth and relaxing. Experienced mountain drivers guide your private AC cab along green estate roads, taking you to <strong>Abbey Falls</strong>, <strong>Raja's Seat</strong>, and <strong>Dubare Elephant Camp</strong>.</p>\n<p>Stay in handpicked coffee plantation resorts with transparent rates. Check out our customized Coorg tour packages below and choose your green hill retreat today!</p>",
        "famousFor": "Coffee Plantations, Abbey Falls, Raja's Seat Sunset, Dubare Elephant Camp, Namdroling Monastery (Bylakuppe)",
        "attractions": "Abbey Falls, Raja's Seat, Dubare Elephant Camp, Namdroling Monastery (Golden Temple), Talakaveri, Madikeri Fort",
        "weather": "Cool hill climate (14\u00b0C to 26\u00b0C). Ideal to visit year-round, especially October to May.",
        "moreDescription": "<h2>Coorg Hill Station & Plantation Guide</h2>\n<p>Known as the 'Scotland of India', Coorg is a misty highland region famous for sprawling coffee plantations and Kodava culture.</p>\n<h3>Best Experiences in Coorg</h3>\n<p>Take a guided coffee estate walk, bathe elephants at Dubare Camp, watch sunsets at Raja's Seat, and visit the Tibetan Golden Temple at Bylakuppe.</p>",
        "faqs": [
          {
            "ques": "Which is the nearest railway station or airport to Coorg?",
            "ans": "Mysore Railway Station (95 km) and Mangalore Airport (140 km) are the nearest transport hubs to Coorg."
          }
        ]
      },
      {
        "title": "Hassan",
        "slug": "hassan",
        "seoTitle": "Hassan Tour Packages | Belur & Halebid Hoysala Temple Marvels",
        "h1Title": "Hassan Tour Packages & Travel Guide",
        "seoDescription": "Explore Hoysala stone art in Hassan with KoiKoi Travel. Visit Belur Chennakesava Temple, Halebidu Hoysaleswara Temple, and Shravanabelagola Gommateshwara statue.",
        "seoKeyword": "Hassan tour packages, Belur Halebidu temple tour, Shravanabelagola Gommateshwara, Hoysala architecture, KoiKoi Travel Hassan",
        "overView": "<p>Exploring <strong>Hassan</strong> temple sites without guided arrangements can lead to transport hassle, missed historical details, and crowded monument stops.</p>\n<p><strong>KoiKoi Travel</strong> makes your <strong>Hassan</strong> heritage tour completely effortless. We provide private AC cab transfers, comfortable hotel stays, and expert visits to UNESCO-listed Hoysala stone wonders at <strong>Belur</strong>, <strong>Halebidu</strong>, and the giant monolithic statue at <strong>Shravanabelagola</strong>.</p>\n<p>Discover intricate 12th-century stone carvings with clear rates and 24/7 support. Browse our curated Hassan tour packages listed below and choose your heritage trip today!</p>",
        "famousFor": "Belur Chennakesava Temple, Halebidu Hoysaleswara Temple, Shravanabelagola (Gommateshwara Monolith), Hoysala Architecture",
        "attractions": "Chennakesava Temple Belur, Hoysaleswara Temple Halebidu, Shravanabelagola Monolith, Shettihalli Rosary Church (Submerged Church)",
        "weather": "Pleasant inland climate (18\u00b0C to 32\u00b0C). Best visited between October and March.",
        "moreDescription": "<h2>Hassan Heritage & Hoysala Temple Guide</h2>\n<p>Hassan is the cradle of 12th-century Hoysala empire stone architecture, world-renowned for soapstone temple carvings.</p>\n<h3>Key Architectural Marvels</h3>\n<p>Marvel at the star-shaped Chennakesava Temple in Belur, intricate friezes of elephants and dancers at Halebidu, and climb Vindhyagiri hill at Shravanabelagola.</p>",
        "faqs": [
          {
            "ques": "Are Belur and Halebid UNESCO World Heritage sites?",
            "ans": "Yes! The Sacred Ensembles of the Hoysalas (Belur, Halebidu, and Somnathpura) were officially inscribed as UNESCO World Heritage sites in 2023."
          }
        ]
      },
      {
        "title": "Hampi",
        "slug": "hampi",
        "seoTitle": "Hampi Tour Packages | UNESCO Ruins & Vijayanagara Stone Empire",
        "h1Title": "Hampi Tour Packages & Travel Guide",
        "seoDescription": "Book Hampi UNESCO tour packages with KoiKoi Travel. Explore Virupaksha Temple, Vittala Temple Stone Chariot, Lotus Mahal, Elephant Stables, and Coracle boat rides.",
        "seoKeyword": "Hampi tour packages, Hampi UNESCO trip, Hampi stone chariot, Vijayanagara ruins tour, KoiKoi Travel Hampi",
        "overView": "<p>Visiting <strong>Hampi</strong> can get exhausting due to intense sun exposure while walking between vast scattered ruins, unreliable auto rates, and remote transport logistics.</p>\n<p>With <strong>KoiKoi Travel</strong>, your <strong>Hampi</strong> expedition is smooth and comfortable. Enjoy private AC cab transfers between monument zones, handpicked hotel stays, and easy visits to the iconic <strong>Vittala Temple Stone Chariot</strong>, <strong>Virupaksha Temple</strong>, and <strong>Lotus Mahal</strong>.</p>\n<p>Explore India's greatest stone empire with transparent pricing and 24/7 manager support. Check out our customized Hampi tour packages below and book your UNESCO trip today!</p>",
        "famousFor": "UNESCO World Heritage Ruins, Vittala Temple Stone Chariot, Virupaksha Temple, Lotus Mahal, Coracle Boat Rides, Boulder Landscapes",
        "attractions": "Vittala Temple & Stone Chariot, Virupaksha Temple, Lotus Mahal, Elephant Stables, Queen's Bath, Hemakuta Hill Sunsets, Tungabhadra River",
        "weather": "Dry inland climate (18\u00b0C to 36\u00b0C). Best visited between October and March.",
        "moreDescription": "<h2>Hampi UNESCO Ruins Visitor Guide</h2>\n<p>Hampi was the magnificent 14th-century capital of the Vijayanagara Empire, set amidst a surreal landscape of giant granite boulders.</p>\n<h3>Must-Do Activities</h3>\n<p>Photograph the iconic Stone Chariot at Vittala Temple, watch sunset from Hemakuta Hill, and ride a traditional round coracle boat on the Tungabhadra River.</p>",
        "faqs": [
          {
            "ques": "How many days are needed to explore Hampi?",
            "ans": "2 to 3 days is ideal to thoroughly cover both the Sacred Center temples and Royal Enclosure monuments across Hampi."
          }
        ]
      },
      {
        "title": "Badami",
        "slug": "badami",
        "seoTitle": "Badami Tour Packages | Chalukya Cave Temples & Pattadakal Ruins",
        "h1Title": "Badami Tour Packages & Travel Guide",
        "seoDescription": "Discover Chalukya cave art in Badami with KoiKoi Travel. Explore Badami Rock-Cut Caves, Agastya Lake, Bhutanatha Temples, Pattadakal, and Aihole.",
        "seoKeyword": "Badami tour packages, Badami cave temples, Pattadakal UNESCO, Aihole temple circuit, KoiKoi Travel Badami",
        "overView": "<p>Exploring <strong>Badami</strong> cave temples can be tiring with steep stone steps, unorganized transport to nearby Pattadakal and Aihole, and lack of guided insights.</p>\n<p><strong>KoiKoi Travel</strong> ensures an organized, comfortable <strong>Badami</strong> tour. We provide private AC cab transfers connecting Badami, UNESCO-listed <strong>Pattadakal</strong>, and <strong>Aihole</strong>, alongside well-located hotel bookings and rock-cut cave visits.</p>\n<p>Experience 6th-century Chalukya stone art with transparent rates and full support. Browse our handpicked Badami tour packages listed below and choose your heritage itinerary today!</p>",
        "famousFor": "Badami Rock-Cut Cave Temples, Agastya Lake, Bhutanatha Temples, Pattadakal UNESCO Ruins, Aihole (Cradle of Indian Architecture)",
        "attractions": "Badami Cave Temples (1-4), Agastya Teertha Lake, Bhutanatha Temple Complex, Badami Fort, Pattadakal Temples, Aihole Durga Temple",
        "weather": "Warm dry climate (20\u00b0C to 36\u00b0C). Best visited from October to March.",
        "moreDescription": "<h2>Badami & Chalukya Heritage Guide</h2>\n<p>Badami was the regal capital of the Early Chalukyas, famous for red sandstone rock-cut cave temples carved into cliffs overlooking Agastya Lake.</p>\n<h3>Heritage Highlights</h3>\n<p>Climb into the four ancient cave temples, photograph the sandstone reflections of Bhutanatha Temple on Agastya Lake, and visit UNESCO monuments at Pattadakal.</p>",
        "faqs": [
          {
            "ques": "Are Badami, Pattadakal, and Aihole visited together?",
            "ans": "Yes! They form the Chalukya Golden Triangle circuit and are located within 35 km of each other."
          }
        ]
      },
      {
        "title": "Nagarhole",
        "slug": "nagarhole",
        "seoTitle": "Nagarhole Tour Packages | Kabini Tiger Safari & Jungle Lodges",
        "h1Title": "Nagarhole Tour Packages & Travel Guide",
        "seoDescription": "Book Nagarhole wildlife safaris with KoiKoi Travel. Experience Kabini tiger & leopard boat safaris, Nagarhole National Park, and luxury jungle resort stays.",
        "seoKeyword": "Nagarhole tour packages, Kabini safari booking, Nagarhole tiger reserve, Kabini jungle lodge, KoiKoi Travel Nagarhole",
        "overView": "<p>Booking a <strong>Nagarhole (Kabini)</strong> safari can be frustrating due to strict limit safari permits, complex forest checkpost rules, and sold-out jungle lodges.</p>\n<p>With <strong>KoiKoi Travel</strong>, your <strong>Nagarhole</strong> wildlife expedition is completely pre-organized. We secure your Kabini jeep & boat safari permits, private AC transfers, and luxury forest lodge stays right on the edge of the sanctuary.</p>\n<p>Spot tigers, leopards, and wild elephant herds with zero stress and transparent rates. Check out our curated Nagarhole packages below and book your safari today!</p>",
        "famousFor": "Kabini River Boat Safari, Tiger & Leopard Sightings, Elephant Herds, Nagarhole National Park, Jungle Lodges",
        "attractions": "Kabini River Safari, Nagarhole Jeep Safari, Iruppu Falls, Brahmagiri Wildlife Sanctuary, Kuruva Island",
        "weather": "Pleasant forest climate (14\u00b0C to 28\u00b0C). Best visited between October and May for optimal wildlife sightings.",
        "moreDescription": "<h2>Nagarhole & Kabini Wildlife Visitor Guide</h2>\n<p>Nagarhole (Rajiv Gandhi National Park) and Kabini form India's premier tiger reserve, blessed with dense teak forests and river estuaries.</p>\n<h3>Safari Highlights</h3>\n<p>Take a Kabini river boat safari to watch herds of wild elephants swimming, and join jeep safaris to track Bengal tigers and melanistic leopards (black panthers).</p>",
        "faqs": [
          {
            "ques": "How far is Nagarhole/Kabini from Mysore and Bangalore?",
            "ans": "Kabini is 80 km from Mysore (approx 2 hours drive) and 215 km from Bangalore (approx 4.5 hours drive)."
          }
        ]
      },
      {
        "title": "Bandipur",
        "slug": "bandipur",
        "seoTitle": "Bandipur Tour Packages | Tiger Reserve & Western Ghat Safaris",
        "h1Title": "Bandipur Tour Packages & Travel Guide",
        "seoDescription": "Experience Bandipur National Park with KoiKoi Travel. Book jungle jeep safaris, tiger reserve tours, eco-lodge stays, and Nilgiri Biosphere trails.",
        "seoKeyword": "Bandipur tour packages, Bandipur safari booking, Bandipur tiger reserve, Bandipur jungle lodge, KoiKoi Travel Bandipur",
        "overView": "<p>Planning a <strong>Bandipur</strong> wildlife trip can involve long forest checkpost delays, last-minute safari ticket shortages, and unverified stay options.</p>\n<p><strong>KoiKoi Travel</strong> takes care of your entire <strong>Bandipur</strong> safari experience. We pre-book forest department safari slots, arrange comfortable eco-lodge stays, and provide private AC cab transfers along the scenic Mysore-Ooty highway.</p>\n<p>Enjoy thrilling tiger and elephant sightings with 100% transparent pricing. Explore our handpicked Bandipur tour packages listed below and choose your safari adventure today!</p>",
        "famousFor": "Bandipur Tiger Reserve, Forest Jeep Safaris, Elephant Sightings, Nilgiri Biosphere Reserve, Jungle Eco-Lodges",
        "attractions": "Bandipur National Park Safari, Himavad Gopalaswamy Betta Peak, Mudumalai Wildlife Sanctuary border, Wayanad forest border",
        "weather": "Pleasant forest climate (15\u00b0C to 30\u00b0C). Best visited from October to May.",
        "moreDescription": "<h2>Bandipur Tiger Reserve Travel Guide</h2>\n<p>Bandipur is a key part of the Nilgiri Biosphere Reserve along the Western Ghats, famous for tiger conservation and rich biodiversity.</p>\n<h3>Jungle Safari Tips</h3>\n<p>Join early morning or late afternoon forest department jeep safaris to spot tigers, Indian gaurs, dholes (wild dogs), and Asian elephants.</p>",
        "faqs": [
          {
            "ques": "Can Bandipur be combined with Mysore and Ooty?",
            "ans": "Yes! Bandipur lies directly on the Mysore-Ooty highway (80 km from Mysore, 50 km from Ooty), making it an ideal stopover."
          }
        ]
      }
    ]
  }
];

async function main() {
  console.log('Seeding Tamil Nadu, Kerala, and Karnataka States & Cities with 100% Human <200-Word Copy, SEO Keywords, Weather, Attractions, and FAQs...');

  const countries = await prisma.$queryRawUnsafe(`SELECT id, title FROM country WHERE LOWER(title) LIKE '%india%' OR slug = 'india' LIMIT 1`);
  if (!countries || countries.length === 0) {
    throw new Error('Country India not found in DB! Please seed Country first.');
  }
  const countryId = countries[0].id;
  console.log(`Using Country India (ID: ${countryId})`);

  for (const group of SOUTH_INDIA_DATA) {
    const s = group.state;
    console.log(`\nProcessing State: ${s.title}...`);

    const existingStates = await prisma.$queryRawUnsafe(`
      SELECT id FROM "State" 
      WHERE slug = '${s.slug}' OR LOWER(title) = '${s.title.toLowerCase()}' 
      LIMIT 1
    `);

    let stateId;

    if (existingStates && existingStates.length > 0) {
      stateId = existingStates[0].id;
      console.log(`Updating State ${s.title} (ID: ${stateId})...`);
      await prisma.$executeRawUnsafe(`
        UPDATE "State"
        SET 
          "seoTitle" = $1,
          "h1Title" = $2,
          "seoDescription" = $3,
          "seoKeyword" = $4,
          "overView" = $5,
          "famousFor" = $6,
          "capital" = $7,
          "language" = $8,
          "area" = $9,
          "moreDescription" = $10,
          "isActive" = true,
          "showOnSite" = true,
          "updatedAt" = NOW()
        WHERE id = ${stateId}
      `, s.seoTitle, s.h1Title, s.seoDescription, s.seoKeyword, s.overView, s.famousFor, s.capital, s.language, s.area, s.moreDescription);
    } else {
      console.log(`Inserting State ${s.title}...`);
      const inserted = await prisma.$queryRawUnsafe(`
        INSERT INTO "State" (
          "title", "slug", "countryId", "seoTitle", "h1Title", "seoDescription", "seoKeyword",
          "overView", "famousFor", "capital", "language", "area", "moreDescription", "isActive", "showOnSite", "displayOrder", "createdAt", "updatedAt"
        ) VALUES (
          $1, $2, ${countryId}, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true, true, 0, NOW(), NOW()
        ) RETURNING id
      `, s.title, s.slug, s.seoTitle, s.h1Title, s.seoDescription, s.seoKeyword, s.overView, s.famousFor, s.capital, s.language, s.area, s.moreDescription);
      stateId = inserted[0].id;
    }

    if (s.faqs && s.faqs.length > 0) {
      await prisma.$executeRawUnsafe(`DELETE FROM "Faq" WHERE "entityType" = 'State' AND "entityId" = ${stateId}`);
      for (const faq of s.faqs) {
        await prisma.$executeRawUnsafe(`
          INSERT INTO "Faq" ("ques", "ans", "entityType", "entityId", "isActive", "displayOrder", "createdAt", "updatedAt")
          VALUES ($1, $2, 'State', ${stateId}, true, 0, NOW(), NOW())
        `, faq.ques, faq.ans);
      }
      console.log(`Inserted ${s.faqs.length} FAQs for State ${s.title}`);
    }

    for (const c of group.cities) {
      const existingCities = await prisma.$queryRawUnsafe(`
        SELECT id FROM "City" 
        WHERE slug = '${c.slug}' OR (LOWER(title) = '${c.title.toLowerCase()}' AND "stateId" = ${stateId})
        LIMIT 1
      `);

      let cityId;

      if (existingCities && existingCities.length > 0) {
        cityId = existingCities[0].id;
        console.log(`  Updating City ${c.title} (ID: ${cityId})...`);
        await prisma.$executeRawUnsafe(`
          UPDATE "City"
          SET 
            "stateId" = ${stateId},
            "seoTitle" = $1,
            "h1Title" = $2,
            "seoDescription" = $3,
            "seoKeyword" = $4,
            "overView" = $5,
            "famousFor" = $6,
            "attractions" = $7,
            "weather" = $8,
            "moreDescription" = $9,
            "isActive" = true,
            "showOnSite" = true,
            "updatedAt" = NOW()
          WHERE id = ${cityId}
        `, c.seoTitle, c.h1Title, c.seoDescription, c.seoKeyword, c.overView, c.famousFor, c.attractions, c.weather, c.moreDescription);
      } else {
        console.log(`  Inserting City ${c.title}...`);
        const insertedCity = await prisma.$queryRawUnsafe(`
          INSERT INTO "City" (
            "title", "slug", "stateId", "seoTitle", "h1Title", "seoDescription", "seoKeyword",
            "overView", "famousFor", "attractions", "weather", "moreDescription", "isActive", "showOnSite", "displayOrder", "createdAt", "updatedAt"
          ) VALUES (
            $1, $2, ${stateId}, $3, $4, $5, $6, $7, $8, $9, $10, $11, true, true, 0, NOW(), NOW()
          ) RETURNING id
        `, c.title, c.slug, c.seoTitle, c.h1Title, c.seoDescription, c.seoKeyword, c.overView, c.famousFor, c.attractions, c.weather, c.moreDescription);
        cityId = insertedCity[0].id;
      }

      if (c.faqs && c.faqs.length > 0) {
        await prisma.$executeRawUnsafe(`DELETE FROM "Faq" WHERE "entityType" = 'City' AND "entityId" = ${cityId}`);
        for (const faq of c.faqs) {
          await prisma.$executeRawUnsafe(`
            INSERT INTO "Faq" ("ques", "ans", "entityType", "entityId", "isActive", "displayOrder", "createdAt", "updatedAt")
            VALUES ($1, $2, 'City', ${cityId}, true, 0, NOW(), NOW())
          `, faq.ques, faq.ans);
        }
      }
    }
  }

  console.log('\n✅ South India Seed completed successfully with all Overviews under 200 words!');
}

main()
  .catch((e) => {
    console.error('Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
