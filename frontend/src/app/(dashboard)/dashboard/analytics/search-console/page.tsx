import { guardSuperAdmin } from '@/lib/authGuard';
import AnalyticsLayout from '@/components/analytics/AnalyticsLayout';
import GscDashboard from './GscDashboard';

export const metadata = {
  title: 'Google Search Console | Koikoi travel',
};

export default async function SearchConsolePage() {
  await guardSuperAdmin();
  return (
    <AnalyticsLayout
      title="Google Search Console"
      subtitle="Google search performance, sitemaps and URL indexing status"
    >
      <GscDashboard />
    </AnalyticsLayout>
  );
}