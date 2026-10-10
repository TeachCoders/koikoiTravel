import { prisma } from './utils/prismaConnection.js';

async function main() {
  console.log("Deleting Cancellation Policy pages from CmsPage table...");
  try {
    const deleted = await prisma.$executeRawUnsafe(`
      DELETE FROM "CmsPage" 
      WHERE LOWER(slug) LIKE '%cancellation%' 
         OR LOWER(title) LIKE '%cancellation%'
    `);
    console.log(`✅ Deleted ${deleted} Cancellation Policy CMS page(s) from database.`);
  } catch (error) {
    console.error("Error deleting CmsPage:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();

