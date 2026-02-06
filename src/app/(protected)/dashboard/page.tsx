// app/(protected)/dashboard/page.tsx
import { DonutChartSkeleton } from '@/components/charts';
import { AreaChartSkeleton } from '@/components/charts/area-chart';
import { AgreementsChart } from '@/features/dashboard/components/agreements-chart';
import { GrowthChart } from '@/features/dashboard/components/growth-chart';
import { Suspense } from 'react';

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* This block allows the Campus Chart to load independently 
          without blocking the rest of the UI 
      */}
      <Suspense fallback={<DonutChartSkeleton />}>
        <AgreementsChart />
      </Suspense>

      <Suspense fallback={<AreaChartSkeleton />}>
        <GrowthChart />
      </Suspense>
    </div>
  );
}
