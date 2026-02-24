import { DonutChart } from '@/components/charts/donut-chart';
import { type ChartConfig } from '@/components/ui/chart';
import { getAgreementTypeStats } from '../queries';

// CONFIG: Mapping Clean Keys to Spanish Labels & Colors
const TYPE_CONFIG = {
  count: { label: 'Total' },

  // Major Categories (Using Theme Colors)
  exchange: {
    label: 'Intercambio',
    color: 'var(--color-chart-1)',
  },
  study_abroad: {
    label: 'Study Abroad',
    color: 'var(--color-chart-2)',
  },
  double_degree: {
    label: 'Doble Titulación',
    color: 'var(--color-chart-3)',
  },
  research: {
    label: 'Investigación',
    color: 'var(--color-chart-4)',
  },
  internship: {
    label: 'Prácticas',
    color: 'var(--color-chart-5)',
  },

  // Minor Categories (Specific Colors to avoid warning on DonutChart)
  cotutela: {
    label: 'Cotutela',
    color: '#a1a1aa', // Zinc-400 (Neutral)
  },
  other: {
    label: 'Otros',
    color: '#52525b', // Zinc-600 (Darker Neutral)
  },
} satisfies ChartConfig;

export async function AgreementTypeChart() {
  const data = await getAgreementTypeStats();

  return (
    <DonutChart
      title="Tipos de Convenio"
      description="Distribución por modalidad educativa"
      footer={{
        text: 'Modalidades activas',
        trend: 'neutral',
      }}
      data={data}
      config={TYPE_CONFIG}
      dataKey="count"
      nameKey="type"
      centerLabel={{
        label: 'Convenios',
        valueKey: 'count',
      }}
    />
  );
}
