import Link from 'next/link';

import { type Grade } from '@/entities/grade';
import { type Lesson } from '@/entities/lesson';

interface LessonListProps {
  grade: Grade;
  lessons: Lesson[];
}

export function LessonList({ grade, lessons }: LessonListProps) {
  return (
    <div className="space-y-3 animate-stagger">
      {lessons.map((lesson) => (
        <Link
          key={lesson.id}
          href={`/grade/${grade.slug}/${lesson.slug}`}
          className="flex items-center gap-4 rounded-lg border border-border bg-white p-4 transition-all hover:border-primary hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
            {lesson.order}
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-heading">{lesson.title}</h3>
            {lesson.description && (
              <p className="mt-1 text-sm text-muted">{lesson.description}</p>
            )}
          </div>
          <span className="text-muted">→</span>
        </Link>
      ))}
    </div>
  );
}
