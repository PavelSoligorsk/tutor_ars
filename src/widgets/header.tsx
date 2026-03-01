import Link from 'next/link';
import { auth, SignOutButton } from '@/features/auth';
import { ToggleTheme } from './Togglethem';

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-800/30 dark:text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link 
          href="/" 
          className="text-xl font-bold text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary"
        >
          Математика 🔞
        </Link>

        <nav className="flex items-center gap-4">
          <ToggleTheme />
          
          {session?.user ? (
            <>
              <span className="text-sm text-muted dark:text-gray-400">
                Привет, нажми сюда если задолбала матеша ➡️
              </span>
              <SignOutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary"
            >
              Войти
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}