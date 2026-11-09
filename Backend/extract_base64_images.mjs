import fs from "fs";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";
import { prisma } from "./utils/prismaConnection.js";

const UPLOAD_DIR = path.join(process.cwd(), "public", "content");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

async function processHtmlContent(content, slugPrefix = "img") {
  if (!content || typeof content !== "string" || !content.includes("data:image")) {
    return { updated: false, newContent: content, count: 0 };
  }

  // Regex to match data:image in src or markdown
  const dataUriRegex = /data:image\/([a-zA-Z0-9+.-]+);base64,([A-Za-z0-9+/=\s]+?)(?=["'\)\s>]|$)/g;
  let count = 0;
  const matches = [...content.matchAll(dataUriRegex)];
  if (matches.length === 0) {
    return { updated: false, newContent: content, count: 0 };
  }

  let newContent = content;
  for (const match of matches) {
    const fullMatch = match[0];
    const mimeSubtype = match[1];
    const rawBase64 = match[2].replace(/\s/g, "");

    try {
      const buffer = Buffer.from(rawBase64, "base64");
      if (buffer.length < 50) continue;

      const hash = crypto.createHash("md5").update(buffer).digest("hex").slice(0, 10);
      const cleanPrefix = slugPrefix.replace(/[^a-zA-Z0-9_-]/g, "_").slice(0, 35);
      const filename = `${cleanPrefix}-${Date.now()}-${hash}.webp`;
      const filePath = path.join(UPLOAD_DIR, filename);

      // Max 1600px width, convert to webp (quality 80)
      await sharp(buffer)
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(filePath);

      const publicUrl = `/content/${filename}`;
      newContent = newContent.split(fullMatch).join(publicUrl);
      count++;
      console.log(`  -> Converted ${Math.round(buffer.length / 1024)} KB base64 (${mimeSubtype}) to ${publicUrl}`);
    } catch (err) {
      console.error(`  Error processing base64 image:`, err.message);
    }
  }

  return { updated: count > 0, newContent, count };
}

async function run() {
  console.log("=== STARTING BASE64 IMAGE EXTRACTION AND REPLACEMENT ===");
  let totalFixedRecords = 0;
  let totalImagesConverted = 0;

  // 1. BlogPost
  console.log("\nChecking BlogPost...");
  const blogPosts = await prisma.blogPost.findMany();
  for (const post of blogPosts) {
    let changed = false;
    let data = {};
    if (post.moreDescription?.includes("data:image")) {
      const res = await processHtmlContent(post.moreDescription, `blog-${post.slug}`);
      if (res.updated) {
        data.moreDescription = res.newContent;
        changed = true;
        totalImagesConverted += res.count;
      }
    }
    if (post.seoDescription?.includes("data:image")) {
      const res = await processHtmlContent(post.seoDescription, `blog-seo-${post.slug}`);
      if (res.updated) {
        data.seoDescription = res.newContent;
        changed = true;
        totalImagesConverted += res.count;
      }
    }
    if (post.thumbImg?.includes("data:image")) {
      const res = await processHtmlContent(post.thumbImg, `blog-thumb-${post.slug}`);
      if (res.updated) {
        data.thumbImg = res.newContent;
        changed = true;
        totalImagesConverted += res.count;
      }
    }
    if (changed) {
      await prisma.blogPost.update({ where: { id: post.id }, data });
      totalFixedRecords++;
      console.log(`[BlogPost] Updated ${post.slug} (id: ${post.id})`);
    }
  }

  // 2. Journey
  console.log("\nChecking Journey...");
  const journeys = await prisma.journey.findMany();
  for (const j of journeys) {
    let changed = false;
    let data = {};
    for (const f of ["moreDescription", "overView", "seoDescription", "thumbImg"]) {
      if (j[f]?.includes("data:image")) {
        const res = await processHtmlContent(j[f], `journey-${j.slug}-${f}`);
        if (res.updated) {
          data[f] = res.newContent;
          changed = true;
          totalImagesConverted += res.count;
        }
      }
    }
    if (changed) {
      await prisma.journey.update({ where: { id: j.id }, data });
      totalFixedRecords++;
      console.log(`[Journey] Updated ${j.slug} (id: ${j.id})`);
    }
  }

  // 3. Day (Itinerary days)
  console.log("\nChecking Day...");
  const days = await prisma.day.findMany();
  for (const d of days) {
    let changed = false;
    let data = {};
    for (const f of ["description", "image"]) {
      if (d[f]?.includes("data:image")) {
        const res = await processHtmlContent(d[f], `day-${d.journeyId}-${d.day || d.id}`);
        if (res.updated) {
          data[f] = res.newContent;
          changed = true;
          totalImagesConverted += res.count;
        }
      }
    }
    if (changed) {
      await prisma.day.update({ where: { id: d.id }, data });
      totalFixedRecords++;
      console.log(`[Day] Updated day id: ${d.id} for journeyId: ${d.journeyId}`);
    }
  }

  // 4. State
  console.log("\nChecking State...");
  const states = await prisma.state.findMany();
  for (const s of states) {
    let changed = false;
    let data = {};
    for (const f of ["moreDescription", "overView", "seoDescription", "thumbImg"]) {
      if (s[f]?.includes("data:image")) {
        const res = await processHtmlContent(s[f], `state-${s.slug}-${f}`);
        if (res.updated) {
          data[f] = res.newContent;
          changed = true;
          totalImagesConverted += res.count;
        }
      }
    }
    if (changed) {
      await prisma.state.update({ where: { id: s.id }, data });
      totalFixedRecords++;
      console.log(`[State] Updated ${s.slug} (id: ${s.id})`);
    }
  }

  // 5. City
  console.log("\nChecking City...");
  const cities = await prisma.city.findMany();
  for (const c of cities) {
    let changed = false;
    let data = {};
    for (const f of ["moreDescription", "overView", "seoDescription", "thumbImg"]) {
      if (c[f]?.includes("data:image")) {
        const res = await processHtmlContent(c[f], `city-${c.slug}-${f}`);
        if (res.updated) {
          data[f] = res.newContent;
          changed = true;
          totalImagesConverted += res.count;
        }
      }
    }
    if (changed) {
      await prisma.city.update({ where: { id: c.id }, data });
      totalFixedRecords++;
      console.log(`[City] Updated ${c.slug} (id: ${c.id})`);
    }
  }

  // 6. TravelExperience
  console.log("\nChecking TravelExperience...");
  const experiences = await prisma.travelExperience.findMany();
  for (const e of experiences) {
    let changed = false;
    let data = {};
    for (const f of ["moreDescription", "overView", "seoDescription", "thumbImg"]) {
      if (e[f]?.includes("data:image")) {
        const res = await processHtmlContent(e[f], `experience-${e.slug}-${f}`);
        if (res.updated) {
          data[f] = res.newContent;
          changed = true;
          totalImagesConverted += res.count;
        }
      }
    }
    if (changed) {
      await prisma.travelExperience.update({ where: { id: e.id }, data });
      totalFixedRecords++;
      console.log(`[TravelExperience] Updated ${e.slug} (id: ${e.id})`);
    }
  }

  // 7. CmsPage
  console.log("\nChecking CmsPage...");
  const cmsPages = await prisma.cmsPage.findMany();
  for (const p of cmsPages) {
    let changed = false;
    let data = {};
    for (const f of ["moreDescription", "seoDescription"]) {
      if (p[f]?.includes("data:image")) {
        const res = await processHtmlContent(p[f], `cmspage-${p.slug}-${f}`);
        if (res.updated) {
          data[f] = res.newContent;
          changed = true;
          totalImagesConverted += res.count;
        }
      }
    }
    if (changed) {
      await prisma.cmsPage.update({ where: { id: p.id }, data });
      totalFixedRecords++;
      console.log(`[CmsPage] Updated ${p.slug} (id: ${p.id})`);
    }
  }

  console.log("\n=== COMPLETED BASE64 IMAGE EXTRACTION ===");
  console.log(`Total records updated: ${totalFixedRecords}`);
  console.log(`Total base64 images extracted & converted to WebP: ${totalImagesConverted}`);
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
