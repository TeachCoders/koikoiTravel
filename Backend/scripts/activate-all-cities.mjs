import { prisma } from "../utils/prismaConnection.js";

async function main() {
  const result = await prisma.city.updateMany({
    data: {
      isActive: true,
      showOnSite: true,
    },
  });
  console.log(`Successfully updated ${result.count} cities to isActive: true and showOnSite: true.`);
  
  const allCities = await prisma.city.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      isActive: true,
      showOnSite: true,
      state: { select: { slug: true, title: true } }
    },
    orderBy: { title: 'asc' },
  });
  console.log(`\nTotal cities verified in DB: ${allCities.length}`);
  allCities.forEach(c => console.log(` - [${c.state?.title || c.state?.slug}] ${c.title} (${c.slug}) -> Active: ${c.isActive}, ShowOnSite: ${c.showOnSite}`));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
