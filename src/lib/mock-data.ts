// --- SHARED DATA LAYER ---
// In a real app, this would be replaced by API/DB calls.

export type University = {
  id: string;
  slug: string;
  name: string;
  country: string;
  city: string;
  ranking: string;
  type: 'Pública' | 'Privada';
  website: string;
};

export type Agreement = {
  id: string;
  universityId: string;
  type: string;
  campus: string[];
  spots: number;
  status: 'Active' | 'Pending' | 'Expired';
  startDate: string;
  endDate: string;
};

export const UNIVERSITIES: University[] = [
  {
    id: 'UNI-001',
    slug: 'yale-university',
    name: 'Yale University',
    country: 'EUA',
    city: 'New Haven',
    ranking: '#16 QS',
    type: 'Privada',
    website: 'yale.edu',
  },
  {
    id: 'UNI-002',
    slug: 'universidad-de-buenos-aires',
    name: 'Universidad de Buenos Aires',
    country: 'Argentina',
    city: 'Buenos Aires',
    ranking: '#95 QS',
    type: 'Pública',
    website: 'uba.ar',
  },
  {
    id: 'UNI-003',
    slug: 'kyoto-university',
    name: 'Kyoto University',
    country: 'Japón',
    city: 'Kyoto',
    ranking: '#46 QS',
    type: 'Pública',
    website: 'kyoto-u.ac.jp',
  },
  {
    id: 'UNI-004',
    slug: 'pontificia-universidad-catolica-de-chile',
    name: 'Pontificia Universidad Católica de Chile',
    country: 'Chile',
    city: 'Santiago',
    ranking: '#103 QS',
    type: 'Privada',
    website: 'uc.cl',
  },
  {
    id: 'UNI-005',
    slug: 'university-of-toronto',
    name: 'University of Toronto',
    country: 'Canadá',
    city: 'Toronto',
    ranking: '#21 QS',
    type: 'Pública',
    website: 'utoronto.ca',
  },
  {
    id: 'UNI-006',
    slug: 'universidad-francisco-de-vitoria',
    name: 'Universidad Francisco de Vitoria',
    country: 'España',
    city: 'Madrid',
    ranking: 'N/A',
    type: 'Privada',
    website: 'ufv.es',
  },
];

