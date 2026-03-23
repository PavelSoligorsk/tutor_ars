// components/TestStats.tsx
'use client';

import { useState, useEffect } from 'react';

export function TestStats({ tasks = '[]' }: { tasks?: string | any[] }) {
  // Парсим строку в массив, если это строка
  const parsedTasks = typeof tasks === 'string' ? JSON.parse(tasks) : tasks;
  
  // Убеждаемся, что это массив
  const tasksArray = Array.isArray(parsedTasks) ? parsedTasks : [];
  
  const [results, setResults] = useState<Record<string, { status: string; points: number }>>({});
  
  useEffect(() => {
    const handleTaskUpdate = (event: CustomEvent) => {
      const { id, status, points } = event.detail;
      setResults(prev => ({ ...prev, [id]: { status, points } }));
    };
    
    window.addEventListener('taskUpdate', handleTaskUpdate as EventListener);
    return () => window.removeEventListener('taskUpdate', handleTaskUpdate as EventListener);
  }, []);
  
  const totalPoints = tasksArray.reduce((sum: number, t: { type: string }) => sum + (t.type === 'open' ? 2 : 1), 0);
  const earnedPoints = Object.values(results).reduce((sum, r) => sum + (r.points || 0), 0);
  const completed = Object.values(results).filter(r => r.status === 'correct').length;
  const totalTasks = tasksArray.length;
  
  return (
    <div className="sticky top-0 z-10 mb-8 bg-white dark:bg-slate-900 rounded-xl shadow-md p-4 border">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-bold">📊 Выполнено: {completed}/{totalTasks}</span>
        </div>
        <div>
          <span className="font-bold text-blue-600">⭐ {earnedPoints}/{totalPoints} баллов</span>
        </div>
      </div>
      <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all"
          style={{ width: totalPoints === 0 ? '0%' : `${(earnedPoints / totalPoints) * 100}%` }}
        />
      </div>
    </div>
  );
}