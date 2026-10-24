import { prisma } from "./utils/prismaConnection.js";

async function main() {
  const post = await prisma.blogPost.findFirst({
    where: { slug: "complete-honeymoon-guide-to-kashmir" }
  });
  console.log("Found post:", post ? { id: post.id, title: post.title, slug: post.slug, descLen: post.moreDescription?.length } : "None");
}

main().finally(() => prisma.$disconnect());
