import Link from 'next/link';
import { notFound } from 'next/navigation';


import { GRADES, getGradeBySlug } from '@/entities/grade';
import { getLessonsByGrade } from '@/entities/lesson';

import { LessonList } from '@/widgets';

import { pluralize } from '@/shared/lib';

import type { Metadata } from 'next';

interface GradePageProps {
  params: Promise<{ grade: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return GRADES.map((grade) => ({
    grade: grade.slug,
  }));
}

export async function generateMetadata({ params }: GradePageProps): Promise<Metadata> {
  const { grade: gradeSlug } = await params;
  const grade = getGradeBySlug(gradeSlug);

  if (!grade) {
    return { title: 'Класс не найден' };
  }

  return {
    title: grade.name,
    description: `Уроки математики для ${grade.name}`,
  };
}

export default async function GradePage({ params }: GradePageProps) {
  const { grade: gradeSlug } = await params;
  const grade = getGradeBySlug(gradeSlug);

  if (!grade) {
    notFound();
  }

  const lessons = getLessonsByGrade(grade.id);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-primary hover:underline">
          Главная
        </Link>
        <span className="mx-2 text-muted">/</span>
        <span className="text-muted">{grade.name}</span>
      </nav>

      {/* Header */}
      <header className="animate-fade-in mb-8">
        <h1 className="mb-2 text-3xl font-bold text-heading">{grade.name}</h1>
        <p className="text-muted">
          {lessons.length} {pluralize(lessons.length, 'тема', 'темы', 'тем')} доступно
        </p>
      </header>

      {/* Lessons List */}
      {lessons.length > 0 ? (
        <LessonList grade={grade} lessons={lessons} />
      ) : (
        <div className="rounded-lg bg-warning-light p-6 text-center">
          <p className="text-warning">Уроки для этого класса пока не добавлены</p>
        </div>
      )}
    </div>
  );
}
