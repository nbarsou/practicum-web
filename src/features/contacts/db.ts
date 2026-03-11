import 'server-only';

import { prisma } from '@/lib/prisma';
import { notDeleted } from '@/lib/db-filters';
import type { ContactType, ContactInfoType } from '@/generated/prisma/client';

// ── Custom error classes ──────────────────────────────────────────────────────

export class ContactNotFoundError extends Error {}

// ── Read functions ────────────────────────────────────────────────────────────

export async function dbGetContactsByUniversity(universityId: string) {
  return prisma.contact.findMany({
    where: { universityId, ...notDeleted },
    include: { infos: true },
    orderBy: { type: 'asc' },
  });
}

// ── Write functions ───────────────────────────────────────────────────────────

export type ContactInfoInput = {
  type: ContactInfoType;
  value: string;
};

export type UpsertContactData = {
  universityId: string;
  type: ContactType;
  nombre?: string;
  infos: ContactInfoInput[];
};

// Upsert pattern: find the existing contact for this university+type, replace
// its info rows. One contact per type per university is the intended invariant.
// If a second contact of the same type is needed, create a new one via dbCreateContact.
export async function dbUpsertContact(data: UpsertContactData) {
  return prisma.$transaction(async (tx) => {
    // Find or create the contact record
    let contact = await tx.contact.findFirst({
      where: {
        universityId: data.universityId,
        type: data.type,
        ...notDeleted,
      },
    });

    if (!contact) {
      contact = await tx.contact.create({
        data: {
          universityId: data.universityId,
          type: data.type,
          nombre: data.nombre,
        },
      });
    } else if (data.nombre !== undefined) {
      await tx.contact.update({
        where: { id: contact.id },
        data: { nombre: data.nombre },
      });
    }

    // Replace all info rows — simpler than diffing individual emails/phones
    await tx.contactInfo.deleteMany({ where: { contactId: contact.id } });

    if (data.infos.length > 0) {
      await tx.contactInfo.createMany({
        data: data.infos.map((info) => ({
          contactId: contact.id,
          type: info.type,
          value: info.value,
        })),
      });
    }

    return tx.contact.findUniqueOrThrow({
      where: { id: contact.id },
      include: { infos: true },
    });
  });
}

export async function dbSoftDeleteContact(id: string, universityId: string) {
  // Scope to universityId to prevent IDOR
  const result = await prisma.contact.updateMany({
    where: { id, universityId, ...notDeleted },
    data: { deletedAt: new Date() },
  });

  if (result.count === 0) throw new ContactNotFoundError();
}
