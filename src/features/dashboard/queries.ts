// features/dashboard/queries.ts
import 'server-only';

// 1. Define the Data Interface
// I changed 'visitors' to 'agreements' to better reflect the data content
export interface AgreementData {
  campus: string;
  agreements: number;
}

// 2. Mock Data
const AGREEMENT_DATA: AgreementData[] = [
  { campus: 'norte', agreements: 120 },
  { campus: 'sur', agreements: 85 },
  { campus: 'mex', agreements: 45 },
  { campus: 'redAnahuac', agreements: 10 },
];

// 4. Data Query Function
export async function getAgreementStats(): Promise<AgreementData[]> {
  // Simulate delay for skeleton
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return AGREEMENT_DATA;
}
