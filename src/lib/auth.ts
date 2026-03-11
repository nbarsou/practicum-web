import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@/lib/prisma';
import { nextCookies } from 'better-auth/next-js';
import { Role } from '@/generated/prisma/client';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  socialProviders: {
    google: {
      prompt: 'select_account',
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  user: {
    modelName: 'user', // Explicit match with Prisma
    additionalFields: {
      role: {
        type: 'string',
        required: false, // Optional in API input
        defaultValue: Role.WAITLISTED, // Default for new users
        input: false, // Prevents users from providing
      },
    },
  },
  plugins: [nextCookies()],
});
