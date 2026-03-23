// components/CheckTask.tsx
'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { ImageContainer } from './image-container';
import { cn } from '../lib/utils';

function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        img: ({ src, alt, ...props }) => {
          if (!src || typeof src !== 'string') return null;
          const width = typeof props.width === 'string' ? parseInt(props.width, 10) : props.width;
          const height = typeof props.height === 'string' ? parseInt(props.height, 10) : props.height;
          return (
            <ImageContainer
              src={src}
              alt={alt || ''}
              width={width}
              height={height}
              className="rounded-lg shadow-md object-contain max-h-[40rem] md:max-h-[20rem]"
              contain={false}
            />
          );
        },
        p: ({ children }) => <div className="mb-4 last:mb-0 leading-relaxed overflow-x-auto text-base text-slate-700 dark:text-slate-300">{children}</div>,
        code: ({ children }) => (
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm font-mono text-blue-600 dark:bg-slate-800 dark:text-blue-400">
            {children}
          </code>
        ),
         table: ({ children }) => (
  <div className="overflow-x-auto my-4 rounded-lg border border-slate-200 dark:border-slate-700">
    <table className="w-full border-collapse text-left text-base">
      {children}
     </table>
  </div>
),
        th: ({ children }) => (
<th className="border border-slate-200 dark:border-slate-700 px-4 py-3 font-semibold text-slate-900 dark:text-slate-200 align-middle text-base bg-white dark:bg-slate-800">            {children}
          </th>
        ),
        td: ({ children }) => (
<td className="border border-slate-200 dark:border-slate-700 px-4 py-3 align-middle text-slate-700 dark:text-slate-300 text-base bg-white dark:bg-slate-800">            {children}
           </td>
        ),
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400 font-medium text-base">
            {children}
          </a>
        ),
        ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-base text-slate-700 dark:text-slate-300">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-base text-slate-700 dark:text-slate-300">{children}</ol>,
        li: ({ children }) => <li className="text-base">{children}</li>,
        strong: ({ children }) => <strong className="font-bold text-slate-900 dark:text-white">{children}</strong>,
        em: ({ children }) => <em className="italic text-slate-600 dark:text-slate-400">{children}</em>,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

interface CheckTaskProps {
  id?: string;
  onStatusChange?: (id: string, status: 'idle' | 'correct' | 'wrong', earnedPoints: number) => void;
  maxPoints?: number;
  question: string;
  answer: string | string[];
  type: 'choice' | 'open';
  multiple?: boolean;
  options?: string | string[];
  hint?: string;
  explanation?: string;
}

