import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-2 text-6xl font-bold text-heading">404</h1>
        <p className="mb-6 text-lg text-muted">Страница не найдена</p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary-dark"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}
