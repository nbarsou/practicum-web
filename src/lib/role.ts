// lib/role.ts
import { Role } from '@/generated/prisma/client';

const VALID_ROLES = new Set<string>(Object.values(Role));

export function parseRole(value: string | null | undefined): Role {
  if (value && VALID_ROLES.has(value)) return value as Role;
  return Role.WAITLISTED; // safe default — unknown role = least privilege
}
