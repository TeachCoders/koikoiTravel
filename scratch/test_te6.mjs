import dotenv from "dotenv";
dotenv.config({ path: "/var/www/koikoitravel-app/Backend/.env" });
import { prisma } from "/var/www/koikoitravel-app/Backend/utils/prismaConnection.js";

async function testUpdate() {
  const te = await prisma.travelExperience.findUnique({
    where: { id: 6 },
    include: { journeys: true, cities: true }
  });
  console.log("Current TE 6:", te.title, "featuredJourneyOrder:", te.featuredJourneyOrder);
  console.log("SUCCESS: Backend DB is ready and accessible!");
}

testUpdate().finally(() => prisma.$disconnect());

