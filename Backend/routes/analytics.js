import { Router } from 'express';
import { prisma } from '../utils/prismaConnection.js';
import rateLimit from 'express-rate-limit';
import { requireSuperAdmin } from '../middleware/requireSuperAdmin.js';
import { purgeExpiredAnalytics, DEFAULT_RETENTION_DAYS } from '../utils/analyticsRetention.js';
import { resolveCountry, countryFromHeaders } from '../utils/geo.js';

const router = Router();

const RETENTION_KEY = 'retentionDays';

// Rate limiting to prevent abuse on the public ingest endpoint.
const analyticsLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 300,
  message: { error: 'Too many analytics events, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate-limit the "authenticated session discarded" log line to once per session,
// so an admin browsing the public site doesn't spam the server console.
const loggedAuthDiscards = new Set();

// ── Shared date-range parsing ─────────────────────────────
// Accepts ?from=YYYY-MM-DD&to=YYYY-MM-DD (inclusive, end-of-day on `to`).
// Falls back to the last N days (default 30). Returns { gte, lte } or null.
function parseDateRange(req, fallbackDays = 30) {
  const now = new Date();
  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const endOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);

  let from, to;
  if (req.query.from && req.query.to) {
    from = new Date(String(req.query.from));
    to = new Date(String(req.query.to));
    if (isNaN(from) || isNaN(to)) return null;
    return { gte: startOfDay(from), lte: endOfDay(to) };
  }
  to = endOfDay(now);
  from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (fallbackDays - 1));
  return { gte: from, lte: to };
}

// Crude UA parser → { browser, os, device }. Works without adding deps.
function parseUserAgent(ua = '') {
  const u = ua.toLowerCase();
  let browser = 'Other';
  if (u.includes('edg/') || u.includes('edge/')) browser = 'Edge';
  else if (u.includes('opr/') || u.includes('opera')) browser = 'Opera';
  else if (u.includes('chrome/') && !u.includes('chromium')) browser = 'Chrome';
  else if (u.includes('safari/') && u.includes('version/')) browser = 'Safari';
  else if (u.includes('firefox/')) browser = 'Firefox';
  else if (u.includes('msie') || u.includes('trident')) browser = 'Internet Explorer';

  let os = 'Other';
  if (u.includes('android')) os = 'Android';
  else if (u.includes('iphone') || u.includes('ipad') || u.includes('ios')) os = 'iOS';
  else if (u.includes('windows')) os = 'Windows';
  else if (u.includes('mac os') || u.includes('macintosh')) os = 'macOS';
  else if (u.includes('linux')) os = 'Linux';

  let device = 'Other';
  if (u.includes('ipad') || (u.includes('tablet') && !u.includes('mobile'))) device = 'Tablet';
  else if (u.includes('mobi')) device = 'Mobile';
  else device = 'Desktop';

  return { browser, os, device };
}

// ── Bot / crawler detection for the replay VIP list ─────────────────────
// Two signals decide whether a session is automated traffic:
//   1. User-Agent mentions a crawler/scraper/monitor/AI tool (bots brand themselves).
//   2. IP sits in a well-known cloud/datacenter range where no real end user lives
//      (Googlebot rendering, Lighthouse, uptime monitors, scrapers, VPN exits).
function detectSessionBot(userAgent = '', ip = '') {
  const ua = String(userAgent || '').toLowerCase();
  const find = (list) => list.find((t) => ua.includes(t));

  const search = find(['googlebot', 'bingbot', 'yandexbot', 'yandex/', 'duckduckbot', 'baiduspider', 'slurp', 'googleother', 'adsbot-google', 'mediapartners-google', 'page-speed-insights', 'lighthouse']);
  if (search) return { isBot: true, botSource: 'search_crawler' };

  const ai = find(['gptbot', 'claudebot', 'bytespider', 'perplexity', 'anthropic', 'openai', 'cohere', 'ai2bot', 'chatgpt']);
  if (ai) return { isBot: true, botSource: 'ai_crawler' };

  const tool = find(['bot', 'crawl', 'spider', 'scrape', 'scrapy', 'headless', 'phantomjs',
    'uptimerobot', 'pingdom', 'gtmetrix', 'screaming frog', 'ahrefs', 'semrush', 'majestic',
    'wayback', 'archive.org', 'facebookexternalhit', 'linkedinbot', 'twitterbot', 'curl/',
    'wget/', 'python-requests', 'go-http-client', 'node-fetch', 'okhttp', 'postmanruntime',
    'newrelic', 'datadog', 'monitoring', 'watchdog']);
  if (tool) return { isBot: true, botSource: 'other_bot' };

  if (isCloudIp(ip)) return { isBot: true, botSource: 'cloud_ip' };

  return { isBot: false, botSource: null };
}

