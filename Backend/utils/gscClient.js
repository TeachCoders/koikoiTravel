import { prisma } from './prismaConnection.js';

/**
 * Google Search Console integration (OAuth 2.0, user consent).
 *
 * URL Inspection, Sitemaps and Search Analytics all need OAuth user consent —
 * GSC does not support service accounts for the full API surface – so tokens
 * are exchanged via the authorization-code flow and stored in the
 * `analytics_settings` table (keys `gsc_*`).
 */

const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const SCOPES = [
  'https://www.googleapis.com/auth/webmasters',
  'https://www.googleapis.com/auth/webmasters.readonly',
].join(' ');

export function gscConfig() {
  return {
    clientId: process.env.GSC_CLIENT_ID || '',
    clientSecret: process.env.GSC_CLIENT_SECRET || '',
    redirectUri: process.env.GSC_REDIRECT_URI || '',
    siteUrl: process.env.GSC_VERIFIED_SITE || '',
  };
}

export function gscConfigured() {
  const c = gscConfig();
  return Boolean(c.clientId && c.clientSecret && c.redirectUri && c.siteUrl);
}

const getToken = async (key) => {
  const row = await prisma.analyticsSetting.findUnique({ where: { key } });
  return row?.value ?? null;
};
const setToken = (key, value) =>
  prisma.analyticsSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });

async function getStoredTokens() {
  const [refreshToken, accessToken, expiresAt] = await Promise.all([
    getToken('gsc_refresh_token'),
    getToken('gsc_access_token'),
    getToken('gsc_access_token_expires_at'),
  ]);
  return { refreshToken, accessToken, expiresAt: expiresAt ? Number(expiresAt) : 0 };
}

async function storeTokens({ refresh_token, access_token, expires_in }) {
  await Promise.all([
    ...(refresh_token ? [setToken('gsc_refresh_token', refresh_token)] : []),
    setToken('gsc_access_token', access_token),
    setToken('gsc_access_token_expires_at', String(Date.now() + (expires_in || 3600) * 1000)),
  ]);
}

async function postTokenForm(body) {
  const config = gscConfig();
  const res = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ ...body, client_id: config.clientId, client_secret: config.clientSecret }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.error_description || data?.error || 'OAuth token exchange failed');
  return data;
}

export function gscOAuthUrl(state) {
  const config = gscConfig();
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    scope: SCOPES,
    access_type: 'offline',
    prompt: 'consent',
    state,
  });
  return `${AUTH_ENDPOINT}?${params.toString()}`;
}

/** Exchange the authorization code for tokens and store them. */
export async function gscExchangeCode(code) {
  const data = await postTokenForm({ code, grant_type: 'authorization_code', redirect_uri: gscConfig().redirectUri });
  await storeTokens(data);
  return true;
}

/** Fetch an access token (refreshing when expired), or null when not connected. */
async function getAccessToken() {
  const { refreshToken, accessToken, expiresAt } = await getStoredTokens();
  if (!refreshToken) return null;
  if (accessToken && expiresAt && Date.now() < expiresAt - 60_000) return accessToken;
  const data = await postTokenForm({ refresh_token: refreshToken, grant_type: 'refresh_token' });
  await storeTokens(data);
  return data.access_token;
}

/** Generic GSC API call. Throws with a readable message on failure. */
export async function gscApiRequest(path, { method = 'GET', body, params } = {}) {
  const token = await getAccessToken();
  if (!token) {
    const err = new Error('GSC not connected');
    err.code = 'GSC_NOT_CONNECTED';
    throw err;
  }
  const url = new URL(`https://www.googleapis.com/webmasters/v3${path}`);
  if (params) for (const [k, v] of Object.entries(params)) if (v != null) url.searchParams.set(k, String(v));
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 401) {
    const err = new Error('GSC session expired — reconnect');
    err.code = 'GSC_UNAUTHORIZED';
    throw err;
  }
  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok && res.status !== 200 && res.status !== 400) {
    const err = new Error(data?.error?.message || `GSC API error ${res.status}`);
    err.status = res.status;
    throw err;
  }
  if (res.status === 400 && data?.error?.message) {
    const err = new Error(data.error.message);
    err.status = 400;
    throw err;
  }
  return data;
}

/** Search Analytics (Search Performance) request. */
export async function gscSearchPerformance({ startDate, endDate, dimension = 'query', rows = 20, filters = [] }) {
  const config = gscConfig();
  const data = await gscApiRequest(`/sites/${encodeURIComponent(config.siteUrl)}/searchAnalytics/query`, {
    method: 'POST',
    body: {
      startDate,
      endDate,
      dimensions: [dimension],
      rowLimit: rows,
      dimensionFilterGroups: filters,
    },
  });
  const r = data || {};
  const rowsOut = (r.rows || []).map(row => ({
    keys: row.keys || [],
    clicks: row.clicks || 0,
    impressions: row.impressions || 0,
    ctr: row.ctr || 0,
    position: row.position || 0,
  }));
  return { dimension, rows: rowsOut };
}

export async function gscListSitemaps() {
  const config = gscConfig();
  const data = await gscApiRequest(`/sites/${encodeURIComponent(config.siteUrl)}/sitemaps`);
  const entries = data?.sitemap || [];
  return entries.map(s => ({
    path: s.path,
    lastSubmitted: s.lastSubmitted || null,
    lastDownloaded: s.lastDownloaded || null,
    isPending: s.isPending || false,
    errors: s.errors || 0,
    contents: (s.contents || []).map(c => ({ type: c.type, submitted: c.submitted || 0, indexed: c.indexed || 0 })),
  }));
}

export async function gscInspectUrl(url) {
  const config = gscConfig();
  const data = await gscApiRequest('/urlInspection/index:inspect', {
    method: 'POST',
    body: { inspectionUrl: url, siteUrl: config.siteUrl },
  });
  const r = data?.inspectionResult || {};
  const v = r.indexStatusResult || {};
  const f = r.urlInspectionResult || {};
  return {
    url,
    indexStatus: v.indexingState || '—',
    coverageState: v.coverageState || '—',
    crawlingAllowed: f.crawlingAllowed !== false,
    indexingAllowed: f.indexingAllowed !== false,
    lastCrawlTime: f.lastCrawlTime || null,
    robotsTxtState: f.robotsTxtState || null,
    pageFetchState: f.pageFetchState || null,
  };
}

export async function gscDisconnect() {
  await prisma.analyticsSetting.deleteMany({ where: { key: { startsWith: 'gsc_' } } });
  return true;
}