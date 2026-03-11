import 'server-only';

import { prisma } from '@/lib/prisma';
import { notDeleted } from '@/lib/db-filters';
import type { Prisma } from '@/generated/prisma/client';

// ── Custom error classes ──────────────────────────────────────────────────────

export class UniversityNotFoundError extends Error {}
export class DuplicateSlugError extends Error {}

// ── Shared include shape ──────────────────────────────────────────────────────
// Define once, reuse in every read so the return types stay consistent.

const universityInclude = {
  region: true,
  pais: true,
  giro: true,
  campus: true,
} satisfies Prisma.UniversityInclude;

const universityListInclude = {
  ...universityInclude,
  _count: { select: { agreements: { where: notDeleted } } },
} satisfies Prisma.UniversityInclude;

const universityDetailInclude = {
  ...universityInclude,
  contacts: {
    where: notDeleted,
    include: { infos: true },
  },
  agreements: {
    where: notDeleted,
    include: {
      type: true,
      status: true,
      attrs: { include: { attr: true } },
    },
    orderBy: { createdAt: 'desc' },
  },
} satisfies Prisma.UniversityInclude;

// ── Inferred return types ─────────────────────────────────────────────────────
// Import these wherever you need to type a university prop.

export type UniversityListItem = Prisma.UniversityGetPayload<{
  include: typeof universityListInclude;
}>;

export type UniversityDetail = Prisma.UniversityGetPayload<{
  include: typeof universityDetailInclude;
}>;

// ── Read functions ────────────────────────────────────────────────────────────

export async function dbGetUniversities() {
  return prisma.university.findMany({
    where: notDeleted,
    include: universityListInclude,
    orderBy: { nombre: 'asc' },
  });
}

export async function dbGetUniversityBySlug(slug: string) {
  return prisma.university.findFirst({
    where: { slug, ...notDeleted },
    include: universityDetailInclude,
  });
}

export async function dbGetUniversityById(id: string) {
  return prisma.university.findFirst({
    where: { id, ...notDeleted },
    include: universityDetailInclude,
  });
}

// ── Write functions ───────────────────────────────────────────────────────────

export type CreateUniversityData = {
  nombre: string;
  slug: string;
  ciudad?: string;
  address?: string;
  lat?: number;
  lng?: number;
  catholica: boolean;
  qs_ranking?: number;
  pagina_web?: string;
  comments?: string;
  regionId: number;
  paisId: number;
  giroId?: number;
  campusId?: number;
};

export async function dbCreateUniversity(data: CreateUniversityData) {
  // Slug collision check + create in a transaction to avoid race conditions.
  return prisma.$transaction(async (tx) => {
    const existing = await tx.university.findUnique({
      where: { slug: data.slug },
      select: { id: true },
    });

    if (existing) throw new DuplicateSlugError();

    return tx.university.create({
      data,
      include: universityInclude,
    });
  });
}

export type UpdateUniversityData = Partial<Omit<CreateUniversityData, 'slug'>>;
// Slugs never change — see dal.md

export async function dbUpdateUniversity(
  id: string,
  data: UpdateUniversityData
) {
  const result = await prisma.university.updateMany({
    where: { id, ...notDeleted },
    data,
  });

  if (result.count === 0) throw new UniversityNotFoundError();
}

// Soft delete — never hard-delete.
export async function dbSoftDeleteUniversity(id: string) {
  const result = await prisma.university.updateMany({
    where: { id, ...notDeleted },
    data: { deletedAt: new Date() },
  });

  if (result.count === 0) throw new UniversityNotFoundError();
}
