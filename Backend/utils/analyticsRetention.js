import cron from 'node-cron';
import { prisma } from './prismaConnection.js';

/**
 * Deletes analytics data older than the configured retention period.
 * The retention value lives in AnalyticsSetting ('retentionDays'), settable
 * from the admin dashboard. Child rows (replay_events) are removed
 * automatically via onDelete: Cascade.
 */

/** Default retention when no AnalyticsSetting row exists yet. */
export const DEFAULT_RETENTION_DAYS = 15;
export async function purgeExpiredAnalytics() {
  try {
    const row = await prisma.analyticsSetting.findUnique({ where: { key: 'retentionDays' } });
    const n = Number(row?.value);
    const days = Number.isInteger(n) && n > 0 ? n : DEFAULT_RETENTION_DAYS;

    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const deleted = await prisma.userSession.deleteMany({
      where: { startedAt: { lt: cutoff } },
    });
    if (deleted.count > 0) {
      console.log(`[ANALYTICS] retention purge: removed ${deleted.count} sessions older than ${days} days`);
    }
    return deleted.count;
  } catch (err) {
    console.error('[ANALYTICS] retention purge error', err);
    return 0;
  }
}

/** Seeds the retentionDays setting on first boot. Create-only: an admin-chosen
 *  value is never overwritten, so this only fills in a sensible default when no
 *  row exists (fresh DBs, feature rollouts). */
export async function seedRetentionSetting() {
  try {
    const existing = await prisma.analyticsSetting.findUnique({ where: { key: 'retentionDays' } });
    if (existing) return;
    await prisma.analyticsSetting.create({
      data: { key: 'retentionDays', value: String(DEFAULT_RETENTION_DAYS) },
    });
    console.log(`[ANALYTICS] seeded retentionDays=${DEFAULT_RETENTION_DAYS} (new install)`);
  } catch (err) {
    console.error('[ANALYTICS] retention seed error', err);
  }
}

/** Runs the purge once at boot, nightly at 03:00, and a 6-hourly safety sweep
 *  so a missed 03:00 (server asleep/off) never stalls deletion. */
export function scheduleAnalyticsRetention() {
  setTimeout(() => {
    seedRetentionSetting().then(() => purgeExpiredAnalytics());
  }, 30_000);

  cron.schedule('0 3 * * *', () => {
    purgeExpiredAnalytics();
  });

  cron.schedule('0 */6 * * *', () => {
    purgeExpiredAnalytics();
  });

  console.log('[ANALYTICS] retention scheduler active (boot + nightly 03:00 + every 6h)');
}
