// features/dashboard/queries.ts
import 'server-only';

export interface AgreementData {
  campus: string;
  agreements: number;
}

const AGREEMENT_DATA: AgreementData[] = [
  { campus: 'norte', agreements: 120 },
  { campus: 'sur', agreements: 85 },
  { campus: 'mex', agreements: 45 },
  { campus: 'redAnahuac', agreements: 10 },
];

export async function getAgreementStats(): Promise<AgreementData[]> {
  // Simulate delay for skeleton
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return AGREEMENT_DATA;
}

export interface GrowthData {
  month: string;
  active: number;
  pending: number;
}

const GROWTH_DATA: GrowthData[] = [
  { month: 'Ene', active: 80, pending: 5 },
  { month: 'Feb', active: 85, pending: 8 },
  { month: 'Mar', active: 92, pending: 12 },
  { month: 'Abr', active: 95, pending: 10 },
  { month: 'May', active: 105, pending: 15 },
  { month: 'Jun', active: 112, pending: 8 },
  { month: 'Jul', active: 112, pending: 4 },
  { month: 'Ago', active: 120, pending: 20 },
  { month: 'Sep', active: 135, pending: 18 },
];

export async function getGrowthStats(): Promise<GrowthData[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return GROWTH_DATA;
}
