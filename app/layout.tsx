import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Huỳnh Ngọc Huân // Web Developer',
  description: 'Portfolio of Huỳnh Ngọc Huân — a web developer specializing in WordPress, Next.js, PHP, Docker and VPS infrastructure.',
  icons: { icon: '/favicon.svg' },
};

const themeScript = `
  try {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const theme = savedTheme === 'dark' || savedTheme === 'light'
      ? savedTheme
      : matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link href="https://db.onlinewebfonts.com/c/ca3d10781128664daddf89bf2e2d1305?family=Graphik+LCG+Regular+Regular" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
