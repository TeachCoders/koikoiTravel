import { Router } from "express";
import fs from "fs";
import path from "path";
import { prisma } from "../utils/prismaConnection.js";
import { requireSalesOrAdmin } from "../middleware/requireSalesOrAdmin.js";
import { uploadImage } from "../utils/uploadImage.js";
import { logger } from "../utils/logger.js";
import { notifyRevalidate } from "../services/revalidateService.js";

const router = Router();

const bannerUpload = uploadImage("hero-banners");

const purgeImageCachesAndRevalidate = async (slug) => {
  try {
    const cacheDir = "/var/cache/nginx/next_images";
    if (fs.existsSync(cacheDir)) {
      const entries = fs.readdirSync(cacheDir);
      for (const entry of entries) {
        fs.rmSync(path.join(cacheDir, entry), { recursive: true, force: true });
      }
    }
  } catch (err) {
    logger.warn("Could not clear nginx cache:", err);
  }

  try {
    const nextCacheDir = path.resolve(process.cwd(), "../frontend/.next/cache/images");
    if (fs.existsSync(nextCacheDir)) {
      const entries = fs.readdirSync(nextCacheDir);
      for (const entry of entries) {
        fs.rmSync(path.join(nextCacheDir, entry), { recursive: true, force: true });
      }
    }
  } catch (err) {
    logger.warn("Could not clear nextjs image cache:", err);
  }

  try {
    await notifyRevalidate("hero-banner", { slug });
  } catch (err) {
    logger.warn("Could not notify revalidate:", err);
  }
};

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
 * Supports both desktop banner (`image`) and optional mobile banner (`mobileImage`).
 */
router.post("/", requireSalesOrAdmin, bannerUpload.any(), async (req, res) => {
  try {
    const files = req.files || (req.file ? [req.file] : []);
    const { entityType, entityId, pageSlug, title, subtitle, altText, displayOrder } = req.body;

    if (!entityType) {
      return res.status(400).json({ success: false, message: "entityType is required" });
    }

    const parsedId = entityId !== undefined && entityId !== null && entityId !== "" ? Number(entityId) : 0;
    const baseOrder = displayOrder !== undefined ? Number(displayOrder) : 0;

    // Check if this is a multiple images batch upload (multiple files under "images" fieldname)
    const isMultipleMode = files.filter((f) => f.fieldname === "images").length > 0;

    if (isMultipleMode) {
      const createdBanners = [];
      const imageFiles = files.filter((f) => f.fieldname === "images");
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const imagePath = `/${file.path.replace(/^public[\\/]/, "").replace(/\\/g, "/")}`;

        const banner = await prisma.heroFullBanner.create({
          data: {
            entityType: String(entityType).trim(),
            entityId: isNaN(parsedId) ? 0 : parsedId,
            pageSlug: pageSlug ? String(pageSlug).trim().toLowerCase() : null,
            image: imagePath,
            mobileImage: null,
            title: title ? String(title).trim() : null,
            subtitle: subtitle ? String(subtitle).trim() : null,
            altText: altText ? String(altText).trim() : null,
            displayOrder: (isNaN(baseOrder) ? 0 : baseOrder) + i,
          },
        });
        createdBanners.push(banner);
      }

      await purgeImageCachesAndRevalidate(pageSlug || null);
      return res.status(201).json({
        success: true,
        message: `${createdBanners.length} hero banner(s) uploaded successfully`,
        data: createdBanners,
        banners: createdBanners,
      });
    }

    // Single banner upload: Look for desktop file and optional mobile file
    const desktopFile = files.find((f) => f.fieldname === "image") || files.find((f) => f.fieldname !== "mobileImage");
    const mobileFile = files.find((f) => f.fieldname === "mobileImage");

    const desktopImagePath = desktopFile
      ? `/${desktopFile.path.replace(/^public[\\/]/, "").replace(/\\/g, "/")}`
      : req.body.image
      ? String(req.body.image).trim()
      : null;

    const mobileImagePath = mobileFile
      ? `/${mobileFile.path.replace(/^public[\\/]/, "").replace(/\\/g, "/")}`
      : req.body.mobileImage
      ? String(req.body.mobileImage).trim()
      : null;

    if (!desktopImagePath) {
      return res.status(400).json({ success: false, message: "Desktop banner image is required" });
    }

    const banner = await prisma.heroFullBanner.create({
      data: {
        entityType: String(entityType).trim(),
        entityId: isNaN(parsedId) ? 0 : parsedId,
        pageSlug: pageSlug ? String(pageSlug).trim().toLowerCase() : null,
        image: desktopImagePath,
        mobileImage: mobileImagePath || null,
        title: title ? String(title).trim() : null,
        subtitle: subtitle ? String(subtitle).trim() : null,
        altText: altText ? String(altText).trim() : null,
        displayOrder: isNaN(baseOrder) ? 0 : baseOrder,
      },
    });

    await purgeImageCachesAndRevalidate(pageSlug || null);

    return res.status(201).json({
      success: true,
      message: "Hero banner created successfully",
      data: banner,
    });
  } catch (error) {
    logger.error("Error creating hero banner:", { error: error.message, stack: error.stack });
    return res.status(500).json({ success: false, message: "Failed to create hero banner" });
  }
});

