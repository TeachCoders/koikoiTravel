import { Router } from 'express';
import { randomBytes } from 'crypto';
import { requireSuperAdmin } from '../middleware/requireSuperAdmin.js';
import { prisma } from '../utils/prismaConnection.js';
import {
  gscConfig,
  gscConfigured,
  gscOAuthUrl,
  gscExchangeCode,
  gscSearchPerformance,
  gscListSitemaps,
  gscInspectUrl,
  gscDisconnect,
} from '../utils/gscClient.js';

const router = Router();

/**
 * GET /analytics/gsc/status  (super admin)
 * Whether GSC is configured and whether an account is connected.
 */
router.get('/status', requireSuperAdmin, async (_req, res) => {
  try {
    const configured = gscConfigured();
    const refresh = await prisma.analyticsSetting.findUnique({ where: { key: 'gsc_refresh_token' } });
    res.json({ configured, connected: configured && Boolean(refresh?.value), siteUrl: gscConfig().siteUrl || null });
  } catch (err) {
    console.error('[GSC] status error', err);
    res.status(500).json({ error: 'internal error' });
  }
});

/** GET /analytics/gsc/auth  (super admin) → redirects to Google consent. */
router.get('/auth', requireSuperAdmin, (_req, res) => {
  if (!gscConfigured()) {
    return res.status(400).json({ error: 'Google Search Console is not configured (set GSC_* env vars).' });
  }
  const state = randomBytes(16).toString('hex');
  res.redirect(gscOAuthUrl(state));
});

/** GET /analytics/gsc/oauth-callback  (public, browser redirect target). */
router.get('/oauth-callback', async (req, res) => {
  try {
    const { code, error } = req.query;
    if (error || !code) {
      return res.status(400).send(`Google sign-in cancelled or failed: ${String(error || 'no code')}`);
    }
    await gscExchangeCode(String(code));
    res.redirect('/dashboard/analytics/search-console');
  } catch (err) {
    console.error('[GSC] oauth-callback error', err);
    res.status(500).send('Failed to connect Google Search Console. Check backend logs.');
  }
});

/** GET /analytics/gsc/search-performance  (super admin) */
router.get('/search-performance', requireSuperAdmin, async (req, res) => {
  try {
    const start = String(req.query.startDate || '');
    const end = String(req.query.endDate || '');
    const dimension = ['query', 'page', 'country', 'device'].includes(String(req.query.dimension))
      ? String(req.query.dimension)
      : 'query';
    const rows = Math.min(50, Math.max(1, Number(req.query.rows) || 20));
    if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || !/^\d{4}-\d{2}-\d{2}$/.test(end)) {
      return res.status(400).json({ error: 'startDate and endDate are required as YYYY-MM-DD' });
    }
    const result = await gscSearchPerformance({ startDate: start, endDate: end, dimension, rows });
    res.json(result);
  } catch (err) {
    if (err.code === 'GSC_NOT_CONNECTED') return res.status(401).json({ error: 'Google Search Console not connected' });
    console.error('[GSC] performance error', err);
    res.status(err.status || 500).json({ error: err.message || 'internal error' });
  }
});

/** GET /analytics/gsc/sitemaps  (super admin) */
router.get('/sitemaps', requireSuperAdmin, async (_req, res) => {
  try {
    const sitemaps = await gscListSitemaps();
    res.json(sitemaps);
  } catch (err) {
    if (err.code === 'GSC_NOT_CONNECTED') return res.status(401).json({ error: 'Google Search Console not connected' });
    console.error('[GSC] sitemaps error', err);
    res.status(err.status || 500).json({ error: err.message || 'internal error' });
  }
});

/** POST /analytics/gsc/url-inspection  (super admin) */
router.post('/url-inspection', requireSuperAdmin, async (req, res) => {
  try {
    const { url } = req.body;
    if (!url || !/^https?:\/\//.test(String(url))) {
      return res.status(400).json({ error: 'A valid http(s) URL is required' });
    }
    const result = await gscInspectUrl(String(url));
    res.json(result);
  } catch (err) {
    if (err.code === 'GSC_NOT_CONNECTED') return res.status(401).json({ error: 'Google Search Console not connected' });
    console.error('[GSC] url-inspection error', err);
    res.status(err.status || 500).json({ error: err.message || 'internal error' });
  }
});

/** POST /analytics/gsc/disconnect  (super admin) */
router.post('/disconnect', requireSuperAdmin, async (_req, res) => {
  try {
    await gscDisconnect();
    res.json({ success: true });
  } catch (err) {
    console.error('[GSC] disconnect error', err);
    res.status(500).json({ error: 'internal error' });
  }
});

export default router;