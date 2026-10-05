const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const maharashtraArticle = `<h2>Discover Maharashtra: The Gateway to Heritage, Hills, and Coastal Grandeur</h2>
<p>Stretching from the Arabian Sea coastline to the rugged volcanic plateaus of the Deccan, Maharashtra is a land of staggering diversity. Steeped in the legacy of Chhatrapati Shivaji Maharaj, adorned with ancient rock-cut cave temples, draped in mist-covered Western Ghats, and home to India's commercial pulse, Maharashtra delivers unforgettable travel experiences for culture seekers, wildlife lovers, and adventure enthusiasts alike.</p>

<h3>Top Destinations & Tourist Circuits in Maharashtra</h3>
<ul>
  <li><strong>Mumbai:</strong> The City of Dreams showcases Victorian Gothic architecture, the iconic Gateway of India, Marine Drive promenade, Bollywood studios, and vibrant street food hubs.</li>
  <li><strong>Aurangabad (Chhatrapati Sambhajinagar):</strong> The premier heritage hub providing access to the world-renowned UNESCO World Heritage Sites of <strong>Ajanta Caves</strong> (ancient Buddhist fresco art) and <strong>Ellora Caves</strong> (including the monolithic Kailasa Temple).</li>
  <li><strong>Pune & The Sahyadri Forts:</strong> The cultural capital of Maharashtra, surrounded by historic hilltop fortresses like Sinhagad, Rajgad, and Shivneri.</li>
  <li><strong>Lonavala, Khandala & Mahabaleshwar:</strong> Verdant hill stations featuring scenic valley viewpoints, cascading monsoon waterfalls, strawberry farms, and cool mountain breezes.</li>
  <li><strong>Nashik:</strong> The wine capital of India and a revered pilgrimage destination along the sacred Godavari River, known for Sula Vineyards and Trimbakeshwar Jyotirlinga temple.</li>
  <li><strong>Konkan Coast & Goa Border:</strong> Pristine beaches like Alibaug, Ganpatipule, and Tarkarli, renowned for scuba diving, water sports, and fresh coastal Malvani cuisine.</li>
  <li><strong>Tadoba-Andhari National Park & Pench:</strong> Premier wildlife sanctuaries offering thrilling jeep safaris and exceptional Royal Bengal tiger sightings.</li>
</ul>

<h3>Best Time to Visit Maharashtra</h3>
<p>Maharashtra experiences three distinct seasons, each bringing its own charm:</p>
<ul>
  <li><strong>Winter (October to March):</strong> The most pleasant season across the entire state. Ideal for exploring historical caves, sightseeing in Mumbai and Pune, vineyard tours in Nashik, and tiger safaris in Tadoba. Temperatures range between 15°C and 30°C.</li>
  <li><strong>Monsoon (June to September):</strong> Western Ghats and Sahyadri ranges come alive with lush greenery, mist, and spectacular waterfalls. A paradise for trekkers and nature lovers visiting Lonavala, Malshej Ghat, and Mahabaleshwar.</li>
  <li><strong>Summer (April to June):</strong> Hot and dry across the Deccan plateau, but high-altitude hill stations like Mahabaleshwar and Matheran remain comfortable retreats. Ideal time for wildlife sightings as animals gather near waterholes.</li>
</ul>

<h3>Authentic Maharashtrian Cuisine</h3>
<p>From fiery Saoji gravies of Vidarbha to coconut-infused seafood of the Konkan coast, Maharashtrian cuisine is a rich culinary tapestry. Must-try dishes include:</p>
<ul>
  <li><strong>Street Delicacies:</strong> Vada Pav, Misal Pav, Pav Bhaji, and Kanda Poha.</li>
  <li><strong>Traditional Meals:</strong> Puran Poli, Thalipeeth, Pithla Bhakri, and Bharli Vangi (stuffed brinjal).</li>
  <li><strong>Coastal & Non-Vegetarian Specials:</strong> Malvani Fish Curry, Kolhapuri Tambda-Pandhra Rassa, and Solkadhi.</li>
</ul>

<h3>How to Reach Maharashtra</h3>
<p>Maharashtra enjoys superior connectivity with domestic and international transit networks:</p>
<ul>
  <li><strong>By Air:</strong> Chhatrapati Shivaji Maharaj International Airport (BOM) in Mumbai is one of India's busiest aviation hubs. Pune International Airport (PNQ) and Dr. Babasaheb Ambedkar International Airport (NAG) in Nagpur connect major cities globally.</li>
  <li><strong>By Rail:</strong> Chhatrapati Shivaji Maharaj Terminus (CSMT) and Mumbai Central connect the state with every corner of India through high-speed Vande Bharat, Rajdhani, and express trains.</li>
  <li><strong>By Road:</strong> World-class expressways like the Mumbai-Pune Expressway and Hindu Hrudaysamrat Balasaheb Thackeray Samruddhi Mahamarg ensure fast, scenic road journeys.</li>
</ul>`;

