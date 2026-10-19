import { Router } from "express";
import { prisma } from "../utils/prismaConnection.js";
import { requireSalesOrAdmin } from "../middleware/requireSalesOrAdmin.js";
import { deleteMediaFile } from "../utils/uploadImage.js";
import { handlePrismaError } from "../utils/handlePrismaError.js";
import { logger } from "../utils/logger.js";

const router = Router();

const HIDDEN_FOLDERS = ["documents", "user"];

const toRelativePath = (url) => {
  try {
    return new URL(url).pathname.replace(/^\//, "");
  } catch {
    return null;
  }
};

// List media — pinned first, then sortOrder, then newest.
// Hidden folders (documents/, user/) are excluded from the library.
router.get("/", requireSalesOrAdmin, async (req, res) => {
  try {
    const media = await prisma.media.findMany({
      where: { folder: { notIn: HIDDEN_FOLDERS } },
      orderBy: [
        { isPinned: "desc" },
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ],
    });
    return res.json({ success: true, data: media });
  } catch (error) {
    logger.error("Media list error:", { error: error.message, stack: error.stack });
    return res.status(500).json({ success: false, message: "Failed to list media" });
  }
});

// Search media — matches label, filename, altText (case-insensitive)
router.get("/search", requireSalesOrAdmin, async (req, res) => {
  try {
    const q = (req.query.q ?? "").toString().trim();
    if (!q) return res.json({ success: true, data: [] });

    const media = await prisma.media.findMany({
      where: {
        folder: { notIn: HIDDEN_FOLDERS },
        OR: [
          { label: { contains: q, mode: "insensitive" } },
          { filename: { contains: q, mode: "insensitive" } },
          { altText: { contains: q, mode: "insensitive" } },
        ],
      },
      orderBy: [
        { isPinned: "desc" },
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ],
    });
    return res.json({ success: true, data: media });
  } catch (error) {
    logger.error("Media search error:", { error: error.message, stack: error.stack });
    return res.status(500).json({ success: false, message: "Failed to search media" });
  }
});

// Update media — pin, sortOrder, label (rename), altText, caption
router.patch("/:id", requireSalesOrAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ success: false, message: "Invalid media id" });

    if (req.body.isPinned !== undefined && typeof req.body.isPinned !== "boolean") {
      return res.status(400).json({ success: false, message: "'isPinned' must be a boolean" });
    }
    if (req.body.sortOrder !== undefined && !Number.isInteger(req.body.sortOrder)) {
      return res.status(400).json({ success: false, message: "'sortOrder' must be a number" });
    }

    const allowed = {};
    for (const key of ["isPinned", "sortOrder", "label", "altText", "caption", "category"]) {
      if (req.body[key] !== undefined) allowed[key] = req.body[key];
    }
    if (Object.keys(allowed).length === 0) {
      return res.status(400).json({ success: false, message: "Nothing to update" });
    }

    const media = await prisma.media.update({ where: { id }, data: allowed });
    return res.json({ success: true, data: media });
  } catch (error) {
    logger.error("Media update error:", { error: error.message, stack: error.stack });
    if (handlePrismaError(res, error, "Media")) return;
    return res.status(500).json({ success: false, message: "Failed to update media" });
  }
});

// Delete media — removes file from disk and DB record
router.delete("/:id", requireSalesOrAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ success: false, message: "Invalid media id" });

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) return res.status(404).json({ success: false, message: "Media not found" });

    const relPath = toRelativePath(media.url);
    if (relPath) {
      deleteMediaFile(relPath);
    }

    await prisma.media.delete({ where: { id } });
    return res.json({ success: true, message: "Media deleted" });
  } catch (error) {
    logger.error("Media delete error:", { error: error.message, stack: error.stack });
    if (handlePrismaError(res, error, "Media")) return;
    return res.status(500).json({ success: false, message: "Failed to delete media" });
  }
});

