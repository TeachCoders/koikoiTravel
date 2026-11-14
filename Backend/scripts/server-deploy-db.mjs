import { prisma } from "../utils/prismaConnection.js";

async function main() {
  console.log("Adding videoUrl column to BlogPost...");
  await prisma.$executeRawUnsafe('ALTER TABLE "BlogPost" ADD COLUMN IF NOT EXISTS "videoUrl" TEXT;');

  console.log("Updating Jawai Leopard Safari videoUrl...");
  await prisma.blogPost.updateMany({
    where: { slug: "jawai-leopard-safari-guide" },
    data: { videoUrl: "https://youtu.be/TzK8or-Fhx0?si=j7stQjxjUPV7iNKM" },
  });

  // Clean base64 image from jawai blog post if present
  const jawai = await prisma.blogPost.findFirst({
    where: { slug: "jawai-leopard-safari-guide" },
    select: { id: true, moreDescription: true },
  });
  if (jawai?.moreDescription && jawai.moreDescription.includes("data:image/jpeg;base64")) {
    const cleaned = jawai.moreDescription.replace(/^(<h[1-6][^>]*>.*?<\/h[1-6]>)\s*(?:<p[^>]*>\s*)?<img[^>]*>(?:\s*<\/p>)?/is, "$1");
    await prisma.blogPost.update({
      where: { id: jawai.id },
      data: { moreDescription: cleaned },
    });
    console.log("Cleaned base64 image from jawai blog post.");
  }

  console.log("Updating users domain to @koikoitravel.com...");
  const users = await prisma.users.findMany();
  for (const u of users) {
    if (u.email && u.email.includes("@flagjourneys.com")) {
      const newEmail = u.email.replace("@flagjourneys.com", "@koikoitravel.com");
      await prisma.users.update({
        where: { id: u.id },
        data: { email: newEmail },
      });
      console.log(`Updated user ${u.name}: ${u.email} -> ${newEmail}`);
    }
  }

  const p = await prisma.blogPost.findFirst({
    where: { slug: "jawai-leopard-safari-guide" },
    select: { slug: true, videoUrl: true },
  });
  console.log("Jawai post on server:", p);

  const updatedUsers = await prisma.users.findMany({
    select: { id: true, name: true, email: true },
  });
  console.log("Users on server:", updatedUsers);

  process.exit(0);
}

main().catch((err) => {
  console.error("Migration error:", err);
  process.exit(1);
});
