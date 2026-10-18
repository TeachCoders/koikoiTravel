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
 * Admin endpoint to upload and create one or multiple hero banners.
 */
router.post("/", requireSalesOrAdmin, bannerUpload.any(), async (req, res) => {
  try {
    const files = req.files || (req.file ? [req.file] : []);
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, message: "At least one banner image file is required" });
    }

    const { entityType, entityId, pageSlug, title, subtitle, altText, displayOrder } = req.body;

    if (!entityType) {
      return res.status(400).json({ success: false, message: "entityType is required" });
    }

    const parsedId = entityId !== undefined && entityId !== null && entityId !== "" ? Number(entityId) : 0;
    const baseOrder = displayOrder !== undefined ? Number(displayOrder) : 0;

    const createdBanners = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imagePath = `/${file.path.replace(/^public[\\/]/, "").replace(/\\/g, "/")}`;

      const banner = await prisma.heroFullBanner.create({
        data: {
          entityType: String(entityType).trim(),
          entityId: isNaN(parsedId) ? 0 : parsedId,
          pageSlug: pageSlug ? String(pageSlug).trim().toLowerCase() : null,
          image: imagePath,
          title: title ? String(title).trim() : null,
          subtitle: subtitle ? String(subtitle).trim() : null,
          altText: altText ? String(altText).trim() : null,
          displayOrder: (isNaN(baseOrder) ? 0 : baseOrder) + i,
        },
      });
      createdBanners.push(banner);
    }

    return res.status(201).json({
      success: true,
      message: `${createdBanners.length} hero banner(s) uploaded successfully`,
      data: createdBanners.length === 1 ? createdBanners[0] : createdBanners,
      banners: createdBanners,
    });
  } catch (error) {
    logger.error("Error creating hero banner:", { error: error.message, stack: error.stack });
    return res.status(500).json({ success: false, message: "Failed to create hero banner" });
  }
});

/**
 * PUT /hero-full-banner/:id
 * Admin endpoint to update an existing hero banner, with optional new image replacement.
 */
router.put("/:id", requireSalesOrAdmin, bannerUpload.any(), async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ success: false, message: "Invalid banner ID" });
    }

    const existing = await prisma.heroFullBanner.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, message: "Hero banner not found" });
    }

    const { entityType, entityId, pageSlug, title, subtitle, altText, displayOrder } = req.body;
    const updateData = {};

    if (entityType !== undefined) updateData.entityType = String(entityType).trim();
    if (entityId !== undefined) {
      const parsedId = Number(entityId);
      updateData.entityId = isNaN(parsedId) ? 0 : parsedId;
    }
    if (pageSlug !== undefined) {
      updateData.pageSlug = pageSlug ? String(pageSlug).trim().toLowerCase() : null;
    }
    if (title !== undefined) updateData.title = title ? String(title).trim() : null;
    if (subtitle !== undefined) updateData.subtitle = subtitle ? String(subtitle).trim() : null;
    if (altText !== undefined) updateData.altText = altText ? String(altText).trim() : null;
    if (displayOrder !== undefined) {
      const parsedOrder = Number(displayOrder);
      updateData.displayOrder = isNaN(parsedOrder) ? 0 : parsedOrder;
    }

    // Optional replacement image
    const files = req.files || (req.file ? [req.file] : []);
    if (files && files.length > 0) {
      const file = files[0];
      const newImagePath = `/${file.path.replace(/^public[\\/]/, "").replace(/\\/g, "/")}`;
      updateData.image = newImagePath;

      // Clean up previous image if exists on disk
      if (existing.image && existing.image.startsWith("/")) {
        const oldDiskPath = path.join("public", existing.image.replace(/^\//, ""));
        if (fs.existsSync(oldDiskPath)) {
          try {
            fs.unlinkSync(oldDiskPath);
          } catch (unlinkErr) {
            logger.warn("Could not delete old banner file:", { error: unlinkErr.message });
          }
        }
      }
    }

    const updated = await prisma.heroFullBanner.update({
      where: { id },
      data: updateData,
    });

    return res.json({ success: true, message: "Hero banner updated successfully", data: updated });
  } catch (error) {
    logger.error("Error updating hero banner:", { error: error.message, stack: error.stack });
    return res.status(500).json({ success: false, message: "Failed to update hero banner" });
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
