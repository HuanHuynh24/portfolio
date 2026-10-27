const fallbackSiteUrl = "https://huandev.io.vn";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl
).replace(/\/$/, "");

export const siteName = "Huỳnh Ngọc Huân // WordPress Developer (Tech Lead)";
export const siteDescription =
  "Huỳnh Ngọc Huân — WordPress Developer and Tech Lead at Webtop. 3+ years of experience in WordPress, WooCommerce, Next.js, performance, SEO and VPS deployment. 10+ client websites delivered.";