// Curated cloud/datacenter first-octets + exact Googlebot render ranges.
// Conservative: Indian residential ISPs (and most home broadband) are untouched,
// which is what the replay list is really meant to surface.
function isCloudIp(ip = '') {
  if (!ip) return false;
  const p = ip.split('.').map(Number);
  if (p.length !== 4 || p.some((n) => Number.isNaN(n))) return false;
  const [a, b] = p;
  if (a === 66 && b === 249) return true; // Googlebot / Google render farm
  const cloud = new Set([
    3, 13, 18, 20, 34, 35, 40, 44, 45, 50, 52, 54, 72, 88,
    96, 104, 129, 135, 137, 138, 140, 141, 146, 149, 151, 152,
    157, 158, 159, 165, 167, 172, 173, 174, 175, 176, 177, 191,
    195, 205, 207, 209, 213, 216, 217, 146, 23,
  ]);
  return cloud.has(a);
}

export default router;

/* ─────────────────────────────────────────────
 * SESSION REPLAY (rrweb)
 * ───────────────────────────────────────────── */

const replayLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * POST /analytics/replay
 * Ingest a batch of rrweb events for a session.
 */
router.post('/replay', replayLimiter, async (req, res) => {
  try {
    const { sessionId, visitorId, events } = req.body;

    // Guests only: silently ignore recordings from authenticated sessions.
    if (req.session?.user?.id != null) {
      const sid = String(sessionId || 'anonymous');
      if (!loggedAuthDiscards.has(sid)) {
        loggedAuthDiscards.add(sid);
        console.warn(`[ANALYTICS] replay discarded: authenticated session ${sid}`);
      }
      return res.status(202).json({ success: true, discarded: 'authenticated-session' });
    }

    if (!sessionId || !Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ error: 'sessionId and non-empty events array required' });
    }

    const bodyUserId = Number(req.body.userId);
    const userId = Number.isInteger(req.session?.user?.id)
      ? req.session.user.id
      : Number.isInteger(bodyUserId)
        ? bodyUserId
        : null;

    await prisma.userSession.upsert({
      where: { id: sessionId },
      update: { endedAt: new Date(), ...(userId !== null ? { userId } : {}) },
      create: {
        id: sessionId,
        visitorId,
        userAgent: req.body.userAgent,
        deviceType: req.body.deviceType,
        ipAddress: req.ip,
        ...(userId !== null ? { userId } : {}),
      },
    }).catch(err => console.error('[ANALYTICS] replay session upsert error', err));

    // Best-effort geolocation for the country column (same as /events).
    if (req.ip) {
      resolveCountry(req.ip).then(c => {
        if (!c) return;
        prisma.userSession.updateMany({
          where: { id: sessionId, country: null },
          data: { country: c },
        }).catch(() => {});
      }).catch(() => {});
    }

    // Split oversized batches into chunks to stay well within column/body limits
    const CHUNK = 500;
    const batches = [];
    for (let i = 0; i < events.length; i += CHUNK) {
      batches.push({ sessionId, events: events.slice(i, i + CHUNK) });
    }
    await prisma.replayEvent.createMany({ data: batches });

    res.status(202).json({ success: true, stored: batches.length });
  } catch (err) {
    console.error('[ANALYTICS] replay ingest error', err);
    res.status(500).json({ error: 'internal error' });
  }
});

