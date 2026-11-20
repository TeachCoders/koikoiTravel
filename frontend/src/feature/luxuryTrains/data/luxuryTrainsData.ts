export interface LuxuryTrainCircuit {
  id: string;
  title: string;
  duration: string;
  nights: number;
  days: number;
  routeSummary: string;
  route: string[];
  startingPriceUSD: number;
  startingPriceINR: string;
  season: string;
  departureDates: string[];
  highlights: string[];
  image: string;
}

export interface LuxuryTrainCabin {
  name: string;
  type: string;
  size: string;
  bedType: string;
  description: string;
  features: string[];
}

export interface LuxuryTrain {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  operator: string;
  badge: string;
  heroImage: string;
  thumbImage: string;
  startingPriceUSD: number;
  startingPriceINR: string;
  durationDefault: string;
  circuitsCount: number;
  officialWebsite: string;
  description: string;
  rating: number;
  reviewCount: number;
  awards: string[];
  keyHighlights: string[];
  circuits: LuxuryTrainCircuit[];
  cabins: LuxuryTrainCabin[];
  diningAndLounges: {
    name: string;
    type: string;
    description: string;
  }[];
  specifications: {
    totalGuestCapacity: number;
    totalCoaches: number;
    yearLaunched: string;
    suspensionType: string;
    wifiAvailable: boolean;
    spaOnBoard: boolean;
  };
}

