import { type ReactNode } from 'react';

import katex from 'katex';

import { cn, getPlainText } from '../lib/utils';

interface MathFormulaProps {
  children: ReactNode;
  display?: boolean;
  className?: string;
}

export function MathFormula({ children, display = false, className }: MathFormulaProps) {
  const formula = getPlainText(children).trim();

  if (!formula) {
    return null;
  }

  try {
    const html = katex.renderToString(formula, {
      displayMode: display,
      throwOnError: false,
      strict: false,
      output: 'mathml',
    });

    return (
      <span
        className={cn(display ? 'my-4 block text-center text-lg dark:bg-gray-900 dark:shadow-gray-800/30 dark:text-white' : 'inline', className)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (error) {
    console.error('KaTeX rendering error:', error);
    return (
      <span className={cn(display ? 'my-4 block text-center text-lg dark:bg-gray-900 dark:shadow-gray-800/30 dark:text-white' : 'inline', className)}>
        {formula}
      </span>
    );
  }
}