/**
 * GET /analytics/replay-sessions  (super admin)
 * Sessions that have recorded replays, newest first.
 * Query: ?page=1&pageSize=20&kind=all|humans|bots
 * Response: { sessions, totals: { all, humans, bots }, page, pageSize, totalPages }
 * Each session is tagged isBot/botSource so crawler & cloud traffic can be
 * filtered out while browsing.
 */
router.get('/replay-sessions', requireSuperAdmin, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const pageSize = Math.min(50, Math.max(1, parseInt(req.query.pageSize, 10) || 20));
    const kind = ['all', 'humans', 'bots'].includes(req.query.kind) ? req.query.kind : 'all';
    const range = parseDateRange(req, 30);

    const groups = await prisma.replayEvent.groupBy({
      by: ['sessionId'],
      _count: { id: true },
      _min: { createdAt: true },
      _max: { createdAt: true },
      where: range ? { createdAt: { gte: range.gte, lte: range.lte } } : undefined,
      orderBy: { _max: { createdAt: 'desc' } },
    });

    const sessions = await prisma.userSession.findMany({
      where: { id: { in: groups.map(r => r.sessionId) } },
      select: { id: true, visitorId: true, userId: true, startedAt: true, endedAt: true, country: true, deviceType: true, userAgent: true, ipAddress: true },
    });
    const sessionMap = new Map(sessions.map(s => [s.id, s]));

    // Multi-UA signal: one IP serving many distinct user-agents (or many sessions)
    // is a device-farm / scanner, never a real household. Used to catch robots that
    // forge normal-looking browser UAs (e.g. the single-VPS Malaysia traffic).
    const ipStats = new Map();
    for (const s of sessions) {
      const ip = s.ipAddress || '';
      if (!ip) continue;
      const st = ipStats.get(ip) || { sessions: 0, uas: new Set() };
      st.sessions += 1;
      if (s.userAgent) st.uas.add(s.userAgent);
      ipStats.set(ip, st);
    }
    const isMultiUa = (ip) => {
      const st = ipStats.get(ip);
      if (!st) return false;
      return st.uas.size >= 6 || (st.uas.size >= 3 && st.sessions >= 6);
    };

    const userIds = [...new Set(sessions.map(s => s.userId).filter(Boolean))];
    const users = userIds.length
      ? await prisma.users.findMany({ where: { id: { in: userIds } }, select: { id: true, name: true, email: true } })
      : [];
    const userMap = new Map(users.map(u => [u.id, u]));

    const rows = groups.map(r => {
      const s = sessionMap.get(r.sessionId);
      const ua = s?.userAgent || '';
      const ip = s?.ipAddress || '';
      const bot = detectSessionBot(ua, ip);
      const effectiveBot = bot.isBot ? bot : isMultiUa(ip) ? { isBot: true, botSource: 'multi_ua' } : bot;
      return {
        ...effectiveBot,
        sessionId: r.sessionId,
        visitorId: s?.visitorId || null,
        country: s?.country || 'Unknown',
        deviceType: s?.deviceType || parseUserAgent(ua).device,
        user: s?.userId ? (userMap.get(s.userId) || null) : null,
        batchCount: r._count.id,
        startedAt: s?.startedAt || r._min.createdAt,
        lastEventAt: r._max.createdAt,
        durationSec: s?.startedAt && s?.endedAt
          ? Math.max(0, (new Date(s.endedAt).getTime() - new Date(s.startedAt).getTime()) / 1000)
          : null,
      };
    });

    const totals = {
      all: rows.length,
      humans: rows.filter(x => !x.isBot).length,
      bots: rows.filter(x => x.isBot).length,
    };

    const filtered = kind === 'all' ? rows
      : kind === 'bots' ? rows.filter(x => x.isBot)
      : rows.filter(x => !x.isBot);
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const clampedPage = Math.min(page, totalPages);
    const paged = filtered.slice((clampedPage - 1) * pageSize, clampedPage * pageSize);

    res.json({ sessions: paged, totals, page: clampedPage, pageSize, totalPages });
  } catch (err) {
    console.error('[ANALYTICS] replay-sessions error', err);
    res.status(500).json({ error: 'internal error' });
  }
});


