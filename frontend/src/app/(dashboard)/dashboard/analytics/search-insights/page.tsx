import { guardSuperAdmin } from '@/lib/authGuard';
import AnalyticsLayout from '@/components/analytics/AnalyticsLayout';
import SearchInsightsPanel from '@/components/analytics/SearchInsightsPanel';

export const metadata = {
  title: 'Search Insights | Koikoi travel',
};

export default async function SearchInsightsPage() {
  await guardSuperAdmin();
  return (
    <AnalyticsLayout
      title="Search Insights"
      subtitle="GSC queries + organic keywords + internal searches — ek hi jagah"
    >
      <SearchInsightsPanel />
    </AnalyticsLayout>
  );
}