const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const maharashtraArticle = `<h2>Everything You Need to Know About Maharashtra</h2>
<p>Maharashtra is one of India's most vibrant and exciting states to visit. From the bustling streets of Mumbai to the peaceful hill stations in the Western Ghats, sunny beaches along the Konkan coast, and ancient cave temples, Maharashtra has something special for every traveler.</p>

<h3>Top Places to Visit in Maharashtra</h3>
<ul>
  <li><strong>Mumbai:</strong> Known as the City of Dreams, Mumbai is home to the famous Gateway of India, Marine Drive, film studios, lively markets, and delicious street food.</li>
  <li><strong>Ajanta Caves & Ellora Caves (Aurangabad / Chhatrapati Sambhajinagar):</strong> World-famous rock-cut cave temples with ancient Buddhist wall paintings and the massive Kailasa Temple carved out of a single rock.</li>
  <li><strong>Pune & Historic Forts:</strong> A bustling cultural city surrounded by historic hilltop forts like Sinhagad and Rajgad.</li>
  <li><strong>Lonavala, Khandala & Mahabaleshwar:</strong> Cool, green hill stations famous for scenic viewpoints, waterfalls, fresh strawberry farms, and relaxing weekend getaways.</li>
  <li><strong>Nashik:</strong> The wine capital of India, famous for grape vineyards, wine tasting, and sacred temples near the Godavari River.</li>
  <li><strong>Konkan Beaches:</strong> Beautiful and quiet coastal spots like Alibaug, Ganpatipule, and Tarkarli, great for water sports, scuba diving, and fresh seafood.</li>
  <li><strong>Tadoba National Park:</strong> One of India's best tiger reserves for thrilling jungle safaris and spotting Royal Bengal tigers in the wild.</li>
</ul>

<h3>Best Time to Visit Maharashtra</h3>
<ul>
  <li><strong>October to March (Winter):</strong> The best and most comfortable time to travel anywhere in Maharashtra. The weather is pleasant and cool, perfect for city tours, cave exploration, and wildlife safaris.</li>
  <li><strong>July to September (Monsoon):</strong> If you love lush green mountains, mist, and roaring waterfalls, monsoon is the best time to visit hill stations like Lonavala and Mahabaleshwar.</li>
  <li><strong>April to June (Summer):</strong> Days can be hot, but hill stations remain cool retreats. Early mornings and late afternoons are also great for tiger spotting around waterholes in wildlife parks.</li>
</ul>

<h3>Delicious Local Food to Try</h3>
<p>When in Maharashtra, don't miss out on these mouth-watering local foods:</p>
<ul>
  <li><strong>Famous Street Snacks:</strong> Vada Pav (India's favorite burger), spicy Misal Pav, buttery Pav Bhaji, and fresh Poha.</li>
  <li><strong>Traditional Maharashtrian Dishes:</strong> Sweet Puran Poli, crispy Thalipeeth, and authentic Pithla Bhakri.</li>
  <li><strong>Coastal Flavors:</strong> Fresh Malvani fish curry and refreshing Solkadhi made with coconut milk and kokum.</li>
</ul>

<h3>How to Reach Maharashtra</h3>
<ul>
  <li><strong>By Air:</strong> Mumbai's Chhatrapati Shivaji Maharaj International Airport connects with almost every major city in India and worldwide. Pune and Nagpur also have busy domestic and international airports.</li>
  <li><strong>By Train:</strong> Mumbai and Pune have excellent railway connections across India with express and high-speed trains.</li>
  <li><strong>By Road:</strong> Excellent highways and expressways (like Mumbai-Pune Expressway and Samruddhi Mahamarg) make road trips smooth and quick.</li>
</ul>`;

const madhyaPradeshArticle = `<h2>Everything You Need to Know About Madhya Pradesh</h2>
<p>Located right in the center of India, Madhya Pradesh is often called the "Heart of Incredible India". It is famous for its wild tiger reserves, stunning ancient temples, grand forts, and calm sacred rivers. If you love wildlife, history, and real Indian culture, Madhya Pradesh is a wonderful destination to explore.</p>

<h3>Must-Visit Places in Madhya Pradesh</h3>
<ul>
  <li><strong>Khajuraho:</strong> World-famous for its ancient temple complex, known for intricate stone carvings and stunning traditional Indian temple architecture.</li>
  <li><strong>Orchha:</strong> A peaceful heritage town sitting along the Betwa River, famous for historic palaces like Raja Mahal and the historic Ram Raja Temple.</li>
  <li><strong>Gwalior Fort:</strong> A massive hilltop fortress with royal palaces and musical heritage dating back hundreds of years.</li>
  <li><strong>Bandhavgarh & Kanha National Parks:</strong> India's top tiger reserves where you have the highest chance of seeing wild Royal Bengal tigers on open jeep safaris.</li>
  <li><strong>Panna & Pench National Parks:</strong> Beautiful forests known for tigers, leopards, diverse birdlife, and boat rides on the clean Ken River.</li>
  <li><strong>Ujjain & Omkareshwar:</strong> Holy pilgrimage towns situated on sacred rivers, home to two revered Jyotirlinga temples.</li>
  <li><strong>Bhimbetka & Sanchi Stupa:</strong> Ancient historical treasures featuring thousands-of-years-old rock art and India's oldest Buddhist stone monuments.</li>
  <li><strong>Bhedaghat (Jabalpur):</strong> Stunning white marble rocks rising from the Narmada River and the roaring Dhuandhar waterfall.</li>
</ul>

<h3>Best Time to Visit Madhya Pradesh</h3>
<ul>
  <li><strong>October to March (Winter):</strong> The most popular and pleasant time to visit. Days are sunny and comfortable (10°C to 25°C), making it ideal for safari rides and sightseeing.</li>
  <li><strong>July to September (Monsoon):</strong> Rains bring green scenery to places like Pachmarhi hill station and Mandu, creating scenic views and peaceful getaways.</li>
  <li><strong>April to June (Summer):</strong> While afternoons are hot, summer is prime time for wildlife lovers because tigers and animals gather near waterholes.</li>
</ul>

<h3>Popular Local Food to Enjoy</h3>
<ul>
  <li><strong>Indore Street Food:</strong> Famous Poha Jalebi in the morning, Bhutte Ka Kees, and tasty snacks at the famous Sarafa Night Food Market.</li>
  <li><strong>Traditional Dishes:</strong> Warm Dal Bafla topped with pure ghee, spicy Sev Tamatar curry, and Bhindi fry.</li>
  <li><strong>Sweets:</strong> Mawa Bati, sweet Jalebi, and crispy Gajak.</li>
</ul>

<h3>How to Reach Madhya Pradesh</h3>
<ul>
  <li><strong>By Air:</strong> Regular flights connect Bhopal, Indore, Gwalior, Jabalpur, and Khajuraho with major cities like Delhi and Mumbai.</li>
  <li><strong>By Train:</strong> Being centrally located, MP has huge railway junctions (Bhopal, Jabalpur, Gwalior, Itarsi) with direct trains from all across India.</li>
  <li><strong>By Road:</strong> Wide National Highways connect Madhya Pradesh smoothly with Uttar Pradesh, Rajasthan, and Maharashtra.</li>
</ul>`;

