import type { Metadata } from 'next';
import './globals.css';
import { siteDescription, siteName, siteUrl } from './site-config';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  description: siteDescription,
  alternates: { canonical: `${siteUrl}/` },
  icons: { icon: '/favicon.svg' },
  verification: {
    google: 'daB50WhEWK6k-YlsZ2xFqhOxicIAIFwDsoDL6MZb0YU',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Huỳnh Ngọc Huân',
      url: `${siteUrl}/`,
      email: 'mailto:huanhuynh2402@gmail.com',
      jobTitle: 'Web Developer',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Da Nang',
        addressCountry: 'VN',
      },
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'University of Technology and Education - The University of Danang',
      },
      knowsAbout: ['WordPress', 'Next.js', 'React', 'TypeScript', 'PHP', 'Docker', 'VPS', 'Technical SEO'],
      sameAs: ['https://github.com/HuanHuynh24'],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: siteName,
      description: siteDescription,
      inLanguage: ['en', 'vi'],
      author: { '@id': `${siteUrl}/#person` },
    },
  ],
};

const themeScript = `
  try {
    const savedTheme = localStorage.getItem('portfolio-theme');
    const theme = savedTheme === 'dark' || savedTheme === 'light'
      ? savedTheme
      : 'dark';
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  } catch {}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
        <link href="https://db.onlinewebfonts.com/c/ca3d10781128664daddf89bf2e2d1305?family=Graphik+LCG+Regular+Regular" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
