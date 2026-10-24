import { prisma } from "./utils/prismaConnection.js";

async function main() {
  const city = await prisma.city.findFirst({
    where: { slug: "kanchipuram" },
    include: {
      state: {
        include: { country: true }
      }
    }
  });
  console.log("Prisma City with state and country:", {
    id: city?.id,
    title: city?.title,
    slug: city?.slug,
    stateId: city?.stateId,
    stateSlug: city?.state?.slug,
    countrySlug: city?.state?.country?.slug
  });
}

main().finally(() => prisma.$disconnect());

