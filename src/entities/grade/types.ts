export type GradeCategory = 'algebra' | 'geometry' | 'exam';

export interface Grade {
  id: string;
  name: string;
  slug: string;
  order: number;
  category: GradeCategory;
  hidden?: boolean;
}
