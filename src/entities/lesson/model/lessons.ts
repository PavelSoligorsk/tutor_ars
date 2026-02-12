import { getGradeBySlug } from '@/entities/grade';

import { type Lesson } from '../types';

export const LESSONS: Lesson[] = [
  // 5-6 класс
  {
    id: '6-1',
    title:
      'Типы чисел. Признаки делимости. Деление с остатком. Разложение на простые множители. НОК и НОД чисел.',
    slug: 'types',
    gradeId: '5-6',
    order: 1,
  },

  {
    id: '6-2',
    title: 'Обыкновенные дроби и основные операции с ними',
    slug: 'ob-drob',
    gradeId: '5-6',
    order: 2,
  },

  {
    id: '6-3',
    title:
      'Десятичные дроби. Рациональные числа. Модуль. Проценты. Прямая и обратная пропорциональная зависисмости.',
    slug: 'des-drob',
    gradeId: '5-6',
    order: 3,
  },

  // 7 класс
  {
    id: '7-1',
    title: 'Линейные уравнения и неравенства',
    slug: 'lineynye-uravneniya-neravenstva',
    gradeId: '7',
    order: 1,
  },
  {
    id: '7-2',
    title: 'Одночлены и многочлены',
    slug: 'odnochleny-mnogochleny',
    gradeId: '7',
    order: 2,
  },
  {
    id: '7-3',
    title: 'Системы линейных уравнений',
    slug: 'sistemy-lineynykh-uravneniy',
    gradeId: '7',
    order: 3,
  },
  {
    id: '7-4',
    title: 'Системы и совокупности линейных неравенств',
    slug: 'sistemy-sovokupnosti-lineynykh-neravenstv',
    gradeId: '7',
    order: 4,
  },
  { id: '7-5', title: 'Степени', slug: 'stepeni', gradeId: '7', order: 5 },
  { id: '7-6', title: 'Линейные функции', slug: 'lin-func', gradeId: '7', order: 6 },

  // 8 класс
  { id: '8-1', title: 'Квадратные корни', slug: 'kvadratnye-korni', gradeId: '8', order: 1 },
  {
    id: '8-2',
    title: 'Квадратные уравнения',
    slug: 'kvadratnye-uravneniya',
    gradeId: '8',
    order: 2,
  },
  { id: '8-3', title: 'Функции', slug: 'funktsii-raznye', gradeId: '8', order: 3 },
  { id: '8-4', title: 'Квадратичные неравенства', slug: 'kv-ner', gradeId: '8', order: 4 },
  { id: '8-5', title: 'Квадратичная функция', slug: 'kv-func', gradeId: '8', order: 5 },

  // 9 класс
  {
    id: '9-1',
    title: 'Арифметическая и геометрическая прогрессии',
    slug: 'progressii',
    gradeId: '9',
    order: 1,
  },
  {
    id: '9-2',
    title: 'Дробно-рациональные уравнения',
    slug: 'drobno-ratsionalnye-uravneniya',
    gradeId: '9',
    order: 2,
  },
  {
    id: '9-3',
    title: 'Дробно-рациональные неравенства',
    slug: 'drobno-ratsionalnye-neravenstva',
    gradeId: '9',
    order: 3,
  },
  { id: '9-4', title: 'Рациональная дробь', slug: 'ratsionalnaya-drob', gradeId: '9', order: 4 },
  {
    id: '9-5',
    title: 'Системы нелинейных уравнений',
    slug: 'sistemy-nelinejnykh-uravnenij',
    gradeId: '9',
    order: 5,
  },
  { id: '9-6', title: 'Функции', slug: 'funktsii', gradeId: '9', order: 6 },
  { id: '9-7', title: 'Отрезок. Окружность', slug: 'otr-okr', gradeId: '9', order: 7 },

  // 10 класс
  {
    id: '10-1',
    title: 'Корень n-ой степени',
    slug: 'koren-n-oj-stepeni',
    gradeId: '10',
    order: 1,
  },
  { id: '10-2', title: 'Производная', slug: 'proizvodnaya', gradeId: '10', order: 2 },
  { id: '10-3', title: 'Тригонометрия', slug: 'trigonometriya', gradeId: '10', order: 3 },

  // 11 класс
  {
    id: '11-1',
    title: 'Обобщенное понятие степени',
    slug: 'obobshennoe-ponyatie-stepeni',
    gradeId: '11',
    order: 1,
  },

  {
    id: '11-2',
    title: 'Степенная функция',
    slug: 'step-func',
    gradeId: '11',
    order: 2,
  },

  {
    id: '11-3',
    title: 'Показательная функция',
    slug: 'pok-func',
    gradeId: '11',
    order: 3,
  },

  {
    id: '11-4',
    title: 'Показательные уравнения',
    slug: 'pok-yravn',
    gradeId: '11',
    order: 4,
  },

  {
    id: '11-5',
    title: 'Показательные неравенства',
    slug: 'pok-ner',
    gradeId: '11',
    order: 5,
  },

  {
    id: '11-6',
    title: 'Логарифм',
    slug: 'log',
    gradeId: '11',
    order: 6,
  },

  {
    id: '11-7',
    title: 'Логарифмическая функция',
    slug: 'log-func',
    gradeId: '11',
    order: 7,
  },

  {
    id: '11-8',
    title: 'Логарифмические уравнения',
    slug: 'log-uravneniya',
    gradeId: '11',
    order: 8,
  },

  {
    id: '11-9',
    title: 'Логарифмические неравенства',
    slug: 'log-ner',
    gradeId: '11',
    order: 9,
  },

  // Геометрия 7

  {
    id: '12-1',
    title: 'Основные понятия геометрии',
    slug: 'geom-osn',
    gradeId: '12',
    order: 1,
  },

  {
    id: '12-2',
    title: 'Треугольник',
    slug: 'triangle',
    gradeId: '12',
    order: 2,
  },

  {
    id: '12-3',
    title:
      'Многоугольники. Правильные многоугольники. Четырехугольники: квадрат, прямоугольник, параллелограмм, ромб, трапеция',
    slug: 'mnogo',
    gradeId: '12',
    order: 3,
  },

  {
    id: '12-4',
    title: 'Круг и окружность',
    slug: 'krug-okr',
    gradeId: '12',
    order: 4,
  },

  {
    id: '12-5',
    title: 'Основы стереометрии',
    slug: 'stereo-1',
    gradeId: '12',
    order: 5,
  },

  {
    id: '12-6',
    title: 'Пространственные фигуры',
    slug: 'stereo-2',
    gradeId: '12',
    order: 6,
  },

  {
    id: '12-7',
    title: 'Фигуры вращения',
    slug: 'stereo-3',
    gradeId: '12',
    order: 7,
  },

  {
    id: '13-1',
    title: 'Основные понятия геометрии',
    slug: 'geom_pract1',
    gradeId: '13',
    order: 1,
  },

  {
    id: '13-2',
    title: 'Треугольник. Практика 1',
    slug: 'geom_pract2',
    gradeId: '13',
    order: 2,
  },

  //РЦЭ
  {
    id: '19-1',
    title: 'РЦЭ 2026',
    slug: 'rce-2026',
    gradeId: '19',
    order: 1,
  },

  //ДРТ
  {
    id: '20-1',
    title: 'ДРТ 2023',
    slug: 'drt-2023',
    gradeId: '20',
    order: 1,
  },

  // РТ
  {
    id: '21-1',
    title: 'РТ 1/1',
    slug: 'rt-1-1',
    gradeId: '21',
    order: 1,
  },

  {
    id: '21-2',
    title: 'РТ 1/2',
    slug: 'rt-1-2',
    gradeId: '21',
    order: 2,
  },
];

export function getLessonsByGrade(gradeId: string): Lesson[] {
  return LESSONS.filter((lesson) => lesson.gradeId === gradeId).sort((a, b) => a.order - b.order);
}

export function getLessonBySlug(gradeSlug: string, lessonSlug: string): Lesson | undefined {
  const grade = getGradeBySlug(gradeSlug);
  if (!grade) {
    return undefined;
  }
  return LESSONS.find((lesson) => lesson.gradeId === grade.id && lesson.slug === lessonSlug);
}
