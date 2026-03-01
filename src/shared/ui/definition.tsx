import { type ReactNode } from 'react';

import { cn } from '../lib/utils';

interface DefinitionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Definition({ title = 'Определение', children, className }: DefinitionProps) {
  return (
    <div className={cn(
      'my-5 rounded-lg overflow-x-auto bg-definition p-5 dark:bg-gray-900 dark:shadow-gray-800/30 dark:text-white dark:text-white', 
      className
    )}>
      <div className="mb-2 text-lg font-bold text-primary-dark dark:text-white">
        {title}
      </div>
      <div className="text-foreground dark:text-white">
        {children}
      </div>
    </div>
  );
}