// lib/db-filters.ts
// Single source of truth for the soft-delete filter.
// Use in every query that should exclude soft-deleted records.
//
// Usage:
//   prisma.university.findMany({ where: notDeleted })
//   prisma.agreement.findMany({ where: { universityId, ...notDeleted } })

export const notDeleted = { deletedAt: null } as const;
