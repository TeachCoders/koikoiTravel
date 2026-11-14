import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { prisma } from "../utils/prismaConnection.js";

// Helper to count words from HTML content (stripping tags)
function getWordCount(html) {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return text.split(" ").filter(Boolean).length;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. MYSORE CONTENT (Target: 700–900 words, strictly complying with rules)
// ─────────────────────────────────────────────────────────────────────────────
const MYSORE_OVERVIEW = `<p>Mysore, officially Mysuru, stands as one of South India's prominent cultural centers, situated at the base of the Chamundi Hills in southern Karnataka. Renowned for its royal heritage, classical architecture, silk weaving, and sandalwood craft, the city offers travelers an insightful look into centuries of uninterrupted cultural preservation. Planning a visit through comprehensive <a href="/tour-packages/india/karnataka" class="text-primary hover:underline font-medium">Karnataka tour packages</a> allows travelers to experience both the urban heritage of Mysore and the surrounding landscape of South India.</p>

<h3>Mysore Palace: Indo-Saracenic Heritage</h3>
<p>At the center of the city stands the Mysore Palace, also known as the Amba Vilas Palace. Serving as the official residence of the Wadiyar dynasty, the current structure was designed by British architect Henry Irwin and completed in 1912 after the previous wooden palace burned down. The building exemplifies the Indo-Saracenic architectural style, integrating Hindu, Mughal, Rajput, and Gothic architectural traditions into a unified three-story granite edifice topped with deep pink marble domes.</p>
<p>Inside, visitors encounter open courtyards, carved mahogany ceilings, stained-glass pavilions, and glazed ceramic floor tiles imported from England. The Durbar Hall features ornate colonnades, while the Kalyana Mantapa marriage pavilion showcases an octagonal stained-glass ceiling with peacock motifs. A defining spectacle occurs on Sunday evenings and national holidays, when the entire palace exterior is illuminated by nearly one hundred thousand incandescent light bulbs against the night sky, drawing visitors from across the globe.</p>

<h3>Chamundi Hill: Pilgrimage and Panorama</h3>
<p>Rising thirteen kilometers southeast of central Mysore, Chamundi Hill ascends about one thousand meters above sea level and serves as the city's spiritual anchor. Dedicated to the goddess Chamundeshwari, the temple complex at the summit dates back to the twelfth century, later expanded by the Vijayanagara and Wadiyar rulers with a prominent seven-tier gopuram.</p>
<p>Travelers can reach the top by road or by ascending the ancient stone stairway of approximately 1,000 steps constructed in the seventeenth century. About halfway up the stone flight sits a monolithic statue of Nandi, the sacred bull of Shiva, carved out of a single granite boulder and measuring nearly five meters in height. At the hill summit, near the temple entrance, stands the brightly painted statue of Mahishasura, the demon king from whose defeat Mysore takes its historical name. From the summit viewpoints, travelers enjoy panoramic views overlooking Mysore city and the surrounding Deccan plateau.</p>

<h3>Devaraja Market: Silk, Sandalwood, and Spices</h3>
<p>Operating continuously since the reign of Tipu Sultan and formalized in the early twentieth century, Devaraja Market spans a bustling covered street between Dhanvantri Road and Sayyaji Rao Road. Walking along its historic avenues introduces visitors to local commerce and traditional products that define Mysore's trade heritage.</p>
<p>The market is divided into dedicated sections showcasing mounds of colorful kumkum and flower garlands, seasonal fruits, fresh betel leaves, and traditional spices. Nearby emporiums feature certified Mysore silk saris, woven using pure mulberry silk and pure gold zari threads under geographic indication standards. Alongside textiles, Mysore is recognized for its sandalwood tradition, producing fragrant sandalwood oils, natural soaps, and aromatic incense sticks that perfume the market alleys.</p>

<h3>Brindavan Gardens: Landscape and Musical Fountain</h3>
<p>Located twenty kilometers northwest of the city, adjacent to the Krishnarajasagara Dam across the Kaveri River, Brindavan Gardens covers over sixty acres of stepped terrace gardens modeled on the Shalimar Gardens of Kashmir. Built between 1927 and 1932 under the guidance of Sir Mirza Ismail, the garden features expansive green lawns, topiaries, flowering flowerbeds, and ornate water channels.</p>
<p>The primary attraction in the evenings is the synchronized musical fountain, where lit water jets dance in rhythm with recorded classical and cinematic music. Visitors should note that fountain timings and illumination schedules vary according to the season and water flow; visitors are advised to verify timings locally before planning their evening visit to ensure an orderly experience.</p>

<h3>Culinary Traditions: Mylari-Style Dosa and Mysore Pak</h3>
<p>Mysore's culinary scene is rooted in classic South Indian vegetarian cooking, highlighted by distinct regional dishes. A hallmark of the city's breakfast culture is the Mylari-style dosa, distinguished by its thick, soft texture, crisp golden base, and generous filling of spiced onion-coriander saagu served with white coconut chutney and fresh butter.</p>
<p>For confectionery lovers, Mysore Pak is the city's signature dessert. Created in the royal palace kitchens during the 1930s by palace cook Kakasura Madappa, this rich confection combines roasted gram flour, concentrated sugar syrup, and melted pure ghee into a fragrant sweet that dissolves delicately. Travelers can also sample regional filter coffee, bisi bele bath, and Mysore rasam at traditional dining halls throughout the historic core.</p>

<h3>Planning Your Mysore Itinerary</h3>
<p>Mysore is well connected by rail and highway from Bangalore, making it an essential hub for exploring southern Karnataka. Travelers looking for curated travel routes can combine Mysore with national parks and coastal heritage through our <a href="/tour-packages/6-days-karnataka-with-north-kerala-trip" class="text-primary hover:underline font-medium">6 Days Karnataka with North Kerala Trip</a>, or embark on a deeper heritage journey through the <a href="/tour-packages/15-days-south-india-culture-tour-package" class="text-primary hover:underline font-medium">15 Days South India Culture Tour Package</a>. Whether spending two days exploring royal monuments or using the city as a gateway to the Western Ghats, Mysore remains an indispensable South Indian destination.</p>`;

// ─────────────────────────────────────────────────────────────────────────────
// 2. AYURVEDA & YOGA CONTENT (Wellness guide, no cure claims, with disclaimer)
// ─────────────────────────────────────────────────────────────────────────────
const AYURVEDA_OVERVIEW = `<p>India is the birthplace of Ayurveda and Yoga, two sister philosophies developed thousands of years ago to promote harmony between the body, mind, and surrounding environment. Rather than a sightseeing vacation, an Ayurveda and Yoga journey is designed as an immersive wellness retreat where daily schedules, balanced nutrition, mindful movement, and traditional therapies work in harmony. Whether you seek stillness along the holy riverbanks of the Himalayas or rejuvenating coastal breezes in southern India, embarking on a wellness retreat offers a structured path toward personal balance.</p>

<div class="my-6 p-4 rounded-xl border border-amber-200 bg-amber-50/60 text-amber-900 text-sm">
  <strong>Important Health Notice:</strong> This guide is for informational purposes and does not constitute medical advice. Please consult a qualified Ayurvedic physician before beginning any wellness program or traditional therapy.
</div>

<h3>Foundations of Ayurveda: The Doctor Consultation Process</h3>
<p>Authentic Ayurvedic retreats begin with a detailed, one-on-one consultation conducted by a qualified Ayurvedic doctor (holding a recognized BAMS or MD degree). During this comprehensive intake, the physician evaluates your unique constitutional makeup, known as <em>Prakriti</em>, based on the three primary biological energies or doshas: <strong>Vata</strong> (air and space), <strong>Pitta</strong> (fire and water), and <strong>Kapha</strong> (earth and water).</p>
<p>The assessment involves traditional diagnostic observations, including pulse assessment (<em>Nadi Pariksha</em>), tongue examination, and discussions about sleep patterns, daily habits, stress levels, and digestion. Based on this individual profile, the doctor crafts a personalized daily schedule specifying therapeutic oils, custom herbal decoctions, recommended yoga postures, and dietary guidelines.</p>

<h3>Understanding Panchakarma: The Five Classic Cleansing Actions</h3>
<p>Panchakarma represents Ayurveda's traditional five-fold purification method, designed to clear metabolic residues and restore physiological balance. Administered under continuous medical supervision, each program begins with preparatory internal and external oleation before proceeding to specific cleansing actions suited to the individual:</p>
<ul class="list-disc pl-6 space-y-2 my-3">
  <li><strong>Vamana (Therapeutic Emesis):</strong> A controlled procedure aimed at gently balancing excess Kapha dosha accumulated in the respiratory and upper gastrointestinal tracts.</li>
  <li><strong>Virechana (Therapeutic Purgation):</strong> A cleansing process utilizing herbal formulations to eliminate excess Pitta dosha from the liver, gallbladder, and small intestine.</li>
  <li><strong>Basti (Medicated Enemas):</strong> Regarded as one of the most comprehensive therapies in classical Ayurveda, Basti uses herbal oils and decoctions to balance Vata dosha residing in the colon.</li>
  <li><strong>Nasya (Nasal Administration):</strong> The gentle instillation of medicated oils through the nasal passages to clear head passages and support sinus comfort.</li>
  <li><strong>Raktamokshana (Blood Purification):</strong> A traditional cleansing technique reserved for specific constitutional indications under strict clinical protocols.</li>
</ul>

<h3>Traditional Relaxation Therapies: Shirodhara and Abhyanga</h3>
<p>Beyond intensive Panchakarma protocols, Ayurvedic retreats incorporate celebrated body therapies that have been traditionally used for centuries to support relaxation and ease mental tension:</p>
<ul class="list-disc pl-6 space-y-2 my-3">
  <li><strong>Abhyanga:</strong> A rhythmic full-body massage performed by trained therapists using warm, herbalized sesame or coconut oils tailored to the individual's dosha. The practice is traditionally used for relaxation, promoting muscle ease, and improving peripheral circulation.</li>
  <li><strong>Shirodhara:</strong> A soothing therapy wherein a continuous, gentle stream of warm medicated herbal oil, milk, or buttermilk is poured over the forehead. Traditionally used for deep mental relaxation, calming the nervous system, and encouraging restful stillness.</li>
</ul>

<h3>Kerala vs. Rishikesh: Choosing Your Wellness Destination</h3>
<p>Two distinct geographic regions in India serve as the premier epicenters for authentic wellness travel:</p>
<ul class="list-disc pl-6 space-y-2 my-3">
  <li><strong>Kerala (The Ayurvedic Heartland):</strong> Blessed with tropical maritime weather, lush greenery, and centuries of continuous clinical tradition based on the classical <em>Ashtanga Hridayam</em> text. The monsoon season (June to September, known as <em>Karkidaka</em>) is traditionally regarded as particularly favorable for rejuvenation therapies due to open skin pores and balanced ambient humidity. Kerala retreats often combine beachfront or backwater serenity with dedicated Ayurvedic facilities.</li>
  <li><strong>Rishikesh (The Yoga Capital of the World):</strong> Nestled in the Himalayan foothills along the sacred Ganges River, Rishikesh centers primarily on yogic science, classical Hatha and Ashtanga yoga, daily meditation, Pranayama breathwork, and Vedic philosophy. The atmosphere is monastic, serene, and spiritually focused, ideal for practitioners seeking internal clarity and disciplined physical practice.</li>
</ul>

<h3>Satvik Dining: Food as Medicine</h3>
<p>Nutrition forms a vital pillar of any authentic retreat. Meals follow strict <em>Satvik</em> principles—freshly prepared, wholesome vegetarian food cooked with mild digestive spices such as cumin, coriander, ginger, turmeric, and fennel. Menus exclude processed ingredients, refined sugars, caffeine, and heavy spices to avoid overburdening the digestive tract. Meals are often tailored individually according to the doctor's assessment, ensuring that food actively supports the therapeutic treatments underway.</p>`;

const AYURVEDA_FAQS = [
  {
    ques: "What is the difference between an Ayurvedic retreat in Kerala and a yoga retreat in Rishikesh?",
    ans: "Kerala is the traditional epicenter of Ayurvedic medicine, specializing in doctor-led Panchakarma, herbal body therapies, and monsoon rejuvenation treatments. Rishikesh, situated in the Himalayan foothills along the Ganges River, focuses predominantly on classical yogic studies, intensive asana practice, Pranayama breathwork, and meditation ashrams.",
  },
  {
    ques: "What happens during an initial Ayurvedic doctor consultation?",
    ans: "A qualified Ayurvedic physician evaluates your unique physical constitution (Prakriti), pulse (Nadi Pariksha), tongue, digestion, and daily habits. Based on your doshic balance (Vata, Pitta, Kapha), the physician develops a personalized program of therapies, dietary guidelines, and herbal decoctions.",
  },
  {
    ques: "What is Panchakarma and who can undergo it?",
    ans: "Panchakarma is Ayurveda's classical five-fold purification system comprising Vamana, Virechana, Basti, Nasya, and Raktamokshana. It is designed to remove accumulated metabolic residues and restore physiological balance. Specific program eligibility is determined by the consulting physician following clinical assessment.",
  },
  {
    ques: "How are therapies like Shirodhara and Abhyanga traditionally used?",
    ans: "Abhyanga (warm herbal oil massage) and Shirodhara (gentle pouring of warm medicated oil across the forehead) are classical treatments traditionally used for deep physical and mental relaxation, easing bodily tension, and supporting healthy circulation. They are restorative wellness practices rather than medical cures.",
  },
  {
    ques: "What kind of food is served during an Ayurveda and Yoga retreat?",
    ans: "Retreats serve freshly cooked Satvik vegetarian meals prepared with mild digestive spices such as cumin, turmeric, and ginger. Menus emphasize seasonal, easily digestible ingredients and exclude processed foods, refined sugars, caffeine, and alcohol to support therapy outcomes.",
  },
  {
    ques: "What is the recommended duration for an authentic Ayurveda wellness retreat?",
    ans: "A 7-day retreat provides stress relief and introduction to Ayurvedic living, while comprehensive Panchakarma and revitalization protocols typically require 14 to 21 days to complete the preparatory, cleansing, and restorative phases under medical guidance.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. INTERNAL LINK SNIPPETS
// ─────────────────────────────────────────────────────────────────────────────
const KARNATAKA_LINKS_BLOCK = `
<div class="mt-6 pt-4 border-t border-slate-200">
  <h4 class="text-base font-semibold text-slate-800 mb-2">Featured Karnataka Destinations</h4>
  <p class="text-slate-600 text-sm leading-relaxed">
    Explore the royal palaces and heritage markets of <a href="/tour-packages/india/karnataka/mysore" class="text-primary hover:underline font-medium">Mysore</a>, the mist-covered coffee plantations of <a href="/tour-packages/india/karnataka/coorg" class="text-primary hover:underline font-medium">Coorg</a>, and the intricate Hoysala temple architecture of <a href="/tour-packages/india/karnataka/hassan" class="text-primary hover:underline font-medium">Hassan</a>.
  </p>
</div>`;

const KERALA_LINKS_BLOCK = `
<div class="mt-6 pt-4 border-t border-slate-200">
  <h4 class="text-base font-semibold text-slate-800 mb-2">Signature Kerala Highlights</h4>
  <p class="text-slate-600 text-sm leading-relaxed">
    Experience iconic backwater cruising aboard traditional luxury houseboats in <a href="/tour-packages/india/kerala/alleppey" class="text-primary hover:underline font-medium">Alleppey (Alappuzha)</a>, alongside the emerald tea hills of Munnar and the coastal beaches of Kovalam.
  </p>
</div>`;

const JK_LINKS_BLOCK = `
<div class="mt-6 pt-4 border-t border-slate-200">
  <h4 class="text-base font-semibold text-slate-800 mb-2">Explore Scenic Kashmir Valleys</h4>
  <p class="text-slate-600 text-sm leading-relaxed">
    Discover the dramatic alpine glaciers, Sindh river meadows, and trekking trails of <a href="/tour-packages/india/jammu-and-kashmir/sonamarg" class="text-primary hover:underline font-medium">Sonamarg</a> (the Meadow of Gold), easily accessible from Srinagar.
  </p>
</div>`;

const LADAKH_ITINERARY_LINKS = `
<div class="mt-6 pt-4 border-t border-slate-200">
  <h4 class="text-base font-semibold text-slate-800 mb-2">Featured Ladakh Itineraries</h4>
  <ul class="list-disc pl-5 space-y-1.5 text-slate-600 text-sm">
    <li><a href="/tour-packages/8-days-leh-ladakh-tour-with-tso-moriri-lake" class="text-primary hover:underline font-medium">8 Days Leh Ladakh Tour with Tso Moriri Lake</a>: Khardung La, Nubra Valley, Pangong Tso & remote Tso Moriri.</li>
    <li><a href="/tour-packages/10-days-ladakh-itinerary-nubra-pangong" class="text-primary hover:underline font-medium">10 Days Ladakh Itinerary: Nubra &amp; Pangong</a>: Comprehensive circuit covering Turtuk, Siachen border base, and high passes.</li>
    <li><a href="/tour-packages/7-days-ladakh-monastery-tour-magnetic-hill" class="text-primary hover:underline font-medium">7 Days Ladakh Monastery Tour with Magnetic Hill</a>: Acclimatization-friendly route through historic gompas, Magnetic Hill & Hall of Fame.</li>
  </ul>
</div>`;

// Helper to append or replace internal link block cleanly
function appendLinkBlock(existingHtml, newBlock, marker) {
  if (!existingHtml) return newBlock;
  if (existingHtml.includes(marker)) {
    // Already contains the specific marker link
    return existingHtml;
  }
  return `${existingHtml.trim()}\n${newBlock}`;
}

async function main() {
  console.log("=== STARTING GSC CONTENT AND INTERNAL LINK UPDATES ===");

  const changedUrls = [];
  const now = new Date();

  // 1. MYSORE (City ID 161)
  const mysoreWordCount = getWordCount(MYSORE_OVERVIEW);
  console.log(`Mysore Guide Word Count: ${mysoreWordCount} words (Requirement: 700-900 words)`);
  if (mysoreWordCount < 700 || mysoreWordCount > 900) {
    throw new Error(`Mysore content word count is ${mysoreWordCount}, which is outside 700-900 range!`);
  }

  const mysore = await prisma.city.findUnique({ where: { slug: "mysore" } });
  if (mysore) {
    await prisma.city.update({
      where: { id: mysore.id },
      data: {
        overView: MYSORE_OVERVIEW,
        contentUpdatedAt: now,
      },
    });
    console.log(`✓ Updated Mysore City (id: ${mysore.id})`);
    changedUrls.push("https://koikoitravel.com/tour-packages/india/karnataka/mysore");
  } else {
    console.warn("! Mysore city not found");
  }

  // 2. AYURVEDA & YOGA (TravelExperience ID 9)
  const exp = await prisma.travelExperience.findUnique({ where: { slug: "ayurveda-yoga" } });
  if (exp) {
    await prisma.travelExperience.update({
      where: { id: exp.id },
      data: {
        overView: AYURVEDA_OVERVIEW,
        moreDescription: AYURVEDA_OVERVIEW,
        contentUpdatedAt: now,
      },
    });

    // Update FAQs in Faq table
    await prisma.faq.deleteMany({
      where: {
        entityType: "TravelExperience",
        entityId: exp.id,
      },
    });

    await prisma.faq.createMany({
      data: AYURVEDA_FAQS.map((faq) => ({
        ques: faq.ques,
        ans: faq.ans,
        entityType: "TravelExperience",
        entityId: exp.id,
      })),
    });

    console.log(`✓ Updated Ayurveda & Yoga TravelExperience (id: ${exp.id}) and ${AYURVEDA_FAQS.length} FAQs`);
    changedUrls.push("https://koikoitravel.com/travel-experiences/ayurveda-yoga");
  } else {
    console.warn("! Ayurveda-Yoga experience not found");
  }

  // 3. KARNATAKA STATE (Links to Coorg, Hassan, Mysore)
  const karnataka = await prisma.state.findUnique({ where: { slug: "karnataka" } });
  if (karnataka) {
    const updatedKarnatakaOverview = appendLinkBlock(
      karnataka.overView || "",
      KARNATAKA_LINKS_BLOCK,
      "/tour-packages/india/karnataka/mysore"
    );
    await prisma.state.update({
      where: { id: karnataka.id },
      data: {
        overView: updatedKarnatakaOverview,
        contentUpdatedAt: now,
      },
    });
    console.log(`✓ Updated Karnataka State (id: ${karnataka.id}) with internal links`);
    changedUrls.push("https://koikoitravel.com/tour-packages/india/karnataka");
  }

  // 4. KERALA STATE (Link to Alleppey)
  const kerala = await prisma.state.findUnique({ where: { slug: "kerala" } });
  if (kerala) {
    const updatedKeralaOverview = appendLinkBlock(
      kerala.overView || "",
      KERALA_LINKS_BLOCK,
      "/tour-packages/india/kerala/alleppey"
    );
    await prisma.state.update({
      where: { id: kerala.id },
      data: {
        overView: updatedKeralaOverview,
        contentUpdatedAt: now,
      },
    });
    console.log(`✓ Updated Kerala State (id: ${kerala.id}) with internal link to Alleppey`);
    changedUrls.push("https://koikoitravel.com/tour-packages/india/kerala");
  }

  // 5. JAMMU & KASHMIR STATE (Link to Sonamarg)
  const jk = await prisma.state.findUnique({ where: { slug: "jammu-and-kashmir" } });
  if (jk) {
    const updatedJkOverview = appendLinkBlock(
      jk.overView || "",
      JK_LINKS_BLOCK,
      "/tour-packages/india/jammu-and-kashmir/sonamarg"
    );
    await prisma.state.update({
      where: { id: jk.id },
      data: {
        overView: updatedJkOverview,
        contentUpdatedAt: now,
      },
    });
    console.log(`✓ Updated Jammu and Kashmir State (id: ${jk.id}) with internal link to Sonamarg`);
    changedUrls.push("https://koikoitravel.com/tour-packages/india/jammu-and-kashmir");
  }

  // 6. LADAKH STATE, LEH, NUBRA, PANGONG (Links to the 3 Ladakh itineraries)
  const ladakhEntities = [
    { type: "state", slug: "ladakh", url: "https://koikoitravel.com/tour-packages/india/ladakh" },
    { type: "city", slug: "leh", url: "https://koikoitravel.com/tour-packages/india/ladakh/leh" },
    { type: "city", slug: "nubra-valley", url: "https://koikoitravel.com/tour-packages/india/ladakh/nubra-valley" },
    { type: "city", slug: "pangong-tso", url: "https://koikoitravel.com/tour-packages/india/ladakh/pangong-tso" },
  ];

  for (const ent of ladakhEntities) {
    if (ent.type === "state") {
      const stateRecord = await prisma.state.findUnique({ where: { slug: ent.slug } });
      if (stateRecord) {
        const updatedOverView = appendLinkBlock(
          stateRecord.overView || "",
          LADAKH_ITINERARY_LINKS,
          "/tour-packages/8-days-leh-ladakh-tour-with-tso-moriri-lake"
        );
        await prisma.state.update({
          where: { id: stateRecord.id },
          data: {
            overView: updatedOverView,
            contentUpdatedAt: now,
          },
        });
        console.log(`✓ Updated Ladakh State (id: ${stateRecord.id}) with 3 itinerary links`);
        changedUrls.push(ent.url);
      }
    } else if (ent.type === "city") {
      const cityRecord = await prisma.city.findUnique({ where: { slug: ent.slug } });
      if (cityRecord) {
        const updatedOverView = appendLinkBlock(
          cityRecord.overView || "",
          LADAKH_ITINERARY_LINKS,
          "/tour-packages/8-days-leh-ladakh-tour-with-tso-moriri-lake"
        );
        await prisma.city.update({
          where: { id: cityRecord.id },
          data: {
            overView: updatedOverView,
            contentUpdatedAt: now,
          },
        });
        console.log(`✓ Updated City ${ent.slug} (id: ${cityRecord.id}) with 3 itinerary links`);
        changedUrls.push(ent.url);
      }
    }
  }

  console.log("\n=== ALL DATABASE UPDATES COMPLETED SUCCESSFULLY ===");
  console.log("Changed URLs with updated lastmod:");
  changedUrls.forEach((url, i) => console.log(`${i + 1}. ${url}`));
}

main()
  .catch((err) => {
    console.error("FATAL ERROR during update:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
