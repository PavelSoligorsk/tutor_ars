export default function LessonLoading() {
  return (
    <div className="animate-fade-in mx-auto max-w-4xl px-4 py-8 pb-24">
      {/* Breadcrumb skeleton */}
      <nav className="mb-6 flex gap-2 text-sm">
        <div className="h-4 w-16 rounded skeleton-shimmer" />
        <span className="text-muted">/</span>
        <div className="h-4 w-20 rounded skeleton-shimmer" />
        <span className="text-muted">/</span>
        <div className="h-4 w-32 rounded skeleton-shimmer" />
      </nav>

      {/* Badge skeleton */}
      <div className="mb-4">
        <div className="inline-block h-7 w-20 rounded-full skeleton-shimmer" />
      </div>

      {/* Header skeleton */}
      <header className="mb-8">
        <div className="mb-2 h-9 w-3/4 rounded skeleton-shimmer" />
        <div className="h-6 w-1/2 rounded skeleton-shimmer" />
      </header>

      {/* Content skeleton */}
      <article className="rounded-xl bg-white p-6 shadow-md md:p-8">
        <div className="space-y-4">
          <div className="h-5 w-full rounded skeleton-shimmer" />
          <div className="h-5 w-5/6 rounded skeleton-shimmer" />
          <div className="h-5 w-4/6 rounded skeleton-shimmer" />
          <div className="my-6 h-24 w-full rounded-lg skeleton-shimmer" />
          <div className="h-5 w-full rounded skeleton-shimmer" />
          <div className="h-5 w-3/4 rounded skeleton-shimmer" />
          <div className="my-6 h-24 w-full rounded-lg skeleton-shimmer" />
          <div className="h-5 w-5/6 rounded skeleton-shimmer" />
          <div className="h-5 w-2/3 rounded skeleton-shimmer" />
        </div>
      </article>
    </div>
  );
}
