# -*- coding: utf-8 -*-
"""
Script to inject Golden Chariot circuits and revamp gc_itinerary in scripts/generate_luxury_trains_html.py
"""

with open('scripts/generate_luxury_trains_html.py', 'r', encoding='utf-8') as f:
    code = f.read()

# Make sure the copy loop copies pride-of-karnataka, jewels-of-south, glimpses-of-karnataka to flat .html
old_copy_loop = '''    for train in ["palace-on-wheels", "maharajas-express", "golden-chariot", "deccan-odyssey"]:
        for tab in ["itinerary", "departures", "price", "cabins", "photo-gallery",
                    "the-heritage-of-india", "the-indian-panorama", "the-indian-splendour", "treasures-of-india"]:
            src = f"{base_dir}/{train}/{tab}/index.html"
            dst = f"{base_dir}/{train}/{tab}.html"'''

new_copy_loop = '''    for train in ["palace-on-wheels", "maharajas-express", "golden-chariot", "deccan-odyssey"]:
        for tab in ["itinerary", "departures", "price", "cabins", "photo-gallery",
                    "the-heritage-of-india", "the-indian-panorama", "the-indian-splendour", "treasures-of-india",
                    "pride-of-karnataka", "jewels-of-south", "glimpses-of-karnataka"]:
            src = f"{base_dir}/{train}/{tab}/index.html"
            dst = f"{base_dir}/{train}/{tab}.html"'''

if old_copy_loop in code:
    code = code.replace(old_copy_loop, new_copy_loop)
    print("Updated copy loop to include Golden Chariot circuits.")
else:
    print("Copy loop already has Golden Chariot circuits or marker not found.")

# Target replacement area: between # Golden Chariot Itinerary and # Golden Chariot Departures
target_start_marker = '    # Golden Chariot Itinerary\n'
target_end_marker = '    # Golden Chariot Departures\n'

start_idx = code.find(target_start_marker)
end_idx = code.find(target_end_marker, start_idx)

if start_idx == -1 or end_idx == -1:
    print("Error: Could not find target markers!")
    exit(1)