const madhyaPradeshArticle = `<h2>Explore Madhya Pradesh: The Heart of Incredible India</h2>
<p>Nestled in the geographic center of India, Madhya Pradesh is a captivating realm where untamed wildlife, timeless stone carvings, medieval citadels, and sacred rivers converge. Celebrated as the Tiger State of India and home to some of the subcontinent's most extraordinary UNESCO World Heritage Sites, Madhya Pradesh invites travelers on an authentic journey through India's spiritual, royal, and natural heritage.</p>

<h3>Must-Visit Tourist Circuits & Iconic Landmarks</h3>
<ul>
  <li><strong>Khajuraho:</strong> Famous worldwide for its UNESCO-listed Hindu and Jain temple complex, celebrated for exquisite nagara-style architecture and intricate erotic sculptures.</li>
  <li><strong>Orchha:</strong> A frozen-in-time medieval town on the banks of the Betwa River, boasting grand palaces like Raja Mahal, Jahangir Mahal, and the revered Ram Raja Temple.</li>
  <li><strong>Gwalior:</strong> Dominated by the majestic hilltop Gwalior Fort (described as 'the pearl amongst fortresses in India'), the regal Jai Vilas Palace, and the mausoleum of musical legend Tansen.</li>
  <li><strong>Bandhavgarh & Kanha National Parks:</strong> World-renowned tiger reserves boasting the highest density of Royal Bengal tigers, lush sal forests, and the inspirations behind Rudyard Kipling's <em>The Jungle Book</em>.</li>
  <li><strong>Panna & Pench National Parks:</strong> Superb wildlife reserves offering leopard sightings, gharial boat safaris on Ken River, and rich birdwatching experiences.</li>
  <li><strong>Ujjain & Omkareshwar:</strong> Revered spiritual centers along the holy Kshipra and Narmada rivers, housing two sacred Jyotirlinga shrines and hosting the legendary Kumbh Mela.</li>
  <li><strong>Bhimbetka & Sanchi:</strong> Remarkable prehistoric rock shelters with 30,000-year-old cave paintings at Bhimbetka and the Great Stupa of Sanchi commissioned by Emperor Ashoka.</li>
  <li><strong>Bhedaghat (Jabalpur):</strong> Spectacular white marble rock canyons carved by the holy Narmada River, alongside the roaring Dhuandhar Falls.</li>
</ul>

<h3>Best Time to Visit Madhya Pradesh</h3>
<p>Planning your journey according to regional seasons ensures the best experience:</p>
<ul>
  <li><strong>Winter (October to March):</strong> The peak tourist season with clear blue skies and crisp, cool weather (10°C to 25°C). Perfect for exploring Khajuraho temples, Orchha palaces, Gwalior Fort, and wildlife safaris.</li>
  <li><strong>Monsoon (July to September):</strong> Rejuvenating rains turn Mandu, Pachmarhi (MP's only hill station), and the national parks into lush green wonderlands. Ideal for romantic retreats and waterfalls.</li>
  <li><strong>Summer (April to June):</strong> Temperatures can soar above 40°C, but this is the prime window for passionate wildlife photographers seeking tiger sightings around diminishing watering holes in Kanha and Bandhavgarh.</li>
</ul>

<h3>Flavors of Madhya Pradesh: Traditional Cuisine</h3>
<p>Madhya Pradesh cuisine blends royal culinary heritage with rustic Central Indian spices:</p>
<ul>
  <li><strong>Indore Street Food:</strong> Poha Jalebi, Bhutte Ka Kees, Garadu, and Khopra Patties at the iconic Sarafa Night Market and 56 Dukaan.</li>
  <li><strong>Malwa & Bundelkhand Classics:</strong> Dal Bafla served with melted ghee, spicy Sev Tamatar, and Chakki Ki Shaak.</li>
  <li><strong>Traditional Sweets:</strong> Mawa Bati, Malpua, and the famous Morena Gajak.</li>
</ul>

<h3>Travel Logistics: How to Reach Madhya Pradesh</h3>
<ul>
  <li><strong>By Air:</strong> Major airports are located in Bhopal (BHO), Indore (IDR), Gwalior (GWL), Jabalpur (JLR), and Khajuraho (HJR), connecting with Delhi, Mumbai, Bengaluru, and Jaipur.</li>
  <li><strong>By Rail:</strong> Being in central India, junctions like Bhopal, Itarsi, Jabalpur, Gwalior, and Katni are among the most connected railway hubs in the nation.</li>
  <li><strong>By Road:</strong> Well-maintained National Highways connect Madhya Pradesh with Uttar Pradesh, Rajasthan, Maharashtra, and Gujarat, offering smooth road trips.</li>
</ul>`;

