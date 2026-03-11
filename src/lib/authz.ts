// lib/authz.ts
import 'server-only';
import { redirect } from 'next/navigation';
import { verifySession } from '@/lib/authn';
import { hasPermission, buildPermissions, Permission } from '@/lib/permissions';

export async function requirePermission(permission: Permission) {
  const { role } = await verifySession(); // ← already a Role, already validated

  if (!hasPermission(role, permission)) redirect('/403');

  return { can: buildPermissions(role) };
}
