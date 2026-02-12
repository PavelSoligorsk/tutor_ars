import { type NextRequest, NextResponse } from 'next/server';

import { GRADES } from '@/entities/grade';
import { LESSONS } from '@/entities/lesson';

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const match = /^(\d{1,2})-(\d{1,2})$/.exec(code);

  if (!match) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const gradeNum = match[1];
  const lessonNum = match[2];

  if (!gradeNum || !lessonNum) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const lessonOrder = parseInt(lessonNum, 10);

  // Try direct grade ID match (e.g. "7", "10")
  let grade = GRADES.find((g) => g.id === gradeNum);

  if (!grade) {
    // Try compound grade ID (e.g. code "5-6" → grade id "5-6")
    const compoundId = `${gradeNum}-${lessonNum}`;
    grade = GRADES.find((g) => g.id === compoundId);

    if (grade) {
      return NextResponse.redirect(new URL(`/grade/${grade.slug}`, request.url));
    }

    return NextResponse.redirect(new URL('/', request.url));
  }

  // Find lesson by order
  const lesson = LESSONS.find((l) => l.gradeId === grade.id && l.order === lessonOrder);

  if (!lesson) {
    return NextResponse.redirect(new URL(`/grade/${grade.slug}`, request.url));
  }

  return NextResponse.redirect(new URL(`/grade/${grade.slug}/${lesson.slug}`, request.url));
}
