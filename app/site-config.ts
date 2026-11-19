const fallbackSiteUrl = "https://huandev.io.vn";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl
).replace(/\/$/, "");

export const siteName = "Huỳnh Ngọc Huân // Web Developer";
export const siteDescription =
  "Huỳnh Ngọc Huân — Web Developer. 3+ years of experience in WordPress, WooCommerce, Next.js, performance, SEO and VPS deployment. 10+ client websites delivered.";
