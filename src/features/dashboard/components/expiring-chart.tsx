import { DonutChart } from '@/components/charts/donut-chart';
import { type ChartConfig } from '@/components/ui/chart';
import { getExpiringAgreements } from '../queries';

// CONFIG: Hardcoded Traffic Light Colors
const EXPIRY_CONFIG = {
  count: {
    label: 'Convenios',
  },
  '1_month': {
    label: '1 Mes',
    color: '#ef4444', // Red-500
  },
  '3_months': {
    label: '3 Meses',
    color: '#eab308', // Yellow-500
  },
  '6_months': {
    label: '6 Meses',
    color: '#22c55e', // Green-500
  },
} satisfies ChartConfig;

export async function ExpiringAgreementsChart() {
  const data = await getExpiringAgreements();

  return (
    <DonutChart
      title="Vencimiento de Convenios"
      description="Proyección de vencimientos próximos"
      footer={{
        text: 'Requieren atención inmediata',
        trend: 'down', // Red arrow indicating risk
      }}
      data={data}
      config={EXPIRY_CONFIG}
      dataKey="count"
      nameKey="range" // Matches the 'range' key in ExpiryData
      centerLabel={{
        label: 'Por Vencer',
        valueKey: 'count',
      }}
    />
  );
}
