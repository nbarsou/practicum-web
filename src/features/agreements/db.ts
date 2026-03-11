import 'server-only';

import { prisma } from '@/lib/prisma';
import { notDeleted } from '@/lib/db-filters';
import type { Prisma } from '@/generated/prisma/client';

// ── Custom error classes ──────────────────────────────────────────────────────

export class AgreementNotFoundError extends Error {}

// ── Shared include shape ──────────────────────────────────────────────────────

const agreementInclude = {
  type: true,
  status: true,
  university: {
    select: {
      id: true,
      nombre: true,
      slug: true,
      pais: true,
      ciudad: true,
    },
  },
  attrs: { include: { attr: true } },
} satisfies Prisma.AgreementInclude;

// ── Inferred return types ─────────────────────────────────────────────────────

export type AgreementItem = Prisma.AgreementGetPayload<{
  include: typeof agreementInclude;
}>;

// ── Read functions ────────────────────────────────────────────────────────────

// All agreements across all universities — for the global /agreements page.
export async function dbGetAgreements() {
  return prisma.agreement.findMany({
    where: notDeleted,
    include: agreementInclude,
    orderBy: { createdAt: 'desc' },
  });
}

// Agreements scoped to one university — for the university detail page.
export async function dbGetAgreementsByUniversity(universityId: string) {
  return prisma.agreement.findMany({
    where: { universityId, ...notDeleted },
    include: agreementInclude,
    orderBy: { createdAt: 'desc' },
  });
}

export async function dbGetAgreementById(id: string) {
  return prisma.agreement.findFirst({
    where: { id, ...notDeleted },
    include: agreementInclude,
  });
}

// ── Write functions ───────────────────────────────────────────────────────────

export type CreateAgreementData = {
  universityId: string;
  typeId: number;
  statusId: number;
  inicio?: number;
  vigencia?: number;
  plazas_lic?: number;
  plazas_pos?: number;
  beneficiario?: string;
  se_usa: boolean;
  link_convenio?: string;
  comments?: string;
  // IDs of accreditation attrs to attach (ABET, AACSB, etc.)
  attrIds?: number[];
};

export async function dbCreateAgreement(data: CreateAgreementData) {
  const { attrIds, ...agreementData } = data;

  return prisma.$transaction(async (tx) => {
    const agreement = await tx.agreement.create({
      data: agreementData,
    });

    if (attrIds && attrIds.length > 0) {
      await tx.agreementAttr.createMany({
        data: attrIds.map((attrId) => ({ agreementId: agreement.id, attrId })),
        skipDuplicates: true,
      });
    }

    return tx.agreement.findUniqueOrThrow({
      where: { id: agreement.id },
      include: agreementInclude,
    });
  });
}

export type UpdateAgreementData = Partial<
  Omit<CreateAgreementData, 'universityId'>
  // universityId never changes — an agreement belongs to one university forever.
  // To "move" an agreement, soft-delete it and create a new one.
>;

export async function dbUpdateAgreement(id: string, data: UpdateAgreementData) {
  const { attrIds, ...agreementData } = data;

  return prisma.$transaction(async (tx) => {
    // Scope update to id + notDeleted to prevent IDOR
    const result = await tx.agreement.updateMany({
      where: { id, ...notDeleted },
      data: agreementData,
    });

    if (result.count === 0) throw new AgreementNotFoundError();

    // Replace attrs if provided — delete existing, insert new set.
    // Doing a full replace is simpler and safer than diffing.
    if (attrIds !== undefined) {
      await tx.agreementAttr.deleteMany({ where: { agreementId: id } });

      if (attrIds.length > 0) {
        await tx.agreementAttr.createMany({
          data: attrIds.map((attrId) => ({ agreementId: id, attrId })),
          skipDuplicates: true,
        });
      }
    }
  });
}

export async function dbUpdateAgreementStatus(id: string, statusId: number) {
  const result = await prisma.agreement.updateMany({
    where: { id, ...notDeleted },
    data: { statusId },
  });

  if (result.count === 0) throw new AgreementNotFoundError();
}

export async function dbSoftDeleteAgreement(id: string) {
  const result = await prisma.agreement.updateMany({
    where: { id, ...notDeleted },
    data: { deletedAt: new Date() },
  });

  if (result.count === 0) throw new AgreementNotFoundError();
}
