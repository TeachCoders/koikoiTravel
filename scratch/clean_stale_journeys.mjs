import dotenv from "dotenv";
dotenv.config({ path: "/var/www/koikoitravel-app/Backend/.env" });
import { prisma } from "/var/www/koikoitravel-app/Backend/utils/prismaConnection.js";

async function run() {
  const allJourneys = await prisma.journey.findMany({ select: { id: true } });
  const validJourneyIds = new Set(allJourneys.map(j => j.id));

  // Check TravelExperience
  const tes = await prisma.travelExperience.findMany({ select: { id: true, title: true, featuredJourneyOrder: true } });
  for (const te of tes) {
    if (te.featuredJourneyOrder && te.featuredJourneyOrder.length > 0) {
      const invalid = te.featuredJourneyOrder.filter(id => !validJourneyIds.has(id));
      if (invalid.length > 0) {
        console.log(`TravelExperience ${te.id} (${te.title}) has invalid journeys:`, invalid);
        const cleaned = te.featuredJourneyOrder.filter(id => validJourneyIds.has(id));
        await prisma.travelExperience.update({
          where: { id: te.id },
          data: { featuredJourneyOrder: cleaned }
        });
        console.log(`Cleaned TravelExperience ${te.id} ->`, cleaned);
      }
    }
  }

  // Check State
  const states = await prisma.state.findMany({ select: { id: true, title: true, featuredJourneyOrder: true } });
  for (const s of states) {
    if (s.featuredJourneyOrder && s.featuredJourneyOrder.length > 0) {
      const invalid = s.featuredJourneyOrder.filter(id => !validJourneyIds.has(id));
      if (invalid.length > 0) {
        console.log(`State ${s.id} (${s.title}) has invalid journeys:`, invalid);
        const cleaned = s.featuredJourneyOrder.filter(id => validJourneyIds.has(id));
        await prisma.state.update({
          where: { id: s.id },
          data: { featuredJourneyOrder: cleaned }
        });
        console.log(`Cleaned State ${s.id} ->`, cleaned);
      }
    }
  }

  // Check City
  const cities = await prisma.city.findMany({ select: { id: true, title: true, featuredJourneyOrder: true } });
  for (const c of cities) {
    if (c.featuredJourneyOrder && c.featuredJourneyOrder.length > 0) {
      const invalid = c.featuredJourneyOrder.filter(id => !validJourneyIds.has(id));
      if (invalid.length > 0) {
        console.log(`City ${c.id} (${c.title}) has invalid journeys:`, invalid);
        const cleaned = c.featuredJourneyOrder.filter(id => validJourneyIds.has(id));
        await prisma.city.update({
          where: { id: c.id },
          data: { featuredJourneyOrder: cleaned }
        });
        console.log(`Cleaned City ${c.id} ->`, cleaned);
      }
    }
  }
}

run().then(() => console.log("Done checking!")).finally(() => prisma.$disconnect());

