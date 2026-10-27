// Public portfolio facts transcribed from the supplied CV.pdf.
export const profile = {
  name: "Huỳnh Ngọc Huân",
  title: "WordPress Developer (Tech Lead)",
  email: "huanhuynh2402@gmail.com",
  phone: "0388 291 023",
  phoneHref: "tel:+84388291023",
  website: "https://huandev.io.vn/",
  location: "Da Nang, Viet Nam",
  university:
    "University of Technology and Education — The University of Danang",
  educationPeriod: "2022–2026",
  major: "Information Technology",
  company: "Webtop Website Design Co., Ltd.",
  workPeriod: "2022–Present",
  responsibilities: [
    "Develop, customize and optimize WordPress and WooCommerce websites for business and e-commerce projects.",
    "Build interfaces and integrate features with Next.js, Tailwind CSS and TypeScript.",
    "Configure and manage VPS infrastructure for the company’s website template system, hosting, DNS, SSL and production deployments.",
    "Improve website performance, loading speed and user experience; implement on-page and technical SEO, Google Search Console, GA4 and Google Tag Manager.",
    "Manage code, deploy projects and support the development team. Completed 10+ client websites across different industries.",
  ],
  research: [
    {
      start: "2024",
      end: "2025",
      title: "Remote health-monitoring wheelchair",
      description:
        "Contributed to research and development, supporting software, data connectivity and remote monitoring of health indicators.",
    },
    {
      start: "2023",
      end: "2024",
      title: "Rehabilitation glove for mild stroke recovery",
      description:
        "Contributed to research and development, supporting control software and sensor data collection.",
    },
  ],
  development: [
    "WordPress",
    "WooCommerce",
    "PHP",
    "ACF",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
  ],
  infrastructure: ["Linux VPS", "Hosting", "DNS", "SSL", "Nginx", "Apache"],
  seo: [
    "On-page SEO",
    "Technical SEO",
    "Google Search Console",
    "Google Analytics 4",
    "Google Tag Manager",
  ],
  tools: ["Git", "GitHub", "VS Code", "Figma (basic)"],
} as const;