// Usage Summary — maps all image URLs to where they are used across the website
router.get("/usage-summary", requireSalesOrAdmin, async (req, res) => {
  try {
    const rows = await prisma.$queryRaw`
      SELECT url, count(*)::int as count, json_agg(json_build_object('type', type, 'title', title, 'link', link)) as usages
      FROM (
        SELECT "thumbImg" as url, 'City' as type, title, '/india/' || slug as link FROM "City" WHERE "thumbImg" IS NOT NULL
        UNION ALL
        SELECT "thumbImg" as url, 'State' as type, title, '/destinations/' || slug as link FROM "State" WHERE "thumbImg" IS NOT NULL
        UNION ALL
        SELECT "thumbImg" as url, 'Tour Package' as type, title, '/tour-packages/' || slug as link FROM "Journey" WHERE "thumbImg" IS NOT NULL
        UNION ALL
        SELECT jd.image as url, 'Itinerary Day' as type, j.title || ' (' || jd.day || ')' as title, '/tour-packages/' || j.slug as link 
        FROM "JourneyDay" jd JOIN "Journey" j ON jd."journeyId" = j.id WHERE jd.image IS NOT NULL
        UNION ALL
        SELECT "thumbImg" as url, 'Travel Experience' as type, title, '/travel-experiences/' || slug as link FROM "TravelExperience" WHERE "thumbImg" IS NOT NULL
        UNION ALL
        SELECT "thumbImg" as url, 'Season' as type, title, '/season/' || slug as link FROM "Month" WHERE "thumbImg" IS NOT NULL
        UNION ALL
        SELECT "thumbImg" as url, 'Blog Post' as type, title, '/blog/' || slug as link FROM "BlogPost" WHERE "thumbImg" IS NOT NULL
        UNION ALL
        SELECT "thumbImg" as url, 'CMS Page' as type, title, '/' || slug as link FROM "CmsPage" WHERE "thumbImg" IS NOT NULL
        UNION ALL
        SELECT image as url, 'Hero Banner' as type, coalesce(title, 'Banner: ' || "entityType") as title, coalesce('/' || "pageSlug", '/') as link FROM hero_full_banners WHERE image IS NOT NULL
        UNION ALL
        SELECT img as url, 'Hero Banner' as type, coalesce("bannerTitle", "entityType") as title, '/' as link FROM "Banner", unnest(images) as img WHERE img IS NOT NULL
        UNION ALL
        SELECT "imageUrl" as url, 'Guest Gallery' as type, coalesce(caption, 'Guest Photo') as title, '/guest-gallery' as link FROM guest_gallery WHERE "imageUrl" IS NOT NULL
      ) all_usages
      GROUP BY url;
    `;

    const usageMap = {};
    for (const r of rows) {
      if (r.url) usageMap[r.url] = r.usages || [];
    }

    return res.json({ success: true, data: usageMap });
  } catch (error) {
    logger.error("Usage summary error:", { error: error.message, stack: error.stack });
    return res.status(500).json({ success: false, message: "Failed to fetch media usage summary" });
  }
});

// Swap Media — replaces all occurrences of oldUrl with newUrl across all models
router.post("/swap", requireSalesOrAdmin, async (req, res) => {
  try {
    const { oldUrl, newUrl, deleteOld } = req.body;
    if (!oldUrl || !newUrl || typeof oldUrl !== "string" || typeof newUrl !== "string") {
      return res.status(400).json({ success: false, message: "Valid oldUrl and newUrl are required" });
    }
    if (oldUrl.trim() === newUrl.trim()) {
      return res.status(400).json({ success: false, message: "oldUrl and newUrl cannot be the same" });
    }

    const oUrl = oldUrl.trim();
    const nUrl = newUrl.trim();

    await prisma.$transaction([
      prisma.$executeRaw`UPDATE "City" SET "thumbImg" = ${nUrl} WHERE "thumbImg" = ${oUrl}`,
      prisma.$executeRaw`UPDATE "State" SET "thumbImg" = ${nUrl} WHERE "thumbImg" = ${oUrl}`,
      prisma.$executeRaw`UPDATE "Journey" SET "thumbImg" = ${nUrl} WHERE "thumbImg" = ${oUrl}`,
      prisma.$executeRaw`UPDATE "JourneyDay" SET "image" = ${nUrl} WHERE "image" = ${oUrl}`,
      prisma.$executeRaw`UPDATE "TravelExperience" SET "thumbImg" = ${nUrl} WHERE "thumbImg" = ${oUrl}`,
      prisma.$executeRaw`UPDATE "Month" SET "thumbImg" = ${nUrl} WHERE "thumbImg" = ${oUrl}`,
      prisma.$executeRaw`UPDATE "BlogPost" SET "thumbImg" = ${nUrl} WHERE "thumbImg" = ${oUrl}`,
      prisma.$executeRaw`UPDATE "CmsPage" SET "thumbImg" = ${nUrl} WHERE "thumbImg" = ${oUrl}`,
      prisma.$executeRaw`UPDATE hero_full_banners SET "image" = ${nUrl} WHERE "image" = ${oUrl}`,
      prisma.$executeRaw`UPDATE hero_full_banners SET "mobileImage" = ${nUrl} WHERE "mobileImage" = ${oUrl}`,
      prisma.$executeRaw`UPDATE guest_gallery SET "imageUrl" = ${nUrl} WHERE "imageUrl" = ${oUrl}`,
      prisma.$executeRaw`UPDATE "Banner" SET images = array_replace(images, ${oUrl}, ${nUrl}) WHERE ${oUrl} = ANY(images)`,
    ]);

    if (deleteOld) {
      const oldMedia = await prisma.media.findFirst({ where: { url: oUrl } });
      if (oldMedia) {
        const relPath = toRelativePath(oldMedia.url);
        if (relPath) deleteMediaFile(relPath);
        await prisma.media.delete({ where: { id: oldMedia.id } });
      }
    }

    return res.json({ success: true, message: `Successfully swapped image to "${nUrl}"` });
  } catch (error) {
    logger.error("Media swap error:", { error: error.message, stack: error.stack });
    return res.status(500).json({ success: false, message: "Failed to swap image" });
  }
});

export default router;
