import { DonutChart } from '@/components/charts/donut-chart';
import { type ChartConfig } from '@/components/ui/chart';
import { getAgreementStats } from '../queries';

/*
Chart component to display the number of agreements asigned to each campus. 
*/

const CHART_CONFIG = {
  agreements: {
    label: 'Convenios',
  },
  norte: {
    label: 'Campus Norte',
    color: 'var(--color-chart-1)',
  },
  sur: {
    label: 'Campus Sur',
    color: 'var(--color-chart-2)',
  },
  mex: {
    label: 'Campus Mex',
    color: 'var(--color-chart-3)',
  },
  redAnahuac: {
    label: 'Red Anáhuac',
    color: 'var(--color-chart-4)',
  },
} satisfies ChartConfig;

export async function AgreementsChart() {
  const data = await getAgreementStats();

  return (
    <DonutChart
      // UI Text in Spanish
      title="Convenios por Campus"
      description="Distribución de convenios administrados"
      footer={{
        text: 'Total de convenios activos',
        trend: 'neutral',
      }}
      // Data Props
      data={data}
      config={CHART_CONFIG}
      dataKey="agreements"
      nameKey="campus"
      centerLabel={{
        label: 'Convenios',
        valueKey: 'agreements',
      }}
    />
  );
}
