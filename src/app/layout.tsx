import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Monster Sort: The Sorting Kingdom — Educational Discrete Math Game',
  description:
    'A child-friendly browser-based educational game teaching Set Theory, Venn Diagrams, Unions, Intersections, and Complements with cute monsters and Professor Blob.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
