export interface Lesson {
  id: string;
  title: string;
  slug: string;
  gradeId: string;
  order: number;
  description?: string;
}

export interface LessonSection {
  id: string;
  title: string;
}
