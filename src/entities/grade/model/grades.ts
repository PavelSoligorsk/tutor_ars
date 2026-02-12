import { type Grade } from '../types';

export const GRADES: Grade[] = [
  // Алгебра
  { id: '5-6', name: 'Математика 5-6 класс', slug: '5-6-klass', order: 1, category: 'algebra' },
  { id: '7', name: 'Алгебра 7 класс', slug: '7-klass', order: 2, category: 'algebra' },
  { id: '8', name: 'Алгебра 8 класс', slug: '8-klass', order: 3, category: 'algebra' },
  { id: '9', name: 'Алгебра 9 класс', slug: '9-klass', order: 4, category: 'algebra' },
  { id: '10', name: 'Алгебра 10 класс', slug: '10-klass', order: 5, category: 'algebra' },
  { id: '11', name: 'Алгебра 11 класс', slug: '11-klass', order: 6, category: 'algebra' },
  // Геометрия
  { id: '12', name: 'Геометрия Теория', slug: 'geometry', order: 7, category: 'geometry' },
  {
    id: '13',
    name: 'Геометрия Практика',
    slug: 'geometry_practice',
    order: 8,
    category: 'geometry',
  },
  { id: '14', name: '#####', slug: 'geometry-9', order: 9, category: 'geometry', hidden: true },
  { id: '15', name: '#####', slug: 'geometry-10', order: 10, category: 'geometry', hidden: true },
  {
    id: '16',
    name: 'Не влезай, убьет',
    slug: 'geometry-11',
    order: 11,
    category: 'geometry',
    hidden: true,
  },
  // Экзамены
  { id: '17', name: 'ЦТ', slug: 'ct', order: 12, category: 'exam' },
  { id: '18', name: 'ЦЭ', slug: 'ce', order: 13, category: 'exam' },
  { id: '19', name: 'РЦЭ', slug: 'rce', order: 14, category: 'exam' },
  { id: '20', name: 'ДРТ', slug: 'drt', order: 15, category: 'exam' },
  { id: '21', name: 'РТ', slug: 'rt', order: 16, category: 'exam' },
];

export function getGradeBySlug(slug: string): Grade | undefined {
  return GRADES.find((grade) => grade.slug === slug);
}
