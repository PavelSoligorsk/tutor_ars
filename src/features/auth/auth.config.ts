import { randomBytes } from 'crypto';

import { type NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';

// Пароли загружаются из переменных окружения
// Поддерживается несколько паролей через запятую: VALID_PASSWORDS=pass1,pass2
const getValidPasswords = (): string[] => {
  const passwordsEnv = process.env.VALID_PASSWORDS;
  if (!passwordsEnv) {
    console.warn('VALID_PASSWORDS не установлен в .env');
    return [];
  }
  return passwordsEnv
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);
};

const credentialsSchema = z.object({
  password: z.string().min(1, 'Пароль обязателен'),
});

const getAuthSecret = (): string | undefined => {
  if (process.env.AUTH_SECRET) {
    return process.env.AUTH_SECRET;
  }

  // In development automatically generate a temporary secret so the app runs
  // without crashing. Note: this secret is not persisted between restarts.
  if (process.env.NODE_ENV === 'development') {
    console.warn('AUTH_SECRET не установлен. Сгенерирован временный секрет для разработки. Установите AUTH_SECRET в .env.local чтобы сохранять сессии между перезапусками.');
    return randomBytes(32).toString('hex');
  }

  return undefined;
};

const authSecret = getAuthSecret();

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user);
      const isLessonsRoute = nextUrl.pathname.startsWith('/lessons');
      const isGradeKlassRoute = /^\/\d+-klass/.exec(nextUrl.pathname) !== null;
      const isGradeRoute = /^\/grade\//.exec(nextUrl.pathname) !== null;
      const isOnProtectedRoute = isLessonsRoute || isGradeKlassRoute || isGradeRoute;

      if (isOnProtectedRoute) {
        return isLoggedIn;
      }

      return true;
    },
    jwt({ token, user }) {
      // user существует только при первом логине, при последующих вызовах undefined
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- user is undefined on subsequent calls
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      // session.user может быть undefined при определённых условиях
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- session.user can be undefined at runtime
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        password: { label: 'Пароль', type: 'password' },
      },
      authorize(credentials) {
        const parsedCredentials = credentialsSchema.safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const { password } = parsedCredentials.data;

        // Проверка пароля через env переменные
        const validPasswords = getValidPasswords();
        if (validPasswords.includes(password)) {
          // Возвращаем пользователя при успешной авторизации
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
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Will be undefined in production if AUTH_SECRET is not set which will
  // cause NextAuth to throw a clear MissingSecret error. In development we
  // generate a temporary secret to avoid crashes when env is not configured.
  secret: authSecret,
};
