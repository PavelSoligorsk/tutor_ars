import { type InputHTMLAttributes } from 'react';

import { cn } from '../lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ className, label, error, id, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        id={id}
        className={cn(
          'w-full rounded-lg border border-border px-4 py-2 text-heading transition-colors',
          'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
          'disabled:bg-section disabled:cursor-not-allowed',
          error && 'border-danger focus:border-danger focus:ring-danger/20',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
    </div>
  );
}
