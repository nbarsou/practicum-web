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

export interface CountryData {
  country: string;
  agreements: number;
}

const COUNTRY_DATA: CountryData[] = [
  { country: 'España', agreements: 45 },
  { country: 'EUA', agreements: 32 },
  { country: 'Francia', agreements: 28 },
  { country: 'Alemania', agreements: 24 },
  { country: 'Italia', agreements: 18 },
];

export async function getCountryStats(): Promise<CountryData[]> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return COUNTRY_DATA;
}

export interface ExpiryData {
  range: string;
  count: number;
}

const EXPIRY_DATA: ExpiryData[] = [
  // Red: Immediate urgency
  { range: '1_month', count: 2 },
  // Yellow: Medium urgency
  { range: '3_months', count: 5 },
  // Green: Low urgency
  { range: '6_months', count: 12 },
];

export async function getExpiringAgreements(): Promise<ExpiryData[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return EXPIRY_DATA;
}

export interface AgreementTypeData {
  type: string;
  count: number;
}

// MOCK DATA based on your database description
// I estimated counts based on the "Null" values you provided
const AGREEMENT_TYPE_DATA: AgreementTypeData[] = [
  { type: 'exchange', count: 150 }, // "Intercambio" (Most common)
  { type: 'study_abroad', count: 80 }, // "Study Abroad"
  { type: 'double_degree', count: 45 }, // "Double Diploma"
  { type: 'research', count: 30 }, // "Investigación"
  { type: 'internship', count: 25 }, // "Prácticas"
  { type: 'cotutela', count: 12 }, // "Cotutela"
  { type: 'other', count: 18 }, // "Otro" (MOU, Summer, etc)
];

export async function getAgreementTypeStats(): Promise<AgreementTypeData[]> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return AGREEMENT_TYPE_DATA;
}

export interface FacultyData {
  faculty: string;
  count: number;
}

// MOCK DATA: Simulating the top 5 faculties after fuzzy matching cleanup
const FACULTY_DATA: FacultyData[] = [
  { faculty: 'economy_business', count: 120 }, // 'Economía y Negocios'
  { faculty: 'engineering', count: 95 }, // Assumed high volume
  { faculty: 'health', count: 80 }, // 'Facultad de Ciencias de la Salud'
  { faculty: 'architecture_design', count: 65 }, // 'Facultad de Arquitectura, Diseño...'
  { faculty: 'law', count: 50 }, // 'Derecho y Estudios Globales'
];

export async function getFacultyStats(): Promise<FacultyData[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1400));
  return FACULTY_DATA;
}
