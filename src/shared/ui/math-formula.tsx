import { type ReactNode } from 'react';

import katex from 'katex';

import { cn } from '../lib/utils';

interface MathFormulaProps {
  children: ReactNode;
  display?: boolean;
  className?: string;
}

// Извлекает текст из ReactNode (поддержка вложенных элементов)
function extractTextFromChildren(children: ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  if (typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    const element = children as { props?: { children?: ReactNode } };
    if (element.props?.children) {
      return extractTextFromChildren(element.props.children);
    }
  }
  return '';
}

export function MathFormula({ children, display = false, className }: MathFormulaProps) {
  const formula = extractTextFromChildren(children).trim();

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
        className={cn(display ? 'my-4 block text-center text-lg' : 'inline', className)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (error) {
    console.error('KaTeX rendering error:', error);
    return (
      <span className={cn(display ? 'my-4 block text-center text-lg' : 'inline', className)}>
        {formula}
      </span>
    );
  }
}
