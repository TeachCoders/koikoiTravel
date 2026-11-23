import { prisma } from "../utils/prismaConnection.js";

async function main() {
  console.log("Checking and seeding default CMS pages...");

  // 1. contact-us
  const contactUs = await prisma.cmsPage.upsert({
    where: { slug: "contact-us" },
    update: {},
    create: {
      slug: "contact-us",
      title: "Contact Us",
      h1Title: "Contact Us",
      seoTitle: "Contact Us | KoiKoi Travel",
      seoDescription:
        "Contact KoiKoi Travel for custom India tours, private cabs & 24/7 travel support. Reach our local destination experts by phone, WhatsApp, or email.",
      seoKeyword:
        "contact koikoitravel holiday, travel agency contact delhi, india tour package inquiry, koikoitravel holidays phone number",
      canonical: "/contact-us",
      isActive: true,
    },
  });
  console.log("Seeded/Verified CMS page:", contactUs.slug);

  // 2. travel-experiences
  const travelExp = await prisma.cmsPage.upsert({
    where: { slug: "travel-experiences" },
    update: {},
    create: {
      slug: "travel-experiences",
      title: "Travel Experiences",
      h1Title: "India Tour Themes & Travel Experiences",
      seoTitle: "India Tour Themes: Honeymoon, Heritage, Wildlife | KoiKoi",
      seoDescription:
        "Find your kind of India trip: honeymoon, heritage, wildlife, yoga, spiritual, family, desert and hill stations. Every tour custom-planned by our local team.",
      seoKeyword:
        "india tour themes, honeymoon packages india, wildlife safaris india, heritage tours india",
      canonical: "/travel-experiences",
      isActive: true,
    },
  });
  console.log("Seeded/Verified CMS page:", travelExp.slug);

  console.log("CMS seeding completed successfully!");
}

main()
  .catch((err) => {
    console.error("Error seeding CMS pages:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