export const LUXURY_TRAINS_DATA: LuxuryTrain[] = [
  {
    id: "maharajas-express",
    slug: "maharajas-express",
    name: "Maharajas' Express",
    tagline: "The World's Leading Luxury Train",
    operator: "IRCTC (Indian Railway Catering and Tourism Corporation)",
    badge: "World Travel Awards Winner 7x",
    heroImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=85",
    thumbImage: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=800&q=80",
    startingPriceUSD: 4890,
    startingPriceINR: "₹4,10,000",
    durationDefault: "7 Days / 6 Nights",
    circuitsCount: 4,
    officialWebsite: "https://www.the-maharajas.com/",
    rating: 4.9,
    reviewCount: 342,
    awards: [
      "World's Leading Luxury Train (7 Consecutive Years)",
      "Seven Star Luxury Hospitality and Lifestyle Award",
      "Best Luxury Train in Asia"
    ],
    description:
      "Redefining royalty on wheels, the Maharajas' Express is arguably India's most opulent train. Stretching across half a mile with pneumatic suspension, state-of-the-art climate control, two fine-dining peacock and gem-themed restaurants, and a 2-room Presidential Suite covering a whole carriage, it offers unforgettable journeys through India's imperial heritage.",
    keyHighlights: [
      "Navratna Presidential Suite spanning an entire private carriage with bathtub",
      "Fine dining at Mayur Mahal and Rang Mahal with gold-embossed Limoges porcelain",
      "Complimentary house wines, beers, and spirits in Safari Bar & Rajah Club",
      "Exclusive royal off-board excursions: Private palace breakfasts and sundowners at Sam Sand Dunes",
      "Dedicated 24/7 personal butler (Khidmatgar) assigned to each cabin",
      "Pneumatic hydraulic suspension for an exceptionally smooth, whisper-quiet glide"
    ],
    specifications: {
      totalGuestCapacity: 88,
      totalCoaches: 23,
      yearLaunched: "2010",
      suspensionType: "Advanced Pneumatic Air Suspension",
      wifiAvailable: true,
      spaOnBoard: true
    },
    cabins: [
      {
        name: "Deluxe Cabin",
        type: "Standard Luxury",
        size: "112 sq. ft.",
        bedType: "Twin / Double",
        description: "Elegant wooden cabinetry, large panoramic picture windows, en-suite bathroom with shower stall, RFID electronic safe, and LCD TV with satellite channels.",
        features: ["Private en-suite bathroom", "Electronic safe & RFID door locks", "24/7 Dedicated Butler", "Complimentary Wi-Fi", "Plush bathrobes & luxury toiletries"]
      },
      {
        name: "Junior Suite",
        type: "Premium Luxury",
        size: "150 sq. ft.",
        bedType: "Twin / Double",
        description: "Spacious suite with opulent Silk upholstery, large writing desk, panoramic windows with day and night blinds, and enhanced vanity amenities.",
        features: ["Larger floor area with seating area", "Premium picture windows", "Personal butler service", "Minibar with complimentary soft beverages", "Express laundry service"]
      },
      {
        name: "Suite",
        type: "Executive Royal Suite",
        size: "220 sq. ft.",
        bedType: "Double Bed",
        description: "Includes a separate elegant living room area, private mini-bar, double bedroom, and personal chauffeur-driven car for all off-board excursions.",
        features: ["Separate living room & master bedroom", "Private guide & luxury car for sightseeing", "Complimentary minibar stocked with premium spirits", "Bathtub in private bathroom", "Valet unpacking & pressing service"]
      },
      {
        name: "Presidential Suite (Navratna)",
        type: "Super Luxury Carriage",
        size: "448 sq. ft. (Entire Coach)",
        bedType: "2 Bedrooms (Master + Twin)",
        description: "The only one of its kind in the world. An entire 23-meter carriage featuring two bedrooms, private living room, dining area, two lavish bathrooms, and a full-sized soaking bathtub.",
        features: ["Spans the entire carriage", "Master bedroom + second bedroom", "Full bathtub with luxury bath salts", "Dedicated private royal guide & luxury luxury sedan", "Exclusive private dining option inside suite"]
      }
    ],
    diningAndLounges: [
      {
        name: "Rang Mahal",
        type: "Fine Dining Restaurant",
        description: "Decorated with hand-painted fresco ceilings inspired by royal havelis, serving gourmet Indian thalis and royal recipes."
      },
      {
        name: "Mayur Mahal",
        type: "Fine Dining Restaurant",
        description: "Adorned with peacock motifs, Swarovski crystals, and fine bone china, offering world-class continental and fusion cuisine."
      },
      {
        name: "The Safari Bar",
        type: "Themed Lounge Bar",
        description: "Relaxed club atmosphere serving fine single malts, classic cocktails, and games like chess and carrom."
      },
      {
        name: "The Rajah Club",
        type: "Observation Lounge",
        description: "Plush leather armchairs with panoramic viewing windows, offering afternoon teas and evening aperitifs."
      }
    ],
    circuits: [
      {
        id: "heritage-of-india",
        title: "The Heritage of India",
        duration: "7 Days / 6 Nights",
        nights: 6,
        days: 7,
        routeSummary: "Mumbai → Udaipur → Jodhpur → Bikaner → Jaipur → Ranthambore → Agra → Delhi",
        route: ["Mumbai", "Udaipur", "Jodhpur", "Bikaner", "Jaipur", "Ranthambore", "Agra", "Delhi"],
        startingPriceUSD: 7570,
        startingPriceINR: "₹6,35,000",
        season: "October – April",
        departureDates: ["12 Oct 2024", "09 Nov 2024", "07 Dec 2024", "04 Jan 2025", "01 Feb 2025", "01 Mar 2025", "29 Mar 2025"],
        highlights: ["Boat cruise on Lake Pichola", "Dune gala dinner in Bikaner", "Amber Fort royal elephant welcome", "Tiger safari in Ranthambore", "Sunrise at Taj Mahal"],
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "indian-panorama",
        title: "The Indian Panorama",
        duration: "7 Days / 6 Nights",
        nights: 6,
        days: 7,
        routeSummary: "Delhi → Jaipur → Ranthambore → Fatehpur Sikri → Agra → Orchha → Khajuraho → Varanasi → Delhi",
        route: ["Delhi", "Jaipur", "Ranthambore", "Fatehpur Sikri", "Agra", "Orchha", "Khajuraho", "Varanasi", "Delhi"],
        startingPriceUSD: 7570,
        startingPriceINR: "₹6,35,000",
        season: "October – April",
        departureDates: ["26 Oct 2024", "23 Nov 2024", "21 Dec 2024", "18 Jan 2025", "15 Feb 2025", "15 Mar 2025"],
        highlights: ["Evening Ganga Aarti boat ride in Varanasi", "Kama Sutra temples of Khajuraho", "Taj Mahal visit", "Ranthambore Tiger Reserve game drive", "City Palace Jaipur"],
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "indian-splendour",
        title: "The Indian Splendour",
        duration: "7 Days / 6 Nights",
        nights: 6,
        days: 7,
        routeSummary: "Delhi → Agra → Ranthambore → Jaipur → Bikaner → Jodhpur → Udaipur → Mumbai",
        route: ["Delhi", "Agra", "Ranthambore", "Jaipur", "Bikaner", "Jodhpur", "Udaipur", "Mumbai"],
        startingPriceUSD: 7570,
        startingPriceINR: "₹6,35,000",
        season: "October – April",
        departureDates: ["19 Oct 2024", "16 Nov 2024", "14 Dec 2024", "11 Jan 2025", "08 Feb 2025", "08 Mar 2025"],
        highlights: ["Taj Mahal & Agra Fort", "Junagarh Fort private banquet", "Umaid Bhawan Palace museum", "Udaipur Crystal Gallery", "Mumbai Gateway of India farewell"],
        image: "https://images.unsplash.com/photo-1592635196078-9fe3d54f2377?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "treasures-of-india",
        title: "Treasures of India",
        duration: "4 Days / 3 Nights",
        nights: 3,
        days: 4,
        routeSummary: "Delhi → Agra → Ranthambore → Jaipur → Delhi",
        route: ["Delhi", "Agra", "Ranthambore", "Jaipur", "Delhi"],
        startingPriceUSD: 4890,
        startingPriceINR: "₹4,10,000",
        season: "October – April",
        departureDates: ["03 Nov 2024", "01 Dec 2024", "29 Dec 2024", "26 Jan 2025", "23 Feb 2025", "23 Mar 2025"],
        highlights: ["Golden Triangle in supreme luxury", "Taj Mahal sunrise viewing", "Canter safari in Ranthambore", "Jaipur City Palace & Jantar Mantar"],
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "palace-on-wheels",
    slug: "palace-on-wheels",
    name: "Palace on Wheels",
    tagline: "The Pioneer of Luxury Train Journeys in India",
    operator: "Rajasthan Tourism Development Corporation (RTDC) & Indian Railways",
    badge: "India's First Heritage Luxury Train",
    heroImage: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=85",
    thumbImage: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=80",
    startingPriceUSD: 5250,
    startingPriceINR: "₹4,40,000",
    durationDefault: "8 Days / 7 Nights",
    circuitsCount: 1,
    officialWebsite: "https://palaceonwheels.rajasthan.gov.in/",
    rating: 4.8,
    reviewCount: 418,
    awards: [
      "Voted 4th Best Luxury Train in the World (Conde Nast)",
      "PATA Gold Award Winner",
      "Heritage Icon of Indian Tourism"
    ],
    description:
      "Voted among the best luxury train journeys on the planet, Palace on Wheels was originally built using the authentic personal railway coaches of erstwhile Rajput Maharajas, the Viceroy of British India, and the Nizam of Hyderabad. Today's refurbished super-luxury train takes you on an imperial circular tour of Rajasthan's forts, sand dunes, lakes, wildlife, and the Taj Mahal.",
    keyHighlights: [
      "Authentic heritage coaches named after Rajasthan's princely states (e.g. Mewar, Marwar, Bikaner, Amber)",
      "Two royal dining salons: 'The Maharaja' and 'The Maharani'",
      "Royal turban-clad Khidmatgars greeting you with folded hands and rose petal showers at every station",
      "Camel safari and royal dinner amidst golden sand dunes of Jaisalmer",
      "Open-top gypsy tiger safari in Ranthambore National Park",
      "Ayurvedic Spa carriage offering traditional Kerala herbal therapies"
    ],
    specifications: {
      totalGuestCapacity: 82,
      totalCoaches: 14,
      yearLaunched: "1982 (Modernized 2017)",
      suspensionType: "Upgraded High-Comfort Bogies",
      wifiAvailable: true,
      spaOnBoard: true
    },
    cabins: [
      {
        name: "Deluxe Cabin",
        type: "Heritage Royal Room",
        size: "105 sq. ft.",
        bedType: "Twin / Double",
        description: "Adorned with antique Rajasthani miniature paintings, richly carved teakwood furnishings, fine silk drapes, modern temperature control, and private attached washroom.",
        features: ["Attached shower & WC", "Individual climate control", "Electronic safe", "Khidmatgar in royal uniform", "Intercom telephone & music system"]
      },
      {
        name: "Super Deluxe Suite",
        type: "Maharaja Suite",
        size: "140 sq. ft.",
        bedType: "Large Double Bed",
        description: "Opulent suites named after royal gems, featuring queen beds, rich velvet furnishings, silk bedspreads, private butler, and upgraded chauffeured city sightseeing.",
        features: ["Dedicated private car for station excursions", "Spacious layout with seating couch", "High-thread-count Egyptian cotton linens", "Complimentary bottle of wine on arrival", "Priority dining table reservation"]
      }
    ],
    diningAndLounges: [
      {
        name: "The Maharaja Restaurant",
        type: "Royal Dining Car",
        description: "Serves Rajasthani delicacies like Laal Maas, Dal Baati Churma, alongside gourmet Continental and Chinese menus."
      },
      {
        name: "The Maharani Restaurant",
        type: "Royal Dining Car",
        description: "Intimate heritage setting with vintage brass lamps, silver tableware, and candle-lit evening service."
      },
      {
        name: "The Bar & Lounge",
        type: "Heritage Lounge",
        description: "Selection of aged scotches, Indian wines, cocktails, and an onboard library of Indian history and wildlife."
      },
      {
        name: "Rejuvenation Spa",
        type: "Wellness Coach",
        description: "Ayurvedic massages, reflexology, and relaxation therapies delivered by certified therapists."
      }
    ],
    circuits: [
      {
        id: "classic-rajasthan-circuit",
        title: "Classic Rajasthan Royal Circuit",
        duration: "8 Days / 7 Nights",
        nights: 7,
        days: 8,
        routeSummary: "Delhi → Jaipur → Sawai Madhopur → Chittorgarh → Udaipur → Jaisalmer → Jodhpur → Bharatpur → Agra → Delhi",
        route: ["Delhi", "Jaipur", "Sawai Madhopur", "Chittorgarh", "Udaipur", "Jaisalmer", "Jodhpur", "Bharatpur", "Agra", "Delhi"],
        startingPriceUSD: 5250,
        startingPriceINR: "₹4,40,000",
        season: "September – April (Departs every Wednesday)",
        departureDates: [
          "Every Wednesday (Sep to Apr)",
          "04 Sep 2024", "18 Sep 2024", "02 Oct 2024", "16 Oct 2024", "06 Nov 2024", "20 Nov 2024", "04 Dec 2024", "18 Dec 2024", "01 Jan 2025", "15 Jan 2025", "05 Feb 2025", "19 Feb 2025", "05 Mar 2025", "19 Mar 2025"
        ],
        highlights: [
          "Sound & Light show at Chittorgarh Fort",
          "Sunset camel ride & barbecue at Sam Sand Dunes",
          "Keoladeo Ghana Bird Sanctuary rickshaw ride",
          "Taj Mahal sunrise & Agra Fort tour",
          "City Palace & Saheliyon ki Bari in Udaipur"
        ],
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "golden-chariot",
    slug: "golden-chariot",
    name: "The Golden Chariot",
    tagline: "Many Worlds. One Journey.",
    operator: "KSTDC (Karnataka State Tourism) & IRCTC",
    badge: "Seven Stars Luxury Award Winner",
    heroImage: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=85",
    thumbImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    startingPriceUSD: 4200,
    startingPriceINR: "₹3,55,000",
    durationDefault: "6 Days / 5 Nights & 7 Days / 6 Nights",
    circuitsCount: 3,
    officialWebsite: "https://www.goldenchariot.org/",
    rating: 4.7,
    reviewCount: 289,
    awards: [
      "Asia's Leading Luxury Train Award",
      "National Tourism Award for Best Rail Tourism",
      "Seven Star Luxury Train Experience"
    ],
    description:
      "Named after the iconic Stone Chariot of Hampi, The Golden Chariot connects the magnificent ruins of the Vijayanagara Empire, serene Arabian Sea beaches in Goa, ancient cave temples of Badami, and dense teak forests of Bandipur National Park. Draped in deep purple and royal gold, it is South India's premier luxury rail odyssey.",
    keyHighlights: [
      "Intricately carved interiors inspired by Hoysala and Mysore temple architecture",
      "Two authentic multi-cuisine restaurants: 'Ruchi' and 'Nalapaka'",
      "'Madira' regal bar serving fine spirits with views of the Deccan countryside",
      "UNESCO World Heritage sites of Hampi, Pattadakal, and Badami Cave Temples",
      "Jeep safari in Bandipur National Park tiger reserve",
      "Beachfront dinner and Portuguese heritage walk in North & South Goa"
    ],
    specifications: {
      totalGuestCapacity: 84,
      totalCoaches: 18,
      yearLaunched: "2008 (Refurbished 2020 by IRCTC)",
      suspensionType: "Modern Air Suspension Bogies",
      wifiAvailable: true,
      spaOnBoard: true
    },
    cabins: [
      {
        name: "Deluxe Twin Cabin",
        type: "Heritage Sleeper",
        size: "100 sq. ft.",
        bedType: "Two Single Beds",
        description: "Handcrafted wooden carvings, silk upholstery, smart TV, personal locker, en-suite bathroom with hot running water and luxury organic toiletries.",
        features: ["Attached shower & vanity", "Individual AC control", "Smart TV with curated movies", "Emergency alarm call button", "Complimentary mineral water & treats"]
      },
      {
        name: "Deluxe Double Cabin",
        type: "Romantic Suite",
        size: "105 sq. ft.",
        bedType: "Double Bed",
        description: "Designed for couples, featuring a comfortable double bed, bedside reading lamps, wide bay windows, and traditional South Indian brass accents.",
        features: ["Double bed with orthopedic mattress", "Panoramic viewing window", "Private attached bathroom", "In-cabin dining support on request", "Dedicated carriage attendant"]
      }
    ],
    diningAndLounges: [
      {
        name: "Ruchi Restaurant",
        type: "Vegetarian & Regional Dining",
        description: "Specializing in authentic Karnataka, Tamil, and Coastal delicacies alongside royal vegetarian thalis."
      },
      {
        name: "Nalapaka Restaurant",
        type: "Continental & Pan-Indian Dining",
        description: "Curated gourmet menus featuring freshly caught seafood, continental grills, and international favorites."
      },
      {
        name: "Madira Lounge Bar",
        type: "Carved Palace Bar",
        description: "Modeled after the Mysore Palace Hall of Mirrors, serving curated whiskeys, signature cocktails, and wines."
      },
      {
        name: "Arogya Ayurvedic Spa & Gym",
        type: "Wellness & Fitness Coach",
        description: "Traditional Kerala Panchakarma therapies, relaxing massages, and state-of-the-art gym equipment."
      }
    ],
    circuits: [
      {
        id: "pride-of-karnataka",
        title: "Pride of Karnataka",
        duration: "6 Days / 5 Nights",
        nights: 5,
        days: 6,
        routeSummary: "Bengaluru → Bandipur → Mysore → Halebidu → Hampi → Badami → Goa → Bengaluru",
        route: ["Bengaluru", "Bandipur", "Mysore", "Halebidu", "Hampi", "Badami", "Goa", "Bengaluru"],
        startingPriceUSD: 4900,
        startingPriceINR: "₹4,12,000",
        season: "October – March",
        departureDates: ["19 Oct 2024", "16 Nov 2024", "14 Dec 2024", "04 Jan 2025", "01 Feb 2025", "01 Mar 2025"],
        highlights: [
          "Early morning wildlife safari in Bandipur",
          "Private tour of illuminated Mysore Palace",
          "Stone Chariot & Virupaksha Temple at Hampi",
          "Churches of Old Goa & sunset cruise",
          "Hoysala architectural marvels at Halebidu"
        ],
        image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "jewels-of-south",
        title: "Jewels of South",
        duration: "6 Days / 5 Nights",
        nights: 5,
        days: 6,
        routeSummary: "Bengaluru → Mysore → Hampi → Mahabalipuram → Thanjavur → Chettinad → Cochin → Kumarakom",
        route: ["Bengaluru", "Mysore", "Hampi", "Mahabalipuram", "Thanjavur", "Chettinad", "Cochin", "Kumarakom"],
        startingPriceUSD: 4900,
        startingPriceINR: "₹4,12,000",
        season: "October – March",
        departureDates: ["02 Nov 2024", "30 Nov 2024", "28 Dec 2024", "18 Jan 2025", "15 Feb 2025", "15 Mar 2025"],
        highlights: [
          "Shore Temple & Pancha Rathas in Mahabalipuram",
          "Brihadeeswara Temple in Thanjavur",
          "Chettinad mansions and spicy culinary demonstration",
          "Houseboat cruise on Kerala backwaters",
          "Kathakali dance performance in Cochin"
        ],
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "glimpses-of-karnataka",
        title: "Glimpses of Karnataka",
        duration: "4 Days / 3 Nights",
        nights: 3,
        days: 4,
        routeSummary: "Bengaluru → Bandipur → Mysore → Hampi → Bengaluru",
        route: ["Bengaluru", "Bandipur", "Mysore", "Hampi", "Bengaluru"],
        startingPriceUSD: 3150,
        startingPriceINR: "₹2,65,000",
        season: "October – March",
        departureDates: ["09 Nov 2024", "07 Dec 2024", "21 Dec 2024", "25 Jan 2025", "22 Feb 2025"],
        highlights: [
          "Short luxury getaway to Bandipur jungle",
          "Palace illumination & royal dinner in Mysore",
          "Full day excursion across Hampi ruins",
          "Ideal for travelers short on time"
        ],
        image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: "deccan-odyssey",
    slug: "deccan-odyssey",
    name: "Deccan Odyssey",
    tagline: "The Blue Limousine on Tracks",
    operator: "MTDC (Maharashtra Tourism) & Ministry of Railways",
    badge: "Asia's Leading Luxury Train 5x",
    heroImage: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=85",
    thumbImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80",
    startingPriceUSD: 7320,
    startingPriceINR: "₹6,15,000",
    durationDefault: "8 Days / 7 Nights",
    circuitsCount: 6,
    officialWebsite: "https://traindeccanodyssey.com/",
    rating: 4.8,
    reviewCount: 310,
    awards: [
      "Asia's Leading Luxury Train at World Travel Awards (5 Times)",
      "Best Rail Tour Operator in India",
      "Condé Nast Traveler Readers' Choice"
    ],
    description:
      "A royal blue dream train inspired by the personal saloons of erstwhile Maratha warriors, Nizams, and imperial rulers. Deccan Odyssey journeys through the wine capitals of Nashik, ancient rock-cut caves of Ajanta & Ellora, UNESCO forts of Rajasthan, beaches of Goa, and tiger reserves of Central India.",
    keyHighlights: [
      "21 royal carriages painted in distinguished royal blue and gold",
      "Two fine-dining carriages: 'Waah! Maula' and 'Waah! Rasoi'",
      "'Gateway' lounge bar with international sommelier selections",
      "Exclusive visits to UNESCO World Heritage Ajanta & Ellora Cave Temples",
      "Vineyard tour and private wine tasting at Grover Zampa / Sula in Nashik",
      "Full Ayurvedic spa & wellness carriage 'Ayush' with steam bath and gym"
    ],
    specifications: {
      totalGuestCapacity: 88,
      totalCoaches: 21,
      yearLaunched: "2004 (Relaunched 2023 with upgraded luxuries)",
      suspensionType: "Advanced Hydraulic Air Cushions",
      wifiAvailable: true,
      spaOnBoard: true
    },
    cabins: [
      {
        name: "Deluxe Cabin",
        type: "Heritage Royal Room",
        size: "105 sq. ft.",
        bedType: "Twin / Double",
        description: "Decorated with rich Maratha silks, handcrafted wood carvings, personal safe, wardrobe, en-suite bathroom with pressurized hot showers and complimentary vanity kit.",
        features: ["Private attached bathroom", "Attendant call system", "High-speed Wi-Fi", "Electronic safe", "Daily newspaper & fresh fruit platter"]
      },
      {
        name: "Presidential Suite",
        type: "Royal Grand Suite",
        size: "205 sq. ft.",
        bedType: "Large King Bed",
        description: "Features a dedicated living room lounge, master bedroom, two lavish bathrooms, private minibar, and a personal valet to tend to your every need 24/7.",
        features: ["Separate living room & bedroom", "Private car for local city tours", "Complimentary laundry service", "Stocked minibar with champagne", "Personal valet service"]
      }
    ],
    diningAndLounges: [
      {
        name: "Waah! Maula",
        type: "Royal Dining Car",
        description: "Opulent royal carriage serving Maharashtrian, Awadhi, and Continental specialties prepared fresh onboard by master chefs."
      },
      {
        name: "Waah! Rasoi",
        type: "Gourmet Dining Car",
        description: "Grand dining hall offering fine wine pairings, royal Indian thalis, and international vegetarian options."
      },
      {
        name: "Gateway Bar Lounge",
        type: "Cocktail Lounge",
        description: "Elegant lounge stocked with vintage single malts, Indian wines, cognacs, and signature cocktails."
      },
      {
        name: "Ayush Wellness & Spa",
        type: "Ayurvedic Spa Coach",
        description: "Authentic Kerala Ayurvedic body wraps, massages, reflexology, and private steam room on wheels."
      }
    ],
    circuits: [
      {
        id: "maharashtra-splendour",
        title: "Maharashtra Splendour",
        duration: "8 Days / 7 Nights",
        nights: 7,
        days: 8,
        routeSummary: "Mumbai → Nashik → Aurangabad (Ellora) → Ajanta Caves → Kolhapur → Goa → Sindhudurg → Mumbai",
        route: ["Mumbai", "Nashik", "Ellora Caves", "Ajanta Caves", "Kolhapur", "Goa", "Sindhudurg", "Mumbai"],
        startingPriceUSD: 7320,
        startingPriceINR: "₹6,15,000",
        season: "October – April (Departs Saturdays)",
        departureDates: ["05 Oct 2024", "02 Nov 2024", "07 Dec 2024", "04 Jan 2025", "01 Feb 2025", "01 Mar 2025", "05 Apr 2025"],
        highlights: [
          "UNESCO Ajanta & Ellora ancient cave temples",
          "Nashik vineyard tour & wine tasting",
          "Kolhapur royal wrestling demonstration & Mahalaxmi Temple",
          "Goa Latin Quarter heritage walk & beach gala",
          "Sindhudurg ocean fort & Konkan coastal beauty"
        ],
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "indian-odyssey",
        title: "Indian Odyssey",
        duration: "8 Days / 7 Nights",
        nights: 7,
        days: 8,
        routeSummary: "Delhi → Sawai Madhopur → Agra → Jaipur → Udaipur → Vadodara → Ellora Caves → Mumbai",
        route: ["Delhi", "Sawai Madhopur", "Agra", "Jaipur", "Udaipur", "Vadodara", "Ellora Caves", "Mumbai"],
        startingPriceUSD: 7320,
        startingPriceINR: "₹6,15,000",
        season: "October – April",
        departureDates: ["19 Oct 2024", "16 Nov 2024", "14 Dec 2024", "18 Jan 2025", "15 Feb 2025", "15 Mar 2025"],
        highlights: [
          "Ranthambore Tiger Reserve game drive",
          "Taj Mahal sunrise and Agra Fort",
          "Amber Fort & City Palace in Jaipur",
          "Laxmi Vilas Palace banquet in Vadodara",
          "Ellora rock-cut Kailasa Temple"
        ],
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80"
      },
      {
        id: "maharashtra-wild-trail",
        title: "Maharashtra Wild Trail",
        duration: "8 Days / 7 Nights",
        nights: 7,
        days: 8,
        routeSummary: "Mumbai → Aurangabad → Pench National Park → Tadoba Tiger Reserve → Ajanta → Nashik → Mumbai",
        route: ["Mumbai", "Aurangabad", "Pench", "Tadoba", "Ajanta", "Nashik", "Mumbai"],
        startingPriceUSD: 7320,
        startingPriceINR: "₹6,15,000",
        season: "October – April",
        departureDates: ["26 Oct 2024", "23 Nov 2024", "21 Dec 2024", "25 Jan 2025", "22 Feb 2025", "22 Mar 2025"],
        highlights: [
          "Twin Tiger Safaris in Pench (Mowgli's land) & Tadoba",
          "Jeep game drives with senior naturalists",
          "Ellora Caves & Bibi ka Maqbara",
          "Wine appreciation in Nashik",
          "Ajanta Buddhist fresco caves"
        ],
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80"
      }
    ]
  }
];

export const ROYAL_EXPERIENCE_PILLARS = [
  {
    icon: "crown",
    title: "Palaces on Wheels",
    subtitle: "Presidential Suites & Heritage Décor",
    description: "Lacquered teakwood, silk tapestries, antique paintings, and en-suite royal bathrooms equipped with bathtubs, electronic safes, and individual climate control."
  },
  {
    icon: "utensils",
    title: "Imperial Fine Dining",
    subtitle: "Gourmet Regional & Continental Feasts",
    description: "Two grand restaurant carriages per train serving royal recipes curated by executive chefs on gold-plated Limoges porcelain and crystal glassware."
  },
  {
    icon: "user-check",
    title: "Personal Royal Valet",
    subtitle: "Dedicated 24/7 Khidmatgars",
    description: "Hospitality inspired by India's legendary 'Atithi Devo Bhava'. Your personal attendant handles luggage, pressing, wake-up teas, and every comfort."
  },
  {
    icon: "compass",
    title: "Curated Off-Board Safaris",
    subtitle: "VIP Access to UNESCO Monuments",
    description: "Skip the lines with private air-conditioned transport, expert local Egyptologists/historians, elephant rides, palace banquets, and desert sundowners."
  },
  {
    icon: "wine",
    title: "Saloon Bars & Social Lounges",
    subtitle: "Fine Single Malts & Panoramic Views",
    description: "Unwind in plush leather armchairs with international spirits, signature cocktails, chess boards, and ever-changing vistas of India's royal heartland."
  },
  {
    icon: "sparkles",
    title: "Ayurvedic Wellness & Spas",
    subtitle: "Therapeutic Rejuvenation on Tracks",
    description: "Full wellness carriages offering herbal therapies, reflexology, relaxation massages, and fitness gyms while traveling between royal destinations."
  }
];

export const LUXURY_TRAIN_FAQS = [
  {
    question: "What is included in the luxury train ticket price?",
    answer:
      "All luxury train fares are virtually all-inclusive: luxurious accommodation in your chosen cabin, all meals (breakfast, lunch, afternoon tea, dinner), packaged drinking water, tea/coffee service, all scheduled off-board sightseeing tours in deluxe AC coaches with licensed English guides, entrance fees to monuments and UNESCO sites, camera fees, camel rides/jungle jeep safaris, and dedicated 24/7 cabin attendant service. Maharajas' Express and Deccan Odyssey presidential suites also include private chauffeur-driven cars during city tours."
  },
  {
    question: "When is the best time of year to travel on India's luxury trains?",
    answer:
      "The official luxury train operating season runs from October to April every year. During these months, the weather across Northern, Western, and Southern India is delightfully pleasant, dry, and cool—ideal for outdoor palace visits, wildlife safaris, and desert evenings. The trains do not operate during the hot summer and monsoon months (May to August) for annual maintenance and refurbishments."
  },
  {
    question: "Can KoiKoi Travel arrange pre-tour and post-tour travel in India?",
    answer:
      "Yes, absolutely! KoiKoi Travel specializes in end-to-end luxury travel. We arrange VIP airport tarmac transfers, private luxury chauffeur-driven vehicles, stays at 5-star palace hotels (such as The Oberoi, Taj Palaces, and Leela), private guided tours of Delhi, Mumbai, or Bengaluru before train departure, and extensions to the Maldives, Kerala backwaters, or Varanasi."
  },
  {
    question: "What is the dress code onboard and during off-train excursions?",
    answer:
      "Daytime sightseeing is smart-casual with comfortable walking shoes, sunglasses, and hats. Modest dress (covering shoulders and knees) is respectful when visiting sacred temples and mosques. Evenings onboard are smart-casual to formal (blazers, shirts, dinner jackets, or elegant evening wear), especially during the Captain's Welcome and Farewell Gala Dinners."
  },
  {
    question: "Are special dietary requirements (Vegetarian, Vegan, Gluten-Free, Halal, Jain) accommodated?",
    answer:
      "Yes. The onboard master chefs cater to all dietary preferences, including pure vegetarian, vegan, Jain (no onion/garlic), gluten-free, lactose-free, and kosher/halal styles upon advance notification during booking."
  },
  {
    question: "How far in advance should we reserve our cabins?",
    answer:
      "Because each train accommodates only 80 to 88 guests per departure, peak dates (especially October, November, December Christmas/New Year, and February) frequently sell out 6 to 12 months in advance. We recommend securing your preferred departure date and cabin category at least 4 to 8 months ahead."
  }
];