/**
 * GET /analytics/replay/:sessionId  (super admin)
 * Full ordered event stream for one session – playable in rrweb-player.
 */
router.get('/replay/:sessionId', requireSuperAdmin, async (req, res) => {
  try {
    const batches = await prisma.replayEvent.findMany({
      where: { sessionId: req.params.sessionId },
      orderBy: { createdAt: 'asc' },
    });
    // Batches were flushed sequentially; restore order by flattening.
    const events = batches.flatMap(b => Array.isArray(b.events) ? b.events : []);
    const meta = await prisma.userSession.findUnique({
      where: { id: req.params.sessionId },
      select: { country: true, deviceType: true, startedAt: true, totalTimeSpent: true },
    });
    res.json({
      sessionId: req.params.sessionId,
      count: events.length,
      events,
      country: meta?.country || null,
      deviceType: meta?.deviceType || null,
    });
  } catch (err) {
    console.error('[ANALYTICS] replay fetch error', err);
    res.status(500).json({ error: 'internal error' });
  }
});

/**
 * DELETE /analytics/replay/:sessionId  (super admin)
 */
router.delete('/replay/:sessionId', requireSuperAdmin, async (req, res) => {
  try {
    await prisma.replayEvent.deleteMany({ where: { sessionId: req.params.sessionId } });
    res.json({ success: true });
  } catch (err) {
    console.error('[ANALYTICS] replay delete error', err);
    res.status(500).json({ error: 'internal error' });
  }
});

/* ─────────────────────────────────────────────
 * DATA RETENTION (auto-delete after N days)
 * ───────────────────────────────────────────── */

async function getRetentionDays() {
  const row = await prisma.analyticsSetting.findUnique({ where: { key: RETENTION_KEY } });
  const n = Number(row?.value);
  return Number.isInteger(n) && n > 0 ? n : DEFAULT_RETENTION_DAYS;
}

router.get('/retention-days', requireSuperAdmin, async (req, res) => {
  try {
    res.json({ retentionDays: await getRetentionDays() });
  } catch (err) {
    console.error('[ANALYTICS] retention get error', err);
    res.status(500).json({ error: 'internal error' });
  }
});

router.put('/retention-days', requireSuperAdmin, async (req, res) => {
  try {
    const days = Number(req.body.retentionDays);
    if (!Number.isInteger(days) || days < 1 || days > 3650) {
      return res.status(400).json({ success: false, message: 'retentionDays must be an integer between 1 and 3650' });
    }
    await prisma.analyticsSetting.upsert({
      where: { key: RETENTION_KEY },
      update: { value: String(days) },
      create: { key: RETENTION_KEY, value: String(days) },
    });
    // Apply the new policy immediately instead of waiting for the nightly job.
    const deleted = await purgeExpiredAnalytics();
    res.json({ success: true, retentionDays: days, deleted });
  } catch (err) {
    console.error('[ANALYTICS] retention set error', err);
    res.status(500).json({ error: 'internal error' });
  }
});

/* ─────────────────────────────────────────────
 * BROKEN-PAGE / 404 TRACKING
 * ───────────────────────────────────────────── */

/**
 * POST /analytics/events  (public)
 * Batched ingestion of activity events (BROKEN_LINK, PAGE_VIEW, etc).
 * Guests only: authenticated sessions are silently ignored.
 */