golden_chariot_content = '''    # Golden Chariot Inclusions & Exclusions Snippet
    gc_inc_exc_snippet = f"""
<div class="inc-exc-grid" style="margin-top:32px">
  <div class="inc-box">
    <h3>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="16 9 10 15 7 12"></polyline></svg>
      What's Included in Your Golden Chariot Ticket
    </h3>
    <ul>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Luxury accommodation in air-conditioned Deluxe Cabins with private en-suite shower bathrooms</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>All gourmet meals on board at Ruchi and Nalapaka fine-dining restaurant cars</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Complimentary house brands of Indian wines, beers, and spirits at Madira Lounge Bar</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>All guided sightseeing excursions in deluxe air-conditioned highway coaches with English-speaking guides</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>Bandipur National Park open-jeep wildlife safari and Kumarakom backwaters boat cruise</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>All entrance fees to UNESCO monuments, palaces, museums, and tea/coffee plantation tours</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><polyline points="20 6 9 17 4 12"></polyline></svg><span>24/7 dedicated carriage attendant service, bottled water, and high-speed onboard Wi-Fi</span></li>
    </ul>
  </div>
  <div class="exc-box">
    <h3>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
      What's Excluded
    </h3>
    <ul>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>5% Government Goods and Services Tax (GST)</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>Pre and post-train 5-star hotel stays in Bengaluru, Goa, or Kochi (arranged separately by KoiKoi Travel)</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>International and domestic airfare, and airport transfers</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>Premium imported vintage wines and spirits (available on chargeable basis)</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>Ayurvedic spa therapies at Arogya Spa, laundry service, and commercial camera video fees</span></li>
      <li><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg><span>Gratuities and tips for train staff and off-train local guides (at guest discretion)</span></li>
    </ul>
  </div>
</div>
"""

    # ================= 1. PRIDE OF KARNATAKA (5N/6D) =================
    gc_pride_days = [
        {
            "day": 1,
            "title": "Bengaluru – Welcome Ceremony & Boarding at Yeshwantpur (YPR)",
            "paragraphs": [
                "Afternoon: Arrive at Yeshwantpur Railway Station (YPR) in Bengaluru by 14:00 hrs for smooth check-in formalities and luggage handling. Experience a traditional South Indian reception with fragrant jasmine garlands, rhythmic chande drum beats, and welcome refreshments at the lounge.",
                "Evening: Board The Golden Chariot and meet your personal carriage attendant. Settle into your air-conditioned Deluxe Cabin as the train departs Bengaluru and journeys southward into Karnataka's heritage heartland. Savor an inaugural multi-course dinner in the Ruchi and Nalapaka restaurant cars."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Nanjangud",
            "meals": "Dinner Included"
        },
        {
            "day": 2,
            "title": "Bandipur National Park & Mysore – Tiger Reserve Safari & Amba Vilas Palace",
            "paragraphs": [
                "Early Morning: Wake up early for hot tea and morning biscuits before setting off around 06:00 hrs for an open-top gypsy safari into Bandipur National Park. Keep your camera ready to spot wild herds of Asian elephants, spotted deer, Indian gaur, and if you are fortunate, a Bengal tiger or leopard in the dry deciduous teak forests.",
                "Afternoon: Return to the train for a hearty breakfast as it proceeds toward Mysore. Savor lunch on board, then step out to visit the grand Mysore Palace (Amba Vilas). Walk through the Durbar Hall with its stained-glass ceilings, carved rosewood doors, and solid silver thrones.",
                "Evening: Visit the island fortress town of Srirangapatna, once the seat of Tipu Sultan. Return to the train in time for drinks at the Madira Lounge Bar and a royal dinner prepared by master chefs."
            ],
            "overnight": "Overnight aboard The Golden Chariot parked at Mysore",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 3,
            "title": "Halebidu & Chikmagalur – Hoysala Temples & Coffee Plantation Walk",
            "paragraphs": [
                "Morning: Enjoy breakfast on board as the train arrives at Banavar / Hassan. Depart by air-conditioned coach to the 12th-century temple town of Halebidu. Marvel at the intricate star-shaped layout of Hoysaleswara Temple, renowned worldwide for its chloritic schist stone carvings of dancing celestial apsaras, charging elephants, and epic legends.",
                "Afternoon: Continue toward Chikmagalur, the historic birthplace of coffee in India. Stroll through shade-grown Arabica and Robusta estates under the canopy of towering silver oak trees. Learn the art of coffee bean harvesting and roasting, followed by a freshly brewed tasting session and high tea at a serene plantation retreat.",
                "Evening: Return to the train at sunset. Unwind with an Ayurvedic foot therapy at the Arogya Spa or enjoy South Indian delicacies as the train heads north toward Hampi."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Hosapete",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 4,
            "title": "Hampi – The Lost Vijayanagara Empire & Vittala Stone Chariot",
            "paragraphs": [
                "Morning: Wake up at Hosapete railway station, the gateway to UNESCO World Heritage site Hampi. After breakfast on board, head out to explore the boulder-strewn ruins of the 14th-century Vijayanagara Empire. Visit the towering Virupaksha Temple on the banks of the Tungabhadra River and the massive monolithic Kadalekalu Ganesha.",
                "Afternoon: Return to the train for a relaxed lunch during the heat of midday. Later in the afternoon, return to Hampi to explore the iconic Vijaya Vittala Temple complex, famous for its musical pillars and the monolithic Stone Chariot that serves as the emblem of The Golden Chariot train.",
                "Evening: Return to the train for a farewell dinner to Karnataka heritage as the train begins its westward journey across the Western Ghats into coastal Goa."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Goa",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 5,
            "title": "Goa – Old Goa Cathedrals, Spice Plantation & Farewell Gala",
            "paragraphs": [
                "Morning: Wake up to lush tropical greenery as the train pulls into Goa. After a leisurely breakfast, set out to explore the UNESCO-listed churches of Old Goa, including the 16th-century Basilica of Bom Jesus (holding the sacred relics of St. Francis Xavier) and the towering Se Cathedral.",
                "Afternoon: Visit a traditional Goan spice plantation in Ponda. Enjoy a traditional Goan buffet lunch served on fresh banana leaves, featuring local coastal specialties and coconut curries, accompanied by a guided walk through fragrant groves of vanilla, cardamom, and betel nut.",
                "Evening: Return to the train to freshen up. In the evening, enjoy a special Goan cultural music and dance performance paired with fine wine and a celebratory farewell dinner at the Madira Lounge."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Bengaluru",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 6,
            "title": "Bengaluru – Farewell & Deboarding at Yeshwantpur (YPR)",
            "paragraphs": [
                "Morning: Breakfast is served in the dining cars as The Golden Chariot glides back into Bengaluru. The train arrives at Yeshwantpur Railway Station around 08:30 hrs. Complete deboarding formalities, bid farewell to your carriage attendants and train staff, and depart with unforgettable memories of South India's royal kingdoms."
            ],
            "overnight": "",
            "meals": "Breakfast Included"
        }
    ]

    gc_pride_departures = [
        ("October 2026", "24 Oct 2026 (Saturday)"),
        ("November 2026", "14 Nov 2026 (Saturday)"),
        ("December 2026", "26 Dec 2026 (Saturday)"),
        ("January 2027", "02 Jan 2027 (Saturday), 30 Jan 2027 (Saturday)"),
        ("February 2027", "27 Feb 2027 (Saturday)"),
        ("March 2027", "13 Mar 2027 (Saturday)")
    ]

    gc_pride_prices = {
        "usd": {"deluxe_twin": "$5,000", "deluxe_single": "$3,800"},
        "inr": {"deluxe_twin": "₹4,87,500", "deluxe_single": "₹3,70,500"}
    }

    gc_pride_faqs = [
        {"q": "Where does the Pride of Karnataka journey begin and conclude?",
         "a": "The journey starts and ends at Yeshwantpur Railway Station (YPR) in Bengaluru. Guest registration opens at 14:00 hrs on scheduled Saturdays, and the train returns by 08:30 hrs on the following Thursday."},
        {"q": "Is the Bandipur National Park jungle safari suitable for seniors?",
         "a": "Yes. Guests are driven in open-top 4x4 forest department vehicles with trained naturalists. The terrain is manageable, and our dedicated carriage attendants provide warm blankets and bottled water for the early morning drive."},
        {"q": "What is the dress code for temple visits in Halebidu and Hampi?",
         "a": "Modest, comfortable cotton clothing covering shoulders and knees is recommended. Shoes must be removed before entering active temple sanctums; wearing slip-on footwear or socks is very convenient on warm stone floors."},
        {"q": "Are alcoholic beverages included during meals?",
         "a": "Yes, house brands of Indian wines, beers, and select spirits are complimentary throughout your rail journey in the dining cars and Madira Lounge Bar. Premium imported labels can be purchased separately."},
        {"q": "What deposit is needed to confirm a booking on Pride of Karnataka?",
         "a": "A 20% advance payment confirms your Deluxe Cabin reservation with IRCTC/KSTDC. The remaining 80% balance is payable 30 days before departure."}
    ]

    gc_pride_html = build_koikoi_circuit_page(
        circuit_tag="Circuit 1 · 5 Nights / 6 Days",
        name="Pride of Karnataka",
        duration="5 Nights / 6 Days",
        title="Pride of Karnataka (Bengaluru to Bengaluru · 6D/5N)",
        route="Bengaluru → Bandipur → Mysore → Halebidu → Chikmagalur → Hampi → Goa → Bengaluru",
        origin="Bengaluru (Yeshwantpur YPR)",
        destination="Bengaluru (Yeshwantpur YPR)",
        destinations_count="7 Destinations · Karnataka & Goa",
        starting_price="$5,000 USD / ₹4,87,500 INR",
        hero_imgs=[
            {"src": "/images/luxury-trains/golden-chariot/hero.jpg", "title": "The Golden Chariot Livery"},
            {"src": "/images/luxury-trains/golden-chariot/restaurant-1.jpg", "title": "Ruchi Fine Dining"},
            {"src": "/images/luxury-trains/golden-chariot/double-bed.jpg", "title": "Deluxe Cabin"}
        ],
        highlights=[
            "Open-top 4x4 safari in Bandipur Tiger Reserve tracking wild elephants and leopards",
            "Guided walk through Mysore Palace (Amba Vilas) and royal heritage of Srirangapatna",
            "12th-century Hoysala soapstone temple architecture at Hoysaleswara Temple, Halebidu",
            "Private guided walk in a lush Chikmagalur coffee plantation with high tea",
            "UNESCO World Heritage Vijayanagara ruins, Vittala Temple & Stone Chariot in Hampi",
            "Historic Portuguese churches of Old Goa and traditional Goan spice plantation lunch"
        ],
        overview="The Pride of Karnataka is The Golden Chariot's flagship wildlife and heritage circuit. Departing from Bengaluru on scheduled Saturday evenings, this 6-day journey loops through Karnataka's dense teak forests, Hoysala dynasty temples, and the boulder-strewn ruins of the 14th-century Vijayanagara empire, before unwinding along the golden coast of Goa. Travel comfortably in handcrafted deluxe cabins, enjoy curated regional meals in two ornate restaurant cars, and return to Bengaluru refreshed with memorable stories of South India.",
        days_data=gc_pride_days,
        departures_data=gc_pride_departures,
        price_data=gc_pride_prices,
        faqs_data=gc_pride_faqs,
        train_slug="golden-chariot",
        train_name="The Golden Chariot",
        inc_exc_html=gc_inc_exc_snippet
    )

    write_page(f"{base_dir}/golden-chariot/pride-of-karnataka/index.html",
               "Pride of Karnataka Itinerary (Bengaluru to Goa · 6D/5N) | The Golden Chariot | KoiKoi Travel",
               "Official 6-day itinerary for Pride of Karnataka aboard The Golden Chariot: Bandipur safari, Mysore Palace, Halebidu, Hampi ruins, and Old Goa.",
               gc_pride_html, active_train="golden-chariot", active_tab="itinerary", base_path=base_path)

    # ================= 2. JEWELS OF SOUTH (5N/6D) =================
    gc_jewels_days = [
        {
            "day": 1,
            "title": "Bengaluru – Welcome Ceremony & Departure for Mysore",
            "paragraphs": [
                "Afternoon: Check in at Yeshwantpur Railway Station (YPR) in Bengaluru by 14:00 hrs. Enjoy a warm South Indian welcome with fresh garlands and traditional music. Board The Golden Chariot and relax in your Deluxe Cabin.",
                "Evening: As the train departs southward toward Mysore, attend a safety and itinerary briefing at the Madira Lounge. Savor a royal multi-course dinner at the Ruchi and Nalapaka dining cars."
            ],
            "overnight": "Overnight aboard The Golden Chariot parked at Mysore",
            "meals": "Dinner Included"
        },
        {
            "day": 2,
            "title": "Mysore & Srirangapatna – Amba Vilas Palace & Tipu Sultan's Legacy",
            "paragraphs": [
                "Morning: Breakfast on board followed by a guided visit to Mysore Palace (Amba Vilas). Walk through the breathtaking Kalyana Mantapa (marriage pavilion), the peacock-tiled courtyards, and the private royal portrait galleries.",
                "Afternoon: Lunch on board the train. In the afternoon, travel to the river island fortress of Srirangapatna to visit Dariya Daulat Bagh (Tipu Sultan's Summer Palace made of teakwood) and the historic Gumbaz mausoleum.",
                "Evening: Enjoy high tea and free time to explore local Mysore silk or sandalwood stalls. Reboard the train for dinner as it journeys east toward Tamil Nadu."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Chengalpattu / Kanchipuram",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 3,
            "title": "Kanchipuram & Mahabalipuram – Silk Weavers & UNESCO Shore Temple",
            "paragraphs": [
                "Morning: Early morning arrival in Chengalpattu. After breakfast on board, drive to the holy temple city of Kanchipuram. Visit an authentic silk weaving cooperative to see master artisans weave pure mulberry silk and gold zari sarees on pit looms. Explore the historic Ekambareswarar Temple courtyards.",
                "Afternoon: Drive to the coastal town of Mahabalipuram for lunch at a luxury seaside resort. In the afternoon, explore the 7th-century UNESCO World Heritage rock carvings: the Shore Temple overlooking the Bay of Bengal, the monolithic Five Rathas, and the colossal open-air bas-relief of Arjuna's Penance.",
                "Evening: Return to the train for dinner as it journeys south into the heartland of the Chola kingdom."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Thanjavur",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 4,
            "title": "Thanjavur & Chettinad – The Great Living Chola Temple & Merchant Mansions",
            "paragraphs": [
                "Morning: Arrive in Thanjavur. After breakfast on board, visit the majestic 11th-century Brihadisvara Temple (the Big Temple), built by Emperor Rajaraja Chola I. Admire the 216-foot granite vimana tower and the massive single-stone Nandi bull carved from black granite.",
                "Afternoon: Reboard the train for lunch as it glides toward Chettinad. Step off to explore the palatial mansions built by 19th-century Chettiar traders, featuring Burmese teak columns, Italian marble, and Belgian mirrors. Witness the traditional craft of handmade Athangudi patterned floor tiles.",
                "Evening: Enjoy a traditional Chettinad coffee and regional snack experience before returning to the train. Savor dinner on board while traveling west toward the tropical coast of Kerala."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Cochin",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 5,
            "title": "Cochin & Kumarakom – Colonial Fort Kochi & Backwaters Houseboat Cruise",
            "paragraphs": [
                "Morning: Arrive in Cochin. After breakfast on board, head out to explore historic Fort Kochi. Watch local fishermen operate the iconic cantilevered Chinese fishing nets along the shore, and visit the 16th-century Mattancherry Dutch Palace with its vibrant murals, and the historic Jewish Synagogue in Jew Town.",
                "Afternoon: Drive through emerald coconut groves to Kumarakom on the banks of Vembanad Lake. Board a traditional thatched-roof Kerala kettuvallam (houseboat) for a peaceful cruise through tranquil canals, enjoying fresh coconut water and local Kerala delicacies served on board.",
                "Evening: Return to The Golden Chariot to freshen up. In the evening, gather for the train captain's gala farewell dinner with wine pairings as the train begins its overnight return journey to Bengaluru."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Bengaluru",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 6,
            "title": "Bengaluru – Morning Return & Deboarding at Yeshwantpur (YPR)",
            "paragraphs": [
                "Morning: Enjoy your final breakfast in the dining car as the train crosses Karnataka's southern plains. Arrive at Yeshwantpur Railway Station (YPR) in Bengaluru by 08:30 hrs. Bid farewell to the hospitality team and conclude your royal Southern journey."
            ],
            "overnight": "",
            "meals": "Breakfast Included"
        }
    ]

    gc_jewels_departures = [
        ("November 2026", "28 Nov 2026 (Saturday)"),
        ("February 2027", "20 Feb 2027 (Saturday)"),
        ("March 2027", "27 Mar 2027 (Saturday)")
    ]

    gc_jewels_prices = {
        "usd": {"deluxe_twin": "$5,000", "deluxe_single": "$3,800"},
        "inr": {"deluxe_twin": "₹4,87,500", "deluxe_single": "₹3,70,500"}
    }

    gc_jewels_faqs = [
        {"q": "Which states are covered during the Jewels of South circuit?",
         "a": "Jewels of South traverses three culturally rich southern states: Karnataka (Bengaluru & Mysore), Tamil Nadu (Kanchipuram, Mahabalipuram, Thanjavur & Chettinad), and Kerala (Cochin & Kumarakom)."},
        {"q": "Is the Kerala houseboat cruise included in the ticket?",
         "a": "Yes, a private group houseboat excursion through the backwaters of Kumarakom with refreshments and local snacks is fully included in the ticket price."},
        {"q": "Can travelers purchase authentic Kanchipuram silk sarees during the tour?",
         "a": "Yes. The excursion visits authentic weaver cooperatives where you can observe pure mulberry silk handloom weaving and purchase certified Silk Mark sarees directly from artisan weavers."},
        {"q": "What type of food is served in the Chettinad and Kerala sectors?",
         "a": "The train chefs and partner heritage hotels prepare authentic regional specialties such as Chettinad pepper curries, Malabar fish curries, and appams, along with a wide choice of Continental, North Indian, and vegetarian dishes."},
        {"q": "How does KoiKoi Travel help with international flights and Bengaluru hotels?",
         "a": "We coordinate complete end-to-end luxury travel: pre-tour stays at top five-star hotels in Bengaluru (like The Leela Palace or Taj West End), private chauffeur airport transfers, and post-tour extensions."}
    ]

    gc_jewels_html = build_koikoi_circuit_page(
        circuit_tag="Circuit 2 · 5 Nights / 6 Days",
        name="Jewels of South",
        duration="5 Nights / 6 Days",
        title="Jewels of South (Bengaluru to Bengaluru · 6D/5N)",
        route="Bengaluru → Mysore → Kanchipuram & Mahabalipuram → Thanjavur & Chettinad → Cochin & Kumarakom → Bengaluru",
        origin="Bengaluru (Yeshwantpur YPR)",
        destination="Bengaluru (Yeshwantpur YPR)",
        destinations_count="8 Destinations · Karnataka, Tamil Nadu & Kerala",
        starting_price="$5,000 USD / ₹4,87,500 INR",
        hero_imgs=[
            {"src": "/images/luxury-trains/golden-chariot/restaurant-1.jpg", "title": "Nalapaka Dining Car"},
            {"src": "/images/luxury-trains/golden-chariot/bar.jpg", "title": "Madira Lounge Bar"},
            {"src": "/images/luxury-trains/golden-chariot/hero.jpg", "title": "The Golden Chariot Livery"}
        ],
        highlights=[
            "Guided visit to Mysore Palace (Amba Vilas) and royal Srirangapatna mausoleum",
            "World-famous silk weaving traditions and historic temple courtyards in Kanchipuram",
            "UNESCO monolithic Shore Temple and 7th-century bas-reliefs in Mahabalipuram",
            "11th-century Chola granite architecture at the monumental Brihadisvara Temple, Thanjavur",
            "Palatial heritage mansions, Athangudi handmade tiles, and spicy culinary lunch in Chettinad",
            "Historic Fort Kochi Chinese fishing nets and tranquil sunset houseboat cruise on Kerala backwaters"
        ],
        overview="The Jewels of South is an unforgettable rail expedition spanning Karnataka, Tamil Nadu, and Kerala. Designed for travelers passionate about classical Dravidian temple architecture, royal palaces, handloom silk crafts, and serene backwater waterways, this 6-day circuit connects the royal seat of Mysore, the Pallava rock sculptures of Mahabalipuram, the great Chola temples of Thanjavur, the palatial merchant estates of Chettinad, and the tropical palm-fringed backwaters of Kerala.",
        days_data=gc_jewels_days,
        departures_data=gc_jewels_departures,
        price_data=gc_jewels_prices,
        faqs_data=gc_jewels_faqs,
        train_slug="golden-chariot",
        train_name="The Golden Chariot",
        inc_exc_html=gc_inc_exc_snippet
    )

    write_page(f"{base_dir}/golden-chariot/jewels-of-south/index.html",
               "Jewels of South Itinerary (Karnataka, Tamil Nadu & Kerala · 6D/5N) | The Golden Chariot | KoiKoi Travel",
               "Official 6-day itinerary for Jewels of South aboard The Golden Chariot: Mysore, Mahabalipuram shore temples, Thanjavur, Chettinad mansions, and Kerala backwaters.",
               gc_jewels_html, active_train="golden-chariot", active_tab="itinerary", base_path=base_path)

    # ================= 3. GLIMPSES OF KARNATAKA (3N/4D) =================
    gc_glimpses_days = [
        {
            "day": 1,
            "title": "Bengaluru – Welcome Ceremony & Boarding at Yeshwantpur (YPR)",
            "paragraphs": [
                "Afternoon: Gather at Yeshwantpur Railway Station (YPR) in Bengaluru by 14:00 hrs. Enjoy traditional welcome ceremonies with marigold garlands and shehnai music. Settle into your handcrafted Deluxe Cabin aboard The Golden Chariot.",
                "Evening: As the train departs for Nanjangud, meet the train manager and your carriage butler. Savor a four-course dinner in the Ruchi and Nalapaka dining cars featuring authentic regional Karnataka and continental specialties."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Nanjangud",
            "meals": "Dinner Included"
        },
        {
            "day": 2,
            "title": "Bandipur Tiger Reserve & Mysore – Jungle Safari & Royal Palace",
            "paragraphs": [
                "Early Morning: Depart at 06:00 hrs for an open-top gypsy safari into Bandipur National Park. Keep an eye out for wild herds of Asian elephants, sloth bears, Indian gaurs, and elusive leopards roaming the forest.",
                "Afternoon: Return to the train for a hearty breakfast as it proceeds to Mysore. After lunch on board, embark on an excursion to the grand Mysore Palace (Amba Vilas), admiring its silver doors, Belgian mirrors, and grand Durbar Hall.",
                "Evening: Visit Srirangapatna to see the historic island fortifications and Dariya Daulat Bagh. Return to the train for cocktails at the Madira Lounge Bar and a royal dinner as the train journeys north toward Hampi."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Hosapete",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 3,
            "title": "Hampi – The Ancient Vijayanagara Ruins & Stone Chariot",
            "paragraphs": [
                "Morning: Breakfast on board as the train arrives at Hosapete. Drive to UNESCO World Heritage site Hampi to explore the sacred center, including the active 7th-century Virupaksha Temple, Hemakuta Hill, and the massive monolithic Ganesha statues.",
                "Afternoon: Return to the train to escape the midday heat and enjoy a relaxed lunch in the dining car. In the afternoon, return to Hampi to tour the Royal Enclosure, the Queens Bath, Lotus Mahal, and the celebrated Vijaya Vittala Temple with its monolithic Stone Chariot.",
                "Evening: Return to the train for a festive farewell dinner with house wines and local entertainment as The Golden Chariot travels south back to Bengaluru."
            ],
            "overnight": "Overnight aboard The Golden Chariot en route to Bengaluru",
            "meals": "Breakfast, Lunch & Dinner Included"
        },
        {
            "day": 4,
            "title": "Bengaluru – Morning Return & Deboarding at Yeshwantpur (YPR)",
            "paragraphs": [
                "Morning: Breakfast is served in the dining cars as the train arrives at Yeshwantpur Railway Station (YPR) in Bengaluru around 08:30 hrs. Bid farewell to the hospitality team and deboard with wonderful memories of Karnataka's grand heritage."
            ],
            "overnight": "",
            "meals": "Breakfast Included"
        }
    ]

    gc_glimpses_departures = [
        ("October 2026", "31 Oct 2026 (Saturday)"),
        ("December 2026", "19 Dec 2026 (Saturday)"),
        ("February 2027", "06 Feb 2027 (Saturday)")
    ]

    gc_glimpses_prices = {
        "usd": {"deluxe_twin": "$3,400", "deluxe_single": "$2,600"},
        "inr": {"deluxe_twin": "₹3,31,500", "deluxe_single": "₹2,53,500"}
    }

    gc_glimpses_faqs = [
        {"q": "What makes Glimpses of Karnataka the best choice for busy travelers?",
         "a": "At 3 Nights / 4 Days (Saturday afternoon to Tuesday morning), it fits neatly into an extended weekend or a busy India itinerary while still covering the premier highlights: Bandipur wildlife, Mysore Palace, and the UNESCO ruins of Hampi."},
        {"q": "Where does Glimpses of Karnataka start and finish?",
         "a": "The journey starts and ends at Yeshwantpur Railway Station (YPR) in Bengaluru, making domestic and international flight connections at Kempegowda International Airport (BLR) straightforward."},
        {"q": "What is the difference in cost between Glimpses and the 6-day Pride of Karnataka?",
         "a": "Glimpses of Karnataka starts at $3,400 USD / ₹3,31,500 INR per person (twin sharing), compared to $5,000 USD / ₹4,87,500 INR for the 6-day Pride of Karnataka."},
        {"q": "Are Bandipur safari permits and Hampi entry tickets included?",
         "a": "Yes, all park permits, open-jeep safari vehicles with licensed forest department naturalists, and monument entrance fees are fully covered in the tour fare."},
        {"q": "What happens if a solo traveler wants to book this journey?",
         "a": "Solo travelers pay the single supplement tariff ($2,600 USD / ₹2,53,500 INR) for dedicated private occupancy of an entire Deluxe Cabin with double or twin bed."}
    ]

    gc_glimpses_html = build_koikoi_circuit_page(
        circuit_tag="Circuit 3 · 3 Nights / 4 Days",
        name="Glimpses of Karnataka",
        duration="3 Nights / 4 Days",
        title="Glimpses of Karnataka (Bengaluru to Bengaluru · 4D/3N)",
        route="Bengaluru → Bandipur National Park → Mysore → Hampi → Bengaluru",
        origin="Bengaluru (Yeshwantpur YPR)",
        destination="Bengaluru (Yeshwantpur YPR)",
        destinations_count="4 Destinations · Karnataka",
        starting_price="$3,400 USD / ₹3,31,500 INR",
        hero_imgs=[
            {"src": "/images/luxury-trains/golden-chariot/double-bed.jpg", "title": "Deluxe Twin Cabin"},
            {"src": "/images/luxury-trains/golden-chariot/restaurant-2.jpg", "title": "Ruchi Dining Car"},
            {"src": "/images/luxury-trains/golden-chariot/hero.jpg", "title": "The Golden Chariot in Karnataka"}
        ],
        highlights=[
            "Early morning open-top safari inside Bandipur Tiger Reserve tracking elephants & leopards",
            "Guided tour of the grand Mysore Palace (Amba Vilas) and royal heritage of Tipu Sultan",
            "Full-day exploration of UNESCO World Heritage Hampi, Virupaksha Temple & boulder landscape",
            "Famous Stone Chariot and musical pillars at Vittala Temple complex",
            "All gourmet dining, South Indian delicacies, and complimentary house beverages on board",
            "Compact 4-day royal weekend itinerary designed for time-conscious travelers"
        ],
        overview="Glimpses of Karnataka is The Golden Chariot's signature 4-day short royal getaway, created for travelers who want to experience South India's top heritage and wildlife highlights in a single extended weekend. Departing Bengaluru on Saturday afternoon, the train takes you deep into the teak jungles of Bandipur Tiger Reserve, visits the royal Mysore Palace, and explores the stone marvels of the 14th-century Vijayanagara empire at Hampi, before returning to Bengaluru on Tuesday morning.",
        days_data=gc_glimpses_days,
        departures_data=gc_glimpses_departures,
        price_data=gc_glimpses_prices,
        faqs_data=gc_glimpses_faqs,
        train_slug="golden-chariot",
        train_name="The Golden Chariot",
        inc_exc_html=gc_inc_exc_snippet
    )

    write_page(f"{base_dir}/golden-chariot/glimpses-of-karnataka/index.html",
               "Glimpses of Karnataka Itinerary (Bengaluru to Hampi · 4D/3N) | The Golden Chariot | KoiKoi Travel",
               "Official 4-day weekend itinerary for Glimpses of Karnataka aboard The Golden Chariot: Bandipur safari, Mysore Palace, and UNESCO Hampi.",
               gc_glimpses_html, active_train="golden-chariot", active_tab="itinerary", base_path=base_path)

    # ================= 4. REVAMPED MASTER ITINERARY HUB PAGE =================
    gc_itinerary = f"""
<div style="background:#ffffff;border-bottom:1px solid #e2e8f0;padding:40px 0 36px">
  <div class="wrap">
    <div class="koikoi-breadcrumb" style="margin-bottom:14px">
      <a href="{base_path}" style="color:#64748b;text-decoration:none">Luxury Trains</a>
      <span style="color:#94a3b8;margin:0 6px">›</span>
      <a href="{base_path}/golden-chariot" style="color:#64748b;text-decoration:none">The Golden Chariot</a>
      <span style="color:#94a3b8;margin:0 6px">›</span>
      <span style="color:#0f172a;font-weight:600">All Itineraries</span>
    </div>
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap">
      <span style="background:rgba(248,144,77,0.12);color:#d96b27;border:1px solid rgba(248,144,77,0.25);font-family:'Outfit',sans-serif;font-weight:700;font-size:12.5px;padding:5px 14px;border-radius:999px">
        3 SIGNATURE CIRCUITS
      </span>
      <span style="color:#64748b;font-size:13.5px;font-weight:600">Departures from Bengaluru (Yeshwantpur YPR) · Season 2026–2027</span>
    </div>
    <h1 style="font-family:'Outfit',sans-serif;font-size:clamp(28px,3.8vw,44px);font-weight:800;color:#0f172a;line-height:1.2;margin:0 0 14px">
      The Golden Chariot <span style="color:#F8904D">Itineraries</span>
    </h1>
    <p style="color:#475569;font-size:16px;max-width:1020px;line-height:1.75;margin:0">
      South India's only luxury train offers three handcrafted journeys starting from Bengaluru. Choose from two 6-day grand expeditions exploring Karnataka's ancient kingdoms or Tamil Nadu and Kerala's temples and backwaters, or select a focused 4-day royal weekend covering Bandipur, Mysore, and Hampi.
    </p>
  </div>
</div>

<section style="padding:48px 0 80px;background:#fcfbf9">
  <div class="wrap">
    
    <!-- 1. The 3 Circuit Cards Grid -->
    <div style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:24px;text-align:left">
        <div class="eyebrow" style="color:#d96b27">Choose Your Route</div>
        <h2 style="font-size:clamp(24px,2.8vw,36px);font-family:'Outfit',sans-serif;font-weight:800;color:#0f172a;text-align:left">
          3 Handcrafted <span style="color:#F8904D">Southern Journeys</span>
        </h2>
        <p style="max-width:860px;margin:8px 0 0;color:#64748b;font-size:15px;line-height:1.6;text-align:left">
          Click below to explore day-by-day sightseeing, inclusions, published tariffs, and scheduled Saturday departures.
        </p>
      </div>
      {get_gc_cards_component()}
    </div>

    <!-- 2. Circuit Comparison Matrix -->
    <div id="comparison" style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:24px;text-align:left">
        <div class="eyebrow" style="color:#d96b27">Route Comparison</div>
        <h2 style="font-size:clamp(24px,2.8vw,36px);font-family:'Outfit',sans-serif;font-weight:800;color:#0f172a;text-align:left">
          Compare <span style="color:#F8904D">Golden Chariot Circuits</span>
        </h2>
        <p style="max-width:860px;margin:8px 0 0;color:#64748b;font-size:15px;line-height:1.6;text-align:left">
          Side-by-side comparison of duration, destinations, wildlife experiences, and published tariffs to help you choose the right journey.
        </p>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.03)">
        <div style="overflow-x:auto">
          <table class="circuit-price-table">
            <thead>
              <tr>
                <th style="width:25%;text-align:left">Key Features</th>
                <th style="width:25%;text-align:center">Pride of Karnataka</th>
                <th style="width:25%;text-align:center">Jewels of South</th>
                <th style="width:25%;text-align:center">Glimpses of Karnataka</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight:600">Journey Duration</td>
                <td style="text-align:center;font-weight:700;color:#0f172a">5 Nights / 6 Days</td>
                <td style="text-align:center;font-weight:700;color:#0f172a">5 Nights / 6 Days</td>
                <td style="text-align:center;font-weight:700;color:#0f172a">3 Nights / 4 Days</td>
              </tr>
              <tr>
                <td style="font-weight:600">Start &amp; Finish</td>
                <td style="text-align:center">Bengaluru (Yeshwantpur YPR)</td>
                <td style="text-align:center">Bengaluru (Yeshwantpur YPR)</td>
                <td style="text-align:center">Bengaluru (Yeshwantpur YPR)</td>
              </tr>
              <tr>
                <td style="font-weight:600">States Covered</td>
                <td style="text-align:center">Karnataka &amp; Goa</td>
                <td style="text-align:center">Karnataka, Tamil Nadu &amp; Kerala</td>
                <td style="text-align:center">Karnataka</td>
              </tr>
              <tr>
                <td style="font-weight:600">Wildlife &amp; Nature</td>
                <td style="text-align:center">Bandipur Tiger Safari &amp; Coffee Plantation</td>
                <td style="text-align:center">Kerala Backwaters &amp; Kumarakom Canals</td>
                <td style="text-align:center">Bandipur Tiger Safari</td>
              </tr>
              <tr>
                <td style="font-weight:600">UNESCO World Heritage</td>
                <td style="text-align:center">Hampi (Vijayanagara) &amp; Churches of Old Goa</td>
                <td style="text-align:center">Mahabalipuram Shore Temples &amp; Thanjavur Chola Temple</td>
                <td style="text-align:center">Hampi (Vijayanagara Ruins &amp; Stone Chariot)</td>
              </tr>
              <tr>
                <td style="font-weight:600">Cultural &amp; City Highlights</td>
                <td style="text-align:center">Mysore Palace, Halebidu Hoysala Temple, Chikmagalur</td>
                <td style="text-align:center">Kanchipuram Silk, Chettinad Mansions, Fort Kochi</td>
                <td style="text-align:center">Mysore Palace &amp; Srirangapatna</td>
              </tr>
              <tr>
                <td style="font-weight:600">Deluxe Twin Tariff</td>
                <td style="text-align:center;font-weight:800;color:#d96b27">$5,000 USD / ₹4,87,500 INR</td>
                <td style="text-align:center;font-weight:800;color:#d96b27">$5,000 USD / ₹4,87,500 INR</td>
                <td style="text-align:center;font-weight:800;color:#d96b27">$3,400 USD / ₹3,31,500 INR</td>
              </tr>
              <tr>
                <td style="font-weight:600">Single Supplement</td>
                <td style="text-align:center;color:#64748b">$3,800 USD / ₹3,70,500 INR</td>
                <td style="text-align:center;color:#64748b">$3,800 USD / ₹3,70,500 INR</td>
                <td style="text-align:center;color:#64748b">$2,600 USD / ₹2,53,500 INR</td>
              </tr>
              <tr>
                <td style="font-weight:600">Detailed Itinerary</td>
                <td style="text-align:center"><a href="{base_path}/golden-chariot/pride-of-karnataka" style="display:inline-block;padding:6px 14px;background:#0f172a;color:#fff;border-radius:6px;font-size:12.5px;font-weight:700;text-decoration:none">View Route &rarr;</a></td>
                <td style="text-align:center"><a href="{base_path}/golden-chariot/jewels-of-south" style="display:inline-block;padding:6px 14px;background:#0f172a;color:#fff;border-radius:6px;font-size:12.5px;font-weight:700;text-decoration:none">View Route &rarr;</a></td>
                <td style="text-align:center"><a href="{base_path}/golden-chariot/glimpses-of-karnataka" style="display:inline-block;padding:6px 14px;background:#0f172a;color:#fff;border-radius:6px;font-size:12.5px;font-weight:700;text-decoration:none">View Route &rarr;</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 3. Inclusions & Exclusions -->
    <div style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:24px;text-align:left">
        <div class="eyebrow" style="color:#d96b27">All-Inclusive Journey</div>
        <h2 style="font-size:clamp(24px,2.8vw,36px);font-family:'Outfit',sans-serif;font-weight:800;color:#0f172a;text-align:left">
          What Is Included In <span style="color:#F8904D">Your Golden Chariot Fare</span>
        </h2>
        <p style="max-width:860px;margin:8px 0 0;color:#64748b;font-size:15px;line-height:1.6;text-align:left">
          From dining cars to wildlife safaris and monument admissions, here is what your luxury ticket covers.
        </p>
      </div>
      {gc_inc_exc_snippet}
    </div>

    <!-- 4. Simple Booking Steps -->
    <div style="margin-bottom:64px">
      <div class="sec-head" style="margin-bottom:28px;text-align:left">
        <div class="eyebrow" style="color:#d96b27">How It Works</div>
        <h2 style="font-size:clamp(24px,2.8vw,36px);font-family:'Outfit',sans-serif;font-weight:800;color:#0f172a;text-align:left">
          3 Simple Steps to <span style="color:#F8904D">Reserve Your Cabin</span>
        </h2>
        <p style="max-width:860px;margin:8px 0 0;color:#64748b;font-size:15px;line-height:1.6;text-align:left">
          Simple booking process with transparent pricing and direct support from our specialist travel team.
        </p>
      </div>

      <div class="step-grid">
        <div class="step" style="border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div class="n" style="color:#d96b27">01</div>
          <h3 style="color:#0f172a">Select Your Circuit &amp; Preferred Date</h3>
          <p style="color:#64748b">Tell us which circuit you prefer (Pride of Karnataka, Jewels of South, or Glimpses of Karnataka) and your target departure date.</p>
        </div>
        <div class="step" style="border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div class="n" style="color:#d96b27">02</div>
          <h3 style="color:#0f172a">Live Cabin Check &amp; Official Itemized Quote</h3>
          <p style="color:#64748b">We confirm live cabin availability directly with IRCTC and share a transparent quote including GST, cabin type, and optional hotel add-ons.</p>
        </div>
        <div class="step" style="border:1px solid #e2e8f0;background:#fff;box-shadow:0 4px 16px rgba(0,0,0,0.03)">
          <div class="n" style="color:#d96b27">03</div>
          <h3 style="color:#0f172a">Reserve with 20% Deposit</h3>
          <p style="color:#64748b">Secure your cabin with a 20% advance payment. The remaining 80% balance is payable 30 days prior to departure.</p>
        </div>
      </div>
    </div>

    <!-- 5. Centered Helpful FAQs -->
    <div id="faq">
      <div class="sec-head center" style="margin-bottom:28px;text-align:center;max-width:850px;margin-left:auto;margin-right:auto">
        <span style="color:#F8904D;font-family:'Outfit',sans-serif;font-size:12px;font-weight:800;letter-spacing:1px;text-transform:uppercase;display:block;margin-bottom:6px">HELPFUL INFORMATION</span>
        <h2 style="font-family:'Outfit',sans-serif;font-size:clamp(24px,2.8vw,34px);font-weight:800;color:#0f172a;margin:0 0 8px;text-align:center">
          Frequently Asked Questions · <span style="color:#F8904D">The Golden Chariot</span>
        </h2>
        <p style="color:#64748b;font-size:14.5px;margin:0;line-height:1.6;text-align:center">
          Everything you need to know about route differences, boarding logistics, dining, and reservations.
        </p>
      </div>

      <div class="faq" style="background:#fff;border-radius:18px;border:1px solid #e2e8f0;padding:8px 24px;box-shadow:0 4px 16px rgba(0,0,0,0.02)">
        <details open style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">Which Golden Chariot circuit is best for first-time visitors to South India?</summary>
          <div style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">
            For travelers wanting a balanced mix of wildlife, historic monuments, and coastal relaxation, <strong>Pride of Karnataka (5N/6D)</strong> is the top choice because it combines the Bandipur tiger safari, Hoysala architecture, Hampi ruins, and beaches of Goa. If you are specifically interested in grand Dravidian temple architecture and Kerala backwaters, choose <strong>Jewels of South (5N/6D)</strong>.
          </div>
        </details>
        <details style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">Where do the journeys depart from and what time should I arrive?</summary>
          <div style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">
            All journeys begin and end at <strong>Yeshwantpur Railway Station (YPR)</strong> in Bengaluru. Guest registration opens at 14:00 hrs on scheduled Saturday afternoons. We recommend arriving in Bengaluru a day earlier to rest before boarding; KoiKoi Travel can arrange airport pickup and a 5-star hotel stay.
          </div>
        </details>
        <details style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">What is the difference between Pride of Karnataka and Glimpses of Karnataka?</summary>
          <div style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">
            Glimpses of Karnataka (3N/4D) is a condensed version of Pride of Karnataka (5N/6D). It includes Bandipur safari, Mysore Palace, and Hampi, but omits Halebidu, Chikmagalur coffee estates, and Goa. It is ideal for travelers with limited vacation days who want to experience the royal train over an extended weekend.
          </div>
        </details>
        <details style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">What cabin types are available on The Golden Chariot?</summary>
          <div style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">
            The Golden Chariot features 44 elegantly decorated Deluxe Cabins across 11 guest carriages, available in Double Bed and Twin Bed configurations. Each cabin includes a private en-suite bathroom with hot shower, LCD TV, electronic safe, individual climate control, and a dedicated carriage attendant available 24/7.
          </div>
        </details>
        <details style="border-bottom:1px solid #f1f5f9;padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">Can vegetarian, vegan, or Jain meals be arranged?</summary>
          <div style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">
            Yes, absolutely. The two onboard restaurants, Ruchi and Nalapaka, cater to pure vegetarian, vegan, Jain, and gluten-free dietary requirements. Please inform us at the time of reservation so the executive culinary team is prepared before your arrival.
          </div>
        </details>
        <details style="padding:16px 0">
          <summary style="font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;color:#0f172a;cursor:pointer">What is the payment and cancellation policy?</summary>
          <div style="color:#64748b;font-size:14.5px;line-height:1.7;margin:10px 0 0">
            A 20% advance deposit confirms your cabin reservation. The remaining 80% balance is payable 30 days prior to departure. Official IRCTC cancellation terms apply based on the number of days prior to departure.
          </div>
        </details>
      </div>
    </div>

  </div>
</section>
"""

    write_page(f"{base_dir}/golden-chariot/itinerary/index.html",
               "The Golden Chariot Itineraries: Pride of Karnataka, Jewels of South & Glimpses | KoiKoi Travel",
               "Compare all 3 Golden Chariot luxury train itineraries departing from Bengaluru: Pride of Karnataka (6D), Jewels of South (6D), and Glimpses of Karnataka (4D).",
               gc_itinerary, active_train="golden-chariot", active_tab="itinerary", base_path=base_path)

'''

new_code = code[:start_idx] + golden_chariot_content + code[end_idx:]

with open('scripts/generate_luxury_trains_html.py', 'w', encoding='utf-8') as f:
    f.write(new_code)

print("Successfully injected Golden Chariot circuits and revamped gc_itinerary into scripts/generate_luxury_trains_html.py!")
