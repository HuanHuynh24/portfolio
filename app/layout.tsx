import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { siteDescription, siteName, siteUrl } from "./site-config";
import { profile } from "./profile";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  description: siteDescription,
  alternates: { canonical: `${siteUrl}/` },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  verification: {
    google: "daB50WhEWK6k-YlsZ2xFqhOxicIAIFwDsoDL6MZb0YU",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: profile.name,
      url: `${siteUrl}/`,
      email: `mailto:${profile.email}`,
      telephone: "+84388291023",
      jobTitle: profile.title,
      worksFor: { "@type": "Organization", name: profile.company },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Da Nang",
        addressCountry: "VN",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Technology and Education - The University of Danang",
      },
      knowsAbout: [
        ...profile.development,
        ...profile.infrastructure,
        ...profile.seo,
      ],
      sameAs: [
        "https://github.com/HuanHuynh24",
        "https://www.tiktok.com/@ngochuan_02",
        "https://www.facebook.com/huynh.huan.967/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: siteName,
      description: siteDescription,
      inLanguage: "en",
      author: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <link
          href="/fonts/dm-serif-display.ttf"
          rel="preload"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          href="/fonts/manrope-regular.ttf"
          rel="preload"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NR5GR79YYK"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NR5GR79YYK');
          `}
        </Script>
      </body>
    </html>
  );
}
