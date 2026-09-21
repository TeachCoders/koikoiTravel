import { guardSuperAdmin } from '@/lib/authGuard';
import AnalyticsLayout from '@/components/analytics/AnalyticsLayout';
import BrokenPagesPanel from '@/components/analytics/BrokenPagesPanel';

export const metadata = {
  title: 'Broken Pages (404) | KoiKoi Travel',
};

export default async function BrokenPagesPage() {
  await guardSuperAdmin();
  return (
    <AnalyticsLayout
      title="Broken Pages (404)"
      subtitle="Pages where visitors hit a 404 on the public site, with the page that led them there. Auto-cleared when a page starts working again."
    >
      <BrokenPagesPanel />
    </AnalyticsLayout>
  );
}