const chandigarhArticle = `<h2>Experience Chandigarh: The City Beautiful and Modern Masterpiece</h2>
<p>Conceived by the visionary Swiss-French architect Le Corbusier, Chandigarh is India's first planned city—a harmonious fusion of modernist urban architecture, manicured gardens, wide tree-lined boulevards, and vibrant Punjabi culture. Serving as the joint capital of Punjab and Haryana, Chandigarh acts as the premier gateway to Himachal Pradesh, Uttarakhand, and Jammu & Kashmir.</p>

<h3>Top Attractions in Chandigarh</h3>
<ul>
  <li><strong>Rock Garden:</strong> An internationally acclaimed sculpture garden created by Nek Chand entirely out of industrial, ceramic, and domestic recycled waste.</li>
  <li><strong>Sukhna Lake:</strong> A serene 3 sq km rainfed reservoir at the foothills of the Shivalik range, popular for morning walks, boating, and scenic sunset views.</li>
  <li><strong>Zakir Hussain Rose Garden:</strong> Asia's largest rose garden, spanning 30 acres and showcasing more than 1,600 distinct varieties of roses.</li>
  <li><strong>Capitol Complex:</strong> A UNESCO World Heritage Site featuring Le Corbusier's monumental concrete masterpieces including the Secretariat, High Court, and the iconic Open Hand Monument.</li>
  <li><strong>Sector 17 Plaza & Elante Mall:</strong> The shopping, dining, and cultural epicenter of the tri-city region.</li>
</ul>

<h3>Best Time to Visit Chandigarh</h3>
<ul>
  <li><strong>October to March:</strong> Pleasant and cool winter weather (7°C to 23°C) makes it ideal for city sightseeing, garden walks, and stopovers en route to Shimla and Manali.</li>
  <li><strong>April to June:</strong> Warm summer months with temperatures reaching 38°C; evenings remain breezy near Sukhna Lake.</li>
  <li><strong>July to September:</strong> Monsoon season brings refreshing rains, vibrant greenery, and pleasant weather across the Shivalik foothills.</li>
</ul>

<h3>How to Reach Chandigarh</h3>
<ul>
  <li><strong>By Air:</strong> Shaheed Bhagat Singh International Airport (IXC) operates frequent daily flights connecting Delhi, Mumbai, Bengaluru, Dubai, and other major hubs.</li>
  <li><strong>By Rail:</strong> Chandigarh Junction (CDG) is served by high-speed Shatabdi and Vande Bharat Express trains from New Delhi in under 3.5 hours.</li>
  <li><strong>By Road:</strong> Connected by the seamless 8-lane Delhi-Chandigarh Himalayan Expressway (NH 44), making it a convenient 4 to 5 hour drive from Delhi NCR.</li>
</ul>`;

async function main() {
  console.log("Updating Maharashtra...");
  await prisma.state.update({
    where: { slug: 'maharashtra' },
    data: {
      moreDescription: maharashtraArticle,
      h1Title: 'Maharashtra Tour Packages - Explore Caves, Forts, Beaches & Wildlife',
      seoTitle: 'Maharashtra Tour Packages | Best Holidays & Sightseeing Tours',
      seoDescription: 'Discover Maharashtra holiday tour packages. Explore Ajanta Ellora Caves, Mumbai, Tadoba Tiger Safari, Mahabaleshwar, Nashik vineyards, and Konkan coast at best prices.'
    }
  });

  console.log("Updating Madhya Pradesh...");
  await prisma.state.update({
    where: { slug: 'madhya-pradesh' },
    data: {
      moreDescription: madhyaPradeshArticle,
      h1Title: 'Madhya Pradesh Tour Packages - Tiger Reserves, Heritage Temples & Palaces',
      seoTitle: 'Madhya Pradesh Tour Packages | Wildlife Safaris & Heritage Tours',
      seoDescription: 'Book top-rated Madhya Pradesh tour packages. Visit Khajuraho Temples, Orchha, Gwalior Fort, Kanha & Bandhavgarh Tiger Safaris, Sanchi, and Ujjain.'
    }
  });

  console.log("Updating Chandigarh...");
  await prisma.state.update({
    where: { slug: 'chandigarh' },
    data: {
      moreDescription: chandigarhArticle,
      h1Title: 'Chandigarh Tour Packages - Gateway to Himalayas & The City Beautiful',
      seoTitle: 'Chandigarh Tour Packages | Sightseeing & Gateway Getaways',
      seoDescription: 'Plan your trip to Chandigarh. Visit the Rock Garden, Sukhna Lake, Rose Garden, and explore curated transit tour packages to Himachal & beyond.'
    }
  });

  console.log("State updates completed successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
