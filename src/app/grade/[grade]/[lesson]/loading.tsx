export default function LessonLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 pb-24">
      {/* Breadcrumb skeleton */}
      <nav className="mb-6 flex gap-2 text-sm">
        <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
        <span className="text-gray-400">/</span>
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
        <span className="text-gray-400">/</span>
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
      </nav>

      {/* Badge skeleton */}
      <div className="mb-4">
        <div className="inline-block h-7 w-20 animate-pulse rounded-full bg-gray-200" />
      </div>

      {/* Header skeleton */}
      <header className="mb-8">
        <div className="mb-2 h-9 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="h-6 w-1/2 animate-pulse rounded bg-gray-200" />
      </header>

      {/* Content skeleton */}
      <article className="rounded-xl bg-white p-6 shadow-md md:p-8">
        <div className="space-y-4">
          <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-5/6 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-4/6 animate-pulse rounded bg-gray-200" />
          <div className="my-6 h-24 w-full animate-pulse rounded-lg bg-gray-100" />
          <div className="h-5 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="my-6 h-24 w-full animate-pulse rounded-lg bg-gray-100" />
          <div className="h-5 w-5/6 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-2/3 animate-pulse rounded bg-gray-200" />
        </div>
      </article>
    </div>
  );
}
