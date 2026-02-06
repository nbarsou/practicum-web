import { AreaChart } from '@/components/charts/area-chart';
import { type ChartConfig } from '@/components/ui/chart';
import { getGrowthStats } from '../queries';

// 1. CONFIG: Map data keys to Global Theme Colors
// This keeps your app looking consistent (Blue/Green/etc) instead of hardcoded Hex
const GROWTH_CONFIG = {
  active: {
    label: 'Activos',
    color: 'var(--color-chart-1)', // Used to be #ff5900
  },
  pending: {
    label: 'En Trámite',
    color: 'var(--color-chart-2)', // Used to be #64748b
  },
} satisfies ChartConfig;

export async function GrowthChart() {
  const rawData = await getGrowthStats();

  // TRANSFORM DATA (Server Side)
  // function that formats the text labels on the axis of your chart.
  const data = rawData.map((item) => ({
    ...item,
    month: item.month.slice(0, 3), // Formatted string
  }));

  return (
    <AreaChart
      title="Crecimiento de Convenios"
      description="Comparativa: Activos vs. En Trámite (2024)"
      // Data & Config
      data={data}
      config={GROWTH_CONFIG}
      // Axis
      categoryKey="month"
      // Series Definition
      areas={[
        {
          dataKey: 'active',
          stackId: 'a', // 'a' makes them stack on top of each other
          type: 'natural',
        },
        {
          dataKey: 'pending',
          stackId: 'a',
          type: 'natural',
        },
      ]}
    />
  );
}
