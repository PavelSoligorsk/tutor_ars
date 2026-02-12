// Type declarations for CSS imports
declare module '*.css' {
  const content: Record<string, string>;
  export default content;
}

// KaTeX CSS module declaration
declare module 'katex/dist/katex.min.css';
