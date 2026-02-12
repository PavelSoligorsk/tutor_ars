export const SITE_CONFIG = {
  name: 'Математика',
  description: 'Обучающий сайт по математике для учеников 5-11 классов',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
} as const;
