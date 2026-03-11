import 'server-only';

import { prisma } from '@/lib/prisma';
import { Role } from '@/generated/prisma/client';

// ── Custom error classes ──────────────────────────────────────────────────────

export class UserNotFoundError extends Error {}
export class CannotModifySelfError extends Error {}

// ── Types ─────────────────────────────────────────────────────────────────────

// Inferred return type — import wherever you need to type a user prop.
export type AdminUser = Awaited<ReturnType<typeof dbGetUsers>>[number];

// ── Read functions ────────────────────────────────────────────────────────────

export async function dbGetUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
      emailVerified: true,
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function dbGetUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true },
  });
}

// ── Write functions ───────────────────────────────────────────────────────────

export async function dbUpdateUserRole(
  targetUserId: string,
  actingUserId: string,
  newRole: Role
) {
  if (targetUserId === actingUserId) throw new CannotModifySelfError();

  // Simply update the role. Better-Auth will pick up the change
  // automatically on the user's next request.
  const result = await prisma.user.updateMany({
    where: { id: targetUserId },
    data: { role: newRole },
  });

  if (result.count === 0) throw new UserNotFoundError();
}

// Demotes user to WAITLISTED rather than deleting the auth record.
export async function dbRemoveUser(targetUserId: string, actingUserId: string) {
  if (targetUserId === actingUserId) throw new CannotModifySelfError();

  // Demote the user to WAITLISTED.
  // On their next request, `verifySession` will catch this role and
  // safely redirect them to the waitlist screen.
  const result = await prisma.user.updateMany({
    where: { id: targetUserId },
    data: { role: Role.WAITLISTED },
  });

  if (result.count === 0) throw new UserNotFoundError();
}
