import { BarChart } from '@/components/charts/bar-chart'; // Update path if needed
import { type ChartConfig } from '@/components/ui/chart';
import { getCountryStats } from '../queries';

// 1. CONFIG: Map Countries to Theme Colors
// Note: Keys (spain, usa) must match the 'country' field in the data exactly (case-sensitive)
const COUNTRY_CONFIG = {
  agreements: { label: 'Convenios' },
  España: {
    label: 'España',
    color: 'var(--color-chart-1)',
  },
  EUA: {
    label: 'EUA',
    color: 'var(--color-chart-2)',
  },
  Francia: {
    label: 'Francia',
    color: 'var(--color-chart-3)',
  },
  Alemania: {
    label: 'Alemania',
    color: 'var(--color-chart-4)',
  },
  Italia: {
    label: 'Italia',
    color: 'var(--color-chart-5)',
  },
} satisfies ChartConfig;

export async function CountryChart() {
  const data = await getCountryStats();

  return (
    <BarChart
      title="Top Destinos Internacionales"
      description="Países con mayor número de acuerdos firmados"
      data={data}
      config={COUNTRY_CONFIG}
      dataKey="agreements"
      categoryKey="country" // Tells the chart to use 'country' to find the color
    />
  );
}
