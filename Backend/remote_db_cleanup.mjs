import { prisma } from "./utils/prismaConnection.js";

const tables = ["State", "City", "TravelExperience", "CmsPage", "Journey", "Country", "BlogPost"];

async function main() {
  console.log("=== DATABASE SEOTITLE DEDUPLICATION ===");
  let grandTotal = 0;

  for (const t of tables) {
    try {
      const before = await prisma.$queryRawUnsafe(
        `SELECT COUNT(*)::int as count FROM "${t}" WHERE "seoTitle" ~* '(\\\\||-|_|–|—)\\s*KoiKoi';`
      );
      const countBefore = before[0]?.count ?? 0;

      const updated = await prisma.$executeRawUnsafe(`
        UPDATE "${t}"
        SET "seoTitle" = REGEXP_REPLACE(
            REGEXP_REPLACE("seoTitle", '\\s*(?:\\||-|_|–|—)\\s*KoiKoi(\\s*Travel)?\\s*$', '', 'i'),
            '\\s*(?:\\||-|_|–|—)\\s*KoiKoi(\\s*Travel)?\\s*$', '', 'i'
        )
        WHERE "seoTitle" ~* '(?:\\||-|_|–|—)\\s*KoiKoi';
      `);

      console.log(`Table ${t}: ${updated} records updated (had ${countBefore} matching)`);
      grandTotal += updated;
    } catch (err) {
      console.error(`Table ${t} error:`, err.message);
    }
  }

  console.log(`\nTotal records updated across all tables: ${grandTotal}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
