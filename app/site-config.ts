const fallbackSiteUrl = 'https://huanhuynh24.github.io/portfolio';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl).replace(/\/$/, '');

export const siteName = 'Huỳnh Ngọc Huân // Web Developer';
export const siteDescription =
  'Portfolio of Huỳnh Ngọc Huân - a web developer specializing in WordPress, Next.js, PHP, Docker and VPS infrastructure.';