router.post('/events', analyticsLimiter, async (req, res) => {
  try {
    const sessionId = req.body?.sessionId;
    const events = req.body?.events;

    // Guests only — admin sessions are never recorded.
    if (req.session?.user?.id != null) {
      const sid = String(sessionId || 'anonymous');
      if (!loggedAuthDiscards.has(sid)) {
        loggedAuthDiscards.add(sid);
        console.warn(`[ANALYTICS] events discarded: authenticated session ${sid}`);
      }
      return res.status(202).json({ success: true, discarded: 'authenticated-session' });
    }

    if (!sessionId || !Array.isArray(events) || events.length === 0) {
      return res.status(400).json({ error: 'sessionId and events array required' });
    }

    const { visitorId, userId, userAgent, deviceType, referrer, totalTimeSpent, country } = req.body;

    const bodyUserId = Number(userId);
    const resolvedUserId = Number.isInteger(req.session?.user?.id)
      ? req.session.user.id
      : Number.isInteger(bodyUserId)
        ? bodyUserId
        : null;

    await prisma.userSession.upsert({
      where: { id: sessionId },
      update: {
        endedAt: new Date(),
        totalTimeSpent: totalTimeSpent || 0,
        ...(referrer ? { referrer } : {}),
        ...(resolvedUserId !== null ? { userId: resolvedUserId } : {}),
      },
      create: {
        id: sessionId,
        visitorId,
        country,
        userAgent,
        deviceType: deviceType || parseUserAgent(userAgent).device,
        ipAddress: req.ip,
        ...(referrer ? { referrer } : {}),
        ...(resolvedUserId !== null ? { userId: resolvedUserId } : {}),
      },
    }).catch(err => console.error('[ANALYTICS] session upsert error', err));

    if (req.ip) {
      const headerCountry = countryFromHeaders(req.headers);
      Promise.resolve(headerCountry || resolveCountry(req.ip)).then(c => {
        if (!c) return;
        prisma.userSession.updateMany({
          where: { id: sessionId, country: null },
          data: { country: c },
        }).catch(() => {});
      }).catch(() => {});
    }

    const activityLogs = events
      .filter(e => e.type !== 'SEARCH_INTENT')
      .map(e => ({
        sessionId,
        eventName: e.eventName,
        pagePath: e.pagePath,
        sectionId: e.sectionId,
        dwellTimeMs: e.dwellTimeMs ? Math.round(e.dwellTimeMs) : undefined,
        element: e.element,
        metadata: e.metadata || {},
        createdAt: e.createdAt ? new Date(e.createdAt) : new Date(),
      }));

    if (activityLogs.length > 0) {
      await prisma.activityLog.createMany({ data: activityLogs, skipDuplicates: true });
    }

    res.status(202).json({ success: true, processed: events.length });
  } catch (err) {
    console.error('[ANALYTICS] events error', err);
    res.status(500).json({ error: 'internal error' });
  }
});

/**
 * GET /analytics/broken-pages  (super admin)
 * Aggregates BROKEN_LINK hits per page path. Health-checks each URL; if a page
 * now resolves (200/3xx) its BROKEN_LINK rows are auto-deleted. Returns the
 * still-broken pages with the source pages visitors were redirected from.
 */
