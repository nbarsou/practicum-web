import 'server-only';

import { prisma } from '@/lib/prisma';

// ── Individual ref fetchers ───────────────────────────────────────────────────
// Each one is exported so a page can fetch only what it needs,
// but the combined getAllRefs() is the common case for forms.

export async function dbGetRegions() {
  return prisma.refRegion.findMany({ orderBy: { nombre: 'asc' } });
}

export async function dbGetPaises() {
  return prisma.refPais.findMany({ orderBy: { nombre: 'asc' } });
}

export async function dbGetGiros() {
  return prisma.refGiro.findMany({ orderBy: { nombre: 'asc' } });
}

export async function dbGetCampuses() {
  return prisma.refCampus.findMany({ orderBy: { nombre: 'asc' } });
}

export async function dbGetAgreementTypes() {
  return prisma.refAgreementType.findMany({ orderBy: { nombre: 'asc' } });
}

export async function dbGetAttrs() {
  return prisma.refAttr.findMany({ orderBy: { nombre: 'asc' } });
}

export async function dbGetStatuses() {
  return prisma.refStatus.findMany({ orderBy: { nombre: 'asc' } });
}

// ── Combined fetcher ──────────────────────────────────────────────────────────
// Fetches every ref table in parallel. Pass the result to form components
// as props so they can populate their dropdowns without individual fetches.
//
// Usage in a page:
//   const refs = await dbGetAllRefs();
//   return <UniversityForm refs={refs} />;

export async function dbGetAllRefs() {
  const [regions, paises, giros, campuses, agreementTypes, attrs, statuses] =
    await Promise.all([
      dbGetRegions(),
      dbGetPaises(),
      dbGetGiros(),
      dbGetCampuses(),
      dbGetAgreementTypes(),
      dbGetAttrs(),
      dbGetStatuses(),
    ]);

  return { regions, paises, giros, campuses, agreementTypes, attrs, statuses };
}

// ── Typed return type ─────────────────────────────────────────────────────────
// Inferred from the combined fetcher — import this wherever you need to type
// a `refs` prop without duplicating the shape manually.
//
// Usage:
//   import type { AllRefs } from '@/features/refs/db';
//   interface Props { refs: AllRefs }

export type AllRefs = Awaited<ReturnType<typeof dbGetAllRefs>>;

// ── Ref validation helper ─────────────────────────────────────────────────────
// Used in actions to verify a ref ID actually exists in the DB before writing.
// Returns true if the ID is valid, false otherwise.
// All checks run in parallel — one round-trip regardless of how many refs.
//
// Usage in an action:
//   const valid = await dbValidateRefs({ regionId: 3, paisId: 7 });
//   if (!valid) return { success: false, message: 'Valor de referencia inválido.' };

type RefValidationInput = {
  regionId?: number;
  paisId?: number;
  giroId?: number;
  campusId?: number;
  typeId?: number;
  statusId?: number;
};

export async function dbValidateRefs(
  refs: RefValidationInput
): Promise<boolean> {
  const checks: Promise<unknown>[] = [];

  if (refs.regionId !== undefined) {
    checks.push(
      prisma.refRegion.findUnique({
        where: { id: refs.regionId },
        select: { id: true },
      })
    );
  }
  if (refs.paisId !== undefined) {
    checks.push(
      prisma.refPais.findUnique({
        where: { id: refs.paisId },
        select: { id: true },
      })
    );
  }
  if (refs.giroId !== undefined) {
    checks.push(
      prisma.refGiro.findUnique({
        where: { id: refs.giroId },
        select: { id: true },
      })
    );
  }
  if (refs.campusId !== undefined) {
    checks.push(
      prisma.refCampus.findUnique({
        where: { id: refs.campusId },
        select: { id: true },
      })
    );
  }
  if (refs.typeId !== undefined) {
    checks.push(
      prisma.refAgreementType.findUnique({
        where: { id: refs.typeId },
        select: { id: true },
      })
    );
  }
  if (refs.statusId !== undefined) {
    checks.push(
      prisma.refStatus.findUnique({
        where: { id: refs.statusId },
        select: { id: true },
      })
    );
  }

  const results = await Promise.all(checks);
  return results.every((r) => r !== null);
}
