import { prisma } from './utils/prismaConnection.js';

const SOUTH_INDIA_DATA = [
  {
    state: {
      title: 'Tamil Nadu',
      slug: 'tamil-nadu',
      seoTitle: 'Tamil Nadu Tour Packages | Temples, Hill Stations & Heritage',
      h1Title: 'Tamil Nadu Tour Packages & Travel Guide',
      seoDescription: 'Explore Tamil Nadu tour packages featuring Dravidian temple architecture in Madurai, French streets in Pondicherry, tea estates in Ooty, and Mahabalipuram shore temples.',
      overView: 'Tamil Nadu is India\'s supreme cultural kingdom where ancient Dravidian architecture meets misty Nilgiri hill stations and serene coastal sanctuaries. From the towering gopurams of Madurai Meenakshi Temple and UNESCO World Heritage Monuments of Mahabalipuram to the sprawling tea gardens of Ooty and Coonoor, Tamil Nadu offers an incredibly diverse and rich travel experience. Let KoiKoi Travel curate your ideal Tamil Nadu itinerary with private AC cab transfers, handpicked heritage hotels, and expert local guides.',
      famousFor: 'Dravidian Temples, UNESCO World Heritage Monuments, Nilgiri Hill Stations, Silk Sarees, Authentic South Indian Cuisine',
      bannerTitle: 'Explore Ancient Tamil Nadu',
      bannerTag: 'Temple & Heritage Kingdom'
    },
    cities: [
      {
        title: 'Chennai',
        slug: 'chennai',
        seoTitle: 'Chennai Tour Packages | Capital of South Indian Culture',
        h1Title: 'Chennai Tour Packages & Local Sightseeing',
        seoDescription: 'Book Chennai tour packages with KoiKoi Travel. Discover Kapaleeshwarar Temple, Marina Beach, Fort St. George, and South Indian filter coffee halts.',
        overView: 'Chennai, the vibrant gateway to South India, seamlessly blends deep-rooted Carnatic traditions with modern coastal energy. Explore the majestic Kapaleeshwarar Temple, stroll along Marina Beach—one of the world\'s longest urban beaches—and sample authentic filter coffee and crispy dosas in Mylapore.',
        famousFor: 'Marina Beach, Kapaleeshwarar Temple, Fort St. George, Mylapore Filter Coffee, Silk Shopping'
      },
      {
        title: 'Mahabalipuram',
        slug: 'mahabalipuram',
        seoTitle: 'Mahabalipuram Tour Packages | UNESCO Shore Temples & Rock Carvings',
        h1Title: 'Mahabalipuram Coastal Heritage Tours',
        seoDescription: 'Discover UNESCO World Heritage Mahabalipuram tour packages. Visit Shore Temple, Five Rathas, Arjuna\'s Penance, and pristine coastal beaches.',
        overView: 'Mahabalipuram (Mamallapuram) is an open-air museum of magnificent 7th-century Pallava rock-cut architecture perched beside the Bay of Bengal. Witness the iconic Shore Temple, monolithic Five Rathas, and Arjuna\'s Penance while enjoying fresh seafood and sea breezes.',
        famousFor: 'Shore Temple, Pancha Rathas, Arjuna\'s Penance, Krishna\'s Butterball, Beach Resorts'
      },
      {
        title: 'Madurai',
        slug: 'madurai',
        seoTitle: 'Madurai Tour Packages | Meenakshi Amman Temple & Heritage Trails',
        h1Title: 'Madurai Cultural & Temple Tours',
        seoDescription: 'Book Madurai tour packages featuring Meenakshi Amman Temple, Thirumalai Nayakkar Palace, night ceremony rituals, and authentic Jigarthanda.',
        overView: 'Madurai is one of the world\'s oldest continuously inhabited cities, centered around the awe-inspiring Meenakshi Amman Temple. Experience the vibrant night procession, grand Nayakar palace architecture, and world-famous street food halts.',
        famousFor: 'Meenakshi Amman Temple, Thirumalai Nayakkar Palace, Street Food, Famous Jigarthanda, Cotton Sarees'
      },
      {
        title: 'Tanjore',
        slug: 'tanjore',
        seoTitle: 'Tanjore (Thanjavur) Tour Packages | Great Living Chola Temples',
        h1Title: 'Thanjavur Chola Heritage & Art Tours',
        seoDescription: 'Explore Tanjore tour packages featuring UNESCO Brihadeeswarar Temple, Tanjore paintings, Royal Palace Museum, and Chola bronze art.',
        overView: 'Thanjavur (Tanjore) is the historic cradle of Chola dynasty grandeur, home to the magnificent 1,000-year-old Brihadeeswarar Temple (Big Temple). Discover royal palace galleries, ancient bronze casting, and traditional gold-leaf Tanjore paintings.',
        famousFor: 'Brihadeeswarar Temple, Tanjore Gold Paintings, Chola Bronzes, Thanjavur Royal Palace'
      },
      {
        title: 'Trichy',
        slug: 'trichy',
        seoTitle: 'Trichy (Tiruchirappalli) Tour Packages | Rockfort & Srirangam Temple',
        h1Title: 'Trichy Heritage & Temple Expeditions',
        seoDescription: 'Book Trichy tour packages with KoiKoi Travel. Visit Rockfort Ucchi Pillayar Temple, Sri Ranganathaswamy Temple at Srirangam, and Kaveri River banks.',
        overView: 'Tiruchirappalli (Trichy) is famous for its dramatic Rockfort Temple perched atop a 273-foot ancient rock formation, and Srirangam—the world\'s largest functioning Hindu temple complex situated on an island in the Kaveri River.',
        famousFor: 'Rockfort Ucchi Pillayar Temple, Sri Ranganathaswamy Temple, Srirangam Island, Kaveri River Views'
      },
      {
        title: 'Kodaikanal',
        slug: 'kodaikanal',
        seoTitle: 'Kodaikanal Tour Packages | Princess of Hill Stations',
        h1Title: 'Kodaikanal Nature & Honeymoon Escapes',
        seoDescription: 'Book Kodaikanal hill station tour packages. Enjoy Kodai Lake boating, Coaker\'s Walk, Pillar Rocks, Bryant Park, and misty pine forest walks.',
        overView: 'Nestled in the Palani Hills, Kodaikanal is the "Princess of Hill Stations," celebrated for its star-shaped central lake, dense pine forests, rolling hills, and cool mist. Ideal for couples, families, and nature lovers seeking mountain tranquility.',
        famousFor: 'Kodai Lake Boating, Coaker\'s Walk, Pillar Rocks, Pine Forests, Homemade Chocolates'
      },
      {
        title: 'Ooty',
        slug: 'ooty',
        seoTitle: 'Ooty Tour Packages | Queen of Hill Stations & Nilgiri Toy Train',
        h1Title: 'Ooty Hill Station & Toy Train Packages',
        seoDescription: 'Discover Ooty tour packages with KoiKoi Travel. Ride UNESCO Nilgiri Mountain Railway, visit Ooty Botanical Gardens, Doddabetta Peak, and tea estates.',
        overView: 'Ooty (Udhagamandalam) is South India\'s most celebrated hill station, featuring lush tea plantations, colonial bungalows, and the iconic UNESCO heritage Nilgiri Mountain Toy Train ride through green valleys and tunnels.',
        famousFor: 'UNESCO Toy Train Ride, Ooty Lake, Botanical Garden, Doddabetta Peak, Tea Factory Tours'
      },
      {
        title: 'Coonoor',
        slug: 'coonoor',
        seoTitle: 'Coonoor Tour Packages | Tea Estates, Sim\'s Park & Nilgiri Views',
        h1Title: 'Coonoor Quiet Tea Garden Holidays',
        seoDescription: 'Book Coonoor tour packages featuring Sim\'s Park, Highfield Tea Factory, Dolphin\'s Nose viewpoint, and scenic Nilgiri toy train rides.',
        overView: 'Coonoor is a serene, tranquil hill station situated just 20 km from Ooty, renowned for panoramic tea garden vistas, wild orchids at Sim\'s Park, and breath-taking gorge views from Dolphin\'s Nose.',
        famousFor: 'Sim\'s Park, Highfield Tea Estate, Dolphin\'s Nose Viewpoint, Lamb\'s Rock'
      },
      {
        title: 'Rameshwaram',
        slug: 'rameshwaram',
        seoTitle: 'Rameshwaram Tour Packages | Ramanathaswamy Temple & Pamban Bridge',
        h1Title: 'Rameshwaram Pilgrimage & Coastal Expeditions',
        seoDescription: 'Explore Rameshwaram tour packages. Visit Ramanathaswamy Temple 22 Holy Wells, Dhanushkodi ghost town, Pamban Sea Bridge, and APJ Abdul Kalam Memorial.',
        overView: 'Rameshwaram is a holy island pilgrimage destination linked to mainland India by the engineering marvel Pamban Bridge. Experience the magnificent 1,000-pillar corridors of Ramanathaswamy Temple and the mystical ruins of Dhanushkodi.',
        famousFor: 'Ramanathaswamy Temple 22 Wells, Pamban Sea Bridge, Dhanushkodi Ghost Town, APJ Kalam Memorial'
      },
      {
        title: 'Kanchipuram',
        slug: 'kanchipuram',
        seoTitle: 'Kanchipuram Tour Packages | City of 1,000 Temples & Kanjeevaram Silk',
        h1Title: 'Kanchipuram Heritage & Silk Weaving Tours',
        seoDescription: 'Book Kanchipuram tour packages featuring Ekambareswarar Temple, Kailasanathar Temple, Varadharaja Perumal Temple, and authentic silk saree weaving.',
        overView: 'Kanchipuram is the ancient "City of 1,000 Temples" and the world capital of handwoven Kanjeevaram silk sarees. Marvel at classic Pallava and Chola stone architecture and witness master weavers at work.',
        famousFor: 'Kanjeevaram Silk Sarees, Ekambareswarar Temple, Kailasanathar Temple, Varadharaja Temple'
      }
    ]
  },
  {
    state: {
      title: 'Kerala',
      slug: 'kerala',
      seoTitle: 'Kerala Tour Packages | Backwaters, Tea Gardens & Ayurveda',
      h1Title: 'Kerala Tour Packages (God\'s Own Country)',
      seoDescription: 'Book Kerala tour packages with KoiKoi Travel. Enjoy deluxe houseboat cruises in Alleppey, tea plantations in Munnar, tiger wildlife safaris in Periyar, and beaches in Kovalam.',
      overView: 'Kerala, rightfully crowned "God\'s Own Country," is a tropical paradise of emerald backwaters, mist-shrouded tea mountains, wild elephant sanctuaries, and authentic Ayurvedic wellness resorts. Cruise through tranquil coconut lagoons on a private houseboat in Alleppey, trek through spice plantations in Munnar and Thekkady, and indulge in traditional seafood delicacies. Let KoiKoi Travel design your dream Kerala itinerary with private AC cabs, handpicked luxury resorts, and 24/7 dedicated support.',
      famousFor: 'Alleppey Deluxe Houseboats, Munnar Tea Gardens, Periyar Wildlife Safaris, Ayurvedic Rejuvenation, Kathakali Dance Shows',
      bannerTitle: 'Welcome to God\'s Own Country',
      bannerTag: 'Backwaters, Hills & Beaches'
    },
    cities: [
      {
        title: 'Cochin',
        slug: 'cochin',
        seoTitle: 'Cochin (Kochi) Tour Packages | Chinese Fishing Nets & Heritage Forts',
        h1Title: 'Cochin Heritage & Gateway Tours',
        seoDescription: 'Book Cochin tour packages with KoiKoi Travel. Discover Fort Kochi, Chinese Fishing Nets, Mattancherry Palace, Jewish Synagogue, and Kathakali shows.',
        overView: 'Cochin (Kochi) is the vibrant commercial gateway to Kerala, renowned for its centuries-old port, iconic Chinese Fishing Nets, colonial Portuguese and Dutch architecture in Fort Kochi, and aromatic spice trading streets of Mattancherry.',
        famousFor: 'Chinese Fishing Nets, Fort Kochi Heritage Walk, Mattancherry Spice Market, St. Francis Church, Kathakali Shows'
      },
      {
        title: 'Munnar',
        slug: 'munnar',
        seoTitle: 'Munnar Tour Packages | Tea Plantations, Waterfalls & Anamudi Peak',
        h1Title: 'Munnar Tea Garden & Honeymoon Escapes',
        seoDescription: 'Book Munnar tour packages. Explore endless tea plantations, Eravikulam National Park (Nilgiri Tahr), Mattupetty Dam, Cheeyappara Waterfalls, and tea museums.',
        overView: 'Munnar is South India\'s premier hill station, located 1,600 meters above sea level amidst vast manicured tea plantations, misty valleys, exotic flora, and roaring waterfalls. Home to the endangered Nilgiri Tahr at Eravikulam National Park.',
        famousFor: 'Tea Plantation Gardens, Eravikulam National Park, Cheeyappara & Valara Waterfalls, Mattupetty Dam, Tea Museum'
      },
      {
        title: 'Thekkady',
        slug: 'thekkady',
        seoTitle: 'Thekkady (Periyar) Tour Packages | Wildlife Safari & Spice Gardens',
        h1Title: 'Thekkady Wildlife & Spice Plantation Tours',
        seoDescription: 'Discover Thekkady (Periyar) tour packages. Enjoy Periyar Lake jungle boat safari, elephant rides, spice plantation tours, and Kalaripayattu shows.',
        overView: 'Thekkady is India\'s premier spice garden hub and home to the renowned Periyar National Park & Tiger Reserve. Experience a scenic boat safari on Lake Periyar to spot wild elephants, gaurs, and rare birds, followed by guided spice tours.',
        famousFor: 'Periyar Lake Boat Safari, Elephant Rides & Bathing, Spice Plantation Walks, Martial Arts Shows'
      },
      {
        title: 'Kumarakom',
        slug: 'kumarakom',
        seoTitle: 'Kumarakom Tour Packages | Vembanad Lake & Luxury Backwater Resorts',
        h1Title: 'Kumarakom Backwater & Bird Sanctuary Packages',
        seoDescription: 'Book Kumarakom tour packages with KoiKoi Travel. Relax at luxury resorts on Vembanad Lake, visit Kumarakom Bird Sanctuary, and enjoy sunset cruises.',
        overView: 'Kumarakom is a cluster of scenic islands on Vembanad Lake—Kerala\'s largest fresh-water lake. Famous for luxury lakefront resorts, birdwatching sanctuaries, and tranquil backwater village life.',
        famousFor: 'Vembanad Lake Sunset Cruises, Kumarakom Bird Sanctuary, Luxury Waterfront Resorts, Shikara Rides'
      },
      {
        title: 'Alleppey',
        slug: 'alleppey',
        seoTitle: 'Alleppey Tour Packages | Deluxe Houseboat Cruises & Backwaters',
        h1Title: 'Alleppey Backwater & Houseboat Experience',
        seoDescription: 'Book Alleppey (Alappuzha) tour packages with KoiKoi Travel. Overnight deluxe houseboat stay with freshly cooked meals, canal cruises, and beach sunsets.',
        overView: 'Alleppey (Alappuzha), known as the "Venice of the East," is world-famous for its network of tranquil backwater canals, paddy fields, and traditional luxury houseboats (Kettuvallam) offering authentic Keralite cuisine on board.',
        famousFor: 'Overnight Houseboat Stay, Backwater Canal Cruise, Marari Beach, Toddy Shop Delicacies, Nehru Trophy Boat Race'
      },
      {
        title: 'Wayanad',
        slug: 'wayanad',
        seoTitle: 'Wayanad Tour Packages | Rainforests, Edakkal Caves & Waterfalls',
        h1Title: 'Wayanad Rainforest & Wildlife Expeditions',
        seoDescription: 'Explore Wayanad tour packages. Visit Edakkal Caves prehistoric carvings, Banasura Sagar Dam, Chembra Peak heart lake, and wildlife sanctuaries.',
        overView: 'Wayanad is a lush, green high-altitude haven in North Kerala featuring pristine rainforests, spice plantations, prehistoric cave art at Edakkal Caves, India\'s largest earth dam (Banasura Sagar), and wild elephant herds.',
        famousFor: 'Edakkal Caves, Banasura Sagar Earth Dam, Chembra Peak Heart Lake, Treehouses, Spice Plantations'
      },
      {
        title: 'Bekal',
        slug: 'bekal',
        seoTitle: 'Bekal Tour Packages | Historic Keyhole Fort & Unspoiled Beaches',
        h1Title: 'Bekal Luxury Coastal Escapes',
        seoDescription: 'Book Bekal tour packages featuring 300-year-old Bekal Fort overlooking Arabian Sea, luxury beach resorts, and pristine golden sand coastlines.',
        overView: 'Bekal is a tranquil coastal jewel in Northern Kerala, renowned for the majestic 300-year-old keyhole-shaped Bekal Fort overlooking the Arabian Sea, backwater estuary walks, and luxury beachside resorts.',
        famousFor: 'Bekal Fort, Bekal Beach Park, Estuary Views, Taj Bekal Luxury Resort'
      },
      {
        title: 'Calicut',
        slug: 'calicut',
        seoTitle: 'Calicut (Kozhikode) Tour Packages | Spice Coast & Malabar Food',
        h1Title: 'Calicut Cultural & Malabar Culinary Tours',
        seoDescription: 'Book Calicut (Kozhikode) tour packages with KoiKoi Travel. Visit Kappad Beach (Vasco da Gama landing site), Sweet Street (SM Street), and sample legendary Kozhikode Biryani.',
        overView: 'Calicut (Kozhikode) is the historic City of Spices where Vasco da Gama first set foot in India in 1498. Famous for historical Kappad Beach, lively SM Street halwa markets, and legendary Malabar cuisine.',
        famousFor: 'Kappad Beach, Kozhikode Halwa & Biryani, SM Street Market, Beypore Shipyards'
      },
      {
        title: 'Kannur',
        slug: 'kannur',
        seoTitle: 'Kannur Tour Packages | Theyyam Rituals & Drive-in Beaches',
        h1Title: 'Kannur Theyyam Ritual & Beach Tours',
        seoDescription: 'Discover Kannur tour packages. Experience mystical Theyyam ritual performances, Muzhappilangad Drive-in Beach, and St. Angelo Fort.',
        overView: 'Kannur is the land of Theyyam—a centuries-old mystical ritual dance performance. Home to Asia\'s longest drive-in beach at Muzhappilangad and historic sea-facing St. Angelo Fort.',
        famousFor: 'Theyyam Ritual Performance, Muzhappilangad Drive-in Beach, St. Angelo Fort, Handloom Weaving'
      }
    ]
  },
  {
    state: {
      title: 'Karnataka',
      slug: 'karnataka',
      seoTitle: 'Karnataka Tour Packages | Palaces, Ruins, Coffee & Wildlife',
      h1Title: 'Karnataka Tour Packages & Heritage Circuits',
      seoDescription: 'Book Karnataka tour packages with KoiKoi Travel. Discover Mysore Palace, UNESCO Hampi ruins, Coorg coffee plantations, Bandipur tiger safaris, and Silicon Valley Bangalore.',
      overView: 'Karnataka is a captivating realm of architectural marvels, misty coffee hills, royal palaces, and dense tiger forests. From the opulent illumination of Mysore Palace and the breathtaking stone ruins of UNESCO-listed Hampi to the lush coffee estates of Coorg and wildlife safaris in Bandipur, Karnataka delivers an extraordinary travel journey. Let KoiKoi Travel design your custom Karnataka tour with private AC cab transfers and handpicked heritage stays.',
      famousFor: 'Mysore Palace Illumination, UNESCO Hampi Ruins, Coorg Coffee Estates, Bandipur & Nagarhole Safaris, Silicon Valley Bangalore',
      bannerTitle: 'One State, Many Worlds',
      bannerTag: 'Palaces, Ruins & Coffee Hills'
    },
    cities: [
      {
        title: 'Bangalore',
        slug: 'bangalore',
        seoTitle: 'Bangalore (Bengaluru) Tour Packages | Garden City & Tech Hub',
        h1Title: 'Bangalore City Sightseeing & Tech Capital Tours',
        seoDescription: 'Book Bangalore tour packages with KoiKoi Travel. Visit Lalbagh Botanical Garden, Bangalore Palace, ISKCON Temple, Cubbon Park, and craft breweries.',
        overView: 'Bangalore (Bengaluru), India\'s "Silicon Valley" and "Garden City," is famed for pleasant year-round weather, sprawling botanical parks, royal Tudor-style palaces, and vibrant craft brewing culture.',
        famousFor: 'Lalbagh Botanical Garden, Bangalore Palace, Cubbon Park, Craft Breweries, Vidhana Soudha'
      },
      {
        title: 'Mysore',
        slug: 'mysore',
        seoTitle: 'Mysore (Mysuru) Tour Packages | Royal Palace & Chamundi Hill',
        h1Title: 'Mysore Royal Heritage & Palace Tours',
        seoDescription: 'Explore Mysore tour packages. Visit Mysore Palace, Chamundeshwari Temple, Brindavan Gardens, Devaraja Market, and silk weaving centers.',
        overView: 'Mysore (Mysuru) is the undisputed Royal City of Karnataka, world-renowned for the magnificent illuminated Mysore Palace, aromatic sandalwood, Mysore Pak sweet, intricate silk sarees, and Chamundi Hill vistas.',
        famousFor: 'Mysore Palace, Chamundi Hill Temple, Brindavan Gardens Fountains, Mysore Silk & Sandalwood'
      },
      {
        title: 'Coorg',
        slug: 'coorg',
        seoTitle: 'Coorg (Kodagu) Tour Packages | Coffee Plantations & Waterfalls',
        h1Title: 'Coorg Coffee Garden & Nature Escapes',
        seoDescription: 'Book Coorg (Kodagu) hill station tour packages. Experience coffee plantation stays, Abbey Falls, Dubare Elephant Camp, Raja\'s Seat, and Namdroling Monastery.',
        overView: 'Coorg (Kodagu), known as the "Scotland of India," is a breathtaking hill station draped in green coffee plantations, spice gardens, misty waterfalls, and Kodava warrior culture.',
        famousFor: 'Coffee Plantation Stays, Abbey Falls, Dubare Elephant Camp, Raja\'s Seat Sunset, Golden Temple Monastery'
      },
      {
        title: 'Hassan',
        slug: 'hassan',
        seoTitle: 'Hassan Tour Packages | Belur & Halebidu Hoysala Temple Marvels',
        h1Title: 'Hassan Hoysala Architecture & Heritage Tours',
        seoDescription: 'Discover Hassan tour packages. Visit Belur Chennakesava Temple, Halebidu Hoysaleswara Temple, and Shravanabelagola Bahubali Statue.',
        overView: 'Hassan is the architectural heartland of the Hoysala dynasty, famous for the mesmerizing intricate stone carving marvels of Belur and Halebidu, and the towering 57-foot monolithic Bahubali statue at Shravanabelagola.',
        famousFor: 'Belur Chennakesava Temple, Halebidu Sculptures, Shravanabelagola Monolith, Hoysala Architecture'
      },
      {
        title: 'Hampi',
        slug: 'hampi',
        seoTitle: 'Hampi Tour Packages | UNESCO Vijayanagara Ruins & Stone Chariot',
        h1Title: 'Hampi UNESCO World Heritage Ruins Expeditions',
        seoDescription: 'Book Hampi tour packages with KoiKoi Travel. Explore Virupaksha Temple, Stone Chariot at Vittala Temple, Lotus Mahal, Elephant Stables, and Coracle boat rides.',
        overView: 'Hampi is a surreal UNESCO World Heritage boulder landscape scattered with the magnificent 14th-century ruins of the Vijayanagara Empire. Marvel at the musical pillars of Vittala Temple, the iconic Stone Chariot, and coracle rides on the Tungabhadra River.',
        famousFor: 'UNESCO Vijayanagara Ruins, Stone Chariot, Virupaksha Temple, Coracle River Boat Rides, Sunset at Hemakuta Hill'
      },
      {
        title: 'Badami',
        slug: 'badami',
        seoTitle: 'Badami Tour Packages | Chalukya Rock-Cut Cave Temples & Agastya Lake',
        h1Title: 'Badami Cave Temple & Rock-Cut Art Tours',
        seoDescription: 'Book Badami tour packages featuring 6th-century Chalukya rock-cut cave temples, Badami Fort, Agastya Lake, Pattadakal, and Aihole.',
        overView: 'Badami, formerly Vatapi, was the regal capital of the early Chalukyas, famous for four ancient red sandstone rock-cut cave temples overlooking Agastya Lake, as well as nearby UNESCO ruins of Pattadakal and Aihole.',
        famousFor: 'Chalukya Rock-Cut Caves, Agastya Lake Views, Badami Red Sandstone Fort, Pattadakal & Aihole Temples'
      },
      {
        title: 'Nagarhole',
        slug: 'nagarhole',
        seoTitle: 'Nagarhole Tour Packages | Kabini Tiger & Black Panther Jungle Safaris',
        h1Title: 'Nagarhole & Kabini Wildlife Safaris',
        seoDescription: 'Book Nagarhole (Kabini) wildlife safari packages. Experience tiger safaris, leopard and black panther tracking, and Kabini River boat safaris.',
        overView: 'Nagarhole National Park (Rajiv Gandhi National Park), situated along the pristine Kabini River, is one of Asia\'s premier wildlife sanctuaries, famous for high tiger density, wild elephant herds, and rare black panther sightings.',
        famousFor: 'Kabini River Boat Safari, Tiger Tracking, Black Panther Sightings, Elephant Herds, Eco Lodges'
      },
      {
        title: 'Bandipur',
        slug: 'bandipur',
        seoTitle: 'Bandipur Tour Packages | Tiger Reserve & Nilgiri Biosphere Safaris',
        h1Title: 'Bandipur National Park Wildlife Tours',
        seoDescription: 'Explore Bandipur National Park tour packages. Jeep jungle safaris, tiger and leopard tracking, Indian gaur sightings, and jungle resort stays.',
        overView: 'Bandipur National Park, located at the foothills of the Nilgiris along the Mysore-Ooty highway, is a core part of the Nilgiri Biosphere Reserve, renowned for open-jeep tiger safaris, wild elephant herds, and rich avifauna.',
        famousFor: 'Open Jeep Tiger Safaris, Nilgiri Biosphere Reserve, Wild Elephants, Gaurs, Jungle Resorts'
      }
    ]
  }
];

