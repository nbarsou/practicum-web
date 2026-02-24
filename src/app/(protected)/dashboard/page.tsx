// app/(protected)/dashboard/page.tsx
import {
  DonutChartSkeleton,
  AreaChartSkeleton,
  BarChartSkeleton,
} from '@/components/charts';
import { AgreementTypeChart } from '@/features/dashboard/components/agreement-type-chart';

import { AgreementsChart } from '@/features/dashboard/components/agreements-chart';
import { CountryChart } from '@/features/dashboard/components/country-chart';
import { ExpiringAgreementsChart } from '@/features/dashboard/components/expiring-chart';
import { FacultyChart } from '@/features/dashboard/components/faculty-chart';
import { GrowthChart } from '@/features/dashboard/components/growth-chart';
import { UniversityMapSkeleton } from '@/features/dashboard/components/map/university-map-skeleton';
import { DashboardMap } from '@/features/dashboard/components/map/univesity-map-card';
import { Suspense } from 'react';

// TODO: Check that we have data from the server, what happends if we don't?
export default function DashboardPage() {
  return (
    <>
      <Suspense fallback={<UniversityMapSkeleton />}>
        <DashboardMap />
      </Suspense>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* This block allows the Campus Chart to load independently 
          without blocking the rest of the UI 
          */}
        <Suspense fallback={<DonutChartSkeleton />}>
          <ExpiringAgreementsChart />
        </Suspense>

        <Suspense fallback={<BarChartSkeleton />}>
          <FacultyChart />
        </Suspense>

        <Suspense fallback={<DonutChartSkeleton />}>
          <AgreementTypeChart />
        </Suspense>

        <Suspense fallback={<DonutChartSkeleton />}>
          <AgreementsChart />
        </Suspense>

        {/**
         * First month not showing on graphic
         */}
        <Suspense fallback={<AreaChartSkeleton />}>
          <GrowthChart />
        </Suspense>

        <Suspense fallback={<BarChartSkeleton />}>
          <CountryChart />
        </Suspense>
      </div>
    </>
  );
}
