import './globals.css';

import { Footer, Header } from '@/widgets';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Математика',
    template: '%s | Математика',
  },
  description: 'Обучающий сайт по математике для учеников 5-11 классов',
  keywords: ['математика', 'репетитор', 'уроки', 'школа', '5-11 класс'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="flex min-h-screen flex-col bg-background font-sans antialiased dark:bg-gray-900 dark:shadow-gray-800/30 dark:text-white">
        <Header />
        <main className="flex-1 dark:bg-gray-900 dark:shadow-gray-800/30 dark:text-white">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
