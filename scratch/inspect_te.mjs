import dotenv from "dotenv";
dotenv.config({ path: "/var/www/koikoitravel-app/Backend/.env" });
import { prisma } from "/var/www/koikoitravel-app/Backend/utils/prismaConnection.js";
async function check() {
  const te = await prisma.travelExperience.findUnique({
    where: { id: 6 },
    include: { cities: true, journeys: true }
  });
  console.log("TE 6:", JSON.stringify({
    id: te?.id,
    title: te?.title,
    slug: te?.slug,
    cityOrder: te?.cityOrder,
    cities: te?.cities?.map(c => c.id),
    featuredJourneyOrder: te?.featuredJourneyOrder,
    journeys: te?.journeys?.map(j => j.id)
  }, null, 2));
  
  if (te?.featuredJourneyOrder && te.featuredJourneyOrder.length) {
    const existingJourneys = await prisma.journey.findMany({
      where: { id: { in: te.featuredJourneyOrder } },
      select: { id: true }
    });
    const foundIds = new Set(existingJourneys.map(j => j.id));
    const missingJourneys = te.featuredJourneyOrder.filter(id => !foundIds.has(id));
    console.log("Missing journey IDs in featuredJourneyOrder:", missingJourneys);
  }

  if (te?.cityOrder && te.cityOrder.length) {
    const existingCities = await prisma.city.findMany({
      where: { id: { in: te.cityOrder } },
      select: { id: true }
    });
    const foundCityIds = new Set(existingCities.map(c => c.id));
    const missingCities = te.cityOrder.filter(id => !foundCityIds.has(id));
    console.log("Missing city IDs in cityOrder:", missingCities);
  }
}
check().finally(() => prisma.$disconnect());