router.get('/broken-pages', requireSuperAdmin, async (req, res) => {
  try {
    const range = parseDateRange(req, 30);
    const gte = range?.gte ?? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const lte = range?.lte ?? new Date();

    const brokenRows = await prisma.$queryRaw`
      SELECT
        "pagePath",
        COUNT(*) AS "hits",
        COUNT(DISTINCT "sessionId") AS "visitors"
      FROM "activity_logs"
      WHERE "eventName" = 'BROKEN_LINK'
        AND "createdAt" >= ${gte}
        AND "createdAt" <= ${lte}
      GROUP BY "pagePath"
      ORDER BY "hits" DESC
      LIMIT 50;
    `;

    // Health check each tracked URL; auto-resolve any that now load.
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'http://localhost:3000';
    const checkUrl = async (path) => {
      try {
        const res = await fetch(`${baseUrl}${path}`, {
          method: 'HEAD',
          signal: AbortSignal.timeout(4000),
          redirect: 'follow',
        });
        return { path, ok: res.ok || (res.status >= 300 && res.status < 400) };
      } catch {
        return { path, ok: false };
      }
    };
    const uniquePaths = [...new Set(brokenRows.map(r => r.pagePath).filter(Boolean))];
    const healthResults = [];
    for (let i = 0; i < uniquePaths.length; i += 5) {
      healthResults.push(...await Promise.all(uniquePaths.slice(i, i + 5).map(checkUrl)));
    }
    const resolvedPaths = healthResults.filter(r => r.ok).map(r => r.path);
    if (resolvedPaths.length > 0) {
      await prisma.activityLog.deleteMany({
        where: { eventName: 'BROKEN_LINK', pagePath: { in: resolvedPaths } },
      });
    }

    const stillBroken = brokenRows.filter(r => !resolvedPaths.includes(r.pagePath));

    let pages = [];
    if (stillBroken.length > 0) {
      const logs = await prisma.activityLog.findMany({
        where: {
          eventName: 'BROKEN_LINK',
          pagePath: { in: stillBroken.map(r => r.pagePath) },
          createdAt: { gte, lte },
        },
        orderBy: { createdAt: 'desc' },
        take: 500,
      });

      pages = stillBroken.map(p => {
        const pageLogs = logs.filter(l => l.pagePath === p.pagePath);
        const fromMap = new Map();
        for (const l of pageLogs) {
          const from = l.metadata?.from || 'Direct / Unknown';
          const cur = fromMap.get(from) || { source: from, count: 0, lastAt: null };
          cur.count += 1;
          if (!cur.lastAt || new Date(l.createdAt) > new Date(cur.lastAt)) cur.lastAt = l.createdAt;
          fromMap.set(from, cur);
        }
        const fromPages = [...fromMap.values()]
          .sort((a, b) => b.count - a.count)
          .map(s => ({ source: s.source, count: s.count, lastAt: s.lastAt }));
        const issues = pageLogs.slice(0, 20).map(l => ({
          source: l.metadata?.from || 'Direct / Unknown',
          clickedLink: l.element || null,
          clickedText: l.metadata?.clickedText || null,
          referrer: l.metadata?.referrer || null,
          sessionId: l.sessionId,
          createdAt: l.createdAt,
        }));
        return {
          pagePath: p.pagePath,
          hits: Number(p.hits),
          visitors: Number(p.visitors),
          fromPages,
          issues,
        };
      });
    }

    res.json({ success: true, pages, resolvedPaths });
  } catch (err) {
    console.error('[ANALYTICS] broken-pages error', err);
    res.status(500).json({ error: 'internal error' });
  }
});

/**
 * POST /analytics/resolve-404  (super admin)
 * Manually clear all BROKEN_LINK rows for a page path (issue fixed).
 */
router.post('/resolve-404', requireSuperAdmin, async (req, res) => {
  try {
    const { pagePath } = req.body;
    if (!pagePath) return res.status(400).json({ error: 'pagePath required' });
    const deleted = await prisma.activityLog.deleteMany({
      where: { eventName: 'BROKEN_LINK', pagePath },
    });
    res.json({ success: true, deleted: deleted.count });
  } catch (err) {
    console.error('[ANALYTICS] resolve-404 error', err);
    res.status(500).json({ error: 'internal error' });
  }
});

/**
 * POST /analytics/data/purge  (super admin)
 * Run the retention purge right now (deletes everything older than retentionDays).
 */
router.post('/data/purge', requireSuperAdmin, async (req, res) => {
  try {
    const deleted = await purgeExpiredAnalytics();
    res.json({ success: true, deleted });
  } catch (err) {
    console.error('[ANALYTICS] purge error', err);
    res.status(500).json({ error: 'internal error' });
  }
});

/**
 * POST /analytics/data/delete-all  (super admin)
 * Hard wipe of ALL analytics data (sessions + replay recordings).
 * Cascades remove children automatically.
 */
router.post('/data/delete-all', requireSuperAdmin, async (req, res) => {
  try {
    const deleted = await prisma.userSession.deleteMany();
    res.json({ success: true, deleted });
  } catch (err) {
    console.error('[ANALYTICS] delete-all error', err);
    res.status(500).json({ error: 'internal error' });
  }
});

