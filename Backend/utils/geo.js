// IP → city, state, country resolution.
// Strategy (in order):
//   1. `CF-IPCountry` header when the site sits behind Cloudflare (free, instant).
//   2. HTTPS lookup via ipwho.is (free, no key, gives City, State/Region, Country).
//   3. Fallback: ip-api.com over HTTP (gives City, Region, Country).
// Results are cached per-IP and never throw. Localhost/private IPs → null.

const ipLocationCache = new Map();

const PRIVATE_IP = (ip) =>
  !ip ||
  ip === '::1' ||
  ip === '127.0.0.1' ||
  ip.startsWith('::ffff:127.') ||
  ip.startsWith('10.') ||
  ip.startsWith('192.168.') ||
  /^172\.(1[6-9]|2[0-9]|3[01])\./.test(ip) ||
  ip.startsWith('fe80:');

function isPrivateIp(ip) {
  return Boolean(PRIVATE_IP(ip));
}

export function countryFromHeaders(headers = {}) {
  const cf = headers?.['cf-ipcountry'];
  return cf && cf !== 'XX' && cf !== null ? String(cf).toUpperCase() : null;
}

// Fetch with timeout; returns parsed JSON or null.
async function fetchJson(url, ms = 2500) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { Accept: 'application/json', 'Cache-Control': 'no-cache' },
    });
    return await res.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function lookupWithIpwhoIs(ip) {
  const d = await fetchJson(`https://ipwho.is/${encodeURIComponent(ip)}`);
  if (!d || d.success !== true) return null;
  const parts = [];
  if (d.city) parts.push(d.city);
  if (d.region && d.region !== d.city) parts.push(d.region);
  if (d.country) parts.push(d.country);
  return parts.length > 0 ? parts.join(', ') : d.country || null;
}

async function lookupWithIpApi(ip) {
  const d = await fetchJson(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,city,regionName,country,message`);
  if (d?.status !== 'success') return null;
  const parts = [];
  if (d.city) parts.push(d.city);
  if (d.regionName && d.regionName !== d.city) parts.push(d.regionName);
  if (d.country) parts.push(d.country);
  return parts.length > 0 ? parts.join(', ') : d.country || null;
}

export async function resolveCountry(ip) {
  if (PRIVATE_IP(ip)) return null;
  if (ipLocationCache.has(ip)) return ipLocationCache.get(ip);
  try {
    const loc = (await lookupWithIpwhoIs(ip)) || (await lookupWithIpApi(ip)) || null;
    ipLocationCache.set(ip, loc);
    return loc;
  } catch {
    ipLocationCache.set(ip, null);
    return null;
  }
}

export function clearCountryCache() {
  ipLocationCache.clear();
}

export { isPrivateIp };