export const AGREEMENTS: Agreement[] = [
  // Yale (UNI-001)
  {
    id: 'CONV-001',
    universityId: 'UNI-001',
    type: 'Bilateral',
    campus: ['Norte', 'Sur'],
    spots: 4,
    status: 'Active',
    startDate: '2022-08-01',
    endDate: '2025-07-31',
  },
  {
    id: 'CONV-002',
    universityId: 'UNI-001',
    type: 'Investigación',
    campus: ['Mex'],
    spots: 2,
    status: 'Pending',
    startDate: '2024-01-01',
    endDate: '2026-12-31',
  },
  {
    id: 'CONV-003',
    universityId: 'UNI-001',
    type: 'Verano',
    campus: ['Norte'],
    spots: 10,
    status: 'Active',
    startDate: '2023-06-01',
    endDate: '2025-06-30',
  },
  // UBA (UNI-002)
  {
    id: 'CONV-004',
    universityId: 'UNI-002',
    type: 'Bilateral',
    campus: ['Sur'],
    spots: 3,
    status: 'Expired',
    startDate: '2020-03-01',
    endDate: '2023-02-28',
  },
  // Kyoto (UNI-003)
  {
    id: 'CONV-005',
    universityId: 'UNI-003',
    type: 'Intercambio',
    campus: ['Mex', 'Sur'],
    spots: 6,
    status: 'Active',
    startDate: '2023-04-01',
    endDate: '2026-03-31',
  },
  {
    id: 'CONV-006',
    universityId: 'UNI-003',
    type: 'Investigación',
    campus: ['Norte'],
    spots: 2,
    status: 'Active',
    startDate: '2024-09-01',
    endDate: '2027-08-31',
  },
  // PUC Chile (UNI-004)
  {
    id: 'CONV-007',
    universityId: 'UNI-004',
    type: 'Bilateral',
    campus: ['Norte', 'Sur'],
    spots: 4,
    status: 'Active',
    startDate: '2021-03-01',
    endDate: '2025-02-28',
  },
  {
    id: 'CONV-008',
    universityId: 'UNI-004',
    type: 'Erasmus+',
    campus: ['Mex'],
    spots: 5,
    status: 'Active',
    startDate: '2023-09-01',
    endDate: '2026-08-31',
  },
  {
    id: 'CONV-009',
    universityId: 'UNI-004',
    type: 'Verano',
    campus: ['Sur'],
    spots: 8,
    status: 'Pending',
    startDate: '2025-01-01',
    endDate: '2026-12-31',
  },
  {
    id: 'CONV-010',
    universityId: 'UNI-004',
    type: 'Investigación',
    campus: ['Norte'],
    spots: 2,
    status: 'Expired',
    startDate: '2019-01-01',
    endDate: '2022-12-31',
  },
  {
    id: 'CONV-011',
    universityId: 'UNI-004',
    type: 'Intercambio',
    campus: ['Mex', 'Norte'],
    spots: 6,
    status: 'Active',
    startDate: '2022-08-01',
    endDate: '2025-07-31',
  },
  // U of Toronto (UNI-005)
  {
    id: 'CONV-012',
    universityId: 'UNI-005',
    type: 'Bilateral',
    campus: ['Norte'],
    spots: 4,
    status: 'Active',
    startDate: '2023-09-01',
    endDate: '2026-08-31',
  },
  {
    id: 'CONV-013',
    universityId: 'UNI-005',
    type: 'Intercambio',
    campus: ['Sur', 'Mex'],
    spots: 6,
    status: 'Active',
    startDate: '2022-01-01',
    endDate: '2025-12-31',
  },
  {
    id: 'CONV-014',
    universityId: 'UNI-005',
    type: 'Investigación',
    campus: ['Norte'],
    spots: 3,
    status: 'Pending',
    startDate: '2025-03-01',
    endDate: '2027-02-28',
  },
  {
    id: 'CONV-015',
    universityId: 'UNI-005',
    type: 'Verano',
    campus: ['Mex'],
    spots: 10,
    status: 'Active',
    startDate: '2023-06-01',
    endDate: '2026-05-31',
  },
  // UFV (UNI-006)
  {
    id: 'CONV-016',
    universityId: 'UNI-006',
    type: 'Erasmus+',
    campus: ['Norte', 'Sur'],
    spots: 5,
    status: 'Active',
    startDate: '2023-09-01',
    endDate: '2026-08-31',
  },
  {
    id: 'CONV-017',
    universityId: 'UNI-006',
    type: 'Bilateral',
    campus: ['Mex'],
    spots: 4,
    status: 'Active',
    startDate: '2022-01-01',
    endDate: '2025-12-31',
  },
  {
    id: 'CONV-018',
    universityId: 'UNI-006',
    type: 'Intercambio',
    campus: ['Norte'],
    spots: 6,
    status: 'Expired',
    startDate: '2019-08-01',
    endDate: '2022-07-31',
  },
  {
    id: 'CONV-019',
    universityId: 'UNI-006',
    type: 'Investigación',
    campus: ['Sur'],
    spots: 2,
    status: 'Active',
    startDate: '2024-01-01',
    endDate: '2027-12-31',
  },
  {
    id: 'CONV-020',
    universityId: 'UNI-006',
    type: 'Verano',
    campus: ['Norte', 'Mex'],
    spots: 12,
    status: 'Active',
    startDate: '2023-06-01',
    endDate: '2026-05-31',
  },
  {
    id: 'CONV-021',
    universityId: 'UNI-006',
    type: 'Bilateral',
    campus: ['Sur'],
    spots: 3,
    status: 'Pending',
    startDate: '2025-09-01',
    endDate: '2028-08-31',
  },
  {
    id: 'CONV-022',
    universityId: 'UNI-006',
    type: 'Erasmus+',
    campus: ['Mex'],
    spots: 5,
    status: 'Active',
    startDate: '2022-09-01',
    endDate: '2025-08-31',
  },
  {
    id: 'CONV-023',
    universityId: 'UNI-006',
    type: 'Intercambio',
    campus: ['Norte'],
    spots: 4,
    status: 'Active',
    startDate: '2023-01-01',
    endDate: '2026-12-31',
  },
];

// --- HELPERS ---

export function getUniversityBySlug(slug: string): University | undefined {
  return UNIVERSITIES.find((u) => u.slug === slug);
}

export function getAgreementsByUniversityId(universityId: string): Agreement[] {
  return AGREEMENTS.filter((a) => a.universityId === universityId);
}

export function getAgreementCountByUniversityId(universityId: string): number {
  return getAgreementsByUniversityId(universityId).length;
}
