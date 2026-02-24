import { BarChart } from '@/components/charts/bar-chart';
import { type ChartConfig } from '@/components/ui/chart';
import { getFacultyStats } from '../queries';

// 1. CONFIG: Keys must match the TRANSFORMED values below ("Eco", "Ing", etc)
const FACULTY_CONFIG = {
  count: { label: 'Convenios' },

  // The key here matches the short string we create in the map function
  Eco: { label: 'Economía', color: 'var(--color-chart-1)' },
  Ing: { label: 'Ingeniería', color: 'var(--color-chart-2)' },
  Med: { label: 'Medicina', color: 'var(--color-chart-3)' },
  Arqui: { label: 'Arquitectura', color: 'var(--color-chart-4)' },
  Der: { label: 'Derecho', color: 'var(--color-chart-5)' },
} satisfies ChartConfig;

// Helper to map DB IDs to Short Labels
const SHORT_NAMES: Record<string, string> = {
  economy_business: 'Eco',
  engineering: 'Ing',
  health: 'Med',
  architecture_design: 'Arqui',
  law: 'Der',
};

export async function FacultyChart() {
  const rawData = await getFacultyStats();

  // 2. TRANSFORM DATA (Server Side)
  // We replace the long ID with the short label directly in the 'faculty' field.
  // This solves both the Axis Label size AND the Color mapping in one go.
  const data = rawData.map((item) => ({
    ...item,
    faculty: SHORT_NAMES[item.faculty] || item.faculty, // "economy_business" -> "Eco"
  }));

  return (
    <BarChart
      title="Convenios por Facultad"
      description="Top 5 áreas con mayor movilidad"
      data={data}
      config={FACULTY_CONFIG}
      dataKey="count"
      categoryKey="faculty" // Now points to "Eco", "Ing", etc.
    />
  );
}
