import { Router } from "express";
import fs from "fs";
import path from "path";
import { prisma } from "../utils/prismaConnection.js";
import { requireSalesOrAdmin } from "../middleware/requireSalesOrAdmin.js";
import { uploadImage } from "../utils/uploadImage.js";
import { logger } from "../utils/logger.js";

const router = Router();

const bannerUpload = uploadImage("hero-banners");

/**
 * GET /hero-full-banner
 * Public endpoint to fetch hero banners for a specific page / entity.
 * Query: ?entityType=City&entityId=5  OR  ?entityType=State&slug=rajasthan
 */
router.get("/", async (req, res) => {
  try {
    const { entityType, entityId, slug, pageSlug } = req.query;

    if (!entityType) {
      return res.status(400).json({ success: false, message: "entityType is required" });
    }

    const where = {
      entityType: String(entityType),
    };

    const parsedId = entityId !== undefined && entityId !== null && entityId !== "" ? Number(entityId) : null;
    const lookupSlug = slug || pageSlug;

    if (parsedId !== null && !isNaN(parsedId) && parsedId > 0 && lookupSlug) {
      where.OR = [
        { entityId: parsedId },
        { pageSlug: String(lookupSlug).trim().toLowerCase() },
      ];
    } else if (parsedId !== null && !isNaN(parsedId) && parsedId > 0) {
      where.entityId = parsedId;
    } else if (lookupSlug) {
      where.pageSlug = String(lookupSlug).trim().toLowerCase();
    }

    const banners = await prisma.heroFullBanner.findMany({
      where,
      orderBy: { displayOrder: "asc" },
    });

    return res.json({ success: true, data: banners });
  } catch (error) {
    logger.error("Error fetching hero banner:", { error: error.message, stack: error.stack });
    return res.status(500).json({ success: false, message: "Failed to fetch hero banner" });
  }
});

/**
 * GET /hero-full-banner/all
 * Admin list of all registered hero banners.
 */
router.get("/all", requireSalesOrAdmin, async (req, res) => {
  try {
    const banners = await prisma.heroFullBanner.findMany({
      orderBy: [{ entityType: "asc" }, { displayOrder: "asc" }, { createdAt: "desc" }],
    });
    return res.json({ success: true, data: banners });
  } catch (error) {
    logger.error("Error listing all hero banners:", { error: error.message, stack: error.stack });
    return res.status(500).json({ success: false, message: "Failed to list hero banners" });
  }
});

/**
 * POST /hero-full-banner
 * Admin endpoint to upload and create a new hero banner.
 */
router.post("/", requireSalesOrAdmin, bannerUpload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Banner image file is required" });
    }

    const { entityType, entityId, pageSlug, title, subtitle, altText, displayOrder } = req.body;

    if (!entityType) {
      return res.status(400).json({ success: false, message: "entityType is required" });
    }

    // Relative public URL
    const imagePath = `/${req.file.path.replace(/^public[\\/]/, "").replace(/\\/g, "/")}`;

    const parsedId = entityId !== undefined && entityId !== null && entityId !== "" ? Number(entityId) : 0;
    const parsedOrder = displayOrder !== undefined ? Number(displayOrder) : 0;

    const banner = await prisma.heroFullBanner.create({
      data: {
        entityType: String(entityType).trim(),
        entityId: isNaN(parsedId) ? 0 : parsedId,
        pageSlug: pageSlug ? String(pageSlug).trim().toLowerCase() : null,
        image: imagePath,
        title: title ? String(title).trim() : null,
        subtitle: subtitle ? String(subtitle).trim() : null,
        altText: altText ? String(altText).trim() : null,
        displayOrder: isNaN(parsedOrder) ? 0 : parsedOrder,
      },
    });

    return res.status(201).json({ success: true, data: banner });
  } catch (error) {
    logger.error("Error creating hero banner:", { error: error.message, stack: error.stack });
    return res.status(500).json({ success: false, message: "Failed to create hero banner" });
  }
});

/**
 * DELETE /hero-full-banner/:id
 * Delete a hero banner and remove the image file from disk.
 */
router.delete("/:id", requireSalesOrAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ success: false, message: "Invalid banner ID" });
    }

    const existing = await prisma.heroFullBanner.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: "Hero banner not found" });
    }

    // Attempt to remove physical file from public directory
    if (existing.image && existing.image.startsWith("/")) {
      const diskPath = path.join("public", existing.image.replace(/^\//, ""));
      if (fs.existsSync(diskPath)) {
        try {
          fs.unlinkSync(diskPath);
        } catch (unlinkErr) {
          logger.warn("Could not delete banner file from disk:", { path: diskPath, error: unlinkErr.message });
        }
      }
    }

    await prisma.heroFullBanner.delete({ where: { id } });

    return res.json({ success: true, message: "Hero banner deleted successfully" });
  } catch (error) {
    logger.error("Error deleting hero banner:", { error: error.message, stack: error.stack });
    return res.status(500).json({ success: false, message: "Failed to delete hero banner" });
  }
});

export default router;
