import { prisma } from './utils/prismaConnection.js';

async function clearRedis() {
  try {
    const { cacheClearAll } = await import('./services/redisClient.js');
    if (typeof cacheClearAll === 'function') {
      await cacheClearAll();
      console.log("✅ Redis cache cleared successfully.");
    }
  } catch (err) {
    console.warn("Notice: Could not clear Redis directly (not critical):", err.message);
  }
}

async function main() {
  console.log("=== FIXING GOA AND PONDICHERRY DESTINATION DATA ===");

  try {
    // 1. Find Goa State
    const goaState = await prisma.state.findFirst({
      where: { slug: 'goa' }
    });
    if (!goaState) {
      console.error("Goa State not found!");
      return;
    }
    console.log(`Found Goa State: ID ${goaState.id}, Slug: ${goaState.slug}`);

    // 2. Find Tamil Nadu State
    const tnState = await prisma.state.findFirst({
      where: {
        OR: [
          { slug: 'tamil-nadu' },
          { title: { contains: 'Tamil Nadu', mode: 'insensitive' } }
        ]
      }
    });
    if (tnState) {
      console.log(`Found Tamil Nadu State: ID ${tnState.id}, Slug: ${tnState.slug}`);
      
      // Move Pondicherry to Tamil Nadu State
      const updatedPondy = await prisma.city.updateMany({
        where: {
          OR: [
            { slug: 'pondicherry' },
            { slug: 'puducherry' },
            { title: { contains: 'Pondicherry', mode: 'insensitive' } }
          ],
          stateId: goaState.id
        },
        data: {
          stateId: tnState.id
        }
      });
      console.log(`✅ Moved Pondicherry city to Tamil Nadu state (Updated: ${updatedPondy.count})`);
    } else {
      console.warn("Tamil Nadu state not found, leaving Pondicherry as is.");
    }

    // 3. Find duplicate City "goa" (slug: "goa")
    const goaCity = await prisma.city.findFirst({
      where: { slug: 'goa', stateId: goaState.id },
      include: { journeys: true }
    });

    if (goaCity) {
      console.log(`Found duplicate City 'goa': ID ${goaCity.id}, linked to ${goaCity.journeys.length} journey(s)`);

      // Ensure all journeys connected to City "goa" are linked directly to Goa State
      for (const journey of goaCity.journeys) {
        await prisma.state.update({
          where: { id: goaState.id },
          data: {
            journeys: {
              connect: { id: journey.id }
            }
          }
        });
        console.log(`Connected Journey ID ${journey.id} directly to Goa State`);
      }

      // Detach and delete duplicate City "goa"
      await prisma.city.delete({
        where: { id: goaCity.id }
      });
      console.log(`✅ Successfully deleted duplicate City 'goa' (ID ${goaCity.id})`);
    } else {
      console.log("No duplicate City with slug 'goa' found under Goa State.");
    }

    // 4. Invalidate Redis Cache
    await clearRedis();

    console.log("=== GOA DESTINATION FIX COMPLETED SUCCESSFULLY ===");
  } catch (error) {
    console.error("Error running fix script:", error);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

main();
