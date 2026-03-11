// lib/authn.ts
import 'server-only';
import { cache } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { parseRole } from '@/lib/role';
import { Role } from '@/generated/prisma/client';

export const verifySession = cache(async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) redirect('/');

  const role = parseRole(session.user.role);

  // Waitlist gate — runs before any permission check
  if (role === Role.WAITLISTED) redirect('/waitlist');

  return {
    isAuth: true,
    userId: session.user.id,
    user: session.user,
    role, // expose the parsed, validated role
  };
});