async function main() {
  console.log('Seeding Tamil Nadu, Kerala, and Karnataka States & Cities (Clearing images so user can upload custom images from Dashboard)...\n');

  // 1. Ensure Country India exists
  const countries = await prisma.$queryRawUnsafe(`SELECT id, title, slug FROM country WHERE LOWER(title) LIKE '%india%' OR slug = 'india' LIMIT 1`);
  let countryId;
  if (countries && countries.length > 0) {
    countryId = countries[0].id;
    console.log('Using Country: India (ID:', countryId, ')');
  } else {
    const newCountry = await prisma.$queryRawUnsafe(`INSERT INTO country (title, slug, "seoDescription", "overView", "isActive", "showOnSite", "displayOrder") VALUES ('India', 'india', 'Explore India tour packages with KoiKoi Travel', 'Welcome to India', true, true, 0) RETURNING id`);
    countryId = newCountry[0].id;
    console.log('Created Country: India (ID:', countryId, ')');
  }

  for (const block of SOUTH_INDIA_DATA) {
    const sData = block.state;

    // Check or Insert State
    let existingState = await prisma.$queryRawUnsafe(`SELECT id, title FROM "State" WHERE slug = '${sData.slug}' OR LOWER(title) = '${sData.title.toLowerCase()}' LIMIT 1`);
    let stateId;

    if (existingState && existingState.length > 0) {
      stateId = existingState[0].id;
      console.log(`\nFound State: ${sData.title} (ID: ${stateId})`);
      await prisma.$executeRawUnsafe(`
        UPDATE "State"
        SET "seoTitle" = '${sData.seoTitle.replace(/'/g, "''")}',
            "h1Title" = '${sData.h1Title.replace(/'/g, "''")}',
            "seoDescription" = '${sData.seoDescription.replace(/'/g, "''")}',
            "overView" = '${sData.overView.replace(/'/g, "''")}',
            "famousFor" = '${sData.famousFor.replace(/'/g, "''")}',
            "thumbImg" = NULL,
            "isActive" = true,
            "showOnSite" = true
        WHERE id = ${stateId}
      `);
    } else {
      const newState = await prisma.$queryRawUnsafe(`
        INSERT INTO "State" (title, slug, "countryId", "seoTitle", "h1Title", "seoDescription", "overView", "famousFor", "thumbImg", "isActive", "showOnSite", "displayOrder")
        VALUES (
          '${sData.title.replace(/'/g, "''")}',
          '${sData.slug}',
          ${countryId},
          '${sData.seoTitle.replace(/'/g, "''")}',
          '${sData.h1Title.replace(/'/g, "''")}',
          '${sData.seoDescription.replace(/'/g, "''")}',
          '${sData.overView.replace(/'/g, "''")}',
          '${sData.famousFor.replace(/'/g, "''")}',
          NULL,
          true,
          true,
          0
        )
        RETURNING id
      `);
      stateId = newState[0].id;
      console.log(`\nCreated State: ${sData.title} (ID: ${stateId})`);
    }

    // Cities Loop
    for (const cData of block.cities) {
      let existingCity = await prisma.$queryRawUnsafe(`SELECT id, title FROM "City" WHERE slug = '${cData.slug}' LIMIT 1`);
      let cityId;

      if (existingCity && existingCity.length > 0) {
        cityId = existingCity[0].id;
        await prisma.$executeRawUnsafe(`
          UPDATE "City"
          SET "title" = '${cData.title.replace(/'/g, "''")}',
              "stateId" = ${stateId},
              "seoTitle" = '${cData.seoTitle.replace(/'/g, "''")}',
              "h1Title" = '${cData.h1Title.replace(/'/g, "''")}',
              "seoDescription" = '${cData.seoDescription.replace(/'/g, "''")}',
              "overView" = '${cData.overView.replace(/'/g, "''")}',
              "famousFor" = '${cData.famousFor.replace(/'/g, "''")}',
              "thumbImg" = NULL,
              "isActive" = true,
              "showOnSite" = true
          WHERE id = ${cityId}
        `);
        console.log(`   -> Updated City: ${cData.title} (ID: ${cityId}) [Images set to NULL]`);
      } else {
        const newCity = await prisma.$queryRawUnsafe(`
          INSERT INTO "City" (title, slug, "stateId", "seoTitle", "h1Title", "seoDescription", "overView", "famousFor", "thumbImg", "isActive", "showOnSite", "displayOrder")
          VALUES (
            '${cData.title.replace(/'/g, "''")}',
            '${cData.slug}',
            ${stateId},
            '${cData.seoTitle.replace(/'/g, "''")}',
            '${cData.h1Title.replace(/'/g, "''")}',
            '${cData.seoDescription.replace(/'/g, "''")}',
            '${cData.overView.replace(/'/g, "''")}',
            '${cData.famousFor.replace(/'/g, "''")}',
            NULL,
            true,
            true,
            0
          )
          RETURNING id
        `);
        cityId = newCity[0].id;
        console.log(`   -> Created City: ${cData.title} (ID: ${cityId}) [Images set to NULL]`);
      }
    }
  }

  console.log('\nSUCCESSFULLY UPDATED ALL 3 STATES & 27 CITIES WITH DATA! Images are left clear/NULL for custom Dashboard upload.');
}

main()
  .catch((e) => {
    console.error('Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
