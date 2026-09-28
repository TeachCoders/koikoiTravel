import { logger } from "../utils/logger.js";

/**
 * Tell the Next.js frontend to drop its static cache for the paths an edit
 * touched. The frontend's marketing pages are prerendered, so without this an
 * editor would have to wait out the 5 minute revalidate window before the change
 * shows up.
 *
 * Fire and forget: the response is not awaited, so a slow or unreachable
 * frontend never blocks a save. The route itself is what enforces
 * authentication, via the shared secret header.
 */
export const notifyRevalidate = (entity, entityData = {}) => {
  const url = process.env.FRONTEND_REVALIDATE_URL;
  const secret = process.env.REVALIDATE_SECRET;

  if (!url || !secret) return;

  const payload = {
    entity,
    slug: entityData?.slug,
    country:
      entityData?.country?.slug ||
      entityData?.state?.country?.slug ||
      entityData?.state?.slug ||
      entityData?.countryId,
    state: entityData?.state?.slug,
  };

  try {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-revalidate-secret": secret,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    }).catch((err) => {
      logger.error(`[Revalidate Error] Failed for ${entity}:`, { message: err.message });
    });
  } catch (err) {
    logger.error(`[Revalidate Error] Exception for ${entity}:`, { message: err.message });
  }
};