export function CheckTask({
  id,
  onStatusChange,
  maxPoints,
  question,
  answer,
  type,
  multiple = false,
  options: optionsProp = [],
  hint,
  explanation,
}: CheckTaskProps) {
  const [userTextAnswer, setUserTextAnswer] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  const actualMaxPoints = maxPoints ?? (type === 'open' ? 2 : 1);

  const options = typeof optionsProp === 'string' ? JSON.parse(optionsProp) : optionsProp;
  const parsedAnswer = typeof answer === 'string' && answer.startsWith('[') ? JSON.parse(answer) : answer;

  const checkAnswer = () => {
    const correctAnswers = Array.isArray(parsedAnswer) ? parsedAnswer : [parsedAnswer];
    let isCorrect = false;

    if (type === 'choice') {
      if (multiple) {
        if (selectedOptions.length !== correctAnswers.length) {
          isCorrect = false;
        } else {
          isCorrect = selectedOptions.every(opt => correctAnswers.includes(opt));
        }
      } else {
        isCorrect = correctAnswers.includes(selectedOptions[0] || '');
      }
    } else {
      const normalizedUser = userTextAnswer.trim().toLowerCase();
      isCorrect = correctAnswers.some(a => a.trim().toLowerCase() === normalizedUser);
    }

    const points = isCorrect ? actualMaxPoints : 0;
    setEarnedPoints(points);
    setStatus(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      window.dispatchEvent(new CustomEvent('taskUpdate', {
        detail: { id, status: 'correct', points }
      }));
    }
    
    if (onStatusChange && id) {
      onStatusChange(id, isCorrect ? 'correct' : 'wrong', points);
    }
  };

  const handleChoiceToggle = (val: string) => {
    if (status === 'correct') return;
    
    if (multiple) {
      setSelectedOptions(prev => {
        if (prev.includes(val)) {
          return prev.filter(item => item !== val);
        } else {
          return [...prev, val];
        }
      });
    } else {
      setSelectedOptions([val]);
    }
    
    if (status === 'wrong') {
      setStatus('idle');
      setEarnedPoints(0);
      if (onStatusChange && id) onStatusChange(id, 'idle', 0);
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setUserTextAnswer('');
    setSelectedOptions([]);
    setEarnedPoints(0);
    setShowHint(false);
    if (onStatusChange && id) onStatusChange(id, 'idle', 0);
  };

  const isSubmitDisabled = 
    (type === 'open' && !userTextAnswer.trim()) || 
    (type === 'choice' && selectedOptions.length === 0) ||
    status === 'correct';

  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4 dark:border-slate-700 dark:bg-slate-800/50">
        <div className="flex items-center gap-3">
          <span className={cn(
            "h-2 w-2 rounded-full",
            type === 'open' ? "bg-orange-400" : multiple ? "bg-purple-500" : "bg-blue-500"
          )} />
          <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
            {type === 'open' ? 'Открытый ответ' : multiple ? 'Множественный выбор' : 'Одиночный выбор'}
          </span>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
            🎯 {actualMaxPoints} балл{actualMaxPoints > 1 ? 'а' : ''}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {status === 'correct' && (
            <span className="text-sm font-bold text-green-600 dark:text-green-400">
              ✓ ВЕРНО (+{earnedPoints})
            </span>
          )}
          {status === 'wrong' && (
            <span className="text-sm font-bold text-red-600 dark:text-red-400">
              ✗ НЕВЕРНО
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 text-lg font-medium leading-snug text-slate-900 dark:text-slate-100">
          <MarkdownContent content={question} />
        </div>

        {type === 'choice' && (
          <div className="space-y-3">
            {options && options.length > 0 ? (
              options.map((opt: string, idx: number) => {
                const isSelected = selectedOptions.includes(opt);
                const isCorrectOption = Array.isArray(parsedAnswer) 
                  ? parsedAnswer.includes(opt) 
                  : parsedAnswer === opt;
                
                return (
                  <div
                    key={idx}
                    onClick={() => handleChoiceToggle(opt)}
                    className={cn(
                      "relative flex w-full items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200 cursor-pointer select-none",
                      isSelected 
                        ? "border-slate-900 bg-slate-900 text-white shadow-lg dark:border-slate-600 dark:bg-slate-700" 
                        : "border-slate-100 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-700",
                      status === 'correct' && isCorrectOption && "!border-green-500 !bg-green-500 !text-white dark:!border-green-400 dark:!bg-green-600",
                      status === 'wrong' && isSelected && !isCorrectOption && "!border-red-500 !bg-red-500 !text-white dark:!border-red-400 dark:!bg-red-600"
                    )}
                  >
                    <div className={cn(
                      "flex h-5 w-5 shrink-0 items-center justify-center border-2 transition-colors",
                      multiple ? "rounded-md" : "rounded-full",
                      isSelected ? "border-white bg-white" : "border-slate-200 bg-transparent dark:border-slate-600"
                    )}>
                      {isSelected && (
                        multiple ? (
                          <svg className="h-3 w-3 text-slate-900 dark:text-slate-800" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <div className={cn(
                            "h-2 w-2 rounded-full",
                            status === 'correct' && "bg-white",
                            status === 'wrong' && "bg-white",
                            !status && "bg-slate-900 dark:bg-slate-800"
                          )} />
                        )
                      )}
                    </div>
                    <div className="font-medium text-inherit flex-1 min-w-0 text-base">
                      <MarkdownContent content={opt} />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-red-500 p-4 text-base">
                Ошибка: варианты ответов не переданы
              </div>
            )}
          </div>
        )}

        {type === 'open' && (
          <div className="relative">
            <input
              type="text"
              value={userTextAnswer}
              onChange={(e) => {
                setUserTextAnswer(e.target.value);
                if (status === 'wrong') {
                  setStatus('idle');
                  setEarnedPoints(0);
                  if (onStatusChange && id) onStatusChange(id, 'idle', 0);
                }
              }}
              disabled={status === 'correct'}
              placeholder="Введите ваш ответ здесь..."
              className="w-full rounded-xl border-2 border-slate-100 bg-slate-50 p-5 text-base outline-none transition-all focus:border-slate-900 focus:bg-white disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-slate-500"
              onKeyDown={(e) => e.key === 'Enter' && !isSubmitDisabled && checkAnswer()}
            />
          </div>
        )}

        {(showHint || status !== 'idle') && (
          <div className={cn(
            "mt-6 rounded-xl border-l-4 p-5",
            status === 'correct' ? "border-green-500 bg-green-50/50 dark:border-green-400 dark:bg-green-900/20" : 
            status === 'wrong' ? "border-red-500 bg-red-50/50 dark:border-red-400 dark:bg-red-900/20" : 
            "border-blue-500 bg-blue-50/50 dark:border-blue-400 dark:bg-blue-900/20"
          )}>
            <div className="text-base leading-relaxed">
              {status === 'correct' ? (
                <div className="space-y-3">
                  <p className="font-bold text-green-800 dark:text-green-300 text-base">
                    БЛЕСТЯЩЕ! +{earnedPoints} балл{earnedPoints > 1 ? 'а' : ''}
                  </p>
                  {explanation && (
                    <div className="text-green-800 dark:text-green-200 text-base">
                      <MarkdownContent content={explanation} />
                    </div>
                  )}
                </div>
              ) : status === 'wrong' ? (
                <div>
                  <p className="font-bold text-red-800 dark:text-red-300 text-base">НЕ СОВСЕМ. ПОПРОБУЙТЕ ЕЩЕ РАЗ.</p>
                  {multiple && selectedOptions.length > 0 && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                      Вы выбрали: {selectedOptions.join(', ')}
                    </p>
                  )}
                </div>
              ) : (
                hint && (
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-blue-800 dark:text-blue-300 text-base">Подсказка:</span>
                    <div className="text-blue-800 dark:text-blue-200 text-base">
                      <MarkdownContent content={hint} />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-6 dark:border-slate-700">
          <div className="flex gap-4">
            <button
              onClick={checkAnswer}
              disabled={isSubmitDisabled}
              className="rounded-xl bg-slate-900 px-8 py-3 font-bold text-white text-base transition-all hover:bg-slate-800 disabled:bg-slate-100 disabled:text-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 dark:disabled:bg-slate-800 dark:disabled:text-slate-600"
            >
              ПРОВЕРИТЬ
            </button>
            
            {status === 'wrong' && (
              <button
                onClick={handleReset}
                className="rounded-xl border-2 border-slate-100 px-6 py-3 font-medium text-slate-500 text-base transition-all hover:border-red-100 hover:text-red-500 dark:border-slate-700 dark:text-slate-400 dark:hover:border-red-800 dark:hover:text-red-400"
              >
                СБРОСИТЬ
              </button>
            )}
          </div>

          {hint && status === 'idle' && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs font-medium text-slate-400 underline decoration-slate-200 underline-offset-4 transition-all hover:text-blue-500 hover:decoration-blue-200 dark:text-slate-500 dark:hover:text-blue-400"
            >
              {showHint ? 'СКРЫТЬ ПОДСКАЗКУ' : 'НУЖНА ПОМОЩЬ?'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}