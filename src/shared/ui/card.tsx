import { type ReactNode } from 'react';

import { cn } from '../lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'block rounded-xl bg-white p-6 shadow-md transition-all duration-200',
        className
      )}
    >
      {children}
    </div>
  );
}
