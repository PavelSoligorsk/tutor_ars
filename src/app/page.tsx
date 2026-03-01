import { auth } from '@/features/auth';


import { GRADES, type GradeCategory } from '@/entities/grade';
import { getLessonsByGrade } from '@/entities/lesson';

import { GradeCard } from '@/widgets';

const CATEGORY_LABELS: Record<GradeCategory, string> = {
  algebra: 'Алгебра',
  geometry: 'Геометрия',
  exam: 'Экзаменационные материалы',
};

const CATEGORIES: GradeCategory[] = ['algebra', 'geometry', 'exam'];

export default async function HomePage() {
  const session = await auth();
  const isAuthenticated = !!session?.user;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-heading md:text-5xl">
          Математика 
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted">
          Добро пожаловать на обучающий сайт по математике! Выберите тему, чтобы начать изучение
          материала.
        </p>
      </section>

      {/* Grades Grid */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-heading">Выберите модуль</h2>

        {CATEGORIES.map((category) => (
          <div key={category} className="mb-8">
            <h3 className="mb-4 text-xl font-semibold text-heading">{CATEGORY_LABELS[category]}</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 animate-stagger">
              {GRADES.filter((grade) => grade.category === category && !grade.hidden).map((grade) => {
                const lessons = getLessonsByGrade(grade.id);
                return (
                  <GradeCard
                    key={grade.id}
                    grade={grade}
                    lessonsCount={lessons.length}
                    isLocked={!isAuthenticated}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Info Section */}
      {!isAuthenticated && (
        <section className="mt-12 rounded-lg bg-primary/10 p-6 text-center">
          <h2 className="mb-2 text-xl font-bold text-heading">🔐 Требуется авторизация</h2>
          <p className="text-muted">
            Для доступа к урокам необходимо войти в систему. Введите пароль на странице входа.
          </p>
        </section>
      )}
    </div>
  );
}
