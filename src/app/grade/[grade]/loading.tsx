export default function GradeLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Title skeleton */}
      <div className="mb-6 h-8 w-48 rounded skeleton-shimmer" />
      {/* Lesson list skeletons */}
      <div className="space-y-3">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-lg border border-border bg-white p-4"
          >
            <div className="h-10 w-10 rounded-full skeleton-shimmer" />
            <div className="flex-1 space-y-2">
              <div className="h-5 w-3/4 rounded skeleton-shimmer" />
              <div className="h-4 w-1/2 rounded skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