const chandigarhArticle = `<h2>Everything You Need to Know About Chandigarh</h2>
<p>Chandigarh is known as "The City Beautiful" and is India's cleanest and best-planned city. Designed by world-renowned architect Le Corbusier, it is famous for wide tree-lined roads, clean public gardens, modern architecture, and lively Punjabi hospitality. It also serves as the main gateway for travelers heading to the hill stations of Himachal Pradesh and Uttarakhand.</p>

<h3>Top Places to Visit in Chandigarh</h3>
<ul>
  <li><strong>Rock Garden:</strong> A unique and creative art garden built completely from recycled household and industrial waste by Nek Chand.</li>
  <li><strong>Sukhna Lake:</strong> A peaceful lake at the foothills of the Shivalik hills, perfect for morning walks, boating, and watching sunsets.</li>
  <li><strong>Rose Garden:</strong> One of Asia's largest rose gardens, filled with hundreds of colorful rose varieties and lush walking paths.</li>
  <li><strong>Capitol Complex:</strong> A UNESCO World Heritage site showcasing famous modern architecture and the iconic Open Hand Monument.</li>
  <li><strong>Sector 17 Market & Elante Mall:</strong> Great places for shopping, eating Punjabi street snacks, and relaxing with family.</li>
</ul>

<h3>Best Time to Visit Chandigarh</h3>
<ul>
  <li><strong>October to March:</strong> The weather is cool, crisp, and very pleasant, ideal for outdoor walks and sightseeing.</li>
  <li><strong>July to September:</strong> Monsoon brings cool breezes and green gardens.</li>
  <li><strong>April to June:</strong> Summer days are warm, but evenings around Sukhna Lake remain breezy and pleasant.</li>
</ul>

<h3>How to Reach Chandigarh</h3>
<ul>
  <li><strong>By Air:</strong> Chandigarh International Airport has direct flights to major Indian cities.</li>
  <li><strong>By Train:</strong> Fast Vande Bharat and Shatabdi Express trains connect New Delhi to Chandigarh in just over 3 hours.</li>
  <li><strong>By Road:</strong> A smooth 4 to 5 hour drive from Delhi via the wide National Highway (NH 44).</li>
</ul>`;

async function main() {
  console.log("Updating Maharashtra with human-friendly content...");
  await prisma.state.update({
    where: { slug: 'maharashtra' },
    data: {
      moreDescription: maharashtraArticle,
      h1Title: 'Maharashtra Tour Packages - Explore Caves, Forts, Beaches & Wildlife',
      seoTitle: 'Maharashtra Tour Packages | Best Holidays & Sightseeing Tours',
      seoDescription: 'Discover Maharashtra holiday tour packages. Explore Ajanta Ellora Caves, Mumbai, Tadoba Tiger Safari, Mahabaleshwar, Nashik vineyards, and Konkan coast at best prices.'
    }
  });

  console.log("Updating Madhya Pradesh with human-friendly content...");
  await prisma.state.update({
    where: { slug: 'madhya-pradesh' },
    data: {
      moreDescription: madhyaPradeshArticle,
      h1Title: 'Madhya Pradesh Tour Packages - Tiger Reserves, Heritage Temples & Palaces',
      seoTitle: 'Madhya Pradesh Tour Packages | Wildlife Safaris & Heritage Tours',
      seoDescription: 'Book top-rated Madhya Pradesh tour packages. Visit Khajuraho Temples, Orchha, Gwalior Fort, Kanha & Bandhavgarh Tiger Safaris, Sanchi, and Ujjain.'
    }
  });

  console.log("Updating Chandigarh with human-friendly content...");
  await prisma.state.update({
    where: { slug: 'chandigarh' },
    data: {
      moreDescription: chandigarhArticle,
      h1Title: 'Chandigarh Tour Packages - Gateway to Himalayas & The City Beautiful',
      seoTitle: 'Chandigarh Tour Packages | Sightseeing & Gateway Getaways',
      seoDescription: 'Plan your trip to Chandigarh. Visit the Rock Garden, Sukhna Lake, Rose Garden, and explore curated transit tour packages to Himachal & beyond.'
    }
  });

  console.log("All human-friendly state articles updated successfully in database!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
