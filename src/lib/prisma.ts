// src/lib/prisma.ts
// Single Prisma client instance shared across the app and seed scripts.
//
// Adapter selection:
//   production  → PrismaNeon  (Neon serverless driver, connection pooling)
//   development → PrismaPg    (standard pg driver, works with local Docker PG)
//
// The global singleton prevents connection exhaustion in Next.js dev mode,
// where hot-reload would otherwise create a new client on every file change.

import { PrismaClient } from '@/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaPg } from '@prisma/adapter-pg';

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL!;

  const adapter =
    process.env.NODE_ENV === 'production'
      ? new PrismaNeon({ connectionString })
      : new PrismaPg({ connectionString });

  return new PrismaClient({ adapter });
}

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
