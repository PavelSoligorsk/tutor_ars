import { type ReactNode, isValidElement, type ReactElement } from 'react';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

/**
 * Russian plural forms: 1 тема, 2 темы, 5 тем
 */
export function pluralize(count: number, one: string, few: string, many: string): string {
  const mod100 = Math.abs(count) % 100;
  const mod10 = mod100 % 10;

  if (mod100 >= 11 && mod100 <= 19) {return many;}
  if (mod10 === 1) {return one;}
  if (mod10 >= 2 && mod10 <= 4) {return few;}
  return many;
}

export function getPlainText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getPlainText).join('');
  }
  if (isValidElement(node)) {
    const element = node as ReactElement;
    const maybeProps = element as unknown as { props?: { children?: ReactNode } };
    return getPlainText(maybeProps.props?.children);
  }
  return '';
}
