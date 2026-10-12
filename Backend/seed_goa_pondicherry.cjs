const { PrismaClient } = require('./generated/prisma');
require('dotenv').config();

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Goa and Pondicherry into Database...');

  // 1. Find or Create India Country
  let india = await prisma.country.findFirst({
    where: { OR: [{ slug: 'india' }, { title: { contains: 'India', mode: 'insensitive' } }] }
  });

  if (!india) {
    india = await prisma.country.create({
      data: {
        title: 'India',
        slug: 'india',
        seoDescription: 'Explore tour packages in India with KoiKoi Travel.',
        overView: 'Welcome to India, land of vibrant culture, heritage, backwaters, and beaches.',
        isActive: true,
        showOnSite: true,
      }
    });
    console.log('Created Country: India');
  } else {
    console.log('Found Country:', india.title, '(ID:', india.id, ')');
  }

  // 2. Find or Create Goa State
  let goaState = await prisma.state.findFirst({
    where: { OR: [{ slug: 'goa' }, { title: { contains: 'Goa', mode: 'insensitive' } }] }
  });

  if (!goaState) {
    goaState = await prisma.state.create({
      data: {
        title: 'Goa',
        slug: 'goa',
        countryId: india.id,
        seoDescription: 'Book Goa tour packages with sun-drenched beaches, nightlife, and water sports.',
        overView: 'Goa is India\'s favorite beach destination, famous for pristine coastlines, nightlife, and Portuguese heritage.',
        famousFor: 'Beaches, Nightlife, Water Sports, Seafood, Portuguese Architecture',
        isActive: true,
        showOnSite: true,
      }
    });
    console.log('Created State: Goa (ID:', goaState.id, ')');
  } else {
    console.log('Found State: Goa (ID:', goaState.id, ')');
  }

  // 3. Create Cities under Goa State (Goa, North Goa, South Goa)
  const goaCities = [
    { title: 'Goa', slug: 'goa', famousFor: 'Beaches, Nightlife, Forts & Water Sports' },
    { title: 'North Goa', slug: 'north-goa', famousFor: 'Calangute, Baga, Anjuna Beaches & Nightclubs' },
    { title: 'South Goa', slug: 'south-goa', famousFor: 'Serene Beaches, Palolem, Colva & Heritage Resorts' },
  ];

  for (const c of goaCities) {
    const existing = await prisma.city.findFirst({ where: { slug: c.slug } });
    if (!existing) {
      const created = await prisma.city.create({
        data: {
          title: c.title,
          slug: c.slug,
          stateId: goaState.id,
          seoDescription: `Explore ${c.title} tour packages with KoiKoi Travel.`,
          overView: `${c.title} offers sun, sand, sea, and coastal adventures.`,
          famousFor: c.famousFor,
          isActive: true,
          showOnSite: true,
        }
      });
      console.log(`Created City under Goa: ${created.title} (ID: ${created.id})`);
    } else {
      console.log(`City already exists: ${existing.title} (ID: ${existing.id})`);
    }
  }

  // 4. Find or Create Tamil Nadu State
  let tnState = await prisma.state.findFirst({
    where: { OR: [{ slug: 'tamil-nadu' }, { title: { contains: 'Tamil Nadu', mode: 'insensitive' } }] }
  });

  if (!tnState) {
    tnState = await prisma.state.create({
      data: {
        title: 'Tamil Nadu',
        slug: 'tamil-nadu',
        countryId: india.id,
        seoDescription: 'Explore Tamil Nadu tour packages featuring Dravidian temples, hill stations, and heritage coastlines.',
        overView: 'Tamil Nadu is a land of ancient temples, rich Dravidian heritage, and serene coastal towns.',
        famousFor: 'Dravidian Temples, Cultural Heritage, Hill Stations, Coastlines',
        isActive: true,
        showOnSite: true,
      }
    });
    console.log('Created State: Tamil Nadu (ID:', tnState.id, ')');
  } else {
    console.log('Found State: Tamil Nadu (ID:', tnState.id, ')');
  }

  // 5. Create Pondicherry City under Tamil Nadu State
  const pondyExisting = await prisma.city.findFirst({
    where: { OR: [{ slug: 'pondicherry' }, { slug: 'puducherry' }] }
  });

  if (!pondyExisting) {
    const createdPondy = await prisma.city.create({
      data: {
        title: 'Pondicherry',
        slug: 'pondicherry',
        stateId: tnState.id,
        seoDescription: 'Discover Pondicherry tour packages with French Quarter walks, Auroville, and Promenade Beach.',
        overView: 'Pondicherry (Puducherry) is a charming French colonial coastal town famous for yellow heritage villas, cafes, and peaceful beaches.',
        famousFor: 'French Quarter, Auroville, Promenade Beach, Matrimandir, French Bakeries',
        isActive: true,
        showOnSite: true,
      }
    });
    console.log(`Created City: ${createdPondy.title} (ID: ${createdPondy.id}) under State: ${tnState.title}`);
  } else {
    console.log(`City already exists: ${pondyExisting.title} (ID: ${pondyExisting.id})`);
  }

  console.log('\nAll requested Goa and Pondicherry entities successfully seeded into Database!');
}

main()
  .catch((e) => {
    console.error('Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
