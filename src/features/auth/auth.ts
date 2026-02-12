import { timingSafeEqual } from 'crypto';

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

import { authConfig } from './auth.config';

if (!process.env.AUTH_SECRET) {
  throw new Error('AUTH_SECRET environment variable is required');
}

const credentialsSchema = z.object({
  password: z.string().min(1, 'Пароль обязателен'),
});

/**
 * Load valid passwords from VALID_PASSWORDS environment variable.
 * Supports multiple passwords separated by commas: VALID_PASSWORDS=pass1,pass2
 */
function getValidPasswords(): string[] {
  const passwordsEnv = process.env.VALID_PASSWORDS;
  if (!passwordsEnv) {
    console.warn('VALID_PASSWORDS не установлен в .env');
    return [];
  }
  return passwordsEnv
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);
}

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Compare against self to keep constant time, then return false
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        password: { label: 'Пароль', type: 'password' },
      },
      authorize(credentials) {
        const parsedCredentials = credentialsSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { password } = parsedCredentials.data;
        const validPasswords = getValidPasswords();

        if (validPasswords.some((p) => safeCompare(p, password))) {
          return {
            id: 'student',
            name: 'Ученик',
            email: 'student@tutor.local',
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    jwt({ token, user }) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- user is undefined on subsequent calls
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- session.user can be undefined at runtime
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
