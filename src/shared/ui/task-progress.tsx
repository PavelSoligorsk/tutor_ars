// task-progress.tsx
'use client';

import { useState, useEffect } from 'react';

interface TaskResult {
  id: string | number;
  status: 'idle' | 'correct' | 'wrong';
  earnedPoints: number;
  maxPoints: number;
}

interface TaskProgressProps {
  results?: TaskResult[];  // Сделаем опциональным
  onReset?: () => void;
}

export function TaskProgress({ results = [], onReset }: TaskProgressProps) {
  // Добавляем проверку на пустой массив
  const totalPoints = results?.reduce((sum, r) => sum + r.maxPoints, 0) || 0;
  const earnedPoints = results?.reduce((sum, r) => sum + r.earnedPoints, 0) || 0;
  const completedTasks = results?.filter(r => r.status === 'correct').length || 0;
  const totalTasks = results?.length || 0;
  const progress = totalPoints === 0 ? 0 : (earnedPoints / totalPoints) * 100;
  
  const [showCelebration, setShowCelebration] = useState(false);
  
  useEffect(() => {
    if (progress === 100 && !showCelebration && totalTasks > 0) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
    }
  }, [progress, showCelebration, totalTasks]);

  // Если нет заданий, показываем заглушку
  if (totalTasks === 0) {
    return (
      <div className="sticky top-0 z-10 mb-8 bg-white dark:bg-slate-900 rounded-xl shadow-md p-4 border border-slate-200 dark:border-slate-700">
        <div className="text-center text-slate-500 dark:text-slate-400">
          <p className="font-medium">📊 Нет активных заданий</p>
          <p className="text-sm">Добавьте задания для отображения прогресса</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-10 mb-8 bg-white dark:bg-slate-900 rounded-xl shadow-md p-4 border border-slate-200 dark:border-slate-700">
      {/* Заголовок и общая статистика */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          📊 Результаты
          <span className="text-xs font-normal text-slate-500">
            ({completedTasks}/{totalTasks} заданий)
          </span>
        </h3>
        <div className="text-right">
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
            {earnedPoints}
          </span>
          <span className="text-slate-400 dark:text-slate-500">
            /{totalPoints}
          </span>
          <span className="ml-1 text-sm text-slate-500">баллов</span>
        </div>
      </div>
      
      {/* Прогресс-бар */}
      <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      
      {/* Детальная статистика */}
      <div className="grid grid-cols-3 gap-3 mt-4 text-center text-sm">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2">
          <div className="text-green-600 dark:text-green-400 font-bold">{earnedPoints}</div>
          <div className="text-xs text-green-600 dark:text-green-400">набрано</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
          <div className="text-blue-600 dark:text-blue-400 font-bold">{totalPoints - earnedPoints}</div>
          <div className="text-xs text-blue-600 dark:text-blue-400">осталось</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-2">
          <div className="text-slate-600 dark:text-slate-400 font-bold">{Math.round(progress)}%</div>
          <div className="text-xs text-slate-500">выполнено</div>
        </div>
      </div>
      
      {/* Поздравление при 100% */}
      {showCelebration && (
        <div className="mt-4 text-center animate-bounce">
          <p className="text-lg font-black text-green-600 dark:text-green-400">
            🎉 ПОЗДРАВЛЯЮ! 🎉
          </p>
          <p className="text-sm text-green-600 dark:text-green-400">
            Вы набрали {earnedPoints} из {totalPoints} баллов!
          </p>
        </div>
      )}
      
      {/* Кнопка сброса */}
      {onReset && completedTasks === totalTasks && totalTasks > 0 && (
        <button
          onClick={onReset}
          className="mt-4 w-full rounded-lg border-2 border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-bold text-slate-500 hover:border-blue-500 hover:text-blue-500 transition-all"
        >
          🔄 Пройти заново
        </button>
      )}
    </div>
  );
}