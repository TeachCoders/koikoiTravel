import { prisma } from "./utils/prismaConnection.js";

async function main() {
  const inactiveCities = await prisma.city.findMany({
    where: { isActive: false },
    select: { id: true, title: true, slug: true, state: { select: { slug: true } } }
  });
  console.log("Inactive cities count:", inactiveCities.length);
  console.log("Inactive cities:", inactiveCities);

  const inactiveStates = await prisma.state.findMany({
    where: { isActive: false },
    select: { id: true, title: true, slug: true }
  });
  console.log("Inactive states:", inactiveStates);

  const inactiveCountries = await prisma.country.findMany({
    where: { isActive: false },
    select: { id: true, title: true, slug: true }
  });
  console.log("Inactive countries:", inactiveCountries);

  const inactiveJourneys = await prisma.journey.findMany({
    where: { isActive: false },
    select: { id: true, title: true, slug: true }
  });
  console.log("Inactive journeys count:", inactiveJourneys.length);
  console.log("Inactive journeys:", inactiveJourneys);
}

main().finally(() => prisma.$disconnect());