/**
 * PUT /hero-full-banner/:id
 * Admin endpoint to update an existing hero banner, with optional desktop and mobile image replacement.
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

    const { entityType, entityId, pageSlug, title, subtitle, altText, displayOrder, removeMobileImage } = req.body;
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

    const files = req.files || (req.file ? [req.file] : []);
    const desktopFile = files.find((f) => f.fieldname === "image") || files.find((f) => f.fieldname !== "mobileImage");
    const mobileFile = files.find((f) => f.fieldname === "mobileImage");

    // Handle desktop image update
    if (desktopFile) {
      const newImagePath = `/${desktopFile.path.replace(/^public[\\/]/, "").replace(/\\/g, "/")}`;
      updateData.image = newImagePath;

      // Clean up previous image if exists on disk
      if (existing.image && existing.image.startsWith("/")) {
        const oldDiskPath = path.join("public", existing.image.replace(/^\//, ""));
        if (fs.existsSync(oldDiskPath)) {
          try {
            fs.unlinkSync(oldDiskPath);
          } catch (unlinkErr) {
            logger.warn("Could not delete old desktop banner file:", { error: unlinkErr.message });
          }
        }
      }
    } else if (req.body.image !== undefined && req.body.image.trim()) {
      updateData.image = req.body.image.trim();
    }

    // Handle mobile image update or removal
    if (mobileFile) {
      const newMobileImagePath = `/${mobileFile.path.replace(/^public[\\/]/, "").replace(/\\/g, "/")}`;
      updateData.mobileImage = newMobileImagePath;

      if (existing.mobileImage && existing.mobileImage.startsWith("/")) {
        const oldMobileDiskPath = path.join("public", existing.mobileImage.replace(/^\//, ""));
        if (fs.existsSync(oldMobileDiskPath)) {
          try {
            fs.unlinkSync(oldMobileDiskPath);
          } catch (unlinkErr) {
            logger.warn("Could not delete old mobile banner file:", { error: unlinkErr.message });
          }
        }
      }
    } else if (removeMobileImage === "true" || removeMobileImage === true) {
      updateData.mobileImage = null;
      if (existing.mobileImage && existing.mobileImage.startsWith("/")) {
        const oldMobileDiskPath = path.join("public", existing.mobileImage.replace(/^\//, ""));
        if (fs.existsSync(oldMobileDiskPath)) {
          try {
            fs.unlinkSync(oldMobileDiskPath);
          } catch (unlinkErr) {
            logger.warn("Could not delete old mobile banner file on removal:", { error: unlinkErr.message });
          }
        }
      }
    } else if (req.body.mobileImage !== undefined) {
      updateData.mobileImage = req.body.mobileImage ? String(req.body.mobileImage).trim() : null;
    }

    const updated = await prisma.heroFullBanner.update({
      where: { id },
      data: updateData,
    });

    await purgeImageCachesAndRevalidate(updated.pageSlug || existing.pageSlug || null);

    return res.json({ success: true, message: "Hero banner updated successfully", data: updated });
  } catch (error) {
    logger.error("Error updating hero banner:", { error: error.message, stack: error.stack });
    return res.status(500).json({ success: false, message: "Failed to update hero banner" });
  }
});
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

    // Attempt to remove physical files from public directory
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
    if (existing.mobileImage && existing.mobileImage.startsWith("/")) {
      const mobileDiskPath = path.join("public", existing.mobileImage.replace(/^\//, ""));
      if (fs.existsSync(mobileDiskPath)) {
        try {
          fs.unlinkSync(mobileDiskPath);
        } catch (unlinkErr) {
          logger.warn("Could not delete mobile banner file from disk:", { path: mobileDiskPath, error: unlinkErr.message });
        }
      }
    }

    await prisma.heroFullBanner.delete({ where: { id } });

    await purgeImageCachesAndRevalidate(existing.pageSlug || null);

    return res.json({ success: true, message: "Hero banner deleted successfully" });
  } catch (error) {
    logger.error("Error deleting hero banner:", { error: error.message, stack: error.stack });
    return res.status(500).json({ success: false, message: "Failed to delete hero banner" });
  }
});

export default router;
