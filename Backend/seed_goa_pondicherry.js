import { prisma } from './utils/prismaConnection.js';

async function main() {
  console.log('Seeding Goa and Pondicherry into Database using raw SQL...');

  // 1. Get Country ID for India
  const countries = await prisma.$queryRawUnsafe(`SELECT id, title, slug FROM country WHERE LOWER(title) LIKE '%india%' OR slug = 'india' LIMIT 1`);
  let countryId;
  if (countries && countries.length > 0) {
    countryId = countries[0].id;
    console.log('Found Country:', countries[0].title, '(ID:', countryId, ')');
  } else {
    const newCountry = await prisma.$queryRawUnsafe(`INSERT INTO country (title, slug, "seoDescription", "overView", "isActive", "showOnSite", "displayOrder") VALUES ('India', 'india', 'Explore tour packages in India', 'Welcome to India', true, true, 0) RETURNING id`);
    countryId = newCountry[0].id;
    console.log('Created Country: India (ID:', countryId, ')');
  }

  // 2. Goa State
  let goaState = await prisma.$queryRawUnsafe(`SELECT id, title FROM "State" WHERE slug = 'goa' OR LOWER(title) = 'goa' LIMIT 1`);
  let goaStateId;
  if (goaState && goaState.length > 0) {
    goaStateId = goaState[0].id;
    console.log('Found State: Goa (ID:', goaStateId, ')');
  } else {
    const newGoa = await prisma.$queryRawUnsafe(`INSERT INTO "State" (title, slug, "countryId", "seoDescription", "overView", "famousFor", "isActive", "showOnSite", "displayOrder") VALUES ('Goa', 'goa', ${countryId}, 'Book Goa tour packages with sun-drenched beaches, nightlife, and water sports.', 'Goa is India favorite beach destination.', 'Beaches, Nightlife, Water Sports, Seafood', true, true, 0) RETURNING id`);
    goaStateId = newGoa[0].id;
    console.log('Created State: Goa (ID:', goaStateId, ')');
  }

  // 3. Goa Cities (Goa, North Goa, South Goa)
  const goaCities = [
    { title: 'Goa', slug: 'goa', famousFor: 'Beaches, Nightlife, Forts & Water Sports' },
    { title: 'North Goa', slug: 'north-goa', famousFor: 'Calangute, Baga, Anjuna Beaches & Nightclubs' },
    { title: 'South Goa', slug: 'south-goa', famousFor: 'Serene Beaches, Palolem, Colva & Heritage Resorts' },
  ];

  for (const c of goaCities) {
    const existing = await prisma.$queryRawUnsafe(`SELECT id, title FROM "City" WHERE slug = '${c.slug}' LIMIT 1`);
    if (!existing || existing.length === 0) {
      await prisma.$executeRawUnsafe(`INSERT INTO "City" (title, slug, "stateId", "seoDescription", "overView", "famousFor", "isActive", "showOnSite", "displayOrder") VALUES ('${c.title}', '${c.slug}', ${goaStateId}, 'Explore ${c.title} tour packages with KoiKoi Travel.', '${c.title} offers coastal adventures.', '${c.famousFor}', true, true, 0)`);
      console.log(`Created City: ${c.title} under Goa State (ID: ${goaStateId})`);
    } else {
      console.log(`City already exists: ${existing[0].title} (ID: ${existing[0].id})`);
    }
  }

  // 4. Tamil Nadu State
  let tnState = await prisma.$queryRawUnsafe(`SELECT id, title FROM "State" WHERE slug = 'tamil-nadu' OR LOWER(title) LIKE '%tamil%nadu%' LIMIT 1`);
  let tnStateId;
  if (tnState && tnState.length > 0) {
    tnStateId = tnState[0].id;
    console.log('Found State: Tamil Nadu (ID:', tnStateId, ')');
  } else {
    const newTN = await prisma.$queryRawUnsafe(`INSERT INTO "State" (title, slug, "countryId", "seoDescription", "overView", "famousFor", "isActive", "showOnSite", "displayOrder") VALUES ('Tamil Nadu', 'tamil-nadu', ${countryId}, 'Explore Tamil Nadu tour packages.', 'Tamil Nadu is a land of ancient Dravidian temples.', 'Dravidian Temples, Cultural Heritage, Hill Stations', true, true, 0) RETURNING id`);
    tnStateId = newTN[0].id;
    console.log('Created State: Tamil Nadu (ID:', tnStateId, ')');
  }

  // 5. Pondicherry City
  const pondyExisting = await prisma.$queryRawUnsafe(`SELECT id, title FROM "City" WHERE slug = 'pondicherry' OR slug = 'puducherry' LIMIT 1`);
  if (!pondyExisting || pondyExisting.length === 0) {
    await prisma.$executeRawUnsafe(`INSERT INTO "City" (title, slug, "stateId", "seoDescription", "overView", "famousFor", "isActive", "showOnSite", "displayOrder") VALUES ('Pondicherry', 'pondicherry', ${tnStateId}, 'Discover Pondicherry tour packages with French Quarter walks.', 'Pondicherry is a charming French colonial coastal town.', 'French Quarter, Auroville, Promenade Beach', true, true, 0)`);
    console.log(`Created City: Pondicherry under State: Tamil Nadu (ID: ${tnStateId})`);
  } else {
    console.log(`City already exists: ${pondyExisting[0].title} (ID: ${pondyExisting[0].id})`);
  }

  console.log('\nSUCCESS! Goa State, Goa Cities (Goa, North Goa, South Goa), and Pondicherry City created in DB!');
}

main()
  .catch((e) => {
    console.error('Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
