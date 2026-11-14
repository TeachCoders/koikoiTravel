// Backfill: resolve countries for sessions that have an IP but no country yet.
// Usage: node scripts/backfill-countries.js
import { prisma } from '../utils/prismaConnection.js';
import { resolveCountry, isPrivateIp } from '../utils/geo.js';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const RATE_LIMIT_MS = 250;

async function main() {
  const rows = await prisma.userSession.findMany({
    where: { country: null },
    select: { id: true, ipAddress: true },
    take: 10000,
  });

  const byIp = new Map();
  for (const r of rows) {
    if (r.ipAddress) byIp.set(r.ipAddress, (byIp.get(r.ipAddress) || 0) + 1);
  }

  const ips = [...byIp.keys()].filter((ip) => !isPrivateIp(ip));
  console.log(`Sessions without country: ${rows.length}`);
  console.log(`Unique public IPs to resolve: ${ips.length}`);

  let updated = 0;
  let unresolved = 0;
  for (let i = 0; i < ips.length; i++) {
    const ip = ips[i];
    const country = await resolveCountry(ip);
    await delay(RATE_LIMIT_MS);
    if (!country) {
      unresolved += 1;
      continue;
    }
    const res = await prisma.userSession.updateMany({
      where: { ipAddress: ip, country: null },
      data: { country },
    });
    updated += res.count;
    console.log(`  [${i + 1}/${ips.length}] ${ip} -> ${country} (${res.count} sessions)`);
  }

  console.log(`Done: ${updated} sessions updated, ${unresolved} IPs unresolved.`);
}

main()
  .catch((e) => {
    console.error('Backfill error:', e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());